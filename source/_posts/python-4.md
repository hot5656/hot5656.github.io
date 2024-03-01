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

# one line if
def is_even(n)
		return True if n % 2 == 0 else False
```

``` py
# match
name = input("What's your name? ")

match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffidor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who?")
# What's your name? Ron
# Gryffidor
# What's your name? Ted
# Who?
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

# not need variable
for _ in range(3):
    print("meow")

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

# return multiple value(return tuple)
def get_student():
    name = input("Name: ")
    house = input("House: ")
    return (name, house)
# name , house = get_student()
# print(f"{name} from {house}")
student = get_student()
print(f"{student[0]} from {student[1]}")

# default parameter
def hello(to="world"):
    print("hello,", to)
hello()
name = input("What's your name?")
hello(name)
# hello, world
# What's your name?Robert 
# hello, Robert
```

#### classes
##### example
``` py 
# simple 
class Student:
    ...

def main():
    student = get_student()
    print(f"{student.name} from {student.house}")

def get_student():
    student = Student()
    student.name = input("Name: ")
    student.house = input("House: ")
    return student

if __name__ == "__main__":
    main()
```

``` py
#　example
class Student:
    def __init__(self, name, house):
        # 因內部呼叫也會呼叫 .house(), __init__ 所以不用 check
        # if house not in ["Gryffindor", "Hufflenuff", "Ravenclaw", "Slytherin"]:
        #     raise ValueError("Invalid house")
        self.name = name
        self.house = house
    def __str__(self):
        return f"{self.name} from {self.house}"

    @property # _name's getter
    def name(self):
        # 因 function house same as variable house所以 variable 改為 _house
        return self._name

    @name.setter # _name's setter
    def name(self,name):
        # 'not name' same as 'name == ""'
        if not name:
            raise ValueError("Missing name")
        self._name = name

    @property # _house's getter
    def house(self):
        # 因 function house same as variable house所以 variable 改為 _house
        return self._house

    @house.setter # _house's setter
    def house(self,house):
        if house not in ["Gryffindor", "Hufflenuff", "Ravenclaw", "Slytherin"]:
            raise ValueError("Invalid house")
        # 因 function house same as variable house所以 variable 改為 _house
        self._house = house

def main():
    student = get_student()
    # _variable mean private, no modify it(but it can change)
    # student._house = "Taipei"
    print(student)


def get_student():
    name = input("Name: ")
    house = input("House: ")
    return Student(name, house)

if __name__ == "__main__":
    main()
```

##### class method
``` py
# class method
# hat.py
import random

class Hat:
    houses = ["Gryffindor", "Hufflenuff", "Ravenclaw", "Slytherin"]

    # class method
    @classmethod
    # cls class 簡寫
    def sort(cls, name):
        print(name, "is in", random.choice(cls.houses))

Hat.sort("Harry")
```

``` py
# class method - create instance
# students.py
class Student:
    def __init__(self, name, house):
        self.name = name
        self.house = house

    def __str__(self):
        return f"{self.name} from {self.house}"

    @classmethod
    def get(cls):
        name = input("Name: ")
        house = input("House: ")
        return cls(name, house)

def main():
    student = Student.get()
    print(student)

if __name__ == "__main__":
    main()
```

##### inheritance
``` py
# inheritance
# wizard.py

class Wizard:
    def __init__(self, name):
        if not name:
            raise ValueError("Missing name")
        self.name = name

class Student(Wizard):
    def __init__(self, name, house):
        # call parent class __init__()
        super().__init__(name)
        self.house = house

class Professor(Wizard):
    # call parent class __init__()
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject

wizard = Wizard("Albus")
student = Student("Harry", "Gryffindor")
processor = Professor("Severus", "Defense Against the Dark Arts")
```

##### operation overload
``` py
# operation overload
# vault.py
class Vault:
    def __init__(self, galleous=0, sickles=0, knuts=0):
        self.galleous = galleous
        self.sickles = sickles
        self.knuts = knuts

    def __str__(self):
        return f"{self.galleous} galleous, {self.sickles} sickles,{self.knuts} knuts"

    def __add__(self, other):
        galleous = self.galleous + other.galleous
        sickles = self.sickles + other.sickles
        knuts = self.knuts + other.knuts
        return Vault(galleous, sickles, knuts)

potter = Vault(100, 50,25)
print(potter)
ron = Vault(25, 50, 100)
print(ron)
total = potter + ron
print(total)
```

#### 非被引用才執行
``` python
def main():
    name = input("What's your name?")
    hello(name)

