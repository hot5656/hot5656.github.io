---
title: Python Scrapy 說明
abbrlink: '1525'
date: 2022-12-15 11:22:47
categories: Coding
tags:
	- python
---

### 說明

#### 5 components
+ Spiders
+ Spiders (spider Middleware-extracting data)
	+ scrapy.spider
	+ crawlspider
+ Pipelines
+ Middleware(Downloader Middeware)
+ Engine
+ Scheduler

<!--more-->

#### Spider type
+ XMLFeedSpider
+ CSVFeedSpider
+ SitemapSpider

#### Robots.txt (websites)
+ User-Agent
+ Allow
+ Disallow

```
# example website : https://www.facebook.com/robots.txt
# Notice: Collection of data on Facebook through automated means is
# prohibited unless you have express written permission from Facebook
# and may only be conducted for the limited purpose contained in said
# permission.
# See: http://www.facebook.com/apps/site_scraping_tos_terms.php

User-agent: Applebot
Disallow: /ajax/
Disallow: /album.php
Disallow: /checkpoint/
......

User-agent: Googlebot
Disallow: /ajax/
Disallow: /album.php
Disallow: /checkpoint/
......

User-agent: Applebot
Allow: /ajax/bootloader-endpoint/
Allow: /ajax/pagelet/generic.php/PagePostsSectionPagelet
Allow: /careers/
Allow: /safetycheck/
......

User-agent: Googlebot
Allow: /*/videos/
Allow: /ajax/bootloader-endpoint/
Allow: /ajax/pagelet/generic.php/PagePostsSectionPagelet
Allow: /careers/
Allow: /safetycheck/
Allow: /watch
......

```

### command
#### install scrapy
``` bash
# python 3.11 有問題, python 3.10 ok
# install myenv10_scrapy
rem cd \app\python_env\
# install scrapy version 1.7.1
rem pip install scrapy scrapy==1.7.1                                      
rem py -3.10 -m virtualenv myenv10_scrapy
# install 
pip install scrapy 
pip install pylint 
pip install autopep8
pip install ipython
```

#### create project
``` bash
myenv10_scrapy) D:\work\run\python_crawler\101-scrapy>scrapy startproject glassesshop
New Scrapy project 'glassesshop', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\101-scrapy\glassesshop

You can start your first spider with:
    cd glassesshop
    scrapy genspider example example.com
```

#### create spider
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy>cd glassesshop
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\glassesshop>scrapy genspider products https://www.glassesshop.com/bestsellers
Created spider 'products' using template 'basic' in module:
  glassesshop.spiders.products
```

#### run 
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy crawl countries
```

#### data generate by dataset(json, csv, xml) 
``` bash
# generate json file
scrapy crawl countries -o population_dataset.json
# generate csv file
scrapy crawl countries -o population_dataset.csv
# generate xml file
scrapy crawl countries -o population_dataset.xml
```

### manual control
#### version & help
``` bash
(myenv10_scrapy) D:\work\git\python_crawler>scrapy
......
[s] Available Scrapy objects:
[s]   scrapy     scrapy module (contains scrapy.Request, scrapy.Selector, etc)
[s]   crawler    <scrapy.crawler.Crawler object at 0x0000025B9E971C00>
[s]   item       {}
[s]   settings   <scrapy.settings.Settings object at 0x0000025B9E973340>
[s] Useful shortcuts:
[s]   fetch(url[, redirect=True]) Fetch URL and update local objects (by default, redirects are followed)
[s]   fetch(req)                  Fetch a scrapy.Request and update local objects
[s]   shelp()           Shell help (print this help)
[s]   view(response)    View response in a browser
2022-12-15 13:47:24 [asyncio] DEBUG: Using proactor: IocpProactor
In [1]: fetch("https://www.worldometers.info/world-population/population-by-cou
   ...: ntry")
2022-12-15 13:47:32 [scrapy.core.engine] INFO: Spider opened
2022-12-15 13:47:33 [scrapy.downloadermiddlewares.redirect] DEBUG: Redirecting (301) to <GET https://www.worldometers.info/world-population/population-by-country/> from <GET https://www.worldometers.info/world-population/population-by-country>
2022-12-15 13:47:33 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/population-by-country/> (referer: None)

In [2]: title = response.xpath("//h1/text()")

In [3]: title
Out[3]: [<Selector xpath='//h1/text()' data='Countries in the world by population ...'>]

In [4]: title.get()
Out[4]: 'Countries in the world by population (2022)'
```

