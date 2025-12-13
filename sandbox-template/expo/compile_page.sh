#!/bin/bash

wait_for_port() {
  echo "Waiting for Expo Web server to open port 19006..."
  while ! nc -z 0.0.0.0 19006; do
    sleep 0.2
  done
  echo "Expo Web server port is open!"
}

cd /home/user

if [ ! -d node_modules ]; then
  echo "Installing node dependencies..."
  npm install
fi

echo "Starting Expo Web dev server on port 19006..."

# ✅ Correct flags for Docker
npx expo start \
  --web \
  --port 19006 \
  --host lan \
  2>&1 &

wait_for_port

echo "Expo Web server is ready!"

# keep container alive
tail -f /dev/null
