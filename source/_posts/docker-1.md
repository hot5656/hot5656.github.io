---
title: docker practice
abbrlink: d4d6
date: 2023-03-28 10:09:59
categories: Coding
tags:
	- docker
---


``` bash
# install docker
curl https://releases.rancher.com/install-docker/20.10.sh | sh
# check docker version
docker version

# load docker and see
ls
wget curl https://releases.rancher.com/install-docker/20.10.sh | sh
# see by nano
nano 20.10.sh
```

<!--more-->

``` bash
# pull nginx
robert@ununtu220402:~$ docker pull nginx
Using default tag: latest
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/images/create?fromImage=nginx&tag=latest": dial unix /var/run/docker.sock: connect: permission denied
robert@ununtu220402:~$ sudo docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
f1f26f570256: Pull complete 
84181e80d10e: Pull complete 
1ff0f94a8007: Pull complete 
d776269cad10: Pull complete 
e9427fcfa864: Pull complete 
d4ceccbfc269: Pull complete 
Digest: sha256:f4e3b6489888647ce1834b601c6c06b9f8c03dee6e097e13ed3e28c01ea3ac8c
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest

# list image
robert@ununtu220402:~$ sudo docker image ls
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
nginx        latest    ac232364af84   4 days ago   142MB

# run
robert@ununtu220402:~$ sudo docker run -itd nginx
2c2b3ab3539953f9587706a37f4afa9206853cce794b098c56a13a9007d9a54a

# list container
obert@ununtu220402:~$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
2c2b3ab35399   nginx     "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   80/tcp    elastic_hodgkin

# remove container
robert@ununtu220402:~$ sudo docker rm elastic_hodgkin
Error response from daemon: You cannot remove a running container 2c2b3ab3539953f9587706a37f4afa9206853cce794b098c56a13a9007d9a54a. Stop the container before attempting removal or force remove
# must stop 1st
robert@ununtu220402:~$ sudo docker stop elastic_hodgkin
elastic_hodgkin

# re-run
robert@ununtu220402:~$ sudo docker run -itd nginx
7be82924063d482c40334ed6e79e94af9694e1ac6c1ca8568f3429b3a98ee83b
# remove
robert@ununtu220402:~$ sudo docker rm elastic_hodgkin
elastic_hodgkin
# list container
robert@ununtu220402:~$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
7be82924063d   nginx     "/docker-entrypoint.…"   4 minutes ago   Up 4 minutes   80/tcp    pensive_swanson


# or force remove
robert@ununtu220402:~$ sudo docker rm -f pensive_swanson
pensive_swanson
# list not found container
robert@ununtu220402:~$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

robert@ununtu220402:~$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
# list docker image
robert@ununtu220402:~$ sudo docker image ls
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
nginx        latest    ac232364af84   4 days ago   142MB
# detete image
robert@ununtu220402:~$ sudo docker rmi nginx
Untagged: nginx:latest
Untagged: nginx@sha256:f4e3b6489888647ce1834b601c6c06b9f8c03dee6e097e13ed3e28c01ea3ac8c
Deleted: sha256:ac232364af842735579e922641ae2f67d5b8ea97df33a207c5ea05f60c63a92d
Deleted: sha256:31888883f307f2ea78ac1dd1abd26ddae38ebe9aacfbb0250995a636b8531d8f
Deleted: sha256:d413a106f5d462ce56547539d6e8a6402a38631e8312690144be16c2101dda74
Deleted: sha256:64ee442aa082c659c502136dbcc60998aa970f569ff26b0098d4e7c463623660
Deleted: sha256:a7a27d87cf3ba004765cbb692a4584256dcd1eb7aff0049f8e1d4d45a3e50e4d
Deleted: sha256:cc6b5ded0d53019de2911c55226548c7707a29af8cd6a90eb51a437255aa0b42
Deleted: sha256:3af14c9a24c941c626553628cf1942dcd94d40729777f2fcfbcd3b8a3dfccdd6
# check docker image remove already
robert@ununtu220402:~$ sudo docker image ls
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE

# image not in local, auto load and run
robert@ununtu220402:~$ sudo docker run -itd --name cl nginx
Unable to find image 'nginx:latest' locally

latest: Pulling from library/nginx
f1f26f570256: Pull complete 
84181e80d10e: Pull complete 
1ff0f94a8007: Pull complete 
d776269cad10: Pull complete 
e9427fcfa864: Pull complete 
d4ceccbfc269: Pull complete 
Digest: sha256:f4e3b6489888647ce1834b601c6c06b9f8c03dee6e097e13ed3e28c01ea3ac8c
Status: Downloaded newer image for nginx:latest
1d7e7bce6be6e42cbc3e35536a04887abda55cb2617aa897fbb24ca49ace8b5c

# list docker image 
robert@ununtu220402:~$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
1d7e7bce6be6   nginx     "/docker-entrypoint.…"   32 seconds ago   Up 23 seconds   80/tcp    cl

# remove docker container 
robert@ununtu220402:~$ sudo docker rm -f cl
cl
robert@ununtu220402:~$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

# remove docker image
robert@ununtu220402:~$ sudo docker rmi -f nginx
Untagged: nginx:latest
Untagged: nginx@sha256:f4e3b6489888647ce1834b601c6c06b9f8c03dee6e097e13ed3e28c01ea3ac8c
Deleted: sha256:ac232364af842735579e922641ae2f67d5b8ea97df33a207c5ea05f60c63a92d
Deleted: sha256:31888883f307f2ea78ac1dd1abd26ddae38ebe9aacfbb0250995a636b8531d8f
Deleted: sha256:d413a106f5d462ce56547539d6e8a6402a38631e8312690144be16c2101dda74
Deleted: sha256:64ee442aa082c659c502136dbcc60998aa970f569ff26b0098d4e7c463623660
Deleted: sha256:a7a27d87cf3ba004765cbb692a4584256dcd1eb7aff0049f8e1d4d45a3e50e4d
Deleted: sha256:cc6b5ded0d53019de2911c55226548c7707a29af8cd6a90eb51a437255aa0b42
Deleted: sha256:3af14c9a24c941c626553628cf1942dcd94d40729777f2fcfbcd3b8a3dfccdd6
robert@ununtu220402:~$ sudo docker image ls
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE

```

