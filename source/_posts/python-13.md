---
title: python Selenium Example
abbrlink: e93
date: 2022-12-24 19:34:17
categories: Coding
tags:
	- python
---

### livecoin
#### coin_selenium.py

<!--more-->

``` py
import scrapy
from scrapy.selector import Selector
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time


class CoinSpiderSeleniunm(scrapy.Spider):
    name = 'coin_selenium'
    allowed_domains = ['web.archive.org']
    start_urls = ['https://web.archive.org/web/20200116052415/https://www.livecoin.net/en']

    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        # add argument headless - no open browser
        options.add_argument('--headless')

        # change executable_path to service
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        # set windows size(width, height)
        driver.set_window_size(1920, 1080)
        driver.get("https://web.archive.org/web/20200116052415/https://www.livecoin.net/en")

        print("=======================")
        # get by class then click - not ok
        # rur_tab_class = driver.find_element(By.CLASS_NAME, "filterPanelItem___2z5Gb ")
        # rur_tab_class[4].click()

        # get by xpath then click - ok
        rur_tab = driver.find_element(By.XPATH,"//div[@class='filterPanelItem___2z5Gb '][4]")

        # add deleay, then click ok
        time.sleep(5)

        # print("=======================")
        # print(rur_tab)
        # print(rur_tab.text)
        print("=======================")
        # get by xpath then click - ok
        rur_tab.click()
        print("=======================")

        # time.sleep(200)

        self.html = driver.page_source
        driver.close()

    def parse(self, response):
        resp = Selector(text=self.html)

        # print(resp)
        for currency in resp.xpath("//div[contains(@class,'ReactVirtualized__Table__row tableRow___3EtiS ')]"):
            yield {
                'currency pair': currency.xpath(".//div[1]/div/text()").get(),
                'volume(24h)': currency.xpath(".//div[2]/span/text()").get()
            }
```


#### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash\livecoin>scrapy crawl coin_selenium -o coin_selenium.json
......
{'downloader/request_bytes': 979,
 'downloader/request_count': 3,
 'downloader/request_method_count/GET': 3,
 'downloader/response_bytes': 98326,
 'downloader/response_count': 3,
 'downloader/response_status_count/200': 1,
 'downloader/response_status_count/302': 1,
 'downloader/response_status_count/404': 1,
 'elapsed_time_seconds': 1.858024,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2022, 12, 26, 2, 43, 6, 510084),
 'httpcompression/response_bytes': 417920,
 'httpcompression/response_count': 1,
 # item_scraped_count
 'item_scraped_count': 28,
 'log_count/DEBUG': 66,
 'log_count/INFO': 13,
 'response_received_count': 2,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/404': 1,
 'scheduler/dequeued': 2,
 'scheduler/dequeued/memory': 2,
 'scheduler/enqueued': 2,
 'scheduler/enqueued/memory': 2,
 'start_time': datetime.datetime(2022, 12, 26, 2, 43, 4, 652060)}
2022-12-26 10:43:06 [scrapy.core.engine] INFO: Spider closed (finished)
```

#### json
``` json
[
    {
        "currency pair": "BTC/RUR",
        "volume(24h)": "11 664 872.72 RUR"
    },
    {
        "currency pair": "ETH/RUR",
        "volume(24h)": "1 520 135.17 RUR"
    },
......
    {
        "currency pair": "MNC/RUR",
        "volume(24h)": "0.00 RUR"
    },
    {
        "currency pair": "LKE/RUR",
        "volume(24h)": "0.00 RUR"
    }
]
```




