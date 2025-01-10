---
title: AI Foundations - Basic
abbrlink: a652
date: 2024-12-26 10:53:27
categories: AI
tags:
	- ai Foundations
---

### 名詞
+ **SMMA**
	在商業模式中，**SMM** 通常是指 **Social Media Marketing**（社群媒體行銷）。它是利用像 Facebook、Instagram、Twitter、LinkedIn 等社群媒體平台來推廣品牌、產品或服務的行銷策略。
<!--more-->
 	在 **SMMA**（Social Media Marketing Agency，社群媒體行銷代理機構）這種商業模式中，代理商或個人會為企業提供社群媒體行銷服務，例如：

	1. **內容創建**：撰寫貼文、設計圖片或影片，吸引目標受眾。
	2. **廣告管理**：使用平台如 Facebook Ads 或 Google Ads，根據客戶需求設定廣告目標。
	3. **數據分析**：追蹤成效，分析點擊率、轉換率，並調整策略。
	4. **帳號管理**：維護客戶的社群媒體帳號，回覆留言或私訊。
	5. **品牌建立**：設計一致的品牌形象，提升品牌認知度。

	**SMM** 是許多中小型企業和創業者的熱門選擇，因為社群媒體能以相對低的成本觸及廣泛的受眾，而 **SMMA** 則是幫助企業處理這些需求的商業模式。
+ **SCTO** : Chief Technology Officer
+ **Lead flow**（潛在客戶流程）是指在業務中獲取、追蹤和轉化潛在客戶（Leads）的過程和策略。它涵蓋了從吸引目標客戶開始，到將他們轉化為實際客戶的整個過程。簡單來說，Lead flow 是指一家公司如何管理和優化其潛在客戶的流入與處理。
+ **DM** : 是 "direct message" 的縮寫，指的是社交媒體平台上用戶之間的私人消息
+ **MVP**（Minimum Viable Product）: MVP，即最小可行產品，是一種具有足夠功能的產品版本，旨在吸引早期用戶並驗證產品理念。這種產品通常只包含最基本的功能，以便快速推出市場並收集用戶反饋
+ **POC**（Proof of Concept）: 即概念驗證，是一種展示某個想法或方法是否可行的過程。它通常涉及小規模的實驗或原型，以證明某個概念在技術上是可行的，或者能夠解決特定問題。
+ **CRM** : 即客戶關係管理（Customer Relationship Management），是一種企業策略和技術，旨在通過管理和分析客戶互動及數據來提升企業與客戶之間的關係。
+ **VA** : 即虛擬助理（Virtual Assistant）


### [Top 5 Areas for AAA Specialization](https://www.skool.com/learn-ai/classroom/2871573e?md=670b6f8eff524ebf98b7c3c86f5f89a6)
+ AI Opportunity 
	1. AI Saas: 
  2. AI agency(v): provide AI solutions for AI businesses/company
  3. Education: educate people about AI(need skills)
+ 3 Problems for Starting AI
  1. Expertise專業知識(technical)
  2. Lead flow潛在客戶流程(leads 客戶)
  3. Credibility Authority信譽權威
+ Fix problem Strategy 
  1. Learn the "Thing"
    - started Niche initially and became an expert in a small area
    - slowly broadened expertise
  2. share your journey(Youtube/LinkedIn )
  3. offer free consulting
  4. close deals達成交易
+ 5 Types specialist
	1. AI automation Specialist
    - make.com
    - Airtable
	2. Text-based Agent Specialist
    - chatgpt assistant API(custom version chatgpt)
    - agentive on top put on WhatsApp, websites various places
	3. Voice-based Agent Specialist
    - Bland AI
    - air AI
    -  Synthflow
    -  Vapi
	4. Zapier Ecosystem Specialist(no code)
    - automation
    - chatbots 
    - data management
	5. Chatbot Specialist 
    - Voiceflow
    - WhatsApp(can add button) via voice flow

