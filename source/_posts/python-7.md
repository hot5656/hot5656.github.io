---
title: Matplotlib (Python)
categories: Coding
tags:
  - python
abbrlink: ead6
date: 2022-11-11 22:34:43
---

### Pyplot

<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>


<!--more-->


``` py
import datetime
import matplotlib.pyplot as plt

def twDateToGlobal(twDate):
    year, month, date = twDate.split("/")
    print(datetime.date(int(year), int(month), int(date))
    
    )
    return datetime.date(int(year), int(month), int(date))

def Chart():
    cmd = "SELECT * FROM stockPrice"
    cursor.execute(cmd)
    rows = cursor.fetchall()
    x = [twDateToGlobal(row[0]) for row in rows] # 日期
    y = [row[2] for row in rows] # 股價
    plt.plot_date(x, y, 'g')
    plt.xticks(rotation=70)
    plt.show()

Chart()
```

### Ref
[Matplotlib Tutorial](https://www.w3schools.com/python/matplotlib_intro.asp)