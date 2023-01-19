---
title: PostgreSQL
tags:
  - database
  - docker
abbrlink: 217b
date: 2023-01-19 09:13:34
categories: Back End
---


### [PostgreSQL](https://hub.docker.com/_/postgres) install to docker
#### get image
``` bash
docker pull postgres
```

<!--more-->

#### create and run
``` bash
# create and run (need set port)
docker run -d -p 5432:5432 --name ithome-postgres2 -v D:\app\docker\ithome2\postgres:/var/lib/postgresql/data -e POSTGRES_PASSWORD=pg123456 postgres
```

#### command
``` bash
# see version
C:\Users\robertkao>docker exec  ithome-postgres2 psql -V
psql (PostgreSQL) 15.1 (Debian 15.1-1.pgdg110+1)

# list DB
C:\Users\robertkao>docker exec  ithome-postgres2 psql -U postgres -l
                                                List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |   Access privileges
-----------+----------+----------+------------+------------+------------+-----------------+-----------------------
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
           |          |          |            |            |            |                 | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
           |          |          |            |            |            |                 | postgres=CTc/postgres

# check run
C:\Users\robertkao>docker ps
CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                           NAMES
3c0bc480497a   postgres         "docker-entrypoint.s…"   26 minutes ago   Up 26 minutes   0.0.0.0:5432->5432/tcp          ithome-postgres2
90865204231a   dpage/pgadmin4   "/entrypoint.sh"         2 hours ago      Up 2 hours      443/tcp, 0.0.0.0:5433->80/tcp   pgadmin4

# enter terminal 
C:\Users\robertkao>docker exec -it ithome-postgres2 bash
root@e032c0b22fe2:/# ls -l
total 76
drwxr-xr-x   2 root root 4096 Jan  9 00:00 bin
drwxr-xr-x   2 root root 4096 Dec  9 19:15 boot
drwxr-xr-x   5 root root  340 Jan 19 01:05 dev
drwxr-xr-x   2 root root 4096 Jan 11 08:53 docker-entrypoint-initdb.d
drwxr-xr-x   1 root root 4096 Jan 19 01:05 etc
drwxr-xr-x   2 root root 4096 Dec  9 19:15 home
drwxr-xr-x   1 root root 4096 Jan  9 00:00 lib
drwxr-xr-x   2 root root 4096 Jan  9 00:00 lib64
drwxr-xr-x   2 root root 4096 Jan  9 00:00 media
drwxr-xr-x   2 root root 4096 Jan  9 00:00 mnt
drwxr-xr-x   2 root root 4096 Jan  9 00:00 opt
dr-xr-xr-x 256 root root    0 Jan 19 01:05 proc
drwx------   1 root root 4096 Jan 11 08:53 root
drwxr-xr-x   1 root root 4096 Jan 11 08:53 run
drwxr-xr-x   2 root root 4096 Jan  9 00:00 sbin
drwxr-xr-x   2 root root 4096 Jan  9 00:00 srv
dr-xr-xr-x  11 root root    0 Jan 19 01:05 sys
drwxrwxrwt   1 root root 4096 Jan 11 08:54 tmp
drwxr-xr-x   1 root root 4096 Jan  9 00:00 usr
drwxr-xr-x   1 root root 4096 Jan  9 00:00 var

```


### management - [pgAdmin](https://www.pgadmin.org/)
#### install & run pgadmin4
``` bash
# get
docker pull dpage/pgadmin4
# create and run
docker run -d -p 5433:80 --name pgadmin4 -e PGADMIN_DEFAULT_EMAIL=test@123.com -e PGADMIN_DEFAULT_PASSWORD=123456 dpage/pgadmin4
```


#### open by browser
+ http://localhost:5433/
+ test@123.com:123456
<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>
<div style="max-width:700px">
	{% asset_img pic2.png pic2 %}
</div>

#### connect to DB
+ address 
	+ host.docker.internal
	+ 127.0.0.1
	+ localhost

<div style="max-width:700px">
	{% asset_img pic3.png pic3 %}
</div>
<div style="max-width:700px">
	{% asset_img pic4.png pic4 %}
</div>
<div style="max-width:700px">
	{% asset_img pic5.png pic5 %}
</div>

#### create article table
<div style="max-width:700px">
	{% asset_img pic6.png pic6 %}
</div>
<div style="max-width:700px">
	{% asset_img pic7.png pic7 %}
</div>
<div style="max-width:700px">
	{% asset_img pic8.png pic8 %}
</div>
<div style="max-width:700px">
	{% asset_img pic9.png pic9 %}
</div>
<div style="max-width:700px">
	{% asset_img pic10.png pic10 %}
</div>
<div style="max-width:700px">
	{% asset_img pic11.png pic11 %}
</div>
<div style="max-width:700px">
	{% asset_img pic12.png pic12 %}
</div>

#### access DB
##### install psycopg2
``` bash
pip install psycopg2
```

### Ref 
+ [PostgreSQL Tutorial](https://www.educba.com/data-science/data-science-tutorials/postgresql-tutorial/)
+ [PostgreSQL中文手冊](https://docs.postgresql.tw/)
