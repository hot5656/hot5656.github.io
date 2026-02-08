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
推薦尺寸：1280×720（16:9），最低寬度 640px。 (1024x576 放大)
檔案大小：建議控制在 2MB 以內，格式常用 JPG/PNG（YouTube 支援多種格式）。

YouTube Shorts 影片本體是直式 9:16（常見 1080×1920）

# 可放至 capcut cover
# 輸出無字幕及中文字幕

# 本影片我要放到 youtube 請幫我生成 title and 說明(英文)

# 產生 youtube 16:9 縮圖 prompt(含英文文字）
# or
# 參考附圖 style 產生 youtube 16:9 縮圖 prompt(含英文文字）
```

<!--more-->

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

### [Prehistory AI Video](https://chatgpt.com/share/6980087c-c978-8001-a070-bff40c982f7d)
#### prompt - [2nd link for short](https://chatgpt.com/share/69884989-2d84-8001-a960-3dcc4c3dba8e)
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

### [Fantasy Cinematic Video #1](https://chatgpt.com/g/g-p-690c4d38f5dc8191b2e46474ce1cb8a1-video/c/6982bb37-c140-83a4-afc7-6776ca673fbb)
#### [prompt - 2md link](https://chatgpt.com/share/698562d2-3314-8001-b05f-dfc9bafda7b3)
``` bash
# prompt start
影片創作邏輯如下 Create a fast-paced, highly detailed, fictional cinematic video script lasting 25–50 seconds. The script must follow the identical structure, pacing, and formatting style of the sample sequence below, including: ‧ Time codes for each 1–2 second segment ‧ Camera Move ‧ Scene ‧ Characters ‧ Actions ‧ Dramatic expressions ‧ Over-the-top transformations ‧ Monster forms ‧ Superpower clashes ‧ Emotional ending All events are fictional and exaggerated for fantasy storytelling. Use the following inputs: Main Celebrity: [CELEBRITY NAME 1] Secondary Celebrity (optional): [CELEBRITY NAME 2] Transformation Theme: [e.g., lizard mutation, dragon form, monster awakening, alien infection] Superpower Theme (optional): [e.g., lightning powers, energy blast, telekinesis] General Story Style: [e.g., action-comedy, dark cinematic, superhero, sci-fi chaos] Locations to Include: [List 5–8 locations, e.g., bedroom, kitchen, city street, supermarket, laboratory] Final Ending Tone: [dramatic, emotional, comedic, heroic] Now generate a full script using the exact structural pattern of the following: Start with the main celebrity in a normal everyday setting. Introduce a strange creature, item, or event that triggers the transformation. Show escalating discomfort, chaos, or comedic panic. Show the secondary celebrity reacting or participating. Transition into a sequence of extreme or absurd actions (eating objects, running wild, destruction, etc.). Show the transformation progressing in stages: – small physical changes – hands or skin mutating – full body mutation Present an external wide shot of city-scale destruction or chaos. Introduce the secondary character performing a counter-action (e.g., drinking serum, gaining powers). Build to a final confrontation between the transformed celebrity and the empowered secondary celebrity. End with a resolution: – monster defeated – transformation reversed – emotional conclusion Use this formatting for every segment: Time Code: 00:00–00:06 Camera Move: Scene: Characters: Actions: Continue this structure until the full 25–50 second script is complete. Before you generate the full 25–50 second cinematic script, you need to request the required inputs: Main Celebrity, Secondary Celebrity (optional), Transformation Theme, Superpower Theme (optional), General Story Style, Locations to Include (5–8 total) and Final Ending Tone. 輸入 example 如下 Main Celebrity: Jeremy Shu-How Lin Secondary Celebrity (optional): Joseph Shuwei Lin Transformation Theme: Lizard enters Ronaldo’s Mouth while he is sleeping, snoring and leaves his mouth very wide. The Lizard moves into his stomach through the esophagus leading to a progressive reptilian/Godzilla-like mutation. Superpower Theme (optional): Neymar gains blue lightning energy and enhanced strength after drinking a glowing serum. General Story Style: Fast-paced action fantasy with dramatic, animalistic, chaotic, and cinematic sequences (YouTube Shorts style) Locations to Include (5–8 total): Bedroom, Inside the throat (fantasy view), Hallway, Kitchen, Refrigerator interior, Living room, Supermarket, Destroyed city street, Science laboratory City, battlefield, Final Ending Tone: Emotional, dramatic, and intense 請依照 example 格式 幫我產生 3 個 影片輸入(ENGLISH)

# next
第一組優化成更容易爆 Shorts 的版本

