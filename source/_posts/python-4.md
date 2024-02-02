---
title: Python 說明
abbrlink: d0e4
date: 2021-04-16 13:56:31
categories: Coding
tags:
	- python
---

### setup
``` bash
# check which python 
python -c "import sys; print(sys.executable)"
	D:\app\Python310\python.exe

# chick install package 
pip3 list  
	Package            Version
	------------------ ------------
	apricot-select     0.6.1
	attrs              20.3.0
	....
# change env for python
# run by cmd
D:\app\python_env\myenv11_01\Scripts\activate.bat
```

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

``` bash
>>> type(3.5)
	<class 'float'>
>>> float(5)
	5.0 
>>> int(3.5)
	3   
>>> print(type(3))
	<class 'int'>
>>> 10/3
	3.3333333333333335
# 整數
>>> 10//3
	3
>>> 10%3
	1
>>> 2**3
	8
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

for n in range(5):
    ...
for I in range(7,10):
    ...
for I in range(5,11,2):
    ...
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

# replace 
image_name = post.get('titleImage').get('asset').get('_ref').replace('image-', '').replace('-', '.')
```

``` bash
greet = "hi" + " " + " " + "Robert"
3 * "eric"
len("eric")
"eric"[0]
"eric"[1:ˇ2]
"eric"[:3]
"eric"[1:]
"eric"[:]

x = 1
x_str = str(x)
```

#### array/list
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

# list strip
new_tags = [item.strip() for item in tags]

# list for generate
article_upvotes =[int(score.text.split()[0]) for score in soup.find_all("span", class_='score')]

# for reverse
for movie in reversed(movies):
    file.write(f"{movie.text}\n")

#get index
largest_number = max(article_upvotes)
largest_index = article_upvotes.index(largest_number)

# change array process sequence
numbers = [3,5,7,9,11]
for number in numbers[len(numbers)::-1]:
    print(number)
# 11
# 9
# 7
# 5
# 3
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

### syntax
####  anonymous functions
``` py
    testGreedy(foods, maxUnits,
               lambda x: 1/Food.getCost(x))
```

``` bash
>>> f1 = lambda x: x
>>> f1(2)
2

>>> f2 = lambda x,y: x + y
>>> f2("Jery", "Tom")
'JeryTom'

>>> f3 = lambda x,y: 'factor' if (x%y ==0) else 'not factor'
>>> f3(4,2)
'factor'
>>> f3(4,3) 
'not factor'
```

####  class print function : __string__
``` py
class Food(object):
    def __init__(self, n, v, w):
        self.name = n
        self.value = v
        self.calories = w
    def getValue(self):
        return self.value
    def getCost(self):
        return self.calories
    def density(self):
        return self.getValue()/self.getCost()
    def __str__(self):
        return self.name + ': <' + str(self.value)\
                 + ', ' + str(self.calories) + '>'
```

#### @classmethod
``` py
class MyClass:
    class_variable = "I am a class variable"

    def __init__(self, instance_variable):
        self.instance_variable = instance_variable

    # Regular instance method
    def instance_method(self):
        print(f"Instance method called with instance variable: {self.instance_variable}")

    # Class method decorated with @classmethod
    @classmethod
    def class_method(cls):
        print(f"Class method called with class variable: {cls.class_variable}")

# Creating an instance of MyClass
obj = MyClass("I am an instance variable")

# Calling the instance method
obj.instance_method()

# Calling the class method
MyClass.class_method()

# class_method is a class method decorated with @classmethod. It can only access class variables, not instance variables. The first parameter, conventionally named cls, refers to the class itself.
```

#### dict - key by tuple
``` py
self.q = dict()
self.q[tuple(state), action] = new_q

def get_q_value(self, state, action):
    """
    Return the Q-value for the state `state` and the action `action`.
    If no Q-value exists yet in `self.q`, return 0.
    """
    try:
        return self.q[tuple(state), action]
    except KeyError:
        return 0

# other exception
for move in moves:
    try:
        q = self.q[tuple(state), move]
    except:
        q = 0
```

