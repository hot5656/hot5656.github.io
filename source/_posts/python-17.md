---
title: Python Scrapy Issue(爬蟲框架)
abbrlink: cd92
date: 2023-01-16 09:41:39
categories: Coding
tags:
	- python
	- issue
	- crawling
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

### Lua error: [string "function main(splash, args) ..."]:2: network3
+ remove assert : 其實還是錯,只是未被中斷
+ splash 關掉再開可解決

``` lua
function main(splash, args)
  assert(splash:go(args.url))
  assert(splash:wait(0.5))
  return {
    html = splash:html(),
    png = splash:png(),
    har = splash:har(),
  }
end
```

``` lua
-- remove assert ok --
function main(splash, args)
  splash:go(args.url)
  splash:wait(0.5)
  return {
    html = splash:html(),
    png = splash:png(),
    har = splash:har(),
  }
end
```

Ref
+ [How to get more information about a 400 ScriptError](https://github.com/scrapinghub/splash/issues/874)
