---
title: Python install
categories: Coding
tags:
  - python
abbrlink: ccd0
date: 2021-03-28 18:29:25
---

### install(windows)

#### download [python](https://www.python.org/downloads/) windows version
<div style="width:500px">
	{% asset_img pic11.png pic11 %}
</div>

<!--more-->

#### install python
<div style="width:500px">
	{% asset_img pic12.png pic12 %}
</div>

<div style="width:500px">
	{% asset_img pic13.png pic13 %}
</div>

<div style="width:500px">
	{% asset_img pic14.png pic14 %}
</div>

<div style="width:500px">
	{% asset_img pic15.png pic15 %}
</div>

#### check python installed
<div style="width:500px">
	{% asset_img pic16.png pic16 %}
</div>


### Python Virtual Environments(可管理多組 python環境)
#### install 1st python

#### check pip version
``` bash
C:\Users\win10>pip3 list
Package    Version
---------- -------
pip        22.2.2
setuptools 63.2.0
```

#### install latest pip
``` bash
C:\Users\win10>python.exe -m pip install --upgrade pip
Requirement already satisfied: pip in d:\app\python\python310\lib\site-packages (22.2.2)
Collecting pip
  Using cached pip-22.3-py3-none-any.whl (2.1 MB)
Installing collected packages: pip
  Attempting uninstall: pip
    Found existing installation: pip 22.2.2
    Uninstalling pip-22.2.2:
      Successfully uninstalled pip-22.2.2
Successfully installed pip-22.3

C:\Users\win10>pip3 list
Package    Version
---------- -------
pip        22.3
setuptools 63.2.0
``` 

#### instakk virtualenv
``` bash
C:\Users\win10>pip3 install virtualenv
Collecting virtualenv
  Using cached virtualenv-20.16.6-py3-none-any.whl (8.8 MB)
Collecting distlib<1,>=0.3.6
  Using cached distlib-0.3.6-py2.py3-none-any.whl (468 kB)
Collecting platformdirs<3,>=2.4
  Using cached platformdirs-2.5.2-py3-none-any.whl (14 kB)
Collecting filelock<4,>=3.4.1
  Using cached filelock-3.8.0-py3-none-any.whl (10 kB)
Installing collected packages: distlib, platformdirs, filelock, virtualenv
Successfully installed distlib-0.3.6 filelock-3.8.0 platformdirs-2.5.2 virtualenv-20.16.6

C:\Users\win10>pip3 list
Package      Version
------------ -------
distlib      0.3.6
filelock     3.8.0
pip          22.3
platformdirs 2.5.2
setuptools   63.2.0
virtualenv   20.16.6
```

#### 建立虛擬環境(Virtual environment)
``` bash
C:\Users\win10>d:
d:\app\python_env>cd \app\python_env

d:\app\python_env>virtualenv myenv01
created virtual environment CPython3.10.8.final.0-64 in 4870ms
  creator CPython3Windows(dest=D:\app\python_env\myenv01, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=C:\Users\win10\AppData\Local\pypa\virtualenv)
    added seed packages: pip==22.3, setuptools==65.5.0, wheel==0.37.1
  activators BashActivator,BatchActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator

d:\app\python_env>dir/w
 磁碟區 D 中的磁碟沒有標籤。
 磁碟區序號:  0E4C-18B1
 d:\app\python_env 的目錄
[.]       [..]      [myenv01]
               0 個檔案               0 位元組
               3 個目錄  757,669,646,336 位元組可用
```

#### 啟用虛擬環境
``` bash
d:\app\python_env>cd myenv01\Scripts
d:\app\python_env\myenv01\Scripts>activate

(myenv01) d:\app\python_env\myenv01\Scripts>pip3 list
Package    Version
---------- -------
pip        22.3
setuptools 65.5.0
wheel      0.37.1
```