#### assert 
``` py
def divide(a, b):
    # 若條件成立產生中斷
    assert b != 0, "Division by zero is not allowed"
    return a / b
# AssertionError: Division by zero is not allowed

# 無條件產生中斷
assert False
# AssertionError
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

#### sorted
``` py
def buildMenu(names, values, calories):
    """names, values, calories lists of same length.
       name a list of strings
       values and calories lists of numbers
       returns list of Foods"""
    menu = []
    for i in range(len(values)):
        item = Food(names[i], values[i], calories[i])
        menu.append(Food(names[i], values[i],
                          calories[i]))
    return menu

def greedy(items, maxCost, keyFunction):
    itemsCopy = sorted(items, key = keyFunction,
                       reverse = True)


names = ['wine', 'beer', 'pizza', 'burger', 'fries',
         'cola', 'apple', 'donut', 'cake']
values = [89,90,95,100,90,79,50,10]
calories = [123,154,258,354,365,150,95,195]
foods = buildMenu(names, values, calories)
testGreedy(foods, 1000, Food.getValue)
```

#### zip
``` py
# example 
a = ("John", "Charles", "Mike")
b = ("Jenny", "Christy", "Monica")
x = zip(a, b)
print(tuple(x))
# (('John', 'Jenny'), ('Charles', 'Christy'), ('Mike', 'Monica'))

# run
for actual, predicted in zip(y_testing, predictions):
    ....
