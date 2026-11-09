#!/usr/bin/env bash
# Builds store-ready ZIPs in dist/:
#   watch-later-autoplay-stopper-chrome-X.Y.Z.zip   Chrome Web Store, Edge Add-ons
#   watch-later-autoplay-stopper-firefox-X.Y.Z.zip  addons.mozilla.org (desktop + Android)
# and leaves the unpacked Firefox build in dist/firefox/ for testing.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="$(node -p "require('$ROOT/manifest.json').version")"
DIST="$ROOT/dist"
NAME="watch-later-autoplay-stopper"
FILES=(manifest.json _locales src popup icons)

"$ROOT/scripts/validate-extension.sh"
mkdir -p "$DIST"

zip_dir() {
  local dir="$1" output="$2"
  rm -f "$output.tmp"
  (cd "$dir" && zip -q -r -X "$output.tmp" "${FILES[@]}" -x '*.DS_Store')
  mv "$output.tmp" "$output"
  printf 'Created %s\n' "$output"
}

# Chrome: the repository as is.
zip_dir "$ROOT" "$DIST/$NAME-chrome-$VERSION.zip"

# Firefox: same files, manifest adjusted for Gecko.
FIREFOX="$DIST/firefox"
rm -rf "$FIREFOX"
mkdir -p "$FIREFOX"
(cd "$ROOT" && cp -R "${FILES[@]}" "$FIREFOX/")
find "$FIREFOX" -name '.DS_Store' -delete
"$ROOT/scripts/firefox-manifest.js" "$ROOT/manifest.json" > "$FIREFOX/manifest.json"
zip_dir "$FIREFOX" "$DIST/$NAME-firefox-$VERSION.zip"
