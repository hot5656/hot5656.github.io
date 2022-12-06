---
title: Python Scrapy
abbrlink: d5e4
date: 2022-12-04 21:06:54
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

#### vs code plugin
+ Python extension for Visual Studio Code(Microsoft)

### scrapy install

#### install
python 3.11 有問題, python 3.10 ok
```
# install myenv10_scrapy
rem cd \app\python_env\
rem py -3.10 -m virtualenv myenv10_scrapy
# install 
pip install scrapy 
pip install pylint 
pip install autopep8
pip install ipython
```

#### scrapy version & help
```
# show version & help
(myenv10_scrapy) D:\work\git\python_crawler>scrapy
Scrapy 2.7.1 - no active project

Usage:
  scrapy <command> [options] [args]

Available commands:
  bench         Run quick benchmark test
  commands
  fetch         Fetch a URL using the Scrapy downloader
  genspider     Generate new spider using pre-defined templates
  runspider     Run a self-contained spider (without creating a project)
  settings      Get settings values
  shell         Interactive scraping console
  startproject  Create new project
  version       Print Scrapy version
  view          Open URL in browser, as seen by Scrapy

  [ more ]      More commands available when run from project directory

Use "scrapy <command> -h" to see more info about a command

(myenv10_scrapy) D:\work\git\python_crawler>
```

