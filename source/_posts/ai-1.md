---
title: OpenAI 說明
abbrlink: ce78
date: 2023-03-09 11:39:44
categories: AI
tags:
	- chatGPT
	- midjounery
	- DALL-E2
---

### 1st example 
#### install openai
``` bash
npm install openai
```

<!--more-->

#### index.js(copy from openai)
``` js
// const { Configuration, OpenAIApi } = require("openai");
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "copy key from openai",
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});
console.log(response.data)
```

```js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "copy key from openai",
});
const openai = new OpenAIApi(configuration);

// give chatGPT role
var message = "should i get fishing"
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `Pretend ypu are Steve Jobs. Answer with motivation content.
Stevn: How can I help you today?
Person: I want some motivation.
Steve: You are amazing, you can create any tyoe of business you want.
Person: ${message}
  `,
  max_tokens: 100,
  temperature: 0,
});
console.log(response.data)
```

#### package.json add "type": "module"
``` json
{
  "type": "module",
  "dependencies": {
    "openai": "^3.2.1"
  }
}
```

#### run 
``` bash
D:\work\run\openapi>node index.js
{
  id: 'cmpl-6s1VJXc3rceBSkKcEszIe4Mwgyeir',
  object: 'text_completion',
  created: 1678333513,
  model: 'text-davinci-003',
  choices: [
    {
      text: '\n\nThis is indeed a test',
      index: 0,
      logprobs: null,
      finish_reason: 'length'
    }
  ],
  usage: { prompt_tokens: 5, completion_tokens: 7, total_tokens: 12 }
}
```


### [course - Content Creation with Midjourney](https://www.udemy.com/course/content-creation-with-midjourney/)
#### Entering Effective prompt
+ Be Specific(具體)
+ Command List (midjourney command)
+ include context(上下文)
+ Take advantage of images database(參考其他生成圖像)


### midjourney
#### [login Discord](https://discord.com/)
#### [login Midjourney](https://www.midjourney.com/auth/signin/)

#### command
``` bash
# info : see account information
/info

# image generate
/imagine prompt:

# show setting
/settings 

回推這張圖片的提示詞
/describe
```

#### prompt

#####
+ 主題跟背景
+ 風格與媒介:插畫,平面設計,照片(illustraion,painting,phtograph)
+ 顏色與氛圍

##### parameter
``` bash
# 主題, 畫風, 顏色/光線, 作畫模式 ....(", " 分開)
# ===========================================
# --v 1,--v 2,--v 3,--v 4,--v 5,--v 5.1,--niji 4,--niji 5 
# --v 4 : version 4 (好像比較華麗,有氛圍感)
# --v 5 : version 5 (比較逼真)
# --v 5.1 : 帶個人觀點,短的prompt校變更好,較像V5
# --niji 4,--niji 5 : 漫畫風格
# =========================================== 
# raw mode:較像v5,擅長處理很長的prompt
# --style raw: 僅 v 5.1 提供, 強調盡量符合使用者提示
# =========================================== 
# --q .5 :　Quality, changes how much time is spent generating an image(精細程度)
#     .25, .5, and 1(default),2
# =========================================== 
# --s 0-1000 : Stylize - 數值愈大藝術性越高(與提示相關越小)
#     Low stylization values produce images that closely match the prompt but are less artistic.
#     High stylization values create images that are very artistic but less connected to the prompt.
# =========================================== 
# remix mode: Variations 可輸入提示
# =========================================== 
# --ar 16:10 : 比例
#     --ar 16:10 A computer screen might have a ratio of
#     --ar 1:1 Default aspect ratio.
#     --ar 5:4 Common frame and print ratio.
#     --ar 3:2 Common in print photography.
#     --ar 7:4 Close to HD TV screens and smartphone screens. 
# =========================================== 
# --no leaf : 不要什麼元素(葉子)
# --no water trees
# =========================================== 
# 提示圖像: 1.load picture, 2.drop to command, 3.add other promp 
# --iw:.5~2(v5), 越大相關性越高
# prompt example: /imagine prompt flowers.jpg birthday cake --iw .5
# =========================================== 
# ::多提示
# hot:: dog produced a dog that is hot. 
# hot::2, dog::1 = makes the word hot twice as important as the word dog
# =========================================== 
# /blend :混和兩張圖
# =========================================== 
# --seed :　0–4294967295，uses a seed number to create a field of visual noise,相同的數值可產生相近的圖
# =========================================== 
# video only support version 3 (4 and 5 not support, add envolope can see it)
# a hacker sitting in front of a computer::3, and hacking:2, in a dock enviornment, duotone green::3 and blcke::1 --video --v 3 
# =========================================== 
# --chaos
# --c 0-100 : 數字愈高畫風愈特別
# =========================================== 
# --repeat 4 : 重複送出4次
# =========================================== 
# --seed :取得這張圖的編號
# --iw 0.9 : Image Weight(圖像佔有的比重)
# --niji :　二次元化（不能同時用-iw)
# --video : create a short movie
# ============================
# --stop : accepts values: 10–100, 較小值產生模糊效果
# --tile : generates images that can be used as repeating 
# --r : parameter runs a Job multiple times
#      --repeat is available for Standard and Pro subscribers
#      --repeat accepts values 2–10 for Standard subscribers.
#      --repeat accepts values 2–40 for Pro subscribers.
# ============================
# yellow palette : 黃色風格
# octane render : 3D
# =============================
# --test --creative : 官方測試較細膩(不知是否還有用)
```

