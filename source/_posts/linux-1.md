---
title: linux-1
date: 2023-03-31 14:01:44
categories:
tags:
---

``` bash
clear
# Ctrl + u : clear left
# Ctrl + l : clear up
reset # clear screen 
kyp@u2204s:~/gitdocker$ whatis clear
clear (1)            - clear the terminal screen
kyp@u2204s:~/gitdocker$ whatis ls
ls (1)               - list directory contents
kyp@u2204s:~/gitdocker$ whatis docker
docker (1)           - Docker image and container command line interface
kyp@u2204s:~/gitdocker$ whatis reset
reset (1)            - terminal initialization

kyp@u2204s:~/gitdocker$ help history
history: history [-c] [-d offset] [n] or history -anrw [filename] or history -ps arg [arg...]
......

kyp@u2204s:~/gitdocker$ help ls
-bash: help: no help topics match `ls'.  Try `help help' or `man -k ls' or `info ls'.

kyp@u2204s:~/gitdocker$ man ls
kyp@u2204s:~/gitdocker$ ls --help

# for get command
kyp@u2204s:~/gitdocker$ apropos his
byobu-ugraph (1)     - helper script for notification history graphs
cloud-id (1)         - Report the canonical cloud-id for this instance
docker-history (1)   - Show the history of an image
docker-image-history (1) - Show the history of an image
git-merge (1)        - Join two or more development histories together
history (3readline)  - GNU History Library
lcf (1)              - Determine which of the historical versions of a config...
pam_pwhistory (8)    - PAM module to remember last passwords
run-this-one (1)     - run just one instance at a time of some command and un...
sg_emc_trespass (8)  - change ownership of SCSI LUN from another Service-Proc...
tracepath (8)        - traces path to a network host discovering MTU along th...

# history 
kyp@u2204s:~/gitdocker$ history 10
  781  ls --help
  782  clear
  783  aronpos his
  784  apropos his
  785  apropos he
  786  apropos his
  787  clear
  788  hsitory
  789  history
  790  history 10
kyp@u2204s:~/gitdocker$ history 5
  787  clear
  788  hsitory
  789  history
  790  history 10
  791  history 5
kyp@u2204s:~/gitdocker$ !781
ls --help 
.....
kyp@u2204s:~/gitdocker$ history 10
  784  apropos his
  785  apropos he
  786  apropos his
  787  clear
  788  hsitory
  789  history
  790  history 10
  791  history 5
  792  ls --help
  793  history 10

# clear history 
kyp@u2204s:~/gitdocker$ history -c
kyp@u2204s:~/gitdocker$ history
    1  history
```

``` bash
pwd
#same as ls -al
ll 
# dir
mkdir temp
# tree use tera term not show correct
sudo apt install tree
tree

# file - if file exist, update the file's date
kyp@u2204s:~$ touch newfile1.txt
kyp@u2204s:~$ echo > newfile2.txt
kyp@u2204s:~$ > newfile3.txt
# Ctrl-d close the file
kyp@u2204s:~$ cat > newfile4.txt
1
2
3
```

``` bash
# -r
cp
mv
rm

# get file
kyp@u2204s:~/temp$ wget https://www.gutenberg.org/files/1112/1112.txt

# -s          squeeze multiple blank lines into one
mv 1112.txt romeo_poem.txt
whatis more
more --help
more romeo_poem.txt
more -10 romeo_poem.txt
more +145 romeo_poem.txt
more -s romeo_poem.txt

# pageUp,pageDown
less romeo_poem.txt
# search 
less -p "Romeo" romeo_poem.txt
# serach don'r care letter case
less -Ip "romeo" romeo_poem.txt
# show line number
less -NIp "romeo" romeo_poem.txt

# show hed 10 lines
head romeo_poem.txt
# show 3 lines
head -3 romeo_poem.txt
# show 47 charcater
head -c 47 romeo_poem.txt
# show tail 10 line
tail romeo_poem.txt
# show tail 3 line
tail -3 romeo_poem.txt
# tail 5 character
tail -c 5 romeo_poem.txt
```

``` bash
# nano
Ctrl+C : show position
Ctrl+K : cut line
Ctrl+U : post
Ctrl+6 : select/unselect
Esc+6  : copy select 
Ctrl+W : search
Esc+W  : search next
Ctrl+\ : search+replace
Ctrl+shift+- : goto line
Esc+U  : undo

# vi
# vimtutor
```
