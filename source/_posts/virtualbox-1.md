---
title: Virtualbox virtio-net(半虛擬化網路) 安裝
abbrlink: f96b
date: 2021-04-09 16:21:04
categories: application
tags:
  - virtualbox
---


### 功能
+ 提供更快的網路傳輸速度
+ 若外層host以VPN連接,virtual host 也相當於以 VPN 連接

<!--more-->

### 下載 
[virtio-net driver]( https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md)
[virtio-win-0.1.102](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.102/)

+ Select Stable virtio-win ISO
+ 我安裝的是 Win7, 當下抓的是 virtio-win-0.1.185.iso 但安裝有問題, 最後試 virtio-win-0.1.102.iso 結果 ok

### VirtualBox 網路設定
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

### Insert driver ISO to virtualbox CD
<div style="width:500px">
	{% asset_img pic2.png pic2 %}
</div>
<div style="width:500px">
	{% asset_img pic3.png pic3 %}
</div>
<div style="width:500px">
	{% asset_img pic4.png pic4 %}
</div>
<div style="width:500px">
	{% asset_img pic5.png pic5 %}
</div>

### Install driver
<div style="width:500px">
	{% asset_img pic6.png pic6 %}
</div>
<div style="width:500px">
	{% asset_img pic7.png pic7 %}
</div>
<div style="width:500px">
	{% asset_img pic8.png pic8 %}
</div>
<div style="width:500px">
	{% asset_img pic9.png pic9 %}
</div>
<div style="width:500px">
	{% asset_img pica.png pica %}
</div>
<div style="width:500px">
	{% asset_img picb.png picb %}
</div>
<div style="width:500px">
	{% asset_img picc.png pica %}
</div>
<div style="width:500px">
	{% asset_img picd.png picd %}
</div>
<div style="width:500px">
	{% asset_img pice.png pice %}
</div>
<div style="width:500px">
	{% asset_img picf.png picf %}
</div>

### 參考文件
+ [Windows 7 建立包含VirtIO驅動的iso檔]( https://orzalanluo.com/?p=289)




