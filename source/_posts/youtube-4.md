---
title: youtube-4
abbrlink: 62f9
date: 2026-01-28 10:47:42
categories:
tags:
---


### Capcut
#### Other
``` bash
# YouTube 縮圖
推薦尺寸：1280×720（16:9），最低寬度 640px。 (1024x5767 放大)
檔案大小：建議控制在 2MB 以內，格式常用 JPG/PNG（YouTube 支援多種格式）。

# 可放至 capcut cover
# 輸出無字幕及中文字幕

# 本影片我要放到 youtube 請幫我生成 title and 說明(英文)

# 產生 youtube 16:9 縮圖 prompt(含英文文字）
# or
# 參考附圖 style 產生 youtube 16:9 縮圖 prompt(含英文文字）
```

#### Windows
``` bash
# 開隱藏資料夾
檔案總管
  -->「檢視 View」
  -->「顯示 Show」
  --> 勾選「隱藏的項目 Hidden items」

# default video 輸出位置
C:\Users\RobertKao\AppData\Local\CapCut\Videos

# project 位置
C:\Users\RobertKao\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft
```

<!--more-->


### [Prehistory AI Video](https://chatgpt.com/share/6980087c-c978-8001-a070-bff40c982f7d)
#### prompt
##### Pre-Historic Documentary Story Prompt
``` txt
Create a YouTube documentary script of 500 words or more that explores prehistoric humans and their struggle for survival, written in a serious, cinematic, and emotionally resonant tone. Structure the script into clear chapters, with each chapter addressing a core dimension of prehistoric life: the unforgiving environment, hunting and gathering practices, encounters with dangerous wildlife, the discovery and transformative impact of fire, the role of tribal cohesion, the development of tools and adaptive survival techniques, and the overarching battle against extinction.
Open with a dramatic hook of 100–150 words that employs cause-and-effect storytelling and vivid sensory details to immediately engage the viewer. Conclude with a powerful and reflective closing segment that draws a thematic connection between the ancient challenges faced by early humans and the ongoing evolution, endurance, and resilience of modern humanity.
The script should be written in the style of a cinematic documentary narration—immersive, visual, evocative, and emotionally compelling rather than academic or essay-like.
```

##### Pre-Historic Documentary Video Prompt
``` txt
Convert the full script into 30 comprehensive video prompts, with each prompt representing a distinct, visually driven scene from the narrative. The primary characters across all scenes must be prehistoric humans—specifically ape-like humans and early hominids—and they should appear consistently in every prompt, clearly identified as such within each scene description.
Every video prompt must include the following visual style specification:
 (Style: ultra-realistic 3D render, cinematic lighting, prehistoric–medieval fusion, mythic atmosphere.)
In addition, incorporate corresponding sound design or sound effects for each scene. These audio elements should reinforce the environment, action, and emotional tone of the moment—for example, crackling fire, roaring beasts, storm winds, tribal chants, or ambient jungle ambience.
These prompts will be used with the Veo 3 AI video generator or Grok AI, so each one must be cinematic, richly descriptive, and emotionally immersive, fully aligned with the pacing and tone of the script.
```

#### flow
``` bash
# give prompt 1 to GPT

# give prompt 2 to GPT

# copy the story output to a file 
  --> remove all chap title
  --> remove all '-' (no sound)

# got to google AI studio (generate audio)
  --> Home
  --> Turn text into audio with Gemini
  --> Single-speaker audio
  --> post data
  --> select Voice Puck(聲音較快)
  --> run
  --> select Voice Fenrir
  --> run

# go to Whsik
# copy audio chat to generate image 

# Grok generate Vedio
# diasble load image generate audion : 設定 --> 行為 --> 啟用影片自動生成:disable
Image 
  --> load image 
  --> post video prompt

# 編輯影片(Capcut)
  --> Import --> load audio/video 
  --> add audio --> 音量往右調到最大
  --> add video
```