##### option(自訂 parameter) 
``` bash
# --cb : color book
# vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3 
/prefer option set option:cb    value:vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3 
# outline border, vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3
/prefer option set option:cb    value:outline border, vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3 

# list option
/prefer option list 
	wallpaper: --w 1920 --h 1024 --hd
	cb: vector lines style of comic, style of coloring book, thick, clear, lines, black, and white --ar 2:3
```

##### prompt example
+ Andreas Achenbach style

##### special words
+ realistic
+ 32 bit isometric : 3D
+ water sketch : 水素描
+ movie poster : 電影海報
+ anime : 動畫
+ minimalist : 極簡主義
+ 8k 

##### other control 
+ develop : 可收到4張分開圖,及 seed 值

##### web design
###### [Midjourney Web Design: The Complete Prompt Guide](https://aituts.com/midjourney-web-design/)
``` bash
# web design for... or modern web design for...
#   web design for a generic SaaS startup --ar 3:2
#   web design for a flight discount service
#   web design for a flight discount service --no shading realism photo details
# Use "--ar 3:2" if you are creating web designs
#   web design for a plant database, minimal vector flat --no photo detail realistic
#   web design for a plant database, minimal vector flat --no photo detail realistic --ar 3:2
#   web design for a plant database, minimal vector flat --no photo detail realistic
#   web design for a plant database, minimal vector flat --no photo detail realistic --ar 3:2
# To frame or not to frame? - macbook m1 mockup (macbook m1 樣機)
#   web design for a hotel website --no shading realism details --seed 1024912
#   web design for a hotel website macbook m1 mockup --no shading realism details --seed 1024912
# Design only device - computer window 
#   web design for a flight discount service --no shading realism photo details --seed 1024912
#   web design for a flight discount service --no shading realism photo details device computer window --seed 1024912
```

###### [How to Build the Best Midjourney Web Designs](https://www.saplingcorp.com/journals/20/midjourney-web-design-prompts)


#### Setup Your Own Midjourney Server
<div style="max-width:700px">
	{% asset_img pic11.png pic11 %}
</div>
<div style="max-width:700px">
	{% asset_img pic12.png pic12 %}
</div>
<div style="max-width:700px">
	{% asset_img pic13.png pic13 %}
</div>
<div style="max-width:700px">
	{% asset_img pic14.png pic14 %}
</div>

#### COMMINITY FORUMS
+ prompt-faqs  

#### chatGPT generate prompt
##### 蘋果妹 
``` 
I'm using an image generating ai called Midjourney. I want you to act as a Midjourney prompt generator.I will add/before the subject I want to generate. you are going generate
appropriate prompts under different circumstances, For example, if I type /sports shoes
product image, you are going to generate prompts like"Realistic true details photography
of sports shoes, y2k, lively, bright colors, product photography, Sony A7R IV, clean sharp
focus"
```

#### style reference
##### [Midjourney Keywords & Styles](https://marigoldguide.notion.site/marigoldguide/52ac9968a8da4003a825039022561a30?v=a697f852c05840478b8b504da455cfef)

#### info record

##### 2023/05/10
```
Subscription: Basic (Active monthly, renews next on 2023年5月23日 11:54)
Job Mode: Fast
Visibility Mode: Public
Fast Time Remaining: 107.72/200.0 minutes (53.86%)
Lifetime Usage: 158 images (3.81 hours)
Relaxed Usage: 0 images (0.00 hours)

Queued Jobs (fast): 0
Queued Jobs (relax): 0
Running Jobs: None
```

##### 2023/05/10-2
```
Subscription: Basic (Active monthly, renews next on 2023年5月23日 11:54)
Job Mode: Fast
Visibility Mode: Public
Fast Time Remaining: 106.90/200.0 minutes (53.45%)
Lifetime Usage: 159 images (3.82 hours)
Relaxed Usage: 0 images (0.00 hours)

Queued Jobs (fast): 0
Queued Jobs (relax): 0
Running Jobs: None
```


### [DALL-E2](https://openai.com/product/dall-e-2)