``` bash
# -p 8081:80: mean port 8081 map to port 80
robert@ununtu220402:~$ sudo docker run -itd --name cl -p 8081:80 nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
f1f26f570256: Pull complete 
84181e80d10e: Pull complete 
1ff0f94a8007: Pull complete 
d776269cad10: Pull complete 
e9427fcfa864: Pull complete 
d4ceccbfc269: Pull complete 
Digest: sha256:f4e3b6489888647ce1834b601c6c06b9f8c03dee6e097e13ed3e28c01ea3ac8c
Status: Downloaded newer image for nginx:latest
eefa6f4f047f2deb067ea8b4ee66722883c66bc3b7a176d8f0bdb16e1486906d

# show log by id
robert@ununtu220402:~$ sudo docker logs eef
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2023/03/28 03:44:33 [notice] 1#1: using the "epoll" event method
2023/03/28 03:44:33 [notice] 1#1: nginx/1.23.3
2023/03/28 03:44:33 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6) 
2023/03/28 03:44:33 [notice] 1#1: OS: Linux 5.19.0-38-generic
2023/03/28 03:44:33 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
2023/03/28 03:44:33 [notice] 1#1: start worker processes
2023/03/28 03:44:33 [notice] 1#1: start worker process 29
2023/03/28 03:44:33 [notice] 1#1: start worker process 30
2023/03/28 03:44:33 [notice] 1#1: start worker process 31
2023/03/28 03:44:33 [notice] 1#1: start worker process 32

# show log by name
robert@ununtu220402:~$ sudo docker logs cl 
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
....


# check docker conter more deatil
robert@ununtu220402:~$ sudo docker inspect cl
[
    {
        "Id": "eefa6f4f047f2deb067ea8b4ee66722883c66bc3b7a176d8f0bdb16e1486906d",
        "Created": "2023-03-28T03:44:28.411394496Z",
        "Path": "/docker-entrypoint.sh",
        "Args": [
            "nginx",
            "-g",
            "daemon off;"
        ],
        "State": {
            "Status": "running",
            "Running": true,

# see port 8081
robert@ununtu220402:~$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                   NAMES
eefa6f4f047f   nginx     "/docker-entrypoint.…"   16 minutes ago   Up 16 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   cl

# port 8080 for proxy
robert@ununtu220402:~$ sudo netstat -tulnp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      796/cupsd           
tcp        0      0 0.0.0.0:8081            0.0.0.0:*               LISTEN      7269/docker-proxy   
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      626/systemd-resolve 
tcp6       0      0 :::8081                 :::*                    LISTEN      7276/docker-proxy   
tcp6       0      0 ::1:631                 :::*                    LISTEN      796/cupsd           
udp        0      0 0.0.0.0:631             0.0.0.0:*                           867/cups-browsed    
udp        0      0 0.0.0.0:54502           0.0.0.0:*                           680/avahi-daemon: r 
udp        0      0 0.0.0.0:5353            0.0.0.0:*                           680/avahi-daemon: r 
udp        0      0 127.0.0.53:53           0.0.0.0:*                           626/systemd-resolve 
udp6       0      0 :::5353                 :::*                                680/avahi-daemon: r 
udp6       0      0 :::50980                :::*                                680/avahi-daemon: r 

# show ip
robert@ununtu220402:~$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:d6:70:ac brd ff:ff:ff:ff:ff:ff
    inet 192.168.126.173/24 brd 192.168.126.255 scope global dynamic noprefixroute enp0s3
       valid_lft 71861sec preferred_lft 71861sec
    inet6 fe80::504e:724a:d5ad:280f/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:20:26:e3:33 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:20ff:fe26:e333/64 scope link 
       valid_lft forever preferred_lft forever
13: vethef89778@if12: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default 
    link/ether 2e:8e:5a:08:b3:b5 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::2c8e:5aff:fe08:b3b5/64 scope link 
       valid_lft forever preferred_lft forever


# docker network
robert@ununtu220402:~$ sudo docker network list 
NETWORK ID     NAME      DRIVER    SCOPE
f693fe394599   bridge    bridge    local
7102b42969ff   host      host      local
2ff6001e5549   none      null      local

obert@ununtu220402:~$ sudo docker container list
CONTAINER ID   IMAGE     COMMAND                  CREATED             STATUS             PORTS                                   NAMES
46c4921ca1ff   nginx     "/docker-entrypoint.…"   About an hour ago   Up About an hour   0.0.0.0:8081->80/tcp, :::8081->80/tcp   cl2

# remove cl2
robert@ununtu220402:~$ sudo docker rm -f cl2     
cl2
robert@ununtu220402:~$ ip a                      
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:d6:70:ac brd ff:ff:ff:ff:ff:ff
    inet 192.168.126.173/24 brd 192.168.126.255 scope global dynamic noprefixroute enp0s3
       valid_lft 71240sec preferred_lft 71240sec
    inet6 fe80::504e:724a:d5ad:280f/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:20:26:e3:33 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:20ff:fe26:e333/64 scope link 
       valid_lft forever preferred_lft forever

# docker network lisr
robert@ununtu220402:~$ sudo docker network list
NETWORK ID     NAME      DRIVER    SCOPE
f693fe394599   bridge    bridge    local
7102b42969ff   host      host      local
2ff6001e5549   none      null      local

# create docker network 
robert@ununtu220402:~$ sudo docker network create --driver=bridge --subnet=192.168.10.0/24 --gateway=192.168.10.10 test
267432fb1cbb872b4a6079a7d7488db86d6bc0fa47144983fcd66b48b6e47ec6
# display docker network
robert@ununtu220402:~$ sudo docker network list
NETWORK ID     NAME      DRIVER    SCOPE
f693fe394599   bridge    bridge    local
7102b42969ff   host      host      local
2ff6001e5549   none      null      local
267432fb1cbb   test      bridge    local

# another container for cl2
robert@ununtu220402:~$ sudo docker run -itd --name cl2 --network test nginx
# inspect network
robert@ununtu220402:~$ sudo docker inspect test

# add cl3
robert@ununtu220402:~$ sudo docker run -itd --name cl3 nginx
# inspect network(cl and cl3)
robert@ununtu220402:~$ sudo docker inspect bridge

#del multi container
robert@ununtu220402:~$ sudo docker rm -f $(sudo docker container ls -a -q)
#del multi image
robert@ununtu220402:~$ sudo docker rmi -f $(sudo docker container ls -a -q)

.....

#### 2 container communication
``` bash
# add docker network(192.168.10.10 need change to 192.168.10.1)
kyp@u2204s:~$ sudo docker network create --driver=bridge --subnet=192.168.10.0/24 --gateway=192.168.10.10 test

# list docker network
kyp@u2204s:~$ sudo docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
428b0a58b3c9   bridge    bridge    local
ce47799cf7e3   host      host      local
72f0cc8b9157   none      null      local
120b0f810efd   test      bridge    local

# run c1 
kyp@u2204s:~$ sudo docker run -itd --name c1 -p 8081:80 nginx

# run c2 in network test
kyp@u2204s:~$ sudo docker run -itd --name c2 --network test -p 8082:80 nginx

# llst container
kyp@u2204s:~$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                   NAMES
01fef9135358   nginx     "/docker-entrypoint."   4 minutes ago    Up 4 minutes    0.0.0.0:8082->80/tcp, :::8082->80/tcp   c2
84ac6ea02d87   nginx     "/docker-entrypoint."   10 minutes ago   Up 10 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   c1

# check c1 ip 172.17.0.2
sudo docker inspect c1
# check c2 ip 192.168.10.1
sudo docker inspect c2

# enter c1 container
root@84ac6ea02d87:/> apt install iputils-ping -y
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
E: Unable to locate package iputils-ping
# update
root@84ac6ea02d87:/> apt update
# ping can not success
root@84ac6ea02d87:/>  ping 192.168.10.1
....
exit

# check netwrok test : c2
kyp@u2204s:~$ sudo docker inspect test

....
# inatsll iputils-ping
root@84ac6ea02d87:/> apt install iputils-ping -y

