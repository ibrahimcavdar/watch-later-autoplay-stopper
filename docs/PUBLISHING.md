# Publishing

This checklist separates repository work from the steps that need the publisher's own accounts.

## Release the code

1. Make sure the change is on `master` and the working tree is clean.
2. Test the unpacked extension on YouTube in Chrome and Brave, signed in, with a Watch Later video.
3. Bump `version` in `manifest.json`.
4. Run `./scripts/package-extension.sh` and check that the ZIP in `dist/` has `manifest.json` at its root.
5. Tag the commit (`vX.Y.Z`), create a GitHub release, and attach the ZIP.

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

## Other stores

The same ZIP can be submitted to [Microsoft Edge Add-ons](https://partner.microsoft.com/dashboard/microsoftedge/) (free developer account). Brave and other Chromium browsers install directly from the Chrome Web Store.
