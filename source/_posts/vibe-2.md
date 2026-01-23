---
title: Vibe coding(2)
abbrlink: 7dc4
date: 2026-01-19 15:24:50
categories:
tags:
  - Vibe Coding
---

### Amp free
#### item
``` bash
# login 後要填 : Try to convince that you're human 表單

# vscode install  Amp (Research Preview)
# 開一個新 thread（Cmd/Ctrl + L)
  --> Login in Amp
  --> Open
  --> Configure Amp for VS Code

# clone a github project

# 在 VS Code 裡要讓 Amp 產生/更新 AGENTS.md
「請掃描這個 repo，幫我在專案根目錄建立（或更新）AGENTS.md，包含：如何安裝依賴、如何啟動、如何跑測試/lint、程式碼風格/慣例，以及常見陷阱。」
```

### codex code
#### 建立 AGENTS.md（放在 repo 根目錄）
``` bash
# 用「單次命令」啟動 Codex，並且把審核機制設成完全不需要你按同意，然後請它輸出「目前它正在遵守哪些指示/規範」的摘要（例如是否讀到你 repo 裡的 AGENTS.md、目前工作目錄、權限模式等）。
codex --ask-for-approval never "Summarize the current instructions."

依照專案結構生成一份 AGENTS.md
```

#### 結束前做「可交接輸出」：在退出 Codex 前，請它生成一段「目前做了什麼 + 下一步清單」
``` bash
請產出「交接輸出」(markdown)，包含：
1) Done：本次做了哪些事（用條列，含關鍵決策）
2) Files changed：列出修改過的檔案與每個檔案做了什麼
3) How to verify：我該跑哪些指令驗證（含預期結果）
4) Next：下一步待辦清單（按優先順序）
5) Known issues / risks：可能的坑、需要人工確認的點
請控制在 200~400 字內，適合貼到 PR 描述或 NOTES.md。
```

#### model 比較
``` bash
gpt-5.2-codex 最強（長時間 agentic coding）
gpt-5-codex 是上一代長任務 Codex
gpt-5.1-codex-mini 是 5.1 Codex 的省錢小模型
codex-mini-latest 則是 Codex CLI 的「滾動更新」預設快模型（便宜/快，但定位不同）。

| 模型                | 定位/適合                                            | 能力與世代關係                                                                         | 計費（每 1M tokens）                            |
| :--                 | :--                                                 | :--                                                                                   | :--                                            |
| gpt-5.2-codex       | 最進階的真實工程「代理式」編碼（長任務、反覆測試迭代）   | 官方列為 Recommended，屬「Most advanced agentic coding model」，且為目前 Codex 主推型號   | Input $1.75, Cached $0.175, Output $14.00   |
| gpt-5.1-codex-mini  | 需要更強能力但想控成本（大型 repo/長上下文仍可用）      | 官方定義為 GPT‑5.1‑Codex 的較小、較省、較不強版本                                         | Input $0.25, Cached $0.025, Output $2.00   |
| gpt-5-codex         | 上一代長時間 agentic coding（若專案鎖版本或舊流程可用） | 官方說明：為 GPT‑5 調校的長時間 Codex 任務；已被 gpt-5.1-codex 取代（Succeeded by）        | Input $1.25, Cached $0.125, utput $10.00  |
| codex-mini-latest   | Codex CLI 日常互動、快速修改、低延遲（「預設快手」）    | 以 `-latest` 形式提供，代表會隨時間滾動到新快照；偏向 CLI/工具流的預設選擇                   | Input $1.50, Cached $0.375, Output $6.00    |

```

