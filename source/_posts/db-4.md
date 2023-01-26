---
title: PostgreSQL
tags:
  - database
  - docker
  - python
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
root@20b409f37d30:/#

# ls
root@20b409f37d30:/# ls -l
total 76
drwxr-xr-x   2 root root 4096 Jan  9 00:00 bin
drwxr-xr-x   2 root root 4096 Dec  9 19:15 boot
drwxr-xr-x   5 root root  340 Jan 24 02:26 dev
drwxr-xr-x   2 root root 4096 Jan 11 08:53 docker-entrypoint-initdb.d
drwxr-xr-x   1 root root 4096 Jan 23 14:28 etc
drwxr-xr-x   2 root root 4096 Dec  9 19:15 home
drwxr-xr-x   1 root root 4096 Jan  9 00:00 lib
drwxr-xr-x   2 root root 4096 Jan  9 00:00 lib64
drwxr-xr-x   2 root root 4096 Jan  9 00:00 media
drwxr-xr-x   2 root root 4096 Jan  9 00:00 mnt
drwxr-xr-x   2 root root 4096 Jan  9 00:00 opt
dr-xr-xr-x 260 root root    0 Jan 24 02:26 proc
drwx------   1 root root 4096 Jan 11 08:53 root
drwxr-xr-x   1 root root 4096 Jan 11 08:53 run
drwxr-xr-x   2 root root 4096 Jan  9 00:00 sbin
drwxr-xr-x   2 root root 4096 Jan  9 00:00 srv
dr-xr-xr-x  11 root root    0 Jan 24 02:26 sys
drwxrwxrwt   1 root root 4096 Jan 11 08:54 tmp
drwxr-xr-x   1 root root 4096 Jan  9 00:00 usr
drwxr-xr-x   1 root root 4096 Jan  9 00:00 var

# enter command line
root@20b409f37d30:/# psql -h localhost -U postgres
psql (15.1 (Debian 15.1-1.pgdg110+1))
Type "help" for help.
postgres=#

# list database
postgres=# \l
                                                List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |   Access privileges
-----------+----------+----------+------------+------------+------------+-----------------+-----------------------
 ithome    | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
           |          |          |            |            |            |                 | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
           |          |          |            |            |            |                 | postgres=CTc/postgres
(4 rows)


# <<connect to a db>> \c <database_name> <optional: as_user> example: \c database spring_auth
You are now connected to database "ithome" as user "postgres".
ithome=# \c ithome postgres
You are now connected to database "ithome" as user "postgres".
ithome=#

# create table
ithome=# CREATE TABLE leads (id INTEGER PRIMARY KEY, name VARCHAR);
CREATE TABLE

# list table
ithome=# \dt
         List of relations
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | leads | table | postgres
(1 row)

# show 變數
ithome=# \echo DBNAME
DBNAME
ithome=# \echo :DBNAME
ithome
ithome=# \echo :USER
postgres
ithome=# \echo :HOST
localhost
ithome=# \echo :PORT
5432 
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

#### response table
<div style="max-width:700px">
	{% asset_img pic14.png pic14 %}
</div>

#### special setting
##### 建立一個外來鍵跟原文的關聯
<div style="max-width:700px">
	{% asset_img pic15.png pic15 %}
</div>

##### set unique for CONFLICT check field
<div style="max-width:700px">
	{% asset_img pic16.png pic16 %}
</div>

##### id change from serial to integer - for manual input id
remove Constraints's Default
<div style="max-width:700px">
	{% asset_img pic17.png pic17 %}
</div>

### access DB
#### install psycopg2
``` bash
pip install psycopg2
```