def hello(to="world"):
    print("hello,", to)

# 非被引用才執行
if __name__ == '__main__':
    main()
```

#### create library
``` py
# sayings.py

def main():
    hello("world")
    goodbye("world")

def hello(name):
    print(f"hello, {name}")

def goodbye(name):
    print(f"goodbye, {name}")

if __name__ == "__main__":
    main()
```

``` py
# say.py

import sys
from sayings import hello

if len(sys.argv) == 2:
    hello(sys.argv[1])
```

``` bash
python say.py Robert
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

# change list process sequence
numbers = [3,5,7,9,11]
for number in numbers[len(numbers)::-1]:
    print(number)
# 11
# 9
# 7
# 5
# 3
```

#### tuple - 不能修改的List

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

# case 2
students = {
    "Harry":"Gryffidor",
    "Hermione":"Gryffidor",
    "Ron":"Gryffidor",
    "Draco":  "Slytherin"
}

for student in students:
    print(student, students[student], sep=", ")
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

#### if + assign value
``` py
import re

name = input("What's your name? ").strip()
# if matches := ...
if matches := re.search(r"^(.+), *(.+)$", name):
    name = matches.group(2) + ' ' + matches.group(1)
print(f"hello, {name}")
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

#### code style
``` bash
# install
pip3 install black
# convert house.py meet PEP 8(auto)
black house.py

# another for code style
#pip3 install pylint
```

#### set()
``` py
# set() : 儲存不重複
# houses.py
students = [
    {"name": "Harry", "house": "Gryffidor"},
    {"name": "Hermione", "house": "Gryffidor"},
    {"name": "Ron", "house": "Gryffidor"},
    {"name": "Draco", "house": "Slytherin"},
    {"name": "Padma", "house": "Ravenclaw"},
]

houses = set()
for student in students:
    houses.add(student["house"])

for house in sorted(houses):
    print(house)
```

#### global - 在 function global variable 內寫入時要加 global variable
``` py
# bank.py
balance = 3

def main():
    print("Balance:", balance)
    deposit(100)
    withdraw(50)
    print("Balance:", balance)

def deposit(n):
    global balance
    balance += n

def withdraw(n):
    global balance
    balance -= n

if __name__ == "__main__":
    main()
```

#### constant - 大寫表常數,但使用上還是可以被更改
``` py
# constant
MEOWS = 3
for _ in range(MEOWS):
    print("meow")
```

``` py
# constant
class Cat:
    MEOWS = 3

    def meow(self):
        for _ in range(Cat.MEOWS):
            print("meow")

cat = Cat()
cat.meow()
```

#### unpack - *:list, **:dict., (*args, **kwargs): multi parameter
``` py
# unpack.py
def total(galleons, sickles, knuts):
    return (galleons * 17 + sickles) *29 + knuts

coins = [100, 50, 25]
# * unpack list
print(total(*coins), "Knuts")

# python unpack.py
#   50775 Knuts
```

``` py
# unpack.py
def total(galleons, sickles, knuts):
    return (galleons * 17 + sickles) *29 + knuts

coins = {"galleons": 100, "sickles": 50, "knuts": 25}
# ** unpack dict
print(total(**coins), "Knuts")

# python unpack.py
#   50775 Knuts
```

``` py
# unpack.py
def f(*args, **kwargs):
    print("Positional:", args)
    print("named:", kwargs)

f(100, 50, 25)
# return turple
# Positional: (100, 50, 25)
# named: {}
f(100)
# Positional: (100,)
# named: {}

f(galleons=100, sickles=50, knuts=25)
# Positional: ()
# return dict
# named: {'galleons': 100, 'sickles': 50, 'knuts': 25}

def print_mine(*args, **kwargs):
    print("Positional:", args)
    print("named:", kwargs)
print_mine("This", "is", "CS50", sep='_', end='*')
# Positional: ('This', 'is', 'CS50')
# named: {'sep': '_', 'end': '*'}
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
# print(*objects, sep=' ', end='\n', file=None, flush=False)
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

# int add ,
z = 1023
print(f"{z:,}")
# 1,023

# float print format
z = 2/3
print(z)
# 0.6666666666666666
print(f"{z:.2f}")
# 0.67
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
# sorted(iterable, /, *, key=None, reverse=False)
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

#### Unit test - pytest
##### case 1
``` py
# calculator.py
def main():
    x = int(input("What's x?"))
    print("x squared is", square(x))

def square(n):
    # return n * n
    return n + n

if __name__ == "__main__":
    main()
```

``` py
# test_calculator.py
import pytest
from calculator import square

def test_positive():
    assert square(2) == 4
    assert square(3) == 9

def test_nagative():
    assert square(-2) == 4
    assert square(-3) == 9

def test_zero():
    assert square(0) == 0

def test_str():
    with pytest.raises(TypeError):
        square("cat")
```

``` bash
pytest .\test_calculator.py
========================================================================= test session starts ==========================================================================
platform win32 -- Python 3.11.0, pytest-8.0.1, pluggy-1.4.0
rootdir: D:\work\run\python\python_100ds\cs50p
collected 4 items                                                                                                                                                        
test_calculator.py ....                                                                                                                                           [100%] 
========================================================================== 4 passed in 0.01s ===========================================================================

pytest .\test_calculator.py
========================================================================= test session starts ==========================================================================
platform win32 -- Python 3.11.0, pytest-8.0.1, pluggy-1.4.0
rootdir: D:\work\run\python\python_100ds\cs50p
collected 4 items
test_calculator.py FF.F                                                                                                                                           [100%]
=============================================================================== FAILURES =============================================================================== 
____________________________________________________________________________ test_positive _____________________________________________________________________________ 
    def test_positive():
        assert square(2) == 4
>       assert square(3) == 9
E       assert 6 == 9
E        +  where 6 = square(3)

test_calculator.py:7: AssertionError
____________________________________________________________________________ test_nagative _____________________________________________________________________________ 
    def test_nagative():
>       assert square(-2) == 4
E       assert -4 == 4
E        +  where -4 = square(-2)

test_calculator.py:10: AssertionError
_______________________________________________________________________________ test_str _______________________________________________________________________________ 
    def test_str():
>       with pytest.raises(TypeError):
E       Failed: DID NOT RAISE <class 'TypeError'>

test_calculator.py:17: Failed
======================================================================= short test summary info ======================================================================== 
FAILED test_calculator.py::test_positive - assert 6 == 9
FAILED test_calculator.py::test_nagative - assert -4 == 4
FAILED test_calculator.py::test_str - Failed: DID NOT RAISE <class 'TypeError'>
===================================================================== 3 failed, 1 passed in 0.15s ======================================================================
```

##### case 2
``` py
# hello.py
def main():
    hello()
    name = input("What's your name?")
    print(hello(name))

def hello(to="world"):
    return(f"hello, {to}")

if __name__ == '__main__':
    main()
```

``` py
# test_hello.py
from hello import hello

def test_default():
    assert hello() == "hello, world"

def test_argument():
        assert hello("Robert") == "hello, Robert"
```

``` bash
PS D:\work\run\python\python_100ds\cs50p> pytest .\test_hello.py
========================================================================= test session starts ==========================================================================
platform win32 -- Python 3.11.0, pytest-8.0.1, pluggy-1.4.0
rootdir: D:\work\run\python\python_100ds\cs50p
collected 2 items
test_hello.py ..                                                                                                                                                  [100%] 
========================================================================== 2 passed in 0.07s =========================================================================== 
```

##### multi test
``` bash
mkdir test
cp .\test_hello.py  .\test\
# __init__.py 保持空白即可
code test/__init__.py
cp .\test_calculator.py .\test\
pytest test
========================================================================= test session starts ==========================================================================
platform win32 -- Python 3.11.0, pytest-8.0.1, pluggy-1.4.0
rootdir: D:\work\run\python\python_100ds\cs50p
collected 6 items
test\test_calculator.py ....                                                                                                                                      [ 66%]
test\test_hello.py ..                                                                                                                                             [100%]
========================================================================== 6 passed in 0.23s =========================================================================== 
```

### Built-in function

#### simple function
``` py
abs(x)
```

#### round
``` py
# round(number, ndigits=None)¶
# 4捨5入
x = round(5.76543, 2)
print(x)
# 5.77
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

#### argparse
``` py
# meows.py
import argparse

# add description for meows.py
parser = argparse.ArgumentParser(description="Meow like a cat")
# add -n's parameter help
# add default value
# auto convert parameter to int
parser.add_argument("-n", default=1, help="number of times to meow", type=int)
args = parser.parse_args()

for _ in range(args.n):
    print("meow")

# python .\meows.py -h
#    usage: meows.py [-h] [-n N]
#    Meow like a cat
#    options:
#      -h, --help  show this help message and exit
#      -n N        number of times to meow
```