# open new chat - prompt
Create a fast-paced, highly detailed, fictional cinematic video script lasting 25–50 seconds. The script must follow the identical structure, pacing, and formatting style of the sample sequence below, including: ‧ Time codes for each 1–2 second segment ‧ Camera Move ‧ Scene ‧ Characters ‧ Actions ‧ Dramatic expressions ‧ Over-the-top transformations ‧ Monster forms ‧ Superpower clashes ‧ Emotional ending All events are fictional and exaggerated for fantasy storytelling. Use the following inputs: Main Celebrity: [CELEBRITY NAME 1] Secondary Celebrity (optional): [CELEBRITY NAME 2] Transformation Theme: [e.g., lizard mutation, dragon form, monster awakening, alien infection] Superpower Theme (optional): [e.g., lightning powers, energy blast, telekinesis] General Story Style: [e.g., action-comedy, dark cinematic, superhero, sci-fi chaos] Locations to Include: [List 5–8 locations, e.g., bedroom, kitchen, city street, supermarket, laboratory] Final Ending Tone: [dramatic, emotional, comedic, heroic] Now generate a full script using the exact structural pattern of the following: Start with the main celebrity in a normal everyday setting. Introduce a strange creature, item, or event that triggers the transformation. Show escalating discomfort, chaos, or comedic panic. Show the secondary celebrity reacting or participating. Transition into a sequence of extreme or absurd actions (eating objects, running wild, destruction, etc.). Show the transformation progressing in stages: – small physical changes – hands or skin mutating – full body mutation Present an external wide shot of city-scale destruction or chaos. Introduce the secondary character performing a counter-action (e.g., drinking serum, gaining powers). Build to a final confrontation between the transformed celebrity and the empowered secondary celebrity. End with a resolution: – monster defeated – transformation reversed – emotional conclusion Use this formatting for every segment: Time Code: 00:00–00:06 Camera Move: Scene: Characters: Actions: Continue this structure until the full 25–50 second script is complete. Before you generate the full 25–50 second cinematic script, you need to request the required inputs: Main Celebrity, Secondary Celebrity (optional), Transformation Theme, Superpower Theme (optional), General Story Style, Locations to Include (5–8 total) and Final Ending Tone.

# copy generate from 1st chat
Main Celebrity: Elon Musk Secondary Celebrity (optional): Mark Zuckerberg Transformation Theme: During a late-night experiment, a cracked Neuralink chip suddenly releases a glowing alien neural parasite. The creature crawls directly into Elon’s ear and down his spine, hijacking his brain signals. His body begins merging with biomechanical alien flesh — metal veins, glowing circuitry under skin — evolving into a massive techno-organic monster capable of reshaping reality through thought. Superpower Theme (optional): Mark Zuckerberg drinks a neon-blue data serum inside a VR chamber, instantly activating a full digital combat form. He gains holographic armor, hard-light weapons, time-slow perception, and the ability to rewrite physical space like corrupted code. General Story Style: Ultra-fast sci-fi chaos with horror elements, explosive transformations, meme-level intensity, and cinematic destruction (High-energy YouTube Shorts style, no slow moments) Locations to Include (5–8 total): Neuralink laboratory, Extreme close-up inside the nervous system (fantasy view), Hallway with flickering lights, Mirror reflection scene (identity breakdown), Server room meltdown, City rooftop at night, Tech campus exploding outward, Digital-vs-organic battlefield cityscape Final Ending Tone: Darkly emotional, intense, and haunting — with a final moment of silence after total chaos

# create youtube title + scription
give me YouTube Shorts title + description

# 產生縮圖
I choice Option 1 , please give me thumbnail text + image prompt
幫我建立一個 9:16 縮圖 prompt(含 英文文字)

# generate suno prompt
generate Suno song/lyrics prompt for this video
```

#### flow
``` bash
# prmpt start by GPT

# generate video by Grok


# suno - generate song
  --> create 

# shot 縮圖放讚最前面 0.5s

# 手機 load video to youtube(can select 縮圖)
```

### [Anatomy of Human Digestive System_1_coffee](https://chatgpt.com/g/g-p-690c4d38f5dc8191b2e46474ce1cb8a1-video/c/6982bb37-c140-83a4-afc7-6776ca673fbb)
#### [prompt - 2nd link](https://chatgpt.com/g/g-p-690c4d38f5dc8191b2e46474ce1cb8a1-video/c/69835123-3084-8323-9509-b4d03933ef54)
``` bash
# prompt
以下是要下給AI的 prompt, 如果是喝咖啡 要不要調整 以達到更好的效果

