---
title: Flutter Issue
abbrlink: 35f8
date: 2022-08-17 13:59:23
categories: Coding
tags:
	- flutter
	- issue
---

### flutter doctor
```  bash
flutter.bat doctor --verbose
```
<!--more-->

#### cmdline-tools component is missing

##### message
```  bash
D:\app\src\flutter\flutter\bin\flutter.bat doctor --verbose

[!] Android toolchain - develop for Android devices (Android SDK version 33.0.0)
    • Android SDK at C:\Users\robertkao\AppData\Local\Android\sdk
    X cmdline-tools component is missing
      Run `path/to/sdkmanager --install "cmdline-tools;latest"`
      See https://developer.android.com/studio/command-line for more details.
    X Android license status unknown.
      Run `flutter doctor --android-licenses` to accept the SDK licenses.
      See https://flutter.dev/docs/get-started/install/windows#android-setup for more details.

[X] Visual Studio - develop for Windows
    X Visual Studio not installed; this is necessary for Windows development.
      Download at https://visualstudio.microsoft.com/downloads/.
      Please install the "Desktop development with C++" workload, including all of its default components


! Doctor found issues in 2 categories.
Process finished with exit code 0
```

##### Install Android SDK Command-line Tools(latest) 
<div style="width:600px">
	{% asset_img pic1.png pic1 %}
</div>

<div style="width:600px">
	{% asset_img pic2.png pic2 %}
</div>



####  Android licenses is taking an unexpectedly

##### message
```  bash
D:\>flutter.bat doctor --verbose

Checking Android licenses is taking an unexpectedly long time...[!] Android toolchain - develop for Android devices (Android SDK version 33.0.0)
    • Android SDK at C:\Users\robertkao\AppData\Local\Android\sdk
    • Platform android-33, build-tools 33.0.0
    • Java binary at: D:\app\Android\Android Studio\jre\bin\java
    • Java version OpenJDK Runtime Environment (build 11.0.12+7-b1504.28-7817840)
    ! Some Android licenses not accepted.  To resolve this, run: flutter doctor --android-licenses

[X] Visual Studio - develop for Windows
    X Visual Studio not installed; this is necessary for Windows development.
      Download at https://visualstudio.microsoft.com/downloads/.
      Please install the "Desktop development with C++" workload, including all of its default components

! Doctor found issues in 2 categories.
```

##### fix Android licenses

``` bash
# all response press 'y'
flutter doctor --android-licenses
```

#### Visual Studio not installed

##### message
```
D:\>flutter.bat doctor --verbose

[X] Visual Studio - develop for Windows
    X Visual Studio not installed; this is necessary for Windows development.
      Download at https://visualstudio.microsoft.com/downloads/.
      Please install the "Desktop development with C++" workload, including all of its default components

! Doctor found issues in 1 category.
```

##### install Visual Studio's "Desktop development with C++"
C: 131G to 120G (2022.08.16)

<div style="width:600px">
	{% asset_img pic3.png pic3 %}
</div>

### Emulator LockDown
<div style="width:300px">
	{% asset_img pic11.png pic11 %}
</div>

#### set boot option to cold boot 
<div style="width:600px">
	{% asset_img pic12.png pic12 %}
</div>

<div style="width:600px">
	{% asset_img pic13.png pic13 %}
</div>

<div style="width:600px">
	{% asset_img pic14.png pic14 %}
</div>

#### exist Android Studio

#### deleted emulator .lock file
<div style="width:600px">
	{% asset_img pic15.png pic15 %}
</div>

#### start Android Studio, run emulator

### project issue
#### Your project requires a higher compileSdkVersion
```
┌─ Flutter Fix ──────────────────────────────────────────────────┐
│ [!] Your project requires a higher compileSdkVersion.          │
│ Fix this issue by bumping the compileSdkVersion in             │
│ D:\work\run\flutter\mi_card_flutter2\android\app\build.gradle: │
│ android {                                                      │
│   compileSdkVersion 31                                         │
│ }                                                              │
└────────────────────────────────────────────────────────────────┘
```

##### fix build.gradle (change 29 to 31)
``` 
android {
    compileSdkVersion 31

}
```
