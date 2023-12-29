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