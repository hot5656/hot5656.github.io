---
title: ai-4
abbrlink: 67d3
date: 2023-04-27 09:47:23
categories:
tags:
---

### book
+ title :Wine & Doodles: A Coloring Book for the Sophisticated and Stressed
+ size: 6*9

<!--more-->

#### ask chatGPT
+ could you give me a funny list of examples of "adulting"?
+ I want to make a humorous coloring book for adults, please give me some titles for reference 
```
Feeling a sense of accomplishment when you finally organize your closet.
Getting excited about a new set of kitchen knives.
Spending your Saturday night at home watching Netflix instead of going out.
Complaining about how noisy the neighborhood kids are when you're trying to take a nap.
Looking forward to getting a good deal on something you need.
Starting to enjoy gardening and getting excited about planting new flowers.
Scheduling regular check-ups with your doctor and dentist.
Feeling proud when you can finally make a perfect omelet.
Being happy about a new set of towels and bed sheets.
Having an adult conversation about insurance policies with your friends.
```

+ could you give me anothe a funny list of examples of "adulting"?

### [Midjuorney create miage](https://discord.com/)
#### prompt for Wine & Doodles: A Coloring Book for the Sophisticated and Stressed
1 Getting excited about buying new cleaning supplies  --cb
2 Choosing to stay in on a Friday night because you're too tired to go out, --cb
3 Spending your entire weekend doing laundry and grocery shopping, --cb
4 Complaining about how early it gets dark outside, --cb
5 Realizing that a good night's sleep is the highlight of your week, --cb
6 Getting excited about buying a new kitchen appliance, --cb
7 Celebrating when you get a good deal on something you needed to buy anyway, --cb
8 Realizing that you have a favorite brand of paper towels, --cb
9 Feeling accomplished after doing your own taxes, --cb
10 Arguing about the best way to load the dishwasher with your significant other, --cb

11 Having a "to-do" list for your weekend instead of a "fun" list, --cb
12 Getting excited about buying a new vacuum cleaner, --cb
13 Choosing to stay in on a Friday night to catch up on work instead of going out with friends, --cb
14 Complaining about how much harder it is to lose weight as you get older, --cb
15 Getting a thrill from buying home decor items and organizing your living space, --cb
16 Celebrating when you successfully cook a gourmet meal for yourself, --cb
17 Getting into bed earlier and earlier every night, --cb
18 Feeling accomplished after successfully assembling a piece of furniture, --cb
19 Being excited about finding a new grocery store that has better deals, --cb
20 Feeling like a boss when you successfully negotiate a better price for something, --cb


#### 自動後帶 prompt
``` bash
# 只能帶 Parameters 
# example 
/prefer suffix --uplight --video

# clear
/prefer suffix
```


# 自訂 parameter
``` bash
# --cb : color book
# vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3 
/prefer option set option:cb    value:vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3 
# outline border, vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3
/prefer option set option:cb    value:outline border, vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3 

# list option
/prefer option list 
	wallpaper: --w 1920 --h 1024 --hd
	cb: vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3
```


### Ref
+ [create miage](https://discord.com/) 
+ [Settings and Presets](https://docs.midjourney.com/docs/settings-and-presets)
+ [Book Template](https://selfpublishing.com/book-template/)
+ [Free Editable Book Templates in Word](https://usedtotech.com/free-book-templates-in-word/)
+ [Adulting: The Coloring Book That Prepares You For Life](https://www.amazon.com/dp/B0BTRTDGKH/ref=cm_sw_r_as_gl_api_gl_i_YF50JMH9GTW8WSZBTK6T?linkCode=ml1&tag=bigbrofragran-20)
+ [The Fastest Way To Create A Coloring Book: ChatGPT, MidJourney, Amazon KDP | 5 Simple Steps](https://www.youtube.com/watch?v=sNkQbyOL7ps)
+ [Easy Piano Sheet Music for Kids:](https://www.amazon.com/Easy-Piano-Sheet-Music-Kids/dp/B08BTX5H2J/ref=sr_1_1?crid=IGO9Q3A6711T&keywords=Easy+Piano+Sheet+Mucic+for+Kids+A+beginners+First+Book+of+Easy+to+play+Classics&qid=1682578709&s=books&sprefix=easy+piano+sheet+mucic+for+kids+a+beginners+first+book+of+easy+to+play+classics%2Cstripbooks-intl-ship%2C244&sr=1-1)
+ book manafacture 
	+ [bookow](https://bookow.com/resources.php)
	+ [KDP cover calculator)](https://kdp.amazon.com/cover-calculator)
