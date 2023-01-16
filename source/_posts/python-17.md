---
title: Python Scrapy Issue
abbrlink: cd92
date: 2023-01-16 09:41:39
categories: Coding
tags:
	- python
	- issue
---

### rector AsyncioSelectorReactor issue
Exception: The installed reactor (twisted.internet.selectreactor.SelectReactor) does not match the requested one (twisted.internet.asyncioreactor.AsyncioSelectorReactor)

<!--more-->

``` py
from scrapy.utils.reactor import install_reactor
# need put in front of "from twisted.internet import reactor"
install_reactor('twisted.internet.asyncioreactor.AsyncioSelectorReactor')
from twisted.internet import reactor
```