### Tool
+ [ChatGPT Prompt Genius](https://chrome.google.com/webstore/detail/chatgpt-prompt-genius/jjdnakkfjnnbbckhifcfchagnpofjffo): Discover, share, import, and use the best prompts for ChatGPT
+ [ChatGPT for Google](https://chrome.google.com/webstore/detail/chatgpt-for-google/jgjaeacdkonaoafenlfkkkmbaopkbilf): google search 同時問 chatGPT
+ [WebChatGPT](https://chrome.google.com/webstore/detail/webchatgpt-chatgpt-with-i/lpfemeioodjbpieminkklglpmhlngfcn): 在ChatGPT上問了一個問題，它就會到Google上搜尋數條相關的連結，並把這些資料整理成一段簡短的敘述
+ [AIPRM for ChatGPT](https://chrome.google.com/webstore/detail/aiprm-for-chatgpt/ojnbohmppadfgpejeebfnmnknjdlckgj): Prompts for ChatGPT
+ [Summarizied](https://chrome.google.com/webstore/detail/summarize/lmhkmibdclhibdooglianggbnhcbcjeh/related): 對網頁產生摘要

### Ref
+ [OpenAI](https://platform.openai.com/)
+ [showGPT.co](https://showgpt.co/)
+ [MidJourney Prompt Helper](https://prompt.noonshot.com/)
+ [OpenArt](https://openart.ai/discovery)
+ Othet AI
  + [Midjourney免費替代！Leonardo AI](https://www.youtube.com/watch?v=hjtpP2QyZu0)
  + [Leonardo.Ai](https://leonardo.ai/)
  + [niji journey](https://nijijourney.com/zh/):動漫風格
  + [DreamStudio](https://beta.dreamstudio.ai/generate)
  + [Playground AI](https://playgroundai.com/)
  + [Bing Image Creator](https://www.bing.com/images/create?form=FLPGEN)
+ Create Content Tool
  + Generate Script
    + [chatGPT](https://chat.openai.com)
  + Convert Serval image to a video
    + [Pictory](https://pictory.ai/pricing)
  + Convert text to audio
    + [ElevenLabs](https://beta.elevenlabs.io/)
  + Other 
    + [Photo Video Maker](https://www.veed.io/create/photo-video-maker):image+script --> video
    + [elai](https://elai.io/)
+ Thumbnail tool
	+ [picsart](https://picsart.com/)
	+ [picmaker](https://www.picmaker.com/youtube-thumbnail-maker)
	+ [fotor](https://www.fotor.com/design/youtube-thumbnail.html)
+ Midjounery Prompt tool
	+ [MidJourney Prompt Helper-noonshot](https://prompt.noonshot.com/)
	+ [Midjourney-futuretools](https://www.futuretools.io/tools/midjourney)
	+ [Community Showcase](https://www.midjourney.com/showcase/recent/)
+ Midjounery Prompt
  + [Midjounery Parameter List](https://docs.midjourney.com/docs/parameter-list?ref=blog.chichu.co)
  + [Prompt Hero](https://prompthero.com/)
  + [An advanced guide to writing prompts for Midjourney](https://medium.com/mlearning-ai/an-advanced-guide-to-writing-prompts-for-midjourney-text-to-image-aa12a1e33b6)
  + [midjourney library styles](https://www.midlibrary.io/)
  + [MidJourney-Styles-and-Keywords-Reference](https://github.com/willwulfken/MidJourney-Styles-and-Keywords-Reference)

+ Web Design 
  + [Midjourney Web Design: The Complete Prompt Guide](https://aituts.com/midjourney-web-design/)
  + [Web Design Mockups With Device](https://prompts.aituts.com/web-design-mockups-with-device)
  + [How to Build the Best Midjourney Web Designs](https://www.saplingcorp.com/journals/20/midjourney-web-design-prompts)
  + [40+Midjourney Prompts to Create Outstanding UI Design](https://bootcamp.uxdesign.cc/midjourney-prompts-to-create-outstanding-ui-design-ef947bf63007)
  + [How To Make A Website Look Professional With Midjourney](https://wgmimedia.com/how-to-make-a-website-with-midjourney/)
  + [How To Create A Website Design Using Midjourney](https://medium.com/geekculture/how-to-create-a-website-design-using-midjourney-fe0d784ba716)
  + [Lexica](https://lexica.art/prompt/e69892f5-348d-4afc-875a-ef9efb2b0e3c)
+ Logo Design
  + [How To Use Midjourney For Logo Design](https://www.ebaqdesign.com/blog/midjourney-logo-design)
+ Landing page
  + [21 of the Best Landing Page Design Examples You Need to See in 2022](https://blog.hubspot.com/marketing/landing-page-examples-list)
  + [54 inspiring landing page design ideas](https://99designs.com/blog/creative-inspiration/landing-page-design-inspiration/)
  + [Top Landing Page Website Inspiration](https://onepagelove.com/inspiration/landing-page)