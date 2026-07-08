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

#### Core Memory Management Rule
``` bash
# 中文版本
# CLAUDE.md - Project Instructions

## Core Memory Management Rule（最高優先）
你會主動維護這個 CLAUDE.md 檔案作為專案的核心知識庫。
- 每次 session 開始時，先檢查並回顧本檔案內容。
- 當發現 Auto Memory 中有重要新學習（規則、style、workflow、debug 心得、避免錯誤等），請主動提出總結，並建議更新這個 CLAUDE.md。
- 保持內容**精煉、簡潔、有結構**（避免冗長），優先使用 bullet points 或表格。
- 重要更新後，請在檔案頂端標註更新日期，例如 `<!-- Last updated: YYYY-MM-DD -->`。
- 每隔 5-7 次主要互動，或專案有重大進展時，自動產生完整的最新總結版本供我確認。

請嚴格遵循以上規則，讓跨裝置開發時知識能有效傳遞。


# english version
# CLAUDE.md - Project Instructions

## Core Memory Management Rule (Highest Priority)
You will actively maintain this CLAUDE.md file as the project's central knowledge base.

- At the start of every session, review and recall the content of this file first.
- When you discover important new learnings in Auto Memory (rules, coding style, workflows, debugging insights, error prevention patterns, preferences, etc.), proactively summarize them and suggest updates to this CLAUDE.md file.
- Keep all content **concise, refined, and well-structured** (use bullet points, numbered lists, or tables whenever possible). Avoid unnecessary length.
- After any significant update, add a date marker at the top of the file, for example: `<!-- Last updated: YYYY-MM-DD -->`.
- Every 5-7 major interactions, or whenever there is significant project progress, automatically generate a complete updated summary version for my review.

Strictly follow these rules to ensure knowledge transfers effectively across devices.
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
/memory : auto-learned knowledge(跨session 但只載入 200 行)
# force save to auto memory
1. Remember that I prefer Git commit messages to follow the Conventional Commits format. Save this to auto memory.
2. Remember that this project always uses CMake instead of Make, and save this in auto memory.
# memory path
windows - "C:\Users\RobertKao\.claude\projects\D--work-run-claude-claude-code-treasure-game-initial\memory"

/compact : reduce context size
/clear : clear all context

/resume : get old session
/rename : save session
Ctrl+T : implement time show todo list

?? /verbose : 不會截斷命令內容 (ctrl+o)
```

#### 進階
``` bash
shift+tab : Plan mode
Ultrathink : complex Task
  think → think hard → think harder → ultrathink

/usage : Show session cost, plan usage, and activity stats
/usage-credits : Configure usage credits to keep working when you hit a limit

# debug
/debug
"Debug logging is now active for this session, writing to C:\Users\RobertKao\.claude\debug\af09b2d2-cc6f-432c-a221-179c1f8313a6.txt. No log file exists yet since logging just turned on — nothing from earlier in this session was captured.
To debug something, reproduce the issue now (e.g. whatever was going wrong with /memory cancelling repeatedly, or the sign-in/sign-out behavior you mentioned earlier), then let me know and I'll read the log for [ERROR]/[WARN] entries and stack traces. If it's something that happens on startup, restart with claude --debug instead so it's captured from the beginning.
What would you like to reproduce/debug
---------------"
# read error 
Read the debug log and find any ERROR or WARN related to opening auto-memory folder.

# run debug mode
claude --debug

# show claude position
D:\work\run\claude\claude_code_treasure_game-initial>type C:\nvm4w\nodejs\claude.cmd
@ECHO off
GOTO start
:find_dp0
SET dp0=%~dp0
EXIT /b
:start
SETLOCAL
CALL :find_dp0
"%dp0%\node_modules\@anthropic-ai\claude-code\bin\claude.exe"   %*
# show version
D:\work\run\claude\claude_code_treasure_game-initial>"C:\nvm4w\nodejs\node_modules\@anthropic-ai\claude-code\bin\claude.exe" --version
2.1.204 (Claude Code)

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

# add sigin up/sign in
use SQLite to build a simple sign up and sing in flow and store the game score for each signed in user. In additionallow to play the game as guest without storing any data.
```

