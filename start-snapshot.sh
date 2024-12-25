#!/bin/bash
set -e

NODE_DIR=/node/data
SNAPSHOT_DIR=/node/data/snapshots/
SNAPSHOT_PATH=/node/data/snapshots/snapshots.bin

rm -f $NODE_DIR/config.ini
rm -f $NODE_DIR/snapshots/*
rm -rf $NODE_DIR/blocks
rm -rf $NODE_DIR/protocol_features
rm -rf $NODE_DIR/state

mkdir -p $SNAPSHOT_DIR

curl -o "$SNAPSHOT_PATH" "$SNAPSHOT_URL"

sh ./entrypoint.sh node