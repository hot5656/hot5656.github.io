---
title: command line 指令
abbrlink: 4b30
date: 2021-04-12 15:55:47
categories: OS
tags:
	- cli
---

### command 
#### nslookup : 查詢 IP address

``` bash
# local server IP
nslookup
# 查某一 host IP address
nslookup google.com
# 查  hot5656.website from 8.8.8.8(google DNS)
hot5656.website 8.8.8.8
	伺服器:  dns.google
	Address:  8.8.8.8
	未經授權的回答:
	名稱:    hot5656.website
	Address:  54.168.160.39
```

<!--more-->

#### ls : 列出檔案目錄

``` bash
# 包含隱藏檔: ./, ../, .gitignore
ls -a
# 詳細資料
ls -l
# 包含子目錄
ls -R 
```

#### clear : 清除畫面

#### cd : 切換目錄

#### mkdir : 新增目錄

#### cp : copy 檔案,目錄

#### mv : 更改檔名或移動檔案位置

#### rm : 刪除檔案(-f 可刪除目錄)

#### rmdir : 刪除目錄

#### ping : 檢查某一 IP 的 device 是否存在

#### date : 列出日期時間

#### cat : 將檔案內容列出來
``` bash
# 將二個檔案合併成一個檔案
cat file1 file2 > file3
```

#### less : 檔案分頁顯示

#### touch : 更新檔案時間或產生檔案

#### echo : 顯示內容

#### man : command help
``` bash
man ls
```

#### head : 前面幾行
``` bash
$ ls -l | head -n 5
total 285
-rw-r--r-- 1 win10 197121      0 三月 27 15:29 _config.landscape.yml
-rw-r--r-- 1 win10 197121  28728 三月 27 16:29 _config.next.yml
-rw-r--r-- 1 win10 197121   2623 三月 27 16:01 _config.yml
-rw-r--r-- 1 win10 197121  65214 三月 27 16:56 db.json
```

#### tail : 最後幾行
``` bash
$ ls -l | tail -n 5
-rw-r--r-- 1 win10 197121    749 四月 16 22:32 pp.txt
drwxr-xr-x 1 win10 197121      0 三月 27 16:39 public/
drwxr-xr-x 1 win10 197121      0 三月 27 15:29 scaffolds/
drwxr-xr-x 1 win10 197121      0 三月 27 16:24 source/
drwxr-xr-x 1 win10 197121      0 三月 27 15:29 themes/
```

#### cut : 擷取字元
``` bash
# 字元 2-5
$ ls -l | tail -n 5 | cut -c 2-5
rw-r
rwxr
rwxr
rwxr
rwxr
```

#### sed(stream editor) : 串流編輯
``` bash
# example.txt
$ cat example.txt
I have a key.
I lost my way.
I have a book.
I have have a monkey.
# s:取代, 在第一次出現的位置,把 have 這個字取代為 had, /2 表 第二次出現的位置
# 對單行, 只顯示未修改原檔案
sed 's/have/had/1' example.txt
# 不顯示
sed -n 's/have/had/2' example.txt
# 只顯示有修改的行數 
sed -n 's/have/had/2p' example.txt
# sed_command.txt
$ cat sed_command.txt
s/key/keyboard/
s/have/had/
# -f(讀取檔案手稿) 把控制程序放入檔案
sed -f sed_command.txt example.txt
# -i (修改檔案)
$ sed -i 's/way/pen/1' example.txt
# a(新增)
# 第一行後加一行
sed '1a I add after line 1...' example.txt
# 1-4行後都加一行
sed '1,4a I add after a line...' example.txt
# c (替換)
# 更換第3行
sed '3c I change line 3...' example.txt
# d (刪除)
# 刪除 2-4 行
sed '2,4d' example.txt
# 刪除含有 pen 這一行
sed '/pen/d' example.txt
# i(新增)
# 第一行前加一行
sed '1i I add before line 1...' example.txt
# 常用旗標
[0-9]：數字表示只搜尋或者取代第 N 個數字所指示的那個樣板字串。
g：全部取代
I：忽略大小寫
w：把符合的結果寫入檔案。和加了 -n 選項搭配 p 旗標的結果一樣。此旗標如果有和其它旗標搭配使用，必須放在最後面。
```