#### shell get url
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>
scrapy shell "https://www.worldometers.info/world-population/population-by-country/"
2022-12-09 12:24:35 [scrapy.utils.log] INFO: Scrapy 2.7.1 started (bot: worldmeters)
......

[s]   shelp()           Shell help (print this help)
[s]   view(response)    View response in a browser
2022-12-09 12:24:37 [asyncio] DEBUG: Using selector: SelectSelector
In [1]:

In [1]: countries = response.xpath("//td/a")

In [2]: countries
Out[2]:
[<Selector xpath='//td/a' data='<a href="/world-population/china-popu...'>,
 <Selector xpath='//td/a' data='<a href="/world-population/india-popu...'>,
 ......
 <Selector xpath='//td/a' data='<a href="/world-population/tokelau-po...'>,
 <Selector xpath='//td/a' data='<a href="/world-population/holy-see-p...'>]

In [3]:
```

#### fetch and view
``` bash
(myenv10_scrapy) D:\work\run\python_crawler>scrapy shell
......
[s] Available Scrapy objects:
[s]   scrapy     scrapy module (contains scrapy.Request, scrapy.Selector, etc)
[s]   crawler    <scrapy.crawler.Crawler object at 0x000002AD58F421A0>
[s]   item       {}
[s]   settings   <scrapy.settings.Settings object at 0x000002AD58F43AF0>
[s] Useful shortcuts:
[s]   fetch(url[, redirect=True]) Fetch URL and update local objects (by default, redirects are followed)
[s]   fetch(req)                  Fetch a scrapy.Request and update local objects
[s]   shelp()           Shell help (print this help)
[s]   view(response)    View response in a browser
2022-12-15 14:02:50 [asyncio] DEBUG: Using proactor: IocpProactor
In [1]: fetch("https://www.worldometers.info/world-population/population-by-cou
   ...: ntry")
2022-12-15 14:02:57 [scrapy.core.engine] INFO: Spider opened
2022-12-15 14:02:58 [scrapy.downloadermiddlewares.redirect] DEBUG: Redirecting (301) to <GET https://www.worldometers.info/world-population/population-by-country/> from <GET https://www.worldometers.info/world-population/population-by-country>
2022-12-15 14:02:59 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/population-by-country/> (referer: None)

In [2]: title = response.xpath("//h1/text()")

In [3]: title
Out[3]: [<Selector xpath='//h1/text()' data='Countries in the world by population ...'>]

In [4]: title.get()
Out[4]: 'Countries in the world by population (2022)'

In [5]: view(response)
Out[5]: True
```


### settings.py
#### set JSON utf-8 format
``` py
# set JSON utf-8 format
FEED_EXPORT_ENCODING = 'utf-8'
```

#### set User-Agent(2 way)
``` py
# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'tinydeal (+http://www.yourdomain.com)'
# change user agent
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
```

```py
# Override the default request headers:
#DEFAULT_REQUEST_HEADERS = {
#   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#   'Accept-Language': 'en',
#}
# change default heads
DEFAULT_REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
}
```

### coding
#### starting spider .py
``` py
import scrapy

class SpecialOffersSpider(scrapy.Spider):
    name = 'special_offers'
    allowed_domains = ['web.archive.org']
    # start_urls = ['http://web.archive.org/']
    # change web site
    start_urls = ['https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html']

    def parse(self, response):
        for product in response.xpath('//ul[@class="productlisting-ul"]/div/li'):
          yield {
            'title' : product.xpath('.//a[@class="p_box_title"]/text()').get(),
            'url' : response.urljoin(product.xpath('.//a[@class="p_box_title"]/@href').get()),
            'discounted_price' : product.xpath('.//div[@class="p_box_price"]/span[1]/text()').get(),
            'original_price' : product.xpath('.//div[@class="p_box_price"]/span[2]/text()').get()
          }
