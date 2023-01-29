---
title: Python Scrapy Practice 2
abbrlink: c9d2
date: 2023-01-29 20:10:49
categories: Coding
tags:
	- python
---

### [IThelp](https://ithelp.ithome.com.tw/articles?tab=tech)

<!--more-->

#### settings.py
``` py
# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'ithome2.middlewares.Ithome2DownloaderMiddleware': 543,
#}
DOWNLOADER_MIDDLEWARES = {
   'ithome2.middlewares.Item2AgentMiddleware': 543,
}

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   'ithome2.pipelines.Ithome2Pipeline': 300,
   'ithome2.pipelines.MongoPipeline': 300,
}

# set JSON utf-8 format
FEED_EXPORT_ENCODING = 'utf-8'
```

#### middlewares.py (fake_useragent-UserAgent)
``` py
# add user agent
from fake_useragent import UserAgent
from scrapy.downloadermiddlewares.useragent import UserAgentMiddleware

class Item2AgentMiddleware(UserAgentMiddleware):
    def __init__(self, user_agent=''):
        self.user_agent = user_agent

    def process_request(self, request, spider):
        ua = UserAgent()
        request.headers['User-Agent'] = ua.random


    def process_response(self, request, response, spider):
        # log test
        spider.logger.info(f'Item2AgentMiddleware-process_response User-Agent of [{request.url}] is [{request.headers["User-Agent"]}]')

        return response
```

#### pipelines.py
``` py
# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
from pymongo import MongoClient
from datetime import datetime
import ithome2.items as items

class Ithome2Pipeline:
    def process_item(self, item, spider):
        if type(item).__name__ == 'IthomeArticleItem':
            if item['view_count'] < 100:
                raise DropItem(f'[{item["title"]}] 瀏覽數小於 100')

        return item


class MongoPipeline:
    collection_article = 'articles'
    collection_response = 'response'

    def open_spider(self, spider):
        # DB 不用先建也 ok
        host = 'localhost'
        dbname = 'ithome2'

        self.client = MongoClient('mongodb://%s:%s@%s:%s/' % (
            'mongoadmin',   # 資料庫帳號
            'mg123456',     # 資料庫密碼
            'localhost',    # 資料庫位址
            '27017'         # 資料庫埠號
        ))
        print('資料庫連線成功！')

        self.db = self.client[dbname]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        # if type(item).__name__ == 'IthomeArticleItem':
        if type(item) is items.IthomeArticleItem:
            # 查詢資料庫中是否有相同網址的資料存在
            doc = self.db[self.collection_article].find_one({'url': item['url']})
            item['update_time'] = datetime.now()

            if not doc:
                # 沒有就新增
                item['_id'] = str(self.db[self.collection_article].insert_one(dict(item)).inserted_id)
            else:
                # 已存在則更新
                self.db[self.collection_article].update_one(
                    {'_id': doc['_id']},
                    {'$set': dict(item)}
                )
                item['_id'] = str(doc['_id'])

        # if type(item).__name__ == 'IthomeReplyItem':
        if type(item) is items.IthomeReplyItem:
            document = self.db[self.collection_response].find_one(item['_id'])

            if not document:
                insert_result = self.db[self.collection_response].insert_one(dict(item))
            else:
                del item['_id']
                self.db[self.collection_response].update_one(
                    {'_id': document['_id']},
                    {'$set': dict(item)},
                    upsert=True
                )

        return item
```

#### items.py
``` py
import scrapy


class Ithome2Item(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class IthomeArticleItem(scrapy.Item):
    _id = scrapy.Field()
    url = scrapy.Field()
    author = scrapy.Field()
    publish_time = scrapy.Field()
    view_count = scrapy.Field()
    title = scrapy.Field()
    tags = scrapy.Field()
    content = scrapy.Field()
    update_time = scrapy.Field()

class IthomeReplyItem(scrapy.Item):
    _id = scrapy.Field()
    article_id = scrapy.Field()
    author = scrapy.Field()
    publish_time = scrapy.Field()
    content = scrapy.Field()
```

#### articles.py
``` py
import scrapy
# from ..items import as items
import ithome2.items as items
from datetime import datetime


class ArticlesSpider(scrapy.Spider):
    URL_1ST = 'https://ithelp.ithome.com.tw/articles?tab=tech'
    MAX_PAGE = 2
    page_index = 1
    name = 'articles'
    allowed_domains = ['ithelp.ithome.com.tw']
    start_urls = [URL_1ST]

    def parse(self, response):
        # with open('ithome.html', 'wb') as f:
        #     f.write(response.body)

        articles = response.xpath("//div[@class='board tabs-content']/div[@class='qa-list']")
        for article in articles:
            article_url = article.xpath(".//a[@class='qa-list__title-link']/@href").get()
            yield response.follow(article_url, callback=self.article_parse)

        self.page_index += 1
        next_page = response.xpath("//a[@rel='next']/@href").get()
        if next_page and self.page_index <= self.MAX_PAGE :
            yield scrapy.Request(url=f"{self.URL_1ST}&page={self.page_index}", callback=self.parse)

    def article_parse(self, response):
        article_head = response.xpath("//div[@class='qa-header']")
        content = ''.join(response.xpath("//div[@class='markdown__style']/descendant::text()").getall())
        content = self.content_alignment(content)
        tags = article_head.xpath(".//a[contains(@class,'tag qa-header__tagList')]/text()").getall()
        author_list = article_head.xpath(".//a[@class='qa-header__info-person']/text()").getall()
        author = ''.join(x.strip() for x in author_list )

        article = items.IthomeArticleItem()
        article['url'] =  response.url
        article['author'] = author
        article['publish_time'] = article_head.xpath(".//a[@class='qa-header__info-time']/@title").get()
        article['view_count'] = int(article_head.xpath(".//span[@class='qa-header__info-view']/text()").get().split(" ")[0])
        article['title'] = article_head.xpath("normalize-space(.//h2[@class='qa-header__title']/text())").get()
        article['tags'] = ','.join(tags)
        article['content'] = content
        yield article

        if '_id' in article:
            '''
            上一行執行後資料已更新到資料庫中
            因為是同一個物件參照
            可以取得識別值
            '''
            article_id = article['_id']
            '''
            因為 iTHome 原文與回文都是在同一個畫面中
            剖析回文時使用原本的 response 即可
            否則這邊需要再回傳 Request 物件
            yield scrapy.Request(url, callback=self.parse_reply)
            '''
            yield from self.parse_reply(response, article_id)

    def parse_reply(self, response, article_id):
        item_responses = response.xpath("//div[@class='qa-panel response clearfix']")
        for item_response in item_responses:
            resp_date_str = item_response.xpath(".//a[@class='ans-header__time']/text()").get()
            resp_date = datetime.strptime(resp_date_str, '%Y-%m-%d %H:%M:%S')
            resp_content = item_response.xpath(".//div[@class='response-markdown']/div/div/p/text()").get()
            resp_id = int(item_response.xpath(".//a/@name").get().replace("response-", ""))

            article_resp  = items.IthomeReplyItem()
            article_resp['_id'] = resp_id
            article_resp['article_id'] = article_id
            article_resp['author'] = item_response.xpath(".//a[@class='response-header__person']/text()").get()
            article_resp['content'] = resp_content
            article_resp['publish_time'] = resp_date
            yield article_resp


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
(myenv10_scrapy) D:\work\git\python_crawler\109-scrapy-practice2\ithome2>scrapy crawl articles
```

