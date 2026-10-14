#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="$(node -p "require('$ROOT/manifest.json').version")"
DIST="$ROOT/dist"
OUTPUT="$DIST/watch-later-autoplay-stopper-$VERSION.zip"
TEMP="$DIST/watch-later-autoplay-stopper-$VERSION.tmp.zip"

"$ROOT/scripts/validate-extension.sh"
mkdir -p "$DIST"
rm -f "$TEMP"

(
  cd "$ROOT"
  zip -q -r -X "$TEMP" manifest.json _locales src popup icons -x '*.DS_Store'
)

mv "$TEMP" "$OUTPUT"
printf 'Created %s\n' "$OUTPUT"