# link test to c1
kyp@u2204s:~$ sudo docker network connect test c1
# check netwrok test : c1,c2
# c2 ip 192.168.10.1
# c1 ip 192.168.10.2
kyp@u2204s:~$ sudo docker inspect test

# c1 pin c2
kyp@u2204s:~$ sudo docker exec -it c1 bash
root@84ac6ea02d87:/> ping 192.168.10.1
PING 192.168.10.1 (192.168.10.1) 56(84) bytes of data.
64 bytes from 192.168.10.1: icmp_seq=1 ttl=64 time=0.102 ms
64 bytes from 192.168.10.1: icmp_seq=2 ttl=64 time=0.120 ms
```

#### delete network
``` bash
# list container 
kyp@u2204s:~$ sudo docker container list
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                   NAMES
01fef9135358   nginx     "/docker-entrypoint."   31 minutes ago   Up 31 minutes   0.0.0.0:8082->80/tcp, :::8082->80/tcp   c2
84ac6ea02d87   nginx     "/docker-entrypoint."   37 minutes ago   Up 37 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   c1
kyp@u2204s:~$ sudo docker container ls -a
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                   NAMES
01fef9135358   nginx     "/docker-entrypoint."   31 minutes ago   Up 31 minutes   0.0.0.0:8082->80/tcp, :::8082->80/tcp   c2
84ac6ea02d87   nginx     "/docker-entrypoint."   37 minutes ago   Up 37 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   c1

# remove container
kyp@u2204s:~$ sudo docker rm -f $(sudo docker container ls -a -q)
01fef9135358
84ac6ea02d87
kyp@u2204s:~$ sudo docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
428b0a58b3c9   bridge    bridge    local
ce47799cf7e3   host      host      local
72f0cc8b9157   none      null      local
120b0f810efd   test      bridge    local
kyp@u2204s:~$
# remove network
kyp@u2204s:~$ sudo docker network rm test
test
kyp@u2204s:~$ sudo docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
428b0a58b3c9   bridge    bridge    local
ce47799cf7e3   host      host      local
72f0cc8b9157   none      null      local
```

# add new user permission for docker
``` bash
# add user
# kyp@u2204s:~$ sudo userdel user1
kyp@u2204s:~$ sudo adduser user1
# check user
kyp@u2204s:~$ cat /etc/passwd

kyp@u2204s:~$ su user1
Password:
user1@u2204s:/home/kyp$
user1@u2204s:/home/kyp$ docker image ls
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/images/json": dial unix /var/run/docker.sock: connect: permission denied

exit

# check group
user1@u2204s:/home/kyp$ ls -la /var/run/docker.sock
srw-rw---- 1 root docker 0 Mar 29 01:35 /var/run/docker.sock

# add user1 to group docker
kyp@u2204s:~$ sudo usermod -aG docker user1
# test run docker in user1
kyp@u2204s:~$ su user1
Password:
user1@u2204s:/home/kyp$ docker image ls
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
nginx        latest    080ed0ed8312   4 hours ago   142MB
user1@u2204s:/home/kyp$ docker container ls
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

``` bash
# add index in /demo
kyp@u2204s:~$ mkdir /demo
mkdir: cannot create directory /demo: Permission denied
kyp@u2204s:~$ sudo mkdir /demo
kyp@u2204s:~$ cd /demo
kyp@u2204s:/demo$ ls
kyp@u2204s:/demo$ sudo nano index.html
kyp@u2204s:/demo$ cat index.html
<h1>hi this is the demo of RO/RW permission of volume section</h1>

# add conatiner
# /usr/share/nginx/html 位於 container 內部
# 使之對應 /demo
kyp@u2204s:/demo$ sudo docker run  -itd --name c1 -v $(pwd):/usr/share/nginx/html -p 8081:80 nginx
a5594f59e50fc917bb47f1cb98989a12ed1398d27bf1cc669c451a5d47321fc8

# run browser :　http://192.168.126.187:8081/　
# show : hi this is the demo of RO/RW permission of volume section

kyp@u2204s:/demo$ sudo docker exec -it c1 bash
root@a5594f59e50f:/# cd /usr/share/nginx/html
root@a5594f59e50f:/usr/share/nginx/html> vim index.html
bash: vim: command not found

# update
root@a5594f59e50f:/usr/share/nginx/html> apt update
....

# insrall nano
root@a5594f59e50f:/usr/share/nginx/html> apt install nano
....

# modify index.html
root@a5594f59e50f:/usr/share/nginx/html> nano index.html

kyp@u2204s:/demo$ sudo docker rm -f c1
c1
# change to container read only
kyp@u2204s:/demo$ sudo docker run  -itd --name c1 -v $(pwd):/usr/share/nginx/html:ro -p 8081:80 nginx
870f1253c44c1888eadced7a2e43834a0dc6b75343222a48834022c5b10d0c37
```

``` bash
# clone volumes from other container
kyp@u2204s:/demo$ sudo docker run -itd --name c2 --volumes-from c1 -p 8082:80 nginx
b8802a1a314eeda933f9e28669fb0b7e352cdb175208eef1d639962698cc4109

# run browser :　http://192.168.126.187:8082/　
```

#### create container
``` bash
# create container
kyp@u2204s:/demo$ sudo docker run -itd --name c1 -p 8081:80 nginx

# enter container 
kyp@u2204s:/demo$ sudo docker exec -it c1 bash
root@9ee699e55910:/# ls
bin   dev                  docker-entrypoint.sh  home  lib64  mnt  proc  run   srv  tmp  var
boot  docker-entrypoint.d  etc                   lib   media  opt  root  sbin  sys  usr
root@9ee699e55910:/# mkdir robert
root@9ee699e55910:/# mkdir docker
root@9ee699e55910:/# touch application
root@9ee699e55910:/# touch frontend

kyp@u2204s:/demo$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                                   NAMES
9ee699e55910   nginx     "/docker-entrypoint."   8 minutes ago   Up 7 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   c1
kyp@u2204s:/demo$
kyp@u2204s:/demo$ git commit c1 robert:v1
fatal: not a git repository (or any of the parent directories): .git
kyp@u2204s:/demo$
kyp@u2204s:/demo$
kyp@u2204s:/demo$ sudo docker commit c1 robert:v1
sha256:0fef41bffdcf0dac8dd4c2d8ec97fb3d3800182536148a5c49998b47585d555f
kyp@u2204s:/demo$ sudo image ls
sudo: image: command not found
kyp@u2204s:/demo$ sudo docker image ls
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
robert       v1        0fef41bffdcf   22 seconds ago   162MB
nginx        latest    080ed0ed8312   8 hours ago      142MB
kyp@u2204s:/demo$ sudo docker rm -f c1
c1
kyp@u2204s:/demo$ sudo docker container ls
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
kyp@u2204s:/demo$ sudo docker run -itd --name c5 robert:v1
8d58bf58306be10c0f261e60b441d0a0a00f2999756ea43d36b322ee18ebfe0f
kyp@u2204s:/demo$ sudo docker container ls
CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS          PORTS     NAMES
8d58bf58306b   robert:v1   "/docker-entrypoint."   18 seconds ago   Up 16 seconds   80/tcp    c5
kyp@u2204s:/demo$ sudo docker exec -it c5 bash
root@8d58bf58306b:/# ls
application  boot  docker               docker-entrypoint.sh  frontend  lib    media  opt   robert  run   srv  tmp  var
bin          dev   docker-entrypoint.d  etc                   home      lib64  mnt    proc  root    sbin  sys  usr
root@8d58bf58306b:/# nano index.html
root@8d58bf58306b:/# exit
exit
```

