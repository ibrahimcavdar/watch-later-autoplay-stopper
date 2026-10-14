# Privacy Policy

Effective date: October 14, 2026

Watch Later Autoplay Stopper is an open-source browser extension with one purpose: stopping YouTube from automatically playing the next video when a video in your Watch Later playlist (or, if you choose, any playlist) ends.

## Data handled

The extension runs only on `https://www.youtube.com/*` and works entirely inside your browser:

- It reads the current page URL to check whether you are watching a video from a playlist.
- It reads YouTube's in-page playlist state and the video player's playback position to prevent the automatic jump to the next video.
- It stores two settings, whether the extension is enabled and which playlists it applies to, using the browser's `storage` API. If you use browser sync, your browser may sync these settings between your own devices.

Nothing else is stored.

## Data collection and sharing

The developer does not collect, receive, sell, or share any data. The extension has:

- No analytics or tracking.
- No advertising.
- No network requests of its own.
- No developer-operated server.
- No remote code.

## Data control

You can change the settings at any time from the extension's popup. Uninstalling the extension removes its stored settings.

## Changes

Material changes to data handling will be reflected in this policy and in the Chrome Web Store privacy disclosures before the changed extension is published.

## Contact

Questions can be submitted through this repository's [issue tracker](https://github.com/ibrahimcavdar/watch-later-autoplay-stopper/issues).
