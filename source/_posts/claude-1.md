---
title: claude-1
abbrlink: 2abc
date: 2026-07-05 11:29:08
categories:
tags:
---

### 名詞解釋 
+ coding Agent : 常見有 Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Devin ...
  - Replit（Replit Agent）、Bolt.new 和 Lovable 也都屬於 Coding Agent / AI App Builder 類型，但它們更偏向「vibe coding」（提示式快速建置） 的瀏覽器內工具，強調從自然語言描述直接生成完整應用，適合原型開發、MVP 快速驗證，而非傳統大型 codebase 的深度工程。
  - Claude Code / Cursor：更適合專業開發、大型專案、重構、深度控制。
  - Replit / Bolt.new / Lovable：更適合快速原型、vibe 式建置（描述想法 → 直接出 App），門檻較低

<!--more-->

### setup  
#### mac - install
``` bash
# claude 訂閱 : https://claude.ai/ --> upgrade plan

# Install Claude Code via Native install (Mac)
# install error #1
gaoyiping@gaoyipingdeMacBook-Pro claude % curl -fsSL https://claude.ai/install.sh | bash
  Setting up Claude Code...
  ✘ Installation failed
  EACCES: permission denied, mkdir '/Users/gaoyiping/.local/state/claude'
  Try running with --force to override checks
# install error #2
# -p 表 如果上層資料夾不存在，會自動先建立上層資料夾
gaoyiping@gaoyipingdeMacBook-Pro claude % mkdir -p ~/.local/bin ~/.local/state ~/.claude
gaoyiping@gaoyipingdeMacBook-Pro claude % chown -R $(whoami) ~/.local ~/.claude
  chown: /Users/gaoyiping/.local/state/gem/last_update_check: Operation not permitted
  chown: /Users/gaoyiping/.local/state/gem: Operation not permitted
  chown: /Users/gaoyiping/.local/state: Operation not permitted
# error no /Users/gaoyiping/.local/state/claude
gaoyiping@gaoyipingdeMacBook-Pro ~ % sudo chown -R $(whoami) ~/.local/state/claude ~/.claude ~/.local/bin
  Password: 
  chown: /Users/gaoyiping/.local/state/claude: No such file or directory
# add /Users/gaoyiping/.local/state/claude
gaoyiping@gaoyipingdeMacBook-Pro ~ % mkdir .local/state/claude
  mkdir: .local/state/claude: Permission denied
gaoyiping@gaoyipingdeMacBook-Pro ~ % sudo mkdir .local/state/claude
  Password:
gaoyiping@gaoyipingdeMacBook-Pro ~ % sudo chown -R $(whoami) ~/.local/state/claude ~/.claude ~/.local/  bin 
gaoyiping@gaoyipingdeMacBook-Pro ~ % 
# re-install
gaoyiping@gaoyipingdeMacBook-Pro ~ % curl -fsSL https://claude.ai/install.sh | bash            
  Setting up Claude Code...
  ✔ Claude Code successfully installed!
    Version: 2.1.201
    Location: ~/.local/bin/claude
    Next: Run claude --help to get started
  ⚠ Setup notes:
    ● Native installation exists but ~/.local/bin is not in your PATH. Run:
      echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
  ✅ Installation complete!
# set claude code path
gaoyiping@gaoyipingdeMacBook-Pro ~ % echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
# check claude ready
  gaoyiping@gaoyipingdeMacBook-Pro ~ % claude --version
2.1.201 (Claude Code)
```

#### windows - install
``` bash
# claude 訂閱 : https://claude.ai/ --> upgrade plan

#　install node js
D:\>node --version
  v22.21.0

# install git
# git Bash
RobertKao@C15611110525001 MINGW64 ~
$ pwd
  /p/
RobertKao@C15611110525001 MINGW64 ~
$ mkdir claude
RobertKao@C15611110525001 MINGW64 ~
$ cd claude/
RobertKao@C15611110525001 MINGW64 /p/claude
$ mkdir demo-project
RobertKao@C15611110525001 MINGW64 /p/claude
$ cd demo-project/
RobertKao@C15611110525001 MINGW64 /p/claude/demo-project
$$ npm -v
11.6.2

# install claude code by npm
RobertKao@C15611110525001 MINGW64 /p/claude/demo-project
$ npm install -g @anthropic-ai/claude-code
  added 2 packages in 36s
  npm notice
  npm notice New minor version of npm available! 11.6.2 -> 11.18.0
  npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.18.0
  npm notice To update run: npm install -g npm@11.18.0
  npm notice
RobertKao@C15611110525001 MINGW64 /p/claude/demo-project
$ claude --version
  2.1.201 (Claude Code)
# upgrade 
RobertKao@C15611110525001 MINGW64 /p/claude/demo-project
$  npm install -g npm@11.18.0
  removed 60 packages, and changed 93 packages in 14s
RobertKao@C15611110525001 MINGW64 /p/claude/demo-project
$ npm -v
  11.18.0
# re-install claude code
RobertKao@C15611110525001 MINGW64 /p/claude/demo-project
$ npm install -g @anthropic-ai/claude-code
  changed 2 packages in 12s
  npm warn allow-scripts 1 package has install scripts not yet covered by allowScripts:
  npm warn allow-scripts   @anthropic-ai/claude-code@2.1.201 (postinstall: node install.cjs)
  npm warn allow-scripts
  npm warn allow-scripts Run `npm install -g --allow-scripts=@anthropic-ai/claude-code` to allow these scripts once, or `npm config set allow-scripts=@anthropic-ai/claude-code --location=user` to allow them for all global installs.
# set allow-scripts
RobertKao@C15611110525001 MINGW64 /p/claude/demo-project
$ npm install -g --allow-scripts=@anthropic-ai/claude-code
  npm error code ENOENT
  npm error syscall open
  npm error path P:\claude\demo-project\package.json
  npm error errno -4058
  npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open 'P:\claude\demo-project\package.json'
  npm error enoent This is related to npm not being able to find a file.
  npm error enoent
  npm error A complete log of this run can be found in: C:\Users\RobertKao\AppData\Local\npm-cache\_logs\2026-07-06T08_41_43_579Z-debug-0.log

# check npm
C:\Users\RobertKao>npm config get prefix
  C:\nvm4w\nodejs
C:\Users\RobertKao>nvm list
  * 22.21.0 (Currently using 64-bit executable)
C:\Users\RobertKao>c:\nvm4w\nodejs\npm -v
  11.18.0
# create package.json for test
P:\>cd claude
P:\claude>cd demo-project
P:\claude\demo-project>echo {} > package.json
P:\claude\demo-project>ls
  package.json
P:\claude\demo-project>npm install -g --allow-scripts=@anthropic-ai/claude-code
  npm error Cannot destructure property 'name' of '.for' as it is undefined.
  npm error A complete log of this run can be found in: C:\Users\RobertKao\AppData\Local\npm-cache\_logs\2026-07-06T09_21_58_275Z-debug-0.log
P:\claude\demo-project>rm ./package.json
# create project.json
P:\claude\demo-project>npm init -y
  Wrote to P:\claude\demo-project\package.json:
  {
    "name": "demo-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": "commonjs"
  }
# set allow-scripts
# 
P:\claude\demo-project>npm install -g --allow-scripts=@anthropic-ai/claude-code
  added 1 package in 503ms
# re install claude code 
# 1. 第一次 npm install -g @anthropic-ai/claude-code 安裝了套件，但因為 postinstall script 被阻擋，所以出現警告。
# 2. 第二次加上 --allow-scripts=@anthropic-ai/claude-code 後，npm 顯示 "up to date"，代表已經把 postinstall script 執行完畢，安裝完成。
P:\claude\demo-project>npm install -g @anthropic-ai/claude-code
  changed 2 packages in 29s
  npm warn allow-scripts 1 package has install scripts not yet covered by allowScripts:
  npm warn allow-scripts   @anthropic-ai/claude-code@2.1.202 (postinstall: node install.cjs)
  npm warn allow-scripts
  npm warn allow-scripts Run `npm install -g --allow-scripts=@anthropic-ai/claude-code` to allow these scripts once, or `npm config set allow-scripts=@anthropic-ai/claude-code --location=user` to allow them for all global installs.
P:\claude\demo-project>npm install -g --allow-scripts=@anthropic-ai/claude-code
  up to date in 568ms
P:\claude\demo-project>claude --version
  2.1.202 (Claude Code)
P:\claude\demo-project>npm list -g @anthropic-ai/claude-code
  C:\nvm4w\nodejs -> .\
  `-- @anthropic-ai/claude-code@2.1.202

# (optional) Uninstall Claude Code 
npm uninstall -g @anthropic-ai/claude-code
```

#### vs code setting
``` bash
# install extension :  claude code for vs code
--> press claude code icon --> start claude code

# enable all claude code function for vscode 
top bar : >Preferences: Open User Settings (JSON)
# add item
  "claudeCode.useTerminal": true
# close file --> save

# run cloude code 
--> press claude code icon --> start claude code

# input
"
create a new file with one line change of the content 'this is a new line generated by Claude Code
" 
# check new_file.txt
this is a new line generated by Claude Code
```


### command

#### issue
``` bash
# /memory 
  - no for project
  - cannot Open auto-memory folder
```

#### 常用
``` bash
/init : create CLAUDE.md
/context : check context usage
esc : cancel the current operation
esc+ecs : rewind(轉回) the prompt history
@file : reference a file in the prompt
[image] : simple copy+paste image
?? /memory : auto-learned knowledge(跨session 但只載入 200 行)
/compact : reduce context size
/clear : clear all context