```

#### bsolute url
``` py
# absolute url
# absolute_url = f'https://www.worldometers.info{link}'
absolute_url = response.urljoin(link)
yield scrapy.Request(url=absolute_url)
```

#### relative url
``` py
# relative url
yield response.follow(url=link, callback=self.parse_country)
```

#### add meta for callback parameter
``` py
import scrapy

class CountriesSpider(scrapy.Spider):
  name = 'countries'
  allowed_domains = ['www.worldometers.info']
  # start_urls = ['https://www.worldometers.info/']
  start_urls = ['https://www.worldometers.info/world-population/population-by-country']

  def parse(self, response):
    countries = response.xpath("//td/a")
    for country in countries:
      name = country.xpath(".//text()").get()
      link = country.xpath(".//@href").get()

      # absolute url
      # absolute_url = f'https://www.worldometers.info{link}'
      # absolute_url = response.urljoin(link)
      # yield scrapy.Request(url=absolute_url)

      # relative url
      # add meta for callback parameter
      yield response.follow(url=link, callback=self.parse_country, meta={'country_name': name})

  def parse_country(self, response):
    # add meta for callback parameter
    name = response.request.meta['country_name']
    rows = response.xpath("(//table[@class='table table-striped table-bordered table-hover table-condensed table-list'])[1]/tbody/tr")
    for row in rows:
      year = row.xpath("./td[1]/text()").get()
      population = row.xpath("./td[2]/strong/text()").get()
      yield {
        'country_name' : name,
        'year' : year,
        'population': population
      }
```

#### dealing with pagination
``` py
import scrapy

class SpecialOffersSpider(scrapy.Spider):
    name = 'special_offers'
    allowed_domains = ['web.archive.org']
    # start_urls = ['http://web.archive.org/']
    # change web site
    start_urls = ['https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html']

    def parse(self, response):
        for product in response.xpath('//ul[@class="productlisting-ul"]/div/li'):
            yield {
                'title' : product.xpath('.//a[@class="p_box_title"]/text()').get(),
                'url' : response.urljoin(product.xpath('.//a[@class="p_box_title"]/@href').get()),
                'discounted_price' : product.xpath('.//div[@class="p_box_price"]/span[1]/text()').get(),
                'original_price' : product.xpath('.//div[@class="p_box_price"]/span[2]/text()').get()
            }

        next_page = response.xpath('//a[@class="nextPage"]/@href').get()
        if next_page:
            yield scrapy.Request(url=next_page, callback=self.parse)
```

#### add headers
``` py
import scrapy

class SpecialOffersSpider(scrapy.Spider):
    name = 'special_offers'
    allowed_domains = ['web.archive.org']
    # start_urls = ['http://web.archive.org/']
    # change web site

    # change user agent
    # start_urls = ['https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html']
    def start_requests(self):
        yield scrapy.Request(url='https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html', callback=self.parse, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        })

    def parse(self, response):
        for product in response.xpath('//ul[@class="productlisting-ul"]/div/li'):
            yield {
                'title': product.xpath('.//a[@class="p_box_title"]/text()').get(),
                'url': response.urljoin(product.xpath('.//a[@class="p_box_title"]/@href').get()),
                'discounted_price': product.xpath('.//div[@class="p_box_price"]/span[1]/text()').get(),
                'original_price': product.xpath('.//div[@class="p_box_price"]/span[2]/text()').get(),
                # show response.request User-Agent
                'User-Agent': response.request.headers['User-Agent']
            }

        next_page = response.xpath('//a[@class="nextPage"]/@href').get()
        if next_page:
            # change user agent
            yield scrapy.Request(url=next_page, callback=self.parse, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            })
```

### Debug
#### Parse Command¶
``` bash
# seem scrapy have meta's issue
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>
scrapy parse --spider=countries -c parse_country --meta='{"country_name" : "China"}' https://www.worldometers.info/world-population/china-population/
Usage
=====
  scrapy parse [options] <url>