#### install at windows
``` bash
# check status(cmd)
C:\Users\RobertKao>wsl --version
  WSL 版本： 2.6.3.0
  核心版本： 6.6.87.2-1
  WSLg 版本： 1.0.71
  MSRDC 版本： 1.2.6353
  Direct3D 版本： 1.611.1-81528511
  DXCore 版本： 10.0.26100.1-240331-1435.ge-release
  Windows 版本： 10.0.26200.7623
C:\Users\RobertKao>node --version
  v22.21.
# WSL 發行版 是 Docker Desktop 的 WSL distro（PRETTY_NAME="Docker Desktop"），
# 這個環境本來就極簡，很多常用指令（bash、curl、套件管理器）可能不存在，不適合拿來當日常開發環境或裝 Codex。
C15611110525001:/mnt/host/c/WINDOWS/system32# cat /etc/os-release
  PRETTY_NAME="Docker Desktop"
C15611110525001:/mnt/host/c/WINDOWS/system32# uname -a
  Linux C15611110525001 6.6.87.2-microsoft-standard-WSL2 #1 SMP PREEMPT_DYNAMIC Thu Jun  5 18:30:46 UTC 2025 x86_64 Linux

# 裝一個真正的 WSL 發行版（Ubuntu）- robert(ttest@ password) 
PS C:\WINDOWS\system32> wsl --list --verbose
    NAME              STATE           VERSION
  * docker-desktop    Running         2
PS C:\WINDOWS\system32> wsl --list --online
  下列是可安裝的有效發佈清單。
  使用 'wsl.exe --install <Distro>' 安裝.

  NAME                            FRIENDLY NAME
  Ubuntu                          Ubuntu
  Ubuntu-24.04                    Ubuntu 24.04 LTS
  openSUSE-Tumbleweed             openSUSE Tumbleweed
  openSUSE-Leap-16.0              openSUSE Leap 16.0
  SUSE-Linux-Enterprise-15-SP7    SUSE Linux Enterprise 15 SP7
  SUSE-Linux-Enterprise-16.0      SUSE Linux Enterprise 16.0
  kali-linux                      Kali Linux Rolling
  Debian                          Debian GNU/Linux
  AlmaLinux-8                     AlmaLinux OS 8
  AlmaLinux-9                     AlmaLinux OS 9
  AlmaLinux-Kitten-10             AlmaLinux OS Kitten 10
  AlmaLinux-10                    AlmaLinux OS 10
  archlinux                       Arch Linux
  FedoraLinux-43                  Fedora Linux 43
  FedoraLinux-42                  Fedora Linux 42
  eLxr                            eLxr 12.12.0.0 GNU/Linux
  Ubuntu-20.04                    Ubuntu 20.04 LTS
  Ubuntu-22.04                    Ubuntu 22.04 LTS
  OracleLinux_7_9                 Oracle Linux 7.9
  OracleLinux_8_10                Oracle Linux 8.10
  OracleLinux_9_5                 Oracle Linux 9.5
  openSUSE-Leap-15.6              openSUSE Leap 15.6
  SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
PS C:\WINDOWS\system32> wsl --install -d Ubuntu
  正在下載: Ubuntu
  正在安裝: Ubuntu
  已成功安裝發佈。可以透過 『wsl.exe -d Ubuntu' 啟動
  正在啟動 Ubuntu...
  Provisioning the new WSL instance Ubuntu
  This might take a while...
  Create a default Unix user account: robert
  New password:
  Retype new password:
  passwd: password updated successfully
  To run a command as administrator (user "root"), use "sudo <command>".
  See "man sudo_root" for details.

PS C:\WINDOWS\system32> wsl --list --verbose
  NAME              STATE           VERSION
* docker-desktop    Running         2
  Ubuntu            Stopped         2
robert@C15611110525001:/mnt/c/WINDOWS/system32$
'
# 裝好後用下面進入 Ubuntu：
PS C:\WINDOWS\system32> wsl -d Ubuntu
  To run a command as administrator (user "root"), use "sudo <command>".
  See "man sudo_root" for details.
robert@C15611110525001:/mnt/c/WINDOWS/system32$
# linux update
robert@C15611110525001:/mnt/c/WINDOWS/system32$ sudo apt-get update
  [sudo] password for robert:
  Get:1 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
  Hit:2 http://archive.ubuntu.com/ubuntu noble InRelease
  Get:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
  Get:4 http://security.ubuntu.com/ubuntu noble-security/main amd64 Packages [1409 kB]
  Get:5 http://archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]
  Get:6 http://archive.ubuntu.com/ubuntu noble/universe amd64 Packages [15.0 MB]
  Get:7 http://security.ubuntu.com/ubuntu noble-security/main Translation-en [229 kB]
  Get:8 http://security.ubuntu.com/ubuntu noble-security/main amd64 Components [21.5 kB]
  Get:9 http://security.ubuntu.com/ubuntu noble-security/main amd64 c-n-f Metadata [9800 B]
  Get:10 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Packages [924 kB]
  Get:11 http://security.ubuntu.com/ubuntu noble-security/universe Translation-en [209 kB]
  Get:12 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Components [74.3 kB]
  Get:13 http://security.ubuntu.com/ubuntu noble-security/universe amd64 c-n-f Metadata [19.7 kB]
  Get:14 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Packages [2302 kB]
  Get:15 http://security.ubuntu.com/ubuntu noble-security/restricted Translation-en [527 kB]
  Get:16 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Components [212 B]
  Get:17 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 c-n-f Metadata [500 B]
  Get:18 http://security.ubuntu.com/ubuntu noble-security/multiverse amd64 Packages [28.0 kB]
  Get:19 http://security.ubuntu.com/ubuntu noble-security/multiverse Translation-en [6472 B]
  Get:20 http://security.ubuntu.com/ubuntu noble-security/multiverse amd64 Components [212 B]
  Get:21 http://security.ubuntu.com/ubuntu noble-security/multiverse amd64 c-n-f Metadata [384 B]
  Get:22 http://archive.ubuntu.com/ubuntu noble/universe Translation-en [5982 kB]
  Get:23 http://archive.ubuntu.com/ubuntu noble/universe amd64 Components [3871 kB]
  Get:24 http://archive.ubuntu.com/ubuntu noble/universe amd64 c-n-f Metadata [301 kB]
  Get:25 http://archive.ubuntu.com/ubuntu noble/multiverse amd64 Packages [269 kB]
  Get:26 http://archive.ubuntu.com/ubuntu noble/multiverse Translation-en [118 kB]
  Get:27 http://archive.ubuntu.com/ubuntu noble/multiverse amd64 Components [35.0 kB]
  Get:28 http://archive.ubuntu.com/ubuntu noble/multiverse amd64 c-n-f Metadata [8328 B]
  Get:29 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages [1699 kB]
  Get:30 http://archive.ubuntu.com/ubuntu noble-updates/main Translation-en [314 kB]
  Get:31 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Components [175 kB]
  Get:32 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 c-n-f Metadata [16.0 kB]
  Get:33 http://archive.ubuntu.com/ubuntu noble-updates/universe amd64 Packages [1519 kB]
  Get:34 http://archive.ubuntu.com/ubuntu noble-updates/universe Translation-en [310 kB]
  Get:35 http://archive.ubuntu.com/ubuntu noble-updates/universe amd64 Components [386 kB]
  Get:36 http://archive.ubuntu.com/ubuntu noble-updates/universe amd64 c-n-f Metadata [31.6 kB]
  Get:37 http://archive.ubuntu.com/ubuntu noble-updates/restricted amd64 Packages [2498 kB]
  Get:38 http://archive.ubuntu.com/ubuntu noble-updates/restricted Translation-en [573 kB]
  Get:39 http://archive.ubuntu.com/ubuntu noble-updates/restricted amd64 Components [212 B]
  Get:40 http://archive.ubuntu.com/ubuntu noble-updates/restricted amd64 c-n-f Metadata [512 B]
  Get:41 http://archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 Packages [42.9 kB]
  Get:42 http://archive.ubuntu.com/ubuntu noble-updates/multiverse Translation-en [8340 B]
  Get:43 http://archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 Components [940 B]
  Get:44 http://archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 c-n-f Metadata [652 B]
  Get:45 http://archive.ubuntu.com/ubuntu noble-backports/main amd64 Packages [40.4 kB]
  Get:46 http://archive.ubuntu.com/ubuntu noble-backports/main Translation-en [9208 B]
  Get:47 http://archive.ubuntu.com/ubuntu noble-backports/main amd64 Components [7296 B]
  Get:48 http://archive.ubuntu.com/ubuntu noble-backports/main amd64 c-n-f Metadata [368 B]
  Get:49 http://archive.ubuntu.com/ubuntu noble-backports/universe amd64 Packages [29.5 kB]
  Get:50 http://archive.ubuntu.com/ubuntu noble-backports/universe Translation-en [17.9 kB]
  Get:51 http://archive.ubuntu.com/ubuntu noble-backports/universe amd64 Components [10.5 kB]
  Get:52 http://archive.ubuntu.com/ubuntu noble-backports/universe amd64 c-n-f Metadata [1444 B]
  Get:53 http://archive.ubuntu.com/ubuntu noble-backports/restricted amd64 Components [216 B]
  Get:54 http://archive.ubuntu.com/ubuntu noble-backports/restricted amd64 c-n-f Metadata [116 B]
  Get:55 http://archive.ubuntu.com/ubuntu noble-backports/multiverse amd64 Components [212 B]
  Get:56 http://archive.ubuntu.com/ubuntu noble-backports/multiverse amd64 c-n-f Metadata [116 B]
  Fetched 39.5 MB in 14s (2886 kB/s)
  Reading package lists... Done
# install curl and bash
robert@C15611110525001:/mnt/c/WINDOWS/system32$ sudo apt-get install -y curl bash
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
curl is already the newest version (8.5.0-2ubuntu10.6).
curl set to manually installed.
bash is already the newest version (5.2.21-2ubuntu4).
0 upgraded, 0 newly installed, 0 to remove and 121 not upgraded.
# get nvm
robert@C15611110525001:/mnt/c/WINDOWS/system32$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                  Dload  Upload   Total   Spent    Left  Speed
  100 16774  100 16774    0     0   101k      0 --:--:-- --:--:-- --:--:--  101k
  => Downloading nvm from git to '/home/robert/.nvm'
  => Cloning into '/home/robert/.nvm'...
  remote: Enumerating objects: 388, done.
  remote: Counting objects: 100% (388/388), done.
  remote: Compressing objects: 100% (331/331), done.
  remote: Total 388 (delta 42), reused 186 (delta 29), pack-reused 0 (from 0)
  Receiving objects: 100% (388/388), 395.54 KiB | 2.83 MiB/s, done.
  Resolving deltas: 100% (42/42), done.
  * (HEAD detached at FETCH_HEAD)
    master
  => Compressing and cleaning up git repository

  => Appending nvm source string to /home/robert/.bashrc
  => Appending bash_completion source string to /home/robert/.bashrc
  /mnt/c/nvm4w/nodejs/npm: 15: exec: node: not found
  => Close and reopen your terminal to start using nvm or run the following to use it now:

  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# 在「目前這個終端機」立刻重新載入並執行 ~/.bashrc
# 你進來後發現 nvm: command not found，通常表示你開的是「login shell」或不是 bash，導致沒有自動讀 ~/.bashrc；
# 這時才需要手動 source，或改成把載入 .bashrc 的那行放到 ~/.bash_profile / ~/.profile（常見修正方式）
robert@C15611110525001:/mnt/c/WINDOWS/system32$ source ~/.bashrc
#「下載並安裝 Node.js 的 22.x 主版本」
robert@C15611110525001:/mnt/c/WINDOWS/system32$ nvm install 22
  Downloading and installing node v22.22.0...
  Downloading https://nodejs.org/dist/v22.22.0/node-v22.22.0-linux-x64.tar.xz...
  #################################################################################################################### 100.0%
  Computing checksum with sha256sum
  Checksums matched!
  Now using node v22.22.0 (npm v10.9.4)
  Creating default alias: default -> 22 (-> v22.22.0)
# 使用 Node.js 的 22.x 主版本
robert@C15611110525001:/mnt/c/WINDOWS/system32$ nvm use 22
  Now using node v22.22.0 (npm v10.9.4)
# check node version
robert@C15611110525001:/mnt/c/WINDOWS/system32$ node -v
  v22.22.0
# install codex
robert@C15611110525001:/mnt/c/WINDOWS/system32$ npm i -g @openai/codex
  added 1 package in 4s
  npm notice
  npm notice New major version of npm available! 10.9.4 -> 11.8.0
  npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.8.0
  npm notice To update run: npm install -g npm@11.8.0
  npm notice
# check cli version
robert@C15611110525001:/mnt/c/WINDOWS/system32$ codex --version
  codex-cli 0.89.0

# switch to code 
robert@C15611110525001:/mnt/c/WINDOWS/system32$ ls /mnt/d/work/run/DiffDock/
  attached_assets  design_guidelines.md  package.json       script  tailwind.config.ts  vite.config.ts
  client           drizzle.config.ts     postcss.config.js  server  tsconfig.json
  components.json  package-lock.json     replit.md          shared  vercel.json
robert@C15611110525001:/mnt/c/WINDOWS/system32$ cd /mnt/d/work/run/DiffDock/
robert@C15611110525001:/mnt/d/work/run/DiffDock$ codex
# show cli screen
    Welcome to Codex, OpenAI's command-line coding agent

    Sign in with ChatGPT to use Codex as part of your paid plan
    or connect an API key for usage-based billing

  > 1. Sign in with ChatGPT
      Usage included with Plus, Pro, Team, and Enterprise plans

    2. Sign in with Device Code
      Sign in from another device with a one-time code
'
# 使用 API key, 故在 WSL 裡設定環境變數後直接跑
export OPENAI_API_KEY="sk-你的key"
robert@C15611110525001:/mnt/d/work/run/DiffDock$ cat /etc/os-release
  PRETTY_NAME="Ubuntu 24.04.3 LTS"
  NAME="Ubuntu"
  VERSION_ID="24.04"
  VERSION="24.04.3 LTS (Noble Numbat)"
  VERSION_CODENAME=noble
  ID=ubuntu
  ID_LIKE=debian
  HOME_URL="https://www.ubuntu.com/"
  SUPPORT_URL="https://help.ubuntu.com/"
  BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
  PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
  UBUNTU_CODENAME=noble
  LOGO=ubuntu-logo
robert@C15611110525001:/mnt/d/work/run/DiffDock$ printenv OPENAI_API_KEY
  sk-...
robert@C15611110525001:/mnt/d/work/run/DiffDock$ printenv OPENAI_API_KEY | codex login --with-api-key
  Reading API key from stdin...
  Successfully logged in

# run Codex
robert@C15611110525001:/mnt/d/work/run/DiffDock$ codex
  > You are running Codex in /mnt/d/work/run/DiffDock
    Since this folder is version controlled, you may wish to allow Codex to work in this folder without asking for approval.
  › 1. Yes, allow Codex to work in this folder without asking for approval
    2. No, ask me to approve edits and commands
    Press enter to continue

  ╭─────────────────────────────────────────────╮
  │ >_ OpenAI Codex (v0.89.0)                   │
  │                                             │
  │ model:     gpt-5.2-codex   /model to change │
  │ directory: /mnt/d/work/run/DiffDock         │
  ╰─────────────────────────────────────────────╯
    Tip: Switch models or reasoning effort quickly with /model.
  › Improve documentation in @filename
    100% context left · ? for shortcuts

# 改成一律要你批准(選1 Read Only)
/approvals
  Update Model Permissions
  1. Read Only          Codex can read files in the current workspace. Approval is required to edit files or access the
                        internet.
› 2. Default (current)  Codex can read and edit files in the current workspace, and run commands. Approval is required to
                        access the internet or edit other files. (Identical to Agent mode)
  3. Full Access        Codex can edit files outside this workspace and access the internet without asking for approval.
                        Exercise caution when using.
  Press enter to confirm or esc to go back

# 圖檔修正方向
codex -i /mnt/c/Users/RobertKao/Downloads/ask1.png "請看這張截圖，幫我判斷問題與修正方向"  

# 已進入 codex 
/mention /mnt/c/Users/RobertKao/Downloads/ask1.png
請看我剛附上的截圖，指出錯誤原因與下一步排查指令。
# or 
/mnt/c/Users/RobertKao/Downloads/ask1.png
這張圖顯示的錯誤是什麼？請給我修正步驟。

# 查 model
/status
# change model
/model
  1. gpt-5.2-codex (current)  Latest frontier agentic coding model.
  2. gpt-5.2                  Latest frontier model with improvements across knowledge, reasoning and coding
  3. gpt-5.1-codex-max        Codex-optimized flagship for deep and fast reasoning.
  › 4. gpt-5.1-codex-mini       Optimized for codex. Cheaper, faster, but less capable.
# 一般先選 1. Medium (default)；只有在你要做「複雜重構、很難除錯、需求/錯誤描述不完整」這種情境，再切到 2. High。
# 選 Medium：日常改 UI、修小 bug、補文件、改幾個檔案、跑測試這類工作，通常就夠，而且較省時間/費用。
# 選 High：例如「跨 client/server/shared 的大重構」、「架構設計與取捨」、「棘手的 build/依賴/型別問題」、「要它先做詳盡調查再動手」等，才值得開到 High。
  Select Reasoning Level for gpt-5.1-codex-mini
› 1. Medium (default)  Dynamically adjusts reasoning based on the task
  2. High              Maximizes reasoning depth for complex or ambiguous problems

```



