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

#### the why's and when's of web scraping
+ Why web scraping?
	+ Data analysis
		Data analysis relies 100% on a large amount of data(datasets).
		The more data you have the more accurate your data analysis will be.
	+ Machine learning
		Machine learning requires a huge amount of data.
		The more data you have the more your system can learn.	

+ Why web scrapy
	+ Lead generation
	+ Real estate listings
	+ Price Monitoring
	+ Stock marking tracking
	+ Drop shipping

+ When to/not use web scraping
	+ Terms of service & the Robots.txt?
	+ Does the website have a public API?
	+ Does the API have any limitations?
	+ Does the API provide all the data you want?
	+ Is the API free/paid?

#### scrapy sider templates
``` bash
>scrapy genspider -l
Available templates:
  basic
  crawl
  csvfeed
  xmlfeed
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

#### install scrapy by conda
##### insatll scrapy
``` bash
# Anaconda download
# install virtual machine
# install scrapy
(virtual_3_7_spider) C:\Users\robertkao>conda install -c conda-forge scrapy==1.6 pylint autopep8 -y
# check version
(virtual_3_7_spider) C:\Users\robertkao>scrapy
# test scrapy shell
scrapy shell
# found error : ImportError: cannot import name 'HTTPClientFactory' from 'twisted.web.client' (unknown location)
# change twisted version from 22.4.0 to 21.7.0 solved the problem
conda uninstall twisted
conda install twisted==21.7.0 -y
# test scrapy shell ok
scrapy shell
```

##### once scrapy parse ok - but doesn't know Why?
``` bash
PS D:\work\run\python_crawler\102-conda\worldometers> scrapy parse --spider=countries -c parse_country --meta='{\"country_name\" : \"China\"}' https://www.worldometers.info/world-population/china-population/
2022-12-16 16:16:28 [scrapy.utils.log] INFO: Scrapy 2.6.2 started (bot: worldometers)
2022-12-16 16:16:28 [scrapy.utils.log] INFO: Versions: lxml 4.9.1.0, libxml2 2.9.14, cssselect 1.1.0, parsel 1.6.0, w3lib 1.21.0, Twisted 22.2.0, Python 3.9.13 (main, Aug 25 2022, 23:51:50) [MSC v.1916 64 bit (AMD64)], pyOpenSSL 22.0.0 (OpenSSL 1.1.1s  1 Nov 2022), cryptography 37.0.1, Platform Windows-10-10.0.19044-SP0
2022-12-16 16:16:28 [scrapy.crawler] INFO: Overridden settings:
{'BOT_NAME': 'worldometers',
 'NEWSPIDER_MODULE': 'worldometers.spiders',
 'ROBOTSTXT_OBEY': True,
 'SPIDER_MODULES': ['worldometers.spiders']}
2022-12-16 16:16:28 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.selectreactor.SelectReactor
2022-12-16 16:16:28 [scrapy.extensions.telnet] INFO: Telnet Password: 446a57845c238b66
2022-12-16 16:16:28 [scrapy.middleware] INFO: Enabled extensions:
['scrapy.extensions.corestats.CoreStats',
 'scrapy.extensions.telnet.TelnetConsole',
 'scrapy.extensions.logstats.LogStats']
2022-12-16 16:16:28 [scrapy.middleware] INFO: Enabled downloader middlewares:
['scrapy.downloadermiddlewares.robotstxt.RobotsTxtMiddleware',
 'scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware',
 'scrapy.downloadermiddlewares.downloadtimeout.DownloadTimeoutMiddleware',
 'scrapy.downloadermiddlewares.defaultheaders.DefaultHeadersMiddleware',
 'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware',
 'scrapy.downloadermiddlewares.retry.RetryMiddleware',
 'scrapy.downloadermiddlewares.redirect.MetaRefreshMiddleware',
 'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware',
 'scrapy.downloadermiddlewares.redirect.RedirectMiddleware',
 'scrapy.downloadermiddlewares.cookies.CookiesMiddleware',
 'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware',
 'scrapy.downloadermiddlewares.stats.DownloaderStats']
2022-12-16 16:16:28 [scrapy.middleware] INFO: Enabled spider middlewares:
['scrapy.spidermiddlewares.httperror.HttpErrorMiddleware',
 'scrapy.spidermiddlewares.offsite.OffsiteMiddleware',
 'scrapy.spidermiddlewares.referer.RefererMiddleware',
 'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware',
 'scrapy.spidermiddlewares.depth.DepthMiddleware']
