---
title:  Python ScrapyRT 說明
abbrlink: c13
date: 2023-01-10 14:14:20
categories: Coding
tags:
	- python
---

### 說明

<!--more-->

### command
#### install
```` bash
pip install scrapyrt
```

#### run
``` bash
# run (need in scrapy project)
# force port : scrapyrt -p 5000
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\steam>scrapyrt
2023-01-10 16:21:47+0800 [-] Log opened.
2023-01-10 16:21:47+0800 [-] Site starting on 9080
2023-01-10 16:21:47+0800 [-] Starting factory <twisted.web.server.Site object at 0x000002329296FEB0>
2023-01-10 16:21:47+0800 [-] Running with reactor: AsyncioSelectorReactor.
start=0, total_count=2446
2 ==================
next offset_index=50
==================
start=50, total_count=2446
2023-01-10 16:51:08+0800 [-] "127.0.0.1" - - [10/Jan/2023:08:51:07 +0000] "GET /crawl.json?start_requests=true&spider_name=more_best HTTP/1.1" 200 46280 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
==================
start=0, total_count=2446
2 ==================
next offset_index=50
==================
start=50, total_count=2446
2023-01-10 16:51:19+0800 [-] "127.0.0.1" - - [10/Jan/2023:08:51:18 +0000] "GET /crawl.json?start_requests=true&spider_name=more_best HTTP/1.1" 200 46280 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
````

#### run chrome
http://localhost:9080

<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>

#### run chrome - trigger spider more_best
http://localhost:9080/crawl.json?start_requests=true&spider_name=more_best

<div style="max-width:700px">
	{% asset_img pic2.png pic2 %}
</div>


``` bash
(myenv10_scrapy) D:\work\run\python_crawler\109-scrapyrt>scrapy startproject first
New Scrapy project 'first', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\109-scrapyrt\first
You can start your first spider with:
    cd first
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\109-scrapyrt>cd first
(myenv10_scrapy) D:\work\run\python_crawler\109-scrapyrt\first>

(myenv10_scrapy) D:\work\run\python_crawler\109-scrapyrt\first>scrapyrt
2023-01-10 14:26:03+0800 [-] Log opened.
2023-01-10 14:26:03+0800 [-] Site starting on 9080
2023-01-10 14:26:03+0800 [-] Starting factory <twisted.web.server.Site object at 0x00000222CB21FFA0>
2023-01-10 14:26:03+0800 [-] Running with reactor: AsyncioSelectorReactor.
```


Ref
+ [ScrapyRT](https://github.com/scrapinghub/scrapyrt)