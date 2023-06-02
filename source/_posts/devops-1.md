---
title: devops-1
abbrlink: 1dda
date: 2023-05-26 16:14:44
categories:
tags:
---

### 說明

####  DevOps
+ Continuous Integration(CI)
+ Continuous Delivery(CD)

<!--more-->

#### course TOOLS
+ VirtualBox
+ Git Bash
+ Vagrant
+ Chocolatey : 是一個Windows下的軟體套件管理器，讓使用者可以像在類Unix系統中使用Yum和APT一樣使用它
+ homebrew
+ JDK8(JAVA)
+ Maven : 專案管理與自動化建構工具，主要用於Java 專案，但也支援C#、Ruby、Scala 
+ IntelliJ IDEA : 一種商業化銷售的Java整合式開發環境工具軟體
+ Sublime
+ AWS CLI

#### course signup
+ GitHub
+ GoDaddy(Domain purchase)
+ Docker Hub
+ SonarCloud(AWS)

#### course for AWS work
+ free tier account
+ IAM with MFA
+ billing alarm
+ certificate setup


### setup
#### inatsll Chocolatey

``` bash
# check windows state
PS C:\Windows\system32>  Get-ExecutionPolicy 
	RemoteSigned                                                                                                            
PS C:\Windows\system32> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
	Forcing web requests to allow TLS v1.2 (Required for requests to Chocolatey.org)
	Getting latest version of the Chocolatey package for download.
	Not using proxy.
	Getting Chocolatey from https://community.chocolatey.org/api/v2/package/chocolatey/2.0.0.
	Downloading https://community.chocolatey.org/api/v2/package/chocolatey/2.0.0 to C:\Users\ROBERT~1\AppData\Local\Temp\chocolatey\chocoInstall\chocolatey.zip
	Not using proxy.
	Extracting C:\Users\ROBERT~1\AppData\Local\Temp\chocolatey\chocoInstall\chocolatey.zip to C:\Users\ROBERT~1\AppData\Local\Temp\chocolatey\chocoInstall
	Installing Chocolatey on the local machine
	Creating ChocolateyInstall as an environment variable (targeting 'Machine')
		Setting ChocolateyInstall to 'C:\ProgramData\chocolatey'
	WARNING: It's very likely you will need to close and reopen your shell
		before you can use choco.
	Restricting write permissions to Administrators
	We are setting up the Chocolatey package repository.
	The packages themselves go to 'C:\ProgramData\chocolatey\lib'
		(i.e. C:\ProgramData\chocolatey\lib\yourPackageName).
	A shim file for the command line goes to 'C:\ProgramData\chocolatey\bin'
		and points to an executable in 'C:\ProgramData\chocolatey\lib\yourPackageName'.

	Creating Chocolatey folders if they do not already exist.

	chocolatey.nupkg file not installed in lib.
	Attempting to locate it from bootstrapper.
	PATH environment variable does not have C:\ProgramData\chocolatey\bin in it. Adding...
	警告: Not setting tab completion: Profile file does not exist at
	'C:\Users\robertkao\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1'.
	Chocolatey (choco.exe) is now ready.
	You can call choco from anywhere, command line or powershell by typing choco.
	Run choco /? for a list of functions.
	You may need to shut down and restart powershell and/or consoles
	first prior to using choco.
	Ensuring Chocolatey commands are on the path
	Ensuring chocolatey.nupkg is in the lib folder
PS C:\Windows\system32>
```