#### change docker image tag
``` bash
kyp@u2204s:/demo$ sudo docker image ls
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
robert       v1        0fef41bffdcf   9 minutes ago   162MB
nginx        latest    080ed0ed8312   8 hours ago     142MB
# change docker image tag
kyp@u2204s:/demo$ sudo docker image tag robert:v1 application:1.0
kyp@u2204s:/demo$ sudo docker image ls
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
application   1.0       0fef41bffdcf   9 minutes ago   162MB
robert        v1        0fef41bffdcf   9 minutes ago   162MB
nginx         latest    080ed0ed8312   8 hours ago     142MB
```

#### push docker image
``` bash
kyp@u2204s:/demo$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: hot5656
Password:
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/auth": dial unix /var/run/docker.sock: connect: permission denied

kyp@u2204s:/demo$ cat /etc/group

kyp@u2204s:/demo$ sudo chmod 666 /var/run/docker.sock
kyp@u2204s:/demo$ sudo usermod -aG docker kyp
[sudo] password for kyp:

kyp@u2204s:/demo$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: hot5656
Password:
WARNING! Your password will be stored unencrypted in /home/kyp/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded

kyp@u2204s:/demo$ docker image ls
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
application   1.0       0fef41bffdcf   52 minutes ago   162MB
robert        v1        0fef41bffdcf   52 minutes ago   162MB
nginx         latest    080ed0ed8312   9 hours ago      142MB
# push response denied
kyp@u2204s:/demo$ docker push application:1.0
The push refers to repository [docker.io/library/application]
07f972031d3d: Preparing
ff4557f62768: Preparing
4d0bf5b5e17b: Preparing
95457f8a16fd: Preparing
a0b795906dc1: Preparing
af29ec691175: Waiting
3af14c9a24c9: Waiting
denied: requested access to the resource is denied

# must create repsitory at dockerhub 1st
# I add hot5656/test

# add tag same as dockerhub repsitory
kyp@u2204s:/demo$ docker tag application:1.0 hot5656/test:1.0
kyp@u2204s:/demo$ docker image ls
REPOSITORY     TAG       IMAGE ID       CREATED             SIZE
hot5656/test   1.0       0fef41bffdcf   About an hour ago   162MB
application    1.0       0fef41bffdcf   About an hour ago   162MB
robert         v1        0fef41bffdcf   About an hour ago   162MB
nginx          latest    080ed0ed8312   9 hours ago         142MB

# push
kyp@u2204s:/demo$ docker push hot5656/test:1.0
The push refers to repository [docker.io/hot5656/test]
07f972031d3d: Pushed
ff4557f62768: Pushed
4d0bf5b5e17b: Pushed
95457f8a16fd: Pushed
a0b795906dc1: Pushed
af29ec691175: Pushed
3af14c9a24c9: Pushed
1.0: digest: sha256:4fc16fffa780fc5ea7330c32ac044ac30f756ab189aeed56ca4941a05f986da0 size: 178
kyp@u2204s:/demo$
```

#### rename container 
``` bash
kyp@u2204s:/demo$ docker container ls
CONTAINER ID   IMAGE       COMMAND                  CREATED             STATUS             PORTS     NAMES
8d58bf58306b   robert:v1   "/docker-entrypoint."   About an hour ago   Up About an hour   80/tcp    c5
kyp@u2204s:/demo$ docker container rename c5 frontend
kyp@u2204s:/demo$ docker container ls
CONTAINER ID   IMAGE       COMMAND                  CREATED             STATUS             PORTS     NAMES
8d58bf58306b   robert:v1   "/docker-entrypoint."   About an hour ago   Up About an hour   80/tcp    frontend
kyp@u2204s:/demo$
```

#### create 1st docker file
``` bash

kyp@u2204s:/demo$ sudo nano dockerfile
[sudo] password for kyp:
==================
FROM ubuntu
RUN     apt update
RUN     apt install apache2 -y
COPY    .       /var/www/html
ENTRYPOINT      apachectl -D FOREGROUND
====================
沒有修改亦ok
====================
FROM ubuntu
ARG DEBIAN_FRONTEND=noniteractive
RUN     apt update
RUN     apt install apache2 -y
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
COPY    .       /var/www/html
ENTRYPOINT      apachectl -D FOREGROUND
====================
# AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.17.0.3. Set the 'ServerName' directive globally to suppress this message
====================

kyp@u2204s:/demo$ cat dockerfile
FROM ubuntu
RUN     apt update
RUN     apt install apache2 -y
COPY    .       /var/www/html
ENTRYPOINT      apachectl -D FOREGEROUND

kyp@u2204s:/demo$ ls
dockerfile  index.html

# build
kyp@u2204s:/demo$ docker build -t firstimage:1.0 .
....

kyp@u2204s:/demo$ docker image list
REPOSITORY     TAG       IMAGE ID       CREATED         SIZE
firstimage     1.0       04de0efc7c90   5 minutes ago   228MB
robert         v1        0fef41bffdcf   2 hours ago     162MB
hot5656/test   1.0       0fef41bffdcf   2 hours ago     162MB
application    1.0       0fef41bffdcf   2 hours ago     162MB
nginx          latest    080ed0ed8312   9 hours ago     142MB
ubuntu         latest    08d22c0ceb15   3 weeks ago     77.8MB


kyp@u2204s:/demo$ docker run -itd --name cl4 -p 8084:80 apache2:4.0

```

#### show logs
```
kyp@u2204s:/demo$ docker logs c10
AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.17.0.3. Set the 'ServerName' directive globally to suppress this message
```

#### ENTRYPOINT and CMD
CMD can by overrite, but ENTRYPOINT not
``` bash
# dockerfile
# kyp@u2204s:~/v1$ cat dockerfile
# FROM ubuntu
# RUN apt update
# CMD     ["echo", "CMD"]

# build image
kyp@u2204s:~/v1$ docker build -t v1 .
kyp@u2204s:~/v1$ docker image ls
REPOSITORY     TAG       IMAGE ID       CREATED          SIZE
v1             latest    657c10191368   44 seconds ago   121MB
apache2        4.0       bc6570680688   30 minutes ago   228MB
testdemo3      1.0       aa38a211dffd   16 hours ago     228MB
hot5656/test   1.0       0fef41bffdcf   19 hours ago     162MB
robert         v1        0fef41bffdcf   19 hours ago     162MB
nginx          latest    080ed0ed8312   27 hours ago     142MB
ubuntu         latest    08d22c0ceb15   3 weeks ago      77.8MB

# run
kyp@u2204s:~/v1$ docker run -it v1:latest
CMD
kyp@u2204s:~/v1$ docker run -it v1:latest whoami
root
kyp@u2204s:~/v1$ docker run -it v1:latest pwd
/

# dockerfile
kyp@u2204s:~/v2$ cat ./dockerfile
FROM ubuntu
RUN apt update
ENTRYPOINT      ["echo", "CMD"]

# build image
kyp@u2204s:~/v2$ docker build -t v2 .

# run
kyp@u2204s:~/v2$ docker run -it v2:latest
CMD
kyp@u2204s:~/v2$ docker run -it v2:latest ls -al
CMD ls -al
kyp@u2204s:~/v2$ docker run -it v2:latest pwd
CMD pwd
```

