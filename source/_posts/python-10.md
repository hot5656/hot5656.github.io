---
title: Python Splash 說明
abbrlink: fd3
date: 2022-12-22 10:52:14
categories: Coding
tags:
	- python
---

### 說明
#### Browser Engine
+ V8 Engine : Chrome
+ Spider Monkey : Firefox
+ Apple WebKit : Safari
+ Chakra : Microsoft Edge, Splash

<!--more-->

### Install Splash(Windows)

#### insall WSL2(power shell)
+ install WLS
``` bash
PS C:\Users\robertkao> wsl --list --online
以下是可安裝之有效發佈的清單。
使用 'wsl --install -d <Distro>' 安裝。

NAME               FRIENDLY NAME
Ubuntu             Ubuntu
Debian             Debian GNU/Linux
kali-linux         Kali Linux Rolling
SLES-12            SUSE Linux Enterprise Server v12
SLES-15            SUSE Linux Enterprise Server v15
Ubuntu-18.04       Ubuntu 18.04 LTS
Ubuntu-20.04       Ubuntu 20.04 LTS
OracleLinux_8_5    Oracle Linux 8.5
OracleLinux_7_9    Oracle Linux 7.9

# inslatll WLS
PS C:\Users\robertkao> wsl --install -d Ubuntu-20.04
正在安裝：Ubuntu 20.04 LTS
已完成安裝 Ubuntu 20.04 LTS。
正在啟動 Ubuntu 20.04 LTS...

#check version
PS C:\Users\robertkao> wsl -l -v
  NAME            STATE           VERSION
* Ubuntu-20.04    Stopped         1

# set WLS 2
PS C:\Users\robertkao> wsl --set-version Ubuntu-20.04  2
正在進行轉換，這可能需要幾分鐘的時間...
有關 WSL 2 的主要差異詳細資訊，請瀏覽 https://aka.ms/wsl2
WSL 2 需要更新其核心元件。如需詳細資訊，請造訪 visit https://aka.ms/wsl2kernel
```

+ Download the Linux kernel update package for WLS2 
	https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi  


+ change to WLS 2
``` bash
PS C:\Users\robertkao> wsl --set-version Ubuntu-20.04  2
正在進行轉換，這可能需要幾分鐘的時間...
有關 WSL 2 的主要差異詳細資訊，請瀏覽 https://aka.ms/wsl2
轉換完成。

PS C:\Users\robertkao> wsl -l -v                                                                                          NAME            STATE           VERSION
* Ubuntu-20.04    Stopped         2

# also support command set deafult WLS and version
# wsl --set-default-version 2
# wsl --set-default Ubuntu-20.04
```


#### [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)
+ check windows version
<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>

+ install picture
<div style="width:400px">
	{% asset_img pic2.png pic2 %}
</div>

#### [Create Docker Hub account](https://hub.docker.com/) then login

#### Inspall Splash(cmd)
``` bash
C:\Users\robertkao>docker pull scrapinghub/splash
Microsoft Windows [版本 10.0.19044.2364]
(c) Microsoft Corporation. 著作權所有，並保留一切權利。
7595c8c21622: Pull complete
d13af8ca898f: Pull complete
......
6ae21b55ecfd: Pull complete
8ef8d76a1942: Pull complete
Digest: sha256:b4173a88a9d11c424a4df4c8a41ce67ff6a6a3205bd093808966c12e0b06dacf
Status: Downloaded newer image for scrapinghub/splash:latest
docker.io/scrapinghub/splash:latest
8ef8d76a1942: Pulling fs layer
```