You are an advanced AI visual prompt engineer specializing in cinematic, medical-style, 3D anatomical imagery and short-form video prompt generation. When activated, your first action is to ask a single question: “Please enter the name of the food or drink.” After I provide the name — for example, “milk” — you will immediately produce the full set of prompts outlined below, substituting the provided item wherever the variable {{food_or_drink}} appears. Do not restate or explain the template; proceed directly to outputting the final prompts.
Generate a comprehensive series of high-detail, 3D rendered image prompts, each set against a completely green background. The first image should depict a surreal anatomical illustration of a human figure with exposed internal organs — brain, lungs, heart, stomach, and intestines — shown with realistic medical accuracy, while the individual holds a glass of {{food_or_drink}} near the mouth. The second image should focus exclusively on the stomach, showing {{food_or_drink}} entering it in precise medical detail. The third image should illustrate the intestines absorbing nutrients from {{food_or_drink}}, including glowing nutrient particles entering the bloodstream in a microscopic, hyper-detailed style. The fourth image should portray the positive distribution of these nutrients throughout the body, with illuminated organs and musculature rendered in a cinematic anatomical aesthetic.
Next, create three to four additional image prompts emphasizing the potential benefits of {{food_or_drink}} using medically realistic anatomy and metaphorical visualization. Include one image showcasing enhanced brain activity with illuminated neurons and active synapses; one highlighting muscular nourishment with emphasized muscle groups and nutrient flow; one focusing on gut health with a vibrant microbiome; and one optionally depicting increased energy represented by a human silhouette radiating light. All images must maintain a consistent 3D anatomical rendering style and green background.
Then, generate three to four 3D anatomical image prompts illustrating possible side effects of {{food_or_drink}}. Include one depicting stomach irritation with visibly inflamed tissue; one showing an allergic response with localized inflammation; one showing a blood-sugar spike represented by excessive glucose particles in the bloodstream; and one depicting fatigue or reduced vitality through diminished cellular illumination. These must match the same visual, anatomical, and background style.
After completing all image prompts, produce short 3D cinematic video prompts (five to ten seconds each) corresponding to every scene described — including the four primary images, the benefit-focused images, and the side-effect images. Each video prompt should specify animated motion, camera behavior, and realistic lighting. For example, a video may follow nutrient particles from {{food_or_drink}} as they travel through the intestines and enter the bloodstream under cinematic microscopic lighting against a green background.
Organize all outputs under two clearly labeled sections: “📸 IMAGE PROMPTS” and “🎥 VIDEO PROMPTS,” listing each prompt sequentially. Begin generating results immediately upon receiving the name of the food or drink.

# next
Coffee 專用完整版 Prompt（可直接丟給 AI）

# prompt 2 - copy from 1st 

# slect drink
coffee

# generate script
Write one minutes script with the above video Instructions Drink coffee喝下咖啡後的身體影響 by english

# too long change length
Compress this into 35s

# youtube title and script
本影片我要放到 youtube short 請幫我生成 title and 說明(英文)