#### switch user
``` bash
# dockerfile
kyp@u2204s:~/v3$ cat ./dockerfile
FROM ubuntu
RUN apt update
RUN     whoami
RUN     mkdir /tmp/root-app
RUN     touch /tmp/root-file
USER    nobody
RUN     whoami
RUN     mkdir /tmp/nobody-app
RUN     touch /tmp/nobody-file

# build image
kyp@u2204s:~/v3$ docker build v3:1.0 .
"docker build" requires exactly 1 argument.
See 'docker build --help'.
Usage:  docker build [OPTIONS] PATH | URL | -
Build an image from a Dockerfile
kyp@u2204s:~/v3$ docker build -t v3:1.0 .
Sending build context to Docker daemon  2.048kB
Step 1/9 : FROM ubuntu
 ---> 08d22c0ceb15
Step 2/9 : RUN apt update
 ---> Using cache
 ---> f312ea4ab153
Step 3/9 : RUN  whoami
 ---> Running in 6921b67e61d0
root
Removing intermediate container 6921b67e61d0
 ---> 359caae01c49
Step 4/9 : RUN  mkdir /tmp/root-app
 ---> Running in 2a3750cca39a
Removing intermediate container 2a3750cca39a
 ---> cfb055096529
Step 5/9 : RUN  touch /tmp/root-file
 ---> Running in fe5e86b3d49c
Removing intermediate container fe5e86b3d49c
 ---> 363f5637b260
Step 6/9 : USER nobody
 ---> Running in 575a15647d62
Removing intermediate container 575a15647d62
 ---> e6a11a260269
Step 7/9 : RUN  whoami
 ---> Running in 9b2c0cc76478
nobody
Removing intermediate container 9b2c0cc76478
 ---> 9338c4e99a39
Step 8/9 : RUN  mkdir /tmp/nobody-app
 ---> Running in 63a86e84ecce
Removing intermediate container 63a86e84ecce
 ---> 68dafaf60556
Step 9/9 : RUN  touch /tmp/nobody-file
 ---> Running in 3b51a933c072
Removing intermediate container 3b51a933c072
 ---> f2aee89412a7
Successfully built f2aee89412a7
Successfully tagged v3:1.0
kyp@u2204s:~/v3$
# run 
kyp@u2204s:~/v3$ docker run -itd --name c1 v3:1.0
769bbaf1cb87dedc60fe8d3086fa4d7ce3646851ade978ae847c1fe5f2e263a3
# neter container
kyp@u2204s:~/v3$ docker exec -it c1 bash
nobody@769bbaf1cb87:/$ ls -al /tmp
total 16
drwxrwxrwt 1 root   root    4096 Mar 30 02:12 .
drwxr-xr-x 1 root   root    4096 Mar 30 02:15 ..
drwxr-xr-x 2 nobody nogroup 4096 Mar 30 02:12 nobody-app
-rw-r--r-- 1 nobody nogroup    0 Mar 30 02:12 nobody-file
drwxr-xr-x 2 root   root    4096 Mar 30 02:12 root-app
-rw-r--r-- 1 root   root       0 Mar 30 02:12 root-file
nobody@769bbaf1cb87:/$ exit

#dockerfile 
kyp@u2204s:~/v32$ cat ./dockerfile
FROM ubuntu
RUN apt update -y
RUN apt-get install openssl -y
RUN apt-get install apt-utils -y
RUN useradd -m -d /home/user1 -s /bin/bash -g root -G sudo -u 1002 user1 -p "$(echo 'user1' | openssl passwd -6 -stdin)"
RUN useradd -m -d /home/robert -s /bin/bash -g root -G sudo -u 1001 robert -p "$(echo 'robert' | openssl passwd -6 -stdin)"
USER robert
RUN     mkdir /tmp/robert

# build image
kyp@u2204s:~/v32$ docker build -t v3:2.0 .

# run
kyp@u2204s:~/v32$ docker run -itd --name c3 v3:2.0
f07e86919041372e959e3b5aa9deeec299bb7facbaf07ca5d9d5a808b122d096
# enter container
kyp@u2204s:~/v32$ docker exec -it  c3 bash
robert@f07e86919041:/$ su user1
Password:
user1@f07e86919041:/$ su robert
Password:
robert@f07e86919041:/$ exit
exit
user1@f07e86919041:/$ exit
exit
robert@f07e86919041:/$ ls /tmp -al
total 12
drwxrwxrwt 1 root   root 4096 Mar 30 03:51 .
drwxr-xr-x 1 root   root 4096 Mar 30 03:53 ..
drwxr-xr-x 2 robert root 4096 Mar 30 03:51 robert
robert@f07e86919041:/$ exit
exit

# dockerfile
kyp@u2204s:~/v33$ cat ./dockerfile
FROM ubuntu
RUN apt-get update -y
RUN apt-get install openssl -y
RUN useradd -m -d /home/user1 -s /bin/bash -g root -G sudo -u 1002 user1 -p "$(echo 'user1' | openssl passwd -6 -stdin)"
RUN useradd -m -d /home/robert -s /bin/bash -g root -G sudo -u 1001 robert -p "$(echo 'robert' | openssl passwd -6 -stdin)"
USER robert
RUN     mkdir /tmp/robert

# 
# -m: create the user's home directory if it doesn't exist.
# -d /home/robert: set the home directory for the user to /home/robert.
# -s /bin/bash: set the default shell for the user to /bin/bash.
# -g root: set the primary group for the user to root.
# -G sudo: add the user to the sudo group.
# -u 1001: set the user's UID to 1001.
# robert: set the username for the new user.
# -p "$(echo 'robert' | openssl passwd -6 -stdin)": set the password for the user to the output of the openssl passwd -6 -stdin <<< robert command, which generates a hashed password for the user.
# apt-get : not show some terminal message when build
# openssl : for add user password

# build
kyp@u2204s:~/v33$ docker build -t v3:3.0 .

# run
kyp@u2204s:~/v33$ docker run -itd --name c5 v3:3.0
c8a0a274c3b3452ef4e1a6859bf015de3decff1d66160b25b98350c78c2ac1d8
kyp@u2204s:~/v33$ docker exec -it c5 bash
robert@c8a0a274c3b3:/$ su user1
Password:
user1@c8a0a274c3b3:/$ su robert
Password:
robert@c8a0a274c3b3:/$ ls /tmp -al
total 12
drwxrwxrwt 1 root   root 4096 Mar 30 04:15 .
drwxr-xr-x 1 root   root 4096 Mar 30 04:17 ..
drwxr-xr-x 2 robert root 4096 Mar 30 04:15 robert
robert@c8a0a274c3b3:/$
```

