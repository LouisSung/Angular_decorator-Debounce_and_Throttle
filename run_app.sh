#!/usr/bin/env bash
# Description: 
# Author: [LouisSung](https://github.com/LouisSung), All Rights Reserved
# Version: v1.0.0 (20191205)

# Make sure this script execute from its location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
RESTORE_DIR=$(pwd)
cd $SCRIPT_DIR

# <<<<<<< Script Start
cd app/
[ ! -d 'node_modules' ] && echo 'install npm modules' && npm install
[ ! -f 'decorator.debounce-throttle.ts' ] && echo 'move `.ts` file into app/' && mv ../decorator.debounce-throttle.ts .
ng serve

# >>>>>>> Script End
cd $RESTORE_DIR