#### run splash(cmd) - default timeout 90s
``` bash
C:\Users\robertkao>docker run -it -p 8050:8050 scrapinghub/splash
2022-12-22 07:19:18+0000 [-] Log opened.
2022-12-22 07:19:18.115553 [-] Xvfb is started: ['Xvfb', ':521360586', '-screen', '0', '1024x768x24', '-nolisten', 'tcp']
QStandardPaths: XDG_RUNTIME_DIR not set, defaulting to '/tmp/runtime-splash'
2022-12-22 07:19:18.178196 [-] Splash version: 3.5
2022-12-22 07:19:18.210714 [-] Qt 5.14.1, PyQt 5.14.2, WebKit 602.1, Chromium 77.0.3865.129, sip 4.19.22, Twisted 19.7.0, Lua 5.2
2022-12-22 07:19:18.210912 [-] Python 3.6.9 (default, Jul 17 2020, 12:50:27) [GCC 8.4.0]
2022-12-22 07:19:18.211018 [-] Open files limit: 1048576
2022-12-22 07:19:18.211083 [-] Can't bump open files limit
2022-12-22 07:19:18.228274 [-] proxy profiles support is enabled, proxy profiles path: /etc/splash/proxy-profiles
2022-12-22 07:19:18.228489 [-] memory cache: enabled, private mode: enabled, js cross-domain access: disabled
2022-12-22 07:19:18.353906 [-] verbosity=1, slots=20, argument_cache_max_entries=500, max-timeout=90.0
2022-12-22 07:19:18.354131 [-] Web UI: enabled, Lua: enabled (sandbox: enabled), Webkit: enabled, Chromium: enabled
2022-12-22 07:19:18.354491 [-] Site starting on 8050
2022-12-22 07:19:18.354579 [-] Starting factory <twisted.web.server.Site object at 0x7fa4041ee5c0>
2022-12-22 07:19:18.354902 [-] Server listening on http://0.0.0.0:8050
```

#### run splash(cmd) - set timeout to 3600s
``` bash
C:\Users\robertkao>docker run -it -p 8050:8050 scrapinghub/splash --max-timeout 3600
2023-01-06 02:35:38+0000 [-] Log opened.
2023-01-06 02:35:38.524319 [-] Xvfb is started: ['Xvfb', ':870545562', '-screen', '0', '1024x768x24', '-nolisten', 'tcp']
QStandardPaths: XDG_RUNTIME_DIR not set, defaulting to '/tmp/runtime-splash'
2023-01-06 02:35:38.610007 [-] Splash version: 3.5
2023-01-06 02:35:38.645337 [-] Qt 5.14.1, PyQt 5.14.2, WebKit 602.1, Chromium 77.0.3865.129, sip 4.19.22, Twisted 19.7.0, Lua 5.2
2023-01-06 02:35:38.645542 [-] Python 3.6.9 (default, Jul 17 2020, 12:50:27) [GCC 8.4.0]
2023-01-06 02:35:38.645685 [-] Open files limit: 1048576
2023-01-06 02:35:38.645762 [-] Can't bump open files limit
2023-01-06 02:35:38.665818 [-] proxy profiles support is enabled, proxy profiles path: /etc/splash/proxy-profiles
2023-01-06 02:35:38.666088 [-] memory cache: enabled, private mode: enabled, js cross-domain access: disabled
2023-01-06 02:35:38.813553 [-] verbosity=1, slots=20, argument_cache_max_entries=500, max-timeout=3600.0
2023-01-06 02:35:38.813828 [-] Web UI: enabled, Lua: enabled (sandbox: enabled), Webkit: enabled, Chromium: enabled
2023-01-06 02:35:38.814301 [-] Site starting on 8050
2023-01-06 02:35:38.814452 [-] Starting factory <twisted.web.server.Site object at 0x7fd3d806e5f8>
2023-01-06 02:35:38.815222 [-] Server listening on http://0.0.0.0:8050
```

#### open Splash by chrome
<div style="max-width:700px">
	{% asset_img pic5.png pic5 %}
</div>

#### 2nd time run splash
<div style="width:300px">
	{% asset_img pic6.png pic6 %}
</div>

<div style="max-width:700px">
	{% asset_img pic7.png pic7 %}
</div>