#### scrapy bench(simple test)
```
(myenv10_scrapy) D:\work\git\python_crawler>scrapy bench
2022-12-02 22:22:22 [scrapy.utils.log] INFO: Scrapy 2.7.1 started (bot: scrapybot)
2022-12-02 22:22:22 [scrapy.utils.log] INFO: Versions: lxml 4.9.1.0, libxml2 2.9.12, cssselect 1.2.0, parsel 1.7.0, w3lib 2.1.0, Twisted 22.10.0, Python 3.10.8 (tags/v3.10.8:aaaf517, Oct 11 2022, 16:50:30) [MSC v.1933 64 bit (AMD64)], pyOpenSSL 22.1.0 (OpenSSL 3.0.7 1 Nov 2022), cryptography 38.0.4, Platform Windows-10-10.0.19045-SP0
2022-12-02 22:22:23 [scrapy.crawler] INFO: Overridden settings:
{'CLOSESPIDER_TIMEOUT': 10, 'LOGSTATS_INTERVAL': 1, 'LOG_LEVEL': 'INFO'}
2022-12-02 22:22:23 [py.warnings] WARNING: D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\utils\request.py:231: ScrapyDeprecationWarning: '2.6' is a deprecated value for the 'REQUEST_FINGERPRINTER_IMPLEMENTATION' setting.

It is also the default value. In other words, it is normal to get this warning if you have not defined a value for the 'REQUEST_FINGERPRINTER_IMPLEMENTATION' setting. This is so for backward compatibility reasons, but it will change in a future version of Scrapy.

See the documentation of the 'REQUEST_FINGERPRINTER_IMPLEMENTATION' setting for information on how to handle this deprecation.
  return cls(crawler)

2022-12-02 22:22:24 [scrapy.extensions.telnet] INFO: Telnet Password: e7858b3f4e0433a6
2022-12-02 22:22:24 [scrapy.middleware] INFO: Enabled extensions:
['scrapy.extensions.corestats.CoreStats',
 'scrapy.extensions.telnet.TelnetConsole',
 'scrapy.extensions.closespider.CloseSpider',
 'scrapy.extensions.logstats.LogStats']
2022-12-02 22:22:24 [scrapy.middleware] INFO: Enabled downloader middlewares:
['scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware',
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
2022-12-02 22:22:24 [scrapy.middleware] INFO: Enabled spider middlewares:
['scrapy.spidermiddlewares.httperror.HttpErrorMiddleware',
 'scrapy.spidermiddlewares.offsite.OffsiteMiddleware',
 'scrapy.spidermiddlewares.referer.RefererMiddleware',
 'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware',
 'scrapy.spidermiddlewares.depth.DepthMiddleware']
2022-12-02 22:22:25 [scrapy.middleware] INFO: Enabled item pipelines:
[]
2022-12-02 22:22:25 [scrapy.core.engine] INFO: Spider opened
2022-12-02 22:22:25 [scrapy.extensions.logstats] INFO: Crawled 0 pages (at 0 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:25 [scrapy.extensions.telnet] INFO: Telnet console listening on 127.0.0.1:6023
2022-12-02 22:22:26 [scrapy.extensions.logstats] INFO: Crawled 61 pages (at 3660 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:27 [scrapy.extensions.logstats] INFO: Crawled 109 pages (at 2880 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:28 [scrapy.extensions.logstats] INFO: Crawled 157 pages (at 2880 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:29 [scrapy.extensions.logstats] INFO: Crawled 205 pages (at 2880 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:30 [scrapy.extensions.logstats] INFO: Crawled 261 pages (at 3360 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:31 [scrapy.extensions.logstats] INFO: Crawled 293 pages (at 1920 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:32 [scrapy.extensions.logstats] INFO: Crawled 333 pages (at 2400 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:33 [scrapy.extensions.logstats] INFO: Crawled 365 pages (at 1920 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:34 [scrapy.extensions.logstats] INFO: Crawled 413 pages (at 2880 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:35 [scrapy.core.engine] INFO: Closing spider (closespider_timeout)
2022-12-02 22:22:35 [scrapy.extensions.logstats] INFO: Crawled 445 pages (at 1920 pages/min), scraped 0 items (at 0 items/min)
2022-12-02 22:22:36 [scrapy.statscollectors] INFO: Dumping Scrapy stats:
{'downloader/request_bytes': 192019,
 'downloader/request_count': 461,
 'downloader/request_method_count/GET': 461,
 'downloader/response_bytes': 1277946,
 'downloader/response_count': 461,
 'downloader/response_status_count/200': 461,
 'elapsed_time_seconds': 10.698746,
 'finish_reason': 'closespider_timeout',
 'finish_time': datetime.datetime(2022, 12, 2, 14, 22, 36, 32014),
 'log_count/INFO': 20,
 'log_count/WARNING': 1,
 'request_depth_max': 16,
 'response_received_count': 461,
 'scheduler/dequeued': 461,
 'scheduler/dequeued/memory': 461,
 'scheduler/enqueued': 9220,
 'scheduler/enqueued/memory': 9220,
 'start_time': datetime.datetime(2022, 12, 2, 14, 22, 25, 333268)}
2022-12-02 22:22:36 [scrapy.core.engine] INFO: Spider closed (closespider_timeout)
```

#### scrapy fetch(get web page)
```
(myenv10_scrapy) D:\work\git\python_crawler>scrapy fetch https://www.google.com
2022-12-02 22:29:41 [scrapy.utils.log] INFO: Scrapy 2.7.1 started (bot: scrapybot)
2022-12-02 22:29:41 [scrapy.utils.log] INFO: Versions: lxml 4.9.1.0, libxml2 2.9.12, cssselect 1.2.0, parsel 1.7.0, w3lib 2.1.0, Twisted 22.10.0, Python 3.10.8 (tags/v3.10.8:aaaf517, Oct 11 2022, 16:50:30) [MSC v.1933 64 bit (AMD64)], pyOpenSSL 22.1.0 (OpenSSL 3.0.7 1 Nov 2022), cryptography 38.0.4, Platform Windows-10-10.0.19045-SP0
2022-12-02 22:29:41 [scrapy.crawler] INFO: Overridden settings:
{}
2022-12-02 22:29:41 [py.warnings] WARNING: D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\utils\request.py:231: ScrapyDeprecationWarning: '2.6' is a deprecated value for the 'REQUEST_FINGERPRINTER_IMPLEMENTATION' setting.

It is also the default value. In other words, it is normal to get this warning if you have not defined a value for the 'REQUEST_FINGERPRINTER_IMPLEMENTATION' setting. This is so for backward compatibility reasons, but it will change in a future version of Scrapy.

See the documentation of the 'REQUEST_FINGERPRINTER_IMPLEMENTATION' setting for information on how to handle this deprecation.
  return cls(crawler)

......
```

