#! /usr/bin/env sh

#
#
#


forever stopall
rm -rf ./logs/* .tmp @>/dev/null

grunt forever-jobs

forever logs

