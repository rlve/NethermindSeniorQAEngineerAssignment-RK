#!/bin/bash

npx tsc

export K6_ITERATIONS=1000
export K6_VUS=10
k6 run ./dist/k6/load.js > k6-results.txt  

export K6_VUS=50
k6 run ./dist/k6/load.js >> k6-results.txt  

export K6_VUS=100
k6 run ./dist/k6/load.js >> k6-results.txt  

export K6_ITERATIONS=10000
export K6_VUS=10
k6 run ./dist/k6/load.js >> k6-results.txt  

export K6_VUS=50
k6 run ./dist/k6/load.js >> k6-results.txt  

export K6_VUS=100
k6 run ./dist/k6/load.js >> k6-results.txt  