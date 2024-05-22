#!/bin/bash

npx tsc

export K6_ITERATIONS=1000
export K6_VUS=10
echo "Scenario #1 - K6_ITERATIONS=$K6_ITERATIONS K6_VUS=$K6_VUS" > k6-results.txt  
./k6 run ./dist/k6-tests/load.js >> k6-results.txt  

export K6_VUS=50
echo "Scenario #2 - K6_ITERATIONS=$K6_ITERATIONS K6_VUS=$K6_VUS" >> k6-results.txt  
./k6 run ./dist/k6-tests/load.js >> k6-results.txt  

export K6_VUS=100
echo "Scenario #3 - K6_ITERATIONS=$K6_ITERATIONS K6_VUS=$K6_VUS" >> k6-results.txt  
./k6 run ./dist/k6-tests/load.js >> k6-results.txt  

export K6_ITERATIONS=10000
export K6_VUS=10
echo "Scenario #4 - K6_ITERATIONS=$K6_ITERATIONS K6_VUS=$K6_VUS" >> k6-results.txt  
./k6 run ./dist/k6-tests/load.js >> k6-results.txt  

export K6_VUS=50
echo "Scenario #5 - K6_ITERATIONS=$K6_ITERATIONS K6_VUS=$K6_VUS" >> k6-results.txt  
./k6 run ./dist/k6-tests/load.js >> k6-results.txt  

export K6_VUS=100
echo "Scenario #6 - K6_ITERATIONS=$K6_ITERATIONS K6_VUS=$K6_VUS" >> k6-results.txt  
./k6 run ./dist/k6-tests/load.js >> k6-results.txt  