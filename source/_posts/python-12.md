---
title:  python Selenium 說明
abbrlink: ce52
date: 2022-12-24 19:33:33
categories: Coding
tags:
	- python
---

### Command
#### install selenium
``` bash 
pip install selenium
```

#### install webdriver_manager
```
pip install webdriver_manager
```
<!--more-->

#### download browser driver(check same as currenct use)
+ [Chrome driver](https://sites.google.com/chromium.org/driver/downloads) 

### Coding
#### basic run selenium
##### copy chromedriver.exe to /app/ChromeDrive

##### basics.py
``` py
from selenium import webdriver

driver = webdriver.Chrome(executable_path="/app/ChromeDrive/chromedriver.exe")
driver.get("https://duckduckgo.com")
```

##### run 
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\selenium_basics>python basics.py
D:\work\run\python_crawler\107-selenium\selenium_basics\basics.py:3: DeprecationWarning: executable_path has been deprecated, please pass in a Service object
  driver = webdriver.Chrome(executable_path="/app/ChromeDrive/chromedriver.exe")
DevTools listening on ws://127.0.0.1:58048/devtools/browser/b34c4e48-a418-445e-8446-c541a8db145d

(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\selenium_basics>
```

<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>


#### executable_path by which or run current Chrome
##### basics.py
``` py
from selenium import webdriver
import time
from shutil import which


# 出現以下錯誤, 增加 options mask
# [15856:11828:1225/110356.222:ERROR:device_event_log_impl.cc(215)]
# [11:03:56.222] USB: usb_device_handle_win.cc:1045 Failed to read descriptor from node connection: 連結到系統的某個裝置失去作用。 (0x1F)
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])

# use which find "chromedriver.exe"
# need copy "chromedriver.exe" to PATH directory : I copy to C:\Windows\System32
chrome_path = which("chromedriver.exe")
driver = webdriver.Chrome(executable_path=chrome_path,options=options)

# 直接使用 目前使用似乎可行
# driver = webdriver.Chrome(options=options)

driver.get("https://duckduckgo.com")

# 加上 slppe() 否則 browser 很快就關起來
time.sleep(10)
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\selenium_basics>python basics.py
D:\work\run\python_crawler\107-selenium\selenium_basics\basics.py:15: DeprecationWarning: executable_path has been deprecated, please pass in a Service object
  driver = webdriver.Chrome(executable_path=chrome_path,options=options)
```

#### search "My User Agent"
##### basics.py
``` py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from shutil import which


# 出現以下錯誤, 增加 options mask
# [15856:11828:1225/110356.222:ERROR:device_event_log_impl.cc(215)]
# [11:03:56.222] USB: usb_device_handle_win.cc:1045 Failed to read descriptor from node connection: 連結到系統的某個裝置失去作用。 (0x1F)
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])

# use which find "chromedriver.exe"
# need copy "chromedriver.exe" to PATH directory : I copy to C:\Windows\System32
chrome_path = which("chromedriver.exe")
driver = webdriver.Chrome(executable_path=chrome_path,options=options)

# 直接使用 目前使用似乎可行
# driver = webdriver.Chrome(options=options)

driver.get("https://duckduckgo.com")

search_input = driver.find_element(By.ID, "search_form_input_homepage")
search_input.send_keys("My User Agent")
# click button
# search_btn = driver.find_element(By.ID, "search_button_homepage")
# search_btn.click()

# press Enter
search_input.send_keys(Keys.ENTER)

# find_element(By.ID, "id")
# find_element(By.NAME, "name")
# find_element(By.XPATH, "xpath")
# find_element(By.LINK_TEXT, "link text")
# find_element(By.PARTIAL_LINK_TEXT, "partial link text")
# find_element(By.TAG_NAME, "tag name")
# find_element(By.CLASS_NAME, "class name")
# find_element(By.CSS_SELECTOR, "css selector")

# 加上 slppe() 否則 browser 很快就關起來
time.sleep(10)
```

#### no open browse, close driver and  "webdriver.Chrome() change executable_path to service"
##### basics.py
``` py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager



# 出現以下錯誤, 增加 options mask
# [15856:11828:1225/110356.222:ERROR:device_event_log_impl.cc(215)]
# [11:03:56.222] USB: usb_device_handle_win.cc:1045 Failed to read descriptor from node connection: 連結到系統的某個裝置失去作用。 (0x1F)
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
# add argument headless - no open browser
options.add_argument('--headless')

# change executable_path to service
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get("https://duckduckgo.com")

search_input = driver.find_element(By.ID, "search_form_input_homepage")
search_input.send_keys("My User Agent")
# click button
# search_btn = driver.find_element(By.ID, "search_button_homepage")
# search_btn.click()

# press Enter
search_input.send_keys(Keys.ENTER)

# find_element(By.ID, "id")
# find_element(By.NAME, "name")
# find_element(By.XPATH, "xpath")
# find_element(By.LINK_TEXT, "link text")
# find_element(By.PARTIAL_LINK_TEXT, "partial link text")
# find_element(By.TAG_NAME, "tag name")
# find_element(By.CLASS_NAME, "class name")
# find_element(By.CSS_SELECTOR, "css selector")

print("======================================")
print(driver.page_source)
print("======================================")

# need close
driver.close()
```

##### run
``` bash
(myenv10_scrapy) D:\work\run\python_crawler\107-selenium\selenium_basics>python basics.py
======================================
......
======================================
```


### Ref
+ [Selenium with Python](https://selenium-python.readthedocs.io/)