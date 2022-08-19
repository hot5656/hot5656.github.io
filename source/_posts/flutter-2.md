---
title: Flutter 1st app - I am rich
abbrlink: f539
date: 2022-06-30 15:19:34
categories: Coding
tags:
	- flutter
---

### create flutter project
<div style="width:600px">
	{% asset_img pic1_0.png pic1_0 %}
</div>
<div style="width:600px">
	{% asset_img pic1.png pic1 %}
</div>

<!--more-->

### modify main.dart
``` dart
// main.dart

import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Center(
        child: Text('Hello world'),
      ),
    ),
  );
}
```

### center image by network
``` dart
// main.dart

import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false, // disable debug banner
      home: Scaffold(
        backgroundColor: Colors.blueGrey,
        appBar: AppBar(
          title: const Text('I Am Rich'),
          backgroundColor: Colors.blueGrey[900],
        ),
        body: const Center(
          child: Image(
            image: NetworkImage(
                'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d6b3b18f6.jpeg'),
          ),
        ),
      ),
    ),
  );
}
```

<div style="width:300px">
	{% asset_img pic2.png pic2 %}
</div>

### change to asset image 
#### copy image file to ./images/diamond.png

#### modify pubspec.yaml(configuration file)
``` yaml
name: i_am_rich
description: A new Flutter project.
publish_to: 'none' # Remove this line if you wish to publish to pub.dev
version: 1.0.0+1

environment:
  sdk: ">=2.17.1 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
  assets:
#    - images/diamond.png
#enable all image in /images
    - images/diamond.png
```
#### run pubspec.yaml
Pub get
<div style="width:800px">
	{% asset_img pic3.png pic3 %}
</div>

#### modify 
``` dart
// main.dart

import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false, // disable debug banner
      home: Scaffold(
        backgroundColor: Colors.blueGrey,
        appBar: AppBar(
          title: const Text('I Am Rich'),
          backgroundColor: Colors.blueGrey[900],
        ),
        body: const Center(
          child: Image(image: AssetImage('images/diamond.png')),
        ),
      ),
    ),
  );
}
```

#### result
<div style="width:300px">
	{% asset_img pic4.png pic4 %}
</div>

### change icon
#### generate icon
<div style="width:400px">
	{% asset_img pic5.png pic5 %}
</div>

#### android icon remove and update
<div style="width:600px">
	{% asset_img pic6.png pic6 %}
</div>

<div style="width:600px">
	{% asset_img pic7.png pic7 %}
</div>

#### ios icon remove and update
<div style="width:600px">
	{% asset_img pic8.png pic8 %}
</div>

<div style="width:600px">
	{% asset_img pic9.png pic9 %}
</div>

### alignment  android icon
#### sleect icon
<div style="width:600px">
	{% asset_img pic10.png pic10 %}
</div>

new window
<div style="width:400px">
	{% asset_img pic11.png pic11 %}
</div>

<div style="width:600px">
	{% asset_img pic12.png pic12 %}
</div>

<div style="width:600px">
	{% asset_img pic13.png pic13 %}
</div>

select icon image
<div style="width:600px">
	{% asset_img pic14.png pic14 %}
</div>

align icon
<div style="width:600px">
	{% asset_img pic15.png pic15 %}
</div>

<div style="width:600px">
	{% asset_img pic16.png pic16 %}
</div>

#### check new icon file
<div style="width:600px">
	{% asset_img pic17.png pic17 %}
</div>

<div style="width:600px">
	{% asset_img pic18.png pic18 %}
</div>

#### check icon display
before 
<div style="width:400px">
	{% asset_img pic19.png pic19 %}
</div>

after
<div style="width:400px">
	{% asset_img pic20.png pic20 %}
</div>