### other
#### mac 錄影
``` bash
start : Cmd+Shift+5  --> select 錄製
stop  : Ｃmd+Ctrl+Esc or Cmd+Shift+5 --> stop
```

#### vim
``` bash
# quit file
:q!

```

#### where(windows)
``` bash
D:\work\run\claude\claude_code_treasure_game-initial>where claude
C:\nvm4w\nodejs\claude
C:\nvm4w\nodejs\claude.cmd

D:\work\run\claude\claude_code_treasure_game-initial>where node
C:\nvm4w\nodejs\node.exe

D:\work\run\claude\claude_code_treasure_game-initial>where npm
C:\nvm4w\nodejs\npm
C:\nvm4w\nodejs\npm.cmd

P:\>where python
  C:\Users\RobertKao\AppData\Local\Programs\Python\Python313\python.exe
  # 這是 Microsoft Store 的 Python，通常建議避免使用，以免遇到路徑或權限問題。
  C:\Users\RobertKao\AppData\Local\Microsoft\WindowsApps\python.exe
# show which 1
P:\>python -c "import sys; print(sys.executable)"
  C:\Users\RobertKao\AppData\Local\Programs\Python\Python313\python.exe
```

#### graphifyy - claude code(use Claude Pro)
##### setup
``` bash
# claude login(already)
D:\work\run\claude\claude_code_treasure_game-initial>pip --version
  pip 25.2 from C:\Users\RobertKao\AppData\Local\Programs\Python\Python313\Lib\site-packages\pip (python 3.13)
D:\work\run\claude\claude_code_treasure_game-initial>pip install graphifyy
  ...
  [notice] A new release of pip is available: 25.2 -> 26.1.2
  [notice] To update, run: python.exe -m pip install --upgrade pip 
D:\work\run\claude\claude_code_treasure_game-initial>python.exe -m pip install --upgrade pip
  ...
D:\work\run\claude\claude_code_treasure_game-initial>graphify install
    ╭──◉──╮     ╭──◉──╮
  ╱  ◉   ◉ ╲ ╱ ◉   ◉  ╲
  │   ◉─◉─◉  ◉  ◉─◉─◉   │
  │    ◉   ◉ │ ◉   ◉    │
  │   ◉─◉─◉  ◉  ◉─◉─◉   │
  ╲  ◉   ◉ ╱ ╲ ◉   ◉  ╱
    ╰──◉──╯     ╰──◉──╯
            ◉
    █▀▀ █▀█ ▄▀█ █▀█ █ █ █ █▀▀ █▄█
    █▄█ █▀▄ █▀█ █▀▀ █▀█ █ █▀   █  0.9.9
    references       ->  C:\Users\RobertKao\.claude\skills\graphify\references
    skill installed  ->  C:\Users\RobertKao\.claude\skills\graphify\SKILL.md
    CLAUDE.md        ->  skill registered in C:\Users\RobertKao\.claude\CLAUDE.md
  Done. Open your AI coding assistant and type:
    /graphify .
# 專案內執行，安裝 hook
D:\work\run\claude\claude_code_treasure_game-initial>graphify claude install
  graphify section written to D:\work\run\claude\claude_code_treasure_game-initial\CLAUDE.md
    .claude/settings.json  ->  PreToolUse hooks registered (Bash search + Read/Glob)
  Claude Code will now check the knowledge graph before answering
  codebase questions and rebuild it after code changes. 
# Graphify 建圖
# Claude Code 裡執行：
/graphify .
--------------------> 
## xx select No (Use Pro(subscrib) account)
## select Yes (complete all flow)
 Bash command
   echo "GEMINI_API_KEY set: ${GEMINI_API_KEY:+yes}"
   echo "GOOGLE_API_KEY set: ${GOOGLE_API_KEY:+yes}"
   Check for Gemini API key presence
 Contains expansion
 Do you want to proceed?
   1. Yes
 > 2. No
----------------------
  ....
  Transcription needs an extra dependency (faster-whisper) for two short sound-effect files with no speech content — not worth installing. Skipping those two, continuing with the rest of the pipeline.

  Now extracting code structure (AST) and dispatching semantic extraction for docs/images in parallel.

    Ran 2 shell commands
  PreToolUse:Bash hook error
  Failed with non-blocking status code: /usr/bin/bash: line 1: C:UsersRobertKaoAppDataLocalProgramsPythonPython313Scriptsgraphify.EXE: command not found

  Now checking the semantic extraction cache and API key status before dispatching subagents for docs/images.

    Ran 1 shell command
----------------------
# 產生以下資料
### 產生的結構（`graphify-out/` 資料夾）：
graphify-out/
├── GRAPH_REPORT.md          ← 最重要！人類可讀摘要
├── graph.json               ← 完整的知識圖譜資料（機器可讀）
├── graph.html               ← 互動式視覺化圖譜（瀏覽器開啟）
├── cache/                   ← 快取資料（incremental 更新用）
├── nodes/                   ← 各類節點詳細資訊（可選）
└── edges/                   ← 關係邊資訊（可選）
### 每個檔案/目錄如何使用：
1. **GRAPH_REPORT.md**（最常用）
   - 內容包含：God Nodes（核心節點）、Communities（模組群組）、Surprising Connections（意外關聯）、建議問題等。
   - **使用方式**：Claude Code 會自動讀取（尤其裝了 PreToolUse hook 後）。你也可以直接用 markdown 閱讀器打開，快速了解專案架構。
2. **graph.html**
   - 互動式網頁圖譜。
   - **使用方式**：用瀏覽器直接打開（雙擊即可），可以點擊、縮放、搜尋節點，非常適合視覺化理解專案。
3. **graph.json**
   - 原始圖譜資料。
   - **使用方式**：進階查詢時用，例如 `/graphify query "你的問題"` 就會讀這個檔案。
4. **cache/ 和 transcripts/**
   - 加速後續更新。
   - 不用手動操作。
5. cost.json ← 這次建圖消耗的 token/cost 記錄
### 日常推薦使用方式：
- **在 Claude Code 內**：
  - `/graphify query "login 功能如何連接到資料庫？"`
  - `/graphify path "從 A 到 B 的呼叫路徑"`
  - `/graphify explain "某個函式"`
- **自動模式**：安裝 `graphify claude install` 後，Claude 會在每次 Glob/Grep 前自動參考 GRAPH_REPORT.md，省 token 效果最好。
- **視覺化**：用 Obsidian 打開專案，把 `graph.html` 當作輔助 dashboard。
### 下步建議
建圖完成後，先打開 `graphify-out/GRAPH_REPORT.md` 看內容是否合理，然後在 Claude Code 輸入 `/graphify` 測試指令。
建完後貼一下 `GRAPH_REPORT.md` 的前幾行或整體感覺，我幫你解讀或建議如何更好利用！
----------------------
# check useage
"
/useage
  Read 1 file, ran 3 shell commands
  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  ttings  Status   Config   Usage   Stats                      
  ssion
                                                              tal cost:            $0.51
  tal duration (API):  1m 12s
  tal duration (wall): 9m 12s                                  tal code changes:    0 lines added, 0 lines removed
  Usage by model:
      claude-sonnet-5:  3.6k input, 5.1k output, 687.1k cache read, 35.8k cache write ($0.51)
  Current session
  ███▌                                               7% used
  Resets 2:50pm (Asia/Taipei)
  rrent week (all models)
                                                  1% used     sets Jul 15, 5am (Asia/Taipei)
  Current week (Fable)
                                                    0% used
  What's contributing to your limits usage?
  Approximate, based on local sessions on this machine — does not include other devices or claude.ai
  Last 24h · these are independent characteristics of your usage, not a breakdown
----------------------
"
# 無 GRAPH_REPORT.md - 語義提取或最終報告生成階段可能失敗或被中斷
/graphify --update
  ...
  Bash command
     echo "GEMINI_API_KEY set: $  {GEMINI_API_KEY:+yes}  ${GEMINI_API_KEY:-no}"
     echo "GOOGLE_API_KEY set: $  {GOOGLE_API_KEY:+yes}  ${GOOGLE_API_KEY:-no}"
     Check for Gemini/Google API keys
   Contains expansion
   Do you want to proceed?
   ❯ 1. Yes
     2. No
--> Select Yes
  ... --> generate GRAPH_REPORT.md
----------------------
# check useage
"
/useage
Settings  Status   Config   Usage   Stats
Session
Total cost:            $5.01
Total duration (API):  12m 3s
Total duration (wall): 24m 10s
Total code changes:    140 lines added, 0 lines removed
Usage by model:
     claude-sonnet-5:  30.8k input, 71.7k output, 7.0m cache read, 332.3k cache write ($5.01)
Current session
███████████                                        22% used
Resets 2:50pm (Asia/Taipei)
Current week (all models)
█▌                                                 3% used
Resets Jul 15, 5am (Asia/Taipei)
Current week (Fable)
                                                   0% used
What's contributing to your limits usage?
Approximate, based on local sessions on this machine — does not include other devices or claude.ai
Last 24h · these are independent characteristics of your usage, not a breakdown
90% of your usage came from subagent-heavy sessions
 Each subagent runs its own requests. Be deliberate about spawning them — and consider configuring a cheaper model for simpler subagents.
16% of your usage came from /graphify
 Heavy skills can be scoped down or run with a cheaper model via skill frontmatter.
Skills                  % of usage
/graphify                      16%
/run                           12%
/debug                          5%
/init                           3%

Subagents               % of usage
graphify                        6%
Explore                         2%
Plan                            1%
d to day · w to week
Usage credits
Usage credits are off · /usage-credits to turn them on
"
----------------------
# ask 
/graphify query "the project main function"
# run by browser
用瀏覽器打開 graph.html 檔案，可以點擊探索整個知識圖譜。
#  run graphify claude install 確認(不一定需要執行)
# graphify claude install 的主要作用是：
# 在 ~/.claude/ 目錄安裝 skill 定義。
# 寫入 CLAUDE.md 規則。
# 安裝 PreToolUse hook（讓 Claude 在每次檔案搜尋前自動讀 GRAPH_REPORT.md）。
# 這個指令主要是針對 Claude Code 環境的設定，而不是針對單一專案的圖譜。
PS D:\work\run\claude\claude_code_treasure_game-initial\graphify-out> graphify claude install
    graphify section written to D:\work\run\claude\claude_code_treasure_game-initial\graphify-out\CLAUDE.md
      .claude/settings.json  ->  PreToolUse hooks registered (Bash search + Read/Glob)
    Claude Code will now check the knowledge graph before answering
    codebase questions and rebuild it after code changes.
# 測試是否生效
# 1. Claude Code 輸入： /graphify status
"
  Graph
  - 476 nodes · 847 edges · 30 communities (26 shown, 4 thin omitted)
  - Corpus: 74 files · ~143,223 words (5 docs, 5 images, 64 code files; 2 audio files were dropped — no Whisper backend installed)
  - Extraction quality: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS
  - ⚠️ Known health issue: 211 dangling-endpoint edges + 6 collapsed edges (semantic subagents' predicted code-node IDs didn't all match the AST extractor's IDs — flagged when the graph was built, not yet fixed)
  - Last built: 2026-07-08 14:26–14:28 (this session,ted before)

  Cost tracker (cost.json)
  - 1 run total · 207,768 input tokens · 0 output tokens

  Outputs present in graphify-out/
  - graph.json (434 KB), graph.html (405 KB), GRAPH_Rphify_labels.json, cache/, transcripts/ (empty — nosuccessful transcriptions)

  Something unexpected worth flagging: graphify-out/.claude/settings.json and graphify-out/CLAUDE.md exist but weren't created by     anything I ran this session — no --wiki/hooks step e installs PreToolUse hooks that intercept everyBash and Read|Glob call through graphify hook-guard. That's a real behavioral change (it'll run on your next tool calls) sitting in a nested, non-standard location. I haven't touched hook-guard actually does, or remove it?
"
# 2. Claude Code 輸入： 這個專案的主要功能是什麼？核心檔案有哪些？
# other example 
/graphify query "你的問題"
/graphify path "從某功能到另一功能的呼叫路徑"
/graphify explain "某函式或類別"
# 更新圖譜：之後修改大量程式碼時，執行：
/graphify --update
```

