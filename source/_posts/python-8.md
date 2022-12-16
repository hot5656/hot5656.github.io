---
title: Python Scrapy Example
abbrlink: d5e4
date: 2022-12-04 21:06:54
categories: Coding
tags:
	- python
---

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

<!--more-->

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
    start_urls = ['https://www.worldometers.info']

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
    start_urls = ['https://www.worldometers.info/world-population/population-by-country']

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

### [Worldometers](https://www.worldometers.info/world-population/population-by-country/) Get Countries Population
#### Get country name and link
##### try xpath
```
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy shell "https://www.worldometers.info/world-population/population-by-country/"
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

##### countries.py
```py
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

          yield {
            'country_name': name,
            'country_link': link
          }
```

##### run
```
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy crawl countries
2022-12-09 13:54:27 [scrapy.utils.log] INFO: Scrapy 2.7.1 started (bot: worldmeters)
......
2022-12-09 13:54:28 [protego] DEBUG: Rule at line 16 without any user agent to enforce it on.
2022-12-09 13:54:29 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/population-by-country/> (referer: None)
2022-12-09 13:54:29 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/population-by-country/>
{'country_name': 'China', 'country_link': '/world-population/china-population/'}
2022-12-09 13:54:29 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/population-by-country/>
{'country_name': 'India', 'country_link': '/world-population/india-population/'}
2022-12-09 13:54:29 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/population-by-country/>
{'country_name': 'United States', 'country_link': '/world-population/us-population/'}
......
2022-12-09 13:54:29 [scrapy.core.engine] INFO: Spider closed (finished)
```

#### fetch country link page
##### countries.py
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
          yield response.follow(url=link)
```

##### run
```
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy crawl countries
2022-12-09 14:17:54 [scrapy.utils.log] INFO: Scrapy 2.7.1 started (bot: worldmeters)
2022-12-09 14:17:54 [scrapy.utils.log] INFO: Versions: lxml 4.9.1.0, libxml2 2.9.12, cssselect 1.2.0, parsel 1.7.0, w3lib 2.1.0, Twisted 22.10.0, Python 3.10.6 (tags/v3.10.6:9c7b4bd, Aug  1 2022, 21:53:49) [MSC v.1932 64 bit (AMD64)], pyOpenSSL 22.1.0 (OpenSSL 3.0.7 1 Nov 2022), cryptography 38.0.4, Platform Windows-10-10.0.19044-SP0
2022-12-09 14:17:54 [scrapy.crawler] INFO: Overridden settings:
......
2022-12-09 14:17:55 [protego] DEBUG: Rule at line 16 without any user agent to enforce it on.
2022-12-09 14:17:56 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/population-by-country/> (referer: None)
2022-12-09 14:17:56 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/iran-population/> (referer: https://www.worldometers.info/world-population/population-by-country/)
2022-12-09 14:17:57 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.worldometers.info/world-population/mexico-population/> (referer: https://www.worldometers.info/world-population/population-by-country/)
......
 'scheduler/dequeued/memory': 236,
 'scheduler/enqueued': 236,
 'scheduler/enqueued/memory': 236,
 'start_time': datetime.datetime(2022, 12, 9, 6, 17, 55, 174514)}
2022-12-09 14:18:05 [scrapy.core.engine] INFO: Spider closed (shutdown)
```

#### get country's year and population
##### countries.py
``` py
import scrapy
import logging

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
      yield response.follow(url=link, callback=self.parse_country)

  def parse_country(self, response):
    # show log
    # logging.info(response.url)
    rows = response.xpath("(//table[@class='table table-striped table-bordered table-hover table-condensed table-list'])[1]/tbody/tr")
    for row in rows:
      year = row.xpath("./td[1]/text()").get()
      population = row.xpath("./td[2]/strong/text()").get()
      yield {
        'year' : year,
        'population': population
      }
```

