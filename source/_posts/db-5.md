---
title: MongoDB docker
abbrlink: a963
date: 2023-01-25 22:03:10
categories: Back End
tags:
  - database
  - docker
  - python
---

### MongoDB install to docker
#### get image
``` bash
docker pull mongo
```

<!--more-->

#### create and run
``` bash
# doesn't set port
docker run --name ithome-mongo2 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=mg123456 -v D:\app\docker\ithome2\mongo:/data/db -d mongo

# set port 27017
docker run --name ithome-mongo -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=mg123456 -v D:\app\docker\ithome\MonoDbData:/data/db -p 27017:27017 -d mongo
```

### Management - Robo 3T
#### create connect
mongoadmin:mg123456

<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>
<div style="max-width:700px">
	{% asset_img pic2.png pic2 %}
</div>
<div style="max-width:700px">
	{% asset_img pic3.png pic3 %}
</div>

#### create database
<div style="max-width:700px">
	{% asset_img pic4.png pic4 %}
</div>
<div style="max-width:700px">
	{% asset_img pic5.png pic5 %}
</div>
<div style="max-width:700px">
	{% asset_img pic6.png pic6 %}
</div>

#### getLastError command is not supported
+ docker MongoDB default not support TLS
  + if MongoDB support TLS, and set TLS then ok
  
<div style="max-width:700px">
	{% asset_img pic7.png pic7 %}
</div>

#### create collection
<div style="max-width:700px">
	{% asset_img pic8.png pic8 %}
</div>

<div style="max-width:700px">
	{% asset_img pic9.png pic9 %}
</div>

#### run shell
``` py
# show articles data (max 50)
db.getCollection('articles').find({})

# show all articles rows
db.getCollection('articles').find({}).count()

# show all articles rows(max 10)
db.getCollection('articles').find().limit(10)

# show articles data : skip 20 then show 10 max 
db.getCollection('articles').find().skip(20).limit(10)

# show articles data : skip 250 then show 50 max 
# it can show data after 50 ...
db.getCollection('articles').find().skip(250).limit(50)
```

<div style="max-width:700px">
	{% asset_img pic11.png pic11 %}
</div>

### access DB
#### install psycopg2
``` bash
pip install pymongo
```

#### db_mongo.py - add data
``` py
from pymongo import MongoClient
from datetime import datetime


# DB 不用先建也 ok
host = 'localhost'
dbname = 'ithome'

client = MongoClient('mongodb://%s:%s@%s:%s/' % (
    'mongoadmin',   # 資料庫帳號
    'mg123456',     # 資料庫密碼
    'localhost',    # 資料庫位址
    '27017'         # 資料庫埠號
))
print('資料庫連線成功！')


db = client[dbname]
article_collection = db.articles

article = {
    'title': '前言3',
    'url': 'https://ithelp.ithome.com.tw/articles?tab=tech',
    'author': 'Robert',
    'publish_time': datetime.now(),
    'tags': 'scrapy,postgresql,#3',
    'content': 'Test DB3...............'
}
article_id = article_collection.insert_one(article).inserted_id

print(f'資料新增成功！ID: {article_id}')

client.close()
```

#### run 
``` bash
(myenv10_scrapy) D:\work\git\python_crawler\109-scrapy-practice2\ithome\ithome>python db_mongo.py
資料庫連線成功！
資料新增成功！ID: 63d1fca4cb5fa5cb3cb8fd7d
```

#### show DB
<div style="max-width:700px">
	{% asset_img pic10.png pic10 %}
</div>

### [IT邦幫忙](https://ithelp.ithome.com.tw/articles?tab=tech)
#### settings.py
``` py
# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
#ITEM_PIPELINES = {
#    'ithome.pipelines.IthomePipeline': 300,
#}
ITEM_PIPELINES = {
#    'ithome.pipelines.PostgreSqlPipeline': 300,
   'ithome.pipelines.MongoPipeline': 300,
}
```

#### pipelines.py
``` py
from itemadapter import ItemAdapter
import psycopg2
from pymongo import MongoClient
from datetime import datetime
# import env


class IthomePipeline:
    def process_item(self, item, spider):
        return item


class MongoPipeline:
    def open_spider(self, spider):
        # DB 不用先建也 ok
        host = 'localhost'
        dbname = 'ithome'

        self.client = MongoClient('mongodb://%s:%s@%s:%s/' % (
            'mongoadmin',   # 資料庫帳號
            'mg123456',     # 資料庫密碼
            'localhost',    # 資料庫位址
            '27017'         # 資料庫埠號
        ))
        print('資料庫連線成功！')


        self.db = self.client[dbname]
        self.article_collection = self.db.articles
        self.response_collection = self.db.response

    def close_spider(self, spider):
        self.client.close()

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

        # 查詢資料庫中是否有相同網址的資料存在
        doc = self.article_collection.find_one({'url': article['url']})
        article['update_time'] = datetime.now()

        if not doc:
            # 沒有就新增
            article_id = self.article_collection.insert_one(article).inserted_id
        else:
            # 已存在則更新
            self.article_collection.update_one(
                {'_id': doc['_id']},
                {'$set': article}
            )
            article_id = doc['_id']

        article_responses = item.get('responses')
        for article_response in article_responses:
            response = {
                '_id': article_response['resp_id'],
                'article_id': article_id,
                'author': article_response['author'],
                'publish_time': article_response['publish_time'],
                'content': article_response['content'],
            }

            self.response_collection.update_one(
                {'_id': response['_id']},
                {'$set': response},
                upsert=True
            )

        # print(f"{item.get('index')}資料新增成功!")
        return item
```

#### run
``` bash
(myenv10_scrapy) D:\work\git\python_crawler\109-scrapy-practice2\ithome>scrapy crawl articles
```