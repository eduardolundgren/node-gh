#!/bin/bash
# © 2013 Liferay, Inc. <https://liferay.com> and Node GH contributors
# (see file: CONTRIBUTORS)
# SPDX-License-Identifier: BSD-3-Clause

if [ "${TRAVIS_REPO_SLUG}" != "node-gh/gh" ] ||
    [ "${TRAVIS_PULL_REQUEST}" != "false" ] ||
    [ "${TRAVIS_OS_NAME}" != "linux" ] ||
    [ "${TRAVIS_BRANCH}" != "master" ] ||
    [ `echo $TRAVIS_JOB_NUMBER | cut -d '.' -f 2` != "1" ]; then
    exit
fi;

openssl aes-256-cbc -K $encrypted_52f0ef4642a6_key -iv $encrypted_52f0ef4642a6_iv -in gh_rsa.enc -out ~/.ssh/id_rsa -d

chmod 600 ~/.ssh/id_rsa

git clone git@github.com:node-gh/reports.git
