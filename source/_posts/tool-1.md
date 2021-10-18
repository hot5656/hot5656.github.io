---
title: TOOL
abbrlink: 30df
date: 2021-05-21 09:55:20
categories: Front End
tags:
	- tool
---

### Application

#### 馬克鰻(markman)

+ [Download](http://www.getmarkman.com/)
+ 先安裝 [adobe AIR](https://get.adobe.com/tw/air/)

圖檔 長度測量/標記, 矩形座標&長寬測量/標記,顏色測量/標記,文字標記

按鍵| 功能
----|-------------
Tab | 自動偵測長度
Del | 刪除標記

<!--more-->

##### JMeter
壓力測試工具
###### check java veresion
``` bash
# 命令列執行
java -version
```

###### download and install
+ download [JMeter](https://jmeter.apache.org/download_jmeter.cgi) : .zip for Window
+ 解壓縮執行 ./bin/jmeter.bat
+ change language : Options --> Choose Language --> Chinese(Traditional)

###### add test item
+ 填入名稱 : TestProducts -> 名稱 -> Save
<div style="maxwidth:1000px">
	{% asset_img pic1.jpg pic1 %}
</div>

+ add test group : TestProducts --> 新增 --> Threads(users) --> setUp Thread Group
<div style="maxwidth:1000px">
	{% asset_img pic2.jpg pic2 %}
</div>

+ 新增 HTTP 要求 : setUp Thread Group --> 新增 --> 取樣 --> HTTP 要求 
<div style="maxwidth:1000px">
	{% asset_img pic3.jpg pic3 %}
</div>

+ 新增 檢視結果樹 : setUp Thread Group --> 新增 --> 接聽 --> 檢視結果樹 
<div style="maxwidth:1000px">
	{% asset_img pic4.jpg pic4 %}
</div>

#### Cygwin 安裝 wget, apt-cyg, gcc
##### install cygwin - add wget
<div style="width:500px">
	{% asset_img cygwin_1.jpg cygwin_1 %}
</div>

##### download apt-cyg 解壓縮後放於 /bin 目錄下, 並設定可執行
<div style="maxwidth:1000px">
	{% asset_img cygwin_2.jpg cygwin_2 %}
</div>

``` bash
chmod +x /bin/apt-cyg
```

##### install gcc
``` bash
apt-cyg install gcc-core
```

##### some command 
``` bash
# dump cygwin version 
uname -a
		CYGWIN_NT-10.0 ESTPENB-W022 3.2.0(0.340/5/3) 2021-03-29 08:42 x86_64 Cygwin
# check support gcc core 
cygcheck -p bin/gcc
		Found 10 matches for bin/gcc
		gcc-core-10.2.0-1 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-core-11.2.0-0 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-core-11.2.0-1 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-core-7.4.0-1 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-core-9.3.0-2 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-debuginfo-10.2.0-1 - gcc-debuginfo: Debug info for gcc
		gcc-debuginfo-7.4.0-1 - gcc-debuginfo: Debug info for gcc
		gcc-debuginfo-9.3.0-2 - gcc-debuginfo: Debug info for gcc
		gccmakedep-1.0.2-1 - gccmakedep: X Makefile dependency tool for GCC (installed b
		inaries and support files)
		gccmakedep-1.0.3-1 - gccmakedep: X Makefile dependency tool for GCC (installed b
		inaries and support files)
```