#### db_access.py - add data
``` py
import psycopg2
from datetime import datetime
import env

host = 'localhost'
user = env.USER
password = env.PASSWORD
dbname = 'ithome'

conn_sting = f"host={host} user={user} dbname={dbname} password={password}"
conn = psycopg2.connect(conn_sting)
print('資料庫連線成功!')
cursor = conn.cursor()

article = {
    'title': '前言3',
    'url': 'https://ithelp.ithome.com.tw/articles?tab=tech',
    'author': 'Robert',
    'publish_time': datetime.now(),
    'tags': 'scrapy,postgresql,#3',
    'content': 'Test DB3...............'
}

# ok command 1
# postgres_insert_query = '''
#         INSERT INTO articles(title, url, author, publish_time, tags, content)
#         VALUES (%s, %s ,%s, %s, %s, %s)
#     '''
# cursor.execute(postgres_insert_query, (article['title'], article['url'], article['author'], article['publish_time'], article['tags'], article['content']) )

# ok command 2
cursor.execute("""
    INSERT INTO articles(title, url, author, publish_time, tags, content)
    VALUES (%(title)s, %(url)s, %(author)s, %(publish_time)s, %(tags)s, %(content)s);
    """,
    article)


print('資料新增成功!')

conn.commit()
cursor.close()
conn.close()
```

#### run 
``` bash
(myenv10_scrapy) D:\work\git\python_crawler\109-scrapy-practice2\ithome\ithome>python db_access.py
資料庫連線成功!
資料新增成功!
```

#### show DB
<div style="max-width:700px">
	{% asset_img pic10.png pic10 %}
</div>

### SQL command
#### delete row
``` sql
DELETE FROM articles WHERE id>3
```

#### query table
``` sql
SELECT * FROM public.articles ORDER BY id ASC 

SELECT * FROM articles ORDER BY id ASC 
```

### python code
#### insert 
``` python
article = {
    'title': item.get('title'),
    'url': item.get('url'),
    'author': item.get('author'),
    'publish_time': item.get('publish_time'),
    'tags': item.get('tags'),
    'content': item.get('content'),
    'view_count': item.get('view_count')
}
self.cursor.execute("""
    INSERT INTO articles(title, url, author, publish_time, tags, content, view_count)
    VALUES (%(title)s, %(url)s, %(author)s, %(publish_time)s, %(tags)s, %(content)s, %(view_count)s);
    """,
    article)

response = {
    'id': article_response['resp_id'],
    'article_id': article_id,
    'author': article_response['author'],
    'publish_time': article_response['publish_time'],
    'content': article_response['content'],
}
self.cursor.execute("""
    INSERT INTO public.response(article_id, author, publish_time, content)
    VALUES (%(article_id)s,%(author)s,%(publish_time)s,%(content)s);
    """,
    response)
```

#### insert update if exist
``` python
# current_timestamp : SQL current time
self.cursor.execute("""
    INSERT INTO articles(title, url, author, publish_time, tags, content, view_count)
    VALUES (%(title)s, %(url)s, %(author)s, %(publish_time)s, %(tags)s, %(content)s, %(view_count)s)
    ON CONFLICT(url)
    DO UPDATE SET title=%(title)s,
        tags=%(tags)s,
        content=%(content)s,
        update_time=current_timestamp
    RETURNING id;
    """,
    article)

self.cursor.execute("""
    INSERT INTO public.response(id, article_id, author, publish_time, content)
    VALUES (%(id)s, %(article_id)s ,%(author)s, %(publish_time)s, %(content)s)
    ON CONFLICT(id) DO UPDATE
    SET content=%(content)s;
    """,
    response)
```

### [IT邦幫忙](https://ithelp.ithome.com.tw/articles?tab=tech)
#### settings.py
``` py
# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'ithome.middlewares.IthomeSpiderMiddleware': 543,
#}
SPIDER_MIDDLEWARES = {
    'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
}

DUPEFILTER_CLASS = 'scrapy_splash.SplashAwareDupeFilter'

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'ithome.middlewares.IthomeDownloaderMiddleware': 543,
#}
DOWNLOADER_MIDDLEWARES = {
    'scrapy_splash.SplashCookiesMiddleware': 723,
    'scrapy_splash.SplashMiddleware': 725,
   

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
#ITEM_PIPELINES = {
#    'ithome.pipelines.IthomePipeline': 300,
#}
ITEM_PIPELINES = {
   'ithome.pipelines.PostgreSqlPipeline': 300,
}

SPLASH_URL = 'http://localhost:8050'
```