#### basic check
``` bash
# check version
PS C:\Windows\system32> choco
	Chocolatey v2.0.0
	Please run 'choco -?' or 'choco <command> -?' for help menu.
# check install package
PS C:\Windows\system32> choco list
	Chocolatey v2.0.0
	chocolatey 2.0.0
	1 packages installed.
# install chocolatey gui
PS C:\Windows\system32> choco install chocolateygui
	Chocolatey v2.0.0
	Installing the following packages:
	chocolateygui
	By installing, you accept licenses for the packages.
	Progress: Downloading chocolatey-compatibility.extension 1.0.0... 100%

	chocolatey-compatibility.extension v1.0.0 [Approved]
	chocolatey-compatibility.extension package files install completed. Performing other installation steps.
	Installed/updated chocolatey-compatibility extensions.
	The install of chocolatey-compatibility.extension was successful.
		Software installed to 'D:\app\chocolatey\extensions\chocolatey-compatibility'
	Progress: Downloading chocolatey-core.extension 1.4.0... 100%

	chocolatey-core.extension v1.4.0 [Approved]
	chocolatey-core.extension package files install completed. Performing other installation steps.
	Installed/updated chocolatey-core extensions.
	The install of chocolatey-core.extension was successful.
		Software installed to 'D:\app\chocolatey\extensions\chocolatey-core'
	Progress: Downloading chocolatey-dotnetfx.extension 1.0.1... 100%

	chocolatey-dotnetfx.extension v1.0.1 [Approved]
	chocolatey-dotnetfx.extension package files install completed. Performing other installation steps.
	Installed/updated chocolatey-dotnetfx extensions.
	The install of chocolatey-dotnetfx.extension was successful.
		Software installed to 'D:\app\chocolatey\extensions\chocolatey-dotnetfx'
	Progress: Downloading KB2919442 1.0.20160915... 100%

	KB2919442 v1.0.20160915 [Approved]
	KB2919442 package files install completed. Performing other installation steps.
	The package KB2919442 wants to run 'ChocolateyInstall.ps1'.
	Note: If you don't run this script, the installation will fail.
	Note: To confirm automatically next time, use '-y' or consider:
	choco feature enable -n allowGlobalConfirmation
	Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y

	Skipping installation because this hotfix only applies to Windows 8.1 and Windows Server 2012 R2.
	The install of KB2919442 was successful.
		Software install location not explicitly set, it could be in package or
		default install location of installer.
	Progress: Downloading KB2919355 1.0.20160915... 100%

	KB2919355 v1.0.20160915 [Approved]
	KB2919355 package files install completed. Performing other installation steps.
	The package KB2919355 wants to run 'ChocolateyInstall.ps1'.
	Note: If you don't run this script, the installation will fail.
	Note: To confirm automatically next time, use '-y' or consider:
	choco feature enable -n allowGlobalConfirmation
	Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y

	Skipping installation because this hotfix only applies to Windows 8.1 and Windows Server 2012 R2.
	The install of KB2919355 was successful.
		Software install location not explicitly set, it could be in package or
		default install location of installer.
	Progress: Downloading dotnetfx 4.8.0.20220524... 100%

	dotnetfx v4.8.0.20220524 [Approved]
	dotnetfx package files install completed. Performing other installation steps.
	The package dotnetfx wants to run 'ChocolateyInstall.ps1'.
	Note: If you don't run this script, the installation will fail.
	Note: To confirm automatically next time, use '-y' or consider:
	choco feature enable -n allowGlobalConfirmation
	Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y

	Microsoft .NET Framework 4.8 or later is already installed.
	The install of dotnetfx was successful.
		Software install location not explicitly set, it could be in package or
		default install location of installer.
	Progress: Downloading ChocolateyGUI 2.0.0... 100%

	chocolateygui v2.0.0 [Approved]
	chocolateygui package files install completed. Performing other installation steps.
	The package chocolateygui wants to run 'chocolateyInstall.ps1'.
	Note: If you don't run this script, the installation will fail.
	Note: To confirm automatically next time, use '-y' or consider:
	choco feature enable -n allowGlobalConfirmation
	Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y

	Installing ChocolateyGUI...
	ChocolateyGUI has been installed.
	Added D:\app\chocolatey\bin\chocolateygui.exe shim pointed to 'c:\program files (x86)\chocolatey gui\chocolateygui.exe'.
	Added D:\app\chocolatey\bin\chocolateyguicli.exe shim pointed to 'c:\program files (x86)\chocolatey gui\chocolateyguicli.exe'.
		chocolateygui may be able to be automatically uninstalled.
	The install of chocolateygui was successful.
		Software installed as 'msi', install location is likely default.

	Chocolatey installed 7/7 packages.
	See the log for details (D:\app\chocolatey\logs\chocolatey.log).

	Installed:
	- chocolatey-compatibility.extension v1.0.0
	- chocolatey-core.extension v1.4.0
	- chocolatey-dotnetfx.extension v1.0.1
	- chocolateygui v2.0.0
	- dotnetfx v4.8.0.20220524
	- KB2919355 v1.0.20160915
	- KB2919442 v1.0.20160915

	Did you know the proceeds of Pro (and some proceeds from other
	licensed editions) go into bettering the community infrastructure?
	Your support ensures an active community, keeps Chocolatey tip-top,
	plus it nets you some awesome features!
	https://chocolatey.org/compare

PS C:\Windows\system32> choco list
	Chocolatey v2.0.0
	chocolatey 2.0.0
	chocolatey-compatibility.extension 1.0.0
	chocolatey-core.extension 1.4.0
	chocolatey-dotnetfx.extension 1.0.1
	chocolateygui 2.0.0
	dotnetfx 4.8.0.20220524
	KB2919355 1.0.20160915
	KB2919442 1.0.20160915
	8 packages installed.
# install Firefox ESR
choco install firefoxesr
```

#### move chocolatery to another directory
``` bash 
# change PATH
D:\app\chocolatey\bin
# change env ChocolateyInstall
ChocolateyInstall = D:\app\chocolatey
```

#### instal tool for course
``` bash
# install package for the course
# select vprofile project branch "prereqs"
choco install vagrant --version=2.3.4 -y
choco install corretto11jdk -y
choco install maven -y
choco install awscli -y
```

### Ref
+ [DevOps Material](https://github.com/imnowdevops/ddc-material)
+ [vprofile project](https://github.com/devopshydclub/vprofile-project)
+ [Installing Chocolatey](https://chocolatey.org/install)
+ [Community Maintained Packages](https://community.chocolatey.org/packages)