#!/bin/bash

npx tsc
k6 run ./dist/k6/load.js