2022-12-16 16:16:28 [scrapy.middleware] INFO: Enabled item pipelines:
[]
2022-12-16 16:16:28 [scrapy.core.engine] INFO: Spider opened
2022-12-16 16:16:28 [scrapy.extensions.logstats] INFO: Crawled 0 pages (at 0 pages/min), scraped 0 items (at 0 items/min)
2022-12-16 16:16:28 [scrapy.extensions.telnet] INFO: Telnet console listening on 127.0.0.1:6024
2022-12-16 16:16:29 [scrapy.core.engine] DEBUG: Crawled (404) <GET https://www.worldometers.info/robots.txt> (referer: None)
2022-12-16 16:16:29 [protego] DEBUG: Rule at line 2 without any user agent to enforce it on.
2022-12-16 16:16:29 [protego] DEBUG: Rule at line 10 without any user agent to enforce it on.
2022-12-16 16:16:29 [protego] DEBUG: Rule at line 12 without any user agent to enforce it on.
2022-12-16 16:16:29 [protego] DEBUG: Rule at line 14 without any user agent to enforce it on.
2022-12-16 16:16:29 [protego] DEBUG: Rule at line 16 without any user agent to enforce it on.
2022-12-16 16:16:29 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/china-population/> (referer: None)
2022-12-16 16:16:29 [scrapy.core.engine] INFO: Closing spider (finished)
2022-12-16 16:16:29 [scrapy.statscollectors] INFO: Dumping Scrapy stats:
{'downloader/request_bytes': 494,
 'downloader/request_count': 2,
 'downloader/request_method_count/GET': 2,
 'downloader/response_bytes': 13588,
 'downloader/response_count': 2,
 'downloader/response_status_count/200': 1,
 'downloader/response_status_count/404': 1,
 'elapsed_time_seconds': 1.187387,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2022, 12, 16, 8, 16, 29, 771491),
 'httpcompression/response_bytes': 67695,
 'httpcompression/response_count': 2,
 'log_count/DEBUG': 8,
 'log_count/INFO': 10,
 'response_received_count': 2,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/404': 1,
 'scheduler/dequeued': 1,
 'scheduler/dequeued/memory': 1,
 'scheduler/enqueued': 1,
 'scheduler/enqueued/memory': 1,
 'start_time': datetime.datetime(2022, 12, 16, 8, 16, 28, 584104)}
2022-12-16 16:16:29 [scrapy.core.engine] INFO: Spider closed (finished)

>>> STATUS DEPTH LEVEL 1 <<<
# Scraped Items  ------------------------------------------------------------
[{'country_name': 'China', 'population': '1,439,323,776', 'year': '2020'},
 {'country_name': 'China', 'population': '1,433,783,686', 'year': '2019'},
 {'country_name': 'China', 'population': '1,427,647,786', 'year': '2018'},
 {'country_name': 'China', 'population': '1,421,021,791', 'year': '2017'},
 {'country_name': 'China', 'population': '1,414,049,351', 'year': '2016'},
 {'country_name': 'China', 'population': '1,406,847,870', 'year': '2015'},
 {'country_name': 'China', 'population': '1,368,810,615', 'year': '2010'},
 {'country_name': 'China', 'population': '1,330,776,380', 'year': '2005'},
 {'country_name': 'China', 'population': '1,290,550,765', 'year': '2000'},
 {'country_name': 'China', 'population': '1,240,920,535', 'year': '1995'},
 {'country_name': 'China', 'population': '1,176,883,674', 'year': '1990'},
 {'country_name': 'China', 'population': '1,075,589,361', 'year': '1985'},
 {'country_name': 'China', 'population': '1,000,089,235', 'year': '1980'},
 {'country_name': 'China', 'population': '926,240,885', 'year': '1975'},
 {'country_name': 'China', 'population': '827,601,394', 'year': '1970'},
 {'country_name': 'China', 'population': '724,218,968', 'year': '1965'},
 {'country_name': 'China', 'population': '660,408,056', 'year': '1960'},
 {'country_name': 'China', 'population': '612,241,554', 'year': '1955'}]

# Requests  -----------------------------------------------------------------
[]

