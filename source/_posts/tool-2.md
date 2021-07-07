---
title: 前端 package
abbrlink: 319f
date: 2021-06-23 16:08:58
categories: Front End
tags:
	- tool
---

### [CKEditor 4](https://cdn.ckeditor.com/) - 所見即所得文字編輯器
+ 因 reset.css 會清掉 css default 值, 所以無法顯示出設定效果,所以要改為 normalize.css
+ htmlspecialchars HTML 跳脫字元 會忽略 tag, 所以要拿掉才會有效果``(CKEditor 會保護,手動加入無效)``

<!--more-->

``` html
<head>

	<!-- add .js -->
	<script src="https://cdn.ckeditor.com/4.16.1/standard/ckeditor.js"></script>
</head> 
<body>
	<!-- add tag textarea -->
	<textarea class="edit-content" rows="10" 
			name="content"><?php echo $content; ?></textarea>

	<!-- run CKEditor function -->
	<script>
 		CKEDITOR.replace( 'content' );
  </script>
</body>
```