#### awk : 資料處理
``` bash
# 列出第一欄位和第三欄位,中間以 tab 分開
ls -l | head -n 5 | awk '{print $1 "\t" $3}'
# 列出檔案大小>0
ls -l | awk  '$5 > 0 {print $5 "\t" $9}'
# 以 : 來作為欄位的分隔
# BEGIN 第一行才有效
# awk 'BEGIN {FS=":"} $3 < 10 {print $1 "\t " $3}'
# pay.txt
Name    1st     2nd     3th
VBird   23000   24000   25000
DMTsai  21000   20000   23000
Bird2   43000   42000   41000
# 計算 total
# 所有 awk 的動作，亦即在 {} 內的動作，如果有需要多個指令輔助時，可利用分號『;』間隔，
# 或者直接以 [Enter] 按鍵來隔開每個指令
cat pay.txt | \
> awk 'NR==1{printf "%10s %10s %10s %10s %10s\n",$1,$2,$3,$4,"Total" }
> NR>=2{total = $2 + $3 + $4
> printf "%10s %10d %10d %10d %10.2f\n", $1, $2, $3, $4, total}'
      Name        1st        2nd        3th      Total
     VBird      23000      24000      25000   72000.00
    DMTsai      21000      20000      23000   64000.00
     Bird2      43000      42000      41000  126000.00
```

#### wget : 檔案下載
download [Windows Wget](https://eternallybored.org/misc/wget/)
``` bash
# 下載檔案
wget.exe https://hot5656.github.io/2021/04/14/git-5/ic1.png
# 下載網頁
wget.exe https://www.google.com/
```

#### curl : 傳輸資料命令(API)
download [curl](https://curl.se/download.html)
``` bash
# 透過 API query 資料 
curl.exe https://api.github.com/users/hot5656
# 列出一些溝通資訊
curl.exe -I https://api.github.com/users/hot5656
```

#### grep : 從串流資料或檔案中，篩選出想要尋找的資料
``` bash
cat pp.txt | grep hexo
```

#### redirect
``` bash
# 存入檔案
ls > l1
# 附加於檔案
ls >> l1
```

#### pipe
``` bash
cat pp.txt | grep hexo
```

#### 建立軟連結 - 目錄僅能用軟連結
```
# /var/www map to ./www
ln -s /var/www ./www
```

#### service control
``` bash
sudo service apache2 start
sudo service apache2 stop
sudo service apache2 restart
# 第二種方式
sudo systemctl start mysql
sudo systemctl stop mysql
sudo systemctl restart mysql
# 第三種方式
sudo /etc/init.d/mysql stop
sudo /etc/init.d/mysql start
sudo /etc/init.d/mysql restart
# show service status
systemctl status mysql
```

#### netstat -來查詢網路相關資訊
``` bash
# 列出所有連接埠
netstat -a
# 列出 TCP port
netstat -at
# 列出 UDP port
netstat -au
# 列出網路介面資訊
netstat -ie
```

#### apt 
``` bash
# list 已安裝
apt list --installed | grep mysql
```

#### chmod and chown
``` bash
sudo chmod -R 775 /var/www
sudo chown -R ubuntu:ubuntu /var/www
```

#### more
``` bash
-m  顯示類似more命令的百分比
-N  顯示每行的行號
-f  強迫打開特殊檔，例如週邊設備代號、目錄和二進位檔案
-g  只標誌最後搜索的關鍵字
-i  忽略搜索時的大小寫

/字串：向下搜索“字串”的功能
?字串：向上搜索“字串”的功能
n：重複前一個搜索（與 / 或 ? 有關）
N：反向重複前一個搜索（與 / 或 ? 有關）
y: 向前滾動一行
空白鍵: 向後滾動一行
[pagedown]：向下翻動一頁
[pageup]  ：向上翻動一頁
u: 向前滾動半頁
d: 向後翻半頁
Q: 退出less 命令
h: 顯示説明介面

less -m -N /var/log//apache2/error.log
```

#### top 顯示即時的系統負載狀態

#### ufw 防火牆
``` bash
ufw allow 80
ufw status
```

### vim 
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

#### Normal mode 
``` bash
# 移動
/hexo : 找下一行字串 hexo
?hexo : 找上一行字串 hexo
n : 執行前一動作
N : 反向執行前一動作
n<Enter> : 向下移動幾列
[Home] : 移至本列第一字元
[End] : 移至本列最後字元
nG : 跳至第 n 行
# 複製刪除
dd : 刪除本行
u  : 還原
yy : 複製本行
P  : 貼到前一行
p  : 貼到後一行
# 區塊選擇
v : 字元選擇,游標經過會反白選擇
V : 行選擇,游標經過會反白選擇
[Ctrl]+v : 方塊選擇,游標經過會反白選擇
y : 反白地方複製
d : 反白地方刪除
p : 貼上複製區塊
```

#### Command mode
``` bash
w : 寫入檔案
q : 跳出檔案
wq: 寫入後跳出檔案
q!: 強制跳出檔案(修改取消)
set nu   : 顯示行號
set nonu : 取消顯示行號
```