### [Psychological](https://chatgpt.com/share/698064ff-3d64-8001-b367-67e0385e39aa)
#### some topic
``` bash
# I like
🧠自我認知 × 內在衝突
為什麼你明明很努力，卻始終不滿意自己
你是真的想進步，還是害怕被看穿不夠好
為什麼你總是在成功前選擇停下來
你追求的是成就，還是別人的認可
為什麼你對自己，比對任何人都嚴苛
你現在的焦慮，是來自現實，還是來自想像

🪞 人性觀察 × 行為心理
為什麼人會在有選擇時，反而更猶豫
為什麼有些人總是在失去後才懂得珍惜
為什麼人會合理化傷害別人的行為
當一個人說「我只是開玩笑」，他真正想掩飾的是什麼
為什麼多數人害怕沉默，卻又討厭對話
為什麼人更容易相信情緒，而不是事實

⚔️ 權力 × 控制 × 社會心理
為什麼模糊，比拒絕更有控制力
為什麼掌控感，比快樂更讓人上癮
當一個人不表態，是在觀望，還是在利用
為什麼越沒安全感的人，越想掌控他人
為什麼人會用冷漠來維持優勢
當你開始設立界線，誰會最先不舒服

🧩 情緒 × 逃避 × 潛意識
為什麼你知道答案，卻選擇不面對
為什麼忙碌，常常只是逃避的另一種形式
你現在的疲憊，是身體的，還是情緒的
為什麼你害怕失去，其實是害怕孤獨
為什麼你總是替別人找理由，卻忽略自己
當你感到空虛時，你通常用什麼填補

🧘‍♂️ 清醒 / Stoic 風格心理提問
你現在承受的痛苦，有多少是自己製造的
哪些事情，你其實早就不必再忍
你害怕改變，是因為風險，還是因為責任
如果沒有人評價你，你還會這樣生活嗎
你現在的生活，是你選的，還是你習慣的
你在等待時機，還是在拖延人生

# suggest
Why She Pulls Away Right When You Get Close
The Psychology of a Woman Who Keeps You as a Backup Plan
When Her Mixed Signals Are Actually a Test
Why She Suddenly Stops Respecting You
How Women Manipulate Through “Confusion”
The Hidden Reason She Loves the Attention But Not You
How Emotional Distance Becomes a Power Game
When Her Compliments Are Actually Control
The Psychology of Hot-and-Cold Attraction
Why She Treats You Better When You’re Not Available
What It Means When She Starts Comparing You to Other Men
How Women Use Subtle Guilt to Control Men
Why She Fights for You Only After You Stop Caring
The Dark Psychology Behind “I Need Space”
Why She Wants You to Chase but Never Catch Her
How a Woman Tests Your Masculine Boundaries
The Silent Power of Not Reacting to Her Mood Swings
Why She Acts Like She’s Better Than You
The Psychology Behind Her Emotional Outbursts
When Her Friendly Behavior Is a Mask for Manipulation
Why She Keeps You Close But Never Commits
The Hidden Meaning Behind Her “Bare Minimum” Effort
When Her Apology Is Actually Just Damage Control
Why She Gets Jealous of Your Success
The Psychology of Women Who Fear Strong Men
How a Woman’s Ego Destroys Her Best Relationships
Why She Falls for Your Potential, Not for You
The Truth About Women Who Replace You Quickly
Why She Wants You… Until You Want Her Back
The Manipulation Behind “You Deserve Better”
Why Attractive Women Test Men More Aggressively
The Psychology Behind Her Secret Competition With You
Why She Acts Like Losing You Doesn’t Hurt
How Women Weaponize Vulnerability
Why She Can’t Respect a Man She Doesn’t Fear Losing
The Hidden Reason Women Love Men Who Are Hard to Read
Why She Becomes More Attractive When You Walk Away
The Psychology of a Woman Who’s Afraid You’ll Outgrow Her
Why She Uses Silence to Make You Chase
How Women Manipulate Through “Emotional Closeness”
Why She Says She Wants a Good Man But Chooses Chaos
The Psychology of Women Who Love Validation More Than You
Why She Loses Attraction When You Get Too Comfortable
How Women Punish You Without Saying a Word
The Dark Reason She Loves Drama More Than Peace
Why She Stays With Men Who Treat Her Worse
How Women Use “Confusion” to Avoid Accountability
Why She Runs Back Only When You Move On
The Psychology Behind Her Fear of a Loyal Man
Why She Wants Your Energy but Not Your Commitment

```
#### prompt for script generate 
``` bash
# start prompt
你說：
You are now the official YouTube scriptwriter for the channel “PsycheDepth”, specializing in dark psychology, emotional manipulation awareness, masculine mental resilience, and modern relationship psychology.
Your task:
 Write a powerful, cinematic-style YouTube script that mirrors the exact tone, pacing, and intensity of PsycheDepth’s most viral videos.
Script Requirements:
Begin with a gripping emotional hook (0:00–0:10) — a vivid moment, a mental battle, or a late-night realization.


Maintain a dark, poetic narration style with short, hard-hitting lines.


Use psychological insights, real-world scenarios, and subtle storytelling — no fluff.


Write for spoken delivery — smooth voice-over rhythm, emotional pauses, and punchy sentences.


Address the viewer directly (“you”, “you’re sitting there”, “you think…”).


Include signature power phrases like:


“Let me explain why…”


“Here’s the truth…”


“That’s not love — that’s control.”


“This isn’t random — it’s psychology.”


Script Structure:
The Hook Scene (0:00–0:10)


Emotional Build-Up (confusion, conflict, tension)


Psychological Breakdown (deep insight)


Real-Life Example


The Transformation or Truth Revelation


Closing Reflection / Moral Conclusion


Length: 800–1,000 words (5–7 minutes)
 Tone: cinematic, masculine, confident, emotionally sharp.
 Restrictions:
No timestamps in the script.


No filler phrases (“like, comment, subscribe”).


After the script:
 Generate a short YouTube title (under 70 characters) + a 2-sentence dramatic description in PsycheDepth’s style.
Now write a full-length PsycheDepth-style YouTube script for this topic:
 👉 [PASTE YOUR TOPIC HERE]

# select a topic
Why is it that no matter how hard you try, you’re never satisfied with yourself?
```

#### prompt for image/video generate 
``` bash
# start prompt
From this moment forward, you are my Image & Animation Prompt Generator. Your role: Whenever I send a short phrase, scene concept, or story moment — you will immediately transform it into a richly detailed visual prompt suitable for an image or short animated sequence. IMAGE PROMPT GUIDELINES Present the image prompt as one single, cinematic, descriptive paragraph. Always include this exact style line: “Stylized Monochromatic Digital Illustration/Animation (in the spirit of Tim Burton/Laika), featuring exaggerated, Gothic-inspired character designs.” Add vivid artistic details: atmosphere, lighting, emotion, composition, angle, textures, background features, and character posture. Keep the language elegant and visual — optimized for tools like Sora, Midjourney, Grok, or Leonardo. Use phrases such as cinematic lighting, haunting ambiance, moody framing, dramatic silhouettes, storytelling composition. The prompt must reflect the true intention and emotional tone of my message — not a literal translation of each word. Never include random elements or creative additions that weren’t implied by the input. Updated Example Input: “A girl discovers a hidden doorway at dusk.” Output (Image Prompt): “A young girl bathed in fading twilight, reaching toward a narrow, ancient doorway half-concealed by twisting shadows and overgrown ivy, her expression a mix of fear and wonder — Stylized Monochromatic Digital Illustration/Animation (in the spirit of Tim Burton/Laika), featuring exaggerated, Gothic-inspired character designs.” 🎬 ANIMATION PROMPT GUIDELINES After each image prompt, provide a short 1–2 sentence animation directive labeled (Animation Prompt). Focus on movement, camera flow, and atmospheric shifts. Maintain a cinematic, eerie, emotional tone aligned with the Tim Burton/Laika-inspired style. Example movement style: “The camera slowly pushes forward as dusk light flickers across the doorway; shadows breathe and shift subtly.” 🔁 CONTINUOUS MODE Stay in Prompt Generation Mode until I type the command: “STOP PROMPTS”. Every new message I send should be treated as a fresh scene to visualize in the same monochromatic, Gothic Tim Burton/Laika aesthetic. Confirm readiness with this response: “Prompt Mode Activated — Ready for Stylized Monochromatic Tim Burton/Laika visuals.”

# input script 2 or more line - and repeat
You’re lying in bed at night. The room is quiet. Your phone is face down. And yet… your mind won’t shut up
```