#### other
``` bash
# FROM
# USER
# RUN
# ENTRYPOINT
# CMD
# ARG
#
# WORKDIR			/tmp
# COPY				copy the content from source to Destination
# ADD					It can be URL/LINK
# ENV					key=value user=robert
# MAINTAINER	robert
# EXPOSE			80
```


#### Install the Compose
``` bash
# install 
kyp@u2204s:~/v33$ sudo apt-get update
Hit:1 http://tw.archive.ubuntu.com/ubuntu focal InRelease
Hit:2 http://tw.archive.ubuntu.com/ubuntu focal-updates InRelease
Hit:3 http://tw.archive.ubuntu.com/ubuntu focal-backports InRelease
Hit:4 https://download.docker.com/linux/ubuntu focal InRelease
Hit:5 http://tw.archive.ubuntu.com/ubuntu focal-security InRelease
Reading package lists... Done
kyp@u2204s:~/v33$ sudo apt-get install docker-compose-plugin
Reading package lists... Done
Building dependency tree
Reading state information... Done
docker-compose-plugin is already the newest version (2.17.2-1~ubuntu.20.04~focal).
0 upgraded, 0 newly installed, 0 to remove and 12 not upgraded.
kyp@u2204s:~/v33$ docker compose version
Docker Compose version v2.17.2

# docker-compose.yml
kyp@u2204s:~/compose$ cat ./docker-compose.yml
version: "3"
services:
  application:
    image: nginx
    ports:
      - "8081:80"
# run
kyp@u2204s:~/compose$ sudo docker compose up -d
[+] Running 2/2
 ? Network compose_default          Created                                                    0.1s
 ? Container compose-application-1  Started                                                    0.9s

# compose
kyp@u2204s:~/compose$ docker compose ps
NAME                    IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
compose-application-1   nginx               "/docker-entrypoint."   application         2 minutes ago       Up 2 minutes        0.0.0.0:8081->80/tcp, :::8081->80/tcp
# container
kyp@u2204s:~/compose$ docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                                   NAMES
f3b8f73706db   nginx     "/docker-entrypoint."   4 minutes ago   Up 4 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   compose-application-1

# browser open : http://192.168.126.187:8081/

# ip
kyp@u2204s:~/compose$ ip a
......
100: br-e99673d6d53b: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:3d:fa:01:ca brd ff:ff:ff:ff:ff:ff
    inet 172.18.0.1/16 brd 172.18.255.255 scope global br-e99673d6d53b
       valid_lft forever preferred_lft forever
    inet6 fe80::42:3dff:fefa:1ca/64 scope link
       valid_lft forever preferred_lft forever

# network :　compose_default
kyp@u2204s:~/compose$ docker network ls
NETWORK ID     NAME              DRIVER    SCOPE
cc7598d6c9a3   bridge            bridge    local
e99673d6d53b   compose_default   bridge    local
ce47799cf7e3   host              host      local
72f0cc8b9157   none              null      local

# compose down
kyp@u2204s:~/compose$ docker compose down
[+] Running 2/2
 ? Container compose-application-1  Removed                                                                                                                              0.6s
 ? Network compose_default          Removed                                                                                                                              0.1s
kyp@u2204s:~/compose$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
cc7598d6c9a3   bridge    bridge    local
ce47799cf7e3   host      host      local
72f0cc8b9157   none      null      local
kyp@u2204s:~/compose$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:cd:9f:7e brd ff:ff:ff:ff:ff:ff
    inet 192.168.126.187/24 brd 192.168.126.255 scope global dynamic enp0s3
       valid_lft 62088sec preferred_lft 62088sec
    inet6 fe80::a00:27ff:fecd:9f7e/64 scope link
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default
    link/ether 02:42:e0:cf:3f:9c brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:e0ff:fecf:3f9c/64 scope link
       valid_lft forever preferred_lft forever
```

