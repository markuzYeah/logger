#! /usr/bin/env sh

#
#
#

#echo "from the shell and running: grunt --gruntfile $@"
grunt_file="$(basename "$1")"
grunt_dir="$(dirname "$1")"
cur_dir="$PWD"
cd "$grunt_dir"
grunt --gruntfile $grunt_file
gruntExitStatus=$?

cd "$cur_dir"

pwd

#echo "\n\n====== $(basename $0) ==================\n\n"

if [ "$gruntExitStatus" -eq 0 ]; then 

  #echo "(OK:$gruntExitStatus) $@"
  echo  "(OK:0) $(date) ">> "$cur_dir/logs/$(basename "${grunt_file%.*}").done.log"
  exit 0
fi


# 
# error handling from now on ...
# don't try to save, just exit
#

#echo "(EE:$gruntExitStatus) $@"

echo "(EE:$gruntExitStatus) $(basename ""$grunt_file"") down" > /dev/stderr

exit $gruntExitStatus


