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

### Issue
#### Hardware assisted virtualization
Hardware assisted virtualization and data execution protection must be enabled in the BIOS
<div style="max-width:400px">
	{% asset_img pic1.png pic1 %}
</div>

##### check virtualization ebnable
<div style="max-width:500px">
	{% asset_img pic2.png pic2 %}
</div>

##### check Windows feature on or off
控制台 --> 程式集 --> 解除安裝程式 --> 開啟或關閉 Windows 功能

<div style="max-width:400px">
	{% asset_img pic3.png pic3 %}
</div>

<div style="max-width:400px">
	{% asset_img pic4.png pic4 %}
</div>

##### run powerShell - administrator 
bcdedit /set hypervisorlaunchtype auto

<div style="max-width:400px">
	{% asset_img pic5.png pic5 %}
</div>

##### reboot windows then run docker 

### VirtualBox issue
#### Call to WHvSetupPartition failed: ERROR_SUCCESS 
<div style="max-width:400px">
	{% asset_img pic21.png pic21 %}
</div>

##### check virtualization ebnable
<div style="max-width:500px">
	{% asset_img pic22.png pic22 %}
</div>

##### check Windows feature on or off
控制台 --> 程式集 --> 解除安裝程式 --> 開啟或關閉 Windows 功能

<div style="max-width:400px">
	{% asset_img pic23.png pic23 %}
</div>

<div style="max-width:400px">
	{% asset_img pic24.png pic24 %}
</div>


##### run powerShell - administrator 
bcdedit /set hypervisorlaunchtype off

<div style="max-width:400px">
	{% asset_img pic25.png pic25 %}
</div>

##### reboot windows then run docker 

#### set virtualBox 6 與 Hyper-V 共存
##### run command line
``` Bash
# 設定單一虛擬器
VBoxManage setextradata "<虛擬器名稱>" "VBoxInternal/NEM/UseRing0Runloop" 0

# 設定所有虛擬器
VBoxManage setextradata global "VBoxInternal/NEM/UseRing0Runloop" 0
```

##### run PowerShell
``` Bash
# 設定單一虛擬器
./VBoxManage.exe setextradata "<虛擬器名稱>" "VBoxInternal/NEM/UseRing0Runloop" 0

# 設定所有虛擬器
./VBoxManage.exe setextradata global "VBoxInternal/NEM/UseRing0Runloop" 0
```

<div style="max-width:700px">
	{% asset_img pic31.png pic31 %}
</div>


### Ref
+ [docker document](https://docs.docker.com/engine/reference/commandline/pull/)
+ [docker command](https://joshhu.gitbooks.io/dockercommands/content/DockerImages/CommandArgs.html)