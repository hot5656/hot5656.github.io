---
title: Claude - Master Claude Cowork, Claude Code, Skills & Plugins
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

<!--more-->

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

# Claude Desktop app install - mac
1. 前往官方下載頁 claude.ai/download(務必從官方網址下載,不要用第三方連結)
2. 選擇 macOS 版本,下載 .dmg 安裝檔
3. 打開下載好的 .dmg 檔案,會跳出一個視窗,裡面有 Claude 圖示和 Applications 資料夾捷徑
4. 把 Claude 圖示拖曳到 Applications 資料夾裡,即完成安裝
5. 從「應用程式」(Applications)資料夾啟動 Claude
6. 用你的 Anthropic 帳號登入即可開始使用

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

# Claude Desktop 目前不支援真正的多視窗
Mac:終端機輸入 open -n -a "Claude",會強制開一個全新的獨立視窗
Windows:Claude Desktop 是 MSIX 封裝,原生不支援多實例,需要額外工具
```

### Learn Claude Cowork
#### 1st try
``` bash
# change invoice file name in a folder
Please rename all the file in my invoice  folder by add the invoice data at the beginning of each file name,. Files can be either invoice  and relation document.

# move to different su folder
Please help me to organize these files. Create two sub folder called "July invoices" and "August invoices" and put the relevant files. Before it please create  a plan and let me approve it first. 

# remove some files
please remove the files that contain in their name a word test

# exercise #1 U2-13
The files in the folder have a meaningless string as the file name prefix. Please rename all of them so that the meaningless string is removed from the prefix.


# generate report from files
please could you create a report in pdf format about my invoice that contain "KappaSolutions" in their names

# create lapse video
#   --> select a mp4 file
Please create a 10 second time lapse video from this material, showing the most import parts.

# generate data from some files
#    --> .csv
I have many receipts in the folder I gave you access to. Please create an expense spreadsheet in the .csv format with appreciate columns, and fulfill the data from screenshots.

# generate some presentation (Logo + color palette)
I'm giving you access folder with brand assets.
Create a Powerpoint presentation fully styled win my brand visuals.
The presentation topic is: AI Agents and Automation-What's Happening Now.
Cover these sections:
1. What are AI Agents & why they matter in 2026
2. Latest trends & news in the AI Automation space
3. New tools worth knowing
4. Real statistics on productivity gains from using AI Agents
5. Futuure outlook - where this is all heading
  + Use real data where possible. Keep Slides clean, visual and corporate.
  + Add a strong opening hook slide and a closing insight slide.
  + Output as a downloadable .pptx file
  + language please use 繁中
```

#### control browser
``` bash
# claude chrome extension install(need login)
# run from claude chrome extension
Open for me "x" in the browser and search for news about Claude Cowork 
# next 
alright now cluld you change the search to claude plugins and skills, and then fetch for me information from 5 the latest posts.

# Desktop run Cowork
Please now use browser to move on to notion, then inside my private space create a page called "claude test", and inside please create a short summary of the book "atomic habits" and the most crucial insights.
# next
Now please copy all of this information from notion page you created, open for me google drive, create a new folder called "atomic habits summary", open the folder, inside create a google docs file and paste all the content here

# claude chrome extension - continue
please go to youtube and type  inside "ai agent in 2026" 
# next
press enter to search


# exercise #2 U2-16
幫我將 Grok 的參考 link 加入我的檔案 並說明各 link 的內容
```

``` bash
# You have 3 Cowork invites Send a friend a free week of Cowork. If they love it and subscribe, you’ll get $10 in usage credits. Terms apply
https://claude.ai/referral/xREQi0jG6g?s=cowork&v=apps
https://support.claude.com/en/articles/13456702-claude-code-and-cowork-guest-passes
```

``` bash
# Claude extension - Teach claude
oprn "Claude extension"
  --> Teach claude(sometime not need) 
  --> start recording
  --> copy "Imager Generation" one line "Image Prompt" 
  --> open chatgpt.com
  --> paste 
  --> wait image generate
  --> click image 
  --> press save bottom
  --> go back "Imager Generation"
  --> set Status to done
  --> set Claude extension "Done"
```
#### use connector
``` bash
# gamil
Please got to gmail, extract for me last 10 messages I send to someone , and base on it create a pdf file that exactly explains my profile voice and tone, so exactly how I write

# excalidraw 
please use excalidraw to create for me a diagram explaining  how LLM works


# Canva
Use Canva to create a thumnail for Claude Cowork for me, with black text for "Calude" and yellow text for "Cowork." This text shpuld be in the middle of design. Add other elements that you think for this project.
```

#### create a web app - project
``` bash
# create project(ex. Website-Project)

# select a folder

# copy prompt for create app(web_app_builder_prompt.pdf)
You are an expert full-stack web developer, UX designer, and technical teacher. Help me create a
simple but polished web app that can be deployed on the website through GitHub. Work in these
steps.
Step 1 - Interview. Ask me questions one at a time to understand: what the app does, who it is for,
the main feature, the inputs and outputs, the visual style, and whether any backend, data storage,
or API is needed. Your goal is to define a realistic MVP that is simple, useful, and deployable.
Step 2 - Blueprint. Once the app is clear, give me: App Name, One-Sentence Summary, Target
User, MVP Goal, Main Features, Excluded Features, User Flow, UI Style, Tech Stack. Then ask for
my approval.
Step 3 - Build Plan. After approval, give a short explanation of: the file structure, what each file
does, how the frontend and backend work, and how deployment will work.
Step 4 - Code. Write the complete ready-to-use code. Use this default structure unless there is a
strong reason to change it: package.json, server.js, public/index.html. You may also add
public/style.css and public/script.js if that makes the project cleaner.
Requirements: Node.js + Express, responsive design, clean modern UI, beginner-friendly code,
no unnecessary dependencies, no placeholders, fully working code, clear comments only where
helpful.
Important rules: Do not start coding until the MVP is clear. Keep the project realistic and simple.
Avoid overengineering. If my request is too broad, simplify it. Explain tradeoffs clearly.
Start by introducing yourself and asking the first question only.

# ex. app information
This app should help learn English through flashcards.

# continue response for claude ,when complete ask it start 

# the app so simple - ask convert the app to a static-hosting version
convert the app to a static-hosting version

# host gt github
1. Create a new repository on GitHub (e.g. chatcards)
2. upload ChatCards-static folder file to github
3. In the repo, go to Settings → Pages
4. Under "Build and deployment," set Source to "Deploy from a branch,"
5. set Branch: main, /root --> save
6. open url: https://<your-username>.github.io/chatcards/
```

#### porject - example
``` bash
# create a project 

# select a folder

# put file to the folder 

# ask something
tell me some thing about the "How to Build Custom Skills in Google Antigravity_ 5 Practical Examples _ Google Cloud - Community" pdf
```

### Ref
+ tool link
  + [200+ Claude Prompts](https://special-tamarind-9e9.notion.site/200-Claude-Prompts-846ccdb23d99835095c3011d10a89e01)
  + [Claude Masterclass (+20 Skills Templates)](https://special-tamarind-9e9.notion.site/Claude-Masterclass-20-Skills-Templates-312ccdb23d9980e59d95eb1f9ab9695b)
  + [Claude Chrome extension](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn)
+ Docs
  + [Claude use computer](https://claude.com/blog/dispatch-and-computer-use)
+ Simple Browser(for claude computer use 較流暢)
  + [Pale Moon](https://www.palemoon.org/download.shtml)
  + [ Met Min - Mac only](https://minbrowser.org/)