#### open log
<div style="max-width:700px">
	{% asset_img pic8.png pic8 %}
</div>
<div style="max-width:700px">
	{% asset_img pic9.png pic9 %}
</div>

#### open Splash by browser
<div style="max-width:700px">
	{% asset_img pic10.png pic10 %}
</div>

<div style="max-width:700px">
	{% asset_img pic11.png pic11 %}
</div>

### Command
#### create project and spider 
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash>scrapy startproject livecoin
New Scrapy project 'livecoin', using template directory 'D:\app\python_env\myenv10_scrapy\lib\site-packages\scrapy\templates\project', created in:
    D:\work\run\python_crawler\106-scrapy-splash\livecoin
You can start your first spider with:
    cd livecoin
    scrapy genspider example example.com

(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash>cd livecoin
(myenv10_scrapy) D:\work\run\python_crawler\106-scrapy-splash\livecoin>scrapy genspider coin web.archive.org/web/20200116052415/https://www.livecoin.net/en/
Created spider 'coin' using template 'basic' in module:
  livecoin.spiders.coin
```

#### install scrapy-splash
``` bash
pip install scrapy-splash
``` 

#### run
```
scrapy crawl quote_list -o quotes_all.json
```

### settings.py
#### basic setting
``` py
# put lastest
SPLASH_URL = 'http://localhost:8050'

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'livecoin.middlewares.LivecoinDownloaderMiddleware': 543,
#}
DOWNLOADER_MIDDLEWARES = {
    'scrapy_splash.SplashCookiesMiddleware': 723,
    'scrapy_splash.SplashMiddleware': 725,
    'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 810,
}

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'livecoin.middlewares.LivecoinSpiderMiddleware': 543,
#}
SPIDER_MIDDLEWARES = {
    'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
}

DUPEFILTER_CLASS = 'scrapy_splash.SplashAwareDupeFilter'
```

#### set JSON utf-8 format
``` py
# set JSON utf-8 format
FEED_EXPORT_ENCODING = 'utf-8'
```

### Coding(browser)

#### Introduction
##### 1st run  
``` Lua
# https://duckduckgo.com
function main(splash, args)
	url = args.url
  splash:go(url)
  return splash:png()
end
```

<div style="max-width:700px">
	{% asset_img pic12.png pic12 %}
</div>

<div style="max-width:700px">
	{% asset_img pic13.png pic13 %}
</div>

##### show html 
``` Lua
function main(splash, args)
	url = args.url
  splash:go(url)
	-- show html 
  return splash:html()
end
```

<div style="max-width:700px">
	{% asset_img pic14.png pic14 %}
</div>

<div style="max-width:700px">
	{% asset_img pic15.png pic15 %}
</div>


##### show image + html 
``` Lua
function main(splash, args)
	url = args.url
  splash:go(url)
	-- show image + html 
  return {
    image = splash:png(),
    htlm = splash:html()
  }
end
```

<div style="max-width:700px">
	{% asset_img pic16.png pic16 %}
</div>

<div style="max-width:700px">
	{% asset_img pic17.png pic17 %}
</div>

##### wrong url 
<div style="max-width:700px">
	{% asset_img pic18.png pic18 %}
</div>

<div style="max-width:700px">
	{% asset_img pic19.png pic19 %}
</div>

##### assert - show error message
``` Lua
function main(splash, args)
	url = args.url
	-- add assert
  assert(splash:go(url))
  return {
    image = splash:png(),
    htlm = splash:html()
  }
end
```

<div style="max-width:700px">
	{% asset_img pic20.png pic20 %}
</div>

<div style="max-width:700px">
	{% asset_img pic21.png pic21 %}
</div>

##### add wait response
``` Lua
# delay 1 sec for display
function main(splash, args)
	url = args.url
  assert(splash:go(url))
	-- add wait
  assert(splash:wait(1))
  return {
    image = splash:png(),
    htlm = splash:html()
  }
end
```

<div style="max-width:700px">
	{% asset_img pic22.png pic22 %}
</div>

<div style="max-width:700px">
	{% asset_img pic23.png pic23 %}
</div>


#### select element

##### search "my user agent"
``` Lua
-- url = https://www.google.com
function main(splash, args)
	url = args.url
  assert(splash:go(url))
	-- add wait
  assert(splash:wait(1))
  
  -- select by id
  -- also have sellect_all() function to get multiple elements
  input_box = assert(splash:select(".gLFyf"))
  input_box:focus()
  input_box:send_text("my user agent")
  assert(splash:wait(0.5))
  
  -- press Enter
  input_box:send_keys("<Enter>")
  assert(splash:wait(5))
  
  -- set full viewport
  splash:set_viewport_full()
  return {
    image = splash:png(),
    htlm = splash:html()
  }
end
```

<div style="max-width:700px">
	{% asset_img pic24.png pic24 %}
</div>

<div style="max-width:700px">
	{% asset_img pic25.png pic25 %}
</div>

<div style="max-width:500px">
	{% asset_img pic26.png pic26 %}
</div>

##### change heads(user agent)
``` Lua
-- url = https://www.google.com
function main(splash, args)
  -- 1st : set splash user agent
  -- splash:set_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36")

  -- 2nd : overwrite headers
  headers = {
    ['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  }
  splash:set_custom_headers(headers)
  
  url = args.url
  assert(splash:go(url))
	-- add wait
  assert(splash:wait(1))
  
  -- select by id
  -- also have sellect_all() function to get multiple elements
  input_box = assert(splash:select(".gLFyf"))
  input_box:focus()
  input_box:send_text("my user agent")
  assert(splash:wait(0.5))
  
  -- press Enter
  input_box:send_keys("<Enter>")
  assert(splash:wait(5))
  
  -- set full viewport
  splash:set_viewport_full()
  return {
    image = splash:png(),
    htlm = splash:html()
  }
end
```

<div style="max-width:700px">
	{% asset_img pic27.png pic27 %}
</div>

<div style="max-width:700px">
	{% asset_img pic28.png pic28 %}
</div>

<div style="max-width:500px">
	{% asset_img pic29.png pic29 %}
</div>

### Coding(scrapy)
#### basic .py
``` py
import scrapy
from scrapy_splash import SplashRequest

class QuoteListSpider(scrapy.Spider):
    name = 'quote_list'
    allowed_domains = ['quotes.toscrape.com']

    script = '''
        -- http://quotes.toscrape.com/js
        function main(splash, args)
            url = args.url
            assert(splash:go(url))
            assert(splash:wait(1))

            splash:set_viewport_full()
            return splash:html()
        end
    '''

    def start_requests(self):
        yield SplashRequest(url="http://quotes.toscrape.com/js/", callback=self.parse, endpoint="execute", args={
            'lua_source': self.script
        })

    def parse(self, response):
        for quote in response.xpath("//div[@class='quote']"):
            yield {
                'quote text': quote.xpath(".//span[1]/text()").get(),
                'author': quote.xpath(".//span[2]/small/text()").get(),
                'tags': quote.xpath(".//div/a/text()").getall(),
            }

        next_page = quote.xpath("//li[@class='next']/a/@href").get()
        if next_page:
            absolute_url = f'http://quotes.toscrape.com{next_page}'
            yield SplashRequest(url=absolute_url, callback=self.parse, endpoint="execute", args={
                'lua_source': self.script
            })
```


### Ref
+ [安裝 WSL](https://learn.microsoft.com/zh-tw/windows/wsl/install) 
+ [Splash Scripts Reference](https://splash.readthedocs.io/en/stable/scripting-ref.html)
+ [Scrapinghub](https://github.com/scrapinghub/splash)
+ [scrapy-plugins](https://github.com/scrapy-plugins/scrapy-splash)
+ [Aquarium](https://github.com/TeamHG-Memex/aquarium)