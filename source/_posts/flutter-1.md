---
title: Flutter
abbrlink: f479
date: 2022-06-28 15:48:19
categories: Coding
tags: 
	- flutter
---

### Install 
#### Install [Flutter SDK](https://docs.flutter.dev/get-started/install?gclid=CjwKCAjwzeqVBhAoEiwAOrEmzV6qqpCu1CpED9kySitZ1Q38Prh7MPXi39sZZT3G1rbTT_7Q8rNN7xoC4gsQAvD_BwE&gclsrc=aw.ds)

##### set correct path : D:\app\src\flutter

<!--more-->

##### run by flutter console
<div style="width:600px">
	{% asset_img pic1.png pic1 %}
</div>

flutter --version
<div style="width:600px">
	{% asset_img pic2.png pic2 %}
</div>

##### set path for flutter
<div style="width:400px">
	{% asset_img pic3.png pic3 %}
</div>

##### run flutter by command line and check installed
flutter doctor
<div style="width:600px">
	{% asset_img pic4.png pic4 %}
</div>

#### Install [Android Studio](https://developer.android.com/studio)
##### install complete -> install package flutter(also auto install Draft)
<div style="width:600px">
	{% asset_img pic5.png pic5 %}
</div>

<div style="width:300px">
	{% asset_img pic6.png pic6 %}
</div>

#### Run Android Emulator
##### set windows's Hypervisor
<div style="width:600px">
	{% asset_img pic21.png pic21 %}
</div>

<div style="width:600px">
	{% asset_img pic22.png pic22 %}
</div>

<div style="width:300px">
	{% asset_img pic23.png pic23 %}
</div>

##### create project
<div style="width:600px">
	{% asset_img pic11.png pic11 %}
</div>

<div style="width:600px">
	{% asset_img pic12.png pic12 %}
</div>

<div style="width:600px">
	{% asset_img pic13.png pic13 %}
</div>

<div style="width:600px">
	{% asset_img pic14.png pic14 %}
</div>

<div style="width:600px">
	{% asset_img pic15.png pic15 %}
</div>

<div style="width:600px">
	{% asset_img pic16.png pic16 %}
</div>

<div style="width:600px">
	{% asset_img pic17.png pic17 %}
</div>

<div style="width:600px">
	{% asset_img pic18.png pic18 %}
</div>

##### run virtual machine
<div style="width:600px">
	{% asset_img pic19.png pic19 %}
</div>

<div style="width:600px">
	{% asset_img pic30.png pic30 %}
</div>

stop virtual machine
<div style="width:300px">
	{% asset_img pic35.png pic35 %}
</div>

<div style="width:300px">
	{% asset_img pic36.png pic36 %}
</div>

<div style="width:300px">
	{% asset_img pic37.png pic37 %}
</div>


##### run/stop main.dart
<div style="width:600px">
	{% asset_img pic31.png pic31 %}
</div>

<div style="width:600px">
	{% asset_img pic32.png pic32 %}
</div>

<div style="width:200px">
	{% asset_img pic33.png pic33 %}
</div>

stop main.dart
<div style="width:600px">
	{% asset_img pic34.png pic34 %}
</div>

### set Android Studio UI
#### Theme
<div style="width:600px">
	{% asset_img pic41.png pic41 %}
</div>

#### Font
<div style="width:600px">
	{% asset_img pic42.png pic42 %}
</div>

#### shortcut command
<div style="width:600px">
	{% asset_img pic43.png pic43 %}
</div>

#### save code auto alignment
<div style="width:600px">
	{% asset_img pic44.png pic44 %}
</div>

#### show closing labels in Dart source cide
<div style="width:600px">
	{% asset_img pic45.png pic45 %}
</div>

### link physical android device 

#### enable adnroid device 開發人員模式
連續按版本編號直到顯示 開發人員模式已開啟
<div style="width:300px">
	{% asset_img pic51.jpg pic51 %}
</div>

#### enable USB 偵錯模式
<div style="width:300px">
	{% asset_img pic52.jpg pic52 %}
</div>

#### link to computer 
<div style="width:300px">
	{% asset_img pic53.jpg pic53 %}
</div>

#### Android Studio show device link already
<div style="width:600px">
	{% asset_img pic54.png pic54 %}
</div>

### Emulator
#### enable/disable Emulator frame
<div style="width:600px">
	{% asset_img pic55.png pic55 %}
</div>

### debug
#### disable debug banner

``` dart
// main.dart
// debugShowCheckedModeBanner: false

import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false, // disable debug banner
      home: Scaffold(
        appBar: AppBar(
          title: const Text('I Am Rich man'),
        ),
      ),
    ),
  );
}
```

### syntax
#### set property
##### set color
``` dart
// backgroundColor: Colors.blueGrey[900],

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false, // disable debug banner
      home: Scaffold(
        appBar: AppBar(
          title: const Text('I Am Rich'),
          backgroundColor: Colors.blueGrey[900],
        ),
      ),
    ),
  );
}
```

### package
#### class 
+ [Scaffold class](https://docs-flutter-io.firebaseapp.com/flutter/material/Scaffold-class.html)
+ [MaterialApp class](https://api.flutter.dev/flutter/material/MaterialApp-class.html)
+ [MaterialColor class](https://api.flutter.dev/flutter/material/MaterialColor-class.html)

### reference
+ [Flutter-Course-Resources](https://github.com/londonappbrewery/Flutter-Course-Resources)
+ [Draw.io](https://app.diagrams.net/)
+ [icon generate](https://appicon.co/)
+ [Material Design - The color system](https://material.io/design/color/the-color-system.html)
+ [icons8 icon](https://icons8.com/)
+ [vecteezy free image](https://www.vecteezy.com/)
+ [canva desing](https://www.canva.com/zh_tw/)