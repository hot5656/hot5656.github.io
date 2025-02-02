---
title: Flutter - Dice
abbrlink: '3638'
date: 2025-01-30 11:07:13
categories: Coding
tags:
	- flutter
---

### original
``` dart
void main() {
  return runApp(
    MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.red,
        appBar: AppBar(
          title: Text('Dicee'),
          backgroundColor: Colors.red,
        ),
        body: DicePage(),
      ),
    ),
  );
}

class DicePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

<!--more-->

###  Using the Expanded Widget to Create Flexible Layouts
``` dart
void main() {
  return runApp(
    MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.red,
        appBar: AppBar(
          title: Text('Dicee'),
          backgroundColor: Colors.red,
        ),
        body: DicePage(),
      ),
    ),
  );
}

class DicePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // kyp: expanded
        Expanded(
          // kyp: ratio
          // flex:2,
          // child: Image(
          //   image: AssetImage("images/dice1.png"),
          // ),
          // kyp: more simple
          child: Image.asset("images/dice1.png"),
        ),
        Expanded(
          // flex:1,
          child: Image.asset("images/dice1.png"),
        ),
      ],
    );
  }
}
```