PS D:\work\run\python_crawler\102-conda\worldometers> 
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

#### create spider(crawl template)
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy>cd imdb
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\imdb>scrapy genspider -t crawl best_movies imdb.com
Created spider 'best_movies' using template 'crawl' in module:
  imdb.spiders.best_movies
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

#### add headers(crawl template)
``` py
# best_movies.py
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule


class BestMoviesSpider(CrawlSpider):
    name = 'best_movies'
    allowed_domains = ['imdb.com']

	# change user agent
    # start_urls = ['https://www.imdb.com/search/title/?genres=drama&groups=top_250&sort=user_rating,desc']
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'

    def start_requests(self):
        yield scrapy.Request(url='https://www.imdb.com/search/title/?genres=drama&groups=top_250&sort=user_rating,desc', headers={
        	'User-Agent': self.user_agent
        })

    rules = (
        Rule(LinkExtractor(restrict_xpaths="//h3[@class='lister-item-header']/a"), callback='parse_item', follow=True, process_request='set_user_agent'),
		# add next page rule
		Rule(LinkExtractor(restrict_xpaths="(//a[@class='lister-page-next next-page'])[2]"))
    )


	# for scrappier 2.0
    def set_user_agent(self, request, spider):
        request.headers['User-Agent'] = self.user_agent
        return request

    def parse_item(self, response):
        yield {
            'title': response.xpath("//div[@class='sc-80d4314-1 fbQftq']/h1/text()").get(),
            'year': response.xpath("//span[@class='sc-8c396aa2-2 itZqyK']/text()").get(),
            'duration': ''.join(response.xpath("//ul[@class='ipc-inline-list ipc-inline-list--show-dividers sc-8c396aa2-0 kqWovI baseAlt']/li[3]/text()").getall()),
            'genre': response.xpath("//div[@class='ipc-chip-list__scroller']/a/span/text()").getall(),
            'rating': response.xpath("//div[@data-testid='hero-rating-bar__aggregate-rating__score']/span[1]/text()").get(),
            'movie_url': response.url,
            'user-agent': response.request.headers['User-Agent']
        }
```

### Debug
#### Parse Command
<font color=red>
	Seem scrapy has issue
</font>

``` py
import scrapy
# from scrapy.shell import inspect_response

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
    # inspect_response(response, self)

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

#### Scrapy Shell
<font color=red>
	Seem scrapy has issue
</font>

``` py
import scrapy
from scrapy.shell import inspect_response

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
    inspect_response(response, self)

    # add meta for callback parameter
    # name = response.request.meta['country_name']
    # rows = response.xpath("(//table[@class='table table-striped table-bordered table-hover table-condensed table-list'])[1]/tbody/tr")
    # for row in rows:
    #   year = row.xpath("./td[1]/text()").get()
    #   population = row.xpath("./td[2]/strong/text()").get()
    #   yield {
    #     'country_name' : name,
    #     'year' : year,
    #     'population': population
    #   }
```

``` bash
scrapy crawl countries
# It doesn't open scrapy shell after run
# seem scrapy issue 
```

#### Open in browser
``` py
import scrapy
from scrapy.utils.response import open_in_browser

class CountriesSpider(scrapy.Spider):
  name = 'countries'
  allowed_domains = ['www.worldometers.info']
  # start_urls = ['https://www.worldometers.info/']
  start_urls = ['https://www.worldometers.info/world-population/population-by-country']

  def parse(self, response):
    # countries = response.xpath("//td/a")
    # for country in countries:
    #   name = country.xpath(".//text()").get()
    #   link = country.xpath(".//@href").get()

      # absolute url
      # absolute_url = f'https://www.worldometers.info{link}'
      # absolute_url = response.urljoin(link)
      # yield scrapy.Request(url=absolute_url)

      # relative url
      # add meta for callback parameter
    yield response.follow(url="https://www.worldometers.info/world-population/china-population/", callback=self.parse_country, meta={'country_name': 'China'})

  def parse_country(self, response):
    open_in_browser(response)

    # add meta for callback parameter
    # name = response.request.meta['country_name']
    # rows = response.xpath("(//table[@class='table table-striped table-bordered table-hover table-condensed table-list'])[1]/tbody/tr")
    # for row in rows:
    #   year = row.xpath("./td[1]/text()").get()
    #   population = row.xpath("./td[2]/strong/text()").get()
    #   yield {
    #     'country_name' : name,
    #     'year' : year,
    #     'population': population
    #   }