### run scrapy for [worldometers](https://www.worldometers.info/world-population/population-by-country/)

#### create project
```
(myenv10_scrapy) D:\work\git\python_crawler\101-scrapy>scrapy startproject worldmeters
New Scrapy project 'worldmeters', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\git\python_crawler\101-scrapy\worldmeters

You can start your first spider with:
    cd worldmeters
    scrapy genspider example example.com
```

#### create spider
```
# https://www.worldometers.info/world-population/population-by-country/
# default http:, removed "/" (because scrape will auto add)

(myenv10_scrapy) D:\work\git\python_crawler\101-scrapy\worldmeters>scrapy genspider countries www.worldometers.info/world-population/population-by-country
Created spider 'countries' using template 'basic' in module:
  worldmeters.spiders.countries
```

``` py
# worldmeters\worldmeters\spiders\countries.py
import scrapy


class CountriesSpider(scrapy.Spider):
    name = 'countries'
    allowed_domains = ['www.worldometers.info']
		# change http: to https:
    start_urls = ['https://www.worldometers.info/']

    def parse(self, response):
        pass
```

#### scrape shell
```
(myenv10_scrapy) D:\work\git\python_crawler\101-scrapy\worldmeters>scrapy shell
D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\spiderloader.py:37: UserWarning: There are several spiders with the same name:

  CountriesSpider named 'countries' (in worldmeters.spiders.countries - 複製)

  CountriesSpider named 'countries' (in worldmeters.spiders.countries)

  CountriesSpider named 'countries' (in worldmeters.spiders.countries_update)

  This can cause unexpected behavior.
  warnings.warn(
2022-12-03 10:04:03 [scrapy.utils.log] INFO: Scrapy 2.7.1 started (bot: worldmeters)
2022-12-03 10:04:03 [scrapy.utils.log] INFO: Versions: lxml 4.9.1.0, libxml2 2.9.12, cssselect 1.2.0, parsel 1.7.0, w3lib 2.1.0, Twisted 22.10.0, Python 3.10.8 (tags/v3.10.8:aaaf517, Oct 11 2022, 16:50:30) [MSC v.1933 64 bit (AMD64)], pyOpenSSL 22.1.0 (OpenSSL 3.0.7 1 Nov 2022), cryptography 38.0.4, Platform Windows-10-10.0.19045-SP0
2022-12-03 10:04:03 [scrapy.crawler] INFO: Overridden settings:
{'BOT_NAME': 'worldmeters',
 'DUPEFILTER_CLASS': 'scrapy.dupefilters.BaseDupeFilter',
 'LOGSTATS_INTERVAL': 0,
 'NEWSPIDER_MODULE': 'worldmeters.spiders',
 'REQUEST_FINGERPRINTER_IMPLEMENTATION': '2.7',
 'ROBOTSTXT_OBEY': True,
 'SPIDER_MODULES': ['worldmeters.spiders'],
 'TWISTED_REACTOR': 'twisted.internet.asyncioreactor.AsyncioSelectorReactor'}
2022-12-03 10:04:03 [asyncio] DEBUG: Using selector: SelectSelector
2022-12-03 10:04:03 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.asyncioreactor.AsyncioSelectorReactor
2022-12-03 10:04:03 [scrapy.utils.log] DEBUG: Using asyncio event loop: asyncio.windows_events._WindowsSelectorEventLoop
2022-12-03 10:04:03 [scrapy.extensions.telnet] INFO: Telnet Password: 896a4cf5aba51b02
2022-12-03 10:04:03 [scrapy.middleware] INFO: Enabled extensions:
['scrapy.extensions.corestats.CoreStats',
 'scrapy.extensions.telnet.TelnetConsole']
2022-12-03 10:04:04 [scrapy.middleware] INFO: Enabled downloader middlewares:
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
2022-12-03 10:04:04 [scrapy.middleware] INFO: Enabled spider middlewares:
['scrapy.spidermiddlewares.httperror.HttpErrorMiddleware',
 'scrapy.spidermiddlewares.offsite.OffsiteMiddleware',
 'scrapy.spidermiddlewares.referer.RefererMiddleware',
 'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware',
 'scrapy.spidermiddlewares.depth.DepthMiddleware']
2022-12-03 10:04:04 [scrapy.middleware] INFO: Enabled item pipelines:
[]
2022-12-03 10:04:04 [scrapy.extensions.telnet] INFO: Telnet console listening on 127.0.0.1:6023
2022-12-03 10:04:04 [asyncio] DEBUG: Using selector: SelectSelector
[s] Available Scrapy objects:
[s]   scrapy     scrapy module (contains scrapy.Request, scrapy.Selector, etc)
[s]   crawler    <scrapy.crawler.Crawler object at 0x0000029E3EC8F3D0>
[s]   item       {}
[s]   settings   <scrapy.settings.Settings object at 0x0000029E3EC8F430>
[s] Useful shortcuts:
[s]   fetch(url[, redirect=True]) Fetch URL and update local objects (by default, redirects are followed)
[s]   fetch(req)                  Fetch a scrapy.Request and update local objects
[s]   shelp()           Shell help (print this help)
[s]   view(response)    View response in a browser
2022-12-03 10:04:05 [asyncio] DEBUG: Using selector: SelectSelector
In [1]:
```

