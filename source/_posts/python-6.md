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


<!--more-->

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

#### some parse
``` py
# find tag
print(soup.h4)
print(soup.find("h4"))
# find tag's text
print(soup.find("h4").text)
# find tag's text in below tag
print(soup.h4.a.text)
# find all tags's text
for h4 in h4_tags:
  print(h4.a.text)
print(soup.h4.a.text)
# find all tags's text by class
# 以下代表相同
# h4_tags = soup.find_all('h4', class_='card-title')
# h4_tags = soup.find_all('h4', 'card-title')
# h4_tags = soup.find_all('h4', {'class' : 'card-title'})
h4_tags = soup.find_all('h4', 'card-title')
for h4 in h4_tags:
  print(h4.a.text)
# find tags's text by id
print('soup.find(id="mac-p").text.strip() : ')
print('-'+soup.find(id='mac-p').text.strip()+'-')
# find all tags's text by 非標準屬性
# 非標準屬性會有錯誤
# print(soup.find(data-foo='mac-p').text.strip())
print('===============================')
# 改用以下方式
print(soup.find_all('', {'data-foo': 'mac-foo'}))
# find blog 內容
divs = soup.find_all('div', 'content')
for div in divs:
    print(div.h6.text.strip(), div.h4.text.strip(), div.p.text.strip())
# find blog 內容 - another way 
for div in divs:
  print([s for s in div.stripped_strings])
# parent and sibling
price = link.parent.previous_sibling.text
# children
all_tds = [td for td in row.children]
# check attrs
if 'href' in all_tds[3].a.attrs :
  href = all_tds[3].a['href']
else:
  href = None;
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

```
# Convert indentation to spaces
press CTRL + Shift + P
type: "convert indentation to Space"
# This one forces the tab to be **space**
"editor.insertSpaces": true,
# 修剪行末空白
"files.trimTrailingWhitespace": true,
```