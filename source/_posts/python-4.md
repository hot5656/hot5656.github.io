---
title: Python 說明
abbrlink: d0e4
date: 2021-04-16 13:56:31
categories: Coding
tags:
	- python
---

###  基本
#### import 
``` py
# 一般 import
import turtle
timmy = turtle.Turtle()
# import 內容(簡單使用)
from turtle import Turtle, Screen
# import all ,可能不知出處,避免使用
from turtle import *
from tkinter import *
# module 太長,給予別名
import turtle as t
timmy = t.Turtle()
```

<!--more-->

#### pass
``` py
pass
```

#### 運算元
``` py
print(f'10 == 10 : {10 == 10}')
print(f'10 != 10 : {10 != 10}')
print(f'10 > 10 : {10 > 10}')
print(f'10 < 10 : {10 < 10}')
print(f'10 == 10 : {10 == 10}')
print(f'10 == 10 : {10 == 10}')
print(f'10 == 10 : {10 == 10}')

print(f'5 & 7 : {5 & 7:x}')
print(f'5 | 7 : {5 | 7:x}')
print(f'5 ^ 7 : {5 ^ 7:x}')
print(f'~ 5 : {~5 :x}')
print(f'5 >> 1 : {5 >> 1:x}')
print(f'5 << 1 : {5 << 1:x}')

x = 7
print(f'x < 5 and  x < 10 : {x < 5 and x < 10}')
print(f'x < 5 or x < 4 : {x < 5 or x < 4}')
print(f'not(x < 5 and x < 10) : {not (x < 5 and x < 10)}')
```

#### global function and variable
``` py
import os

def main():
    global os

    STOCK_DB_FILE = 'stockPrice.db'
    if os.path.isfile(STOCK_DB_FILE):
        os.remove(STOCK_DB_FILE)
```

#### 條件式
``` py
a = 200
b = 33
if b > a:
    print("b is greater than a")
elif a == b:
    print("a and b are equal")
else:
    print("a is greater than b")
```

#### 迴圈
``` py
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  	print(x)

for x in "banana":
  	print(x)

for x in range(6):  # 0,1, ..5
  print(x)

for x in range(2, 6):  # 2,3, ..5
  	print(x)

for x in range(2, 30, 3):  # 2,5,8 ..29
  	print(x)

# pass statement to avoid getting an error
for x in [0, 1, 2]:
  	pass

# while
i = 1
while i < 6:
    print(i)
    i += 1
```

#### function
``` py
# comment 
def my_function(fname, lname):
		""" function description """
    print(fname + " " + lname)
my_function("Emil", "Refsnes")

def my_function(*kids):
    print("The youngest child is " + kids[2])
my_function("Emil", "Tobias", "Linus")

# If the number of keyword arguments is unknown, add a double ** before the parameter name:
def my_function(**kid):
    print("His last name is " + kid["lname"])
my_function(fname="Tobias", lname="Refsnes")

# return value
def my_function(x):
    return 5 * x
print(my_function(3))
```

#### 非被引用才執行
``` python
# 非被引用才執行
if __name__ == '__main__':
    main()
```

### 變數

+ array VS list 
	+ array 屬於 Python 模組 numpy 裡的一種數據類型，所包含的所有元素類型都必須相同
	+ list 是 Python 內建的數據類型，可以包含不同的元素類型

#### None（空值）
``` py
if resp is None:
    return None
```

#### 變數與型態
``` py
money = 100
name = "Robert"
temperature = 25.2 
flag = True
print(type(money))	# <class 'int'>
print(type(name))		# <class 'str'>
print(type(temperature)) # <class 'float'>
print(type(flag))   # <class 'bool'>
print('Hi {name} give you {money} dollars, the temperature is {temp}'.format(name=name, money=money, temp=temperature))
# reference glbal variable
def make_coff(coffee, money):
    global profile
    for item in MENU:
        resources[item] -= MENU[choice]["ingredients"][item]
    profile += money
```

#### string
+ join 
``` py
# array join to string
# .join() with sets
test = {'2', '1', '3'}
s = ', '
print(s.join(test))
# 2, 3, 1
test = {'Python', 'Java', 'Ruby'}
s = '->->'
print(s.join(test))
# Python->->Ruby->->Java
''.join(response.xpath("//ul[@class='ipc-inline-list ipc-inline-list--show-dividers sc-8c396aa2-0 kqWovI baseAlt']/li[3]/text()").getall())

# string show hex
result = ' '.join(hex(ord(char)) for char in h1_str)
print(result)  # 👉️ 0x61 0x70 0x70 0x6c 0x65

# split by hex code 0x0a
h1_str = soup2.find('h1').text.strip().split('\x0a')
```

