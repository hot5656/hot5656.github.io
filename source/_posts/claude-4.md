---
title: claude-4
abbrlink: 297c
date: 2026-08-07 09:48:27
categories:
tags:
---

### Course Introduction
#### information
``` bash
# gift
1. Glaude Ai document
  + Co-work
  + Skills
  + Plugins
  + Code
2. 200 Claude Prompts
3. Claude Masterclass(+20 Skill templates)
4. Student Community(Skool)

# some tools 
1. Apify : The best web scraping tool to use with Claude Chat, Cowork, and Code.
2. Hostinger : Run Claude Code on your own VPS for an always-on coding environment.
3. GoHighLevel : The all-in-one client dashboard for AI agents & automation
4. ElevenLabs : The best AI voice generation tool for realistic text-to-speech and voiceovers.
```

#### install Cowork + Apify
``` bash
# Claude Desktop app install - windows
# 官方最低要求:Anthropic 官方支援文件只提到 Windows 版 Claude Desktop 要用 Cowork,必須開啟 Virtual  Machine Platform
# 但實務上大量案例顯示,只開 Virtual Machine Platform 常常不夠
1. 必須開啟 Virtual Machine Platform (虛擬機器平台)
# 開啟 Virtual Machine Platform
1. 按 Win 鍵,搜尋「開啟或關閉 Windows 功能」(Turn Windows features on or off)
2. 在清單中找到 「Virtual Machine Platform」(虛擬機器平台),打勾
3. 在清單中找到 「Windows Hypervisor Platform」(Windows Hypervisor 平台),打勾
4. 在清單中找到 Hyper-V,打勾 - Home 版沒有 
5. 打開後用「重新啟動」而不是關機再開機(Windows 的快速啟動 Fast Startup 有時會讓虛擬化服務沒有真正重新初始化)

# add Apify to claude
Cowork
  --> Setting
  --> connectors
  --> Browser connector
  --> Apify 
  --> Install
  --> copy "Apify API Token "to Apify API token
  --> Enable
  --> Tool Permissions --> Always allow
    Read only tools and Write/delete tools(set if nees) 
# login Apify get API Token
Setting 
  --> API & Integration
  --> Personal API tokens
  --> copy
```

### Learn Claude Cowork
#### ch1
``` bash
# change invoice file name in a folder
Please rename all the file in my invoice  folder by add the invoice data at the beginning of each file name,. Files can be either invoice  and relation document.

# 
Please help me to organize these files. Create two sub folder called "Jly invoices" and "August invoices" and put the relevant files. Before it please create  a plan and let me approve it first. 

# 
please remove the files that contain in their name a word test

# 
# select folder
please could you create a report in pdf format about my invoice that contain "KappaSolutions" in their names


# Claude Desktop 目前不支援真正的多視窗
Mac:終端機輸入 open -n -a "Claude",會強制開一個全新的獨立視窗
Windows:Claude Desktop 是 MSIX 封裝,原生不支援多實例,需要額外工具

#
Please create a 10 second time lapse video from this material, showing the most import parts.

# 
I have many receipts in the folder I gave you access to. Please create an expense spreasdsheet in the .csv format with appreciate columns, and fullfill the data from screenshots. 
```

# Ref
+ tool link
  + [200+ Claude Prompts](https://special-tamarind-9e9.notion.site/200-Claude-Prompts-846ccdb23d99835095c3011d10a89e01)
  + [Claude Masterclass (+20 Skills Templates)](https://special-tamarind-9e9.notion.site/Claude-Masterclass-20-Skills-Templates-312ccdb23d9980e59d95eb1f9ab9695b)