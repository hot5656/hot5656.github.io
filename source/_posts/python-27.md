---
title: Gradio
abbrlink: 3d92
date: 2024-05-15 14:25:22
categories: Coding
tags:
	- python
---

### command
#### install
``` bash
pip install gradio
```

<!--more-->

### Example
#### 1st example
##### Code
``` py
# Gradio 1st example
# [Hugging Face](https://huggingface.co/)
# pip install gradio
# http://127.0.0.1:7860/
# https://609f0dd05ce375b555.gradio.live/
import gradio as gr

def rStr(text):
    return text.replace("morning", "night")

# 建立 gradio
# rStr : 處理函數
# inputs : 輸入欄位
 # outputs : 輸出欄位
grobj = gr.Interface(fn = rStr,
            inputs = gr.Textbox(),
            outputs = gr.Textbox())
# 啟動 gradio
# share=True : public 執行
# grobj.launch(share=True)
grobj.launch()
```

##### public run
<div style="max-width:500px">
	{% asset_img pic1.png pic1 %}
</div>
<div style="max-width:500px">
	{% asset_img pic2.png pic2 %}
</div>

##### local run
<div style="max-width:500px">
	{% asset_img pic3.png pic3 %}
</div>

##### QR code Brave
<div style="max-width:500px">
	{% asset_img pic4.png pic4 %}
</div>

<div style="max-width:500px">
	{% asset_img pic5.png pic5 %}
</div>

##### QR code Chrome
<div style="max-width:500px">
	{% asset_img pic6.png pic6 %}
</div>

#### 萌典 Web App
<div style="max-width:500px">
	{% asset_img pic7.png pic7 %}
</div>

``` py
# 萌典 Web App
# [Hugging Face](https://huggingface.co/)
# pip install gradio
# http://127.0.0.1:7860/
# https://609f0dd05ce375b555.gradio.live/
import gradio as gr
import requests
import json

def rStr(word):
    reStr = ""
    url = f"https://www.moedict.tw/uni/{word}"
    resp = requests.get(url)
    if resp and resp.status_code == 200:
        info = json.loads(resp.text)
        print(f"查詢字詞:{info['title']}\n")
        reStr += f"查詢字詞:{info['title']}\n"
        reStr += f"部首:{info['radical']}\n"
        reStr += f"筆畫:{info['stroke_count']}\n"
        for index, data in enumerate(info['heteronyms']):
            reStr += f"[{index+1}]"
            reStr += f"  注音:{data['bopomofo']}\n"
            reStr += f"  羅馬拼音:{data['bopomofo2']}\n"
            reStr += f"  漢語拼音:{data['pinyin']}\n"
            for i, item in enumerate(data['definitions']):
                reStr += f"  ({i+1}):{item['def']}\n"
                if "type" in item:
                    reStr += f"    詞性：{item['type']}\n"
                if "example" in item:
                    reStr += f"    解釋：{item['example']}\n"
                if "quote" in item:
                    reStr += f"    引用：{item['quote']}\n"
                if "link" in item:
                    reStr += f"    參考\n"
                    for ref in item['link']:
                        reStr += f"      {ref}\n"

    return reStr

# 建立 gradio
grobj = gr.Interface(fn = rStr,
            inputs = gr.Textbox(),
            outputs = gr.Textbox())
# 啟動 gradio
# share=True : public 執行
# grobj.launch(share=True)
grobj.launch()
```

### Ref
+ [Hugging Face](https://huggingface.co/)


