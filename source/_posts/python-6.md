---
title: Python Crawler
abbrlink: '1165'
date: 2022-11-06 20:33:46
categories: Coding
tags:
	- python
---

### 非被引用才執行
``` python
# 非被引用才執行
if __name__ == '__main__':
    main()
```

### Request 
#### install
```
pip install requests
```

#### GET 
``` python 
import requests

try:
    resp = requests.get('http://blog.castman.net/web-crawler-tutorial/ch1/connect.html')
except:
    resp = None

if resp and resp.status_code == 200: # 下載成功
    print('status_code=', resp.status_code)
    print(resp.text)
```

<!--more-->

#### POST
``` python
import requests

url = 'https://www.w3schools.com/python/demopage.php'
myobj = {'somekey': 'somevalue'}
x = requests.post(url, json = myobj)

print(x.text)
```

#### other methods
+ delete(url, args)	: Sends a DELETE request to the specified url
+ head(url, args) : Sends a HEAD request to the specified url
+ patch(url, data, args) : Sends a PATCH request to the specified url
+ put(url, data, args) : Sends a PUT request to the specified url
+ request(method, url, args) : Sends a request of the specified method to the specified url

### BeautifulSoup 網頁解析
#### install
```
pip install beautifulsoup4
```

#### example
``` python
import requests
from bs4 import BeautifulSoup

def main():
    try:
        resp = requests.get('http://blog.castman.net/web-crawler-tutorial/ch1/connect.html')
    except:
        resp = None

    if resp and resp.status_code == 200:
        print('status_code=', resp.status_code)
        # print('--------------------------------')
        # print(resp.text)
        soup = BeautifulSoup(resp.text, 'html.parser')
        # print('--------------------------------')
        # print(soup)
        # print('--------------------------------')
        try:
            h1 = soup.find('h1')
        except:
            h1 = None

        if h1:
            print(soup.find('h1'))
            print(soup.find('h1').text)
            print(h1.text)
        try:
            h2 = soup.find('h2')
        except:
            h2 = None
            
        if h2:
            print(soup.find('h2').text)
        else:
            print('h2 tag not found!')

# 非被引用才執行
if __name__ == '__main__':
    main()
```

### Ref
+ [陳鍾誠的《演算法》課程 Crawler ](https://gitlab.com/cccnqu111/alg/-/tree/master/00e-python/09-net/crawler)
+ [Python web crawler note](https://clu.gitbook.io/python-web-crawler-note/13-yi-zhi-hen-yuan-shi-de-pa-chong)
+ [W3schools Python Requests Module](https://www.w3schools.com/python/module_requests.asp)
+ [Beautiful Soup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