#### multiple complse
``` bash
# docker-compose.yml
kyp@u2204s:~/compose2$ cat ./docker-compose.yml
version: "3"
services:
  application:
    image: nginx
    ports:
      - "8081:80"
  application-2:
    image: nginx
    ports:
      - "8082:80"

# up compose
kyp@u2204s:~/compose2$ docker compose up -d
[+] Running 3/3
 ? Network compose2_default            Created                                                                                                                           0.5s
 ? Container compose2-application-2-1  Started                                                                                                                           1.0s
 ? Container compose2-application-1    Started                                                                                                                           0.9s
kyp@u2204s:~/compose2$ docker compose ps
NAME                       IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
compose2-application-1     nginx               "/docker-entrypoint."   application         35 seconds ago      Up 34 seconds       0.0.0.0:8081->80/tcp, :::8081->80/tcp
compose2-application-2-1   nginx               "/docker-entrypoint."   application-2       35 seconds ago      Up 34 seconds       0.0.0.0:8082->80/tcp, :::8082->80/tcp
kyp@u2204s:~/compose2$ docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS              PORTS                                   NAMES
3cda852326a4   nginx     "/docker-entrypoint."   About a minute ago   Up About a minute   0.0.0.0:8081->80/tcp, :::8081->80/tcp   compose2-application-1
ae2a6cd241a8   nginx     "/docker-entrypoint."   About a minute ago   Up About a minute   0.0.0.0:8082->80/tcp, :::8082->80/tcp   compose2-application-2-1	

# browser open : http://192.168.126.187:8081/
# browser open : http://192.168.126.187:8082/

# docker-compose.yml
kyp@u2204s:~/compose2$ cat ./docker-compose.yml
version: "3"
services:
  application:
    image: nginx
    ports:
      - "8081:80"
  application-2:
    image: nginx
    ports:
      - "8083:80"
kyp@u2204s:~/compose2$ docker compose up -d
[+] Running 2/2
 ? Container compose2-application-2-1  Started                                                                                                                           1.4s
 ? Container compose2-application-1    Running

kyp@u2204s:~/compose2$ docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                   NAMES
3f66cd5ab6cc   nginx     "/docker-entrypoint."   2 minutes ago    Up 2 minutes    0.0.0.0:8083->80/tcp, :::8083->80/tcp   compose2-application-2-1
3cda852326a4   nginx     "/docker-entrypoint."   10 minutes ago   Up 10 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   compose2-application-1

# browser open : http://192.168.126.187:8081/
# browser open : http://192.168.126.187:8083/

# stop then start
kyp@u2204s:~/compose2$ docker compose stop
[+] Running 2/2
 ? Container compose2-application-2-1  Stopped                                                                                                                           0.8s
 ? Container compose2-application-1    Stopped                                                                                                                           0.8s
kyp@u2204s:~/compose2$
kyp@u2204s:~/compose2$ docker compose start
[+] Running 2/2
 ? Container compose2-application-1    Started                                                                                                                           0.7s
 ? Container compose2-application-2-1  Started                                                                                                                           0.9s
kyp@u2204s:~/compose2$
kyp@u2204s:~/compose2$ docker compose down
[+] Running 3/3
 ? Container compose2-application-1    Removed                                                                                                                           1.0s
 ? Container compose2-application-2-1  Removed                                                                                                                           1.0s
 ? Network compose2_default            Removed


kyp@u2204s:~/compose2$ mv docker-compose.yml name.yml
kyp@u2204s:~/compose2$ ls
name.yml
kyp@u2204s:~/compose2$ docker compose up -d
no configuration file provided: not found


kyp@u2204s:~/compose2$
kyp@u2204s:~/compose2$ mv name.yml v1.yaml
kyp@u2204s:~/compose2$ ls
v1.yaml
kyp@u2204s:~/compose2$ docker compose -f v1.yaml up -d
[+] Running 3/3
 ? Network compose2_default            Created                                                                                                                           0.4s
 ? Container compose2-application-1    Started                                                                                                                           0.8s
 ? Container compose2-application-2-1  Started                                                                                                                           0.9s

kyp@u2204s:~/compose2$ docker compose -f v1.yaml down
[+] Running 3/3
 ? Container compose2-application-1    Removed                                                                                                                           1.0s
 ? Container compose2-application-2-1  Removed                                                                                                                           1.0s
 ? Network compose2_default            Removed                                                                                                                           0.1s
kyp@u2204s:~/compose2$


# run 
kyp@u2204s:~/compose2$ docker compose -f v1.yaml up
^CGracefully stopping... (press Ctrl+C again to force)
Aborting on container exit...
[+] Running 2/2
 ? Container compose2-application-1    Stopped                                                                                                                           1.0s
 ? Container compose2-application-2-1  Stopped                                                                                                                           1.0s
canceled
kyp@u2204s:~/compose2$

# run
kyp@u2204s:~/compose2$ docker compose -f v1.yaml up -d
[+] Running 2/2
 ? Container compose2-application-2-1  Started                                                                                                                           0.6s
 ? Container compose2-application-1    Started
kyp@u2204s:~/compose2$ docker compose ps
no configuration file provided: not found
kyp@u2204s:~/compose2$ docker compose ps -f v1.yaml
unknown shorthand flag: 'f' in -f
kyp@u2204s:~/compose2$ docker compose -f v1.yaml ps
NAME                       IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
compose2-application-1     nginx               "/docker-entrypoint."   application         5 minutes ago       Up 18 seconds       0.0.0.0:8081->80/tcp, :::8081->80/tcp
compose2-application-2-1   nginx               "/docker-entrypoint."   application-2       5 minutes ago       Up 18 seconds       0.0.0.0:8083->80/tcp, :::8083->80/tcp 
```
# build image from compose
``` bash
kyp@u2204s:~/compose2$ docker image ls
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
kyp@u2204s:~/compose2$ docker container ls -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

kyp@u2204s:~/compose2$ cat ./docker
docker-compose.yaml  dockerfile
kyp@u2204s:~/compose2$ cat ./docker-compose.yaml
version: "3"
services:
  frontend:
    build: .
    ports:
      - "8085:80"
kyp@u2204s:~/compose2$ cat ./docker-compose.yaml
version: "3"
services:
  frontend:
    build: .
    ports:
      - "8085:80"
kyp@u2204s:~/compose2$ cat ./index.html
<h1>Hi this is the image whicj we have created with Docker-compose</h1>

# compose up
kyp@u2204s:~/compose2$ docker compose up -d

kyp@u2204s:~/compose2$ docker image ls
REPOSITORY          TAG       IMAGE ID       CREATED              SIZE
compose2-frontend   latest    939c638c92fe   About a minute ago   229MB
kyp@u2204s:~/compose2$ docker container ls
CONTAINER ID   IMAGE               COMMAND                  CREATED         STATUS         PORTS                                   NAMES
6a382cc76473   compose2-frontend   "/bin/sh -c 'apachec"   2 minutes ago   Up 2 minutes   0.0.0.0:8085->80/tcp, :::8085->80/tcp   compose2-frontend-1

# open browser: http://192.168.126.187:8085/

# give image name
kyp@u2204s:~/compose2$ docker compose down

kyp@u2204s:~/compose2$ docker image ls
REPOSITORY          TAG       IMAGE ID       CREATED          SIZE
compose2-frontend   latest    939c638c92fe   19 minutes ago   229MB
kyp@u2204s:~/compose2$ docker rmi -f $(docker image ls -a -q)
Untagged: compose2-frontend:latest
Deleted: sha256:939c638c92fefa52b8e4ce3399feec3aedbfc88d5451068ffe99739e0e9db750

kyp@u2204s:~/compose2$ cat ./docker-compose.yaml
version: "3"
services:
  frontend:
    build: .
    ports:
      - "8085:80"
    image: composeimage:1.0

kyp@u2204s:~/compose2$ docker compose up -d
......
kyp@u2204s:~/compose2$ docker image ls
REPOSITORY     TAG       IMAGE ID       CREATED              SIZE
composeimage   1.0       2bf3a001bb1f   About a minute ago   229MB
kyp@u2204s:~/compose2$ docker container ls
CONTAINER ID   IMAGE              COMMAND                  CREATED              STATUS              PORTS                                   NAMES
c95414d1f043   composeimage:1.0   "/bin/sh -c 'apachec"   About a minute ago   Up About a minute   0.0.0.0:8085->80/tcp, :::8085->80/tcp   compose2-frontend-1

# open browser: http://192.168.126.187:8085/
```