#### map, list comprehensions
``` py
# map, list comprehensions
# yell.py
def main():
    yell("This", "is", "CS50")
    yell2("This", "is", "CS50")

def yell(*words):
    uppercased = map(str.upper, words)
    print(type(uppercased))
    print(uppercased)
    print(*uppercased)


# list comprehensions
def yell2(*words):
    uppercased = [word.upper() for word in words]
    print(*uppercased)

if __name__ == "__main__":
    main()
```

#### filetr
``` py
# filter
# gryffindors.py
students = [
    {"name": "Hermione", "house": "Gryffindor"},
    {"name": "Harry", "house": "Gryffindor"},
    {"name": "Ron", "house": "Gryffindor"},
    {"name": "Draco", "house": "Slytherin"},
]

def is_gryffindor(s):
    # print(s, s["house"], s["house"] == "Gryffindor")
    return s["house"] == "Gryffindor"

# gryffindors = filter(is_gryffindor, students)
# for gryffindor in sorted(gryffindors, key=lambda s: s["name"]):
#     print(gryffindor["name"])

# gryffindors = [student["name"] for student in students if student["house"] == "Gryffindor"]
# for gryffindor in sorted(gryffindors):
#     print(gryffindor)

gryffindors = filter(lambda s: s["house"] == "Gryffindor", students)
for gryffindor in sorted(gryffindors, key=lambda s: s["name"]):
    print(gryffindor["name"])

# Harry
# Hermione
# Ron
```

#### dictionary comprehensions
``` py
# dictionary comprehensions
# gryffindors.py
students = ["Hermione", "Harry", "Ron"]
gryffindors = [{"name": student, "house": "Gryffindor"} for student in students]
print(gryffindors)
# [{'name': 'Hermione', 'house': 'Gryffindor'}, {'name': 'Harry', 'house': 'Gryffindor'}, {'name': 'Ron', 'house': 'Gryffindor'}]
```

``` py
students = ["Hermione", "Harry", "Ron"]
gryffindors = {student: "Gryffindor" for student in students}
print(gryffindors)
# {'Hermione': 'Gryffindor', 'Harry': 'Gryffindor', 'Ron': 'Gryffindor'}
```

#### enumerate
``` py
# enumerate
# gryffindors.py
students = ["Hermione", "Harry", "Ron"]
for i, student in enumerate(students):
    print(i + 1, student)
```

#### generators - yield
```  py
# generators
# sleep.py
def main():
    n = int(input("What's n? "))
    for s in sheep(n):
        print(s)

# 1000000 can not run
# def sheep(n):
#     flock = []
#     for i in range(n):
#         flock.append("🐏" * i)
#     return flock

# generators - yield
def sheep(n):
    for i in range(n):
        yield "🐏" * i

if __name__ == "__main__":
    main()
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
# simple case
while True:
    try:
        x = int(input("What's x? "))
    except ValueError:
				pass
        # print("x is not an integer")
    else:
        break

print(f"x is {x}")
```

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
# sys — System-specific parameters and functions
# random — Generate pseudo-random numbers
# statistics — Mathematical statistics functions

# requests
# pytest : for unite test
pip3 install pytest
# pillow
pip3 install pillow

# mypy
pip3 install mypy - 型別檢查器

# cowsay
pip3 install
# pyttsx3 - 文字轉語音(Text To Speech)
pip3 install pyttsx3 
```

#### sys
``` py
# sys module
from sys import argv
if len(argv) == 2:
    print(f"hello, {argv[1]}")
else:
    print("hello, world")
from sys import argv
# sys module - 2
for i in range(len(argv)):
    print(argv[i])
# ----------------
for arg in argv:
    print(arg)
# sys module - 3
import sys
if len(sys.argv) != 2:
    print("Missing command-line argument")
    sys.exit(1)
print(f"hello, {sys.argv[1]}")
sys.exit(0)
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
## students.csv
# home,name
# "Number Four, Privet Drive", Harry
# The Burrow,Ron
# Malfory MAnor,Draco

# students.py
import csv

students = []

with open("students.csv") as file:
    reader = csv.DictReader(file)
    for row in reader:
        students.append({"name": row["name"], "home": row["name"]})

for student in sorted(students, key=lambda student: student["name"]):
    print(f"{student['name']} is from {student['home']}")

# python students.py
# 	Harry is from  Harry
# 	Draco is from Draco
# 	Ron is from Ron
```

``` py
# students.py - csv write
import csv
import os

file_path = "students.csv"

