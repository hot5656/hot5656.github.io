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

#### 年交易資訊
``` py
# 年交易資訊
# https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20240430&stockNo=2317&response=json&_=1714460309678

import pandas as pd
import requests

# 中華民國日期 to 西元
def dateConvert(date_str):
    date_list = date_str.split('/')
    date_list[0] = str(int(date_list[0])+1911)
    return '-'.join(date_list)

# Create an empty list to store DataFrames
all_dataframes = []

# json to DataFrame(include all 2024 data)
day_url_head = "https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=2024"
day_url_tail = "01&stockNo=2317&response=json&_=1714460309678"

for index in range(0, 12):
    response = requests.get(day_url_head + '{:02d}'.format(index+1) + day_url_tail)
    month_records = response.json()

    if month_records['total'] == 0 :
        break

    df = pd.DataFrame(month_records['data'],
                    columns=month_records['fields'])
    # for i in range(len(df['日期'])):
    #     df.loc[i, '日期'] = dateConvert(df['日期'][i])
    # print(df)

    # Convert the '日期' column
    df['日期'] = df['日期'].apply(dateConvert)

    # Append the DataFrame to the list
    all_dataframes.append(df)

# Concatenate all DataFrames into one
# ignore_index=True 索引重設
final_dataframe = pd.concat(all_dataframes, ignore_index=True)

# Print the final DataFrame
print(final_dataframe)

# save to csv file
file_name = 'stock_2317_2024.csv'
final_dataframe.to_csv(file_name, encoding='utf-8', index=False)
```

#### 月交易折線圖 - 收盤價, 最低價, 最高價
``` py
# 月交易折線圖 - 收盤價, 最低價, 最高價
import pandas as pd
import requests

import matplotlib.pyplot as plt
# 加入中文字體
import matplotlib
from matplotlib.font_manager import fontManager
import os

# 中華民國日期 to 西元
def dateConvert(date_str):
    date_list = date_str.split('/')
    date_list[0] = str(int(date_list[0])+1911)
    return '-'.join(date_list)

def load_file(file_name) :
    day_url = 'https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20240430&stockNo=2317&response=json&_=1714460309678'
    response = requests.get(day_url)
    month_records = response.json()

    df = pd.DataFrame(month_records['data'],
                    columns=month_records['fields'])
    #  save to csv file
    df.to_csv(file_name, encoding='utf-8', index=False)

# 加入中文字體
fontManager.addfont('NotoSansTC-Regular.ttf')
matplotlib.rc('font', family='Noto Sans TC')

file_name = 'stock_2317_2024_04.csv'
if not os.path.isfile(file_name):
    load_file(file_name)

pd_stock = pd.read_csv(file_name, encoding='utf-8')
pd_stock.plot(kind='line', figsize=(12,6), x='日期',
              y=['收盤價', '最低價', '最高價'])

plt.show()
```

#### 年交易折線圖 - 收盤價, 最低價, 最高價
``` py
# 年交易折線圖 - 收盤價, 最低價, 最高價
# https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20240430&stockNo=2317&response=json&_=1714460309678

import pandas as pd
import requests

import matplotlib.pyplot as plt
# 加入中文字體
import matplotlib
from matplotlib.font_manager import fontManager
import os
import time

# 中華民國日期 to 西元
def dateConvert(date_str):
    date_list = date_str.split('/')
    date_list[0] = str(int(date_list[0])+1911)
    return '-'.join(date_list)

def load_file(file_name) :
    # Create an empty list to store DataFrames
    all_dataframes = []

    # json to DataFrame(include all 2024 data)
    day_url_head = "https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=2023"
    day_url_tail = "01&stockNo=2317&response=json&_=1714460309678"

    for index in range(0, 12):
        response = requests.get(day_url_head + '{:02d}'.format(index+1) + day_url_tail)
        month_records = response.json()

        if month_records['total'] == 0 :
            break

        df = pd.DataFrame(month_records['data'],
                        columns=month_records['fields'])

        # Convert the '日期' column
        df['日期'] = df['日期'].apply(dateConvert)

        # Append the DataFrame to the list
        all_dataframes.append(df)

        print(f"2023-{str(index+1)}")
        time.sleep(2)

    # Concatenate all DataFrames into one
    # ignore_index=True 索引重設
    final_dataframe = pd.concat(all_dataframes, ignore_index=True)

    # Print the final DataFrame
    print(final_dataframe)

    # save to csv file
    final_dataframe.to_csv(file_name, encoding='utf-8', index=False)


# 加入中文字體
fontManager.addfont('NotoSansTC-Regular.ttf')
matplotlib.rc('font', family='Noto Sans TC')

file_name = 'stock_2317_2023.csv'
if not os.path.isfile(file_name):
    load_file(file_name)

pd_stock = pd.read_csv(file_name, encoding='utf-8')
pd_stock.plot(kind='line', figsize=(12,6), x='日期',
              y=['收盤價', '最低價', '最高價'])

plt.show()
```

#### {% post_link python-26 '# 年交易折線圖 plotly - 收盤價, 最低價, 最高價' %}