#### worldometers not support Crawled(no robots.txt)
DEBUG: Crawled (404) <GET https://www.worldometers.info/robots.txt> (referer: None)
```
In [1]: fetch("https://www.worldometers.info/world-population/population-by-cou
   ...: ntry/")
2022-12-03 10:08:03 [scrapy.core.engine] INFO: Spider opened
2022-12-03 10:08:05 [scrapy.core.engine] DEBUG: Crawled (404) <GET https://www.worldometers.info/robots.txt> (referer: None)
2022-12-03 10:08:05 [protego] DEBUG: Rule at line 2 without any user agent to enforce it on.
2022-12-03 10:08:05 [protego] DEBUG: Rule at line 10 without any user agent to enforce it on.
2022-12-03 10:08:05 [protego] DEBUG: Rule at line 12 without any user agent to enforce it on.
2022-12-03 10:08:05 [protego] DEBUG: Rule at line 14 without any user agent to enforce it on.
2022-12-03 10:08:05 [protego] DEBUG: Rule at line 16 without any user agent to enforce it on.
2022-12-03 10:08:05 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/population-by-country/> (referer: None)

In [2]: 2022-12-03 10:08:06 [scrapy.core.scraper] ERROR: Spider error processing <GET https://www.worldometers.info/world-population/population-by-country/> (referer: None)
Traceback (most recent call last):
  File "D:\app\python_env\myenv10_scrapy\lib\site-packages\twisted\internet\defer.py", line 892, in _runCallbacks
    current.result = callback(  # type: ignore[misc]
  File "D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\utils\defer.py", line 285, in f
    return deferred_from_coro(coro_f(*coro_args, **coro_kwargs))
  File "D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\utils\defer.py", line 272, in deferred_from_coro
    event_loop = get_asyncio_event_loop_policy().get_event_loop()
  File "D:\app\Python\Python310\lib\asyncio\events.py", line 656, in get_event_loop
    raise RuntimeError('There is no current event loop in thread %r.'
RuntimeError: There is no current event loop in thread 'Thread-1 (start)'.
2022-12-03 10:08:06 [py.warnings] WARNING: D:\app\python_env\myenv10_scrapy\lib\site-packages\twisted\internet\defer.py:892: RuntimeWarning: coroutine 'SpiderMiddlewareManager.scrape_response.<locals>.process_callback_output' was never awaited
  current.result = callback(  # type: ignore[misc]
```