#### run app
``` bash
# enter wls
D:\work\run\DiffDock>wsl -d Ubuntu
  robert@C15611110525001:/mnt/d/work/run/DiffDock$ ls
  attached_assets  design_guidelines.md  package.json       script  tailwind.config.ts  vite.config.ts
  client           drizzle.config.ts     postcss.config.js  server  tsconfig.json
  components.json  package-lock.json     replit.md          shared  vercel.json
# install npm
robert@C15611110525001:/mnt/d/work/run/DiffDock$ npm install
  added 478 packages, and audited 479 packages in 3m
  77 packages are looking for funding
    run `npm fund` for details
  1 moderate severity vulnerability
  To address all issues, run:
    npm audit fix
  Run `npm audit` for details.
robert@C15611110525001:/mnt/d/work/run/DiffDock$ npm audit fix
  changed 1 package, and audited 479 packages in 9s
  77 packages are looking for funding
    run `npm fund` for details
  found 0 vulnerabilities

# run dev , -- --host 表 讓 Vite 監聽對外介面：
# Vite dev server 預設會開在 http://localhost:5173
# npm run dev
# 指定 port
# npm run dev -- --port 5173  
# npm run dev -- --host
robert@C15611110525001:/mnt/d/work/run/DiffDock$ npm run dev
  > rest-express@1.0.0 dev
  > NODE_ENV=development tsx server/index.ts
  1:57:49 PM [express] serving on port 5000
  A PostCSS plugin did not pass the `from` option to `postcss.parse`. This may cause imported assets to be incorrectly transformed. If you've recently added a PostCSS plugin that raised this warning, please contact the package author to fix the issue.

# browser run http://localhost:5000/
```