### 股市即時報價
#### 即時股價讀取
``` py
# 即時股價讀取
# pip install twstock
import twstock

stock = twstock.Stock('2317')
print(f"最近31筆收盤價: \n{stock.price}\n")
print(f"最近31筆盤中最高價: \n{stock.high}\n")
print(f"最近31筆盤中最低價: \n{stock.low}\n")
print(f"最近31筆日期資料: \n{stock.date}\n")
print(f"最近6日期資料: \n{stock.date[-6:]}\n")
real = twstock.realtime.get('2317')
if (real['success']):
    print(f"即時股票資料: \n{real}\n")
else:
    print('errer access.')

stock_march = stock.fetch(2024, 3)
print(f"2024年3月資料: {len(stock_march)} \nfirst={stock_march[0]}\n last={stock_march[-1]}\n")
stock_from_march = stock.fetch_from(2024, 3)
print(f"2024年3月至今: {len(stock_from_march)}\nfirst={stock_from_march[0]}\n last={stock_from_march[-1]}\n")
print(f"1st date:{stock_from_march[0].date}")
print(f"1st open:{stock_from_march[0].open}")

# 最近31筆收盤價:
# [132.0, 136.0, 136.0, 138.0, 142.5, 145.5, 145.5, 142.0, 148.5, 155.5, 150.0, 150.5, 159.0, 159.0, 158.0, 158.0, 154.5, 150.0, 150.5, 146.0, 141.0, 146.5, 148.0, 143.0, 143.0, 144.0, 156.0, 151.5, 155.0, 158.5, 156.0]

# 最近31筆盤中最高價:
# [133.0, 137.0, 136.0, 142.0, 145.0, 148.5, 147.5, 147.0, 150.0, 157.0, 157.5, 154.5, 159.5, 159.0, 160.0, 161.5, 160.0, 153.5, 153.5, 150.0, 143.0, 147.5, 148.5, 147.5, 145.5, 146.5, 157.0, 154.5, 158.0, 161.0, 161.0]

# 最近31筆盤中最低價:
# [127.0, 131.5, 130.0, 135.5, 139.0, 142.0, 143.0, 139.0, 143.0, 150.0, 150.0, 150.0, 151.0, 155.0, 156.5, 155.5, 154.0, 147.0, 148.5, 144.5, 137.5, 141.0, 144.5, 140.0, 141.5, 143.5, 146.5, 151.0, 154.0, 156.0, 156.0]

# 最近31筆日期資料:
# [datetime.datetime(2024, 3, 15, 0, 0), datetime.datetime(2024, 3, 18, 0, 0), datetime.datetime(2024, 3, 19, 0, 0), datetime.datetime(2024, 3, 20, 0, 0), datetime.datetime(2024, 3, 21, 0, 0), datetime.datetime(2024, 3, 22, 0, 0), datetime.datetime(2024, 3, 25, 0, 0), datetime.datetime(2024, 3, 26, 0, 0), datetime.datetime(2024, 3, 27, 0, 0), datetime.datetime(2024, 3, 28, 0, 0), datetime.datetime(2024, 3, 29, 0, 0), datetime.datetime(2024, 4, 1, 0, 0), datetime.datetime(2024, 4, 2, 0, 0), datetime.datetime(2024, 4, 3, 0, 0), datetime.datetime(2024, 4, 8, 0, 0), datetime.datetime(2024, 4, 9, 0, 0), datetime.datetime(2024, 4, 10, 0, 0), datetime.datetime(2024, 4, 11, 0, 0), datetime.datetime(2024, 4, 12, 0, 0), datetime.datetime(2024, 4, 15, 0, 0), datetime.datetime(2024, 4, 16, 0, 0), datetime.datetime(2024, 4, 17, 0, 0), datetime.datetime(2024, 4, 18, 0, 0), datetime.datetime(2024, 4, 19, 0, 0), datetime.datetime(2024, 4, 22, 0, 0), datetime.datetime(2024, 4, 23, 0, 0), datetime.datetime(2024, 4, 24, 0, 0), datetime.datetime(2024, 4, 25, 0, 0), datetime.datetime(2024, 4, 26, 0, 0), datetime.datetime(2024, 4, 29, 0, 0), datetime.datetime(2024, 4, 30, 0, 0)]

# 最近6日期資料:
# [datetime.datetime(2024, 4, 23, 0, 0), datetime.datetime(2024, 4, 24, 0, 0), datetime.datetime(2024, 4, 25, 0, 0), datetime.datetime(2024, 4, 26, 0, 0), datetime.datetime(2024, 4, 29, 0, 0), datetime.datetime(2024, 4, 30, 0, 0)]

# 即時股票資料:
# {'timestamp': 1714458600.0, 'info': {'code': '2317', 'channel': '2317.tw', 'name': '鴻海', 'fullname': '鴻海精密工業股份有限公司', 'time': '2024-04-30 14:30:00'}, 'realtime': {'latest_trade_price': '156.0000', 'trade_volume': '12296', 'accumulate_trade_volume': '71882', 'best_bid_price': ['156.0000', '155.5000', '155.0000', '154.5000', '154.0000'], 'best_bid_volume': ['431', '2825', '2767', '538', '734'], 'best_ask_price': ['156.5000', '157.0000', '157.5000', '158.0000', '158.5000'], 'best_ask_volume': ['571',
# '776', '1911', '1753', '1873'], 'open': '159.5000', 'high': '161.0000', 'low': '156.0000'}, 'success': True}

# 2024年3月資料: 21
# first=Data(date=datetime.datetime(2024, 3, 1, 0, 0), capacity=28288633, turnover=2907270754, open=103.0, high=103.5, low=102.0, close=102.0, change=-1.0, transaction=11037)
#  last=Data(date=datetime.datetime(2024, 3, 29, 0, 0), capacity=154117085, turnover=23632502947, open=157.0, high=157.5, low=150.0, close=150.0, change=-5.5, transaction=97343)

# 2024年3月至今: 41
# first=Data(date=datetime.datetime(2024, 3, 1, 0, 0), capacity=28288633, turnover=2907270754, open=103.0, high=103.5, low=102.0, close=102.0, change=-1.0, transaction=11037)
#  last=Data(date=datetime.datetime(2024, 4, 30, 0, 0), capacity=73433543, turnover=11579053739, open=159.5, high=161.0, low=156.0, close=156.0, change=-2.5, transaction=39006)

# 1st date:2024-03-01 00:00:00
# 1st open:103.0
```