name = input("What's your name? ")
home = input("Where's your from? ")

if not os.path.exists(file_path):
    with open(file_path, "w", newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['name', 'home'])

with open(file_path, "a", newline='') as file:
    writer = csv.writer(file)
    writer.writerow([name, home])

# python students.py
# 	What's your name? Harry
# 	Where's your from? Number Four, Privet Drive
# python students.py
# 	What's your name? Ron                      
# 	Where's your from? The Burrow

# # student.csv
# name,home
# Harry,"Number Four, Privet Drive"
# Ron,The Burrow
#
```

``` py
# students.py - csv write by DictWriter
import csv
import os

file_path = "students.csv"

name = input("What's your name? ")
home = input("Where's your from? ")

if not os.path.exists(file_path):
    with open(file_path, "w", newline='') as file:
        writer = csv.DictWriter(file, fieldnames=["name", "home"])
        writer.writeheader()

with open(file_path, "a", newline='') as file:
    writer = csv.DictWriter(file, fieldnames=["name", "home"])
    writer.writerow({"name": name, "home": home})

# python students.py
# 	What's your name? Harry
# 	Where's your from? Number Four, Privet Drive
# python students.py
# 	What's your name? Ron                      
# 	Where's your from? The Burrow

# # student.csv
# name,home
# Harry,"Number Four, Privet Drive"
# Ron,The Burrow

```

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

#### requests 
##### install
``` bash
pip3 install requests

# list requests
pip3 list | grep requests
	requests                     2.31.0
	requests-oauthlib            1.3.1
```

##### get tunes song
``` py 
# python itunes.py weezer
import requests
import sys
import json

if len(sys.argv) != 2:
    sys.exit()

response = requests.get("https://itunes.apple.com/search?entity=song&limit=50&term=" + sys.argv[1])
# print(json.dumps(response.json(), indent=2))

o = response.json()
for result in o["results"]:
    print(result["trackName"])
```

#### Pillow
##### costume1.gif
<div style="max-width:100px">
	<img src="costume1.gif" width = "100">
</div>

##### costume2.gif
<div style="max-width:100px">
	<img src="costume2.gif" width = "100"">
	</div>

##### costumes.gif
<div style="max-width:100px">
	<img src="costumes.gif" width = "100">
</div>

##### costume.py
``` py
import sys
from PIL import Image

images = []

for arg in sys.argv[1:]:
    image = Image.open(arg)
    images.append(image)

# loop=0 --> loop forever
images[0].save(
    "costumes.gif", save_all=True, append_images=[images[1]], duration=200, loop=0
)
```

##### generate costumes.gif
``` bash
 python costumes.py costume1.gif costume2.gif
```

#### re - regular expression
##### example 
``` py
# validate.py
import re

# .: any character except a newline
# *: 0 or more repetitions
# +: 1 or more repetitions
# ?: 0 or 1 repetition
# {m}: m repetitions,o{2} 含 "oo"
# {m,n}: m-n repetitions
# ^: matches the start of the string
#    ^插入符號是比對前開頭,比如你輸入的搜尋條件是  ^eat，那麼你會搜尋到的結果會有 eat、eaten
# $: matchs the end or the string just before the newline at the end of the string
#    $ 錢字符號則是比對結尾,如果是 eat$，那麽搜尋到的結果可能是 creat、peat、leat
# []: set of characters(包含)
# [^]: complementing the set(不包含)
# \w: [a-zA-Z0-9_]
# \W: [^a-zA-Z0-9_]
# \d: [0-9]
# \D: [^0-9]
# \s: [ \r\t\n\f]
# \S: [^ \r\t\n\f]
# A|B: either A or B
# (...) : group
# (?:...): non-capturing version

# re.IGNORECASE : ignore case
# re.MULTILINE: multiple line
# re.DOTALL


# re.search(pattern, string, flags=0)
email = input("What's your email? ").strip()
# if re.search(r"^[^@ ]+@[^@]+\.(edu|com|gov|net|org)$", email):
if re.search(r"^\w+@\w+\.edu$", email, re.IGNORECASE):
    print("Valid")
else:
    print("Invalid")
```

##### capture
``` py
# format.py
# re capture
import re

name = input("What's your name? ").strip()
# matches = re.search(r"^(.+), *(.+)$", name)
# if matches:
#     last, first = matches.groups()
#     name = f"{first} {last}"
if matches := re.search(r"^(.+), *(.+)$", name):
    name = matches.group(2) + ' ' + matches.group(1)
print(f"hello, {name}")

