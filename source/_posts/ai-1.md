---
title: OpenAI 說明
abbrlink: ce78
date: 2023-03-09 11:39:44
categories: Coding
tags:
	- ai
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
```

#### prompt
``` bash
# 主題, 畫風, 顏色/光線, 作畫模式 ....(", " 分開)
# --v 4 : version 4
# --ar 1:1 : 比例
# yellow palette : 黃色風格
# --test --creative : 官方測試較細膩(不知是否還有用)
# octane render : 3D
```

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

### Tool
+ [ChatGPT Prompt Genius](https://chrome.google.com/webstore/detail/chatgpt-prompt-genius/jjdnakkfjnnbbckhifcfchagnpofjffo): Discover, share, import, and use the best prompts for ChatGPT
+ [ChatGPT for Google](https://chrome.google.com/webstore/detail/chatgpt-for-google/jgjaeacdkonaoafenlfkkkmbaopkbilf): google search 同時問 chatGPT
+ [WebChatGPT](https://chrome.google.com/webstore/detail/webchatgpt-chatgpt-with-i/lpfemeioodjbpieminkklglpmhlngfcn): 在ChatGPT上問了一個問題，它就會到Google上搜尋數條相關的連結，並把這些資料整理成一段簡短的敘述
+ [AIPRM for ChatGPT](https://chrome.google.com/webstore/detail/aiprm-for-chatgpt/ojnbohmppadfgpejeebfnmnknjdlckgj): Prompts for ChatGPT
+ [Summarizied](https://chrome.google.com/webstore/detail/summarize/lmhkmibdclhibdooglianggbnhcbcjeh/related): 對網頁產生摘要

### Ref
+ [OpenAI](https://platform.openai.com/)
+ [showGPT.co/](https://showgpt.co/)
+ [MidJourney Prompt Helper](https://prompt.noonshot.com/)
+ [OpenArt](https://openart.ai/discovery)