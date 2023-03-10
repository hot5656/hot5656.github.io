---
title: OpenAI 說明
abbrlink: ce78
date: 2023-03-09 11:39:44
categories: Coding
tags:
	- openai
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
  apiKey: "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",
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

### run 
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
#### info : see account information
``` bash
/info
```

#### image generate
``` bash
/imagine prompt:
```

### Tool
+ [ChatGPT Prompt Genius]: Discover, share, import, and use the best prompts for ChatGPT
+ [ChatGPT for Google](https://chrome.google.com/webstore/detail/chatgpt-for-google/jgjaeacdkonaoafenlfkkkmbaopkbilf): google search 同時問 chatGPT
+ [WebChatGPT](https://chrome.google.com/webstore/detail/webchatgpt-chatgpt-with-i/lpfemeioodjbpieminkklglpmhlngfcn): 在ChatGPT上問了一個問題，它就會到Google上搜尋數條相關的連結，並把這些資料整理成一段簡短的敘述
+ [AIPRM for ChatGPT](https://chrome.google.com/webstore/detail/aiprm-for-chatgpt/ojnbohmppadfgpejeebfnmnknjdlckgj): Prompts for ChatGPT
+ [Summarizied](https://chrome.google.com/webstore/detail/summarize/lmhkmibdclhibdooglianggbnhcbcjeh/related): 對網頁產生摘要

### Ref
+ [OpenAI](https://platform.openai.com/)
+ [showGPT.co/](https://showgpt.co/)