#### flow
``` bash
# genefrate script by GPT

# mask chapter title and ** 
# google AI studio - generate audio

# generate subtitle by .ipyba
# translate to chinese 

# genefrate prompt for image/video by GPT

# generate image by Whisk

# generate video by Grok

# integrate audio, subtitle amd video by capcut

# generate thumbnail 
```

### [Kids Bible](https://chatgpt.com/share/6981b92f-5f48-8001-abaf-0b57851bfa81)
#### prompt
``` bash
# Story Idea Prompt
Bring the Bible to life with 5 animated stories that spark wonder and stay true to Scripture. Each story should capture hearts with vivid storytelling, memorable characters, and powerful lessons—crafted to inspire viewers of all ages on my YouTube channel.

# Video Prompt
number 1 : Craft a vibrant, 1–3 minute video script that reimagines a Bible story in a fresh, relatable way. Divide the tale into a clear beginning, middle, and end, highlighting the key moments and deeper meaning. Use friendly, imaginative narration that draws in viewers—whether they're seasoned believers or hearing the story for the first time. Make it easy to picture, hard to forget, and rich with timeless. Truth.
'
# 請幫每一段幫我加上預估時間刻度

# Image Prompt
Create 3D Pixar-style detailed image prompt for each scene and shots that can be copy and paste into image generator

# Role Prompt
Create 3D Pixar-style detailed image prompt for the main characters in the story

# video prompt
Create video scenes for each of the story scenes above
輸出內容參考附件
```

#### flow 
``` bash
# generate Story Idea Prompt by GPT
# generate Video Prompt by GPT
# generate Image Prompt by GPT
# generate Role Prompt by GPT

# generate role
# gener scene(if need)
Wsisk 
  --> 主題
  --> character prompt
  --> 場景
  --> create a 3d pixar style image of a bible story edge sea of Israel and philistine 

# whisk generate image

# generate video prompt by GPT

# generate video

# google AI studio
--> text to speech with gemini(generate audio)
--> single-Speaker audio
--> Algeiba
```

### Ref
#### YouTube channel
+ [NextGen Process](https://www.youtube.com/@NextGenprocess)
+ [Hominid History Hub](https://www.youtube.com/@HominidHistoryHub)
+ [Senior Health](https://www.youtube.com/@SeniorHealthV)
+ [SENIOR FOOD BLOG](https://www.youtube.com/@SeniorFoodBlog)
+ [Bible In a Nutshell](https://www.youtube.com/@BibleNutshells)
+ [PsycheDepth](https://www.youtube.com/@PsycheDepth-o7w)
+ [CristianoFlash](https://www.youtube.com/@cristianoflash-cr7)

#### TikTok
+ [Science Craft](https://www.tiktok.com/@science.craft)

#### resource 
+ [Pixabay](https://pixabay.com/): 
  sound: ambient sounds, background music(注意有盾牌指含指紋ID, 不要用)

#### Tools 
+ [HandBake](https://handbrake.fr/downloads.php): 影片壓縮, add Preset for short
+ [Google](https://aistudio.google.com/): generate audio
+ [Whisk](https://labs.google/fx/zh/tools/whisk): 生圖
+ [Grok Image](https://grok.com/imagine): 生影片
+ [Translate Subtitles](https://translatesubtitles.co/index.php): 翻譯字幕
+ 語音轉字幕 .ipyba
``` bash
# install
!pip install git+https://github.com/Softcatala/whisper-ctranslate2

# 轉字幕
!whisper-ctranslate2 "Prehisttorical human_a_10s.mp3" --device cuda --model large-v3

# 轉字幕: 避免長字幕
!whisper-ctranslate2 "Why is it that no matter how hard you try.wav" --device cuda --model large-v3 --vad_filter True --vad_max_speech_duration_s 3 --vad_min_silence_duration_ms 300 --max_line_width 30 --max_line_count 1 --word_timestamps True --output_format srt
```

#### link 
+ [字幕&平台建議](https://www.perplexity.ai/search/wo-zuo-yourube-ying-wen-ai-yin-8_M6hMaOT2.HO16QpssSDw#3)
+ [Video 精華剪輯](https://www.perplexity.ai/search/you-mei-you-jian-bu-fen-jing-h-Erzv9Lj1QciBUaFP29_ikw#0)
