---
title:  python Selenium 說明
abbrlink: ce52
date: 2022-12-24 19:33:33
categories: Coding
tags:
	- python
---

### Command
#### install selenium
``` bash 
pip install selenium
```

#### install webdriver_manager
```
pip install webdriver_manager
```

#### install scrapy-selenium
```
pip install scrapy-selenium
```
<!--more-->

#### download browser driver(check same as currenct use)
+ [Chrome driver](https://sites.google.com/chromium.org/driver/downloads) 

### Coding
#### selenium run by python
##### basic run selenium
###### copy chromedriver.exe to /app/ChromeDrive

###### basics.py
``` py
from selenium import webdriver

driver = webdriver.Chrome(executable_path="/app/ChromeDrive/chromedriver.exe")
driver.get("https://duckduckgo.com")
```

###### run 
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\selenium_basics>python basics.py
D:\work\run\python_crawler\107-selenium\selenium_basics\basics.py:3: DeprecationWarning: executable_path has been deprecated, please pass in a Service object
  driver = webdriver.Chrome(executable_path="/app/ChromeDrive/chromedriver.exe")
DevTools listening on ws://127.0.0.1:58048/devtools/browser/b34c4e48-a418-445e-8446-c541a8db145d

(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\selenium_basics>
```

<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>


##### executable_path by which or run current Chrome
###### basics.py
``` py
from selenium import webdriver
import time
from shutil import which


# 出現以下錯誤, 增加 options mask
# [15856:11828:1225/110356.222:ERROR:device_event_log_impl.cc(215)]
# [11:03:56.222] USB: usb_device_handle_win.cc:1045 Failed to read descriptor from node connection: 連結到系統的某個裝置失去作用。 (0x1F)
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])

# use which find "chromedriver.exe"
# need copy "chromedriver.exe" to PATH directory : I copy to C:\Windows\System32
chrome_path = which("chromedriver.exe")
driver = webdriver.Chrome(executable_path=chrome_path,options=options)

# 直接使用 目前使用似乎可行
# driver = webdriver.Chrome(options=options)

driver.get("https://duckduckgo.com")

# 加上 slppe() 否則 browser 很快就關起來
time.sleep(10)
```

###### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\selenium_basics>python basics.py
D:\work\run\python_crawler\107-selenium\selenium_basics\basics.py:15: DeprecationWarning: executable_path has been deprecated, please pass in a Service object
  driver = webdriver.Chrome(executable_path=chrome_path,options=options)
```

##### search "My User Agent"
###### basics.py
``` py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from shutil import which


# 出現以下錯誤, 增加 options mask
# [15856:11828:1225/110356.222:ERROR:device_event_log_impl.cc(215)]
# [11:03:56.222] USB: usb_device_handle_win.cc:1045 Failed to read descriptor from node connection: 連結到系統的某個裝置失去作用。 (0x1F)
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])

# use which find "chromedriver.exe"
# need copy "chromedriver.exe" to PATH directory : I copy to C:\Windows\System32
chrome_path = which("chromedriver.exe")
driver = webdriver.Chrome(executable_path=chrome_path,options=options)

# 直接使用 目前使用似乎可行
# driver = webdriver.Chrome(options=options)

driver.get("https://duckduckgo.com")

search_input = driver.find_element(By.ID, "search_form_input_homepage")
search_input.send_keys("My User Agent")
# click button
# search_btn = driver.find_element(By.ID, "search_button_homepage")
# search_btn.click()

# press Enter
search_input.send_keys(Keys.ENTER)

# find_element(By.ID, "id")
# find_element(By.NAME, "name")
# find_element(By.XPATH, "xpath")
# find_element(By.LINK_TEXT, "link text")
# find_element(By.PARTIAL_LINK_TEXT, "partial link text")
# find_element(By.TAG_NAME, "tag name")
# find_element(By.CLASS_NAME, "class name")
# find_element(By.CSS_SELECTOR, "css selector")

# 加上 slppe() 否則 browser 很快就關起來
time.sleep(10)
```

##### no open browse, close driver and  "webdriver.Chrome() change executable_path to service"
###### basics.py
``` py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager



# 出現以下錯誤, 增加 options mask
# [15856:11828:1225/110356.222:ERROR:device_event_log_impl.cc(215)]
# [11:03:56.222] USB: usb_device_handle_win.cc:1045 Failed to read descriptor from node connection: 連結到系統的某個裝置失去作用。 (0x1F)
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
# add argument headless - no open browser
options.add_argument('--headless')

# change executable_path to service
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get("https://duckduckgo.com")

search_input = driver.find_element(By.ID, "search_form_input_homepage")
search_input.send_keys("My User Agent")
# click button
# search_btn = driver.find_element(By.ID, "search_button_homepage")
# search_btn.click()

# press Enter
search_input.send_keys(Keys.ENTER)

# find_element(By.ID, "id")
# find_element(By.NAME, "name")
# find_element(By.XPATH, "xpath")
# find_element(By.LINK_TEXT, "link text")
# find_element(By.PARTIAL_LINK_TEXT, "partial link text")
# find_element(By.TAG_NAME, "tag name")
# find_element(By.CLASS_NAME, "class name")
# find_element(By.CSS_SELECTOR, "css selector")

print("======================================")
print(driver.page_source)
print("======================================")

# need close
driver.close()
```

###### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\selenium_basics>python basics.py
======================================
......
======================================
```

#### selenium run by scrapy

##### livecoin
###### coin_selenium.py
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

###### run
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

###### json
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

#### scrapy_selenium
##### basic
###### create project and spider
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium>scrapy startproject silkdeals
New Scrapy project 'silkdeals', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\107-selenium\silkdeals
You can start your first spider with:
    cd silkdeals
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\107-selenium>cd silkdeals
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\silkdeals>scrapy genspider example example.com
Created spider 'example' using template 'basic' in module:
  silkdeals.spiders.example
```

###### change settings.py 
``` py
# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'silkdeals.middlewares.SilkdealsDownloaderMiddleware': 543,
#}
DOWNLOADER_MIDDLEWARES = {
    'scrapy_selenium.SeleniumMiddleware': 800
}

# selenium
from shutil import which

SELENIUM_DRIVER_NAME = 'chrome'
SELENIUM_DRIVER_EXECUTABLE_PATH = which('chromedriver')
SELENIUM_DRIVER_ARGUMENTS=['-headless']  # '--headless' if using chrome instead of firefox
``` 

###### example.py
```py
import scrapy
from scrapy_selenium import SeleniumRequest

class ExampleSpider(scrapy.Spider):
    name = 'example'

    def start_requests(self):
        yield SeleniumRequest(
            url='https://duckduckgo.com',
            wait_time=3,
            screenshot=True,
            callback=self.parse
        )

    def parse(self, response):
        img = response.request.meta['screenshot']

        with open('screenshot.png', 'wb') as f:
            f.write(img)
```

###### run 
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\silkdeals>scrapy crawl example
```

###### check output screenshot.png
<div style="width:500px">
	{% asset_img screenshot.png screenshot %}
</div>

##### search "Hello World"
###### example.py
``` py
import scrapy
from scrapy.selector import Selector
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

class ExampleSpider(scrapy.Spider):
    name = 'example'

    def start_requests(self):
        yield SeleniumRequest(
            url='https://duckduckgo.com',
            wait_time=3,
            screenshot=True,
            callback=self.parse
        )

    def parse(self, response):
        # img = response.request.meta['screenshot']

        # with open('screenshot.png', 'wb') as f:
        #     f.write(img)

        driver = response.meta['driver']
        search_input = driver.find_element(By.XPATH, "//input[@id='search_form_input_homepage']")
        search_input.send_keys('Hello World')
        # screenshot after send "Hello World"
        # driver.save_screenshot('after_filling_input.png')

        search_input.send_keys(Keys.ENTER)
        # screenshot after press Enter
        # driver.save_screenshot('enter.png')

        html = driver.page_source
        response_obj = Selector(text=html)

        links = response_obj.xpath("//h2[@class='LnpumSThxEWMIsDdAT17 CXMyPcQ6nDv47DKFeywM']")
        for link in links:
            yield {
                'URL' : link.xpath(".//a/@href").get(),
                'Title' : link.xpath(".//span/text()").get()
            }
```

###### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\silkdeals>scrapy crawl example
......
2022-12-26 16:34:29 [scrapy.core.scraper] DEBUG: Scraped from <200 https://duckduckgo.com/>
{'URL': 'https://learn.microsoft.com/en-us/shows/hello-world/', 'Title': 'Hello World | Microsoft Learn'}
2022-12-26 16:34:29 [scrapy.core.scraper] DEBUG: Scraped from <200 https://duckduckgo.com/>
{'URL': 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tutorials/hello-world', 'Title': 'Hello World - Introduction to C# interactive C# tutorial'}
2022-12-26 16:34:29 [scrapy.core.scraper] DEBUG: Scraped from <200 https://duckduckgo.com/>
{'URL': 'https://en.wikipedia.org/wiki/Hello_World_(film)', 'Title': 'Hello World (film) - Wikipedia'}
......
{'downloader/request_bytes': 224,
 'downloader/request_count': 1,
 'downloader/request_method_count/GET': 1,
 'downloader/response_bytes': 24379,
 'downloader/response_count': 2,
 'downloader/response_status_count/200': 2,
 'elapsed_time_seconds': 5.245749,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2022, 12, 26, 8, 34, 29, 59814),
 'httpcompression/response_bytes': 321,
 'httpcompression/response_count': 1,
 # item_scraped_count
 'item_scraped_count': 10,
 'log_count/DEBUG': 57,
 'log_count/INFO': 10,
 'response_received_count': 2,
 'robotstxt/request_count': 1,
 'robotstxt/response_count': 1,
 'robotstxt/response_status_count/200': 1,
 'scheduler/dequeued': 1,
 'scheduler/dequeued/memory': 1,
 'scheduler/enqueued': 1,
 'scheduler/enqueued/memory': 1,
 'start_time': datetime.datetime(2022, 12, 26, 8, 34, 23, 814065)}
```



### Ref
+ [Selenium with Python](https://selenium-python.readthedocs.io/)
+ [Scrapy with selenium](https://github.com/clemfromspace/scrapy-selenium)