### Robert hut(Replit) - [Link](https://www.perplexity.ai/search/https-winmerge-org-downloads-l-AZ9IX4uvTw.Hy0GrCvlHtA#15)

<!--more-->

#### Start Prompt 
``` bash
請建立一個名為 **DiffDock** 的 Web App（Chrome-only），目標是做類 WinMerge 的「目錄/檔案比較」工具，並嚴格遵守 i18n（en/zh-TW）規範。請採用分 Phase 交付；**每完成一個 Phase 後，請停止，不要自行進入下一 Phase**，而是輸出：
- 本 Phase 完成內容摘要
- 本 Phase 產出的檔案/關鍵變更點
- 「驗證項目（checklist）」：逐條列出我該怎麼操作驗收、預期看到什麼結果
並明確要求我回覆 **GO**（或 YES）後，才可以開始下一個 Phase。


## 全局硬性規格（所有 Phase 都要遵守）
### 瀏覽器限制
- 只正式支援 Chrome 桌面版，核心依賴 File System Access API。
- 若偵測到不支援（例如 `showDirectoryPicker` 不存在），必須顯示全頁阻擋提示（含 i18n 文案）並引導使用者改用 Chrome。

### i18n（中英雙語）
- 語系：`en`（預設、URL 無 prefix）、`zh-TW`（URL prefix：`/zh-tw`）。
- 初次進站：依瀏覽器語言偵測；若使用者曾切換語系：以 `preferredLocale`（localStorage 或 cookie）為準並持久化。
- 除使用者輸入與檔案內容外，所有 UI 文案不得寫死，必須使用 i18n keys。


### Logo
- Header 左上角放 Logo（先用 placeholder），點擊連到 `https://www.roberthut.com/`。
- alt 與任何旁邊文字都要走 i18n keys。

