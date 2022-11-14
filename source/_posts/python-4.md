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

#### library
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

# write
with open('gossiping.json', 'w', encoding='UTF-8') as file:
    # ensure_ascii=False 輸出中文
    # sort_keys=True 按 key 順序排列
    json.dump(articles, file, indent=2, sort_keys=True, ensure_ascii=False)
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
```


### Ref
+ [python time module](https://docs.python.org/3/library/time.html)
+ [使用 WITH AS](https://openhome.cc/Gossip/Python/WithAs.html)
+ [讀寫JSON數據](http://python3-cookbook.readthedocs.io/zh_CN/latest/c06/p02_read-write_json_data.html)
+ [set() 函数](https://www.runoob.com/python/python-func-set.html)
+ [DB Browser for SQLite](https://sqlitebrowser.org/dl/)
+ [Regular expression operations](https://docs.python.org/3/library/re.html#re.compile)