##### graphifyy 使用
###### 1. **最常用指令（直接在 Claude Code 輸入）**

| 指令 | 用途 | 範例 |
|------|------|------|
| `/graphify query` | 問任何專案相關問題 | `/graphify query "登入功能如何運作？"` |
| `/graphify explain` | 詳細解釋某個檔案/函式/類別 | `/graphify explain "TreasureGame"` |
| `/graphify path` | 顯示呼叫路徑 | `/graphify path "從主選單到遊戲開始"` |
| `/graphify status` | 查看圖譜狀態 | `/graphify status` |

###### 2. **日常最佳工作流**

- **自動模式（推薦）**：  
  你已經安裝 hook 了，之後直接正常問 Claude Code 問題即可，例如：  
  「這個遊戲的存檔系統怎麼實作？」  
  Claude 會自動先讀 `GRAPH_REPORT.md`，回答更準、更省 token。

- **更新圖譜**：
  - 修改大量程式碼後 → `/graphify --update`
  - 想強制完整重建 → `/graphify . --force`

- **視覺化瀏覽**：
  - 用瀏覽器打開 `graphify-out/graph.html`（可點擊探索整個專案結構）
  - 或用 Obsidian 開啟專案，把 graph.html 當儀表板

###### 3. **進階用法**
- 看報告：直接打開 `graphify-out/GRAPH_REPORT.md`
- 找核心：看裡面的 **God Nodes**（最重要的類別/檔案）
- 發現問題：看 **Surprising Connections**（意外的關聯）

