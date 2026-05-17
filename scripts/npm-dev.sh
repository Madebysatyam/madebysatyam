#!/usr/bin/env zsh
export PATH="/Users/satyam/.local/bin:/Users/satyam/.nvm/versions/node/v24.15.0/bin:$PATH"
cd "$(dirname "$0")/.." || exit 1
exec npm run dev