#### array
``` py
rticles = []
divs = soup.find_all('div', 'r-ent')
for d in divs:
    if d.find('a'):
        href = d.find('a')['href']
        title = d.find('a').text
        author = d.find('div', 'author').text if d.find('div', 'author') else ''
        articles.append({
            'title': title,
            'href': href,
            'author': author
        })
```

#### list
``` py
# 生成空 list
info = list()
record = {
    '日期': data[0],
    '開盤價': data[3],
    '收盤價': data[6],
    '成交筆數': data[8]
}
info.append(record)
```

#### Dictionaries
``` py
MENU = {
    "espresso": {
        "ingredients": {
            "water": 50,
            "coffee": 18,
        },
        "cost": 1.5,
    },
    "latte": {
        "ingredients": {
            "water": 200,
            "milk": 150,
            "coffee": 24,
        },
        "cost": 2.5,
    },
    "cappuccino": {
        "ingredients": {
            "water": 250,
            "milk": 100,
            "coffee": 24,
        },
        "cost": 3.0,
    }
}

resources = {
    "water": 300,
    "milk": 200,
    "coffee": 100,
}
# check item
for item in MENU:
    print(f'{item}')
# check item		
choice = input('What would you like? (espresso/latte/cappuccino):')
if choice in MENU:
	print(f'{item}')
else:
	print('input error')
```

### IO

#### input
``` py
coin = float(input('    How many quarters?:'))
coin = int(input('    How many quarters?:'))
name = input()
```

#### print
``` py
money = 100
name = "Robert"
temperature = 25.2
print('Hi {name} give you {money} dollars, the temperature is {temp}'.format(name=name, money=money, temp=temperature))

# show by format
print('hex number={:x}'.format(23))	# hex number=17
print(f'    money= ${insert_money:.2f}, cost= ${cost}')

# string direct using variable
print(f'I am {name}')	# I am Robert

# 運算式
a = 10
b = 200
print(f'a + b ={a + b}') # a + b =210

# print - not change line and direct output
while current_articles:
    print('.', end="",flush=True)

# alignemnt position
print(f'{i:02d} {time_tag:16s} {title}')
print(f'({i:02d}) {article["ip"]:15s}-{article["location_data"]["country"]:15s} {article["title"]}')
```

#### file I/O
``` py
# access_mode
# r  : read
# rb : read binary
# r+ : read and write
# rb+ : read and write(binary)
# w : write
# wb : write binary
# w+ : write and read 
# wb+ :　write and read(binary)
# a : appending
# ab : appending binary
# a+ : appending and read
# ab+ : appending and read(binary)

# open and write(json) 
with open('gossiping.json', 'w', encoding='UTF-8') as file:
    # ensure_ascii=False 輸出中文
    # sort_keys=True 按 key 順序排列
    json.dump(articles, file, indent=2, sort_keys=True, ensure_ascii=False)

# open and write(csv)
import csv
with open('stockThisMonth.csv', 'w', encoding='UTF-8', newline='') as file: # excel 開檔,中文有問題
# with open('stockThisMonth.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['日期', '開盤價', '收盤價', '成交筆數'])
        for info in collected_info:
                print(info)
                writer.writerow([info['日期'], info['開盤價'], info['收盤價'], info['成交筆數']])

# simple open json file
# encoding='utf-8', load 中文正常
f = open(file_name, 'r', encoding='utf-8')
content = f.read()
# print(content)
dcard_shwo_api_title(content)
print("get from file....")
f.close()
```

### specific operation
#### get page
``` py
import requests

# include cookies
def get_web_page(url):
    resp = requests.get(url=url, cookies={'over18': '1'})
    if resp.status_code != 200:
        print('Invalid url:', resp.url)
        return None
    else:
        return resp.text

# get json(include agent head)
headers = {'user-agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'}
def get_location(ip):
    response = requests.get(f'https://ipapi.co/{ip}/json/', headers=headers).json()
```

#### get local ip & ip location
``` py
def get_local_ip():
    response = requests.get('https://api64.ipify.org?format=json').json()
    return response["ip"]

headers = {'user-agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'}
def get_location(ip):
    response = requests.get(f'https://ipapi.co/{ip}/json/', headers=headers).json()
    location_data = {
        "ip": ip,
        "city": response.get("city"),
        "region": response.get("region"),
        "country": response.get("country_name")
    }
    return location_data
``` 

