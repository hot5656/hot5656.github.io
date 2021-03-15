---
title: hexo 加入 categories 和 tags
date: 2021-03-15 13:54:51
categories: 程序
tags:
	- hexo
---

### 修改 scaffolds/post.md
新增文章時,自動加入 categories, tags 項目
``` markdown
categories: 
tags:
```

### 產生 categories, tags 頁
``` bash
hexo new page categories
hexo new page tags
```

### source/categories/index.md 修改
``` markdown
---
title: categories
date: 2021-03-15 12:17:46
type: categories # 不加入不能選擇 categories(next theme)
---
```

### source/tags/index.md 修改
``` markdown
---
title: tags
date: 2021-03-15 12:17:59
type: tags # 不加入不能選擇 tags(next theme)
---
```

### 文章設定 categories, tags
可包含多 tag
``` markdown
categories: 程序
tags: 
	- hexo
	- github
```