#### OBsidian
``` bash
# download OBsidian then install
https://obsidian.md/

# 1st run
建立新的儲存庫
name : Claude-Graphify
path : D:\work\run\claude
# 建立 project 目錄 at OBsidian
example : D:\work\run\claude\Claude-Graphify\claude_code_treasure_game-initial

# xx - claude code 產生 project 分析檔案
/graphify . --obsidian --obsidian-dir "..\Claude-Graphify\claude_code_treasure_game-initial"
# xx - 在 Claude Code 裡輸入以下指令（讓它認識這個 Vault）
/graphify "..\Claude-Graphify\claude_code_treasure_game-initial" --obsidian

# 使用絕對路徑
/graphify . --obsidian --obsidian-dir "D:\work\run\claude\Claude-Graphify\claude_code_treasure_game-initial"
# 於 .\graphify-out 產生 GRAPH_REPORT.md
/graphify .

# 在 Claude Code 輸入以下指令測試
1. Read the GRAPH_REPORT.md from graphify-out in my claude_code_treasure_game-initial project and give me a high-level summary of the project architecture.
2. From now on, when working on claude_code_treasure_game-initial, always reference the GRAPH_REPORT.md and the Obsidian vault at D:\work\run\claude\Claude-Graphify\claude_code_treasure_game-initial


/graphify "D:\work\run\claude\Claude-Graphify\claude_code_treasure_game-initial" --obsidian
```





### Ref
+ Tool
  - ShareX : 螢幕擷圖軟體
+ Document
  - [Claude Code Docs](https://code.claude.com/docs/zh-TW/)
+ Source
  - [Unit 2-1](https://github.com/uopsdod/claude_code_treasure_game/tree/initial)