#### pipelines.py
``` py
# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import psycopg2
# import env


class IthomePipeline:
    def process_item(self, item, spider):
        return item

class PostgreSqlPipeline:
    def open_spider(self, spider):
        USER = 'postgres'
        PASSWORD = 'pg123456'
        host = 'localhost'
        user = USER
        password = PASSWORD
        dbname = 'ithome'
        conn_sting = f"host={host} user={user} dbname={dbname} password={password}"

        self.conn = psycopg2.connect(conn_sting)
        print('資料庫連線成功!')
        self.cursor = self.conn.cursor()

    def close_spider(self, spider):
        self.cursor.close()
        self.conn.close()

    def process_item(self, item, spider):
        article = {
            'title': item.get('title'),
            'url': item.get('url'),
            'author': item.get('author'),
            'publish_time': item.get('publish_time'),
            'tags': item.get('tags'),
            'content': item.get('content'),
            'view_count': item.get('view_count')
        }

        # direct update
        # self.cursor.execute("""
        #     INSERT INTO articles(title, url, author, publish_time, tags, content, view_count)
        #     VALUES (%(title)s, %(url)s, %(author)s, %(publish_time)s, %(tags)s, %(content)s, %(view_count)s);
        #     """,
        #     article)

        # check update
        # current_timestamp : SQL current time
        self.cursor.execute("""
            INSERT INTO articles(title, url, author, publish_time, tags, content, view_count)
            VALUES (%(title)s, %(url)s, %(author)s, %(publish_time)s, %(tags)s, %(content)s, %(view_count)s)
            ON CONFLICT(url)
            DO UPDATE SET title=%(title)s,
                tags=%(tags)s,
                content=%(content)s,
                update_time=current_timestamp
            RETURNING id;
            """,
            article)
        self.conn.commit()
        article_id = self.cursor.fetchone()[0]

        article_responses = item.get('responses')
        for article_response in article_responses:
            response = {
                'id': article_response['resp_id'],
                'article_id': article_id,
                'author': article_response['author'],
                'publish_time': article_response['publish_time'],
                'content': article_response['content'],
            }

            # direct update
            # self.cursor.execute("""
            #     INSERT INTO public.response(article_id, author, publish_time, content)
            #     VALUES (%(article_id)s,%(author)s,%(publish_time)s,%(content)s);
            #     """,
            #     response)

            # check exist
            self.cursor.execute("""
                INSERT INTO public.response(id, article_id, author, publish_time, content)
                VALUES (%(id)s, %(article_id)s ,%(author)s, %(publish_time)s, %(content)s)
                ON CONFLICT(id) DO UPDATE
                SET content=%(content)s;
                """,
                response)
            self.conn.commit()

        # print(f"{item.get('index')}資料新增成功!")
        return item
```

