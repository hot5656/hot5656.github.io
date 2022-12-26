---
title: Python Splash Example
abbrlink: cf12
date: 2022-12-22 10:52:19
categories: Coding
tags:
	- python
---

### livecoin
#### run by Chrome
``` Lua
-- https://web.archive.org/web/20200116052415/https://www.livecoin.net/en
function main(splash, args)
  -- splash private memoy(enable by default)
  -- if not enable no see RUR data
  -- ************* seem not work ************ 
  splash.private_mode_enabled = false
  
  url = args.url
  assert(splash:go(url))
  assert(splash:wait(1))
  rur_tab = assert(splash:select_all(".filterPanelItem___2z5Gb "))
  -- index start from 1
  rur_tab[5]:mouse_click()
  assert(splash:wait(5))
  
  splash:set_viewport_full()
  return splash:png()
end
```

<!--more-->

<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>

<div style="max-width:700px">
	{% asset_img pic2.png pic2 %}
</div>

<div style="max-width:700px">
	{% asset_img pic3.png pic3 %}
</div>

#### run by Scrapy
##### create project and spider 
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash>scrapy startproject livecoin
New Scrapy project 'livecoin', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\106-scrapy-splash\livecoin
You can start your first spider with:
    cd livecoin
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash>cd livecoin
(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash\livecoin>scrapy genspider coin web.archive.org/web/20200116052415/https://www.livecoin.net/en/
Created spider 'coin' using template 'basic' in module:
  livecoin.spiders.coin
```

##### install scrapy-splash
``` bash
pip install scrapy-splash
``` 

##### settings.py change
``` py
# put lastest
SPLASH_URL = 'http://localhost:8050'

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'livecoin.middlewares.LivecoinDownloaderMiddleware': 543,
#}
DOWNLOADER_MIDDLEWARES = {
    'scrapy_splash.SplashCookiesMiddleware': 723,
    'scrapy_splash.SplashMiddleware': 725,
    'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 810,
}

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'livecoin.middlewares.LivecoinSpiderMiddleware': 543,
#}
SPIDER_MIDDLEWARES = {
    'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
}

DUPEFILTER_CLASS = 'scrapy_splash.SplashAwareDupeFilter'
```

##### coin.py
``` py
import scrapy
from scrapy_splash import SplashRequest


class CoinSpider(scrapy.Spider):
    name = 'coin'
    allowed_domains = ['web.archive.org']
    # start_urls = ['http://web.archive.org/']

    script = '''
        function main(splash, args)
            -- splash private memoy(enable by default)
            -- if not enable no see RUR data
            -- ************* seem not work ************
            splash.private_mode_enabled = false

            url = args.url
            assert(splash:go(url))
            assert(splash:wait(1))
            rur_tab = assert(splash:select_all(".filterPanelItem___2z5Gb"))
            -- index start from 1
            rur_tab[5]:mouse_click()
            assert(splash:wait(5))

            splash:set_viewport_full()
            return splash:html()
        end
    '''

    def start_requests(self):
        yield SplashRequest(url="https://web.archive.org/web/20200116052415/https://www.livecoin.net/en", callback=self.parse, endpoint="execute", args={
            'lua_source': self.script
        })

    def parse(self, response):
        # print(response.body)
        print("=================")
        for currency in response.xpath("//div[contains(@class,'ReactVirtualized__Table__row tableRow___3EtiS ')]"):
            print("****************")
            yield {
                'currency pair': currency.xpath(".//div[1]/div/text()").get(),
                'volume(24h)': currency.xpath(".//div[2]/span/text()").get()
            }
```

##### run
``` bash
# 只抓到 Title 列,沒有抓到資料,無法處理
(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash\livecoin>scrapy crawl coin
```


### Quotes
#### create project & spider
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash>scrapy startproject quotes
New Scrapy project 'quotes', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\106-scrapy-splash\quotes
You can start your first spider with:
    cd quotes
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash>cd quotes
(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash\quotes>scrapy genspider quote_list quotes.toscrape.com/js/
Created spider 'quote_list' using template 'basic' in module:
  quotes.spiders.quote_list
```

#### settings.py change
``` py
# put lastest
SPLASH_URL = 'http://localhost:8050'

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'livecoin.middlewares.LivecoinDownloaderMiddleware': 543,
#}
DOWNLOADER_MIDDLEWARES = {
    'scrapy_splash.SplashCookiesMiddleware': 723,
    'scrapy_splash.SplashMiddleware': 725,
    'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 810,
}

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'livecoin.middlewares.LivecoinSpiderMiddleware': 543,
#}
SPIDER_MIDDLEWARES = {
    'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
}

DUPEFILTER_CLASS = 'scrapy_splash.SplashAwareDupeFilter'

# set JSON utf-8 format
FEED_EXPORT_ENCODING = 'utf-8'
```

#### quote_list.py
``` py
import scrapy
from scrapy_splash import SplashRequest

class QuoteListSpider(scrapy.Spider):
    name = 'quote_list'
    allowed_domains = ['quotes.toscrape.com']

    script = '''
        -- http://quotes.toscrape.com/js
        function main(splash, args)
            url = args.url
            assert(splash:go(url))
            assert(splash:wait(1))

            splash:set_viewport_full()
            return splash:html()
        end
    '''

    def start_requests(self):
        yield SplashRequest(url="http://quotes.toscrape.com/js/", callback=self.parse, endpoint="execute", args={
            'lua_source': self.script
        })

    def parse(self, response):
        for quote in response.xpath("//div[@class='quote']"):
            yield {
                'quote text': quote.xpath(".//span[1]/text()").get(),
                'author': quote.xpath(".//span[2]/small/text()").get(),
                'tags': quote.xpath(".//div/a/text()").getall(),
            }

        next_page = quote.xpath("//li[@class='next']/a/@href").get()
        if next_page:
            absolute_url = f'http://quotes.toscrape.com{next_page}'
            yield SplashRequest(url=absolute_url, callback=self.parse, endpoint="execute", args={
                'lua_source': self.script
            })
```

#### run
``` bash
scrapy crawl quote_list -o quotes_all.json
```

#### output(json)
``` json
[
    {
        "quote text": "\u201cThe world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.\u201d",
        "author": "Albert Einstein",
        "tags": [
            "change",
            "deep-thoughts",
            "thinking",
            "world"
        ]
    },
    {
        "quote text": "\u201cIt is our choices, Harry, that show what we truly are, far more than our abilities.\u201d",
        "author": "J.K. Rowling",
        "tags": [
            "abilities",
            "choices"
        ]
    },
......
    {
        "quote text": "“A person's a person, no matter how small.”",
        "author": "Dr. Seuss",
        "tags": [
            "inspirational"
        ]
    },
    {
        "quote text": "“... a mind needs books as a sword needs a whetstone, if it is to keep its edge.”",
        "author": "George R.R. Martin",
        "tags": [
            "books",
            "mind"
        ]
    }
]
```