#### direct get web page
```
In [2]: r = scrapy.Request(url=" https://www.worldometers.info/world-population/population-by-country/")

In [3]: fetch(r)
2022-12-03 20:52:34 [scrapy.downloadermiddlewares.robotstxt] ERROR: Error downloading <GET :///robots.txt>: Unsupported URL scheme '': no handler available for that scheme
Traceback (most recent call last):
  File "D:\app\python_env\myenv10_scrapy\lib\site-packages\twisted\internet\defer.py", line 1693, in _inlineCallbacks
    result = context.run(
  File "D:\app\python_env\myenv10_scrapy\lib\site-packages\twisted\python\failure.py", line 518, in throwExceptionIntoGenerator
    return g.throw(self.type, self.value, self.tb)
  File "D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\core\downloader\middleware.py", line 49, in process_request
    return (yield download_func(request=request, spider=spider))
  File "D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\utils\defer.py", line 72, in mustbe_deferred
    result = f(*args, **kw)
  File "D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\core\downloader\handlers\__init__.py", line 74, in download_request
    raise NotSupported(f"Unsupported URL scheme '{scheme}': {self._notconfigured[scheme]}")
scrapy.exceptions.NotSupported: Unsupported URL scheme '': no handler available for that scheme
---------------------------------------------------------------------------
NotSupported                              Traceback (most recent call last)
NotSupported: Unsupported URL scheme '': no handler available for that scheme

During handling of the above exception, another exception occurred:

NotSupported                              Traceback (most recent call last)
Cell In[3], line 1
----> 1 fetch(r)

File D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\shell.py:110, in Shell.fetch(self, request_or_url, spider, redirect, **kwargs)
    108 response = None
    109 try:
--> 110     response, spider = threads.blockingCallFromThread(
    111         reactor, self._schedule, request, spider)
    112 except IgnoreRequest:
    113     pass

File D:\app\python_env\myenv10_scrapy\lib\site-packages\twisted\internet\threads.py:120, in blockingCallFromThread(reactor, f, *a, **kw)
    118 result = queue.get()
    119 if isinstance(result, failure.Failure):
--> 120     result.raiseException()
    121 return result

File D:\app\python_env\myenv10_scrapy\lib\site-packages\twisted\python\failure.py:504, in Failure.raiseException(self)
    499 def raiseException(self) -> NoReturn:
    500     """
    501     raise the original exception, preserving traceback
    502     information if available.
    503     """
--> 504     raise self.value.with_traceback(self.tb)

NotSupported: Unsupported URL scheme '': no handler available for that scheme
```

#### show body
```
In [5]: response.body
Out[5]: b'\n\n<!DOCTYPE html><!--[if IE 8]> <html lang="en" class="ie8"> <![endif]--><!--[if IE 9]> <html lang="en" class="ie9"> <![endif]--><!--[if !IE]><!--> <html lang="en"> <!--<![endif]--> <head> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Population by Country (2022) - Worldometer</title><meta name="description" content="List of countries and dependencies in the world ranked by population, from the most populated. Growth rate, median age, fertility rate, area, density, population density, urbanization, urban population, share of world population."><!-- Favicon --><link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon"><link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"><link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"><link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"><link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"><link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"><link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"><link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"><link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"><link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"><link rel="icon" 
......
```

#### scrape view
+ ctrl-shift i (run Chrome DevTools)
+ ctrl-shift p (command)
	+ javascript disable
+ ctrl-r (refresh)
```
In [6]: view(response)
Out[6]: True
```