/resume : get old session
/rename : save session
Ctrl+T : implement time show todo list

?? /verbose : 不會截斷命令內容 (ctrl+o)
```

#### 常用
``` bash
shift+tab : Plan mode
Ultrathink : complex Task
  think → think hard → think harder → ultrathink
```

#### 設定 && 單次使用
``` bash
exit, quit, q or Ctrl+C :　close claude code
/login, /logout, /model : Setup
/ide : Code Edit Integration
/permissions : Manage Tools 
```

#### 非常進階好用
``` bash
/custom : Custom Commands
```


### example 
#### 1st example
``` bash
gaoyiping@gaoyipingdeMacBook-Pro ~ % cd ~/work/claude 
gaoyiping@gaoyipingdeMacBook-Pro claude % ls
gaoyiping@gaoyipingdeMacBook-Pro claude % mkdir demo-project
gaoyiping@gaoyipingdeMacBook-Pro claude % cd demo-project 
# run claude code
claude

which year was bitcoin invented?  
```

#### snake game
``` bash
# snake_game
# run claude code
# create game
create a one-page snake game as a simple server running on localhost.
created a README.md file to document the steps to start the server as well.
# run server
start the server
# run browse
http://localhost:8000/

# speed slow down
Â please slow down the speed

# change to 2 food in the field
now, I want to have 2 food available to consume all the time during the game instead of just 1 food.

# feature: pause features 
# not need, it suppport at create 
# implement a new feature after the game starts, users could press space as a toggle to pause/resume the game. 

# homework : super food
add a supper food, when snake touch increase 
# homework : pass through walls
add feature for the snake can pass through the walls
```

#### treasure game
``` bash
# create CLAUDE.md
/init : create CLAUDE.md file

# install node
# brew install nodwe
node –version
# install 
npm install
clear
# run
npm run dev
# run game - browser
http://localhost:3000/

# add open chest sound
 use @src/audios/chest_open.mp3 in the the @src/App.tsx
  to play the sound effect of the chest being opend.
  do not do any else.

# restart the server (if need)

# change found the skeleton use evil sound
use @src/audios/chest_open_with_evil_laugh.mp3 sound effect if open chest found hide the skeleton.
  do not do any else.

# end server
close the server

# run server
npm run dev

# add result 
 '/Users/gaoyiping/Desktop/截圖 2026-07-06 晚上11.11.02.png' show the result to be either : win, tie or loss in the circled place according to the final score

# change result position
please put the result at current Score box

# add result - 2(windows)
c:\Users\RobertKao\Downloads\treasure_result.png show the result either:win , tie or loss in the circled place according to the final score

# homework : change cursor
when mouse move over chest show cursor @src\assets\key.png

# terminal server(mac) 
gaoyiping@gaoyipingdeMacBook-Pro claude_code_treasure_game-initial % ps aux | grep vite
  gaoyiping        52931   0.0  0.0 435299792   1376 s003  S+   11:37PM   0:00.00 grep vite
  gaoyiping        49658   0.0  0.5 458019280 120192   ??  SN   11:23PM   0:01.13 node /Users/gaoyiping/work/claude/claude_code_treasure_game-initial/node_modules/.bin/vite

gaoyiping@gaoyipingdeMacBook-Pro claude_code_treasure_game-initial % kill -9 49658                                                                
gaoyiping@gaoyipingdeMacBook-Pro claude_code_treasure_game-initial % ps aux | grep vite
  gaoyiping        53604   0.0  0.0 435299664   1376 s003  S+   11:39PM   0:00.00 grep vite

# test command
/context
/compact
# test rewind
check my project with AngularJS to see if any taxy error.
# esc+esc --> rewind the command

# resume test
❯ I plan to do sign up and sing in plan. Do a quick brief research, what option do I have?
...
# save session
/rename sign-up-implementation
# exit
/exit
# resume 
claude --resume "sign-up-implementation"

# ask about develop 
❯ Wat are the best development approaches for my app? I only expect to have < 100 active user the same
  time on my site.
/rename development-options

# show all session
claude 
/resume

# plan mode : shift+Tab
what database options I have to implement sign up and sign in flow?

can I use SQLite ?

use SQLite to build a simple sign up and sing in flow and store the game score for each signed in user.
  In additionallow to play the game as guest without storing any data.
------------------------------

# plan mode #2 
what database options I have to implement sign up and sign in flow?
```

### other
#### mac 錄影
``` bash
start : Cmd+Shift+5  --> select 錄製
stop  : Ｃmd+Ctrl+Esc or Cmd+Shift+5 --> stop
```

### Ref
+ Tool
  - ShareX : 螢幕擷圖軟體
+ Document
  - [Claude Code Docs](https://code.claude.com/docs/zh-TW/)
+ Source
  - [Unit 2-1](https://github.com/uopsdod/claude_code_treasure_game/tree/initial)