#### 安裝套件及使用
``` bash
(myenv01) d:\app\python_env\myenv01\Scripts>pip3 install matplotlib
Collecting matplotlib
  Downloading matplotlib-3.6.1-cp310-cp310-win_amd64.whl (7.2 MB)
     ---------------------------------------- 7.2/7.2 MB 8.4 MB/s eta 0:00:00
Collecting fonttools>=4.22.0
  Downloading fonttools-4.38.0-py3-none-any.whl (965 kB)
     ---------------------------------------- 965.4/965.4 kB 15.2 MB/s eta 0:00:00
Collecting cycler>=0.10
  Downloading cycler-0.11.0-py3-none-any.whl (6.4 kB)
Collecting pillow>=6.2.0
  Downloading Pillow-9.2.0-cp310-cp310-win_amd64.whl (3.3 MB)
     ---------------------------------------- 3.3/3.3 MB 14.0 MB/s eta 0:00:00
Collecting packaging>=20.0
  Downloading packaging-21.3-py3-none-any.whl (40 kB)
     ---------------------------------------- 40.8/40.8 kB ? eta 0:00:00
Collecting numpy>=1.19
  Downloading numpy-1.23.4-cp310-cp310-win_amd64.whl (14.6 MB)
     ---------------------------------------- 14.6/14.6 MB 11.9 MB/s eta 0:00:00
Collecting kiwisolver>=1.0.1
  Downloading kiwisolver-1.4.4-cp310-cp310-win_amd64.whl (55 kB)
     ---------------------------------------- 55.3/55.3 kB 2.8 MB/s eta 0:00:00
Collecting contourpy>=1.0.1
  Downloading contourpy-1.0.5-cp310-cp310-win_amd64.whl (164 kB)
     ---------------------------------------- 164.1/164.1 kB 5.0 MB/s eta 0:00:00
Collecting pyparsing>=2.2.1
  Downloading pyparsing-3.0.9-py3-none-any.whl (98 kB)
     ---------------------------------------- 98.3/98.3 kB ? eta 0:00:00
Collecting python-dateutil>=2.7
  Downloading python_dateutil-2.8.2-py2.py3-none-any.whl (247 kB)
     ---------------------------------------- 247.7/247.7 kB 14.8 MB/s eta 0:00:00
Collecting six>=1.5
  Downloading six-1.16.0-py2.py3-none-any.whl (11 kB)
Installing collected packages: six, pyparsing, pillow, numpy, kiwisolver, fonttools, cycler, python-dateutil, packaging, contourpy, matplotlib
Successfully installed contourpy-1.0.5 cycler-0.11.0 fonttools-4.38.0 kiwisolver-1.4.4 matplotlib-3.6.1 numpy-1.23.4 packaging-21.3 pillow-9.2.0 pyparsing-3.0.9 python-dateutil-2.8.2 six-1.16.0

(myenv01) d:\app\python_env\myenv01\Scripts>
(myenv01) d:\app\python_env\myenv01\Scripts>pip3 list
Package         Version
--------------- -------
contourpy       1.0.5
cycler          0.11.0
fonttools       4.38.0
kiwisolver      1.4.4
matplotlib      3.6.1
numpy           1.23.4
packaging       21.3
Pillow          9.2.0
pip             22.3
pyparsing       3.0.9
python-dateutil 2.8.2
setuptools      65.5.0
six             1.16.0
wheel           0.37.1
```

#### 停用虛擬環境(原目錄會看到一樣)
``` bash
(myenv01) d:\app\python_env\myenv01\Scripts>deactivate
d:\app\python_env\myenv01\Scripts>pip3 list
Package         Version
--------------- -------
contourpy       1.0.5
cycler          0.11.0
fonttools       4.38.0
kiwisolver      1.4.4
matplotlib      3.6.1
numpy           1.23.4
packaging       21.3
Pillow          9.2.0
pip             22.3
pyparsing       3.0.9
python-dateutil 2.8.2
setuptools      65.5.0
six             1.16.0
wheel           0.37.1

d:\app\python_env\myenv01\Scripts>cd ..

d:\app\python_env\myenv01>pip3 list
Package      Version
------------ -------
distlib      0.3.6
filelock     3.8.0
pip          22.3
platformdirs 2.5.2
setuptools   63.2.0
virtualenv   20.16.6
```