#### LINE Notify 通知
##### LINE Notify 權狀申請
[Line Notify](https://notify-bot.line.me/zh_TW/)

<div style="max-width:500px">
  {% asset_img pic5.png pic5 %}
</div>

<div style="max-width:500px">
  {% asset_img pic6.png pic6 %}
</div>

<div style="max-width:500px">
  {% asset_img pic7.png pic7 %}
</div>

<div style="max-width:500px">
  {% asset_img pic8.png pic8 %}
</div>

<div style="max-width:500px">
  {% asset_img pic9.png pic9 %}
</div>

##### code
``` py
# Line Notify 通知
# [Line Notify](https://notify-bot.line.me/zh_TW/)
# window set/show evn by cmd
# set LINE_NOTIFY_TOKEN=string
# echo %LINE_NOTIFY_TOKEN%
# window set/show evn by powershell
# $env:LINE_NOTIFY_TOKEN = "...."
# $env:LINE_NOTIFY_TOKEN


import requests
import os

notify_url = "https://notify-api.line.me/api/notify"
msg = "get token by windows env..2"
token = os.getenv("LINE_NOTIFY_TOKEN")

headers = {
    "Authorization": "Bearer " + token,
    "Connect-Type" : "application/x-www-form-urlencoded"
}
payload = {"message": msg}

notify = requests.post(notify_url,
                headers = headers,
                params = payload)
if notify.status_code == 200:
    print("Send LINE Notify success!")
else:
    print("Send LINE Notify fail!")

```

#### 股票即時通知
``` py
# 股票即時通知
import twstock
import requests
import os
import time
from datetime import datetime

def main():
    STOCK_NO = '2317'
    UP_PRICE = 150
    DOWN_PRICE = 130
    notify_url = "https://notify-api.line.me/api/notify"
    token = os.getenv("LINE_NOTIFY_TOKEN")
    headers = {
        "Authorization": "Bearer " + token,
        "Connect-Type" : "application/x-www-form-urlencoded"
    }

    while True :
        price = get_real_stock(STOCK_NO)
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"time : {current_time}")
        if price >= UP_PRICE:
            send_line(1, price, STOCK_NO, notify_url, headers, current_time)
        elif price <= DOWN_PRICE and price != 0:
            send_line(2, price, STOCK_NO, notify_url, headers, current_time)
        time.sleep(300)

# mode = 1 可買
# mode = 2 可買
def send_line(mode, price, stock_no, notify_url, headers, current_time):
    if mode == 1:
        msg = f"{current_time} {stock_no} {price} 元可以賣出"
    elif mode == 2:
        msg = f"{current_time} {stock_no} {price} 元可以買入"

    payload = {"message": msg}
    notify = requests.post(notify_url,
                    headers = headers,
                    params = payload)
    # if notify.status_code == 200:
    #     print("Send LINE Notify success!")


def get_real_stock(stock_no):
    real = twstock.realtime.get(stock_no)
    current_price = 0
    if (real['success']):
        current_price = float(real['realtime']['latest_trade_price'])
        # print(f"即時股票資料: \n{float(real['realtime']['latest_trade_price'])}\n")
    else:
        print('errer access.')
    return current_price

if __name__ == '__main__':
    main()
```

### 網路書店排行榜
#### 取得新書分類排行資料
``` py
# 取得新書排行榜資料
# [博客來](https://www.books.com.tw/)
# [博客來 新書](https://www.books.com.tw/web/books_newbook/)
# [博客來 新書#2商業理財 暢銷度排序](https://www.books.com.tw/web/books_nbtopm_02/?o=5&v=1)
# [博客來 新書#2商業理財 暢銷度排序 page2](https://www.books.com.tw/web/books_nbtopm_02/?o=5&v=1&page=2)
# [博客來 新書#19電腦資訊 暢銷度排序](https://www.books.com.tw/web/books_nbtopm_02/?o=5&v=1)
# 中文書分類 ".mod_b li a"
# 新書數量 ".mod.type02_m019 .mod_a em"
# 本頁新書 ".wrap .item .msg h4 a"
# 下一頁 ".cnt_page .nxt"
# 頁數 ".cnt_page .page span" 1st

import requests
from bs4 import BeautifulSoup
import time

NEW_BOOK_URL = "https://www.books.com.tw/web/books_newbook/"
def main():
    book_list = book_types(NEW_BOOK_URL)
    for index,item in enumerate(book_list):
        print(f"({index+1}) {item['title']}")
        # get_books(index+1, item['url'], item['title'])
        # time.sleep(1)
    # get select book type
    kind_no = int(input("輸入圖書分類:"))
    if kind_no >= 1 and kind_no <= len(book_list):
        get_books(kind_no, book_list[kind_no-1]['url'], book_list[kind_no-1]['title'])

def get_books(index, url, title):
    print(f"-- {index} {title} {url} --")
    book_url = f"{url}?o=5&v=1"
    try:
        resp = requests.get(book_url)
    except:
        resp = None

    pages = 0
    start_index = 1
    if resp and resp.status_code == 200:
        soup = BeautifulSoup(resp.text, "html.parser")
        try:
            pages = int(soup.select_one(".cnt_page .page span").text)
        except:
            pages = 1
        books_no = show_books(start_index, soup)
        start_index += books_no

    if (pages > 1):
        for i in range(2, pages + 1):
            # print(f"i={i}..")
            book_url = f"{url}?o=5&v=1&page={str(i)}"
            try:
                resp = requests.get(book_url)
            except:
                resp = None
            if resp and resp.status_code == 200:
                soup = BeautifulSoup(resp.text, "html.parser")
                books_no = show_books(start_index, soup)
                start_index += books_no

def show_books(start_index, soup):
    books = soup.select(".wrap .item")
    for index,book in enumerate(books):
        title = book.select_one(".msg h4 a").text
        img_url = book.select_one(".cover")['src']
        info = book.select_one(".info").text.split('，')
        author = info[0]
        publisher = info[1]
        publish_date = info[2].split("：")[1]
        price_box = book.select(".price strong")
        if len(price_box) == 1:
            special_discount = '100'
            special_price = price_box[0].text
        else:
            special_discount = price_box[0].text
            special_price = price_box[1].text

        content = book.select_one(".txt_cont").text.strip().replace("\n", "").replace(" ", "")

        print(f"    ({index+start_index}) {title}")
        print(f"         圖片網址:{img_url}")
        print(f"         作者:{author}")
        print(f"         出版社:{publisher}")
        print(f"         出版日期:{publish_date}")
        if (special_discount != 100):
            print(f"         折扣:{special_discount}折")

        print(f"         優惠價:{special_price}元")
        print(f"         內容:{content}")
    return len(books)

def book_types(book_url):
    book_list = []
    try :
        resp = requests.get(book_url)
    except:
        resp = None

    if resp and resp.status_code == 200:
        soup = BeautifulSoup(resp.text, "html.parser")

        types = soup.select(".mod_b li a")
        for type in types:
            book_list.append(
                    {
                        'title': type.text,
                        # 'url': type['href']
                        'url': type['href'].split("?")[0]
                    }
                )
        return book_list

if __name__ == '__main__':
    main()
```

#### 新書分類排行資料存至 google 試算表
``` py
# 新書排行榜資料 存至 google sheet
# [Google Sheets 指南](https://developers.google.com/sheets/api/guides/filters?hl=zh-tw)
import gspread
from google.oauth2.service_account import Credentials

import requests
from bs4 import BeautifulSoup
import time

NEW_BOOK_URL = "https://www.books.com.tw/web/books_newbook/"
book_list_get = []
def main():
    # save_to_google_sheet()
    # return

    book_list = book_types(NEW_BOOK_URL)
    for index,item in enumerate(book_list):
        print(f"({index+1}) {item['title']}")
        # get_books(index+1, item['url'], item['title'])
        # time.sleep(1)
    # get select book type
    kind_no = int(input("輸入圖書分類:"))
    if kind_no >= 1 and kind_no <= len(book_list):
        get_books(kind_no, book_list[kind_no-1]['url'], book_list[kind_no-1]['title'])
        # save to google sheet
        save_to_google_sheet()
        # for book in book_list_get:
        #     print(book)
    else:
        print("分類錯誤!")

def get_books(index, url, title):
    print(f"-- {index} {title} {url} --")
    book_url = f"{url}?o=5&v=1"
    try:
        resp = requests.get(book_url)
    except:
        resp = None

    pages = 0
    start_index = 1
    if resp and resp.status_code == 200:
        soup = BeautifulSoup(resp.text, "html.parser")
        try:
            pages = int(soup.select_one(".cnt_page .page span").text)
        except:
            pages = 1
        books_no = show_books(title, start_index, soup)
        start_index += books_no

    if (pages > 1):
        for i in range(2, pages + 1):
            # print(f"i={i}..")
            book_url = f"{url}?o=5&v=1&page={str(i)}"
            try:
                resp = requests.get(book_url)
            except:
                resp = None
            if resp and resp.status_code == 200:
                soup = BeautifulSoup(resp.text, "html.parser")
                books_no = show_books(title, start_index, soup)
                start_index += books_no

def show_books(type_title, start_index, soup):
    global book_list_get

    books = soup.select(".wrap .item")
    for index,book in enumerate(books):
        title = book.select_one(".msg h4 a").text
        img_url = book.select_one(".cover")['src']
        info = book.select_one(".info").text.split('，')
        author = info[0]
        publisher = info[1]
        publish_date = info[2].split("：")[1]
        price_box = book.select(".price strong")
        if len(price_box) == 1:
            special_discount = '100'
            special_price = price_box[0].text
        else:
            special_discount = price_box[0].text
            special_price = price_box[1].text

        content = book.select_one(".txt_cont").text.strip().replace("\n", "").replace(" ", "")

        # print(f"    ({index+start_index}) {title}")
        # print(f"         圖片網址:{img_url}")
        # print(f"         作者:{author}")
        # print(f"         出版社:{publisher}")
        # print(f"         出版日期:{publish_date}")
        # if (special_discount != '100'):
        #     print(f"         折扣:{special_discount}折")
        # print(f"         優惠價:{special_price}元")
        # print(f"         內容:{content}")
        list_data = [type_title, title, img_url, author, publisher, publish_date, special_discount, special_price, content]
        book_list_get.append(list_data)
    return len(books)

def book_types(book_url):
    book_list = []
    try :
        resp = requests.get(book_url)
    except:
        resp = None

    if resp and resp.status_code == 200:
        soup = BeautifulSoup(resp.text, "html.parser")

        types = soup.select(".mod_b li a")
        for type in types:
            book_list.append(
                    {
                        'title': type.text,
                        'url': type['href'].split("?")[0]
                    }
                )
        return book_list

def save_to_google_sheet():
    global book_list_get

    # control scope
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets"
    ]

    # credentials & id
    creds = Credentials.from_service_account_file("tutorial-sheets-421106-4878ffb056ac.json", scopes=scopes)
    client = gspread.authorize(creds)
    sheet_id = '1m6s3HXmc6vtVuvbgF5MytNIGB1BgdnovDWdqT7pJZJs'

    workbook = client.open_by_key(sheet_id)
    # # get worksheets by list
    # sheets = map(lambda a: a.title, workbook.worksheets())
    # print(list(sheets))

    # # get worksheets
    # sheets = workbook.worksheets()
    # print(sheets)
    # # update 1 field
    # sheets[0].update_acell('A1', "Hello")

    # 清出工作表
    # get active sheet
    print("save books to google sheet..")
    sheet = workbook.get_worksheet(0)
    sheet.clear()
    list_title = ["分類", "書名", "圖片網址", "作者", "出版社", "出版日期", "折扣", "優惠價", "內容"]
    sheet.append_row(list_title)
    for item in book_list_get:
        sheet.append_row(item)
        time.sleep(1.2) # delay 太短會中斷

if __name__ == '__main__':
    main()
```

### 人力銀行分析
#### 1111 擷取職缺資料 存至 excel
``` py
# 1111 擷取職缺資料 存至 excel
import requests
from bs4 import BeautifulSoup
import  openpyxl
import os
from datetime import datetime

job_no = 0
def main():
    global job_no

    page_index = 0
    index = 1
    # job = '前端工程師'
    job = '硬體研發主管'
    file_job = "job1.xlsx"
    current_date = datetime.now()
    date_string = current_date.strftime("%Y-%m-%d")

    job_url = f'https://www.1111.com.tw/search/job?col=wc&ks={job}&tt=1&page='

    list_titles =["職務名稱",
            "工作網址",
            "公司名稱",
            "公司類別",
            "工作地點",
            "薪資",
            "應徵人數",
            "其他事項"]
    # 新增 excell
    # 活頁簿
    workbook = openpyxl.Workbook()
    workbook_temp = openpyxl.Workbook()
    # 工作表 #1
    sheet = workbook.worksheets[0]
    sheet.title = f"1111 {date_string} {job}"
    sheet_temp = workbook_temp.worksheets[0]
    # 新增一列
    sheet.append(list_titles)

    rows_total = 0
    while True:
        page_index += 1
        jobs = get_jobs(job_url+str(page_index), index)
        if page_index == 1:
            print(f"-- job_no = {job_no} --")
        rows = len(jobs)
        rows_total += rows
        # if no more data break
        if rows == 0:
            break
        for job in jobs:
            show_job(f"({index}-{page_index},{rows})", job, sheet, sheet_temp)
            index += 1
        print(f"page {page_index} = {rows}")
    print(f"rows_total = {rows_total}")

    # save - overwrite is ok
    workbook.save(file_job)

def show_job(head, job, sheet, sheet_temp):
    work = job.select_one(".title a")
    title = work.text
    work_url =  "https://www.1111.com.tw" + work['href']
    comapny = job.select_one(".company a").text.split('|')
    comapny_name = comapny[0]
    comapny_category = comapny[1].strip()
    work_location = job.select_one(".other a")['data-after']
    salary = job.select_one(".other span")['data-after']
    apply_people =  job.select_one(".people p").text.replace("應徵人數｜", "").replace(" 人", "")
    other = job.select_one(".introduce").text

    # check error
    try:
        sheet_temp.append([other])
    except:
        other="--wait--"

    datas = [
        title,
        work_url,
        comapny_name,
        comapny_category,
        work_location,
        salary,
        apply_people,
        other
    ]
    try :
        sheet.append(datas)
    except :
        print("=============")
        print(datas)

    # # 職務名稱
    # print(f"{head} {title}")
    # print(f"    工作網址: {work_url}")
    # print(f"    公司名稱: {comapny_name}")
    # print(f"    公司類別: {comapny_category}")
    # print(f"    工作地點: {work_location}")
    # print(f"    薪資:     {salary}")
    # print(f"    應徵人數: {apply_people}")
    # # print(f"    其他事項: {other}")

def get_jobs(url, index):
    global job_no

    try:
        resp = requests.get(url)
    except:
        resp = None

    if resp and resp.status_code == 200:
        soup = BeautifulSoup(resp.text, "html.parser")

        # count job number
        if job_no == 0:
            try:
                job_no = int(soup.select_one(".top .left span").text)
            except:
                job_no = 0

        try:
            jobs = soup.select(".item__job")
        except:
             jobs = []

        return jobs

if __name__ == '__main__':
    main()
```

#### 區域職缺統計圖 - 圓形圖
``` py
# 區域職缺統計圖 - 圓形圖
import pandas as pd
import matplotlib.pyplot as plt
# 加入中文字體
import matplotlib
from matplotlib.font_manager import fontManager
# 加入中文字體
fontManager.addfont('NotoSansTC-Regular.ttf')
matplotlib.rc('font', family='Noto Sans TC')

sources = ["1111", "104", "CakeResume"]
for index,item in enumerate(sources):
    print(f"({index+1}) {item}")
kind_no = int(input("分析來源:"))
if kind_no ==  1:
    jsb_file = "./job1.xlsx"
elif kind_no == 2:
    jsb_file = "./job11.xlsx"
elif kind_no == 3:
    jsb_file = "./job21.xlsx"
else:
    print("input out of range...")
    exit(1)

xsl = pd.ExcelFile(jsb_file)
df = pd.read_excel(jsb_file)
cities = ["台北", "新北", "桃園", "台中", "高雄", "台南", "其他"]
city_count = []

city_total = 0
for i in range(len(cities)-1):
    mask = df['工作地點'].str.contains(cities[i]) & ~(df['工作地點'] == cities[i])
    count = mask.sum()
    city_total += count
    city_count.append(count)

city_count.append(len(df) - city_total)

plt.title(xsl.sheet_names[0] + ' 職缺', fontsize=20)
# label 加入數量
labels = [f"{city} ({count})" for city, count in zip(cities, city_count)]
plt.pie(
    city_count,
    labels = labels,
    autopct = "%2.1f%%",
    shadow = True,
    startangle = 90
)
# bbox_to_anchor 1.1:距中心位置 0.5:高度位置
plt.legend(loc='best', bbox_to_anchor=(1.1, 0.5))

plt.show()
```

<div style="width:500px">
	{% asset_img pic10.png pic10 %}
</div>

#### 區域薪資統計圖 - 長條圖
``` py
# 區域薪資統計圖 - 長條圖
import pandas as pd
import re
import matplotlib.pyplot as plt
# 加入中文字體
import matplotlib
from matplotlib.font_manager import fontManager

def main():
    # 加入中文字體
    fontManager.addfont('NotoSansTC-Regular.ttf')
    matplotlib.rc('font', family='Noto Sans TC')

    sources = ["1111", "104", "CakeResume"]
    for index,item in enumerate(sources):
        print(f"({index+1}) {item}")
    kind_no = int(input("分析來源:"))
    if kind_no ==  1:
        jsb_file = "./job1.xlsx"
    elif kind_no == 2:
        jsb_file = "./job11.xlsx"
    elif kind_no == 3:
        jsb_file = "./job21.xlsx"
    else:
        print("input out of range...")
        exit(1)

    xsl = pd.ExcelFile(jsb_file)
    df = pd.read_excel(jsb_file)
    cities = ["台北", "新北", "桃園", "台中", "高雄", "台南", "其他"]
    salary_list = []

    # get 六都資料
    for i in range(len(cities)-1):
        df1 = df[df['工作地點'].str.contains(cities[i])]
        df1 = df1.reset_index(drop=True)
        for j in range(len(df1)):
            df1.iloc[j, 5] = get_salary(df1.iloc[j, 5])
            # print(f"    {cities[i]}-{j} {df1.iloc[j, 5]}")
         # 無內容無法算平均值
        if len(df1['薪資']) == 0:
            mean = 0
        else:
            mean = round(df1['薪資'].mean())
        salary_list.append(mean)

    # get 其他資料
    cities_to_exclude = ["台北", "新北", "桃園", "台中", "高雄", "台南"]
    df2 = df[~df['工作地點'].str.contains('|'.join(cities_to_exclude))]
    df2 = df2.reset_index(drop=True)
    for j in range(len(df2)):
        df2.iloc[j, 5] = get_salary(df2.iloc[j, 5])
        # print(f"    其他-{j} {df2.iloc[j, 5]}")
    # 無內容無法算平均值
    if len(df2['薪資']) == 0:
        mean = 0
    else:
        mean = round(df2['薪資'].mean())
    salary_list.append(mean)

    # 長條圖 設 width
    plt.bar(cities, salary_list, width=0.5)
    # 圖表,X,Y 標題
    # plt.title('Chart Title', fontsize=20)
    plt.title(xsl.sheet_names[0] ,fontsize=20)
    plt.xlabel('地區', fontsize=14)
    plt.ylabel('薪資', fontsize=14)

    # show 數值
    for i in range(len(cities)):
        plt.text(i, salary_list[i], str(salary_list[i]), ha='center', va='bottom')

    plt.show()

def get_salary(salary):
    salary = salary.replace(",", "")
    salaries = re.findall(f"\d+\.?\d*", salary)
    # range 平均
    if len(salaries) == 0:
        if "待遇面議" in salary:
            money = 40000
        else :
            money = float(salaries[0])
    elif len(salaries) == 1:
        money = float(salaries[0])
    else:
        money = (float(salaries[0]) + float(salaries[1])) / 2

    # 萬 * 10000
    if "萬" in salary:
        money *= 10000
    # 年薪 / 12
    if "年" in salary:
        money = money / 12

    return round(money)

if __name__ == '__main__':
    main()
```

<div style="width:500px">
	{% asset_img pic11.png pic11 %}
</div>

#### 104 擷取職缺資料 存至 excel
``` py
# 104 擷取職缺資料 存至 excel
import requests
from bs4 import BeautifulSoup
import  openpyxl
import os
from datetime import datetime

def main():
    page_index = 0
    index = 1
    # job_request = '前端工程師'
    job_request = '硬體研發主管'
    file_job = "job11.xlsx"
    current_date = datetime.now()
    date_string = current_date.strftime("%Y-%m-%d")

    list_titles =["職務名稱",
            "工作網址",
            "公司名稱",
            "公司類別",
            "工作地點",
            "薪資",
            "應徵人數",
            "其他事項"]
    # 新增 excell
    # 活頁簿
    workbook = openpyxl.Workbook()
    workbook_temp = openpyxl.Workbook()
    # 工作表 #1
    sheet = workbook.worksheets[0]
    sheet.title = f"104 {date_string} {job_request}"
    sheet_temp = workbook_temp.worksheets[0]
    # 新增一列
    sheet.append(list_titles)

    rows_total = 0
    while True:
        page_index += 1
        job_url = f'https://www.104.com.tw/jobs/search/?ro=1&keyword={job_request}&expansionType=area,spec,com,job,wf,wktm&order=1&asc=0&page={page_index}&mode=s&jobsource=index_s&langFlag=0&langStatus=0&recommendJob=1&hotJob=1'
        jobs = get_jobs(job_url+str(page_index))
        rows = len(jobs)
        rows_total += rows
        if len(jobs) <= 0 :
            break
        for job in jobs:
            show_job(f"({index}-{page_index},{rows})", job, sheet, sheet_temp)
            # print(f"{index}-{page_index},{rows}")
            index += 1
        print(f"page {page_index} = {rows}")
    print(f"rows_total = {rows_total}")

    # save - overwrite is ok
    workbook.save(file_job)

def show_job(head, job, sheet, sheet_temp):
    work = job.select_one(".b-tit a")
    title = work.text
    work_url =  work['href']
    comapny_name = job.select_one(".b-list-inline.b-clearfix:not(.b-content) a").text.strip()
    comapny_category = job.select(".b-list-inline.b-clearfix:not(.b-content) li")[-1].text
    work_location = job.select_one(".b-list-inline.b-clearfix.job-list-intro.b-content li").text
    try:
        default = job.select_one(".job-list-tag .b-tag--default")
        if default:
            salary = default.text
        else:
            salary = job.select_one(".job-list-tag.b-content a").text
    except:
        salary = "*****************wait check *******************"

    apply_people =  job.select_one(".b-block__right.b-pos-relative a").text.replace("人應徵", "")
    try:
        other = job.select_one(".job-list-item__info").text
    except:
        # 無列出
        other = ""

    # check error
    try:
        sheet_temp.append([other])
    except:
        other="--wait--"

    datas = [
        title,
        work_url,
        comapny_name,
        comapny_category,
        work_location,
        salary,
        apply_people,
        other
    ]
    try :
        sheet.append(datas)
    except :
        print("=============")
        print(datas)

    # # 職務名稱
    # print(f"{head} {title}")
    # print(f"    工作網址: {work_url}")
    # print(f"    公司名稱: {comapny_name}")
    # print(f"    公司類別: {comapny_category}")
    # print(f"    工作地點: {work_location}")
    # print(f"    薪資:     {salary}")
    # print(f"    應徵人數: {apply_people}")
    # print(f"    其他事項: {other}")

def get_jobs(url):
    jobs = []

    try:
        resp = requests.get(url)
    except:
        resp = None

    if resp and resp.status_code == 200:
        soup = BeautifulSoup(resp.text, "html.parser")
        jobs = soup.select('article.b-block--top-bord:not(.b-block--ad)')

    return jobs

if __name__ == '__main__':
    main()
```

#### CakeResume 擷取職缺資料 存至 excel
``` py
# CakeResume 擷取職缺資料 存至 excel
# https://www.cakeresume.com/jobs/硬體研發工程師?job_type[0]=full_time&page=2
import requests
from bs4 import BeautifulSoup
import  openpyxl
import os
from datetime import datetime

def main():
    page_index = 0
    index = 1
    # job_request = '前端工程師'
    job_request = '硬體研發工程師'
    file_job = "job21.xlsx"
    current_date = datetime.now()
    date_string = current_date.strftime("%Y-%m-%d")

    list_titles =["職務名稱",
            "工作網址",
            "公司名稱",
            "公司類別",
            "工作地點",
            "薪資",
            "應徵人數",
            "其他事項"]
    # 新增 excell
    # 活頁簿
    workbook = openpyxl.Workbook()
    workbook_temp = openpyxl.Workbook()
    # 工作表 #1
    sheet = workbook.worksheets[0]
    sheet.title = f"104 {date_string} {job_request}"
    sheet_temp = workbook_temp.worksheets[0]
    # 新增一列
    sheet.append(list_titles)

    rows_total = 0
    while True:
        page_index += 1
        job_url = f'https://www.cakeresume.com/jobs/{job_request}?job_type[0]=full_time&page={page_index}'
        jobs = get_jobs(job_url)
        rows = len(jobs)
        rows_total += rows
        if len(jobs) <= 0 :
            break
        for job in jobs:
            show_job(f"({index}-{page_index},{rows})", job, sheet, sheet_temp)
            # print(f"{index}-{page_index},{rows}")
            index += 1
        print(f"page {page_index} = {rows}")
        # break
    print(f"rows_total = {rows_total}")

    # save - overwrite is ok
    workbook.save(file_job)

def show_job(head, job, sheet, sheet_temp):
    work = job.select_one(".JobSearchItem_jobTitle__bu6yO")

    title = work.text
    work_url =  'https://www.cakeresume.com'+work['href']
    comapny_name = job.select_one(".JobSearchItem_companyName__bY7JI").text
    comapny_category = ""
    infomation = job.select(".JobSearchItem_features__hR3pk .InlineMessage_label__LJGjW")
    work_location = infomation[1].text

    if "TWD" in infomation[1].text:
        # 少填位置
        work_location = "-- space --"
        salary = infomation[1].text
    else:
        salary = infomation[2].text

    apply_people =  infomation[0].text.split("・")[0]
    other = job.select_one(".JobSearchItem_description__si5zg").text

    # check error
    try:
        sheet_temp.append([other])
    except:
        other="--wait--"

    datas = [
        title,
        work_url,
        comapny_name,
        comapny_category,
        work_location,
        salary,
        apply_people,
        other
    ]
    try :
        # 若非 TWD 不計入
        if "TWD" in salary:
            sheet.append(datas)
    except :
        print("=============")
        # print(f"{head} {title}")
        print(datas)

    # # 職務名稱
    # print(f"{head} {title}")
    # print(f"    工作網址: {work_url}")
    # print(f"    公司名稱: {comapny_name}")
    # print(f"    公司類別: {comapny_category}")
    # print(f"    工作地點: {work_location}")
    # print(f"    薪資:     {salary}")
    # print(f"    應徵人數: {apply_people}")
    # print(f"    其他事項: {other}")

def get_jobs(url):
    jobs = []

    try:
        resp = requests.get(url)
    except:
        resp = None

    if resp and resp.status_code == 200:
        soup = BeautifulSoup(resp.text, "html.parser")
        jobs = soup.select('.JobSearchItem_content__JriB9')

    return jobs

if __name__ == '__main__':
    main()
```


### Ref
+ [Source and Video](https://www.gotop.com.tw/books/download.aspx?bookid=ACL067200)
+ [Blog](http://www.e-happy.com.tw/)
+ {% post_link dl-1 '# Google Colab' %}:python 雲端開發平台
+ {% post_link python-20 '# Jupyter Notebook' %}: