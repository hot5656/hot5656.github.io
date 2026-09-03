---
title: Claude Code 實戰：12 小時打造會自己賺錢的 AI SaaS
abbrlink: 7d83
date: 2026-09-03 12:17:24
categories:
tags:
---

### top
``` bash
# 怎麼將專業變成收入
1. 想辦法讓你的專業跟經驗透過某一種方式輸出
  文章,影片,部落格,Podcast
2. 有辦法接觸到你第一批潛在客戶, 拿到第一批客戶

# 軟體開發流程
1. 本地開發程式(AI)
2. 部署 - Vercel
3. 資料庫 - Supabase
4. 串金流 - Stripe(國外), 綠界(台灣)
5. 專屬網域

# 產品值不值的做
1. 能不能接觸到第一批潛在客戶

# 收費方式
1. 點數製:AI字幕生成工具, AI影片速讀器, 剪成短影片
2. 訂閱製:稀有產品上線通知, 機票通知
3. 平台抽成:MarketPlace二手轉賣抽成10~15%(找賣方-->找買方)

# github search "flight"
user:name flight
```

### AI 機票價格追蹤功能

#### Lovable generate home page
{% note info %}
**1. download lovable-best-practice SKILL.md**
[lovable-best-practice](https://github.com/uopsdod/claude-2-ai-video-speedreader/blob/main/.claude/skills/lovable-best-practice/SKILL.md)
**2. download supabase-best-practice SKILL.md**
[supabase-best-practice](https://github.com/uopsdod/claude-2-ai-video-speedreader/blob/main/.claude/skills/supabase-best-practice/SKILL.md)

**3. Lovable genetate home page**
+ login Lovable
+ upload previous skill
+ write prompt
```
Build a SaaS landing page + authenticated app shell for Flight Price Notifier
(機票降價通知), a product that watches popular flight routes from Taipei and
emails the user when the cheapest fare drops to or below their target price —
targeted at budget-driven travelers who don't care exactly when they fly,
they just want a ticket under their budget.

The site must include:

A public landing page (/) with:

Hero section: product name "Flight Price Notifier" prominently displayed,
value prop 「設定航線與目標價，機票降價就通知你」(English subtitle: "Set a
route and a target price — we email you when the fare drops."), and a
primary CTA button labeled "Sign in / 登入" in the top-right header.

Three feature cards below the hero, each with an icon, a Chinese title, an
English subtitle, and a one-line Chinese description:

Card 1: ✈️ icon — "盯緊熱門航線" / "Always-on route watching" —
"持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。"

Card 2: 🔔 icon — "達標自動通知" / "Target-price email alerts" —
"低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。"

Card 3: 🚫 icon — "隨時取消" / "Cancel anytime" —
"月訂閱制，不想用隨時停，沒有綁約。"

A simple footer with "© 2026 Flight Price Notifier".

An authenticated area with a /auth page (Supabase email/password auth):

Heading "Welcome back．登入", subtitle "Sign in to manage your fare alerts.",
Email field (placeholder "you@example.com") and Password field, a primary
button "Sign in / 登入", and a toggle link "No account yet? Create one" to
switch to sign-up mode.

After signing in, redirect to a placeholder dashboard page.

Style requirements:

Modern, professional dark theme (purple/violet accent on a near-black
background)

Use Inter or a similar sans-serif font

Mobile responsive

Tasteful subtle animations (fade-in on scroll is fine; don't overdo it)

Out of scope for this v1: route-subscription form, target-price input, fare
display, payment, custom database tables (do NOT create a subscriptions or
profiles table — only use Supabase's default auth.users). Those come in
later milestones. Stick to landing page + auth + placeholder dashboard.
```

**4. try it**
+ open another screen by icon
+ create account: google 001-jdvksfkjg
+ confirm by emain
+ login

**5. connect to github**
+ Lovable icon
+ Settings
+ Git
+ Github
+ Add acount
+ Connect
+ make sure gihub have the respository

{% endnote %}

#### github 
```` bash
git clone https://github.com/hot5656/fare-finder-pro.git
````

### Ref
+ AI 機票價格追蹤功能
  + [ claude-2-ai-video-speedreader--> Lovable Best Practice- Github](https://github.com/uopsdod/claude-2-ai-video-speedreader/tree/main/.claude/skills/lovable-best-practice)
  + [Lovable Best Practice 說明 - pretty gemini](https://gemini.google.com/u/1/app/dd3f939981b7c6bd) : 指導 Claude 「如何與 Lovable 協同開發，或按照 Lovable 的架構規範產出高品質程式碼」
  + [AWS](https://aws.amazon.com/tw/)
  + [TraverlPayouts](https://www.travelpayouts.com/)
  + [Resend](https://resend.com/)
  + [綠界 (ECPay)](https://www.ecpay.com.tw/)