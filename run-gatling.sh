#!/bin/sh

TEST_DIR=$1
SIMULATION_NAME=$2

if [[ $TEST_DIR == "http"* ]] || [[ $TEST_DIR == "git@"* ]]; then
    git clone $TEST_DIR
    TEST_DIR=$(basename $TEST_DIR .git)
fi

mvn -f $TEST_DIR gatling:test