#### XPath expression & CSS selectors
+ ctrl-shift c (inspect)
```
# XPath expression
In [16]: title = response.xpath("//h1")

In [17]: title
Out[17]: [<Selector xpath='//h1' data='<h1>Countries in the world by populat...'>]

In [18]: title = response.xpath("//h1/text()")

In [19]: title
Out[19]: [<Selector xpath='//h1/text()' data='Countries in the world by population ...'>]

In [20]: title.get()
Out[20]: 'Countries in the world by population (2022)'

# CSS selectors
In [22]: title_css = response.css("h1::text")

In [23]: title_css
Out[23]: [<Selector xpath='descendant-or-self::h1/text()' data='Countries in the world by population ...'>]

In [26]: title_css.get()
Out[26]: 'Countries in the world by population (2022)'


# XPath expression
In [30]: countries = response.xpath("//td/a/text()").getall()

In [31]: countries
Out[31]:
['China',
 'India',
 'United States',
 'Indonesia',
 'Pakistan',
 'Brazil',
 'Nigeria',
 ......

 'Holy See']

# CSS selectors
In [34]: countries_css = response.css("td a::text").getall()

In [35]: countries_css
Out[35]:
['China',
 'India',
 'United States',
 'Indonesia',
 'Pakistan',
 'Brazil',
 'Nigeria',
 ......
 
 'Holy See']
```

#### modify worldmeters\worldmeters\spiders\countries.py for XPath expression
``` py
import scrapy

class CountriesSpider(scrapy.Spider):
    name = 'countries'
    allowed_domains = ['www.worldometers.info']
    # start_urls = ['https://www.worldometers.info/']
    start_urls = ['https://www.worldometers.info/world-population/population-by-country/']

    def parse(self, response):
        title = response.xpath("//h1/text()").get()
        countries = response.xpath("//td/a/text()").getall()

        yield {
          'tittle': title,
          'counties': countries
        }
```