# python .\format.py
#  What's your name? Robert Kao
#  hello, Robert Kao
# python .\format.py
#  What's your name? Kao,Robert
#  hello, Robert Kao
```

##### get twitter name from URL
``` py
# twitter.py
import re

# (?:...): non-capturing version

url = input("URL:").strip()

# 對不照格式輸入無效
username = re.sub(r"^(?:https?://)?(?:www\.)?twitter\.com/", "", url)
print(f"re.sub Username: {username}")

if matches := re.search(r"^(?:https?://)?(?:www\.)?twitter\.com/([a-z0-9_]+)$", url, re.IGNORECASE):
    print(f"re.research Username: {matches.group(1)}")

# python twitter.py
# URL:http://www.twitter.com/robert
# re.sub Username: robert
# re.research Username: robert
#
# python twitter.py
# URL:www.google.com
# re.sub Username: www.google.com
```

#### mypy
``` py
# meows.py
# add type define 
def meow(n: int):
        for _ in range(n):
            print("meow")

# slaso support add type define to variable
number: int = input("Number:")
meow(number)

# mypy meows.py
# 	meows.py:7: error: Argument 1 to "meow" has incompatible type "str"; expected "int"  [arg-type]
# 	Found 1 error in 1 file (checked 1 source file)

# meows.py -2
# define return str
def meow(n: int) -> str:
        return "meow\n" * n
number: int = int(input("Number:"))
neows: str = meow(number)
print(neows)
```

#### [Docstring](https://peps.python.org/pep-0257/) : just prepare for gernerate document
``` py
# meows.py
def meow(n: int) -> str:
    # meow n times
    """
    Meow n times.

    :param n: Number of times to meow
    :type n: int
    :raise TypeError: If n is not an int
    :return: A string of n meows, one per line
    :rtype: str
    """
    return "meow\n" * n

number: int = int(input("Number:"))
neows: str = meow(number)
print(neows)
```

#### coesay + audio 
``` py
# say.py
import cowsay
import pyttsx3

engine = pyttsx3.init()
this = input("What's this? ")
cowsay.cow(this)
engine.say(this)
engine.runAndWait()

# python say.py
#     What's this? This is cs50
#     ____________
#     | This is cs50 |
#     ============
#                 \
#                 \
#                 ^__^
#                 (oo)\_______
#                 (__)\       )\/\
#                     ||----w |
#                     ||     ||

```

### Ref
+ [python time module](https://docs.python.org/3/library/time.html)
+ [Regular expression operations](https://docs.python.org/3/library/re.html#re.compile)
+ [Python Exception](https://docs.python.org/3/library/exceptions.html)
+ [Python Built-in Functions](https://docs.python.org/3/library/functions.html)
+ [Regular expression operations](https://docs.python.org/3/library/re.html)
+ [Classes](https://docs.python.org/3/tutorial/classes.html)
+ [class int](https://docs.python.org/3/library/functions.html#int)
+ [class list](https://docs.python.org/3/library/stdtypes.html#list)
+ [ Parser for command-line arguments](https://docs.python.org/3/library/argparse.html)
+ [Data model:Special method names](https://docs.python.org/3/reference/datamodel.html#specialnames)
+ [enumerate](https://docs.python.org/3/library/functions.html#enumerate)
+ [map](https://docs.python.org/3/library/functions.html#map)
+ [filter](https://docs.python.org/3/library/functions.html#filter)
+ [Python requests](https://pypi.org/project/requests/)
+ [PEP 8](https://peps.python.org/pep-0008/)
+ [pycodestyle](https://pycodestyle.pycqa.org/en/latest/)
+ [pytest](https://docs.pytest.org/en/8.0.x/)
+ [Pillow](https://pillow.readthedocs.io/en/stable/)
+ [mypy](https://mypy.readthedocs.io/en/stable/)
+[Docstring](https://peps.python.org/pep-0257/)
+ [使用 WITH AS](https://openhome.cc/Gossip/Python/WithAs.html)
+ [讀寫JSON數據](http://python3-cookbook.readthedocs.io/zh_CN/latest/c06/p02_read-write_json_data.html)
+ [set() 函数](https://www.runoob.com/python/python-func-set.html)
+ [DB Browser for SQLite](https://sqlitebrowser.org/dl/)
+ [chercher.tech](https://chercher.tech/)
+ [Python SQLite tutorial using sqlite3](https://pynative.com/python-sqlite/)
+ [TensorFlow](https://playground.tensorflow.org/)
