#!/bin/bash

input_file="./k6-results.txt"

awk '/^ *Scenario|^ *checks|^ *data_received|^ *data_sent|^ *http_req_blocked|^ *http_req_connecting|^ *http_req_duration|^ *http_req_failed|^ *http_req_receiving|^ *http_req_sending|^ *http_req_tls_handshaking|^ *http_req_waiting|^ *http_reqs|^ *iteration_duration|^ *iterations/ {print}' "$input_file" >> $GITHUB_STEP_SUMMARY