---
title: Tkinter (Python)
abbrlink: 12a5
date: 2021-04-15 13:52:21
categories: Coding
tags:
	- python
---

### Setup

#### set window 
``` py
# import tkinter
from tkinter import *
# init for window
window = Tk()
# 標題
window.title("My First GUI Program")
# windows size
window.minsize(width=500, height=300)
# padx, pady : window 預留語版邊 pad
# bg : window 背景顏色
window.config(padx=50, pady=70, bg="#B1DDC6")

# 保持顯示 window
window.mainloop()
```

<!--more-->

#### Setting Options

``` py
# At object creation time, using keyword arguments
fred = Button(self, fg="red", bg="blue")
# After object creation, treating the option name like a dictionary index
fred["fg"] = "red"
fred["bg"] = "blue"
# Use the config() method to update multiple attrs subsequent to object creation
fred.config(fg="red", bg="blue")
```

#### 邊線與邊框
``` py
# highlightthickness=0 無邊線
# borderwidth=0 無邊框
ok_btn = Button(image=ok_img, command=ok_process, borderwidth=0, highlightthickness=0)
```


### Layout(單一視窗,僅能擇一使用)

#### Pack
<div style="width:200px">
	{% asset_img pic21.png pic21 %}
</div>
<div style="width:200px">
	{% asset_img pic22.png pic22 %}
</div>

``` py
# init 父窗口
root = Tk()
root2 = Tk()

w = Label(root, text="Red Sun", bg="red", fg="white")
# ipadx,ipady 設內部的 padding
w.pack(ipadx=10, ipady=10)
# fill=X 表寬度與父窗口一樣
w = Label(root, text="Green Grass", bg="green", fg="black")
w.pack(fill=X)
# padx, pady 設定與其他元件的 padding(含父窗口)
w = Label(root, text="Blue Sky", bg="blue", fg="white")
w.pack(fill=X, padx=10, pady=10)

# 設定 順序 side=LEFT
w = Label(root2, text="red", bg="red", fg="white")
w.pack(padx=5, pady=10, side=LEFT)
w = Label(root2, text="green", bg="green", fg="black")
w.pack(padx=5, pady=20, side=LEFT)
w = Label(root2, text="blue", bg="blue", fg="white")
w.pack(padx=5, pady=20, side=LEFT)
```

#### [Grid](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/grid.html)
Grid 把元件位置作為一個二維表結構來維護, 即按照行列的方式排列
<div style="width:600px">
	{% asset_img pic23.png pic23 %}
</div>

``` py
# grid 0, 0
my_label = Label(text="I Am a Label")
my_label.grid(row=0, column=0)
# grid 1, 1
button = Button(text="click me")
button.grid(row=1, column=1)
# grid 2, 3
entry = Entry(width=30)
entry.insert(END, "Some text to begin with.")
entry.grid(row=2, column=3)
# grid 0, 2
button2 = Button(text="button2")
button2.grid(row=0, column=2)
```

#### Place
Place 可以指定元件的絕對位置
<div style="width:600px">
	{% asset_img pic24.png pic24 %}
</div>

``` py
my_label = Label(text="I Am a Label")
my_label.place(x=50, y=70)
```


### 元件

#### Text
``` py
text = Text(width=30, height=5)
text.insert(END, "Example of multi-line text entry.")
text.pack()
# print to console
# index1: 1.0 第一個字元
# index2: 結尾
print(text.get("1.0", END))
# focus
text.focus()
```

#### Label
``` py
# 設定 back ground and front ground color
my_label = Label(text="I Am a Label", font=("Arial", 24, "bold"), fg='green', bg='yellow')
# side = top(default), left, right, bottom
# expand = True (垂直占最大)
my_label.pack(side="bottom", expand=True)
# 更改 label 內容 - 方法1
my_label["text"] = "New label"
# 更改 label 內容 - 方法2
my_label.config(text="New Text - config")
```

#### Button
``` py
# button's click function
def button_clicked():
    print("I got a clicked.")

# button create
button = Button(text="click me", command=button_clicked)
button.pack()
```

#### Spinbox 
<div style="width:50px">
	{% asset_img pic1.png pic1 %}
</div>

``` py
# Spinbox
def spinbox_used():
    # get spinbox value
    print(spinbox.get())

spinbox = Spinbox(from_=0, to=10, width=5, command=spinbox_used)
# 留 padding
spinbox.pack(padx=20, pady=10)
```

#### [Standard Dialog](https://runestone.academy/runestone/books/published/thinkcspy/GUIandEventDrivenProgramming/02_standard_dialog_boxes.html)
<div style="width:300px">
	{% asset_img pic2.png pic2 %}