### Built-in function

#### round
``` py
# 4捨5入
x = round(5.76543, 2)
print(x)
33 
```

#### set() 函数 - 創建一個無序不重複元素集
``` python
def get_author_ids(posts, pattern):
    ids = set()
    for post in posts:
        if pattern in post['author']:
            ids.add(post['author'])
    return ids
```

#### csv 
``` py
import csv

# write 
# with open('stockThisMonth.csv', 'w', encoding='UTF-8', newline='') as file: # excel 開檔,中文有問題
with open('stockThisMonth.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['日期', '開盤價', '收盤價', '成交筆數'])
        for info in collected_info:
                print(info)
                writer.writerow([info['日期'], info['開盤價'], info['收盤價'], info['成交筆數']])
```


#### json
``` python
import json

# write dictionary list to a json format file
articles = []
articles.append({
    'title': title,
    'href': href,
    'push_count': push_count,
    'author': author
})
with open('gossiping.json', 'w', encoding='UTF-8') as file:
    # ensure_ascii=False 輸出中文
    # sort_keys=True 按 key 順序排列
    json.dump(articles, file, indent=2, sort_keys=True, ensure_ascii=False)

# check json format
def is_json(myjson):
  try:
    json.loads(myjson)
  except ValueError as e:
    return False
  return True

  # load json to variable
  parsed = json.loads(content)

  # show json
  ensure_ascii=False, show 中文
  print(json.dumps(parsed, indent=4, ensure_ascii=False))
```


#### sglite3
``` py
import csv
import sqlite3
import os

def execute_sql(db, sql_cmd):
    cursor = db.cursor()
    cursor.execute(sql_cmd)
    db.commit()

STOCK_DB_FILE = 'stockPrice.db'
if os.path.isfile(STOCK_DB_FILE):
    os.remove(STOCK_DB_FILE)

db = sqlite3.connect(STOCK_DB_FILE)
# need add ID for sqlite3
execute_sql(db, f'CREATE TABLE stockPrice (ID INTEGER, 日期 TEXT, 開盤價 INTEGER, 收盤價 INTEGER, 成交筆數 INTEGER)')

with open('stockThisMonth.csv', newline='', encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    print('日期', '開盤價','收盤價','成交筆數')
    for info in reader:
        print(info['日期'],info['開盤價'],info['收盤價'],info['成交筆數'])
        # no add ID's value 
        command = f'INSERT INTO stockPrice (ID, 日期, 開盤價, 收盤價, 成交筆數) VALUES ("{info["日期"]}", {info["開盤價"]}, {info["收盤價"]}, {info["成交筆數"]})'
        print('command=', command)
        execute_sql(db, command)

db.close()
```

#### os
``` py
import os

STOCK_DB_FILE = 'stockPrice.db'
if os.path.isfile(STOCK_DB_FILE):
    os.remove(STOCK_DB_FILE)
```

#### timedate
``` py
import datetime

def twDateToGlobal(twDate):
    year, month, date = twDate.split("/")
    print(datetime.date(int(year), int(month), int(date)))
    return datetime.date(int(year), int(month), int(date))
```

#### time
``` py
import time

current_date = time.strftime('%Y%m%d')
current_year = time.strftime('%Y')
current_month = time.strftime('%m')
```

#### re
``` py
import re

# get h1~6
find_text_content_by_reg(soup, 'h[1-6]')
def find_text_content_by_reg(soup, reg_pattern):
  for element in soup.find_all(re.compile(reg_pattern)):
    print(element.name, element.text.strip())

# get.png
# $ means the tail, the end of the string.
# \. means "."
find_img_source_by_reg(soup, '\.png$')
# .* means any 0~n character
find_img_source_by_reg(soup, 'beginner.*'+'\.png$')
find_img_source_by_reg(soup, 'crawler.*')
def find_img_source_by_reg(soup, reg_pattern):
  for img in soup.find_all('img', {'src': re.compile(reg_pattern)}):
    # print(img['class'])
    print(img['src'])

count_blog_number(soup, 'card\-blog')
def count_blog_number(soup, pattern):
  count = len(soup.find_all('div', {'class' : re.compile(pattern)}))
  print("Blog count: " + str(count))

# get match string
dom = soup_item.find('div', {'id': 'main-container'}).text
pattern = '來自: \d+\.\d+\.\d+\.\d+'
match = re.search(pattern, dom)
if match:
  return match.group(0).replace('來自: ', '')
else:
  return None
```

