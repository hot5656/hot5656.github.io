---
title: CS50AI
abbrlink: 3f52
date: 2023-12-29 08:31:34
categories:
tags: Coding
	- cs50
	- python
---

### Search
#### Term

<!--more-->

``` bash
agent
state
initial state
actions
  (s)
transition model
  result(s,a)
path cost
solution
 potional solution

search problems:
 initiation state
 action
 transition model 
 goal test 
 path cost function

node :
 a dat structure that keeps track of
 -  a state
 - a parent (node that generate this node)
 - a action (action applied to parent to get node)
 - a path cost(from initial state to node)

depth-first search (stack)
breadth-first search (queue)

uninformed search
infomed search
  greedy best-first search
  A* search

adversarial search : 對抗性搜索
Minimax
 Max(X) aims to maximize score
 MIN(O)  aimes to minize score
Alpha-Beta Pruning:不要找完下層所有
Depth-Limited Minimax:預估最大深度
  evaluation function
```

##### shell
``` bash
# install
pip3 install -r requirements.txt
python.exe -m pip install --upgrade pip

# select python
Ctrl+Shift+P --> python interpreter --> select ...
```

##### project submit
###### put to github
``` bash
# degress git
git init
git add .
git commit -m "first version"

# github create repository
# push to github
D:\work\run\me50-ai50\degrees>git remote add origin https://github.com/hot5656/cs50ai-degrees.git
git push -u origin master
# add brench ai50/projects/2024/x/degrees from github
```

<div style="max-width:1000px">
  {% asset_img pic01.png pic01 %}
</div>

###### submit
``` bash
# push for submit
git push -u https://github.com/me50/hot5656 ai50/projects/2024/x/degrees
    Username for 'https://github.com': hot5656
    Password for 'https://hot5656@github.com':
    Enumerating objects: 9, done.
    Counting objects: 100% (9/9), done.
    Delta compression using up to 8 threads
    Compressing objects: 100% (8/8), done.
    Writing objects: 100% (9/9), 3.04 KiB | 445.00 KiB/s, done.
    Total 9 (delta 0), reused 0 (delta 0), pack-reused 0
    remote:
    remote: Create a pull request for 'ai50/projects/2024/x/degrees' on GitHub by visiting:
    remote:      https://github.com/me50/hot5656/pull/new/ai50/projects/2024/x/degrees
    remote:
    To https://github.com/me50/hot5656
    * [new branch]      ai50/projects/2024/x/degrees -> ai50/projects/2024/x/degrees
    branch 'ai50/projects/2024/x/degrees' set up to track 'https://github.com/me50/hot5656/ai50/projects/2024/x/degrees'.
# check submit status
```

<div style="max-width:1000px">
  {% asset_img pic02.png pic02 %}
</div>

###### modify then submit
``` bash
# tictactoe
git add .
git commit -m "add action exception"
git push -u https://github.com/me50/hot5656 ai50/projects/2024/x/tictactoe
```

###### update my repository
``` bash
# push to my repository
git push -u https://github.com/me50/hot5656 ai50/projects/2024/x/tictactoe
```

### Ref
+ [Python Exception](https://docs.python.org/3/library/exceptions.html)