#### 刪除虛擬環境
刪除目錄 myenv01 

### Python Launcher (多python 版本控制)
#### show all install python
``` bash
C:\Users\win10>py --list
 -V:3.11 *        Python 3.11 (64-bit)
 -V:3.10          Python 3.10 (64-bit)
```

#### 檢查目前執行之 python version
``` bash
C:\Users\win10>python --version
Python 3.10.8
```

#### Python Launcher 指到的 python
``` bash
C:\Users\win10>py --version
Python 3.11.0
```

#### Python Launcher run other version python
``` bash
C:\Users\win10>py -3.10
Python 3.10.8 (tags/v3.10.8:aaaf517, Oct 11 2022, 16:50:30) [MSC v.1933 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> quit()

py -3.10 --version

d:\app\python_env>py -3.10 -m pip list
Package      Version
------------ -------
distlib      0.3.6
filelock     3.8.0
pip          22.3
platformdirs 2.5.2
setuptools   63.2.0
virtualenv   20.16.6

d:\app\python_env>py -3.11 -m pip list
Package    Version
---------- -------
pip        22.3
setuptools 65.5.0
```

### Python Launcher + Virtual Environments
#### install package
``` bach
C:\Users\win10>py -m pip install virtualenv
Collecting virtualenv
  Using cached virtualenv-20.16.6-py3-none-any.whl (8.8 MB)
Collecting distlib<1,>=0.3.6
  Using cached distlib-0.3.6-py2.py3-none-any.whl (468 kB)
Collecting filelock<4,>=3.4.1
  Using cached filelock-3.8.0-py3-none-any.whl (10 kB)
Collecting platformdirs<3,>=2.4
  Using cached platformdirs-2.5.2-py3-none-any.whl (14 kB)
Installing collected packages: distlib, platformdirs, filelock, virtualenv
  WARNING: The script virtualenv.exe is installed in 'D:\app\Python\Python311\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed distlib-0.3.6 filelock-3.8.0 platformdirs-2.5.2 virtualenv-20.16.6
```

#### create Virtual environment
``` bash
D:\app\python_env>py -m  virtualenv myenv11_01
created virtual environment CPython3.11.0.final.0-64 in 4070ms
  creator CPython3Windows(dest=D:\app\python_env\myenv11_01, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=C:\Users\win10\AppData\Local\pypa\virtualenv)
    added seed packages: pip==22.3, setuptools==65.5.0, wheel==0.37.1
  activators BashActivator,BatchActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator
```

#### active Virtual environment
``` bash
D:\app\python_env>myenv11_01\Scripts\activate

(myenv11_01) D:\app\python_env>python --version
Python 3.11.0
```

#### install package
``` bash
(myenv11_01) D:\app\python_env>python -m pip install autopep8
Collecting autopep8
  Downloading autopep8-2.0.0-py2.py3-none-any.whl (45 kB)
     ---------------------------------------- 45.4/45.4 kB 1.1 MB/s eta 0:00:00
Collecting pycodestyle>=2.9.1
  Downloading pycodestyle-2.9.1-py2.py3-none-any.whl (41 kB)
     ---------------------------------------- 41.5/41.5 kB ? eta 0:00:00
Collecting tomli
  Downloading tomli-2.0.1-py3-none-any.whl (12 kB)
Installing collected packages: tomli, pycodestyle, autopep8
Successfully installed autopep8-2.0.0 pycodestyle-2.9.1 tomli-2.0.1

(myenv11_01) D:\app\python_env>python -m pip list
Package     Version
----------- -------
autopep8    2.0.0
pip         22.3
pycodestyle 2.9.1
setuptools  65.5.0
tomli       2.0.1
wheel       0.37.1
```

### 移除 windows 預安裝 python
<div style="width:300px">
	{% asset_img pic21.png pic21 %}
</div>

<div style="width:700px">
	{% asset_img pic22.png pic22 %}
</div>

<div style="width:600px">
	{% asset_img pic23.png pic23 %}
</div>