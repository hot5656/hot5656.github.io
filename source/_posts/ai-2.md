---
title: chatgpt for coding
abbrlink: '6553'
date: 2023-03-20 10:59:07
categories: Coding
tags:
	- ai
---

### QR code API
#### add virtual machine
``` bash
py --version
  Python 3.11.0
py --list
 -V:3.11 *        Python 3.11 (64-bit)
 -V:3.10          Python 3.10 (64-bit)
 -V:3.9
py -3.10 -m virtualenv myenvflask_310
d:\app\python_env\myenvflask_310\Scripts\activate
```

<!--more-->

#### ask chatgpt
``` bash
please help generate the code, and some comment in clode, also give example how to run
code for python flask api server that tahe 'GET' request with url as string and conver it to qr code image and send it back as api response
```

#### install package
``` bash
pip install flask
python.exe -m pip install --upgrade pip
pip install qrcode
pip install Pillow
```

#### qr.py file
``` py
from flask import Flask, request, send_file
import qrcode
from PIL import Image
from io import BytesIO

app = Flask(__name__)

@app.route('/qrcode', methods=['GET'])
def generate_qr():
    # get the url parameter from the query string
    url = request.args.get('url')

    # generate the QR code image
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='black', back_color='white')

    # save the image to a file-like object
    img_file = BytesIO()
    img.save(img_file, 'PNG')
    img_file.seek(0)

    # return the image as an API response
    return send_file(img_file, mimetype='image/PNG')

# add run app
if __name__=="__main__":
	app.run()
```

#### run
``` bash
python qr.py
```

http://localhost:5000/qrcode?url=https://www.pchome.com.tw
<div style="max-width:500px">
	{% asset_img pic1.png pic1 %}
</div>

#### ask chatgpt #2
``` bash
how to make response downloadable?
```

#### qr.py modify(the QR code dave to download directory)
``` py
from flask import Flask, request, send_file, make_response
import qrcode
from PIL import Image
from io import BytesIO

app = Flask(__name__)

@app.route('/qrcode', methods=['GET'])
def generate_qr():
    # get the url parameter from the query string
    url = request.args.get('url')

    # generate the QR code image
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='black', back_color='white')

    # save the image to a file-like object
    img_file = BytesIO()
    img.save(img_file, 'PNG')
    img_file.seek(0)

    # create a response object with the image data
    response = make_response(img_file.getvalue())

    # set the headers for the response
    response.headers.set('Content-Type', 'image/png')
    response.headers.set('Content-Disposition', 'attachment', filename='qrcode.png')

    return response

# add run app
if __name__=="__main__":
	app.run()
``` 




### 說明
+ Python Flask : Flask是一個使用Python編寫的輕量級Web應用框架

### Ref 
+ [Rapid API](https://rapidapi.com/hub/):RapidAPI 收集了網路上各式各樣的 API
+ [PythonAnywhere](https://www.pythonanywhere.com/):提供python環境,免費帳號限制如下
	+ 只能建立一個 App (應用程式)
	+ 網外存取 Internet 有限制
	+ CPU 與儲存有限制 (一天 100 秒 CPU 時間, 512MB 儲存)
	+ 不提供 Jupyter (但有 IPython)
	+ 只能有兩個 Console (Bash 與 Python)

