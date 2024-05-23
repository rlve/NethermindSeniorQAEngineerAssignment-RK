#!/bin/bash

npm run wait-for-sync
npm run test
npm run k6:local
