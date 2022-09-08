---
title: Python 說明
abbrlink: d0e4
date: 2021-04-16 13:56:31
categories: Coding
tags:
	- python
---

### import 
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

``` py
pass
```

### library
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

### 變數與型態

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

### input
``` py
coin = float(input('    How many quarters?:'))
coin = int(input('    How many quarters?:'))
name = input()
```

### print
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
```

### Built-in function
``` py
# 4捨5入
x = round(5.76543, 2)
print(x)
33 
```

### 運算元
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

### 條件式
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

### 迴圈
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

### function
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