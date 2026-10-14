# Store Listing Draft

Copy-ready text for the Chrome Web Store dashboard.

## Product details

**Name:** Watch Later Autoplay Stopper

**Summary:** Stops YouTube from jumping to the next video when a Watch Later video ends, so you can stay and read the comments.

**Category:** Productivity › Tools

**Language:** English (the extension UI is also localized in Turkish)

## Detailed description

When a video in your YouTube Watch Later playlist ends, YouTube immediately plays the next one. YouTube's Autoplay switch doesn't apply to playlists, so there is no setting to turn this off.

Watch Later Autoplay Stopper keeps you on the video you just finished:

- Read the comments, check the description, or just take a breath.
- When you're ready, press the player's Next button (or Shift+N) to continue.
- Works on Watch Later by default; switch to "All playlists" from the toolbar popup.
- Turn it on or off at any time.

The extension is deliberately small:

- Runs only on youtube.com.
- No ads, analytics, tracking, or network requests of its own.
- Stores only your two settings.
- Fully open source: https://github.com/ibrahimcavdar/watch-later-autoplay-stopper

This extension is an independent project and is not affiliated with or endorsed by YouTube or Google.

## Turkish listing (Türkçe)

**Summary:** Daha Sonra İzle'deki bir video bitince YouTube'un sıradaki videoya geçmesini engeller; sayfada kalıp yorumları okuyabilirsin.

**Detailed description:**

YouTube'da Daha Sonra İzle listesindeki bir video bittiğinde YouTube hemen sıradakini açar. YouTube'un Otomatik oynatma düğmesi oynatma listelerinde işe yaramadığı için bunu kapatmanın bir ayarı yok.

Watch Later Autoplay Stopper, bitirdiğin videoda kalmanı sağlar:

- Yorumları oku, açıklamaya bak ya da biraz soluklan.
- Hazır olduğunda oynatıcıdaki Sonraki düğmesine (ya da Shift+N) bas.
- Varsayılan olarak Daha Sonra İzle'de çalışır; araç çubuğundaki pencereden "Tüm oynatma listeleri"ni seçebilirsin.
- İstediğin an açıp kapatabilirsin.

Eklenti bilerek küçük tutuldu:

- Yalnızca youtube.com'da çalışır.
- Reklam, analiz, takip ya da kendi ağ isteği yoktur.
- Yalnızca iki ayarını saklar.
- Tamamen açık kaynaktır: https://github.com/ibrahimcavdar/watch-later-autoplay-stopper

Bu eklenti bağımsız bir projedir; YouTube veya Google ile bağlantılı değildir ve onlar tarafından desteklenmemektedir.

## Single purpose

Prevent YouTube from automatically playing the next video when a video in the user's Watch Later playlist (or, if the user chooses, any playlist) ends.

## Permission justification

**storage:** Saves the user's two settings, whether the extension is enabled and whether it applies to Watch Later only or to all playlists.

**Host access (`https://www.youtube.com/*` content scripts):** Needed to detect that the user is watching a playlist video and to stop YouTube's automatic jump to the next video on that page. The scripts do nothing on pages without a playlist.

## Remote code declaration

No remote code. All executable JavaScript is included in the extension package.

## Data-use disclosure

The extension does not collect or transmit any user data. In the Privacy tab, leave every data category unchecked and certify that:

- Data is not sold to third parties.
- Data is not used or transferred for purposes unrelated to the single purpose.
- Data is not used or transferred to determine creditworthiness or for lending purposes.

**Privacy policy URL:** https://github.com/ibrahimcavdar/watch-later-autoplay-stopper/blob/master/PRIVACY.md

## Reviewer test instructions

Watch Later requires a signed-in account, so the quickest way to test is with a public playlist:

1. Open the extension popup and select **All playlists**.
2. Open https://www.youtube.com/watch?v=39h7ZJbRcsw&list=PLav47HAVZMjnTFVZL-aImCQIC0uLZtNCz&t=70s (a public Blender Studio playlist, starting 10 seconds before the end of the first video).
3. Let the video finish. The page stays on the same video instead of opening video 2 of the playlist.
4. Press the player's Next button. Video 2 opens normally.
5. Switch the popup back to **Watch Later only** and repeat step 2: the playlist now advances as usual, because it is not the Watch Later playlist.

With a signed-in account, the same behavior applies to any video opened from https://www.youtube.com/playlist?list=WL.

## Assets

| Field | File |
|---|---|
| Store icon (128×128) | `icons/icon128.png` |
| Screenshot 1 (1280×800) | `store-assets/screenshot-1.png` |
| Screenshot 2 (1280×800) | `store-assets/screenshot-2.png` |
| Small promo tile (440×280) | `store-assets/small-promo.png` |
