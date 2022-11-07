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

# function and add cookie
def get_web_page(url):
    resp = requests.get(url=url, cookies={'over18': '1'})
    if resp.status_code != 200:
        print('Invalid url:', resp.url)
        return None
    else:
        return resp.text
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

#### 解析後建立 html5 物件
``` python
# need instll html5lib 
from bs4 import BeautifulSoup
soup = BeautifulSoup(dom, 'html5lib')
```

### html 解析
``` python
# find()
paging_div = soup.find('div', 'btn-group btn-group-paging')
push_str = d.find('div', 'nrec').text
href = d.find('a')['href']
title = d.find('a').text
author = d.find('div', 'author').text if d.find('div', 'author') else ''
# find_all()
divs = soup.find_all('div', 'r-ent')
for d in divs:
    .....
``` 

### Ref
+ [陳鍾誠的《演算法》課程 Crawler ](https://gitlab.com/cccnqu111/alg/-/tree/master/00e-python/09-net/crawler)
+ [Python web crawler note](https://clu.gitbook.io/python-web-crawler-note/13-yi-zhi-hen-yuan-shi-de-pa-chong)
+ [W3schools Python Requests Module](https://www.w3schools.com/python/module_requests.asp)
+ [Beautiful Soup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
+ [python time module](https://docs.python.org/3/library/time.html)
+ [使用 WITH AS](https://openhome.cc/Gossip/Python/WithAs.html)
+ [讀寫JSON數據](http://python3-cookbook.readthedocs.io/zh_CN/latest/c06/p02_read-write_json_data.html)
+ [set() 函数](https://www.runoob.com/python/python-func-set.html)