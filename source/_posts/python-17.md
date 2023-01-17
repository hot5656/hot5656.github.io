---
title: Python Scrapy Issue
abbrlink: cd92
date: 2023-01-16 09:41:39
categories: Coding
tags:
	- python
	- issue
---

### reactor AsyncioSelectorReactor issue
Exception: The installed reactor (twisted.internet.selectreactor.SelectReactor) does not match the requested one (twisted.internet.asyncioreactor.AsyncioSelectorReactor)

<!--more-->

``` py
from scrapy.utils.reactor import install_reactor
# need put in front of "from twisted.internet import reactor"
install_reactor('twisted.internet.asyncioreactor.AsyncioSelectorReactor')
from twisted.internet import reactor
```

### next page return code 400 [foootbal](https://foootball.cc/)
+ Try method 
	+ add headers (not ok)
	+ next page add delay(not ok) 
+ fix by : splash

``` bash
(myenv10_scrapy) D:\work\run\python_crawler\109-scrapy-practice2\foootball>scrapy crawl news
......
=========================
# return code 400
--https://foootball.cc?page=2--
2023-01-17 09:15:56 [scrapy.core.engine] DEBUG: Crawled (400) <GET https://foootball.cc?page=2> (referer: https://foootball.cc)
2023-01-17 09:15:56 [scrapy.spidermiddlewares.httperror] INFO: Ignoring response <400 https://foootball.cc?page=2>: HTTP status code is not handled or not allowed
......
```