***

## Phase 0：基礎工程與路由
目標：先跑起來、路由/i18n/版型就位。
- 頁面：`/`（Landing）、`/compare`（主功能頁）、`/about`。
- i18n：en/zh-TW 字典檔，至少 20 個 keys；所有頁面文字走 keys。
- 語系切換器：切換後寫入 `preferredLocale` 並導到對應路徑（`/compare` ↔ `/zh-tw/compare`）。
- Header：DiffDock 名稱 + Logo（連 roberthut.com）。

Phase 0 驗證項目（請在交付時列出更細的步驟與預期結果）：
- 能啟動專案並打開首頁。
- 切換語系後 URL 會正確變化（en 無 prefix、zh-TW 有 `/zh-tw`）。
- 重整頁面後語系仍保持（preferredLocale 生效）。
- 所有 UI 文字沒有硬寫（都可從字典找到 key）。

完成 Phase 0 後請停止並等我回覆 GO。

***

## Phase 1：資料夾選取 + 目錄掃描（tree）
目標：能選 Left/Right 兩個資料夾並掃描檔案清單。
- Compare 頁提供：Select Left Folder / Select Right Folder。
- 使用 `showDirectoryPicker()` 取得 folder handle，遞迴列舉檔案並顯示 relative path。
- 顯示掃描進度/狀態，避免卡死。

