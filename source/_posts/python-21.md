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
from PIL import Image
from io import BytesIO
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

def detect_image_type(content):
    try:
        # Open the image from the content
        with Image.open(BytesIO(content)) as img:
        # open the image from file
        # with Image.open(file_path) as img:
            # Get the format of the image
            image_format = img.format.lower()

            # jpeg same as jpg
            if image_format == 'jpeg':
                return 'jpg'  # Return 'jpg' if the format is 'jpeg'
            else:
                return image_format
            return img.format.lower()
    except Exception as e:
        print("Error:", e)
        return None

def download_image(url, filename):
    # get image
    resp = requests.get(url)
    if resp.status_code == 200:
        # check image type
        image_type = detect_image_type(resp.content)
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

#### {% post_link python-3 '#Tk interface YouTube 批次下載' %}

### 運動相簿下載
[2024新北市鐵道馬拉松接力賽-追火車第7棒](https://running.biji.co/index.php?q=album&act=photo_list&album_id=52183&cid=11282&start=1713672000&end=1713672600&type=place&subtitle=Running%20Holidays%EF%BC%8D2024%E6%96%B0%E5%8C%97%E5%B8%82%E9%90%B5%E9%81%93%E9%A6%AC%E6%8B%89%E6%9D%BE%E6%8E%A5%E5%8A%9B%E8%B3%BD-%E8%BF%BD%E7%81%AB%E8%BB%8A%E7%AC%AC7%E6%A3%92)

<div style="width:500px">
	{% asset_img pic2.png pic2 %}
</div>

<div style="width:500px">
	{% asset_img pic3.png pic3 %}
</div>

<div style="width:500px">
	{% asset_img pic4.png pic4 %}
</div>

#### 運動相簿爬取
``` py
# 運動相簿爬取
# [運動筆記](https://running.biji.co/)
# https://running.biji.co/index.php?q=album&act=photo_list&album_id=52183&cid=11282&start=1713672000&end=1713672600&type=place&subtitle=Running%20Holidays%EF%BC%8D2024%E6%96%B0%E5%8C%97%E5%B8%82%E9%90%B5%E9%81%93%E9%A6%AC%E6%8B%89%E6%9D%BE%E6%8E%A5%E5%8A%9B%E8%B3%BD-%E8%BF%BD%E7%81%AB%E8%BB%8A%E7%AC%AC7%E6%A3%92

import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
import os

MAX_IMAGES = 25

def main():
    # get title
    page_url = 'https://running.biji.co/index.php?q=album&act=photo_list&album_id=52183&cid=11282&start=1713672000&end=1713672600&type=place&subtitle=Running%20Holidays%EF%BC%8D2024%E6%96%B0%E5%8C%97%E5%B8%82%E9%90%B5%E9%81%93%E9%A6%AC%E6%8B%89%E6%9D%BE%E6%8E%A5%E5%8A%9B%E8%B3%BD-%E8%BF%BD%E7%81%AB%E8%BB%8A%E7%AC%AC7%E6%A3%92'
    try:
        page_resp = requests.get(page_url)
    except:
        page_resp = None

    if page_resp and page_resp.status_code == 200:
        soup = BeautifulSoup(page_resp.text, 'html.parser')
        title = soup.select('.album-title.flex-1')[0].text.strip()
        print(title)
        # create dir
        create_dir(title)

        # ajax get html
        start_row = 0
        total_images = 0
        while True:
            ajax_url = 'https://running.biji.co/index.php?pop=ajax&func=album&fename=load_more_photos_in_listing_computer'
            payload = {
                        'type': 'place',
                        'rows': str(start_row),
                        'need_rows': '20',
                        'cid': '11282',
                        'album_id': '52183'
                    }
            try:
                ajax_resp = requests.post(ajax_url, data=payload)
            except:
                ajax_resp = None
                # if not ajax error the end.
                print('if not ajax error the end.')
                break

            if ajax_resp and ajax_resp.status_code == 200:
                soup = BeautifulSoup(ajax_resp.text, 'html.parser')
                images = soup.select('.photo-img')
                # show group load
                print(payload)
                # if no image then end.
                if len(images) == 0:
                    print('if no image then end.')
                    break
                for index, image in enumerate(images):
                    # print(image.get('src'))
                    download_image(image.get('src'), title, title+str(start_row+index+1))
                total_images += len(images)

            start_row += 20
            # check maximum load images
            if start_row >= MAX_IMAGES :
                print(f'over {MAX_IMAGES} images break.')
                break
        # show total load images
        print(f"total load {total_images} images.")


def create_dir(dir_name):
    if not os.path.exists(dir_name) :
        os.makedirs(dir_name)

def detect_image_type(content):
    try:
        # Open the image from the content
        with Image.open(BytesIO(content)) as img:
        # open the image from file
        # with Image.open(file_path) as img:
            # Get the format of the image
            image_format = img.format.lower()

            # jpeg same as jpg
            if image_format == 'jpeg':
                return 'jpg'  # Return 'jpg' if the format is 'jpeg'
            else:
                return image_format
            return img.format.lower()
    except Exception as e:
        print("Error:", e)
        return None

def download_image(url, dir_name, filename):
    # get image
    try :
        resp = requests.get(url)
        if resp.status_code == 200:
            # check image type
            image_type = detect_image_type(resp.content)

            # save image
            image_name = f"{filename}.{image_type}"
            with open(os.path.join(dir_name, image_name), 'wb') as file:
                file.write(resp.content)
            print(f"download image {image_name}.")
    except:
        print(f"error download image {image_name}...")

if __name__ == '__main__':
    main()
```

#### 非同步運動相簿下載
``` py
# 非同步運動相簿下載
from concurrent.futures import ThreadPoolExecutor
import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
import os
import time

# ROW_IMAGES = 50
ROW_IMAGES = 3
title = ''
n = 0

def main():
    global title
    global n

    start_time = time.time()

    # get title
    page_url = 'https://running.biji.co/index.php?q=album&act=photo_list&album_id=52183&cid=11282&start=1713672000&end=1713672600&type=place&subtitle=Running%20Holidays%EF%BC%8D2024%E6%96%B0%E5%8C%97%E5%B8%82%E9%90%B5%E9%81%93%E9%A6%AC%E6%8B%89%E6%9D%BE%E6%8E%A5%E5%8A%9B%E8%B3%BD-%E8%BF%BD%E7%81%AB%E8%BB%8A%E7%AC%AC7%E6%A3%92'
    try:
        page_resp = requests.get(page_url)
    except:
        page_resp = None

    if page_resp and page_resp.status_code == 200:
        soup = BeautifulSoup(page_resp.text, 'html.parser')
        title = soup.select('.album-title.flex-1')[0].text.strip()
        print(f"title={title}")
        # create dir
        create_dir(title)

        # get images
        get_images(ROW_IMAGES)
    else:
        print("url not correct.")

    end_time = time.time()
    print(f"loading {n} images")
    print(f"spend time : {end_time-start_time}")

def get_images(row_images):
    rows = list(range(0, row_images))
    with ThreadPoolExecutor(max_workers=100) as executor:
        executor.map(get_row_image,rows)

def get_row_image(row):
    global title

    ajax_url = 'https://running.biji.co/index.php?pop=ajax&func=album&fename=load_more_photos_in_listing_computer'
    payload = {
            'type': 'place',
            'rows': str(row*20),
            'need_rows': '20',
            'cid': '11282',
            'album_id': '52183'
        }

    try:
        ajax_resp = requests.post(ajax_url, data=payload)
    except:
        ajax_resp = None

    if ajax_resp and ajax_resp.status_code == 200:
        soup = BeautifulSoup(ajax_resp.text, 'html.parser')
        images = soup.select('.photo-img')
        # show group load
        # print(payload)
        print(f"row = {row+1}")
        for index, image in enumerate(images):
            # print(image.get('src'))
            download_image(image.get('src'), title, title+str(row*20+index+1))
    else:
        print('row {row+1} get error.')


def create_dir(dir_name):
    if not os.path.exists(dir_name) :
        os.makedirs(dir_name)

def detect_image_type(content):
    try:
        # Open the image from the content
        with Image.open(BytesIO(content)) as img:
        # open the image from file
        # with Image.open(file_path) as img:
            # Get the format of the image
            image_format = img.format.lower()

            # jpeg same as jpg
            if image_format == 'jpeg':
                return 'jpg'  # Return 'jpg' if the format is 'jpeg'
            else:
                return image_format
            return img.format.lower()
    except Exception as e:
        print("Error:", e)
        return None

def download_image(url, dir_name, filename):
    global n

    # get image
    try :
        resp = requests.get(url)
        if resp.status_code == 200:
            # check image type
            image_type = detect_image_type(resp.content)
            # save image
            image_name = f"{filename}.{image_type}"
            with open(os.path.join(dir_name, image_name), 'wb') as file:
                file.write(resp.content)
            n += 1
            # print(f"download image {image_name}.")
    except:
        pass
        # print(f"error download image {image_name}...")

if __name__ == '__main__':
    main()


# title=Running Holidays－2024新北市鐵道馬拉松接力賽 - 追火車第7棒
# ...
# row = 11
# row = 8
# loading 60 images
# spend time : 3.558716297149658
#
# loading 1000 images
# spend time : 12.472309350967407
```

### 台灣股市分析統計圖
[台灣證劵交易所](https://www.twse.com.tw/zh/)

### Ref
+ [Source and Video](https://www.gotop.com.tw/books/download.aspx?bookid=ACL067200)
+ [Blog](http://www.e-happy.com.tw/)
+ {% post_link dl-1 '# Google Colab' %}:python 雲端開發平台
+ {% post_link python-20 '# Jupyter Notebook' %}: