---
title: Python Crawler
abbrlink: '1165'
date: 2022-11-06 20:33:46
categories: Coding
tags:
	- python
---

### 概念
Web Scraping
Scrapy
Reguests
BeautifulSoup

<!--more-->

### package
#### Request 
##### install
```
pip install requests
```

##### GET 
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

##### POST
``` python
import requests

url = 'https://www.w3schools.com/python/demopage.php'
myobj = {'somekey': 'somevalue'}
x = requests.post(url, json = myobj)

print(x.text)
```

##### other methods
+ delete(url, args)	: Sends a DELETE request to the specified url
+ head(url, args) : Sends a HEAD request to the specified url
+ patch(url, data, args) : Sends a PATCH request to the specified url
+ put(url, data, args) : Sends a PUT request to the specified url
+ request(method, url, args) : Sends a request of the specified method to the specified url

#### BeautifulSoup 網頁解析
##### install
```
pip install beautifulsoup4
```

##### example
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

##### html 解析
``` py
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

# find li iclude a tag
next = soup.find('li', {'class': 'nexttxt'}).find('a')

# get tag a's href
print('next url = ' + next['href'])

# some example
movie_info = movie.find('div', {'class': 'release_info'})
if movie_info:
  # 修正中文 show 亂碼
  trailer_url = unquote(movie_info.find('div', {'class': 'release_movie_name'}).find('a')['href'], 'utf-8')
  # some movie no exceptation
  exceptation = movie_info.find('div', {'class': 'leveltext'})
  if exceptation:
    pexceptation = exceptation.text.strip().split('\n')[0]
  else:
    pexceptation = ""
  # some movie no exceptation
  item = {
    'ch_name': movie_info.find('div', {'class': 'release_movie_name'}).find('a').text.strip(),
    'en_name': movie_info.find('div', {'class': 'en'}).find('a').text.strip(),
    'expectation': pexceptation,
    'intro': movie_info.find('div', {'class': 'release_text'}).find('span').text.strip(),
    'poster_url': movie.find('div', {'class': 'release_foto'}).find('img')['data-src'],
    'release_date': movie_info.find('div', {'class': 'release_movie_time'}).text.strip().split(' ')[-1],
    'trailer_url': trailer_url
  }
```

##### 解析後建立 html5 物件
``` python
# need instll html5lib 
from bs4 import BeautifulSoup
soup = BeautifulSoup(dom, 'html5lib')
```

#### Selenium

##### install
```
pip install selenium
```

##### example 1
``` py
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

def page_down(element, times, sec):
  print("[%] Scrolling down.")
  for i in range(times):
    print(i)
    element.send_keys(Keys.PAGE_DOWN)
    sleep(sec)  # bot id protection

# save post - it check get post already
post_list = list()

if __name__ == '__main__':
  browser = webdriver.Chrome()
  browser.get('https://www.dcard.tw/f')
  sleep(2)

  # element for press page down
  element = browser.find_element(By.TAG_NAME, "body")

  # loop break when get >= 10 post
  count=0
  for count in range(10):
    page_down(element, 2, 0.5)
    html = browser.page_source
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    find_top10_hot_title(soup, post_list, 'post-*')
    print(post_list)
    if (len(post_list)>=10):
      break

  # exit browser
  browser.quit()
```

##### example 2 - get html from element
``` py
news =  browser.find_elements(By.CLASS_NAME, "story-list__news")
i = 1
for new in news:
  new_html =  new.get_attribute('innerHTML')
  soup = BeautifulSoup(new_html, 'html5lib')
  title = soup.find('div', {'class' : 'story-list__text'}).find('a').text
  time_tag = soup.find('div', {'class' : 'story-list__info'})
  if time_tag:
    time_tag = time_tag.text.strip().split('\n')[1].strip()
  else:
    time_tag = ""
  # check no title mean not exist
  if len(title) != 0:
    print(f'{i:02d} {time_tag:16s} {title}')
    i += 1
```

### API
#### Dcard API 2.0
Base Url : https://www.dcard.tw/service/api/v2

|說明|請求方法|路徑|
|-----|-----|----|
|全部文章				|GET	   |/posts|
|看板資訊				|GET	   |/forums|
|看板內文章列表	|GET	   |/forums/{看板名稱}/posts|
|文章內文				|GET	   |/posts/{文章ID}|
|文章內引用連結	|GET	   |/posts/{文章ID}/links|
|文章內留言			|GET	   |/posts/{文章ID}/comments|



### Ref
+ [陳鍾誠的《演算法》課程 Crawler ](https://gitlab.com/cccnqu111/alg/-/tree/master/00e-python/09-net/crawler)
+ [Python web crawler note](https://clu.gitbook.io/python-web-crawler-note/13-yi-zhi-hen-yuan-shi-de-pa-chong)
+ [W3schools Python Requests Module](https://www.w3schools.com/python/module_requests.asp)
+ [Beautiful Soup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
+ [STEAM-Selenium 函式庫](https://steam.oxxostudio.tw/category/python/spider/selenium.html)

```
# Convert indentation to spaces
press CTRL + Shift + P
type: "convert indentation to Space"
# This one forces the tab to be **space**
"editor.insertSpaces": true,
# 修剪行末空白
"files.trimTrailingWhitespace": true,
```