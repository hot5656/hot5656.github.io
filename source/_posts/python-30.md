---
title: SciPy
abbrlink: 6fd2
date: 2024-05-23 12:25:51
categories: Coding
tags:
	- python
---

### function

<!--more-->

#### minimize_scalar(最小值, 最大值)
``` py
# 若有 f(x) 表有最小值,f(x) 為原函數
# 若有 g(x) 表有最小值
# peak.fun 即 y 值(若最大值的 y 值 要 * -1)
# peak.x 為 x 值
# np.isinf() 偵測無確定值

from scipy.optimize import minimize_scalar
import numpy as np

# y = 3x**2 - 12x + 10
def f(x) :
    return 3*x**2 -12*x + 10
def g(x) :
    return -f(x)

# y = 3x**2 - 12x + 10
peak = minimize_scalar(f)
if not(np.isinf(peak.fun)):
    # 有最小值
    limit_y = peak.fun
else:
    # y = 3x**2 - 12x + 10
    peak = minimize_scalar(g)
    if not(np.isinf(peak.fun)):
        # 有最大值
        limit_y = -peak.fun
				
print(f"x={peak.x} y={limit_y}")
```

``` py
# function 含 x 外數值
from sympy import Symbol, symbols, solve
from scipy.optimize import minimize_scalar

a, b, c = symbols(("a", "b", "c"))
eq1 = a + b + c - 10
eq2 = 4*a + 2*b + c - 18
eq3 = 9*a + 3*b + c - 19
ans = solve((eq1, eq2, eq3))
print(ans)
# {a: -7/2, b: 37/2, c: -5}

# x 要放在最前面
def f(x, a, b, c) :
    return (a*x**2 + b*x + c)
def g(x, a, b, c) :
    return -f(x, a, b, c)

# 算最大值
print(ans[a].evalf(), ans[b].evalf(), ans[c].evalf())
# args 不含 x, 要轉成 float 才不會有問題
args = (float(ans[a].evalf()), float(ans[b].evalf()), float(ans[c].evalf()))
peak = minimize_scalar(g, args=args)
limit_y = -peak.fun
print(f"max ({peak.x},{limit_y})")
# -3.50000000000000 18.5000000000000 -5.00000000000000
# max (2.6428571428571432,19.446428571428577)
```