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

### knowledge

#### Term
``` bash
# Entailment (語義蘊涵也叫做邏輯蘊涵⊨)
α ⊨ β : In every model in which sentence α is true, sentence β is also true.

# inference 推論
P: It is a Tuesday.
Q: It is raining.
R: Harry will go for a run.
KB: (P ∧ ¬Q) --> R 
Inference: R

# Inference Algorithms (推理演算法)
#Model Checking(列舉所有)
• To determine if KB ⊨ α:
	• Enumerate all possible models.
	• If in every model where KB is true, α is true, then
	KB entails α.
	• Otherwise, KB does not entail α.
```

#### example code
##### rain?
``` py
from logic import *

rain = Symbol("rain")
hargrid = Symbol("hagrid")
dombledore = Symbol("dombledore")

sentence = And(rain, hargrid)
print(sentence.formula())	# rain ∧ hagrid

knowledge = Implication(Not(rain), hargrid)
print(knowledge.formula()) # (¬rain) => hagrid

# chaeck rain
knowledge = And(
    Implication(Not(rain), hargrid),
    Or(hargrid, dumbledore),
    Not(And(hargrid, dumbledore)),
    dumbledore
)
# print(knowledge.formula())
print(model_check(knowledge, rain)) # True
# print(model_check(knowledge, hargrid)) # False
# print(model_check(knowledge, dumbledore)) # True
```

##### clue
``` py
import termcolor

from logic import *

mustard = Symbol("ColMustard")
plum = Symbol("ProfPlum")
scarlet = Symbol("MsScarlet")
characters = [mustard, plum, scarlet]

ballroom = Symbol("ballroom")
kitchen = Symbol("kitchen")
library = Symbol("library")
rooms = [ballroom, kitchen, library]

knife = Symbol("knife")
revolver = Symbol("revolver")
wrench = Symbol("wrench")
weapons = [knife, revolver, wrench]

symbols = characters + rooms + weapons


def check_knowledge(knowledge):
    for symbol in symbols:
        if model_check(knowledge, symbol):
            termcolor.cprint(f"{symbol}: YES", "green")
        elif not model_check(knowledge, Not(symbol)):
            print(f"{symbol}: MAYBE")

knowledge = And(
    Or(mustard, plum, scarlet),
    Or(ballroom, kitchen, library),
    Or(knife, revolver, wrench),
)

# print(knowledge.formula())

knowledge.add(Not(mustard))
knowledge.add(Not(kitchen))
knowledge.add(Not(revolver))

knowledge.add(Or(
    Not(scarlet), Not(library), Not(wrench)
))

knowledge.add(Not(plum))
knowledge.add(Not(ballroom))

check_knowledge(knowledge)
```

#### Inference Rules(推理規則)
``` bash
# modus ponens 正向思維律
a → B  --> a true so B true
# and Elimination 和消除
a∧B --> a true, B true
# double negation Elimination 雙重否定
¬(¬α)  --> α
# Implication Elimination 暗示消除
α → β --> ¬α ∨ β
# Bicoditional Elimination
α ↔ β --> (α → β) ∧ (β → α)
# De morgan's Law
¬(α ∧ β) --> ¬α ∨ ¬β
¬(α ∨ β) --> ¬α ∧ ¬β
# Distributive Property 分配律
(α ∧ (β ∨ γ)) --> (α ∧ β) ∨ (α ∧ γ)
(α ∨ (β ∧ γ)) --> (α ∨ β) ∧ (α ∨ γ)
```

#### Theorem Proving(定理證明)
``` bash
• initial state: starting knowledge base
• actions: inference rules
• transition model: new knowledge base after inference
• goal test: check statement we're trying to prove
• path cost function: number of steps in proof
```

#### Resolution(歸結原理)
``` bash
(P ∨ Q) (¬P) --> Q
(P ∨ Q1 ∨ Q2 ∨ ...∨ Qn) (¬P) --> Q1 ∨ Q2 ∨ ...∨ Qn
(P ∨ Q) (¬P ∨ R) --> Q ∨ R
(P ∨ Q1 ∨ Q2 ∨ ...∨ Qn) (¬P ∨ R1 ∨ R2 ∨ ...∨ Rm) --> Q1 ∨ Q2 ∨ ...∨ Qn ∨ R1 ∨ R2 ∨ ...∨ Rm
```

#### Conversion to CNF
``` bash
# Clauses allow us to convert any logical statement into a Conjunctive Normal Form (CNF), which is a conjunction of clauses, for example: (A ∨ B ∨ C) ∧ (D ∨ ¬E) ∧ (F ∨ G).
# example 
Conversion to CNF
(P ∨ Q) → R
¬(P ∨ Q) ∨ R					# eliminate implication
(¬P ∧ ¬Q) ∨ R					# De Morgan's Law
(¬P ∨ R) ∧ (¬Q ∨ R)	  # distributive law
```

#### Inference by Resolution
``` bash
(P ∨ Q) (¬P ∨ R) --> (Q ∨ R)
(P ∨ Q ∨ S) (¬P ∨ R ∨ S) --> (Q ∨ S ∨ R)
P ¬P --> Flase

• To determine if KB ⊨ α:
	• Check if (KB ∧ ¬α) is a contradiction?
	• If so, then KB ⊨ α.
	• Otherwise, no entailment.

• To determine if KB ⊨ α:
	• Convert (KB ∧ ¬α) to Conjunctive Normal Form.
	• Keep checking to see if we can use resolution to
	produce a new clause.
	• If ever we produce the empty clause (equivalent
	to False), we have a contradiction, and KB ⊨ α.
	• Otherwise, if we can't add new clauses, no
	entailment.

# Does (A ∨ B) ∧ (¬B ∨ C) ∧ (¬C) entail A?
```

#### First-Order Logic
``` bash
First-Order Logic 
Constant Symbol Predicate Symbol
Minerva					Person
Pomona					House
Horace					BelongsTo
Gilderoy
Gryffindor
Hufflepuff
Ravenclaw
Slytherin
Person(Minerva) 									Minerva is a person.
House(Gryffindor) 								Gryffindor is a house.
¬House(Minerva) 									Minerva is not a house.
BelongsTo(Minerva, Gryffindor)		Minerva belongs to Gryffindor
# Universal Quantification
# ∀表所有人
∀x. BelongsTo(x, Gryffindor) →  ¬BelongsTo(x, Hufflepuff)
# Existential Quantification
# ∃任一存在
∃x. House(x) ∧ BelongsTo(Minerva, x)
∀x. Person(x) → (∃y. House(y) ∧ BelongsTo(x, y)
```


### Ref
+ [Python Exception](https://docs.python.org/3/library/exceptions.html)