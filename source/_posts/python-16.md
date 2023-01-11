---
title: Python Flask 說明
abbrlink: d53
date: 2023-01-11 08:47:09
categories: Coding
tags:
	- python
---

### command
#### install
``` bash
pip install flask
```

<!--more-->

### Example
#### 1st run
##### web/app.py
``` py
from flask import Flask

app = Flask(__name__)

if __name__ == '__main__':
    # debug=True): doesn't restart when change app
    app.run(debug=True)
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\108-scrapy-practice\steam\web>python app.py
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 115-499-250
```

##### run chrome
http://localhost:5000/

<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>

#### 2nd run
##### web/app.py
``` py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, world!'

if __name__ == '__main__':
    # debug=True): doesn't restart when change app
    app.run(debug=True)
```

##### run chrome
http://localhost:5000/

<div style="max-width:700px">
	{% asset_img pic2.png pic2 %}
</div>

#### get more_best json
#####  web/app.py
``` py
from flask import Flask
import requests

app = Flask(__name__)

@app.route('/')
def index():
    resp = requests.get(
        url ='http://localhost:9080/crawl.json?start_requests=true&spider_name=more_best'
    ).json()

    items = resp.get('items')
    return items

if __name__ == '__main__':
    # debug=True): doesn't restart when change app
    app.run(debug=True)
```

##### run chrome
http://localhost:5000/

<div style="max-width:700px">
	{% asset_img pic3.png pic3 %}
</div>

#### add html template
##### web/app.py 
``` python
from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    resp = requests.get(
        url ='http://localhost:9080/crawl.json?start_requests=true&spider_name=more_best'
    ).json()

    items = resp.get('items')
    return items

@app.route('/show')
def show_template():
    user_name = 'Robert'
    fruits = [
        'banana',
        'orange',
        'apple'
    ]
    return render_template('index.html', user=user_name, fruits=fruits)

if __name__ == '__main__':
    # debug=True): doesn't restart when change app
    app.run(debug=True)
```

##### web/templates/index.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Steam games</title>
</head>
<body>
    <h1>Hello</h1>
    <p>{{user}}</p>
    {% for fruit in fruits%}
        {% if fruit=='apple' %}
            <P>{{fruit}}--mine</P>
        {% else %}
            <p>{{fruit}}</p>
        {% endif %}
    {% endfor %}

</body>
</html>
```

##### run chrome
http://localhost:5000/show

<div style="max-width:700px">
	{% asset_img pic4.png pic4 %}
</div>

#### more_base show top 150 games by bootstrap 4

##### bootstrap css - web/static/css/bootstrap/bootstrap.min.css

##### web/app.py
``` py
from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    resp = requests.get(
        url ='http://localhost:9080/crawl.json?start_requests=true&spider_name=more_best'
    ).json()

    items = resp.get('items')
    return render_template('index.html', games=items)

if __name__ == '__main__':
    # debug=True): doesn't restart when change app
    app.run(debug=True)
```

##### web/templates/index.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ url_for('static', filename='css/bootstrap/bootstrap.min.css') }}">
    <title>Steam games</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Steam Games</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container mt-4">
          <div class="jumbotron text-center">
            <h1 class="display-4">Steam 150 games</h1>
            <p class="lead">All the games you see below are scraped from Steam store using Scarpy & ScrapyRT.</p>
            <hr class="my-4">
            <p>For further information please click the button below.</p>
            <a class="btn btn-primary btn-lg" href="https://scrapy.org" role="button">Learn more</a>
          </div>
      </div>
      <div class="container">
        {% for game in games%}
            <!-- loop.index0 exist in for loop, start from 0 -->
            {% if loop.index0 % 3 == 0 %}
                <div class="row justify-content-center my-4">
            {% endif %}
                    <div class="card mx-4 text-center" style="width: 18rem;">
                        <img src="{{game['img_url']}}" class="card-img-top">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">{{game['game_name']}}</h5>
                            <p class="card-text">support platform:{{game['platforms'] }}</p>
                            <a href="{{game['game_url']}}" class="btn btn-primary d-block mt-auto">Game URL</a>
                        </div>
              </div>
            {% if loop.index0 % 3 == 2 %}
                </div>
            {% endif %}
        {% endfor%}
      </div>

</body>
</html>
```

##### run chrome
http://localhost:5000/

<div style="max-width:700px">
	{% asset_img pic5.png pic5 %}
</div>


### Ref
+ [Flask Guide](https://flask.palletsprojects.com/en/1.1.x/)
+ [Jinja template](https://jinja.palletsprojects.com/en/2.10.x/templates/)