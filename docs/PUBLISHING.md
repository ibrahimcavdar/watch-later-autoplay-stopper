# Publishing

This checklist separates repository work from the steps that need the publisher's own accounts.

## Release the code

1. Make sure the change is on `master` and the working tree is clean.
2. Bump `version` in `manifest.json`.
3. Run `./scripts/package-extension.sh`. It writes two ZIPs to `dist/` (`…-chrome-X.Y.Z.zip` and `…-firefox-X.Y.Z.zip`) and an unpacked `dist/firefox/`.
4. Test on YouTube, signed in, with a Watch Later video:
   - Chrome and Brave: load the repository folder unpacked.
   - Firefox: `about:debugging#/runtime/this-firefox` › **Load Temporary Add-on** › `dist/firefox/manifest.json`.
   - Firefox for Android (m.youtube.com): turn on **Settings › Remote debugging via USB** on the phone, connect it, then run `npx web-ext run -t firefox-android -s dist/firefox --adb-device <serial> --firefox-apk org.mozilla.firefox`.
5. Lint the Firefox build: `npx web-ext lint -s dist/firefox` (expect 0 errors, 0 warnings).
6. Tag the commit (`vX.Y.Z`), create a GitHub release, and attach both ZIPs.

## Chrome Web Store (publisher account needed)

One-time setup:

1. Register in the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/) and pay the one-time registration fee.
2. Turn on 2-Step Verification for the Google account.
3. Set a publisher name and verify the contact email.

For each new item:

1. Select **Add new item** and upload the ZIP from `dist/`.
2. Fill in the listing from [STORE_LISTING.md](STORE_LISTING.md) and upload the assets listed there.
3. Complete the **Privacy** tab with the disclosures from [STORE_LISTING.md](STORE_LISTING.md).
4. Add the reviewer test instructions.
5. Submit for review.

For updates, upload a ZIP with a higher version and resubmit.

References: [Publish in the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish), [Image requirements](https://developer.chrome.com/docs/webstore/images), [Privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy).

## Firefox Add-ons (Mozilla account needed)

One listing on [addons.mozilla.org](https://addons.mozilla.org/) (AMO) serves both Firefox for desktop and Firefox for Android. There is no fee.

One-time setup:

1. Sign in to the [Developer Hub](https://addons.mozilla.org/developers/) with a Mozilla account and turn on two-step authentication.
2. Accept the Firefox Add-on Distribution Agreement when asked on the first submission.

For the first version:

1. Open [Submit a New Add-on](https://addons.mozilla.org/developers/addon/submit/distribution) and choose **On this site**.
2. Upload `dist/watch-later-autoplay-stopper-firefox-X.Y.Z.zip`. Under compatibility, tick both **Firefox** and **Firefox for Android**.
3. When asked whether you need to submit source code, answer **No**: the package is the repository's own unminified files, with no build step.
4. Fill in the listing from the Firefox section of [STORE_LISTING.md](STORE_LISTING.md), add the screenshots, and paste the reviewer notes.
5. Submit. Signed versions usually go live within minutes after automated checks; a human review can still follow later.

For updates, open the add-on in the Developer Hub, choose **Upload New Version**, and upload the new Firefox ZIP.

The add-on ID (`watch-later-autoplay-stopper@ibrahimcavdar.github.io`, set in `scripts/firefox-manifest.js`) must never change after the first upload, or Firefox treats it as a different add-on.

References: [Submitting an add-on](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/), [Firefox for Android](https://extensionworkshop.com/documentation/develop/developing-extensions-for-firefox-for-android/), [Data collection consent](https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/).

## Other stores

The Chrome ZIP can also be submitted to [Microsoft Edge Add-ons](https://partner.microsoft.com/dashboard/microsoftedge/) (free developer account). Brave and other Chromium browsers install directly from the Chrome Web Store.