##### run
```
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy crawl countries
2022-12-09 17:07:25 [scrapy.utils.log] INFO: Scrapy 2.7.1 started (bot: worldmeters)
......
2022-12-09 17:07:27 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/philippines-population/>
{'year': '2020', 'population': '109,581,078'}
2022-12-09 17:07:27 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/philippines-population/>
{'year': '2019', 'population': '108,116,615'}
2022-12-09 17:07:27 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/philippines-population/>
{'year': '2018', 'population': '106,651,394'}
......
```

#### class use global variable for country name(not work ...)
##### countries.py
``` py
import scrapy
import logging

class CountriesSpider(scrapy.Spider):
  name = 'countries'
  allowed_domains = ['www.worldometers.info']
  # start_urls = ['https://www.worldometers.info/']
  start_urls = ['https://www.worldometers.info/world-population/population-by-country']
  country_name = ''

  def parse(self, response):
    countries = response.xpath("//td/a")
    for country in countries:
      name = country.xpath(".//text()").get()
      link = country.xpath(".//@href").get()

      # class use global variable for country name
      self.country_name = name

      # absolute url
      # absolute_url = f'https://www.worldometers.info{link}'
      # absolute_url = response.urljoin(link)
      # yield scrapy.Request(url=absolute_url)

      # relative url
      yield response.follow(url=link, callback=self.parse_country)

  def parse_country(self, response):
    # show log
    # logging.info(response.url)
    rows = response.xpath("(//table[@class='table table-striped table-bordered table-hover table-condensed table-list'])[1]/tbody/tr")
    for row in rows:
      year = row.xpath("./td[1]/text()").get()
      population = row.xpath("./td[2]/strong/text()").get()
      yield {
        'name' : self.country_name,
        'year' : year,
        'population': population
      }
```

##### run
```
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy crawl countries
......
2022-12-12 15:17:38 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/china-population/>
{'name': 'Denmark', 'year': '2020', 'population': '1,439,323,776'}
2022-12-12 15:17:38 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/china-population/>
{'name': 'Norway', 'year': '2019', 'population': '1,433,783,686'}
2022-12-12 15:17:38 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/china-population/>
{'name': 'Norway', 'year': '2018', 'population': '1,427,647,786'}
......
```

#### add meta for callback parameter
##### countries.py
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

##### run
```
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy crawl countries
......
2022-12-12 15:25:10 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/uk-population/>
{'country_name': 'United Kingdom', 'year': '2020', 'population': '67,886,011'}
2022-12-12 15:25:10 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/uk-population/>
{'country_name': 'United Kingdom', 'year': '2019', 'population': '67,530,172'}
2022-12-12 15:25:10 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.worldometers.info/world-population/uk-population/>
{'country_name': 'United Kingdom', 'year': '2018', 'population': '67,141,684'}
......
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

``` json
[
{"country_name": "China", "year": "2020", "population": "1,439,323,776"},
{"country_name": "China", "year": "2019", "population": "1,433,783,686"},
{"country_name": "China", "year": "2018", "population": "1,427,647,786"},
{"country_name": "China", "year": "2017", "population": "1,421,021,791"},
......
{"country_name": "India", "year": "1960", "population": "450,547,679"},
{"country_name": "India", "year": "1955", "population": "409,880,595"}
]
```

``` csv
country_name,year,population
China,2020,"1,439,323,776"
China,2019,"1,433,783,686"
China,2018,"1,427,647,786"
......
DR Congo,1965,"17,369,883"
DR Congo,1960,"15,248,251"
DR Congo,1955,"13,517,513"
```

``` xml
<?xml version="1.0" encoding="utf-8"?>
<items>
<item><country_name>China</country_name><year>2020</year><population>1,439,323,776</population></item>
<item><country_name>China</country_name><year>2019</year><population>1,433,783,686</population></item>
......
<item><country_name>Philippines</country_name><year>1960</year><population>26,269,734</population></item>
<item><country_name>Philippines</country_name><year>1955</year><population>22,177,058</population></item>
</items>
```

### [Debt to GDP ratio by country](http://worldpopulationreview.com/countries/countries-by-national-debt/)
#### create spider
```
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\worldmeters>scrapy genspider gdp_debt worldpopulationreview.com/countries/countries-by-national-debt
Created spider 'gdp_debt' using template 'basic' in module:
  worldmeters.spiders.gdp_debt
