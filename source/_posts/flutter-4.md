---
title: Flutter - MiCard
abbrlink: f7b9
date: 2022-08-24 15:36:59
categories: Coding
tags:
	- flutter
---
### snippets
``` dart
stle : StatelessWidget
stf : StatefulWidget
flo : floatingActionButton --> , value: FAB --> floatingActionButton

Ctrl+J : shwo quickly docs
Container/Row(option/Alt enter) : select widget(wrap widget), then chenge widget to SaftArea/Padding 
```

<!--more-->

### setting 
#### Flutter Inspector
<div style="width:500px">
	{% asset_img pic1.jpg pic1 %}
</div>

### clone from github
+ File -> New -> Project from Version Control --> press the "github link"
  因版本差異有時有執行困難
+ New project : File -> New -> New Flutter Project


### Hot Reload and Hot Restar

+ hot reload : press lighting or save file
+ hot restart : press blue block

#### change to Stateless wedget 
##### main.dart - original
``` dart
void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.red,
        body: Container(),
      ),
    ),
  );
}
```

##### main.dart - add stateless widget
+ press hot reload button then update change 
+ save file automtic trigger hot reload
+ just update change, so react so quickly 
``` dart
void main() {
  runApp(
    MyApp()
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.white,
        body: Container(),
      ),
    );
  }
}
```

#### donuts count

``` dart
void main() {
  runApp(MaterialApp(
      home: MainPage(),
  ));
}

class MainPage extends StatefulWidget {
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int nDonuts = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:AppBar(
        backgroundColor: Colors.blue,
        title: Text("Demo"),
      ),
      body: Center(
        // child: Text("My name is Robert."),
        child: Text(
          "Number of Donuts eaten: $nDonuts",
          style: TextStyle(
            fontSize: 40.0,
          ),
        )),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.red,
        child: Icon(Icons.add),
        onPressed: () {
          setState(() {
            nDonuts++;
          });
          // print("Floating Action Button Clicked!");
        }
      ),
    );
  }
}
```

### Container

#### single-child
Container(option/Alt enter) -> widget(wrap widget), then chenge widget to SaftArea(put cantain at Safe Area) 

``` dart
void main() {
  runApp(
      MyApp()
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.teal,
        body: SafeArea(  // kyp: put to save area
          child: Container(
            // kyp: set size, margin, padding
            height: 100.0,
            width: 100.0,
            // margin: EdgeInsets.all(20.0),
            // margin: EdgeInsets.symmetric(vertical: 50.0, horizontal: 10.0),
            // margin: EdgeInsets.fromLTRB(30.0, 10.0, 50.0, 20.0),
            margin: EdgeInsets.only(left: 30.0),
            padding: EdgeInsets.all(20.0),
            color: Colors.white,
            child:Text("Hello"),
          ),
        ),
    );
      ),
  }
}
```

#### Multi-child layout widgets
``` dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.teal,
        body: SafeArea(  // kyp: put to save area
          // child: Column(
          child: Row(
            // kyp: limit by minimum
            // mainAxisSize: MainAxisSize.min,
            // kyp: bottom up(down is default
            // verticalDirection: VerticalDirection.up,
            // kyp: alignment position
            // mainAxisAlignment: MainAxisAlignment.end,
            // mainAxisAlignment: MainAxisAlignment.center,
            // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            // kyp: horizontal (container width must different)
            // crossAxisAlignment: CrossAxisAlignment.end,
            // kyp: stretch child(container width don't need
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                height: 100.0,
                width: 100.0,
                color: Colors.white,
                child:Text("Container 1"),
              ),
              // kyp: add 2 container space
              SizedBox(height:20.0),
              Container(
                width: 100.0,
                height: 100.0,
                color: Colors.blue,
                child: Text("Container 2")
              ),
              Container(
                  width:100.0,
                  height: 100.0,
                  color: Colors.red,
                  child: Text("Container 3")
              ),
              // Container(
              //   width: double.infinity,
              //   height: 10.0,
              //   color: Colors.yellow,
              // ),
            ],
          ),
        ),
      ),
    );
  }
}
```

#### Flutter Layouts Challenge
<div style="width:300px">
	{% asset_img pic2.jpg pic2 %}
</div>

``` dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.teal,
        body: SafeArea(  // kyp: put to save area
          // child: Column(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                width: 100.0,
                color: Colors.red,
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    height: 100.0,
                    width : 100.0,
                    color: Colors.yellow,
                  ),
                  Container(
                    height: 100.0,
                    width : 100.0,
                    color: Colors.green,
                  ),
                  Container(),
                ],
              ),
              Container(
                  width:100.0,
                  color: Colors.blue,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### load image/fonts
``` yaml
  # kyp: add diamond image
  assets:
  # - images/diamond.png
    - images/

  # kyp: add load font
  fonts:
    - family: Pacifico
      fonts:
        - asset: fonts/Pacifico-Regular.ttf
    - family: Merriweather
      fonts:
        - asset: fonts/Merriweather-Italic.ttf