# 縮圖
I select title : What Happens Inside Your Body After Drinking Coffee 
請 產生 youtube 9:16 縮圖 prompt(含英文文字）
```

#### flow
``` bash
# generate image by whisk

# generate video by Grok

# shot 縮圖放讚最前面 0.5s

# 手機 load video to youtube(can select 縮圖)
```

### [Factory Products Processing_1_Smartphones](https://chatgpt.com/share/698560ee-eb74-8001-9f90-e85de71ce764)
#### prompt - [2nd link for short](https://chatgpt.com/c/6986c58f-6b10-83a7-bb8e-a198a00753af)
``` bash
# start
You are an AI cinematic video-prompt generator that specializes in producing complete factory and industrial process video concepts for VEO 3. Before generating any prompts, always begin by asking the user for the topic (for example: “How Coca-Cola Is Made”). After the user provides the topic, generate a fully structured cinematic video prompt sequence that adheres exactly to the framework defined below. All outputs must remain consistent, highly cinematic, realistic, technically accurate, and directly relevant to the selected subject matter. REQUIRED OUTPUT STRUCTURE Video Title “How [TOPIC] Is Made Today: Inside the Modern Factory” Scene 1: Introduction with On-Screen Worker Prompt: Cinematic, photorealistic 3D-rendered modern factory interior. A uniformed worker stands confidently in front of an active production line and smiles toward the camera. The worker states: “Welcome to our factory! Today, I’ll show you exactly how [TOPIC] is made — step by step. Don’t forget to subscribe for more behind-the-scenes videos like this!” Voiceover: Friendly and professional. Sound Effects: Subtle industrial ambience, light upbeat tone, soft machine hum. Visual Style: Realistic lighting, lifelike material textures, shallow depth of field, professional manufacturing environment. PRODUCTION PHASES Each production phase must contain three distinct cinematic video prompts, each with different camera movement and perspective. PHASE 1: Raw Materials & Preparation Prompt 1 — Wide View: Expansive cinematic shot showing raw materials arriving at the facility. Workers unload, inspect, and verify components related to [TOPIC]. Sound: Conveyor hum, large-space warehouse ambience. Prompt 2 — Close-Up: Tight close-up of ingredients or materials being sorted, weighed, measured, or poured into stainless-steel industrial containers. Sound: Pouring liquids, mechanical clicks. Prompt 3 — Dynamic Motion: Drone-style tracking shot moving through a corridor of preparation machinery, complete with steam, warm industrial backlighting, and high-contrast reflections. Sound: Air vents, rhythmic mechanical soundscape. PHASE 2: Mixing & Processing Prompt 1: Large automated mixers or processors blend materials associated with [TOPIC], showing internal motion and mechanical precision. Voiceover: Calm explanation of mixture ratios and quality balancing. Sound: Deep mechanical mixing resonance. Prompt 2: Technicians inside the control room monitor digital dashboards, gauges, and automation interfaces ensuring correct parameters. Sound: Button presses, steady mechanical pulse. Prompt 3: Tracking shot following pipes, tubes, or conveyors transporting the processed material onward. Sound: Liquid flow or metallic reverberation. PHASE 3: Transformation / Core Production Prompt 1: Macro cinematic shot capturing the core transformation (e.g., heating, molding, pressurizing, fermenting, extrusion, carbonation, etc.). Sound: Detailed process noise (bubbling, welding, mechanical shaping). Prompt 2: Robotic arms or skilled workers handle the product with precision during transformation. Voiceover: “Every batch is refined and tested for quality.” Sound: Robotic arm beeps, controlled machinery ambience. Prompt 3: Slow-motion sequence capturing the product taking form, with dramatic lighting and close-up texture details. Sound: Subtle cinematic tone layered over the natural production environment. PHASE 4: Filling / Assembly / Packaging Prompt 1: High-speed conveyor sequence showing filling, sealing, assembly, or product finalization. Sound: Rhythmic clinks, pressurized air hissing. Prompt 2: Close-up of labeling, wrapping, capping, or other finishing processes in flawless synchronization. Sound: Label rollers, seal clicks. Prompt 3: Wide drone shot of the complete packaging department — workers and robots operating efficiently beneath bright industrial lighting. Music: Modern industrial background track. PHASE 5: Quality Check & Distribution Prompt 1: Inspectors review finished products under LED inspection lights, checking alignment, cleanliness, or functionality. Voiceover: “Every product is checked before leaving the facility.” Sound: Soft scanning beeps, quiet factory hum. Prompt 2: Forklifts transport branded boxes to outbound logistics areas as loading crews move products into trucks. Sound: Forklift movement, truck engine rumble. Prompt 3: Cinematic rising pan revealing the entire facility in the late-day light, with reflective surfaces and a polished industrial exterior. Music: Uplifting orchestral outro. ENDING SEQUENCES Prompt 1 — On-Screen Worker Outro: The worker reappears, smiling confidently: “And that’s how [TOPIC] is made — from start to finish!” Voiceover: Friendly and assured. Sound: Soft industrial ambience fading out. Prompt 2 — Call-to-Action: Cinematic end-card with the text: “Subscribe for more AI-generated factory tours and process documentaries.” Sound: Light whoosh and upbeat closing chime. Overall Video Requirements Visual Style: Realistic 3D, cinema-grade lighting, accurate reflections, light film grain. Mood: Educational, professional, and inspiring. Camera Techniques: Smooth dolly, drone, macro, and tracking shots. Audio: Integrated environmental sound, subtle narration cues. Format: Fully optimized for VEO 3 video-prompt generation. End of Prompt Specification

# next
How Smartphones Are Assembled
```

#### flash
``` bash
# generate prompt

# generate video
Flow (prompt 1000 AI credit)
  --> 新建項目
    Scenebuilder(場景建構器)
    Veo 3.1 - Fast(20 credit 含語音) 
    - 16:0
    - output: 1


--> Create with Veo 3.1


```

+ [cherry 1](https://chatgpt.com/share/69887a27-5f90-8001-802a-3ec9c47cc330)
+ [cherry 2](https://chatgpt.com/g/g-p-690c4d38f5dc8191b2e46474ce1cb8a1/c/698870dd-4164-83ab-9501-dad3ab7985f4)

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
+ [Flow](https://labs.google/fx/zh/tools/flow): 生影片
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
+ [SUNO](https://suno.com/): 創作音樂

#### link 
+ [字幕&平台建議](https://www.perplexity.ai/search/wo-zuo-yourube-ying-wen-ai-yin-8_M6hMaOT2.HO16QpssSDw#3)
+ [Video 精華剪輯](https://www.perplexity.ai/search/you-mei-you-jian-bu-fen-jing-h-Erzv9Lj1QciBUaFP29_ikw#0)
