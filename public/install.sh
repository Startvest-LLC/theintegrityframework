#!/bin/sh
# Install the integrity-framework CLI.
# Usage:
#   curl -fsSL https://theintegrityframework.org/install.sh | sh
#
# Clones the directory repo to $INTEGRITY_HOME (default ~/.integrity-framework),
# then symlinks bin/integrity.mjs onto your PATH.

set -e

REPO_URL="${INTEGRITY_REPO_URL:-https://github.com/Startvest-LLC/theintegrityframework.git}"
INSTALL_DIR="${INTEGRITY_HOME:-$HOME/.integrity-framework}"
BIN_DIR="${INTEGRITY_BIN_DIR:-$HOME/.local/bin}"
BIN_NAME="integrity"

say() { printf '%s\n' "$*"; }
err() { printf 'error: %s\n' "$*" >&2; exit 1; }

command -v git >/dev/null 2>&1 || err 'git is required but not installed.'
command -v node >/dev/null 2>&1 || err 'node is required but not installed. Need Node 20+.'

NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
if [ "$NODE_MAJOR" -lt 20 ]; then
  err "node 20+ is required (you have $(node --version))."
fi

if [ -d "$INSTALL_DIR/.git" ]; then
  say "Updating existing checkout at $INSTALL_DIR..."
  git -C "$INSTALL_DIR" pull --ff-only --quiet
else
  say "Cloning into $INSTALL_DIR..."
  git clone --quiet --depth 1 "$REPO_URL" "$INSTALL_DIR"
fi

chmod +x "$INSTALL_DIR/cli/bin/integrity.mjs"

mkdir -p "$BIN_DIR"
ln -sf "$INSTALL_DIR/cli/bin/integrity.mjs" "$BIN_DIR/$BIN_NAME"

say ""
say "  installed: $BIN_DIR/$BIN_NAME -> $INSTALL_DIR/cli/bin/integrity.mjs"
say ""

case ":$PATH:" in
  *":$BIN_DIR:"*) ;;
  *)
    say "  $BIN_DIR is not on your PATH."
    say "  Add this to your shell profile (.bashrc / .zshrc):"
    say ""
    say "    export PATH=\"\$HOME/.local/bin:\$PATH\""
    say ""
    ;;
esac

say "Try it:"
say "  integrity --version"
say "  integrity directory list"
say ""