#### quote/unquote
``` py
# 修正中文 show 亂碼
trailer_url = unquote(movie_info.find('div', {'class': 'release_movie_name'}).find('a')['href'], 'utf-8')
```

### special function
#### put password to local file
##### pipelines.py
``` py
# for mongodb client link
import mongodb_altas

class MongodbPipeline:
    collection_name = "best_movies"

    def open_spider(self, spider):
        # for mongodb client link
        self.client = pymongo.MongoClient(mongodb_altas.mogodb_link)
        self.db = self.client["IMDB"]
``` 

##### mongodb_altas.py
``` py
mogodb_link = "m......"
```

#### delete file if exist
``` py
# delete imdb if exist
import os

if os.path.exists("imdb.db"):
    os.remove("imdb.db")
```

#### MongoDB
``` py
# for MongoDB
import pymongo
# for mongodb client link
import mongodb_altas

# for MongoDB - changhe name
class MongodbPipeline:
    collection_name = "best_movies"

    def open_spider(self, spider):
        # for MongoDB
        # for mongodb client link
        self.client = pymongo.MongoClient(mongodb_altas.mogodb_link)
        self.db = self.client["IMDB"]

    def close_spider(self, spider):
        # for MongoDB
        self.client.close()

    def process_item(self, item, spider):
        # for MongoDB
        self.db[self.collection_name].insert_one(item)
        return item
```

#### SQlite
``` py
# for SQlite
import sqlite3
# for mongodb client link
import os

# for SQlite
class SQLitePipeline:

    def open_spider(self, spider):

        self.connection = sqlite3.connect("imdb.db")
        self.c = self.connection.cursor()
        try:
            self.c.execute('''
                CREATE TABLE best_movies(
                    title TEXT,
                    year TEXT,
                    duration TEXT,
                    genre TEXT,
                    rating TEXT,
                    movie_url TEXT
                )
            ''')
            self.connection.commit()
        except sqlite3.OperationalError:
            pass

    def close_spider(self, spider):
        self.connection.close()

    def process_item(self, item, spider):
        self.c.execute("""
                INSERT INTO best_movies (title,year,duration,genre,rating,movie_url) values(?,?,?,?,?,?)
            """,(
                item.get('title'),
                item.get('year'),
                item.get('duration'),
                ','.join(item.get('genre')),
                item.get('rating'),
                item.get('movie_url')
            ))
        self.connection.commit()
        return item
```

#### exception
``` py
# sqlite3 example
import sqlite3

self.connection = sqlite3.connect("imdb.db")
self.c = self.connection.cursor()
try:
    self.c.execute('''
        CREATE TABLE best_movies(
            title TEXT,
            year TEXT,
            duration TEXT,
            genre TEXT,
            rating TEXT,
            movie_url TEXT
        )
    ''')
    self.connection.commit()
except sqlite3.OperationalError:
    pass

# check json format
def is_json(myjson):
  try:
    json.loads(myjson)
  except ValueError as e:
    return False
  return True
```

### Packages
#### w3lib - A Python library of web-related functions
``` py
# add for splash user+password(run Aquarium)
from w3lib.http import basic_auth_header
yield SplashRequest(
    url= abs_url,
    endpoint='execute',
    callback= self.parse_summary,
    args = {
        'lua_source': self.script
    },
    meta = {
        'cat': category,
        'fea': features,
        'pri': price,
        'city': city,
        'url': abs_url
    },
    # add for splash user+password(run Aquarium)
    splash_headers={
        'Authorization': basic_auth_header('user', 'userpass')
    }
)

# remove html tag
from w3lib.html import remove_tags
def remove_html(self, review_summary):
    cleaned_review_summary = ''
    try:
        cleaned_review_summary = remove_tags(review_summary)
    except TypeError:
        cleaned_review_summary = 'No reviews'
    return cleaned_review_summary
```

### Ref
+ [python time module](https://docs.python.org/3/library/time.html)
+ [使用 WITH AS](https://openhome.cc/Gossip/Python/WithAs.html)
+ [讀寫JSON數據](http://python3-cookbook.readthedocs.io/zh_CN/latest/c06/p02_read-write_json_data.html)
+ [set() 函数](https://www.runoob.com/python/python-func-set.html)
+ [DB Browser for SQLite](https://sqlitebrowser.org/dl/)
+ [Regular expression operations](https://docs.python.org/3/library/re.html#re.compile)
+ [chercher.tech](https://chercher.tech/)
+ [Python SQLite tutorial using sqlite3](https://pynative.com/python-sqlite/)