# Wrodpress + Mysql componse
``` bash
kyp@u2204s:~/worldpress$ cat ./docker-compose.yaml
services:
  db:
    image: mariadb:10.6.4-focal
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: password
    volumes:
      - db_data:/var/lib/mysql
    restart: always

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - 8080:80
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: password
      WORDPRESS_DB_NAME: wordpress
volumes:
  db_data:

kyp@u2204s:~/worldpress$ docker compose up -d
kyp@u2204s:~/worldpress$ docker compose ls
NAME                STATUS              CONFIG FILES
worldpress          running(2)          /home/kyp/worldpress/docker-compose.yaml

# down
kyp@u2204s:~/worldpress$ docker compose down
[+] Running 3/3
 ? Container worldpress-wordpress-1  Removed                                                   1.6s
 ? Container worldpress-db-1         Removed                                                   1.2s
 ? Network worldpress_default        Removed                                                   0.1s
kyp@u2204s:~/worldpress$ docker compose ps
NAME                IMAGE               COMMAND             SERVICE             CREATED             STATUS              PORTS
kyp@u2204s:~/worldpress$ docker container ls
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
kyp@u2204s:~/worldpress$ docker container ls -a
CONTAINER ID   IMAGE              COMMAND                  CREATED        STATUS                      PORTS     NAMES


# next 
kyp@u2204s:~/worldpress$ docker rmi -f $(docker image ls -a -q)
# include insert data, because volume not remove
kyp@u2204s:~/worldpress$ docker compose up -d
kyp@u2204s:~/worldpress$ docker compose ps
NAME                     IMAGE                  COMMAND                  SERVICE             CREATED             STATUS              PORTS
worldpress-db-1          mariadb:10.6.4-focal   "docker-entrypoint.s"   db                  2 minutes ago       Up 2 minutes        3306/tcp
worldpress-wordpress-1   wordpress:latest       "docker-entrypoint.s"   wordpress           2 minutes ago       Up 2 minutes        0.0.0.0:8080->80/tcp, :::8080->80/tcp
kyp@u2204s:~/worldpress$ docker compose ps -a
NAME                     IMAGE                  COMMAND                  SERVICE             CREATED             STATUS              PORTS
worldpress-db-1          mariadb:10.6.4-focal   "docker-entrypoint.s"   db                  2 minutes ago       Up 2 minutes        3306/tcp
worldpress-wordpress-1   wordpress:latest       "docker-entrypoint.s"   wordpress           2 minutes ago       Up 2 minutes        0.0.0.0:8080->80/tcp, :::8080->80/tcp

# down volume
kyp@u2204s:~/worldpress$ docker compose down --volumes
[+] Running 4/4
 ? Container worldpress-wordpress-1  Removed                                                   1.7s
 ? Container worldpress-db-1         Removed                                                   0.9s
 ? Volume worldpress_db_data         Removed                                                   0.0s
 ? Network worldpress_default        Removed                                                   0.1s
kyp@u2204s:~/worldpress$
kyp@u2204s:~/worldpress$
kyp@u2204s:~/worldpress$ docker compose up -d
[+] Running 4/4
 ? Network worldpress_default        Created                                                   0.2s
 ? Volume "worldpress_db_data"       Created                                                   0.0s
 ? Container worldpress-db-1         Started                                                   1.6s
 ? Container worldpress-wordpress-1  Started
# volume
kyp@u2204s:~/worldpress$ docker volume ls
DRIVER    VOLUME NAME
local     7ad5fb69ccd51064dbe1f5c709925f26e98f1256aa7d60ff456cdab358af5cc7
local     830a150b47b6434c66a09766c086defe47a80793f9575e029ed9b2d1c39075ae
local     6892341e4d898108168f962de19aabecc82d32ecb50d965d529c538b9f07b142
local     b81a54122bffcf2780380dda78d2bca3f4d77c6e3419186cf6ccc59b729853be
local     e5ab93ff1977459b722e658a3463332055a734706bf1069280fb7498f5fafec4
local     e9c0bcbebebe8ba4b2f6c3aaf1cc7e1eb2b2cafd3953c755599f1da610a7ddb6
local     worldpress_db_data
```

#### REST API
``` bash
kyp@u2204s:~/worldpress$ ps -ef | grep docker
root        1021       1 22 00:47 ?        00:21:53 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
kyp         5390    1352  0 02:23 pts/0    00:00:00 grep --color=auto docker
kyp@u2204s:~/worldpress$ nano /lib/systemd/system/docker.service
# [Service]
# Type=notify
# # the default is not to use systemd for cgroups because the delegate issues still
# # exists and systemd currently does not support the cgroup feature set required
# # for containers run by docker
# ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

# 2375 is default port
# [Service]
# Type=notify
# # the default is not to use systemd for cgroups because the delegate issues still
# # exists and systemd currently does not support the cgroup feature set required
# # for containers run by docker
# ExecStart=/usr/bin/dockerd -H fd:// -H=tcp://192.168.126.187:2375

# change 
# [Service]
# Type=notify
# # the default is not to use systemd for cgroups because the delegate issues still
# # exists and systemd currently does not support the cgroup feature set required
# # for containers run by docker
# ExecStart=/usr/bin/dockerd -H fd:// -H=tcp://192.168.126.187:5689

# clocal windows CLI
C:\Users\robertkao>set DOCKER_HOST=tcp://192.168.126.187:5689
# remote info
C:\Users\robertkao>docker info
Client:
 Context:    default
 Debug Mode: false
 Plugins:
  buildx: Docker Buildx (Docker Inc., v0.9.1)
  compose: Docker Compose (Docker Inc., v2.13.0)
  dev: Docker Dev Environments (Docker Inc., v0.0.5)
  extension: Manages Docker extensions (Docker Inc., v0.2.16)
  sbom: View the packaged-based Software Bill Of Materials (SBOM) for an image (Anchore Inc., 0.6.0)
  scan: Docker Scan (Docker Inc., v0.22.0)

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 2
 Server Version: 20.10.21
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Native Overlay Diff: true
  userxattr: false
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: 1
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: runc io.containerd.runc.v2 io.containerd.runtime.v1.linux
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 1e1ea6e986c6c86565bc33d52e34b81b3e2bc71f
 runc version: v1.1.4-0-g5fd4c4d
 init version: de40ad0
 Security Options:
  apparmor
  seccomp
   Profile: default
 Kernel Version: 5.4.0-146-generic
 Operating System: Ubuntu 20.04.6 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: 4
 Total Memory: 3.839GiB
 Name: u2204s
 ID: XHSQ:JQBF:7Q5B:E5BR:RX7U:PQR7:JMGX:5C6O:B7XA:BHW2:544B:DCFN
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false

WARNING: API is accessible on http://192.168.126.187:5689 without encryption.
         Access to the remote API is equivalent to root access on the host. Refer
         to the 'Docker daemon attack surface' section in the documentation for
         more information: https://docs.docker.com/go/attack-surface/
WARNING: No swap limit support

C:\Users\robertkao>docker image ls
REPOSITORY   TAG            IMAGE ID       CREATED         SIZE
wordpress    latest         3d55a510c77e   3 hours ago     616MB
mariadb      10.6.4-focal   12e05d5da3c5   17 months ago   409MB

C:\Users\robertkao>docker pull httpd

C:\Users\robertkao>docker pull ubuntu

C:\Users\robertkao>docker image ls
REPOSITORY   TAG            IMAGE ID       CREATED         SIZE
wordpress    latest         3d55a510c77e   3 hours ago     616MB
httpd        latest         192d41583429   7 days ago      145MB
ubuntu       latest         08d22c0ceb15   3 weeks ago     77.8MB
mariadb      10.6.4-focal   12e05d5da3c5   17 months ago   409MB

C:\Users\robertkao>docker rmi -f ubuntu
Untagged: ubuntu:latest
Untagged: ubuntu@sha256:67211c14fa74f070d27cc59d69a7fa9aeff8e28ea118ef3babc295a0428a6d21
Deleted: sha256:08d22c0ceb150ddeb2237c5fa3129c0183f3cc6f5eeb2e7aa4016da3ad02140a

C:\Users\robertkao>docker image ls
REPOSITORY   TAG            IMAGE ID       CREATED         SIZE
wordpress    latest         3d55a510c77e   3 hours ago     616MB
httpd        latest         192d41583429   7 days ago      145MB
mariadb      10.6.4-focal   12e05d5da3c5   17 months ago   409MB
```

#### CI(continuous integration) with github and dockerhub
it doesn't support dockerhub free account

### Ref 
+ [Install Docker Engine](https://docs.docker.com/engine/install/)
+ [Installing Docker](https://ranchermanager.docs.rancher.com/v2.5/getting-started/installation-and-upgrade/installation-requirements/install-docker)
+ [Got permission denied while trying to connect to the Docker daemon socket at unix](https://newbedev.com/got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket-at-unix-var-run-docker-sock-post-http-2fvar-2frun-2fdocker-sock-v1-24-auth-dial-unix-var-run-docker-sock-connect-permission-denied-code-example)
+ [Awesome Compose](https://github.com/docker/awesome-compose)
