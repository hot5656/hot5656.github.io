---
title: The Complete Flutter Development Course - Taskly
abbrlink: f2b9
date: 2025-03-01 12:02:25
categories: Coding
tags:
	- flutter
---

### Add flutter package
#### pubspec.yaml
``` yaml
dependencies:
  flutter:
    sdk: flutter

  # kyp: hive
  hive: ^2.2.3
  # kyp: hive_flutter
  hive_flutter: ^1.1.0
```

<!--more-->

#### install flutter package by terminal 
``` bash
flutter pub get
```

### Coding
#### Create Statefu lWidget
##### lib/main.dart
``` dart
import 'package:flutter/material.dart';
import 'package:taskly/pages/home_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Taskly',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.red),
      ),
      home: HomePage(),
    );
  }
}
```

##### lib/pages/home_page.dart
``` dart
import 'package:flutter/material.dart';

// 定義 HomePage 為 StatefulWidget
class HomePage extends StatefulWidget {
  HomePage();

  // kyp: StatefulWidget use create
  @override
  State<HomePage> createState() {
    return _HomePageState();
  }
}

// 定義 _HomePageState，管理 HomePage 的狀態
class _HomePageState extends State<HomePage> {
  _HomePageState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text("data"),
      ),
    ); 
  }
}
```

#### Create App Bar
##### lib/pages/home_page.dart
``` dart
// 定義 _HomePageState，管理 HomePage 的狀態
class _HomePageState extends State<HomePage> {
  late double _deviceHeight, _deviceWidth;

  _HomePageState();

  @override
  Widget build(BuildContext context) {
    _deviceHeight = MediaQuery.of(context).size.height;
    _deviceWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        toolbarHeight: _deviceHeight * 0.15,
        title: Text(
          "Taskly!",
          style: TextStyle(
            fontSize: 25,
            color: Colors.white,
          )
        ),
      ),
      // body: Center(
      //   child: Text("data"),
      // ),
    ); 
  }
}
```

#### Add ListView and ListTile Widget 
##### lib/pages/home_page.dart
``` dart
// 定義 _HomePageState，管理 HomePage 的狀態
class _HomePageState extends State<HomePage> {
  late double _deviceHeight, _deviceWidth;

  _HomePageState();

  @override
  Widget build(BuildContext context) {
    _deviceHeight = MediaQuery.of(context).size.height;
    _deviceWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        toolbarHeight: _deviceHeight * 0.15,
        title: const Text(
          "Taskly!",
          style: TextStyle(
            fontSize: 25,
            color: Colors.white,
          )
        ),
      ),
      body: _tasksList(),
    ); 
  }

  Widget _tasksList() {
    return ListView(
      children: [
        ListTile(
          title: Text(
            "Do Laundry!",
            style: TextStyle(decoration: TextDecoration.lineThrough),
          ),
          subtitle: Text(DateTime.now().toString()),
          trailing: const Icon(
            Icons.check_box_outlined,
            color: Colors.red,
          ),
        ),
      ],
    );
  }
}
```

#### Add Float Action Button 
##### lib/pages/home_page.dart
``` dart
// 定義 _HomePageState，管理 HomePage 的狀態
class _HomePageState extends State<HomePage> {
  late double _deviceHeight, _deviceWidth;

  _HomePageState();

  @override
  Widget build(BuildContext context) {
    _deviceHeight = MediaQuery.of(context).size.height;
    _deviceWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        toolbarHeight: _deviceHeight * 0.15,
        title: const Text(
          "Taskly!",
          style: TextStyle(
            fontSize: 25,
            color: Colors.white,
          )
        ),
      ),
      body: _tasksList(),
      floatingActionButton: _addTaskButton(),
    ); 
  }

  Widget _addTaskButton() {
    return FloatingActionButton(
      backgroundColor: Colors.red,
      shape: CircleBorder(),
      onPressed: () {
        // print("Pressed Button");
      },
      child: const Icon(
        Icons.add,
        color: Colors.white,
      ),
    );
  }
```

#### Inititial Hive 
##### lib/main.dart
``` dart
import 'package:flutter/material.dart';
import 'package:taskly/pages/home_page.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  // init Hive, create directory ./hive_boxes
  await Hive.initFlutter("hive_boxes");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Taskly',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.red),
      ),
      home: HomePage(),
    );
  }
}
```

#### Create Task Model Class 
##### lib/models/task.dart
``` dart
class Task {
  String content;
  DateTime timestamp;
  bool done;

  Task({
    required this.content, 
    required this.timestamp, 
    required this.done, 
  });

  // 工廠建構函數 (factory constructor)，用來 從 Map 創建 Task 物件
  factory Task.fromMap(Map task) {
    return Task(content: task["content"], timestamp: task["timestamp"], done: task["done"]);
  }

  // 將 Task 轉換成 Map
  Map toMap() {
    return {
      "content": content,
      "timestamp": timestamp,
      "done": done,
    };
  }
}
```

#### TextField and SetState in Flutter
##### lib/pages/home_page.dart
``` dart
// 定義 _HomePageState，管理 HomePage 的狀態
class _HomePageState extends State<HomePage> {
  late double deviceHeight, deviceWidth;

  String? _newTaskContent;

  _HomePageState();

  // 繪製時執行
  @override
  Widget build(BuildContext context) {
    deviceHeight = MediaQuery.of(context).size.height;
    deviceWidth = MediaQuery.of(context).size.width;
    print("Input Value: $_newTaskContent");
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        toolbarHeight: deviceHeight * 0.15,
        title: const Text(
          "Taskly!",
          style: TextStyle(
            fontSize: 25,
            color: Colors.white,
          )
        ),
      ),
      body: _tasksList(),
      floatingActionButton: _addTaskButton(),
    ); 
  }

  Widget _tasksList() {
    return ListView(
      children: [
        ListTile(
          title: Text(
            "Do Laundry!",
            style: TextStyle(decoration: TextDecoration.lineThrough),
          ),
          subtitle: Text(DateTime.now().toString()),
          trailing: const Icon(
            Icons.check_box_outlined,
            color: Colors.red,
          ),
        ),
      ],
    );
  }

  Widget _addTaskButton() {
    return FloatingActionButton(
      backgroundColor: Colors.red,
      shape: CircleBorder(),
      onPressed: () {
        // 傳遞 context,
        _displayTaskPopup(context); // 確保是 callback，而不是立即執行
      }, 
      child: const Icon(
        Icons.add,
        color: Colors.white,
      ),
    );
  }

  void _displayTaskPopup(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Add new Task"),
          content: TextField(
            // 按下 Enter（onSubmitted）後，關閉對話框，但不會存儲任務
            onSubmitted: (value) {
              // setState(() {
              //   _newTaskContent = value;
              // });
              Navigator.pop(context); // 按下 Enter 後關閉 AlertDialog
            },
            // onChanged 會更新 _newTaskContent
            onChanged: (value) {
              // setState() 會通知 Flutter 重新執行 build()，讓 UI 重新顯示最新的 counter 值
              setState(() {
                _newTaskContent = value;
              });
            },
          ),
        );
      },
    );
  }
}
``` 