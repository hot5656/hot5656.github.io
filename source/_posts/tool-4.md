---
title: Docker
abbrlink: 331f
date: 2023-01-19 08:56:26
categories: Back End
tags:
	- tool
---

### 說明
#### command

<!--more-->

``` bash
# download image
docker pull postgres

# list download or create image
docker images
docker images -a

# image save to file(U12 tag)
docker save -o webdemou12.tar joshhu/webdemo:u12
# image load from file
docker load --input webdemou12.tar

# remove download image 
docker rmi --no-prune=true joshhu/webdemo:u12
# remove all local image
docker rmi -f $(docker images -aq)

# joshhu/webdemo:latest add tag u14
docker tag joshhu/webdemo:latest joshhu/webdemo:u14

# create new image 
# docker build

# upload image
# docker push <username>/<repo name>:<Tag name>
docker push joshhu/webdemo:u12
```

#### run
``` bash
# pull image
docker pull postgres
# 建立 container，設定 port 號，設定 postgres 登入密碼
docker create --name my-postgres -p 8080:5432 -e POSTGRES_PASSWORD=admin postgres
# 執行 container
docker start my-postgres

# 建立, 執行 container 
docker run -d --name my-postgres -p 8080:5432 -e POSTGRES_PASSWORD=admin postgres

# -v : 指定安裝位置
# -d : Detached mode, run command in the background
# postgres module name(配合password)
# --name my-postgres : 建立名稱
docker run --name ithome-postgres -e POSTGRES_PASSWORD=mysecretpassword -v D:\app\docker\ithome\postgres:/var/lib/postgresql/data -d postgres
```

### Ref
+ [docker document](https://docs.docker.com/engine/reference/commandline/pull/)
+ [docker command](https://joshhu.gitbooks.io/dockercommands/content/DockerImages/CommandArgs.html)