```

#### countries.py
``` py
import scrapy


class GdpDebtSpider(scrapy.Spider):
    name = 'gdp_debt'
    allowed_domains = ['worldpopulationreview.com']
    # start_urls = ['http://worldpopulationreview.com/']
    start_urls = ['https://worldpopulationreview.com/country-rankings/countries-by-national-debt']

    def parse(self, response):
        rows = response.xpath("//tbody/tr")
        for row in rows:
            name = row.xpath("./td[1]/a/text()").get()
            debt_rate = row.xpath("./td[2]/text()").get()

            yield {
                'country_name' : name,
                'debt_rate' : debt_rate
            }
```

#### run(wait new method)
<font color=red>
	Cannot get table "Debt to GDP Ratio by Country" : the web site reason(data generate by JavaScript)
</font>

###  [tinydeal](https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html)

#### open robots.txt
search page name, if not found mean not restriction for scrape
```
User-agent: *
Allow: /*main_page=top_brands 
Allow: /*main_page=ws_search_result
Allow: /*index.php?main_page=zone_2dollars
Disallow: /*main_page=*
Disallow: /bg/
Disallow: /cs/
Disallow: /da/
Disallow: /el/
Disallow: /fi/
Disallow: /hu/
Disallow: /hr/
Disallow: /lt/
Disallow: /no/
Disallow: /pl/
Disallow: /ro/
Disallow: /sk/
Disallow: /sl/
Disallow: /sv/
Disallow: /tr/
Disallow: /ja/
Disallow: /jp/
Disallow: /ko/
Disallow: /wordpress/
Disallow: /new/
Disallow: /*/includes/
Disallow: /shop/products/
Disallow: /index.php/*-si-*.html
Disallow: /*-c-*-pg-1.html
Disallow: */buy/*surl=
Disallow: */buy/*-c-
Disallow: /*pagesize=
Disallow: /*sk=
Disallow: /*?dp=
Disallow: /*fb_comment_id=
Disallow: /*reviews_id=
Disallow: /*gotowhere
Disallow: /*/cheap-product
Disallow: /es/compra*-t-*
Disallow: /pt/compra*-t-*
Disallow: /fr/bon*-t-*
Disallow: /de/kaufen*-t-*
Disallow: /it/economico*-t-*
Disallow: /ru/Купи*-t-*
Disallow: /nl/*goedkoop*-t-*
Disallow: /ar/بالأسعار-المعقولة*-t-*
Disallow: /*is_input=


User-agent: Yandex
Allow: /*main_page=top_brands 
Allow: /*main_page=ws_search_result
Allow: /*index.php?main_page=zone_2dollars
Disallow: /*main_page=*
Disallow: /es/
Disallow: /it/
Disallow: /pt/
Disallow: /fr/
Disallow: /de/
Disallow: /ar/
Disallow: /bg/
Disallow: /cs/
Disallow: /da/
Disallow: /el/
Disallow: /fi/
Disallow: /hu/
Disallow: /hr/
Disallow: /lt/
Disallow: /nl/
Disallow: /no/
Disallow: /pl/
Disallow: /ro/
Disallow: /sk/
Disallow: /sl/
Disallow: /sv/
Disallow: /tr/
Disallow: /ja/
Disallow: /jp/
Disallow: /ko/
Disallow: /wordpress/
Disallow: /customers_photo/
Disallow: /new/
Disallow: /*/includes/
Disallow: /shop/products/
Disallow: /index.php/*-si-*.html
Disallow: /*-c-*-pg-1.html
Disallow: */buy/*surl=
Disallow: */buy/*-c-
Disallow: /*pagesize=
Disallow: /*sk=
Disallow: /*?dp=
Disallow: /*fb_comment_id=
Disallow: /*reviews_id=
Disallow: /*gotowhere
Disallow: /*/cheap-product
Disallow: /es/compra*-t-*
Disallow: /pt/compra*-t-*
Disallow: /fr/bon*-t-*
Disallow: /de/kaufen*-t-*
Disallow: /it/economico*-t-*
Disallow: /ru/Купи*-t-*
Disallow: /nl/*goedkoop*-t-*
Disallow: /ar/بالأسعار-المعقولة*-t-*
Disallow: /*is_input=

User-Agent: Baiduspider
Disallow: /
User-Agent: 360Spider
Disallow: /
User-Agent: Sogouspider
Disallow: /
User-Agent: Sosospider
Disallow: /
User-agent: YoudaoBot
Disallow: /
User-agent: magpie-crawler
Disallow: /

User-agent: AdsBot-Google
Disallow:
User-agent: Googlebot-Image
Disallow:

Sitemap: http://www.tinydeal.com/sitemap.xml
```


```
https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html
```

#### open web site then disable Javascript
+ open Chrome devtools
+ run command : Disable JavaScript
+ refresh web page

#### create project and spider
```
myenv10_scrapy) D:\work\run\python_crawler\101-scrapy>scrapy startproject tinydeal
New Scrapy project 'tinydeal', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\101-scrapy\tinydeal

You can start your first spider with:
    cd tinydeal
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy>cd tinydeal

(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\tinydeal>scrapy genspider special_offers https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html
Created spider 'special_offers' using template 'basic' in module:
  tinydeal.spiders.special_offers
```

#### update special_offers.py
``` py
import scrapy

class SpecialOffersSpider(scrapy.Spider):
    name = 'special_offers'
    allowed_domains = ['web.archive.org']
    # start_urls = ['http://web.archive.org/']
    # change web site
    start_urls = ['https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html']

    def parse(self, response):
        pass
```

#### update special_offers.py (get product information)
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

#### run 
```
scrapy crawl special_offers  -o dataset.json
```

#### settings.py - change json for utf-8 format(no show unicode)
``` py
# set JSON utf-8 format
FEED_EXPORT_ENCODING = 'utf-8'
```

``` bash
[
  {
    "title": "SanDisk A1 32GB UHS-I / Class 10 up to 98MB / s Micro SDHC Memory Card\u00a0EFM-530161",
    "url": "https://web.archive.org/web/20190225123327/https:/www.tinydeal.com/sandisk-a1-32gb-uhs-i-class-10-up-to-98mb-s-micro-sdhc-memory-card-p-165914.html",
    "discounted_price": "$6.72",
    "original_price": "$12.09 "
  },
  {
    "title": "18g Super Strong Sealant Fix Metal Adhesive Sealing Glue Bond\u00a0HHI-557389",
    "url": "https://web.archive.org/web/20190225123327/https:/www.tinydeal.com/18g-super-strong-sealant-fix-metal-adhesive-sealing-glue-bond-p-177571.html",
    "discounted_price": "$1.40",
    "original_price": "$3.76 "
  },


# set FEED_EXPORT_ENCODING = 'utf-8'
[
  {
    "title": "SanDisk A1 32GB UHS-I / Class 10 up to 98MB / s Micro SDHC Memory Card EFM-530161",
    "url": "https://web.archive.org/web/20190225123327/https:/www.tinydeal.com/sandisk-a1-32gb-uhs-i-class-10-up-to-98mb-s-micro-sdhc-memory-card-p-165914.html",
    "discounted_price": "$6.72",
    "original_price": "$12.09 "
  },
  {
    "title": "18g Super Strong Sealant Fix Metal Adhesive Sealing Glue Bond HHI-557389",
    "url": "https://web.archive.org/web/20190225123327/https:/www.tinydeal.com/18g-super-strong-sealant-fix-metal-adhesive-sealing-glue-bond-p-177571.html",
    "discounted_price": "$1.40",
    "original_price": "$3.76 "
  },
```

#### special_offers.py - dealing with pagination(csv)
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

``` bash
# only get until page 9
scrapy crawl special_offers -o dataset.csv
......
{'downloader/request_bytes': 7557,
 'downloader/request_count': 19,
 'downloader/request_method_count/GET': 19,
 'downloader/response_bytes': 541040,
 'downloader/response_count': 19,
 'downloader/response_status_count/200': 9,
 'downloader/response_status_count/302': 9,
 'downloader/response_status_count/404': 1,
 'elapsed_time_seconds': 7.098086,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2022, 12, 14, 6, 8, 40, 825326),
 'httpcompression/response_bytes': 3199518,
 'httpcompression/response_count': 9,
 'item_scraped_count': 495,
 'log_count/DEBUG': 517,
 'log_count/INFO': 10,
 'request_depth_max': 8,
 'response_received_count': 10,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/404': 1,
 'scheduler/dequeued': 18,
 'scheduler/dequeued/memory': 18,
 'scheduler/enqueued': 18,
 'scheduler/enqueued/memory': 18,
 'start_time': datetime.datetime(2022, 12, 14, 6, 8, 33, 727240)}
2022-12-14 14:08:40 [scrapy.core.engine] INFO: Spider closed (finished)

(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\tinydeal>
```

#### change User-Agent

##### check scrapy heads
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\tinydeal>scrapy shell "https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html"
......
2022-12-14 14:19:55 [asyncio] DEBUG: Using selector: SelectSelector
# show the flow
[s] Available Scrapy objects:
[s]   scrapy     scrapy module (contains scrapy.Request, scrapy.Selector, etc)
[s]   crawler    <scrapy.crawler.Crawler object at 0x00000265CAFC3850>
[s]   item       {}
[s]   request    <GET https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html>
[s]   response   <200 https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html>
[s]   settings   <scrapy.settings.Settings object at 0x00000265CAFC37F0>
[s]   spider     <SpecialOffersSpider 'special_offers' at 0x265cb41db70>
[s] Useful shortcuts:
[s]   fetch(url[, redirect=True]) Fetch URL and update local objects (by default, redirects are followed)
[s]   fetch(req)                  Fetch a scrapy.Request and update local objects
[s]   shelp()           Shell help (print this help)
[s]   view(response)    View response in a browser
2022-12-14 14:19:56 [asyncio] DEBUG: Using selector: SelectSelector
# request header
In [1]: request.headers
Out[1]:
{b'Accept': b'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
 b'Accept-Language': b'en',
 b'User-Agent': b'Scrapy/2.7.1 (+https://scrapy.org)',
 b'Accept-Encoding': b'gzip, deflate'}

# response request headers
In [3]: response.request.headers
Out[3]:
{b'Accept': b'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
 b'Accept-Language': b'en',
 b'User-Agent': b'Scrapy/2.7.1 (+https://scrapy.org)',
 b'Accept-Encoding': b'gzip, deflate'}

In [4]:
```

##### check browser user agent
<div style="max-width:1000px">
	{% asset_img pic1.png pic1 %}
</div>

##### change User-Agent by settings.py(2 ways option)
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

##### change User-Agent by .py
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

``` bash
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\tinydeal>scrapy crawl special_offers
......
2022-12-14 15:20:51 [scrapy.core.scraper] DEBUG: Scraped from <200 https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html>
{'title': '18g Super Strong Sealant Fix Metal Adhesive Sealing Glue Bond\xa0HHI-557389', 'url': 'https://web.archive.org/web/20190225123327/https:/www.tinydeal.com/18g-super-strong-sealant-fix-metal-adhesive-sealing-glue-bond-p-177571.html', 'discounted_price': '$1.40', 'original_price': '$3.76 ', 'User-Agent': b'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'}
2022-12-14 15:20:51 [scrapy.core.scraper] DEBUG: Scraped from <200 https://web.archive.org/web/20190225123327/https://www.tinydeal.com/specials.html>
{'title': '64GB USB 2.0 Flash Drive USB Pen Drive U Disk\xa0EFM-561923', 'url': 'https://web.archive.org/web/20190225123327/https:/www.tinydeal.com/64gb-usb-20-flash-drive-usb-pen-drive-u-disk-p-178875.html', 'discounted_price': '$6.42', 'original_price': '$19.08 ', 'User-Agent': b'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'}
```

### glassesshop

#### create project and spider
``` bash
myenv10_scrapy) D:\work\run\python_crawler\101-scrapy>scrapy startproject glassesshop
New Scrapy project 'glassesshop', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\101-scrapy\glassesshop

You can start your first spider with:
    cd glassesshop
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy>cd glassesshop
(myenv10_scrapy) D:\work\run\python_crawler\101-scrapy\glassesshop>scrapy genspider products https://www.glassesshop.com/bestsellers
Created spider 'products' using template 'basic' in module:
  glassesshop.spiders.products
```

#### https://www.glassesshop.com/robots.txt

```
User-agent: *
Disallow: /login/
Disallow: /register/
Disallow: /promotion/
Disallow: /cart/
Disallow: /lens?*
Disallow: /lens/new?*
Disallow: *?currency*
Disallow: *?source*
Disallow: *?sort*
Disallow: *?utm_source*
Disallow: *&currency*
Disallow: *?referer*
Disallow: *?PageSpeed*

Sitemap: https://www.glassesshop.com/sitemap.xml
```

#### products.py
```py
import scrapy


class ProductsSpider(scrapy.Spider):
    name = 'products'
    allowed_domains = ['www.glassesshop.com']
    start_urls = ['https://www.glassesshop.com/bestsellers']
    page_index = 1

    def parse(self, response):
        for product in response.xpath('//div[@class="col-12 pb-5 mb-lg-3 col-lg-4 product-list-row text-center product-list-item"]'):
            yield {
                'product_name': product.xpath('.//div[@class="p-title"]/a/text()').get().strip(),
                'product_price': product.xpath('.//div[@class="p-price"]/div/span/text()').get(),
                'product_url': product.xpath('.//div[@class="product-img-outer"]/a/@href').getall(),
                'product_image': product.xpath('.//img[@class="lazy d-block w-100 product-img-default"]/@data-src').get().split('?')[0],
                'page_number': self.page_index
            }

        self.page_index += 1
        next_page = response.xpath('//a[@class="page-link"][@rel="next"]/@href').get()
        if next_page:
            yield {
                'link' : next_page
            }
            yield scrapy.Request(url=next_page, callback=self.parse)
```

#### run
```
scrapy crawl products -o products.json
```

#### json
``` json
[
    {
        "product_name": "Union",
        "product_price": "$35.95",
        "product_url": [
            "https://www.glassesshop.com/eyeglasses/fz1750",
            "https://www.glassesshop.com/eyeglasses/fz1733",
            "https://www.glassesshop.com/eyeglasses/fz1731"
        ],
        "product_image": "https://res.glassesshop.com/products/202108/610a547c82bdc.jpg",
        "page_number": 1
    },
    {
        "product_name": "Placerville",
        "product_price": "$14.98",
        "product_url": [
            "https://www.glassesshop.com/eyeglasses/fz2025",
            "https://www.glassesshop.com/eyeglasses/fz2022",
            "https://www.glassesshop.com/eyeglasses/fz2023",
            "https://www.glassesshop.com/eyeglasses/fz2024"
        ],
        "product_image": "https://res.glassesshop.com/products/202209/63292118e1589.jpg",
        "page_number": 1
    },
		......
    {
        "product_name": "Cloud",
        "product_price": "$45.95",
        "product_url": [
            "https://www.glassesshop.com/eyeglasses/sup1238",
            "https://www.glassesshop.com/eyeglasses/sup1239",
            "https://www.glassesshop.com/eyeglasses/sup1240"
        ],
        "product_image": "https://res.glassesshop.com/products/202109/613efbdd8b577.jpg",
        "page_number": 4
    }
]
```
