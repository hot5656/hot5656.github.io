---
title: Python issue
abbrlink: fc13
date: 2024-04-24 13:38:50
categories: Coding
tags:
	- python
	- issue
---

### UnicodeEncodeError
``` py
# UnicodeEncodeError: 'cp950' codec can't encode character '\u2661' in position 7107: illegal multibyte sequence
print(soup.encode('utf-8'))
```