Phase 1 驗證項目：
- 點按鈕會跳出資料夾選取器。
- 選完後 UI 顯示資料夾名稱與檔案清單（至少顯示 relative path）。
- 大量檔案時不會整個頁面無回應（有 loading/進度）。

完成 Phase 1 後請停止並等我回覆 GO。

***

## Phase 2：目錄比較（Left vs Right）
目標：輸出 added/removed/modified/same。
- 以 relative path 對齊兩邊檔案。
- 快篩：size 不同 → modified；只存在一邊 → added/removed。
- 提供 filter：只看 modified/added/removed。

Phase 2 驗證項目：
- 人為製造差異（新增/刪除/修改檔案）後重新掃描，狀態正確。
- Filter 正常生效。

完成 Phase 2 後請停止並等我回覆 GO。

***

## Phase 3：文字檔 diff + 編輯 + 寫回
目標：點選 text 檔可看 diff、可編輯、可 Save 寫回。
- text 判斷：副檔名白名單為主（可設定）。
- diff UI：CodeMirror merge view（v6 `@codemirror/merge` 或等效）。
- 寫回：使用 `createWritable()` 寫回左或右檔案（按鈕要清楚）。

Phase 3 驗證項目：
- 點一個 text 檔會開啟 diff。
- 修改後按 Save（寫回左/右）確實改到原檔內容。

完成 Phase 3 後請停止並等我回覆 GO。

***

## Phase 4：binary 檔 compare（不做 merge）
目標：binary 檔只做 compare。
- 讀取 `arrayBuffer()`；大小與 SHA-256 比對（WebCrypto digest）。
- 顯示 Same/Different、size、hash；不提供編輯/merge。

Phase 4 驗證項目：
- 同檔 hash 相同、不同檔 hash 不同。
- 大檔超過門檻會有降級提示（不會卡死）。

完成 Phase 4 後請停止並等我回覆 GO。

***

## Phase 5：打磨與保護欄
目標：提升可用性與穩定性。
- 非支援瀏覽器顯示 blocking page（i18n）。
- 大檔與大量檔案降級策略完善。
- README：替換 logo、調整白名單、已知限制。

Phase 5 驗證項目：
- 用非 Chrome 開啟會顯示明確提示。
- README 指引完整。

完成 Phase 5 後請停止。
```
