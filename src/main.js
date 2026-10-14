// Runs in YouTube's own JS world so it can reach the page's internal objects.
//
// How YouTube auto-advances a playlist: when a video ends, the
// <yt-playlist-manager> component checks its `canAutoAdvance_` flag (re-set to
// true after every page navigation) and, if set, fires a `yt-navigate` event
// whose tempData has `autonav: "1"`. The player's Next button goes through the
// same code path but without that marker.
//
// We stop the automatic jump in two independent ways, so one YouTube change
// doesn't break the extension:
//   1. `canAutoAdvance_` reads as false while a target playlist is open.
//   2. Autoplay `yt-navigate` events are swallowed before YouTube's router
//      sees them.
// If (1) can't be applied at all (YouTube renamed its internals), we also pause
// the video just before it ends as a last resort.

(() => {
  'use strict';

  const WATCH_LATER_LIST_ID = 'WL';
  // Real-time seconds before the end at which the last-resort fallback pauses.
  // `timeupdate` fires about every 250 ms, so this has to be larger than that.
  const FALLBACK_LEAD_SECONDS = 0.5;

  const log = (...args) => console.info('[Watch Later Autoplay Stopper]', ...args);

  let settings = { enabled: true, scope: 'watchLater' };

  window.addEventListener('wlas:settings', (event) => {
    try {
      settings = { ...settings, ...JSON.parse(event.detail) };
    } catch {
      // Not from our bridge; ignore.
    }
  });
  window.dispatchEvent(new CustomEvent('wlas:request-settings'));

  function shouldBlock() {
    if (!settings.enabled || location.pathname !== '/watch') return false;
    const list = new URLSearchParams(location.search).get('list');
    if (!list) return false;
    return settings.scope === 'allPlaylists' || list === WATCH_LATER_LIST_ID;
  }

  // --- 1. Keep the playlist manager's auto-advance flag off -----------------

  const patchedManagers = new WeakSet();
  let managerPatched = false;

  function patchPlaylistManager() {
    const element = document.querySelector('yt-playlist-manager');
    const manager = element && (element.polymerController ?? element);
    if (!manager) return false;
    if (patchedManagers.has(manager)) return true;
    if (!('canAutoAdvance_' in manager)) return false;

    let canAutoAdvance = manager.canAutoAdvance_;
    try {
      Object.defineProperty(manager, 'canAutoAdvance_', {
        configurable: true,
        enumerable: true,
        get: () => canAutoAdvance && !shouldBlock(),
        set: (value) => {
          canAutoAdvance = value;
        },
      });
    } catch {
      return false;
    }
    patchedManagers.add(manager);
    log('Playlist auto-advance hook installed.');
    return true;
  }

  function ensurePatched() {
    managerPatched = patchPlaylistManager();
    return managerPatched;
  }

  window.addEventListener('yt-navigate-finish', ensurePatched);
  window.addEventListener('yt-page-data-updated', ensurePatched);
  // A video has to play before it can end, so this guarantees we're in place.
  document.addEventListener('playing', ensurePatched, true);

  // --- 2. Drop automatic "go to next video" navigations ---------------------

  window.addEventListener(
    'yt-navigate',
    (event) => {
      if (event.detail?.tempData?.autonav === '1' && shouldBlock()) {
        event.stopImmediatePropagation();
        log('Blocked an automatic jump to the next video.');
      }
    },
    true
  );

  // --- 3. Last resort: pause right before the end ---------------------------

  // Disarmed after we pause, so pressing play at the very end lets the video
  // finish; re-armed once playback is away from the end again.
  let fallbackArmed = true;

  document.addEventListener(
    'timeupdate',
    (event) => {
      const video = event.target;
      if (!(video instanceof HTMLVideoElement) || video.paused) return;
      if (!shouldBlock() || managerPatched || ensurePatched()) return;

      const player = video.closest('#movie_player');
      if (!player || player.classList.contains('ad-showing')) return;

      const secondsLeft = (video.duration - video.currentTime) / video.playbackRate;
      if (!Number.isFinite(secondsLeft)) return;

      if (secondsLeft > FALLBACK_LEAD_SECONDS * 4) {
        fallbackArmed = true;
      } else if (secondsLeft <= FALLBACK_LEAD_SECONDS && fallbackArmed) {
        fallbackArmed = false;
        video.pause();
        log('Paused just before the end (fallback mode).');
      }
    },
    true
  );
})();
