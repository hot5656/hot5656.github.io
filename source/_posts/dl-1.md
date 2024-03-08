---
title: Deep Learning - Recurrent Neural Networks in Python
categories: Coding
tags:
  - python
  - deep learning
abbrlink: '6425'
date: 2024-03-06 14:43:09
---

### 說明
#### 名詞
Recurrent neural network(循環神經網路 RNNs) :
Linear and Logistic Regression(線性邏輯回歸)
Backpropagation(反向傳播)
TensorFlow 2
Time series forecasting(時間序列預測)
Text classification(link sentiment analysis) 文字分類(情緒分析)
image recognition (圖像辨識)
LSTMs

<!--more-->

#### Numpy
Matrix arithmetic 
Tensor(arrays)
1-D tensor(vector), 2-D tensoer(matrix)
Arithmetic:+,-,*,/
Matrix mutiply == dot/inner product(np.dot)
Element-wise multiply(*)

#### Matplotlib
Line charts
Scatterplots

#### Pandas
Loading in tabular data

#### Scipy
Is like a power version od Numpy(statistics, optimization, alinear algebra, signal processing)
Numpy is lower-level:adding, multiplying

#### Scikit-Learn 
It's about the concept behind using it
Classicfication and regression
MAchine learning as geometry rather than magic
Shape of data(X and Y)

#### The Step of a Machine Learning Script
- Load in the data
	- X and Y
	-	Typically use PAndas usless the data it too complex
- Slipt train/test sets(sometimes)
	- Sometimes "test" and "validation" are used interchangeably, and the "true test set" is sometiming else - don't get frazzled over this
- Build a Model
	- OOP(object oriented programing)
	- TensorFlow 2.0 standard is Keras API, very similar to Sciki-Learn
- Fit the model(gradient descent)
	- model.fit(X,Y)
- Evaluate the model
- Make predictions
	- model.predict(X)

### Google Colab
#### Upload
##### Using wget
``` bash
# download the data from a URL
!wget https://lazyprogrammer.me/course_files/arrhythmia.data

# list files in current directory
!ls

# check if the data has a header
!head arrhythmia.data

# check the data
import pandas as pd
df = pd.read_csv('arrhythmia.data', header=None)
# since the data has many columns, take just the first few and name them (as per the documentation)
data = df[[0,1,2,3,4,5]]
data.columns = ['age', 'sex', 'height', 'weight', 'QRS duration', 'P-R interval']

import matplotlib.pyplot as plt
plt.rcParams['figure.figsize'] = [15, 15] # make the plot bigger so the subplots don't overlap
data.hist(); # use a semicolon to supress return value

from pandas.plotting import scatter_matrix
scatter_matrix(data);
```

##### Using tf.keras
``` bash
# use keras get_file to download the auto MPG dataset
### alternate URL
url = 'https://raw.githubusercontent.com/lazyprogrammer/machine_learning_examples/master/tf2.0/auto-mpg.data'

import tensorflow as tf
print(tf.__version__)

# check out the documentation for other arguments
tf.keras.utils.get_file('auto-mpg.data', url)

!head /root/.keras/datasets/auto-mpg.data

# unless you specify an alternative path, the data will go into /root/.keras/datasets/
df = pd.read_csv('/root/.keras/datasets/auto-mpg.data', header=None, delim_whitespace=True)
df.head()
```

##### Upload the file yourself
``` bash
# another method: upload your own file
# if you must, then get the file from here:
# https://raw.githubusercontent.com/lazyprogrammer/machine_learning_examples/master/tf2.0/daily-minimum-temperatures-in-me.csv
from google.colab import files
uploaded = files.upload()

uploaded

# file is uploaded to the current directory
!ls

# open the file
# the last few lines are junk
df = pd.read_csv('daily-minimum-temperatures-in-me.csv', error_bad_lines=False)
df.head()

# upload a Python file with some useful functions (meant for fake_util.py)
from google.colab import files
uploaded = files.upload()

from fake_util import my_useful_function
my_useful_function()

!pwd
```

``` py
# fake_util.py
def my_useful_function():
  print("hello world")
```

##### Upload the file yourself
``` bash
# Access files from your Google Drive
from google.colab import drive
drive.mount('/content/gdrive')

# Check current directory - now gdrive is there
!ls

# What's in gdrive?
!ls gdrive

# Whoa! Look at all this great VIP content!
!ls /content/gdrive/MyDrive
```

### Ref
+ [Data Links](https://docs.google.com/document/d/1C656nbP-6BYlQHO92h5v3dGzaB_TC3VBtlA_82LVrnM/edit#heading=h.6wauif97563v)
+ [Github Link](https://github.com/lazyprogrammer/machine_learning_examples/tree/master/rnn_class)
+ [Code Link](https://deeplearningcourses.com/notebooks/5rVdagTYLDNP-aRUCi8w_w)
+ [MACHINE LEARNING BOOK](https://lazyprogrammer.me/mlcompendium/intro.html)
+ [Deep Learning Prerequisites: The Numpy Stack in Python Extra Resources](https://lazyprogrammer.me/numpy/)