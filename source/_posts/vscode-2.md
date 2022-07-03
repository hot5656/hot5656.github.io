---
title: VSCode issue
abbrlink: f98b
date: 2022-07-02 13:54:50
categories: Coding
tags:
	- vscode
	- issue
---

### terminal
#### 系統上已停用指令碼執行

<!--more-->

+ 打開 PowerShell(系統管理員) 輸入 get-executionpolicy 看看目前的執行原則是什麼
+ 執行 set-executionpolicy remotesigned
<div style="width:600px">
	{% asset_img pic1.png pic1 %}
</div>

+ executionpolicy 有四種執行原則
	+ Restricted：所有PowerShell Script皆無法執行。(Windows系統預設)
	+ AllSigned：所有PowerShell Script都要經過受信任的發行者簽屬過後才可執行。
	+ RemoteSigned：針對從異地下載下來的PowerShell Script需要經過受信任的發行者簽屬過後才可執行，本機的PowerShell Script可直接執行。
	+ Unrestricted：無限制，所有PowerShell Script皆可執行。
