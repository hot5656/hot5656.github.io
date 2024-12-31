---
title: AI Foundations-1
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
	- Bland AI
	- Air
2. AI agent
	- AAA
3. AI automation
	- make.com
	- Zapier
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

#### Perfect Peompt *fOrMuLA* for Bulding Systems
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
EmotioPrompt refers to adding a short phrase or sentence containing emotional stimuli to the original prompt to enhance performance.

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
Specifics
	1. This task is critical to the success of oue 
Specifics :
	1. This task is critical to the success of our business, so please provide a thorough analysis of the email
	2. If the email contains personally identifiable information(PII), ensure that it is handled in accordance with our private data policies. 
	3. Your accurate categorization of this email is greatly appreciated and contributes to the efficiency of our operation.
</code>

##### Context 21:04

##### Example

##### notes


### 參考資料
+ [YouTube Academy 2024: Complete Beginner to Pro Step-by-Step](https://www.udemy.com/course/youtubeacademy/)
+ [Film YouTube Videos On Your Smartphone By Yourself [6 Easy Steps]](https://www.youtube.com/watch?v=QICqk4W047M)