</div>
<div style="width:300px">
	{% asset_img pic3.png pic3 %}
</div>
``` py
# 因不是 class 要另外 import
from tkinter import messagebox

# Standard Dialog
website = "Game App"
email = "example.gmail.com"
password = "123abc"
# Dialog askokcancel
is_ok = messagebox.askokcancel(title=website, message=f"There are the details entered: \nEmail: {email} \nPassword: {password}\n Is it ok to save")
# Dialog showinfo
messagebox.showinfo(title="Oops", message="Please don't leave field empty.")
```

####  Radio Box
<div style="width:100px">
	{% asset_img pic4.png pic4 %}
</div>

``` py
def radio_used():
    # get value
    print(radio_state.get())

radio_state = IntVar()
radiobutton1 = Radiobutton(text="option1", value=1, variable=radio_state, command=radio_used)
radiobutton2 = Radiobutton(text="option2", value=2, variable=radio_state, command=radio_used)
print(radio_state.get())
radiobutton1.pack()
radiobutton2.pack()
```

#### Listbox
<div style="width:150px">
	{% asset_img pic5.png pic5 %}
</div>

``` py
def listbox_used(event):
    print(listbox.get(listbox.curselection()))

listbox = Listbox(height=4)
fruits = ["Apple", "Pear", "Orange", "Banana"]
for item in fruits:
    listbox.insert(fruits.index(item), item)
listbox.bind("<<ListboxSelect>>", listbox_used)
# 留 padding
listbox.pack(padx=20, pady=10)
```

#### Checkbox
<div style="width:100px">
	{% asset_img pic6.png pic6 %}
</div>

``` py
def checkbutton_used():
    # get value
    print(checked_state.get())

checked_state = IntVar()
# set value to 1
# checked_state.set(1)
# only show type
print(checked_state)
checkbutton = Checkbutton(text="Is on?", variable=checked_state, command=checkbutton_used)
print(checked_state.get())
checkbutton.pack()
```

#### Scale
<div style="width:100px">
	{% asset_img pic7.png pic7 %}
</div>

``` PY
# parameter include value
def scale_used(value):
    print(value)

scale = Scale(from_=0, to=100, command=scale_used)
scale.pack()
```

#### Entry (單行輸入) 
<div style="width:200px">
	{% asset_img pic8.png pic8 %}
</div>

``` py
# for get entry value ========
def button_clicked():
    print("I got a clicked.")
    new_input = entry.get()
    print(new_input)
    my_label["text"] = new_input

# get entry value
button = Button(text="click me", command=button_clicked)
button.pack()
# =============================


# entry
entry = Entry(width=30)
# 設定預設值
# index-->END : 存在文字之後
entry.insert(END, "Some text to begin with.")
# 留 padding
entry.pack(padx=20, pady=10)
# focus
entry.focus()
# not show - because it run when not input
# get entry value
print(f"-->{entry.get()}")

# delete entry from position to end
# website_entry.delete(0, "end")
# entry.delete(0, "end")
# or
# website_entry.delete(0, END)
# entry.delete(0, END)
```

#### [Canvas (繪圖)](https://tkdocs.com/tutorial/canvas.html)
<div style="width:300px">
	{% asset_img pic9.png pic9 %}
</div>

``` py
# constant
YELLOW = "#f7f5dd"
FONT_NAME = "Courier"
# Canvas, highlightthickness 邊線寬度
canvas = Canvas(width=200, height=224, bg=YELLOW, highlightthickness=0)
# image 元件
tomato_img = PhotoImage(file="tomato.png")
# add image
canvas.create_image(100, 112, image=tomato_img)
# add text, fill 填入顏色
canvas.create_text(102, 130, text="00:00", font=(FONT_NAME, 35, "bold"), fill="white")
canvas.pack()
```


###  [Bind](http://www.tcl.tk/man/tcl8.6/TkCmd/event.htm)
#### Listbox
``` py
def listbox_used(event):
    print(listbox.get(listbox.curselection()))

listbox = Listbox(height=4)
fruits = ["Apple", "Pear", "Orange", "Banana"]
for item in fruits:
    listbox.insert(fruits.index(item), item)
listbox.bind("<<ListboxSelect>>", listbox_used)
listbox.pack()
```

###  參考
+ [Tk tutorial](https://tk-tutorial.readthedocs.io/en/latest/index.html)
+ [Tkinter 8.5 reference](https://anzeljg.github.io/rin2/book2/2405/docs/tkinter/) : a GUI for Python
+ [Tk Commands](http://tcl.tk/man/tcl8.6/TkCmd/contents.htm) : 較清楚