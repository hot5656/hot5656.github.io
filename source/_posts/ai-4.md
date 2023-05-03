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

21 Getting excited about buying a new set of kitchen towels, --cb
22 Opting for comfortable shoes over stylish ones, --cb
23 Celebrating when you finally get all your bills paid on time, --cb
24 Complaining about your noisy neighbors to your landlord, --cb
25 Feeling proud when you fix something in your house without calling a repairman, --cb
26 Realizing you have a preference for certain types of cleaning products, --cb
27 Getting excited about buying a new kitchen gadget, like a fancy blender or food processor, --cb
28 Being proud of yourself for learning how to properly fold fitted sheets, --cb
29 Feeling accomplished when you manage to fix a leaky faucet, --cb
30 Celebrating when you finally manage to fold all your laundry and put it away, --cb

31 Realizing that you can't eat junk food for every meal anymore, --cb
32 Getting excited about a new set of bath towels, --cb
33 Complaining about the noisy birds outside your window at 5 AM, --cb
34 Being proud of yourself for starting a retirement savings account, --cb
35 Feeling accomplished when you successfully deep clean your kitchen, --cb
36 Opting for a night of self-care instead of a night out with friends, --cb
37 Getting excited about buying a new set of matching hangers for your closet, --cb
38 Celebrating when you manage to balance your budget for the month, --cb
39 Celebrating when you successfully follow a complicated recipe, --cb
40 Feeling accomplished when you successfully assemble a complicated piece of technology, like a TV or sound system, --cb

41 Complaining about how early your neighbors mow their lawn on weekends, --cb
42 Celebrating when you successfully unclog a drain without calling a plumber, --cb
43 Feeling accomplished when you successfully parallel park your car, --cb
44 Opting for a night in with a good book over a night out with friends, --cb
45 Feeling proud when you successfully negotiate a raise or promotion at work, --cb
46 Opting for a night of relaxation and stretching instead of a night out with friends, --cb
47 Getting excited about buying a new set of Tupperware containers, --cb
48 Being proud of yourself for learning how to sew a button on a shirt, --cb
49 Being proud of yourself for learning how to change a tire, --cb
50 Feeling accomplished when you successfully complete a DIY home renovation project, --cb

51 Feeling accomplished when you finally manage to declutter your closet, --cb
52 Getting excited about a new set of kitchen knives or cookware, --cb
53 Complaining about how loud your upstairs neighbors are, --cb
54 Feeling proud when you successfully negotiate a better deal on a major purchase, --cb
55 Being proud of yourself for starting a garden and growing your own vegetables, --cb
56 Getting excited about buying a new set of hangers that match, --cb
57 Being proud of yourself for learning how to change a diaper or feed a baby, --cb
58 Celebrating when you successfully complete a home improvement project without injuring yourself, --cb
59 Feeling accomplished when you finally figure out how to fix a glitch on your computer or phone, --cb
60 Complaining about how long it takes to recover from a hangover, --cb


31 Getting excited about a good deal on toilet cleaner, --cb
32 Complaining about how early it gets dark in the winter, --cb(x)
33 Being proud of yourself for making your own cleaning supplies, --cb(x)
34 Feeling accomplished when you successfully navigate a complicated tax form, --cb(x)
35 Opting for a night in with a good book instead of going out to party, --cb
36 Getting excited about buying a new set of storage containers, --cb
37 Complaining about how hard it is to get a good night's sleep, --cb
38 Being proud of yourself for starting a garden and growing your own vegetables, --cb(v)
39 Celebrating when you successfully bake a complicated cake from scratch, --cb
40 Feeling accomplished when you successfully set up a complex home entertainment system, --cb

31 Having a favorite brand of toilet paper, --cb (x)
32 Getting excited about buying a new set of kitchen towels, --cb(v)
33 Celebrating when you manage to balance your budget for the month, --cb(v)
34 Complaining about how early your neighbors mow their lawn on weekends, --cb(v)
35 Feeling accomplished when you successfully parallel park your car, --cb(v)
36 Opting for a night in with a good book over a night out with friends, --cb(v)
37 Getting excited about buying a new set of Tupperware containers, --cb(v)
38 Being proud of yourself for learning how to change a tire, --cb(v)
39 Celebrating when you successfully assemble a piece of IKEA furniture, --cb(x)
40 Feeling accomplished when you finally manage to declutter your closet, --cb(v)


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