```

``` bash
scrapy crawl countries
# then browser open
```

#### Logging
```py
import scrapy
import logging

class CountriesSpider(scrapy.Spider):
  name = 'countries_logging'
  allowed_domains = ['www.worldometers.info']
  # start_urls = ['https://www.worldometers.info/']
  start_urls = ['https://www.worldometers.info/world-population/population-by-country']

  def parse(self, response):
    # countries = response.xpath("//td/a")
    # for country in countries:
    #   name = country.xpath(".//text()").get()
    #   link = country.xpath(".//@href").get()

      # absolute url
      # absolute_url = f'https://www.worldometers.info{link}'
      # absolute_url = response.urljoin(link)
      # yield scrapy.Request(url=absolute_url)

      # relative url
      # add meta for callback parameter
    yield response.follow(url="https://www.worldometers.info/world-population/china-population/", callback=self.parse_country, meta={'country_name': 'China'})

  def parse_country(self, response):
    # logging.info(response.status)
    # 2022-12-19 17:08:59 [root] INFO: 200
    # 2022-12-19 17:08:59 [scrapy.core.engine] INFO: Closing spider (finished)
    logging.warning(response.status)
    # 2022-12-19 17:10:58 [root] WARNING: 200
    # 2022-12-19 17:10:58 [scrapy.core.engine] INFO: Closing spider (finished)

    # add meta for callback parameter
    # name = response.request.meta['country_name']
    # rows = response.xpath("(//table[@class='table table-striped table-bordered table-hover table-condensed table-list'])[1]/tbody/tr")
    # for row in rows:
    #   year = row.xpath("./td[1]/text()").get()
    #   population = row.xpath("./td[2]/strong/text()").get()
    #   yield {
    #     'country_name' : name,
    #     'year' : year,
    #     'population': population
    #   }
```

``` bash
# run 
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy crawl countries_logging
......
# logging show
2022-12-19 17:10:58 [root] WARNING: 200
2022-12-19 17:10:58 [scrapy.core.engine] INFO: Closing spider (finished)
2022-12-19 17:10:58 [scrapy.statscollectors] INFO: Dumping Scrapy stats:
......
```

#### run python debug(need set to corect python enviroment)
##### runner.py
``` py
# runner.py for worldmeters.spiders.countries
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
# set crawl code
from worldmeters.spiders.countries import CountriesSpider

# get configure
process = CrawlerProcess(settings=get_project_settings())
# set crawl entry
process.crawl(CountriesSpider)
process.start()
``` 

##### F5 run debug

#### Test Scrapy
+ conda 3.7 scrapy 1.6 (wisted 21.7.0)
	+ scrapy shell - ok
	+ scrapy shell(inspect_response) - ok 
	+ Parse Command - not ok
+ conda 3.7 scrapy 2.62 (wisted 21.7.0)
	+ scrapy shell - ok
	+ scrapy shell(inspect_response) - ok 
	+ Parse Command - not ok
+ conda 3.9 scrapy 2.62 (wisted 21.7.0)
	+ scrapy shell - ok
	+ scrapy shell(inspect_response) - not ok 
	+ Parse Command - not ok
+ python 3.10 scrapy 2.71
	+ scrapy shell - ok
	+ scrapy shell(inspect_response) - not ok 
	+ Parse Command - not ok

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

# 2nd pattern (index 1)
//a[@class='lister-page-next next-page'])[2]

# contain class
//div[contains(@class,"ReactVirtualized__Table__row tableRow___3EtiS ")]
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
+ Python Environment Manager

#### excel 開  utf-8 .csv file
<div style="width:500px">
	{% asset_img pic11.png pic11 %}
</div>

<div style="width:500px">
	{% asset_img pic12.png pic12 %}
</div>


### Ref
[CSS selectors practice](https://try.jsoup.org/)
[XPath expression practice](https://scrapinghub.github.io/xpath-playground/)
[XPath Expressions and CSS Selectors](https://www.qafox.com/xpath-expressions-css-selectors/)
[W3C XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)
[W3C CSS Selector Reference](https://www.w3schools.com/cssref/css_selectors.php)
[Debugging Spiders(document)](https://docs.scrapy.org/en/latest/topics/debug.html)