### Voice-based Agent 參考工具
+ Base
	1. [Vapi](https://vapi.ai/)
	2. [Retell AI](https://www.retellai.com/)
	3. [Bland AI](https://www.bland.ai/)
+ Tools
	1. [make.com](https://www.make.com/) : 自動化工具
	2. [Airtable](https://www.airtable.com/) : 資料儲存
	3. Google Sheet : local 儲存
	4. [N8N](https://n8n.io/) : 自動化工具(local, 免費)
	5. [Replit Agent](https://replit.com/) : 測試平台
	6. [Pinecone](https://www.pinecone.io/)
		- 向量數據庫的雲原生服務，旨在幫助開發者輕鬆構建和部署高效的向量搜索和相似性匹配功能
		- 資料縮整理
	7. [Relevance AI](https://relevanceai.com/) : 自動化工具
	8. [Google AI Studio](https://aistudio.google.com/prompts/new_chat) : 基於瀏覽器的整合式開發環境 (IDE)，專為生成模型的原型設計
+ Other 
	1. [Cal.com](https://cal.com/zh-TW) : 日程安排工具
	2. [Tally](https://tally.so/) : 表單製作工具
	3. [Typeform](https://www.typeform.com/) : 表單和調查工作
+ Reference link
	+ [How I’d start a Voice AI Agency in 2025](https://www.youtube.com/watch?v=PmaWoRWL5qk&t=4s)


### Bland + Pinecone Assistant example
+ Load flow
	1. put data to google drive
	2. upload to Pinecone
	3. get Pinecone API
+ Flow 
	1. call to Bland
	2. make.com send to Pinecone
	3. make.com wait Pinecone response
	4. make.com send result to Bland
+ Reference link
	[Bland and Pinecone Assistant Tutorial](https://www.youtube.com/watch?v=JzwyvNegDiI&list=PL6eX2EPL9gdFjVyURlVSiBIa-bOpdl7X2&index=4)

### AI agent flow
+ Thing processing example
	1. Brain
	2. Tools
	3. Missions(目標)
+ 4-step process
	1. input(your request)
	2. processing(deciding what to do)
	3. active(deciding on what tools they can on use to complete the task)
	4. learning(inproving over the time)
+ AI agent example
	1. LLM(chatGPT)
	2. tools(phone)
	3. goal(booking meeting) 
+ Google AI Studio example 
+ Reference link
	[AI Agents Explained Like You're 5](https://www.youtube.com/watch?v=jtUiXFRMf0U)

### why you suck at prompt engineering(and how to fix)
#### prompt engineering types :

1. AI voice systems
	- synthflow
	- Bland AI : Bland AI 是一個專為開發者設計的平台，旨在大規模建立AI 驅動的電話呼叫應用程式。該平台提供了進出站電話的API 和基礎設施，使企業能夠自動化客戶支援、銷售和資料收集等任務。
	- Air
2. AI agent
	- AAA
3. AI automation
	- make.com
	- Zapier : Zapier 是一個強大的自動化工具，旨在幫助用戶連接和整合不同的應用程序，以自動化日常任務和工作流程。
4. AI tools/Apps
	- Relevance AI
	- Stack AI

#### good guy  for prompt engineering:
1. has a toolkit of prompt components and methods based on research
2. approaches the problem like an engineer 
3. skillfully applies techniques
4. achieves desired performance with the fastest and cheapest model
5. Create lightning-quick and affordable AI system for clients that create value
6. Make money
7. Finds other AI chads and gets AI rich

#### Perfect Prompt *fOrMuLA* for Bulding Systems
##### Role
###### Example
<code class="wrap-code">
You are a highly skilled and creative short-form content script writer with a knack for crafting engaging, informative, and concise videos 
</code>

<code class="wrap-code">
You are an experienced email classification assistant who accurately categorized emails based on their content and potential impact
</code>

##### Task
###### notes on Write Tasks:
+ Always start with a verb(e.g. generate, write, analyze)
+ Be descriptive and precise while keeping it brief
+ Depending on the use case, this is where you can insert your variables(see below)

###### Key Takeaway:
The more complex the problem, the more dramatic the improvement using chain-of-thought prompting

###### Example
<code class="wrap-code">
Generate engaging and casual outreach for users looking to promote their niche-specific service or products, especially focusing on the integration of AI tools to scale businesses. Your messages should be direct, friendly, and tailored to the recipient, encouraging a conversation about how AI can benefit their business.
Below are the details of what you must generate.
Niche:
{{niche}} 
Offer:
{{offer}}
</code>

<code class="wrap-code">
Generate an engaging, informative 30-second video script about {{topic}}. Make the content clear, concise, and easy to understand for a general audience.
Use this step-by-step process to ensure your script is top-notch:
	1. Hook the viewer with an attention-grabbing opening
	2. Briefly explain the key concepts or ideas related to {{topic}}
	3. Provide 1-2 fascinating facts or statistics to illustrate the importance the importance of {{topic}}
	4. Describe the main takeaway or action viewers should remember
	5. End with a power  closing line that reinforces the message
	6. Review the entire script for conciseness and flow
</code>

<code class="wrap-code">
Calssfy the following email into "Ignore", Opportunity", or "needs Attention" labels using the following step-to-step process:
	1. Analyze the email content for keywords and phrases that indicate the email's importance and relevance to the business
	2. Determine if the email requires a response or action based on its content.
	3. Assign the appropriate label based on the analysis: "Ignore" for irrelevant emails, "Opportunity" for emails that present potential business opportunities, or "Need Attention" for emails that require a timely response or action
	Email: {{emailContent}}
</code>

##### Specifics
###### Item 1 
The specifics section is a chance to list out the most important notes regarding the execution of the task outline above.
The This format allow you to easily add on new instructions as you test and imporve the prompt. Of course, try not to pile on fluff there. Less is more.

<code class="wrap-code">
Example Task: 
	Generate engaging and causual outreach message for users looking to peomote their nich-specific services or products, specially focusing on the integration of AI tools to sacle business. Your messages should be direct, fridendly, and tailored to the recipient, encouraging a coversation about how AI can benifit their business. Below are the detail of what you must generate for.
Example Specifics:
	1. Each message should have an intro, body, and outro, with a tone that's informal and engaging
	2.  Use placeholders like{user.firstname} to personalize introduction
	3. Etc
</code>

###### Item 2
Specifics also provide an opportunity to integrate another technique proven to increase response quality and accuracy known as EmotionPrompt.
EmotionPrompt refers to adding a short phrase or sentence containing emotional stimuli to the original prompt to enhance performance.

Example:
1. "This is very important to my career" was most effective on simple task
2. "This task is vital to my career, and I greatly value your thorough analysis"

Key Takeaway:
Adding simple phrases like these to your specifics can encourage the model to engage in more thorough and deliberate processing, which is beneficial for complex tasks that require more careful thought and Analysis.

###### Example 
<code class="wrap-code">
Role:
You are an experienced email classification assistant who accurately categorized emails based on their content and potential impact
Task:
Calssfy the following email into "Ignore", Opportunity", or "needs Attention" labels using the following step-to-step process:
	1. Analyze the email content for keywords and phrases that indicate the email's importance and relevance to the business
	2. Determine if the email requires a response or action based on its content.
	3. Assign the appropriate label based on the analysis: "Ignore" for irrelevant emails, "Opportunity" for emails that present potential business opportunities, or "Need Attention" for emails that require a timely response or action
	Email: {{emailContent}}
Specifics :
	1. This task is critical to the success of our business, so please provide a thorough analysis of the email
	2. If the email contains personally identifiable information(PII), ensure that it is handled in accordance with our private data policies. 
	3. Your accurate categorization of this email is greatly appreciated and contributes to the efficiency of our operation.
</code>

##### Context(情境)
providing context as to what environment the LLM is operating in and why it is doing this specific task can help to further increase performance.
This combines earlier techniques like Role (by further clarifying who it is, what it is doing and why it is doing it). EmotionPrompt can also be used again here while explaining the importance of the LLM's role in the success of the business and even society as a whole.

<code class="wrap-code">
Example :
Our company provides solutions to businesses across various industries. We receive a high volume of emails from potential clients through our website's contact form. You role in classifying these emails **essential** for our sales team to prioritize their efforts and respond to requires in timely manner. By **accurately** identifying opportunities and emails that need attention, you directly contribute to the **growth and success of our company**. Therefore we **greatly value your careful consideration** and attention to classification.
</code>

General Notes:
1. Provide context **on the business** including customers, types of services or products, company values etc.
2. Provide context **on the system it is part of**, eg when customers submit our website form we receive an email, you are then...
3. Provide context **on the importance of the task** and the business and/or society as a whole.

###### Example 
<code class="wrap-code">
Role:
You are an experienced email classification assistant who accurately categorized emails based on their content and potential impact
Task:
Calssfy the following email into "Ignore", Opportunity", or "needs Attention" labels using the following step-to-step process:
	1. Analyze the email content for keywords and phrases that indicate the email's importance and relevance to the business
	2. Determine if the email requires a response or action based on its content.
	3. Assign the appropriate label based on the analysis: "Ignore" for irrelevant emails, "Opportunity" for emails that present potential business opportunities, or "Need Attention" for emails that require a timely response or action
	Email: {{emailContent}}
Specifics :
	1. This task is critical to the success of our business, so please provide a thorough analysis of the email
	2. If the email contains personally identifiable information(PII), ensure that it is handled in accordance with our private data policies. 
	3. Your accurate categorization of this email is greatly appreciated and contributes to the efficiency of our operation.
Context :
Our company provides solutions to businesses across various industries. We receive a high volume of emails from potential clients through our website's contact form. You role in classifying these emails essential for our sales team to prioritize their efforts and respond to requires in timely manner. By accurately identifying opportunities and emails that need attention, you directly contribute to the growth and success of our company. Therefore we greatly value your careful consideration and attention to classification.
</code>


##### Examples
In the examples section we use a technique known as **Few-Shot Promping** to increase performance and **fine tune response tone, format and length.**
This is when a number of **input-out examples** are provided to the language model as part of the prompt. This allows the model to **perform new tasks without fine-tuning.**

Key Takeaways:
1. Provide just a few examples **significantly** improve performance compared to zero-shot prompting (no examples).
2. Accuracy **scales** with the number of examples, but shows **diminishing  returns.** Most of the gains can be achieved with *10-32 well-crafted examples.**(3~5 good enough)

###### Example 
<code class="wrap-code">
Q: Email: "Dear Sir/Madam, I am interested in learning more about your AI solutions for the healthcare industry. Could you please provide me with more information about your products and pricing? Thank you, John Doe"
A: Label: Opportunity
Q: Email: "To whom it may concern, I am writing to inquire about the job openings at your company. I have attached my resume for your consideration. Best regards, Jane Smith"
A: Label: Ignore
Q:Email: "Hello, I am experiencing technical difficulties with one of your Ai products. Please contact me at your earliest convenience. Thank you. Mike Johnson"
Ａ: Label: Needs Attention
</code>

##### notes
The notes section is your **last chance** to remind the LLM of key aspects of the task and add any final details to tweak outputs to your desired style

You notes from a list consisting of things like:
1. Output formatting notes e.g. "your output should be in x format"
2. Negative prompting "do NOT do x"
3. Tone tweaks
4. Reminders of key points from the task or specifics

This list of notes usually starts out **skinny** and ends up a **few lines deep** after a few rounds of testing and tweaking. This list is where you can add things without refactoring the whole prompt.
The inclusion of the 'notes' section in this prompt formula is based on the **"Lost in the Middle"** effect which highlights a significant limitation in how language models handle large amounts of input tokens.

Lost in The Middle Effect:
1. The language model performs best when relevant information is at the **very beginning** (primacy) or **end**(recency) of the input context
2. Performance **significantly worsens** when **critical** information is in the middle of a long context
3. This effect occurs even in models **designed** for long input sequences.

Key takeaways:
1. Instruction giving at the start and end of a prompt are **"listened to"** by the LLM far **more** than information in the middle.
2. For this reason the notes section is a handy place to append **reminders** from the task or specifics that the LLM may be ignoring
3. Be aware that increasing context length alone does not ensure better performance. **Less context of "fluff"**  will mean the remaining instructions are more likely to be followed.

###### Example 
<code class="wrap-code">
notes 
1. Please provide the email classification label and only the label as your response
2. Do not include any personal information from the email in your response
3. If you are unsure about the appropriate classification, err on the side of caution and assign the "Needs Attention" label.
</code>


#### Markdown Formatting
Long prompts can get messy. For our sake(and the LLM's), we need some way to provide **structure** in order to outline the **different components** of our formula. The most effective way right is with **Markdown**, a plain text formatting syntax that is common across the web.
It gives use **new tools** to structure our prompt with:
1. Headings (#,## or ### for H1,H2 & H3)
2. Bolds, italics and underlines
3. Lists
4. Horizontal rules
5 More

**OpenAI themselves write their prompts in Markdown**, which may be reflected in their tuning dataset, so following suit is not a bad idea!
While studies have compared it to non-markdown prompts, it definitely **does not detract** from the performance while still marking things more **legible**  for use as prompt engineers.

Key Takeaways:
1. Use ** H1 tags**(signal #) to mark each of the components for your prompt 
2. Use **H2 or H3 tags** (double or triple #)as necessary with each core component
3. Use **bolds** to emphasize words eg **this is bold** (not super import)

##### Example 
<code class="wrap-code">
# Role
# Task
# Specifics
# Context
## About the business
## Our system
# Examples
## Example 1
Q:
A:
## Example 2
Q:
A:
# notes
</code>

##### Email classification prompt
<code class="wrap-code">
# Role
You are an experienced email classification assistant who accurately categorized emails based on their content and potential impact
---
# Task
Calssfy the following email into "Ignore", Opportunity", or "needs Attention" labels using the following step-to-step process:
1. Analyze the email content for keywords and phrases that indicate the email's importance and relevance to the business
2. Determine if the email requires a response or action based on its content.
3. Assign the appropriate label based on the analysis: "Ignore" for irrelevant emails, "Opportunity" for emails that present potential business opportunities, or "Need Attention" for emails that require a timely response or action
	Email: {{emailContent}}
---
# Specifics
- This task is critical to the success of our business, so please provide a thorough analysis of the email
- If the email contains personally identifiable information(PII), ensure that it is handled in accordance with our private data policies. 
- Your accurate categorization of this email is greatly appreciated and contributes to the efficiency of our operation.
---
# Context
Our company provides solutions to businesses across various industries. We receive a high volume of emails from potential clients through our website's contact form. You role in classifying these emails essential for our sales team to prioritize their efforts and respond to requires in timely manner. By accurately identifying opportunities and emails that need attention, you directly contribute to the growth and success of our company. Therefore we greatly value your careful consideration and attention to classification.
---
# Examples
## Example 1
Q: Email: "Dear Sir/Madam, I am interested in learning more about your AI solutions for the healthcare industry. Could you please provide me with more information about your products and pricing? Thank you, John Doe"
A: Label: Opportunity
## Example 2
Q: Email: "To whom it may concern, I am writing to inquire about the job openings at your company. I have attached my resume for your consideration. Best regards, Jane Smith"
A: Label: Ignore
## Example 3
Q:Email: "Hello, I am experiencing technical difficulties with one of your Ai products. Please contact me at your earliest convenience. Thank you. Mike Johnson"
Ａ: Label: Needs Attention
---
# Notes 
- Please provide the email classification label and only the label as your response
- Do not include any personal information from the email in your response
- If you are unsure about the appropriate classification, err on the side of caution and assign the "Needs Attention" label.
</code>

####  Considerations
Context Length and Cost
- For high tasks, you need to focus on making the prompt as succinct as possible. Each time it runs you will be charged for input and output tokens, you prompt + any insert variables = input.Short prompt = cheaper system

Choice of Model
- Better prompt engineering can get more performance out of cheaper and faster models
- Where possible, use your skills to bend the cheapest and faster model to execute the task successfully
- Some systems have high volume or require responses, this is when your skills shine

Temperature & Model Setting
- If you're doing creative writing, ideation, etc the test higher levels(0.5~1.0)
- Anything else should be with the temperature set to 0. You want consistency and predictability when creating these AI systems that wrestle with the natural randomness of LLMs.
- Other model settings are not needed in my experience 

#### Use Case
##### AI agency
<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>

##### AI Voice agency
<div style="max-width:700px">
	{% asset_img pic2.png pic2 %}
</div>

##### Automations
<div style="max-width:500px">
	{% asset_img pic5.png pic5 %}
</div>
<div style="max-width:700px">
	{% asset_img pic3.png pic3 %}
</div>

##### AI Tools
<div style="max-width:500px">
	{% asset_img pic6.png pic6 %}
</div>
<div style="max-width:700px">
	{% asset_img pic4.png pic4 %}
</div>

### AI Tools
+ Base
	1. ChatGPT
	2. [Claude](https://claude.ai/)
+ [AI Tools list](https://www.php.cn/zh-tw/ai-tools)
+ [Glasp](https://glasp.co/) : 是一個專注於增強學習和研究體驗的高亮工具，允許使用者在網頁和PDF 文件上高亮文字並添加註解



### 參考資料
+ [YouTube Academy 2024: Complete Beginner to Pro Step-by-Step](https://www.udemy.com/course/youtubeacademy/)
+ [Film YouTube Videos On Your Smartphone By Yourself [6 Easy Steps]](https://www.youtube.com/watch?v=QICqk4W047M)