```

``` dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.teal,
        body: SafeArea(  // kyp: put to save area
          child: Column(
            children: [
              CircleAvatar(
                // backgroundColor: Colors.red,
                // need add below
                // assets:
                //   - images/diamond.png
                // or
                //   - images/
                backgroundImage: AssetImage('images/diamond.png'),
                radius: 50.0,
              ),
              Text(
                  "Robert Kao",
                  style: TextStyle(
                    // kyp: add load font
                    fontFamily: 'Pacifico',
                    fontSize: 30.0,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
              ),
              // down font from https://fonts.google.com/
              // font : Pacifico
              // create directory fonts then copy .ttf to
              Text(
                "FLUTTER DEVELOPER",
                style: TextStyle(
                  // kyp: add load font
                  fontFamily: 'Merriweather',
                  fontSize: 20.0,
                  color: Colors.teal[100],
                  letterSpacing: 2.5,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### Adding Material Icons with the Icon Widget
``` dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.teal,
        body: SafeArea(  // kyp: put to save area
          child: Column(
            children: [
              CircleAvatar(
                // backgroundColor: Colors.red,
                // need add below
                // assets:
                //   - images/diamond.png
                // or
                //   - images/
                backgroundImage: AssetImage('images/diamond.png'),
                radius: 50.0,
              ),
              Text(
                  "Robert Kao",
                  style: TextStyle(
                    // kyp: add load font
                    fontFamily: 'Pacifico',
                    fontSize: 30.0,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
              ),
              // down font from https://fonts.google.com/
              // font : Pacifico
              // create directory fonts then copy .ttf to
              Text(
                "FLUTTER DEVELOPER",
                style: TextStyle(
                  // kyp: add load font
                  fontFamily: 'Merriweather',
                  fontSize: 20.0,
                  color: Colors.teal[100],
                  letterSpacing: 2.5,
                  fontWeight: FontWeight.bold,
                ),
              ),
              // icon list : https://fonts.google.com/icons
              // color palette : https://www.materialpalette.com/
              // color name : https://www.materialpalette.com/colors
              Container(
                color: Colors.white,
                margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 25.0),
                padding: EdgeInsets.all(10.0),
                child: Row(
                  children: [
                    Icon(
                        Icons.phone,
                        color: Colors.teal,
                    ),
                    SizedBox(
                      width: 10.0,
                    ),
                    Text(
                        "+44 123 456 789",
                        style: TextStyle(
                          color: Colors.teal.shade900,
                          fontFamily: 'Merriweather',
                          fontSize: 20.0,
                        ),
                    )
                  ],
                ),
              ),
              Container(
                color: Colors.white,
                margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 25.0),
                padding: EdgeInsets.all(10.0),
                child: Row(
                  children: [
                    Icon(
                      Icons.email,
                      color: Colors.teal,
                    ),
                    SizedBox(
                      width: 10.0,
                    ),
                    Text(
                      "robert@gmail.com",
                      style: TextStyle(
                        color: Colors.teal.shade900,
                        fontFamily: 'Merriweather',
                        fontSize: 20.0,
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
```

### Flutter Card & ListTile Widgets
``` dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.teal,
        body: SafeArea(  // kyp: put to save area
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                // backgroundColor: Colors.red,
                // need add below
                // assets:
                //   - images/diamond.png
                // or
                //   - images/
                backgroundImage: AssetImage('images/diamond.png'),
                radius: 50.0,
              ),
              Text(
                  "Robert Kao",
                  style: TextStyle(
                    // kyp: add load font
                    fontFamily: 'Pacifico',
                    fontSize: 30.0,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
              ),
              // down font from https://fonts.google.com/
              // font : Pacifico
              // create directory fonts then copy .ttf to
              Text(
                "FLUTTER DEVELOPER",
                style: TextStyle(
                  // kyp: add load font
                  fontFamily: 'Merriweather',
                  fontSize: 20.0,
                  color: Colors.teal[100],
                  letterSpacing: 2.5,
                  fontWeight: FontWeight.bold,
                ),
              ),
              // add line
              SizedBox(
                height: 20.0,
                width: 150.0,
                child: Divider(
                  color: Colors.teal.shade100,
                )
              ),
              // icon list : https://fonts.google.com/icons
              // color palette : https://www.materialpalette.com/
              // color name : https://www.materialpalette.com/colors
              Card(
                // color: Colors.white, (default, so don't need)
                margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 25.0),
                // change Row to listTitle
                child: ListTile(
                  leading: Icon(
                      Icons.phone,
                      color: Colors.teal,
                  ),
                  title: Text(
                    "+44 123 456 789",
                    style: TextStyle(
                      color: Colors.teal.shade900,
                      fontFamily: 'Merriweather',
                      fontSize: 20.0,
                    ),
                  ),
                ),

                // class add pdding
                // child: Padding(
                //   padding: EdgeInsets.all(10.0),
                //   child: Row(
                //     children: [
                //       Icon(
                //           Icons.phone,
                //           color: Colors.teal,
                //       ),
                //       SizedBox(
                //         width: 10.0,
                //       ),
                //       Text(
                //           "+44 123 456 789",
                //           style: TextStyle(
                //             color: Colors.teal.shade900,
                //             fontFamily: 'Merriweather',
                //             fontSize: 20.0,
                //           ),
                //       )
                //     ],
                //   ),
                // ),
              ),
              Card(
                // color: Colors.white, (default, so don't need)
                margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 25.0),
                // change Row to listTitle
                child: ListTile(
                  leading: Icon(
                    Icons.email,
                    color: Colors.teal,
                  ),
                  title: Text(
                    "robert@gmail.com",
                    style: TextStyle(
                      color: Colors.teal.shade900,
                      fontFamily: 'Merriweather',
                      fontSize: 20.0,
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
```

### reference
+ [Flutter Layout Cheat Sheet](https://medium.com/flutter-community/flutter-layout-cheat-sheet-5363348d037e)
+ [google fonts](https://fonts.google.com/)
+ [icon list](https://fonts.google.com/icons)
+ [color palette](https://www.materialpalette.com/)
+ [color name](https://www.materialpalette.com/colors)