# issue for meta input
parse: error: Invalid -m/--meta value, pass a valid json string to -m or --meta. Example: --meta='{"foo" : "bar"}'
```

### XPath expression & CSS selectors

#### test html for CSS selectors
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>XPath and CSS Selectors</title>
</head>

<body>
    <h1>CSS Selectors simplified</h1>
    <div class="intro">
        <p>
            I'm paragraph within a div with a class set to intro
            <span id="location">I'm a span with ID set to location and i'm within a paragraph</span>
        </p>
        <p id="outside">I'm a paragraph with ID set to outside and i'm within a div with a class set to intro</p>
    </div>
    <p>Hi i'm placed immediately after a div with a class set to intro</p>
    <span class='intro'>Div with a class attribute set to intro</span>

    <ul id="items">
        <li data-identifier="7">Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
    </ul>

    <a href="https://www.google.com">Google</a>
    <a href="http://www.google.fr">Google France</a>

    <p class='bold italic'>Hi, I have two classes</p>
    <p class='bold'>Hi i'm bold</p>
</body>

</html>
```

#### test html for XPath expression
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>XPath and CSS Selectors</title>
</head>

<body>
    <h1>XPath Selectors simplified</h1>

    <div class="intro">
        <p>
            I'm paragraph within a div with a class set to intro
            <span id="location">I'm a span with ID set to location and i'm within a paragraph</span>
        </p>
        <p id="outside">I'm a paragraph with ID set to outside and i'm within a div with a class set to intro</p>
    </div>

    <div class="outro">
        <p id="unique">I'm in a div with a class attribute set to outro</p>
    </div>

    <p>Hi i'm placed immediately after a div</p>

    <span class='intro'>Div with a class attribute set to intro</span>

    <ul id="items">
        <li data-identifier="7">Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
    </ul>

    <a href="https://www.google.com">Google</a>
    <a href="http://www.google.fr">Google France</a>
</body>

</html>
```

#### CSS selectors
```
li[data-identifier=7]
a[href^='https']
a[href$='fr']
a[href*='google']

div.intro
div.intro p, #location

# all children
div.intro > p 
#items  > li

# 後面第一個(非內部)
div.intro + p

# 後面所有(非內部)
div.intro ~ p

# li 同層的 item
li:nth-child(1), li:nth-child(3)
li:nth-child(odd)
li:nth-child(even)
```

#### XPath expression
```
//div[@class="intro" or @class='outro']/p/text()
//a[starts-with(@href,'https')]

# not support XPath version 1
//a[ends-with(@href,'fr')] 

//a[contains(@href,'fr')]
//a[contains(@href,'google')]
//a[contains(text(),'France')]
//ul[@id='items']/li[1]
//ul[@id='items']/li[position()=1 or position()=4]
//ul[@id='items']/li[position()=1 or position()=last()]
//ul[@id='items']/li[position()>1]

//p[@id='unique']/parent::div
//p[@id='unique']/parent::node()
# 所有 ancestor
//p[@id='unique']/ancestor::node()
# 包含本身
//p[@id='unique']/ancestor-or-self::node()

# 之前的 element
//p[@id='unique']/preceding::node()
//p[@id='unique']/preceding::h1
# nothing
//p[@id='unique']/preceding::body
# 之前的 element(同層)
//p[@id='outside']/preceding-sibling::node()

//div[@class='intro']/child::p
//div[@class='intro']/child::node()
# 後面所有 element
//div[@class='intro']/following::node() 後面所有 element
//div[@class='intro']/following-sibling::node()
# 內層
//div[@class='intro']/descendant::node()
```

### Tool
#### Evaluate and validate XPath/CSS selectors in Chrome Developer Tools
+ open Chrome Devtools
+ select Elements
+ Press `Ctrl` + `F` enable DOM searching

#### VscCode automatically formatted the JSON file
+ press `Alt` + `sheft` + `F`

#### vs code plugin
+ Python extension for Visual Studio Code(Microsoft)

### Ref
[CSS selectors practice](https://try.jsoup.org/)
[XPath expression practice](https://scrapinghub.github.io/xpath-playground/)
[XPath Expressions and CSS Selectors](https://www.qafox.com/xpath-expressions-css-selectors/)
[W3C XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)
[W3C CSS Selector Reference](https://www.w3schools.com/cssref/css_selectors.php)
[Debugging Spiders(document)](https://docs.scrapy.org/en/latest/topics/debug.html)
