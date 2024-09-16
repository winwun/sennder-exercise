#!/bin/sh
ENV=$1

$(yarn bin)/serverless deploy --stage $ENV