```

#### copy
``` py
# copy to new variable
state = game.piles.copy()
```

#### items
``` py
# self.q.items() returns a view of the dictionary's key-value pairs,
class MyClass:
    def __init__(self):
        # Assume self.q is a dictionary
        self.q = {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'}

    def iterate_dictionary(self):
        # Using .items() to iterate over keys and values
        for key, value in self.q.items():
            print(f'Key: {key}, Value: {value}')

# Creating an instance of MyClass
obj = MyClass()

# Calling the method to iterate over the dictionary
obj.iterate_dictionary()
```

#### tuple - list --> tuple
``` py
q = self.q[tuple(state), move]
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

#### simple function
``` py
abs(x)
```

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

# generate dirctory
path = os.path.join(keyword)
os.mkdir(path)
save_as = os.path.join(path, f"{keyword}{count}.jpg")
wget.download(pic.get_attribute('src'), save_as)
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

#### urllib - dowload file
``` py
import urllib
import os

def image_download(self, url, name, folder):
    dir=os.path.abspath(folder)
    work_path=os.path.join(dir,name)
    print(f"-->{name}")
    # urllib.request.urlretrieve(url, work_path)
```
#### random
``` py
import random

def rollDie():
    """returns a random int between 1 and 6"""
    return random.choice([1,2,3,4,5,6])
 
def testRoll(n = 10):
    result = ''
    for i in range(n):
        result = result + str(rollDie())
    print(result)

# 可使每次模擬都一樣
random.seed(0)

def runSim(goal, numTrials):
    total = 0
    for i in range(numTrials):
        result = ''
        for j in range(len(goal)):
            result += str(rollDie())
        if result == goal:
            total += 1
    print('Actual probability =',
          round(1/(6**len(goal)), 8)) 
    estProbability = round(total/numTrials, 8)
    print('Estimated Probability  =',
          round(estProbability, 8))
    
runSim('11111', 1000)		
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
#### list
``` bash
# SciPy Python : 演算法庫和數學工具包
pip3 install scipy
# python-constraint : 實現對有限域上處理 CSPs（(Constraint Solving Problems -約束求解問題）的支持
pip3 install python-constraint
# scikit-learn : Scikit-learn是用於Python程式語言的自由軟體機器學習庫。它包含了各種分類、回歸和聚類算法，包括多層感知器、支持向量機、隨機森林、梯度提升、k-平均聚類和DBSCAN，它被設計協同於Python數值庫NumPy和和科學庫SciPy。
pip3 install scikit-learn
# TensorFlow : 是一個開源軟體庫，用於各種感知和語言理解任務的機器學習。目前廣泛地用於研究和生產中，比如Google商業產品，如語音辨識、Gmail、Google 相簿和搜尋
pip3 install tensorflow
# pygame : 專為電子遊戲設計。包含圖像、聲音。建立在SDL基礎上，允許即時電子遊戲研發而無需被低階語言，如C語言或是更低階的組合語言束縛。
pip3 install pygame
# nltk : 自然語言工具包是一套用Python編寫的用於英語的自然語言處理的函式庫和程序。
# pylab : 將matplotlib的 pyplot 和 numpy 合併在一起
# import pylab as plt - not found pylab now
# Matplotlib : 用來繪圖、圖表呈現及數據表示非常重要的一個Package
# import matplotlib.pyplot as plt
pip install matplotlib
# NumPy : 支援高階大規模的多維陣列與矩陣運算，此外也針對陣列運算提供大量的數學函數函式庫。
pip3 install numpy
```
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

#### wget - downloa file
``` py
import os
import wget

# generate dirctory
path = os.path.join(keyword)
os.mkdir(path)

save_as = os.path.join(path, f"{keyword}{count}.jpg")
wget.download(pic.get_attribute('src'), save_as)
```

#### csv
``` py
import csv

evidence = []
labels = []
with open(filename) as f:
    reader = csv.reader(f)
		# jump 1st row
    next(reader)

    for row in reader:
        evidence.append([
            int(row[0]),
            float(row[1]),
            int(row[2]),
            float(row[3]),
            int(row[4]),
            float(row[5]),
            float(row[6]),
            float(row[7]),
            float(row[8]),
            float(row[9]),
            abbreviated_month_to_int(row[10]),
            int(row[11]),
            int(row[12]),
            int(row[13]),
            int(row[14]),
            1 if row[15] == 'Returning_Visitor' else 0,
            1 if row[16] == 'TRUE' else 0,
        ])
        labels.append(1 if row[-1] == 'TRUE' else 0)
```

#### matplotlib.pyplot
##### basic
``` py
# import pylab as plt
import matplotlib.pyplot as plt

mySamples = []
myLinear = []
myQuadratic = []
myCubic = []
myExponential = []

for i in range(0, 30):
    mySamples.append(i)
    myLinear.append(i)
    myQuadratic.append(i**2)
    myCubic.append(i**3)
    myExponential.append(1.5**i)

# first trial
plt.plot(mySamples, myLinear)
plt.plot(mySamples, myQuadratic)
plt.plot(mySamples, myCubic)
plt.plot(mySamples, myExponential)


# second trial
# 畫新圖
plt.figure('lin')
plt.plot(mySamples, myLinear)
plt.figure('quad')
plt.plot(mySamples, myQuadratic)
plt.figure('cube')
plt.plot(mySamples, myCubic)
plt.figure('expo')
plt.plot(mySamples, myExponential)

# third trial
plt.figure('lin')
# 設定 x, y label
plt.xlabel('sample points')
plt.ylabel('linear function')
plt.plot(mySamples, myLinear)
plt.figure('quad')
plt.plot(mySamples, myQuadratic)
plt.figure('cube')
plt.plot(mySamples, myCubic)
plt.figure('expo')
plt.plot(mySamples, myExponential)
plt.figure('quad')


# fourth trial
plt.figure('lin')
plt.plot(mySamples, myLinear)
plt.figure('quad')
plt.plot(mySamples, myQuadratic)
plt.figure('cube')
plt.plot(mySamples, myCubic)
plt.figure('expo')
plt.plot(mySamples, myExponential)
plt.figure('lin')
# add title
plt.title('Linear')
plt.figure('quad')
plt.title('Quadratic')
plt.figure('cube')
plt.title('Cubic')
plt.figure('expo')
plt.title('Exponential')

# fifth trial
plt.figure('lin')
# clear befor draw - 新的版本不需要
plt.clf()
plt.plot(mySamples, myLinear)
plt.figure('quad')
plt.clf()
plt.plot(mySamples, myQuadratic)
plt.figure('cube')
plt.clf()
plt.plot(mySamples, myCubic)
plt.figure('expo')
plt.clf()
plt.plot(mySamples, myExponential)
plt.figure('lin')
plt.title('Linear')
plt.figure('quad')
plt.title('Quadratic')
plt.figure('cube')
plt.title('Cubic')
plt.figure('expo')
plt.title('Exponential')

# sixth trial
plt.figure('lin')
plt.clf()
# 設定 y 的 limit
plt.ylim(0,1000)
plt.plot(mySamples, myLinear)
plt.figure('quad')
plt.clf()
plt.ylim(0,1000)
plt.plot(mySamples, myQuadratic)
plt.figure('lin')
plt.title('Linear')
plt.figure('quad')
plt.title('Quadratic')

# seventh trial
plt.figure('lin quad')
plt.clf()
# put 2 plot in a picture
plt.plot(mySamples, myLinear)
plt.plot(mySamples, myQuadratic)
plt.figure('cube exp')
plt.clf()
plt.plot(mySamples, myCubic)
plt.plot(mySamples, myExponential)
plt.figure('lin quad')
plt.title('Linear vs. Quadratic')
plt.figure('cube exp')
plt.title('Cubic vs. Exponential')

# eighth trial
plt.figure('lin quad')
plt.clf()
# add plot's label
plt.plot(mySamples, myLinear, label = 'linear')
plt.plot(mySamples, myQuadratic, label = 'quadratic')
plt.legend(loc = 'upper left')
plt.title('Linear vs. Quadratic')
plt.figure('cube exp')
plt.clf()
plt.plot(mySamples, myCubic, label = 'cubic')
plt.plot(mySamples, myExponential, label = 'exponential')
plt.legend()
plt.title('Cubic vs. Exponential')

# ninth trial
plt.figure('lin quad')
plt.clf()
# change display
# b,r,g : blue, red, green
# -,o,^,-- : 線,點,三角形,虛線
plt.plot(mySamples, myLinear, 'b-', label = 'linear')
plt.plot(mySamples, myQuadratic,'ro', label = 'quadratic')
plt.legend(loc = 'upper left')
plt.title('Linear vs. Quadratic')
plt.figure('cube exp')
plt.clf()
plt.plot(mySamples, myCubic, 'g^', label = 'cubic')
plt.plot(mySamples, myExponential, 'r--',label = 'exponential')
plt.legend()
plt.title('Cubic vs. Exponential')

# tenth trial
plt.figure('lin quad')
plt.clf()
# 設定寬度
plt.plot(mySamples, myLinear, 'b-', label = 'linear', linewidth = 2.0)
plt.plot(mySamples, myQuadratic,'r', label = 'quadratic', linewidth = 3.0)
plt.legend(loc = 'upper left')
plt.title('Linear vs. Quadratic')
plt.figure('cube exp')
plt.clf()
plt.plot(mySamples, myCubic, 'g--', label = 'cubic', linewidth = 4.0)
plt.plot(mySamples, myExponential, 'r',label = 'exponential', linewidth = 5.0)
plt.legend()
plt.title('Cubic vs. Exponential')

# eleventh trial
plt.figure('lin quad')
plt.clf()
# 2 row, 1 column - 1st
plt.subplot(211)
plt.ylim(0, 900)
plt.plot(mySamples, myLinear, 'b-', label = 'linear', linewidth = 2.0)
# 2 row, 1 column - 2nd
plt.subplot(212)
plt.ylim(0, 900)
plt.plot(mySamples, myQuadratic,'r', label = 'quadratic', linewidth = 3.0)
# 選 plot label 位置 左上
plt.legend(loc = 'upper left')
plt.title('Linear vs. Quadratic')
plt.figure('cube exp')
plt.clf()
# 1 row, 2 column - 1st
plt.subplot(121)
plt.ylim(0, 140000)
plt.plot(mySamples, myCubic, 'g--', label = 'cubic', linewidth = 4.0)
# 1 row, 2 column - 2nd
plt.subplot(122)
plt.ylim(0, 140000)
plt.plot(mySamples, myExponential, 'r',label = 'exponential', linewidth = 5.0)
# 選 plot label 位置 自動選
plt.legend()
plt.title('Cubic vs. Exponential')

# twelfth trial
plt.figure('cube exp log')
plt.clf()
plt.plot(mySamples, myCubic, 'g--', label = 'cubic', linewidth = 2.0)
plt.plot(mySamples, myExponential, 'r',label = 'exponential', linewidth = 4.0)
# y scale set by log
plt.yscale('log')
plt.legend()
plt.title('Cubic vs. Exponential')
plt.figure('cube exp linear')
plt.clf()
plt.plot(mySamples, myCubic, 'g--', label = 'cubic', linewidth = 2.0)
plt.plot(mySamples, myExponential, 'r',label = 'exponential', linewidth = 4.0)
plt.legend()
plt.title('Cubic vs. Exponential')

# show 圖
plt.show()
```

##### 複利繪圖
``` py
import matplotlib.pyplot as plt

# monthly : 每月儲存 dollars
# rate : 利率
# terms : 總月數
def retire(monthly, rate, terms):
    savings = [0]
    base = [0]
    monthlyRate = rate/12
    for i in range(terms):
        base += [i]
        savings += [savings[-1]*(1 + monthlyRate) + monthly]
    # 月份, all save money  list
    return base, savings

def displayRetirementWithMonthlies(monthlies, rate, terms):
    plt.figure('retireMonth')
    plt.clf()
    for monthly in monthlies:
        xvals, yvals = retire(monthly, rate, terms)
        plt.plot(xvals, yvals, label = 'retire:'+str(monthly))
        plt.legend(loc = 'upper left')

# change money
displayRetirementWithMonthlies([500, 600, 700, 800, 900, 1000, 1100], .05, 40* 12)

def displayRetirementWithRates(monthly, rates, terms):
    plt.figure('retireRate')
    plt.clf()
    for rate in rates:
        xvals, yvals = retire(monthly, rate, terms)
        plt.plot(xvals, yvals,
                 label = 'retire:'+str(monthly)+ ':' + str(int(rate*100)))
        plt.legend(loc = 'upper left')

# change rate
displayRetirementWithRates(800,[.03, .05, .07], 40*12)


def displayRetirementWithMonthsAndRates(monthlies, rates, terms):
    plt.figure('retireBoth')
    plt.clf()
    plt.xlim(30*12, 40*12)
    for monthly in monthlies:
        for rate in rates:
            xvals, yvals = retire(monthly, rate, terms)
            plt.plot(xvals, yvals,
                     label = 'retire:'+str(monthly)+ ':' + str(int(rate*100)))
            plt.legend(loc = 'upper left')

# change money + rate
displayRetirementWithMonthsAndRates([500, 700, 900, 1100],
                                       [.03, .05, .07], 40*12)


def displayRetirementWithMonthsAndRates2(monthlies, rates, terms):
   plt.figure('retireBoth2')
   plt.clf()
   plt.xlim(30*12, 40*12)
   monthLabels = ['r', 'b', 'g', 'k']
   rateLabels = ['-', 'o', '--', '^']
   for i in range(len(monthlies)):
       monthly = monthlies[i]
       monthLabel = monthLabels[i%len(monthLabels)]
       for j in range(len(rates)):
           rate = rates[j]
           rateLabel = rateLabels[j%len(rateLabels)]
           xvals, yvals = retire(monthly, rate, terms)
           plt.plot(xvals, yvals, monthLabel+rateLabel,
                    label = 'retire:'+str(monthly)+ ':' + str(int(rate*100)))
           plt.legend(loc = 'upper left')

# change money + rate : 不同圖形
displayRetirementWithMonthsAndRates2([500, 700, 900, 1100],
                                      [.03, .05, .07], 40*12)

plt.show()
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
+ [Python Exception](https://docs.python.org/3/library/exceptions.html)
+ [TensorFlow](https://playground.tensorflow.org/)