#### articles.py
``` py
import scrapy
from scrapy_splash import SplashRequest
from bs4 import BeautifulSoup
from datetime import datetime


class ArticlesSpider(scrapy.Spider):
    name = 'articles'
    allowed_domains = ['ithelp.ithome.com.tw']
    index = 0
    page_index = 1
    MAX_PAGE = 10
    URL_1ST = 'https://ithelp.ithome.com.tw/articles?tab=tech'

    script = '''
        function main(splash, args)
            assert(splash:go(args.url))
            assert(splash:wait(2))

            return splash:html()
        end
    '''

    def start_requests(self):
        yield SplashRequest(url=self.URL_1ST, callback=self.parse, endpoint="execute",
        args={
            'lua_source': self.script
        })


    def parse(self, response):
        articles = response.xpath("//div[@class='board tabs-content']/div[@class='qa-list']")
        for article in articles:
            # yield {
            #     'url': article.xpath(".//a[@class='qa-list__title-link']/@href").get(),
            #     'title': article.xpath(".//a[@class='qa-list__title-link']/text()").get(),
            #     'author': article.xpath("normalize-space(.//a[@class='qa-list__info-link']/text())").get(),
            #     'publish_time': article.xpath(".//a[@class='qa-list__info-time']/@title").get(),
            #     # 'tags': article.xpath(".//a[@class='qa-list__title-link']/@href").get(),
            #     'content': article.xpath("normalize-space(.//p[@class='qa-list__desc']/text())").get(),
            #     'view_count': article.xpath("(.//span[@class='qa-condition__count'])[3]/text()").get(),
            # }
            article_date_str = article.xpath(".//a[@class='qa-list__info-time']/@title").get()
            article_date = datetime.strptime(article_date_str, '%Y-%m-%d %H:%M:%S')

            url = article.xpath(".//a[@class='qa-list__title-link']/@href").get()
            yield SplashRequest(url=url, callback=self.article_parse, endpoint="execute",
                meta = {
                    'url': article.xpath(".//a[@class='qa-list__title-link']/@href").get(),
                    'author': article.xpath("normalize-space(.//a[@class='qa-list__info-link']/text())").get(),
                    'publish_time': article_date,
                    'view_count': int(article.xpath("(.//span[@class='qa-condition__count'])[3]/text()").get()),
                },
                args={
                    'lua_source': self.script
            })

        self.page_index += 1
        if self.page_index <= self.MAX_PAGE:
            url = f'{self.URL_1ST}&page={self.page_index}'
            yield SplashRequest(url=url, callback=self.parse, endpoint="execute",
            args={
                'lua_source': self.script
            })

    def article_parse(self, response):
        tags_list= response.xpath("//a[@class='tag qa-header__tagList']/text()").getall()
        tags= ','.join(tags_list)
        content_html = response.xpath("//div[@class='markdown__style']").get()
        soup= ''
        content=''

        self.index +=1
        try:
            soup = BeautifulSoup(content_html, "html.parser")
            content = soup.get_text()
        except:
            print(f"{self.index}---------------->")

        content = self.content_alignment(content)
        article_responses = []
        # item_responses = response.xpath("//div[@class='ans-header']")
        # for item_response in item_responses:
        #     resp_date_str = item_response.xpath(".//a[@class='ans-header__time']/text()").get()
        #     resp_date = datetime.strptime(resp_date_str, '%Y-%m-%d %H:%M:%S')
        #     resp_content = item_response.xpath(".//parent::node()/div[@class='response-markdown']/div/div/p/text()").get()
        #     resp_content = self.content_alignment(resp_content)
        #     article_responses.append({
        #         'author': item_response.xpath(".//a[@class='response-header__person']/text()").get(),
        #         'content': resp_content,
        #         'publish_time': resp_date
        #     })

        item_responses = response.xpath("//div[@class='qa-panel response clearfix']")
        for item_response in item_responses:
            resp_date_str = item_response.xpath(".//a[@class='ans-header__time']/text()").get()
            resp_date = datetime.strptime(resp_date_str, '%Y-%m-%d %H:%M:%S')
            resp_content = item_response.xpath(".//div[@class='response-markdown']/div/div/p/text()").get()
            resp_id = int(item_response.xpath(".//a/@name").get().replace("response-", ""))
            article_responses.append({
                'resp_id': resp_id,
                'author': item_response.xpath(".//a[@class='response-header__person']/text()").get(),
                'content': resp_content,
                'publish_time': resp_date
            })
        yield {
            'index': self.index,
            'url': response.request.meta['url'],
            'author': response.request.meta['author'],
            'publish_time': response.request.meta['publish_time'],
            'view_count': response.request.meta['view_count'],
            'title': response.xpath("normalize-space(//h2[@class='qa-header__title']/text())").get(),
            'tags': tags,
            'content': content,
            'responses': article_responses
        }

    def content_alignment(self, content):
        # break into lines and remove leading and trailing space on each
        # lines = (line.strip() for line in text.splitlines())
        # break multi-headlines into a line each
        # chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        # drop blank lines
        # content = '\n'.join(chunk for chunk in chunks if chunk)

        # break into lines and remove leading and trailing space on each
        lines = (line.strip() for line in content.splitlines())
        # drop blank lines
        content = '\n'.join(line for line in lines if line)

        return content
```

#### run
``` bash
(myenv10_scrapy) D:\work\git\python_crawler\109-scrapy-practice2\ithome>scrapy crawl articles
```

### Ref 
+ [PostgreSQL Tutorial](https://www.educba.com/data-science/data-science-tutorials/postgresql-tutorial/)
+ [PostgreSQL中文手冊](https://docs.postgresql.tw/)
+ [Shell commands for postgres(docker)](https://gist.github.com/jessepinkman9900/3f65e33ffd84abc84bd331d464d55c11)
+ [PostgreSQL CLI](https://pjchender.dev/database/psql-cli/)
+ [The Docker Notes](https://medium.com/alberthg-docker-notes)