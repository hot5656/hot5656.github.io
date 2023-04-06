---
title: docker 說明
abbrlink: d4d6
date: 2023-03-28 10:09:59
categories: Coding
tags:
	- docker
---

### 說明
+ Nginx : 非同步框架的網頁伺服器，也可以用作反向代理、負載平衡器和HTTP快取

<!--more-->

### Command

#### inatsll 
``` bash
# Rancher's Docker installation scripts
# install docker 20.10
curl https://releases.rancher.com/install-docker/20.10.sh | sh
# check docker version
docker version
	Docker version 20.10.21, build baeda1f

# modify not add sudo for docker command
kyp@u2204s:/demo$ sudo chmod 666 /var/run/docker.sock
# this is more importent
kyp@u2204s:/demo$ sudo usermod -aG docker kyp
  [sudo] password for kyp:
kyp@u2204s:/demo$ docker image ls

# load docker insatll and see
wget curl https://releases.rancher.com/install-docker/20.10.sh | sh
# see by nano
nano 20.10.sh
```

#### inatsll compose
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
# show version
kyp@u2204s:~/v33$ docker compose version
	Docker Compose version v2.17.2
```

#### search docker image at dockerhub
``` bash
kyp@u2204s:~/app/my-app$ docker search ubuntu -f is-official=true
	NAME                 DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
	ubuntu               Ubuntu is a Debian-based Linux operating sys   15791     [OK]
	websphere-liberty    WebSphere Liberty multi-architecture images    293       [OK]
	ubuntu-upstart       DEPRECATED, as is Upstart (find other proces   112       [OK]
	neurodebian          NeuroDebian provides neuroscience research s   99        [OK]
	open-liberty         Open Liberty multi-architecture images based   59        [OK]
	ubuntu-debootstrap   DEPRECATED; use "ubuntu" instead                50        [OK]

# see image layer (need pull 1st)
kyp@u2204s:~/v1$ docker pull node:16-alpine
	16-alpine: Pulling from library/node
	f56be85fc22e: Pull complete
	4e21e25411da: Pull complete
	9890dc0be345: Pull complete
	61d1890b04b0: Pull complete
	Digest: sha256:b4a72f83f52bbe3970bb74a15e44ec4cf6e873ad4787473dfc8a26f5b4e29dd2
	Status: Downloaded newer image for node:16-alpine
	docker.io/library/node:16-alpine
kyp@u2204s:~/v1$ docker history node:16-alpine
	IMAGE          CREATED      CREATED BY                                      SIZE      COMMENT
	8cf71856f96e   7 days ago   /bin/sh -c #(nop)  CMD ["node"]                 0B
	<missing>      7 days ago   /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry   0B
	<missing>      7 days ago   /bin/sh -c #(nop) COPY file:4d192565a7220e13   388B
	<missing>      7 days ago   /bin/sh -c apk add --no-cache --virtual .bui   7.77MB
	<missing>      7 days ago   /bin/sh -c #(nop)  ENV YARN_VERSION=1.22.19     0B
	<missing>      7 days ago   /bin/sh -c addgroup -g 1000 node     && addu   102MB
	<missing>      7 days ago   /bin/sh -c #(nop)  ENV NODE_VERSION=16.20.0     0B
	<missing>      7 days ago   /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B
	<missing>      7 days ago   /bin/sh -c #(nop) ADD file:9a4f77dfaba7fd2aa   7.05MB
# see image layer all descript
docker history --no-trunc node:16-alpine

# direct run the enter shell
docker run -it node:16-alpine sh
```

#### direct run image
``` bash
# run and enter shell
docker run -it ubuntu bash

```

#### add new docker image tag(point to same IMAGE_ID)
docker image tag robert:v1 application:1.0
``` bash
# list image
kyp@u2204s:/demo$ sudo docker image ls
	REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
	robert       v1        0fef41bffdcf   9 minutes ago   162MB
	nginx        latest    080ed0ed8312   8 hours ago     142MB
# add new docker image tag
kyp@u2204s:/demo$ sudo docker image tag robert:v1 application:1.0
kyp@u2204s:/demo$ sudo docker image ls
	REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
	application   1.0       0fef41bffdcf   9 minutes ago   162MB
	robert        v1        0fef41bffdcf   9 minutes ago   162MB
	nginx         latest    080ed0ed8312   8 hours ago     142MB
```

#### rename container 
docker container rename c5 frontend
``` bash
# same "docker ps" 
kyp@u2204s:/demo$ docker container ls
	CONTAINER ID   IMAGE       COMMAND                  CREATED             STATUS             PORTS     NAMES
	8d58bf58306b   robert:v1   "/docker-entrypoint."   About an hour ago   Up About an hour   80/tcp    c5
# rename container
kyp@u2204s:/demo$ docker container rename c5 frontend
kyp@u2204s:/demo$ docker container ls
	CONTAINER ID   IMAGE       COMMAND                  CREATED             STATUS             PORTS     NAMES
	8d58bf58306b   robert:v1   "/docker-entrypoint."   About an hour ago   Up About an hour   80/tcp    frontend
```

#### show container logs
```
kyp@u2204s:/demo$ docker logs c10
AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.17.0.3. Set the 'ServerName' directive globally to suppress this message
```

#### ENTRYPOINT and CMD
CMD can by overwrite, but ENTRYPOINT not
``` bash
# dockerfile - CMD
kyp@u2204s:~/v1$ cat dockerfile
	FROM ubuntu
	RUN apt update
	CMD     ["echo", "CMD"]

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

# dockerfile - ENTRYPOINT
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

#### network
``` bash
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
```

#### multiple command
``` bash
#delete multi container
robert@ununtu220402:~$ sudo docker rm -f $(sudo docker container ls -a -q)
#delete multi image
robert@ununtu220402:~$ sudo docker rmi -f $(sudo docker container ls -a -q)
```

#### delete network
``` bash
# list network and container 
kyp@u2204s:~$ docker network ls
  NETWORK ID     NAME      DRIVER    SCOPE
  423837e7274a   bridge    bridge    local
  91fa76507520   host      host      local
  c48b89fb08d9   none      null      local
  486cf88f917d   test      bridge    local
kyp@u2204s:~$ docker container ls
  CONTAINER ID   IMAGE     COMMAND                  CREATED       STATUS       PORTS                                   NAMES
  a64306987152   nginx     "/docker-entrypoint."   5 hours ago   Up 5 hours   0.0.0.0:8082->80/tcp, :::8082->80/tcp   c2
  eb9f2a857dfa   nginx     "/docker-entrypoint."   6 hours ago   Up 6 hours   0.0.0.0:8081->80/tcp, :::8081->80/tcp   c1

# the container use network test,so need stop container befor remove network
kyp@u2204s:~$ docker stop c1
  c1
kyp@u2204s:~$ docker stop c2
  c2
# delete network test
kyp@u2204s:~$ docker network rm test
  test
kyp@u2204s:~$ docker network ls
  NETWORK ID     NAME      DRIVER    SCOPE
  423837e7274a   bridge    bridge    local
  91fa76507520   host      host      local
  c48b89fb08d9   none      null      local
```

#### some parameter for dockerfile
``` bash
# FROM
# RUN
# ENTRYPOINT

# USER
# 指定執行時的 user

# CMD  
# docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
# [COMMAND] 指的就是 CMD
	CMD ["/bin/sh"]
	CMD ["php", "-a"]
	ocker run --rm -it alpine:3.12 /bin/sh
	docker run --rm -it php:7.4-alpine php -a

# ARG 
# ARG在build時候是可以從外部以--build-arg帶入的變數
# dockerfile
	From resin/rpi-raspbian
	ARG NODE_VER
	ADD ./${NODE_VER:-node-v5.9.1-linux-armv7l} /
	RUN ln -s /${NODE_VER} /node
	ENV PATH=/node/bin:$PATH
	CMD ["node"]
# build
	docker build --build-arg NODE_VER=node-v5.9.0-linux-armv7l .

# WORKDIR			/tmp
# 工作執行目錄

# COPY				copy the content from source to Destination

# ADD					It can be URL/LINK
# 相似 COPY, 但可以是 url or tar 解黨
	ADD http://example.com/font.js /opt/
	ADD my_big_lib.tar.gz /var/lib/myapp

# ENV					key=value user=robert
#	ENV是在build的時候，可以定義一些變數，讓後面指令在執行時候可以參考
	From resin/rpi-raspbian
	ENV NODE_VER=node-v5.9.1-linux-armv7l
	ADD ./${NODE_VER} /
	RUN ln -s /${NODE_VER} /node
	ENV PATH=/node/bin:$PATH
	CMD ["node"]

# MAINTAINER	robert
# 用來說明，撰寫和維護這個 Dockerfile 的人是誰，也可以給 E-mail的資訊
	MAINTAINER jack

# EXPOSE			80
# 宣告在執行 Docker Container時需要把它開放出去
```

### application 
#### run dockerhub docker image 
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
robert@ununtu220402:~$ sudo docker container ls
  CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
  2c2b3ab35399   nginx     "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   80/tcp    elastic_hodgkin

# container stop
robert@ununtu220402:~$ sudo docker stop elastic_hodgkin
  elastic_hodgkin

# run 2nd times
robert@ununtu220402:~$ sudo docker run -itd nginx
  7be82924063d482c40334ed6e79e94af9694e1ac6c1ca8568f3429b3a98ee83b

# remove stop container
robert@ununtu220402:~$ sudo docker rm elastic_hodgkin
  elastic_hodgkin

# list container
robert@ununtu220402:~$ sudo docker container ls
  CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
  7be82924063d   nginx     "/docker-entrypoint.…"   4 minutes ago   Up 4 minutes   80/tcp    pensive_swanson


# force remove container 
robert@ununtu220402:~$ sudo docker rm -f pensive_swanson
  pensive_swanson

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

# list docker container 
robert@ununtu220402:~$ sudo docker container ls
  CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
  1d7e7bce6be6   nginx     "/docker-entrypoint.…"   32 seconds ago   Up 23 seconds   80/tcp    cl

# remove docker container 
robert@ununtu220402:~$ sudo docker rm -f cl
  cl
robert@ununtu220402:~$ sudo docker container ls
  CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

# start image and map port to 8081
kyp@u2204s:~$ docker run -itd --name c1 -p 8081:80 nginx
  eb9f2a857dfac9d39c3597a4d02657e01c6985c087dadbe96b393dfb264d2667
kyp@u2204s:~$ docker container ls
  CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                                   NAMES
  eb9f2a857dfa   nginx     "/docker-entrypoint."   5 seconds ago   Up 3 seconds   0.0.0.0:8081->80/tcp, :::8081->80/tcp   c1

# browser : http://192.168.18.6:8081/

# show log by id
kyp@u2204s:~$ docker logs eb9f2a857dfac
  /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
  /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
  /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
  ......

# show log by name
kyp@u2204s:~$ docker logs c1
  /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
  /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
  ......

# show container detail 
kyp@u2204s:~$ docker inspect c1
  [
      {
          "Id": "eb9f2a857dfac9d39c3597a4d02657e01c6985c087dadbe96b393dfb264d2667",
          "Created": "2023-04-05T08:07:13.76917322Z",
          "Path": "/docker-entrypoint.sh",
          "Args": [
              "nginx",
              "-g",
              "daemon off;"
          ],
          "State": {
              "Status": "running",
              "Running": true,
              "Paused": false,
              "Restarting": false,
              "OOMKilled": false,
              "Dead": false,
              "Pid": 7023,
              "ExitCode": 0,
              "Error": "",
              "StartedAt": "2023-04-05T08:07:14.822503331Z",
              "FinishedAt": "0001-01-01T00:00:00Z"
          },
  ......

# show image detail
kyp@u2204s:~$ docker inspect nginx
  [
      {
          "Id": "sha256:080ed0ed8312deca92e9a769b518cdfa20f5278359bd156f3469dd8fa532db6b",
          "RepoTags": [
              "nginx:latest"
          ],
          "RepoDigests": [
              "nginx@sha256:2ab30d6ac53580a6db8b657abf0f68d75360ff5cc1670a85acb5bd85ba1b19c0"
          ],
          "Parent": "",
          "Comment": "",
          "Created": "2023-03-28T22:20:09.76950724Z",
          "Container": "2e6cfff5afd6bd5a85faf12b14aa18cc04ed32b06732965bb133022ef85ba5c2",
  ......

# show docker proxy port
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

# show docker network 
# bridge: This is the default network that Docker sets up on a host machine. It is used for container-to-container communication within a single host.
# host: This network setting removes network isolation between the Docker host and the containers, and allows the containers to use the host's network stack directly.
# none: This network disables networking for the container.
kyp@u2204s:~$ docker network ls
  NETWORK ID     NAME      DRIVER    SCOPE
  423837e7274a   bridge    bridge    local
  91fa76507520   host      host      local
  c48b89fb08d9   none      null      local

```

#### containers communication
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
docker exec -it c1 bash
# install package
root@eb9f2a857dfa:/# apt update
root@eb9f2a857dfa:/# apt install iputils-ping -y
root@eb9f2a857dfa:/# apt install net-tools -y
root@eb9f2a857dfa:/# ifconfig
  eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
          inet 172.17.0.2  netmask 255.255.0.0  broadcast 172.17.255.255
# ping c2 --> can not success
root@84ac6ea02d87:/>  ping 192.168.10.1

# link test to c1
kyp@u2204s:~$ sudo docker network connect test c1
# check netwrok test : c1,c2
# c2 ip 192.168.10.1
# c1 ip 192.168.10.2
kyp@u2204s:~$ sudo docker inspect test

# c1 ping c2 success
kyp@u2204s:~$ sudo docker exec -it c1 bash
root@84ac6ea02d87:/> ping 192.168.10.1
  PING 192.168.10.1 (192.168.10.1) 56(84) bytes of data.
  64 bytes from 192.168.10.1: icmp_seq=1 ttl=64 time=0.102 ms
  64 bytes from 192.168.10.1: icmp_seq=2 ttl=64 time=0.120 ms
```

#### map directory to container 
``` bash
# map directory to container
kyp@u2204s:~$ mkdir demo
kyp@u2204s:~$ cd demo
kyp@u2204s:~/demo$ docker run  -itd --name c1 -v $(pwd):/usr/share/nginx/html -p 8081:80 nginx
  1bf2697873e03faaba609862f2296784582167a010b1c24aaf703a9db570a33
# add index.html
kyp@u2204s:~/demo$ echo "<h1>map local directry to container</h1>" > index.html

# browser : http://192.168.18.6:8081/
# map local directry to container


# modify by container 
kyp@u2204s:~/demo$ docker exec -it c1 bash
root@11bf2697873e:/# cd /usr/share/nginx/html/
root@11bf2697873e:/usr/share/nginx/html# apt update
root@11bf2697873e:/usr/share/nginx/html# apt install nano
root@11bf2697873e:/usr/share/nginx/html# nano index.html
root@11bf2697873e:/usr/share/nginx/html# cat ./index.html
  <h1>map local directry to container-container modify</h1>

# browser : http://192.168.18.6:8081/
# map local directry to container-container modify

# check directory also modify
root@11bf2697873e:/usr/share/nginx/html# exit
exit
kyp@u2204s:~/demo$ cat ./index.html
<h1>map local directry to container-container modify</h1>

# change container read only for directory
kyp@u2204s:~/demo$ docker rm  -f c1
  c1
kyp@u2204s:~/demo$ docker run  -itd --name c1 -v $(pwd):/usr/share/nginx/html:ro  -p 8081:80 nginx
  f8788b8a33b8b859f1c3ee2f2b95d4ca942c4208a6d1e575029243be135f260b
kyp@u2204s:~/demo$ docker exec -it c1 bash
root@11bf2697873e:/usr/share/nginx/html# apt update
root@11bf2697873e:/usr/share/nginx/html# apt install nano
# index.html cannot modify
root@11bf2697873e:/usr/share/nginx/html# nano index.html
```

#### clone volumes from other container
``` bash
# clone volumes from other container
kyp@u2204s:/demo$ sudo docker run -itd --name c2 --volumes-from c1 -p 8082:80 nginx
b8802a1a314eeda933f9e28669fb0b7e352cdb175208eef1d639962698cc4109

# browser : http://192.168.18.6:8082/
# map local directry to container-container modify
```

#### create image by container modify
docker commit c1 robert:v1
``` bash
# create container
kyp@u2204s:/demo$ sudo docker run -itd --name c1 -p 8081:80 nginx

# enter container 
kyp@u2204s:/demo$ sudo docker exec -it c1 bash
root@9ee699e55910:/# ls
	bin   dev                  docker-entrypoint.sh  home  lib64  mnt  proc  run   srv  tmp  var
	boot  docker-entrypoint.d  etc                   lib   media  opt  root  sbin  sys  usr
# add some firectory and file
root@9ee699e55910:/# mkdir robert
root@9ee699e55910:/# mkdir docker
root@9ee699e55910:/# touch application
root@9ee699e55910:/# touch frontend
root@9ee699e55910:/# exit

# show container
kyp@u2204s:/demo$ sudo docker container ls
	CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                                   NAMES
	9ee699e55910   nginx     "/docker-entrypoint."   8 minutes ago   Up 7 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   c1
# create image from container
kyp@u2204s:/demo$ sudo docker commit c1 robert:v1
	sha256:0fef41bffdcf0dac8dd4c2d8ec97fb3d3800182536148a5c49998b47585d555f
# list image
kyp@u2204s:/demo$ sudo image ls
sudo: image: command not found
kyp@u2204s:/demo$ sudo docker image ls
	REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
	robert       v1        0fef41bffdcf   22 seconds ago   162MB
	nginx        latest    080ed0ed8312   8 hours ago      142MB

# remove old container 
kyp@u2204s:/demo$ sudo docker rm -f c1
	c1
# create container c5
kyp@u2204s:/demo$ sudo docker run -itd --name c5 robert:v1
	8d58bf58306be10c0f261e60b441d0a0a00f2999756ea43d36b322ee18ebfe0f
# ls container
kyp@u2204s:/demo$ sudo docker container ls
	CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS          PORTS     NAMES
	8d58bf58306b   robert:v1   "/docker-entrypoint."   18 seconds ago   Up 16 seconds   80/tcp    c5
# enter container c6
kyp@u2204s:/demo$ sudo docker exec -it c5 bash
# check the containe inclde add directory and file
root@8d58bf58306b:/# ls
	application  boot  docker               docker-entrypoint.sh  frontend  lib    media  opt   robert  run   srv  tmp  var
	bin          dev   docker-entrypoint.d  etc                   home      lib64  mnt    proc  root    sbin  sys  usr
root@8d58bf58306b:/# nano index.html
root@8d58bf58306b:/# exit
```

#### push docker image to dockerhub
``` bash
# login dockerhub
kyp@u2204s:/demo$ docker login
	# Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
	Username: hotxx
	Password:
	WARNING! Your password will be stored unencrypted in /home/kyp/.docker/config.json.
	Configure a credential helper to remove this warning. See
	https://docs.docker.com/engine/reference/commandline/login/#credentials-store

	Login Succeeded

# must create image repsitory at dockerhub 1st
# I add hot5656/test

# add image same as dockerhub repsitory
kyp@u2204s:/demo$ docker tag application:1.0 hot5656/test:1.0
kyp@u2204s:/demo$ docker image ls
	REPOSITORY     TAG       IMAGE ID       CREATED             SIZE
	hot5656/test   1.0       0fef41bffdcf   About an hour ago   162MB
	application    1.0       0fef41bffdcf   About an hour ago   162MB
	robert         v1        0fef41bffdcf   About an hour ago   162MB
	nginx          latest    080ed0ed8312   9 hours ago         142MB

# push to dockerhub
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
```


#### create image by docker file
docker build -t firstimage:1.0 .
``` bash
kyp@u2204s:/demo$ sudo nano dockerfile
	[sudo] password for kyp:

# dockerfile as below 
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

# warning as below,add "RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf" the not found
# AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.17.0.3. Set the 'ServerName' directive globally to suppress this message

# create dockerfile and index.html
kyp@u2204s:/demo$ cat dockerfile
	FROM ubuntu
	RUN     apt update
	RUN     apt install apache2 -y
	COPY    .       /var/www/html
	ENTRYPOINT      apachectl -D FOREGEROUND
kyp@u2204s:/demo$ ls
	dockerfile  index.html

# build image
kyp@u2204s:/demo$ docker build -t firstimage:1.0 .
	....
# image list
kyp@u2204s:/demo$ docker image list
	REPOSITORY     TAG       IMAGE ID       CREATED         SIZE
	firstimage     1.0       04de0efc7c90   5 minutes ago   228MB
	robert         v1        0fef41bffdcf   2 hours ago     162MB
	hot5656/test   1.0       0fef41bffdcf   2 hours ago     162MB
	application    1.0       0fef41bffdcf   2 hours ago     162MB
	nginx          latest    080ed0ed8312   9 hours ago     142MB
	ubuntu         latest    08d22c0ceb15   3 weeks ago     77.8MB
# run image
kyp@u2204s:/demo$ docker run -itd --name cl4 -p 8084:80 apache2:4.0
```

#### switch user in container(not root) 
``` bash
# dockerfile (switch to user nobody)
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

# enter container
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

#dockerfile (add user robert,user then switch to user robert)
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

# enter container(switch user to user, robert by password)
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

# dockerfile(remove some warning only)
kyp@u2204s:~/v33$ cat ./dockerfile
	FROM ubuntu
	RUN apt-get update -y
	RUN apt-get install openssl -y
	RUN useradd -m -d /home/user1 -s /bin/bash -g root -G sudo -u 1002 user1 -p "$(echo 'user1' | openssl passwd -6 -stdin)"
	RUN useradd -m -d /home/robert -s /bin/bash -g root -G sudo -u 1001 robert -p "$(echo 'robert' | openssl passwd -6 -stdin)"
	USER robert
	RUN     mkdir /tmp/robert

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
# enter container
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

#### run docker compose
``` bash
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
	? Container compose-application-1 Removed  0.6s
	? Network compose_default         Removed  0.1s
# network ls
kyp@u2204s:~/compose$ docker network ls
	NETWORK ID     NAME      DRIVER    SCOPE
	cc7598d6c9a3   bridge    bridge    local
	ce47799cf7e3   host      host      local
	72f0cc8b9157   none      null      local
# ip all (no br-xxx )
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

#### multiple compose
``` bash
# docker-compose.yml
# user docker compose version 3 format(docker-compose.yml or docker-compose.yaml)
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

# compose up
kyp@u2204s:~/compose2$ docker compose up -d
	[+] Running 3/3
	? Network compose2_default            Created  0.5s
	? Container compose2-application-2-1  Started 1.0s
	? Container compose2-application-1    Started  0.9s

# compose ps and container ls
kyp@u2204s:~/compose2$ docker compose ps
	NAME                       IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
	compose2-application-1     nginx               "/docker-entrypoint."   application         35 seconds ago      Up 34 seconds       0.0.0.0:8081->80/tcp, :::8081->80/tcp
	compose2-application-2-1   nginx               "/docker-entrypoint."   application-2       35 seconds ago      Up 34 seconds       0.0.0.0:8082->80/tcp, :::8082->80/tcp
kyp@u2204s:~/compose2$ docker container ls
	CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS              PORTS                                   NAMES
	3cda852326a4   nginx     "/docker-entrypoint."   About a minute ago   Up About a minute   0.0.0.0:8081->80/tcp, :::8081->80/tcp   compose2-application-1
	ae2a6cd241a8   nginx     "/docker-entrypoint."   About a minute ago   Up About a minute   0.0.0.0:8082->80/tcp, :::8082->80/tcp   compose2-application-2-1	
# network
kyp@u2204s:~/compose2$ docker network ls
	NETWORK ID     NAME               DRIVER    SCOPE
	5cd12cc9620e   bridge             bridge    local
	cdaa29412bdf   compose2_default   bridge    local
	ce47799cf7e3   host               host      local
	72f0cc8b9157   none               null      local

# browser open : http://192.168.126.187:8081/
# browser open : http://192.168.126.187:8082/

# support compose stop then start
kyp@u2204s:~/compose2$ docker compose stop
	[+] Running 2/2
	? Container compose2-application-2-1  Stopped  0.8s
	? Container compose2-application-1    Stopped  0.8s
kyp@u2204s:~/compose2$ docker compose start
	[+] Running 2/2
	? Container compose2-application-1  0.7s
	? Container compose2-application-2-1  0.9s
kyp@u2204s:~/compose2$ docker compose down
	[+] Running 3/3
	? Container compose2-application-1    Removed 1.0s
	? Container compose2-application-2-1  Removed 1.0s
	? Network compose2_default            Removed

# suport specific docker componse name
kyp@u2204s:~/compose2$ mv docker-compose.yml v1.yaml
kyp@u2204s:~/compose2$ ls
	v1.yaml
kyp@u2204s:~/compose2$ docker compose -f v1.yaml up -d
	[+] Running 3/3
	? Network compose2_default            Created  0.4s
	? Container compose2-application-1 0.8s
	? Container compose2-application-2-1  0.9s
kyp@u2204s:~/compose2$ docker compose -f v1.yaml down
	[+] Running 3/3
	? Container compose2-application-1    Removed 1.0s
	? Container compose2-application-2-1  Removed  1.0s
	? Network compose2_default            Removed  0.1s
	kyp@u2204s:~/compose2$

# support direct run and see logs
kyp@u2204s:~/compose2$ docker compose -f v1.yaml up
	^CGracefully stopping... (press Ctrl+C again to force)
	Aborting on container exit...
	[+] Running 2/2
	? Container compose2-application-1    Stopped  1.0s
	? Container compose2-application-2-1  Stopped  1.0s
	canceled

# run specific docker componse
kyp@u2204s:~/compose2$ docker compose -f v1.yaml up -d
	[+] Running 2/2
	? Container compose2-application-2-1  Started 0.6s
		? Container compose2-application-2-1  Removed 1.0s
		? Network compose2_default            Removed
# "compose ps" also need specific compose name 
kyp@u2204s:~/compose2$ docker compose -f v1.yaml ps
	NAME                       IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
	compose2-application-1     nginx               "/docker-entrypoint."   application         5 minutes ago       Up 18 seconds       0.0.0.0:8081->80/tcp, :::8081->80/tcp
	compose2-application-2-1   nginx               "/docker-entrypoint."   application-2       5 minutes ago       Up 18 seconds       0.0.0.0:8083->80/tcp, :::8083->80/tcp 
# "compose down" also need specific compose name 
kyp@u2204s:~/compose2$ docker compose -f v1.yaml down
	[+] Running 3/3
	? Container compose2-application-2-1  Removed  0.7s
	? Container compose2-application-1    Removed  0.7s
	? Network compose2_default            Removed
```


#### build image from compose
``` bash
# show no image and container
kyp@u2204s:~/compose2$ docker image ls
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
kyp@u2204s:~/compose2$ docker container ls -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
# dockfile
kyp@u2204s:~/compose2$ cat ./dockerfile
	FROM ubuntu
	RUN     apt update
	ADD     . /var/www/html
	RUN     apt install apache2 -y
	ENTRYPOINT      apachectl -D FOREGROUND
# dock-cpopose
kyp@u2204s:~/compose2$ cat ./docker-compose.yaml
	version: "3"
	services:
		frontend:
			build: .
			ports:
				- "8085:80"
# index.html
kyp@u2204s:~/compose2$ cat ./index.html
	<h1>Hi this is the image whicj we have created with Docker-compose</h1>

# compose up
kyp@u2204s:~/compose2$ docker compose up -d
# show image and container 
kyp@u2204s:~/compose2$ docker image ls
	REPOSITORY          TAG       IMAGE ID       CREATED              SIZE
	compose2-frontend   latest    939c638c92fe   About a minute ago   229MB
kyp@u2204s:~/compose2$ docker container ls
	CONTAINER ID   IMAGE               COMMAND                  CREATED         STATUS         PORTS                                   NAMES
	6a382cc76473   compose2-frontend   "/bin/sh -c 'apachec"   2 minutes ago   Up 2 minutes   0.0.0.0:8085->80/tcp, :::8085->80/tcp   compose2-frontend-1

# open browser: http://192.168.126.187:8085/

# down and see image
kyp@u2204s:~/compose2$ docker compose down
kyp@u2204s:~/compose2$ docker image ls
	REPOSITORY          TAG       IMAGE ID       CREATED          SIZE
	compose2-frontend   latest    939c638c92fe   19 minutes ago   229MB
	kyp@u2204s:~/compose2$ docker rmi -f $(docker image ls -a -q)
	Untagged: compose2-frontend:latest
	Deleted: sha256:939c638c92fefa52b8e4ce3399feec3aedbfc88d5451068ffe99739e0e9db750

# give image name
kyp@u2204s:~/compose2$ cat ./docker-compose.yaml
	version: "3"
	services:
		frontend:
			build: .
			ports:
				- "8085:80"
			image: composeimage:1.0

# compose up
kyp@u2204s:~/compose2$ docker compose up -d
# see image - composeimage:1.0
kyp@u2204s:~/compose2$ docker image ls
	REPOSITORY     TAG       IMAGE ID       CREATED              SIZE
	composeimage   1.0       2bf3a001bb1f   About a minute ago   229MB
kyp@u2204s:~/compose2$ docker container ls
	CONTAINER ID   IMAGE              COMMAND                  CREATED              STATUS              PORTS                                   NAMES
	c95414d1f043   composeimage:1.0   "/bin/sh -c 'apachec"   About a minute ago   Up About a minute   0.0.0.0:8085->80/tcp, :::8085->80/tcp   compose2-frontend-1

# open browser: http://192.168.126.187:8085/
```

#### Wrodpress + Mysql componse
``` bash
# docker-compose
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
# compose ls
kyp@u2204s:~/worldpress$ docker compose up -d
# show compose
kyp@u2204s:~/worldpress$ docker compose ls
	NAME                STATUS              CONFIG FILES
	worldpress          running(2)          /home/kyp/worldpress/docker-compose.yaml
# show compose ps
kyp@u2204s:~/worldpress$ docker compose ps
	NAME                     IMAGE                  COMMAND                  SERVICE             CREATED             STATUS              PORTS
	worldpress-db-1          mariadb:10.6.4-focal   "docker-entrypoint.s"   db                  20 seconds ago      Up 19 seconds       3306/tcp
	worldpress-wordpress-1   wordpress:latest       "docker-entrypoint.s"   wordpress           20 seconds ago      Up 18 seconds       0.0.0.0:8080->80/tcp, :::8080->80/tcp

# down
kyp@u2204s:~/worldpress$ docker compose down
	[+] Running 3/3
	? Container worldpress-wordpress-1  Removed                                                   1.6s
	? Container worldpress-db-1         Removed                                                   1.2s
	? Network worldpress_default        Removed                                                   0.1s
# show pose and container
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
# up compose
kyp@u2204s:~/worldpress$ docker compose up -d
[+] Running 4/4
 ? Network worldpress_default        Created                                                   0.2s
 ? Volume "worldpress_db_data"       Created                                                   0.0s
 ? Container worldpress-db-1         Started                                                   1.6s
 ? Container worldpress-wordpress-1  Started
# see all volume
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
# show docker control port
kyp@u2204s:~/worldpress$ ps -ef | grep docker
	root        1021       1 22 00:47 ?        00:21:53 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
	kyp         5390    1352  0 02:23 pts/0    00:00:00 grep --color=auto docker
kyp@u2204s:~/worldpress$ sudo nano /lib/systemd/system/docker.service
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
# ==================== change this line ==================
# ExecStart=/usr/bin/dockerd -H fd:// -H=tcp://192.168.126.187:5689
# =========================================================

# clcal windows cmd command
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

# remote imahe ls
C:\Users\robertkao>docker image ls
	REPOSITORY   TAG            IMAGE ID       CREATED         SIZE
	wordpress    latest         3d55a510c77e   3 hours ago     616MB
	mariadb      10.6.4-focal   12e05d5da3c5   17 months ago   409MB
# remote image pull
C:\Users\robertkao>docker pull httpd
C:\Users\robertkao>docker pull ubuntu
C:\Users\robertkao>docker image ls
	REPOSITORY   TAG            IMAGE ID       CREATED         SIZE
	wordpress    latest         3d55a510c77e   3 hours ago     616MB
	httpd        latest         192d41583429   7 days ago      145MB
	ubuntu       latest         08d22c0ceb15   3 weeks ago     77.8MB
	mariadb      10.6.4-focal   12e05d5da3c5   17 months ago   409MB
# remote remove image
C:\Users\robertkao>docker rmi -f ubuntu
	Untagged: ubuntu:latest
	Untagged: ubuntu@sha256:67211c14fa74f070d27cc59d69a7fa9aeff8e28ea118ef3babc295a0428a6d21
	Deleted: sha256:08d22c0ceb150ddeb2237c5fa3129c0183f3cc6f5eeb2e7aa4016da3ad02140a
# remote image ls
C:\Users\robertkao>docker image ls
	REPOSITORY   TAG            IMAGE ID       CREATED         SIZE
	wordpress    latest         3d55a510c77e   3 hours ago     616MB
	httpd        latest         192d41583429   7 days ago      145MB
	mariadb      10.6.4-focal   12e05d5da3c5   17 months ago   409MB
```

#### CI(continuous integration) with github and dockerhub
it doesn't support dockerhub free account


### other build
#### awesome-compose/react-nginx
``` bash
# awesome-compose/react-nginx
docker compose up -d
#browser open :　http://192.168.18.3:8085/

# compose ls
kyp@u2204s:~/awesome-compose/react-nginx$ docker compose ls
	NAME                STATUS              CONFIG FILES
	compose_frontend    running(1)          /home/kyp/compose_frontend/docker-compose.yaml
	react-nginx         running(1)          /home/kyp/awesome-compose/react-nginx/compose.yaml
# volume ls
kyp@u2204s:~/awesome-compose/react-nginx$ docker volume ls
DRIVER    VOLUME NAME
# compose down
kyp@u2204s:~/awesome-compose/react-nginx$ docker compose down
	[+] Running 2/2
	? Container frontend           Removed                                    1.0s
	? Network react-nginx_default  Removed                                    0.2s
kyp@u2204s:~/awesome-compose/react-nginx$ docker compose ls
	NAME                STATUS              CONFIG FILES
	compose_frontend    running(1)          /home/kyp/compose_frontend/docker-compose.yaml
```


#### dockerizing-a-react-app
``` bash
# dockerfile compose
https://jsramblings.com/dockerizing-a-react-app/

# dockerfile
kyp@u2204s:~/app/my-app$ cat ./Dockerfile
	# ==== CONFIGURE =====
	# Use a Node 16 base image
	FROM node:16-alpine
	# Set the working directory to /app inside the container
	WORKDIR /app
	# Copy app files
	COPY . .
	# ==== BUILD =====
	# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
	RUN npm ci
	# Build the app
	RUN npm run build
	# ==== RUN =======
	# Set the env to "production"
	ENV NODE_ENV production
	# Expose the port on which the app will be running (3000 is the default that `serve` uses)
	EXPOSE 3000
	# Start the app
	CMD [ "npx", "serve", "build" ]

# build
docker build -t my-app:2.0 .
# run
docker run -d --name m20 -p 3000:3000 my-app:2.0

# browser http://192.168.18.10:3000/

# - itd not work
# -d：run指令的無數值參數，背景執行
# -i, --interactive=false     Keep STDIN open even if not attached
# -t, --tty=false             Allocate a pseudo-TTY
```

``` bash
  151  sudo df -h
  152  sudo ls /media/sf_share/ -al
  153  sudo chmod 666 /media/sf_share -r
  154  sudo chmod 666 /media/sf_share
  155  sudo ls /media/sf_share/ -al
kyp@u2204s:~$ sudo ls /media/sf_share/mxter -al

# add symblic for dir
mkdir -p sym_mxter
sudo ln -s /media/sf_mxter/ sym_mxter
# kyp add to GROUP vboxsf
sudo	usermod	-G	vboxsf	kyp
# remove symblic link for directory
rm -r sym_mxter

sudo docker build -t node1:1.0 .
sudo docker run -itd --name n1 node1:1.0 .
sudo docker image ls
sudo docker container ls 






```




``` bash
# error 
Step 9/13 : RUN yarn build
 ---> Running in cff7a710582f
yarn run v1.22.19
$ react-scripts build
/app/node_modules/schema-utils/node_modules/ajv-keywords/dist/index.js:25
        throw new Error("Unknown keyword " + keyword);
        ^

Error: Unknown keyword formatMinimum
    at get (/app/node_modules/schema-utils/node_modules/ajv-keywords/dist/index.js:25:15)
    at ajvKeywords (/app/node_modules/schema-utils/node_modules/ajv-keywords/dist/index.js:10:13)
    at Object.<anonymous> (/app/node_modules/schema-utils/dist/validate.js:65:1)
    at Module._compile (node:internal/modules/cjs/loader:1196:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1250:10)
    at Module.load (node:internal/modules/cjs/loader:1074:32)
    at Function.Module._load (node:internal/modules/cjs/loader:909:12)
    at Module.require (node:internal/modules/cjs/loader:1098:19)
    at require (node:internal/modules/cjs/helpers:108:18)
    at Object.<anonymous> (/app/node_modules/schema-utils/dist/index.js:6:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
The command '/bin/sh -c yarn build' returned a non-zero code: 1

# fix by 
npm install ajv-keywords@latest

# fix
rm -rf node_modules
npm cache clean --force
npm install

npm outdated

# error
Step 9/13 : RUN yarn build
 ---> Running in 9a3b32bc17ee
yarn run v1.22.19
$ react-scripts build
Creating an optimized production build...
Failed to compile.

./src/App.js
Cannot find module: 'pages'. Make sure this package is installed.

You can install this package by running: yarn add pages.


error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
The command '/bin/sh -c yarn build' returned a non-zero code: 1
```

``` bash
# difault 
npm audit fix
```

``` bash
# install docker 
curl https://releases.rancher.com/install-docker/20.10.sh | sh
# check docker version
docker version

# add to group docker
sudo chmod 666 /var/run/docker.sock
sudo usermod -aG docker kyp

# share link 
kyp@u2204s:~$ sudo df -h
Filesystem                         Size  Used Avail Use% Mounted on
udev                               1.9G     0  1.9G   0% /dev
tmpfs                              394M  1.2M  393M   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv   29G  8.0G   19G  30% /
tmpfs                              2.0G     0  2.0G   0% /dev/shm
tmpfs                              5.0M     0  5.0M   0% /run/lock
tmpfs                              2.0G     0  2.0G   0% /sys/fs/cgroup
/dev/loop1                          50M   50M     0 100% /snap/snapd/18357
/dev/loop0                          64M   64M     0 100% /snap/core20/1852
/dev/loop3                          64M   64M     0 100% /snap/core20/1828
/dev/loop2                          92M   92M     0 100% /snap/lxd/24061
/dev/loop4                          50M   50M     0 100% /snap/snapd/18596
/dev/sda2                          2.0G  108M  1.7G   6% /boot
mxter_2nd                         1.9T  1.3T  626G  67% /media/sf_mxter_2nd
tmpfs                              394M     0  394M   0% /run/user/1000

# kyp add to GROUP vboxsf
sudo usermod -G vboxsf kyp

# add symblic for direcory(correct)
mkdir -p sym_mxter
sudo ln -s /media/sf_mxter_2nd sym_mxter

# other 
# user's group
groups kyp
# add kyp to sudo(root) 
usermod -a -G sudo kyp
# edit sudoers
sudo visudo
# checker sudoers
sudo visudo -c

# build image 
docker build  -t  mex:1.0 -f ./dockerfile .

docker run -d -p 3000:3000 mex:1.0

# browser : http://192.168.18.6:3000/
```

### Ref 
+ [Install Docker Engine](https://docs.docker.com/engine/install/)
+ [Installing Docker](https://ranchermanager.docs.rancher.com/v2.5/getting-started/installation-and-upgrade/installation-requirements/install-docker)
+ [Got permission denied while trying to connect to the Docker daemon socket at unix](https://newbedev.com/got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket-at-unix-var-run-docker-sock-post-http-2fvar-2frun-2fdocker-sock-v1-24-auth-dial-unix-var-run-docker-sock-connect-permission-denied-code-example)
+ [Awesome Compose](https://github.com/docker/awesome-compose)
+ [react-nginx-docker](https://github.com/bbachi/react-nginx-docker)
+ [Jennifer Docker 筆記本](https://cutejaneii.gitbook.io/docker/)
+ [Reactjs Build Production](https://www.copycat.dev/blog/reactjs-build-production/)