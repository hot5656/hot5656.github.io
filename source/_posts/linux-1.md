---
title: Linux 說明
abbrlink: 670a
date: 2023-03-31 14:01:44
categories: OS
tags:
  - linux
---

### Command
<!--more-->

#### system
``` bash
# system info
# the system is ubuntu 20.04, u2204s is I give wrong host name
kyp@u2204s:~/app/my-app$ uname -a
	Linux u2204s 5.4.0-146-generic #163-Ubuntu SMP Fri Mar 17 18:26:02 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux

# release
kyp@u2204s:~/app/my-app$ lsb_release -a
	No LSB modules are available.
	Distributor ID: Ubuntu
	Description:    Ubuntu 20.04.6 LTS
	Release:        20.04
	Codename:       focal

# change mode 
sudo chmod 666 /var/run/docker.sock
```

#### user and group
``` bash
# user kyp add group docker
sudo usermod -aG docker kyp
```

#### process
``` bash
# ps : show standrd process information
ps -ef 
```

#### net
``` bash
# net stat
# -a  : list all
# -t  : list all tcp
# -u  : list all udp 
# -r  : show route table
# -p  : show pid(and anme)
# -l  : show listen only
# -n  : show ip and port(not hostnam and port name)
kyp@u2204s:~$ sudo netstat -tulnp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      716/systemd-resolve
tcp        0      0 0.0.0.0:23              0.0.0.0:*               LISTEN      738/inetd
tcp        0      0 0.0.0.0:8081            0.0.0.0:*               LISTEN      6977/docker-proxy
tcp6       0      0 :::21                   :::*                    LISTEN      768/vsftpd
tcp6       0      0 :::8081                 :::*                    LISTEN      6983/docker-proxy
udp        0      0 127.0.0.53:53           0.0.0.0:*                           716/systemd-resolve
udp        0      0 192.168.18.6:68         0.0.0.0:*                           714/systemd-network
udp6       0      0 fe80::a00:27ff:fe1a:546 :::*                                714/systemd-network
```

#### ip (as ifconfig)
``` bash
kyp@u2204s:~$ ip a
  1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
      link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
      inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
      inet6 ::1/128 scope host
        valid_lft forever preferred_lft forever
  2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
      link/ether 08:00:27:1a:ac:9e brd ff:ff:ff:ff:ff:ff
      inet 192.168.18.6/24 brd 192.168.18.255 scope global dynamic enp0s3
        valid_lft 72930sec preferred_lft 72930sec
      inet6 fe80::a00:27ff:fe1a:ac9e/64 scope link
        valid_lft forever preferred_lft forever
  3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
      link/ether 02:42:8a:57:20:76 brd ff:ff:ff:ff:ff:ff
      inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
        valid_lft forever preferred_lft forever
      inet6 fe80::42:8aff:fe57:2076/64 scope link
        valid_lft forever preferred_lft forever
  15: vethac66745@if14: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default
      link/ether de:5a:53:74:54:ef brd ff:ff:ff:ff:ff:ff link-netnsid 0
      inet6 fe80::dc5a:53ff:fe74:54ef/64 scope link
        valid_lft forever preferred_lft forever
```

### application
#### set root password
``` bash
sudo passwd root
su -
```

### install package
#### node
``` bash
# remove from ubuntu server
$ node --version
	v10.19.0
$ which node
	/usr/bin/node
$ sudo apt remove nodejs

# install node 18
sudo apt update && sudo apt upgrade
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs
$ node --version
	v18.15.0
```

#### yarn
``` bash
# install yarn
sudo apt install yarn
kyp@u2204s:~$ yarn --version
```

#### npm
``` bash
sudo apt install npm
```

#### ftp server
``` bash
# ftp server 
sudo apt install vsftpd
sudo systemctl start vsftpd
# 重開機時啟動
sudo systemctl enable vsftpd

# set ftp write eneable
sudo cp /etc/vsftpd.conf  /etc/vsftpd.conf_default
sudo nano /etc/vsftpd.conf
# # Uncomment this to enable any form of FTP write command.
# write_enable=YES
sudo systemctl restart vsftpd.service

# show status
$ sudo systemctl status vsftpd
	? vsftpd.service - vsftpd FTP server
			Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
			Active: active (running) since Mon 2023-04-10 02:23:42 UTC; 12s ago
			Process: 2675 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
		Main PID: 2684 (vsftpd)
				Tasks: 1 (limit: 4609)
			Memory: 680.0K
			CGroup: /system.slice/vsftpd.service
							mq2684 /usr/sbin/vsftpd /etc/vsftpd.conf
	Apr 10 02:23:42 u2204s systemd[1]: Starting vsftpd FTP server...
	Apr 10 02:23:42 u2204s systemd[1]: Started vsftpd FTP server.
```


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

``` bash
kyp@u2204s:/home$ whoami
kyp

kyp@u2204s:/home$ echo "Anybody in here?"
Anybody in here?

kyp@u2204s:/home$ pwd
/home

kyp@u2204s:/home$ cd ~

kyp@u2204s:~$ cat /etc/passwd
  kyp:x:1000:1000:Robert:/home/kyp:/bin/bash
  lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
  telnetd:x:113:120::/nonexistent:/usr/sbin/nologin

kyp@u2204s:~$ find / -name passwd
  .....
kyp@u2204s:~$ find -name notes.txt
kyp@u2204s:~$ touch notes.txt
kyp@u2204s:~$ find -name notes.txt
  ./notes.txt
```












