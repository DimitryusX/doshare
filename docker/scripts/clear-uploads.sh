#!/usr/bin/env bash
# Remove old uploads (e.g. older than 8 days). Adjust UPLOADS_PATH or age as needed.
# Usage: run from host; set UPLOADS_PATH in .env or pass as env.

UPLOADS_PATH="${UPLOADS_PATH:-./data/upload}"
find "${UPLOADS_PATH}" -type f -mmin +11520 -delete
find "${UPLOADS_PATH}" -type d -empty -delete