#### run scrapy clawer
```
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy crawl countries
2022-12-06 12:03:18 [scrapy.utils.log] INFO: Scrapy 2.7.1 started (bot: worldmeters)
2022-12-06 12:03:18 [scrapy.utils.log] INFO: Versions: lxml 4.9.1.0, libxml2 2.9.12, cssselect 1.2.0, parsel 1.7.0, w3lib 2.1.0, Twisted 22.10.0, Python 3.10.6 (tags/v3.10.6:9c7b4bd, Aug  1 2022, 21:53:49) [MSC v.1932 64 bit (AMD64)], pyOpenSSL 22.1.0 (OpenSSL 3.0.7 1 Nov 2022), cryptography 38.0.4, Platform Windows-10-10.0.19044-SP0
2022-12-06 12:03:18 [scrapy.crawler] INFO: Overridden settings:
{'BOT_NAME': 'worldmeters',
 'NEWSPIDER_MODULE': 'worldmeters.spiders',
 'REQUEST_FINGERPRINTER_IMPLEMENTATION': '2.7',
 'ROBOTSTXT_OBEY': True,
 'SPIDER_MODULES': ['worldmeters.spiders'],
 'TWISTED_REACTOR': 'twisted.internet.asyncioreactor.AsyncioSelectorReactor'}
2022-12-06 12:03:18 [asyncio] DEBUG: Using selector: SelectSelector
2022-12-06 12:03:18 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.asyncioreactor.AsyncioSelectorReactor
2022-12-06 12:03:18 [scrapy.utils.log] DEBUG: Using asyncio event loop: asyncio.windows_events._WindowsSelectorEventLoop
2022-12-06 12:03:18 [scrapy.extensions.telnet] INFO: Telnet Password: 6b21a23169d5dea4
2022-12-06 12:03:18 [scrapy.middleware] INFO: Enabled extensions:
['scrapy.extensions.corestats.CoreStats',
 'scrapy.extensions.telnet.TelnetConsole',
 'scrapy.extensions.logstats.LogStats']
2022-12-06 12:03:18 [scrapy.middleware] INFO: Enabled downloader middlewares:
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
2022-12-06 12:03:18 [scrapy.middleware] INFO: Enabled spider middlewares:
['scrapy.spidermiddlewares.httperror.HttpErrorMiddleware',
 'scrapy.spidermiddlewares.offsite.OffsiteMiddleware',
 'scrapy.spidermiddlewares.referer.RefererMiddleware',
 'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware',
 'scrapy.spidermiddlewares.depth.DepthMiddleware']
2022-12-06 12:03:18 [scrapy.middleware] INFO: Enabled item pipelines:
[]
2022-12-06 12:03:18 [scrapy.core.engine] INFO: Spider opened
2022-12-06 12:03:18 [scrapy.extensions.logstats] INFO: Crawled 0 pages (at 0 pages/min), scraped 0 items (at 0 items/min)
2022-12-06 12:03:18 [scrapy.extensions.telnet] INFO: Telnet console listening on 127.0.0.1:6023
2022-12-06 12:03:19 [scrapy.core.engine] DEBUG: Crawled (404) <GET https://www.worldometers.info/robots.txt> (referer: None)
2022-12-06 12:03:19 [protego] DEBUG: Rule at line 2 without any user agent to enforce it on.
2022-12-06 12:03:19 [protego] DEBUG: Rule at line 10 without any user agent to enforce it on.
2022-12-06 12:03:19 [protego] DEBUG: Rule at line 12 without any user agent to enforce it on.
2022-12-06 12:03:19 [protego] DEBUG: Rule at line 14 without any user agent to enforce it on.
2022-12-06 12:03:19 [protego] DEBUG: Rule at line 16 without any user agent to enforce it on.
2022-12-06 12:03:20 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/population-by-country/> (referer: None)
2022-12-06 12:03:20 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/population-by-country/>
{'tittle': 'Countries in the world by population (2022)', 'counties': ['China', 'India', 'United States', 'Indonesia', 'Pakistan', 'Brazil', 'Nigeria', 'Bangladesh', 'Russia', 'Mexico', 'Japan', 'Ethiopia', 'Philippines', 'Egypt', 'Vietnam', 'DR Congo', 'Turkey', 'Iran', 'Germany', 'Thailand', 'United Kingdom', 'France', 'Italy', 'Tanzania', 'South Africa', 'Myanmar', 'Kenya', 'South Korea', 'Colombia', 'Spain', 'Uganda', 'Argentina', 'Algeria', 'Sudan', 'Ukraine', 'Iraq', 'Afghanistan', 'Poland', 'Canada', 'Morocco', 'Saudi Arabia', 'Uzbekistan', 'Peru', 'Angola', 'Malaysia', 'Mozambique', 'Ghana', 'Yemen', 'Nepal', 'Venezuela', 'Madagascar', 'Cameroon', "Côte d'Ivoire", 'North Korea', 'Australia', 'Niger', 'Taiwan', 'Sri Lanka', 'Burkina Faso', 'Mali', 'Romania', 'Malawi', 'Chile', 'Kazakhstan', 'Zambia', 'Guatemala', 'Ecuador', 'Syria', 'Netherlands', 'Senegal', 'Cambodia', 'Chad', 'Somalia', 'Zimbabwe', 'Guinea', 'Rwanda', 'Benin', 'Burundi', 'Tunisia', 'Bolivia', 'Belgium', 'Haiti', 'Cuba', 'South Sudan', 'Dominican Republic', 'Czech Republic (Czechia)', 'Greece', 'Jordan', 'Portugal', 'Azerbaijan', 'Sweden', 'Honduras', 'United Arab Emirates', 'Hungary', 'Tajikistan', 'Belarus', 'Austria', 'Papua New Guinea', 'Serbia', 'Israel', 'Switzerland', 'Togo', 'Sierra Leone', 'Hong Kong', 'Laos', 'Paraguay', 'Bulgaria', 'Libya', 'Lebanon', 'Nicaragua', 'Kyrgyzstan', 'El Salvador', 'Turkmenistan', 'Singapore', 'Denmark', 'Finland', 'Congo', 'Slovakia', 'Norway', 'Oman', 'State of Palestine', 'Costa Rica', 'Liberia', 'Ireland', 'Central African Republic', 'New Zealand', 'Mauritania', 'Panama', 'Kuwait', 'Croatia', 'Moldova', 'Georgia', 'Eritrea', 'Uruguay', 'Bosnia and Herzegovina', 'Mongolia', 'Armenia', 'Jamaica', 'Qatar', 'Albania', 'Puerto Rico', 'Lithuania', 'Namibia', 'Gambia', 'Botswana', 'Gabon', 'Lesotho', 'North Macedonia', 'Slovenia', 'Guinea-Bissau', 'Latvia', 'Bahrain', 'Equatorial Guinea', 'Trinidad and Tobago', 'Estonia', 'Timor-Leste', 'Mauritius', 'Cyprus', 'Eswatini', 'Djibouti', 'Fiji', 'Réunion', 'Comoros', 'Guyana', 'Bhutan', 'Solomon Islands', 'Macao', 'Montenegro', 'Luxembourg', 'Western Sahara', 'Suriname', 'Cabo Verde', 'Micronesia', 'Maldives', 'Malta', 'Brunei ', 'Guadeloupe', 'Belize', 'Bahamas', 'Martinique', 'Iceland', 'Vanuatu', 'French Guiana', 'Barbados', 'New Caledonia', 'French Polynesia', 'Mayotte', 'Sao Tome & Principe', 'Samoa', 'Saint Lucia', 'Channel Islands', 'Guam', 'Curaçao', 'Kiribati', 'Grenada', 'St. Vincent & Grenadines', 'Aruba', 'Tonga', 'U.S. Virgin Islands', 'Seychelles', 'Antigua and Barbuda', 'Isle of Man', 'Andorra', 'Dominica', 'Cayman Islands', 'Bermuda', 'Marshall Islands', 'Northern Mariana Islands', 'Greenland', 'American Samoa', 'Saint Kitts & Nevis', 'Faeroe Islands', 'Sint Maarten', 'Monaco', 'Turks and Caicos', 'Saint Martin', 'Liechtenstein', 'San Marino', 'Gibraltar', 'British Virgin Islands', 'Caribbean Netherlands', 'Palau', 'Cook Islands', 'Anguilla', 'Tuvalu', 'Wallis & Futuna', 'Nauru', 'Saint Barthelemy', 'Saint Helena', 'Saint Pierre & Miquelon', 'Montserrat', 'Falkland Islands', 'Niue', 'Tokelau', 'Holy See']}
2022-12-06 12:03:20 [scrapy.core.engine] INFO: Closing spider (finished)
2022-12-06 12:03:20 [scrapy.statscollectors] INFO: Dumping Scrapy stats:
{'downloader/request_bytes': 491,
 'downloader/request_count': 2,
 'downloader/request_method_count/GET': 2,
 'downloader/response_bytes': 18989,
 'downloader/response_count': 2,
 'downloader/response_status_count/200': 1,
 'downloader/response_status_count/404': 1,
 'elapsed_time_seconds': 1.387354,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2022, 12, 6, 4, 3, 20, 290084),
 'httpcompression/response_bytes': 96257,
 'httpcompression/response_count': 2,
 'item_scraped_count': 1,
 'log_count/DEBUG': 11,
 'log_count/INFO': 10,
 'response_received_count': 2,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/404': 1,
 'scheduler/dequeued': 1,
 'scheduler/dequeued/memory': 1,
 'scheduler/enqueued': 1,
 'scheduler/enqueued/memory': 1,
 'start_time': datetime.datetime(2022, 12, 6, 4, 3, 18, 902730)}
2022-12-06 12:03:20 [scrapy.core.engine] INFO: Spider closed (finished)
```
