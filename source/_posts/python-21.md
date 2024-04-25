---
title: Python大數據特訓班:資料自動化收集、整理、清洗、儲存、分析與應用實戰
abbrlink: 3f12
date: 2024-04-10 13:42:50
categories: Coding
tags:
	- python
	- book
	- crawling
---


### LINE 貼圖收集器
[LINE STORE](https://store.line.me/zh-Hant)

<!--more-->

``` py
import requests
from bs4 import BeautifulSoup
import json
import imghdr
import os

TARGET_URL = 'https://store.line.me/stickershop/product/30858/zh-Hant'
FILE_PREFIX = 'mouse'
FOLDER = FILE_PREFIX

def main():
    try:
        resp = requests.get(TARGET_URL)
    except:
        resp = None

    if resp and resp.status_code == 200:
        soup = BeautifulSoup(resp.text, 'html.parser')
        # UnicodeEncodeError: 'cp950' codec can't encode character '\u2661' in position 7107: illegal multibyte sequence
        # print(soup.encode('utf-8'))
        # print(type(soup))
        try :
            # select by class
            datas = soup.select('.FnStickerList .FnStickerPreviewItem')

            # create folder
            if not os.path.exists(FOLDER) :
                os.makedirs(FOLDER)

            for index, data in enumerate(datas):
                # get data_preview from json
                data_preview = json.loads(data['data-preview'])
                # down load image
                download_image(data_preview['fallbackStaticUrl'], FILE_PREFIX+str(index+1))
        except :
            print('No any figure...')

def download_image(url, filename):
    # get image
    resp = requests.get(url)
    if resp.status_code == 200:
        # check image type
        image_type = imghdr.what(None, resp.content)
        # save image
        image_name = f"{filename}.{image_type}"
        with open(os.path.join(FOLDER, image_name), 'wb') as file:
            file.write(resp.content)
        print(f"download image {image_name}.")
    else:
        print("Failed to download from '{url}'")

if __name__ == '__main__':
    main()
```

### YouTube 資源下載

#### install pytube
[pytube document](https://pytube.io/en/latest/)

``` bash
pip install pytube
```

#### YouTube 下載
``` py
# YouTube 下載
# pip install pytube
# [pytube document](https://pytube.io/en/latest/)

from pytube import YouTube
import os

FOLDER = "youtube"

def main():
    # create folder
    if not os.path.exists(FOLDER) :
        os.makedirs(FOLDER)

    yt = YouTube('https://www.youtube.com/watch?v=wyHLLzmNje0')

    # show all video format
    yt_streams = yt.streams
    for stream in yt_streams:
        print(stream)
    # <Stream: itag="18" mime_type="video/mp4" res="360p" fps="24fps" vcodec="avc1.42001E" acodec="mp4a.40.2" progressive="True" type="video">
    # <Stream: itag="248" mime_type="video/webm" res="1080p" fps="24fps" vcodec="vp9" progressive="False" type="video">
    # <Stream: itag="249" mime_type="audio/webm" abr="50kbps" acodec="opus" progressive="False" type="audio">

    # select stream
    print("第一個 stream", yt_streams.first())
    print("最後一個 stream", yt_streams.last())
    # filter(條件1=值1, 條件2=值2, ...)
    # progressive=True 同時具備影像與聲音
    # adaptive=True 只具備影像或聲音
    # subtype='mp4' 影片格式
    # res='720p' 解析度
    # only_audio=True audio only
    # First() 符合條件第一個
    # Last() 符合條件最後一個
    print("指定條件 stream", yt_streams.filter(subtype='mp4'))

    # download 1st
    # yt.streams.first().download(FOLDER)
    # download 3rd
    # yt.streams[2].download(FOLDER)
    # print(f'{yt.title} Download complete')

    # load audio
    print('-- only audio --')
    print(yt.streams.filter(only_audio=True))
    # mime_type 聲音檔格式 'audio/webm', 'audio/mp4'
    audio = yt.streams.filter(only_audio=True, mime_type='audio/webm').first().download(FOLDER)
    print(f'{yt.title} audio Download complete')

if __name__ == '__main__':
    main()
```

#### YouTube 批次下載(播放清單下載)

<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

``` py
# YouTube 批次下載(播放清單下載)
from pytube import Playlist
from pytube import YouTube
import os

LIST_URL = 'https://www.youtube.com/watch?v=f_OPjYQovAE&list=PLJicmE8fK0EhtXk4bQAHgyYh8v7-w8L7E'
FOLDER = "youtube"

def main():
    playList = Playlist(LIST_URL)
    # videolist = playList.video_urls
    # print(videolist)

    # create folder
    if not os.path.exists(FOLDER) :
        os.makedirs(FOLDER)

    for url in playList:
        yt = YouTube(url)
        yt.streams.filter(subtype='mp4', res='360p', progressive=True).first().download(FOLDER)
        print(f'{yt.title} Download complete')

if __name__ == '__main__':
    main()
```

#### + {% post_link python-3 '#Tk interface YouTube 批次下載' %}


### Ref
+ [Source and Video](https://www.gotop.com.tw/books/download.aspx?bookid=ACL067200)
+ [Blog](http://www.e-happy.com.tw/)
+ {% post_link dl-1 '# Google Colab' %}:python 雲端開發平台
+ {% post_link python-20 '# Jupyter Notebook' %}: