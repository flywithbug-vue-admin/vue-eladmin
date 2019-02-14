#!/usr/bin/env bash

info() {
     local green="\033[1;32m"
     local normal="\033[0m"
     echo -e "[${green}INFO${normal}] $1"
}

error() {
     local red="\033[1;31m"
     local normal="\033[0m"
     echo -e "[${red}ERROR${normal}] $1"
}

cur_date="`date +%Y-%m-%d-%H:%M:%S`"
dif=$*
if [[ x"${dif}" = x ]]; then
  error "请输入提交内容!"
exit 1
#    dif=$cur_date
else
    info "${dif}"
fi

git add .
git commit -m "${dif}"
git push
