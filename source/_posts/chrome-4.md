---
title: Chrome Extension(subtitle)
abbrlink: '1461'
date: 2023-09-21 11:24:15
categories: Coding
tags:
  - chrome
---

### reference code 
#### chrome extension
##### link click listen

<!--more-->

``` js
// Attach the click event listener to the entire document
document.addEventListener('click', handleLinkClick)

// Function to handle link clicks
function handleLinkClick(event) {
  let isRun = false
  // console.log('=====================================')
  // console.log('handleLinkClick', event)

  setTimeout(() => {
    if (typeof event.target.className === 'string') {
      if (event.target.className === 'subtitle-label') {
        checkActiveChange()
        isRun = true
      }
    }
    if ('childNodes' in event.target && !isRun) {
      if (event.target.childNodes.length >= 2) {
        if (event.target.childNodes[1].className === 'subtitle-label') {
          checkActiveChange()
          isRun = true
        }
      }
    }

    if (!isRun) {
      if (event.target.baseURI.includes('lecture')) {
        let courseStateElements = document.querySelector('#course-satae')
        if (!courseStateElements) {
          dualMode = false
          checkInterval()
        }
      }
    }
  }, 300)
}
``` 

##### message from popup to contentScript
###### messageType.js
``` js
export const DOWNLOAD_SUBTITLE = 'download chinese subtitle'
export const SHOW_ACTIVE = 'show active'
export const LANGUGAES_INFO = 'languages info'
export const UDAL_MODE = 'dual mode'
```

###### popup.js
``` js
import { LANGUGAES_INFO, UDAL_MODE } from '../utils/messageType'

sendMessageToContentScript(LANGUGAES_INFO, { message: LANGUGAES_INFO })
sendMessageToContentScript(UDAL_MODE, {
  message: UDAL_MODE,
  duleMode: event.target.value === DUAL_ON,
  secondLanguage: languageType2,
})

function sendMessageToContentScript(messageType, messages) {
  // console.log('sendMessageToContentScript:', messages)
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      // console.log(tabs)
      if (tabs.length > 0) {
        // console.log(tabs[0].url)
        if (
          tabs[0].url.includes('lecture') &&
          tabs[0].url.match('https://www.coursera.org/learn/*')
        ) {
          chrome.tabs.sendMessage(tabs[0].id, messages, (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError)
            }

            // console.log('response:', response)
            if (response) {
              setResponseMessage(response.message)
              if (messageType === LANGUGAES_INFO) {
                setLanguageOptions(response.languages)
                if (response.languages.length > 0) {
                  chrome.storage.sync.get(
                    ['language2ndCoursera', 'dualTitleCoursera'],
                    (res) => {
                      // console.log('sync.get(popupo):', res)

                      if (res.language2ndCoursera) {
                        setlanguageType2(res.language2ndCoursera)
                      }
                      // console.log(
                      //   'setlanguageType2:',
                      //   res.language2ndCoursera
                      // )

                      setDualMode(res.dualTitleCoursera ? DUAL_ON : DUAL_OFF)
                    }
                  )
                }
              }
            } else {
              setResponseMessage('no response message....')
            }
          })

          // console.log('send message...')
        } else {
          setResponseMessage('Not the Correct Website ...')
        }
      }
    }
  )
}
```

###### contentScript.js
``` js
import { LANGUGAES_INFO, UDAL_MODE } from '../utils/messageType'

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.message === LANGUGAES_INFO) {
    sendResponse({
      // message: 'receive get languages info', - no show
      message: '',
      courseName: courseName,
      languages: languages,
    })
  } else if (message.message === UDAL_MODE) {
    // sendResponse({ message: 'dual mode setting' }) - no show
    sendResponse({ message: '' })
    // console.log('DUAL_MODE....', message)
    if (message.secondLanguage !== '' && message.duleMode) {
      if (message.duleMode) {
        let activeLanguage = getActiveLanguage()
        // console.log('combine:', activeLanguage, message.secondLanguage)
        if (activeLanguage !== '') {
          if (
            activeMode !== TRANSLATE_DUAL ||
            message.secondLanguage !== active2ndLanguage
          ) {
            combine(activeLanguage, message.secondLanguage)
            setTranslateState(dualMode, TRANSLATE_DUAL, message.secondLanguage)
          }
        }
      }
    } else {
      if (activeMode == TRANSLATE_DUAL) {
        setTranslateState(dualMode, TRANSLATE_SINGLE, '')
        // activeMode = TRANSLATE_SINGLE
        setSingleSubtitle()
      }
    }
  }
})
```

##### message from contentScript to background
###### contentScript.js
``` js
import { DOWNLOAD_SUBTITLE } from '../utils/messageType'

function downloadChinesetitle(subtitleUri) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', subtitleUri, false)
  xhr.send()
  if (xhr.status === 200) {
    console.log(xhr.responseText)
    chrome.runtime.sendMessage({
      message: DOWNLOAD_SUBTITLE,
      name: courseName,
      lenguage: downloadLanguage,
      subtitle: xhr.responseText,
    })
  } else {
    throw new Error('Network response was not ok')
  }
}
```

###### background.js
``` js
import { DOWNLOAD_SUBTITLE } from '../utils/messageType'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === DOWNLOAD_SUBTITLE) {
    console.log(request)
    saveFile(`${request.name}_${request.lenguage}.vtt`, request.subtitle)
  }
})
```

##### background savefile
``` js
saveFile(`${request.name}_${request.lenguage}.vtt`, request.subtitle)

function saveFile(fileName, content) {
  console.log('fileName:', fileName)

  // Create a Blob containing the text content
  // for str must  type: 'text/srt' (txt is type: 'text/plain')
  const blob = new Blob([content], { type: 'text/vtt' })

  // Convert the Blob to a data URL
  const reader = new FileReader()
  reader.onload = function () {
    const dataURL: string | ArrayBuffer | null = reader.result
    if (typeof dataURL === 'string') {
      // Use the chrome.downloads.download API to initiate the download
      chrome.downloads.download(
        {
          url: dataURL,
          filename: fileName,
        },
        function (downloadId) {
          // Handle the download initiation, if needed
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError)
          } else {
            // console.log('Download initiated with ID:', downloadId)
          }
        }
      )
    } else {
      // Handle the case where dataURL is not a string (e.g., if there's an error)
      console.error('Failed to create data URL')
    }
  }
  reader.readAsDataURL(blob)
}
```

##### upload file to a video src
``` js
function App() {
  return (
    <>
      {talkIdState != '' && (
        <div id="insert-div">
          <button
            id="generate-subtitle"
            onClick={handleGenerateSubtitle}
          ></button>
          <button
            id="download-english-subtitle"
            onClick={handleDownloadEnglishSubtitle}
          ></button>
          <div id="load-countdown" style={subDivStyle}>
            {countString}
            {downcounter}
          </div>
          <input
            type="file"
            accept=".vtt"
            onChange={handleSubtitleFileChange}
          />
        </div>
      )}
    </>
  )
}

// Event handler to handle file selection
function handleSubtitleFileChange(event) {
  const selectedFile = event.target.files[0]

  if (selectedFile) {
    // Handle the selected file, e.g., read its contents
    const reader = new FileReader()

    reader.onload = function (e) {
      const vttData = e.target.result
      const subtitleUrl = URL.createObjectURL(event.target.files[0])

      console.log('subtitleUrl:', subtitleUrl)
      let trackElement = document.querySelector(
        'track[srclang="en"]'
      ) as HTMLTrackElement
      if (trackElement) {
        trackElement.src = subtitleUrl
        console.log('trackElement:', trackElement)
      } else {
        trackElement = document.querySelector(
          'track[kind="subtitles"]'
        ) as HTMLTrackElement
        if (trackElement) {
          trackElement.src = subtitleUrl
          console.log('trackElement:', trackElement)
        }
      }

      // it's seem the 1st use subtitle-some video need remove
      // if not remove --> show original subtitle
      // if overwrite video not continue run
      let videoElement = document.querySelector(
        'video[playsinline="playsinline"]'
      ) as HTMLTrackElement
      if (videoElement) {
        // videoElement.src = subtitleUrl
        videoElement.removeAttribute('src')
      }

      const showElement = document.getElementById(
        'insert-subtitle'
      ) as HTMLElement
      showElement.style.display = 'none'
      // Now you can use vttData, which contains the content of the selected .vtt file
      // You can then proceed to update your video's subtitles as needed
    }

    reader.readAsText(selectedFile)
  }
}
```

##### content put src
``` js
setDualSubtitle(content)

function setDualSubtitle(subtitle) {
  // Create a Blob from the WebVTT content
  const blob = new Blob([subtitle], { type: 'text/vtt' })
  // Create a data URL from the Blob
  const dataUrl = URL.createObjectURL(blob)

  const activeElement = document.querySelector('li.active span')
  if (activeElement) {
    // console.log('activeElement:', activeElement)
    let ariaLabel = activeElement.getAttribute('aria-label')
    let trackElement = document.querySelector(
      `track[label="${ariaLabel}"]`
    ) as HTMLTrackElement
    if (trackElement) {
      if (!trackElement.hasAttribute('data-src')) {
        trackElement.setAttribute('data-src', trackElement.src)
      }
      trackElement.src = dataUrl
    }
  }
}
```

##### add inject
###### manifest.json
``` json
{
	"web_accessible_resources": [
		{
			"resources": [
				"injected.js"
			],
			"matches": [
				"https://learning.edx.org/*"
			]
		}
	]
}
```

###### contentScript.tsx
``` js
// add injected
const script = document.createElement('script')
script.src = chrome.runtime.getURL('injected.js')
document.body.appendChild(script)
```

###### injected.js
``` js
window.addEventListener('load', function () {
  console.log('injected ....')
})
```

##### send message to inject 
###### contentScript.tsx
``` js
window.postMessage(
	{
		// from: 'contentScript',
		channel: 'myExtension',
		message: 'loaded',
	},
	'*'
)
```

###### injected.js
``` js
window.addEventListener('message', (e) => {
	// check self send
  if (e.origin !== window.location.origin) {
    return
  }
  messages = e.data
  console.log('msg:', messages)

  const iframe = document.querySelector('iframe#unit-iframe')
  if (iframe) {
    const iframeContent = iframe.contentDocument.body.innerHTML
    console.log('Iframe content:', iframeContent)
    console.log('Iframe content2:', iframe.contentDocument)
    console.log('Iframe content3:', iframe.contentDocument.body)
  }
  const videoSelElement = document.querySelector('.btn-link.video-sources')
  console.log('videoSelElement:', videoSelElement)
})
```

##### background run script
###### manifest.json
``` json
{
	"permissions": ["scripting"]
}
```
###### contentScript.tsx
``` js
chrome.runtime.sendMessage({
  message: 'to background',
})
```

###### background.ts
``` js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'to background') {
    console.log(request)
    const tabId = sender.tab.id
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        // @ts-ignore
        function: (() => {
          const iframe = document.querySelector('iframe')
          const doc = iframe?.contentDocument
          console.log('iframe', iframe)
          return iframe
          // return doc?.body.innerText
        }) as () => any,
      },
      (result) => {
        // result will contain iframe body innerText
        console.log(result)
      }
    )
	}
}
```

##### background wait message and fetch url(this case limite by CORS)
###### contentScript.tsx
``` js
let iframeElement = document.getElementById(
	'unit-iframe'
) as HTMLIFrameElement

chrome.runtime.sendMessage(
	{
		message: 'get iframe content',
		url: iframeElement.src,
	},
	(response) => {
		console.log('response.content', response.content)
	}
)
```

###### background.ts
``` js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'get iframe content') {
    fetch(request.url, { mode: 'no-cors' })
      .then((res) => {
        console.log('res', res)
        res.text()
      })
      .then((data) => sendResponse({ content: data }))

    return true
  }
}
```

##### window.parent.postMessage(this case limited by CORS)
###### manifest.json
``` json
{
	"web_accessible_resources": [
		{
			"resources": [
				"injected.js",
				"script.js"
			],
			"matches": [
				"https://learning.edx.org/*"
			]
		}
	]
}
```

###### contentScript.tsx
``` js
let iframeElement = document.getElementById(
	'unit-iframe'
) as HTMLIFrameElement


const scriptIframeElement = document.querySelector(
	'script-iframe-content'
)
if (!scriptIframeElement) {
	const scriptElement = document.createElement('script')
	scriptElement.setAttribute('src', 'script.js')
	scriptElement.id = 'script-iframe-content'

	// Append the script element to the body
	iframeElement.appendChild(scriptElement)
	console.log('scriptElement', scriptElement)
}

window.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'getIframeContent') {
    // Access the iframe content
    // const iframeContent = event.source.document.body.innerHTML;
    console.log('iframeContent event', event)
  }
})
```

###### script.js
``` js
window.parent.postMessage({ type: 'getIframeContent' }, '*')
```

##### video player
``` js
function NewVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target
    const selectedFile = fileInput.files?.[0]

    if (selectedFile) {
      const videoElement = videoRef.current

      // Create a Blob URL for the selected video file
      const blobURL = URL.createObjectURL(selectedFile)

      // Set the Blob URL as the source for the video
      if (videoElement) {
        videoElement.src = blobURL

        // Load the new source
        videoElement.load()
      }
    }
  }

  const handleSubtitleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target
    const selectedFile = fileInput.files?.[0]

    if (selectedFile) {
      const videoElement = videoRef.current

      // Clear existing tracks
      if (videoElement && videoElement.textTracks) {
        const textTracks = videoElement.textTracks
        for (let i = textTracks.length - 1; i >= 0; i--) {
          const track = textTracks[i]
          track.mode = 'hidden'
        }
      }

      const subtitleBlob = new Blob([selectedFile], {
        type: 'text/vtt',
      })
      const subtitleBlobURL = URL.createObjectURL(subtitleBlob)

      const trackElement = document.createElement('track')
      trackElement.src = subtitleBlobURL
      trackElement.kind = 'subtitles'
      trackElement.srclang = 'en'
      trackElement.label = 'English'
      trackElement.default = true

			const handleToggleSubtitles = () => {
				var video = document.getElementById('my-video')
				// Get the first text track (assuming there's only one)
				// @ts-ignore
				var textTrack = video.textTracks[0]

				// Toggle the mode between showing and hiding subtitles
				if (textTrack.mode === 'showing') {
					textTrack.mode = 'hidden'
				} else {
					textTrack.mode = 'showing'
				}
				console.log('video', video)
				console.log('textTrack', textTrack)
			}

      // Append the track element to the video
      if (videoElement) {
        videoElement.appendChild(trackElement)
        videoElement.load()
      }
    }
  }

  return (
    <>
      <h1>HTML5 Video Player with MP4 and Subtitles</h1>
      <input type="file" accept="video/mp4" onChange={handleVideoFileChange} />
      <input type="file" accept=".vtt" onChange={handleSubtitleFileChange} />
      <video id="my-video" controls width="600" ref={videoRef}></video>
			{/* <br />
						<button onClick={handleToggleSubtitles}>Toggle subtitle</button> */}
    </>
  )
}

function addNewVideo() {
  const newVideoElement = document.querySelector('#new-video')
  if (!newVideoElement) {
    const unitElement = document.querySelector('.unit-iframe-wrapper')
    if (unitElement) {
      const parentElement = document.querySelector('.unit')
      const renewVideoElement = document.createElement('div')
      renewVideoElement.id = 'new-video'
      parentElement.insertBefore(renewVideoElement, unitElement)

      const root = createRoot(renewVideoElement)
      root.render(<NewVideo />)
    }
  }
}
```

##### background oninstalled 
``` js
chrome.runtime.onInstalled.addListener((details) => {
  console.log('background installed', details)

  chrome.storage.sync.set(
    {
      doubleTitleUdemy: true,
      languageTypeUdemy: 'zh-Hant',
    },
    function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError)
      } else {
        console.log('Data successfully saved')
      }
    }
  )
})
```

##### page change 
``` js
// background
// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // Send a message to the content script
    chrome.tabs.sendMessage(tabId, { action: 'pageLoaded' })
  }
  // console.log('changeInfo', changeInfo)
})
```

``` js
// content script
// Function to handle page load
function handlePageLoad() {
  // Perform actions when the page is loaded
  console.log('Page loaded!');
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'pageLoaded') {
    handlePageLoad();
  }
});
```


#### js 
##### add one div before one
``` js
function addNewVideo() {
  const newVideoElement = document.querySelector('#new-video')
  if (!newVideoElement) {
    const unitElement = document.querySelector('.unit-iframe-wrapper')
    if (unitElement) {
      const parentElement = document.querySelector('.unit')
      const renewVideoElement = document.createElement('div')
      renewVideoElement.id = 'new-video'
      parentElement.insertBefore(renewVideoElement, unitElement)

      const root = createRoot(renewVideoElement)
      root.render(<NewVideo />)
    }
  }
}
```

##### get/set and check attribute
``` js
let nameElement = document.querySelector('link[hreflang="x-default"]')
if (nameElement) {
	courseName = nameElement.getAttribute('href')
	if (!courseName.includes('lecture')) {
		courseName = 'x'
		// console.log('no lecture')
		// stop the interval
		clearInterval(intervalId)
	} else {
		dualMode = addCourseStateDiv(dualMode)
	}
}

function getLenguageUri(language) {
  let subtitleUrl = ''
  let trackElement = document.querySelector(
    `track[label="${language}"]`
  ) as HTMLTrackElement
  if (trackElement) {
    if (trackElement.hasAttribute('data-src')) {
      subtitleUrl = trackElement.getAttribute('data-src')
    } else {
      subtitleUrl = trackElement.src
    }
  } else {
    // console.log('no ', language)
  }
  return subtitleUrl
}

function setSingleSubtitle() {
  const activeElement = document.querySelector('li.active span')
  if (activeElement) {
    let ariaLabel = activeElement.getAttribute('aria-label')
    let trackElement = document.querySelector(
      `track[label="${ariaLabel}"]`
    ) as HTMLTrackElement
    if (trackElement) {
      if (trackElement.hasAttribute('data-src')) {
        trackElement.setAttribute('src', trackElement.getAttribute('data-src'))
      }
    }
  }
}
```

##### get attribute as object
``` js
let languageElements = document.querySelectorAll('video track')
// console.log(` ${timer} ms, languageElements : `, languageElements)
languages = []
for (let element of languageElements as NodeListOf<HTMLTrackElement>) {
	languages.push({
		label: element.label,
		srclang: element.srclang,
		src: element.src,
	})
}
```

##### class control
``` js
// remove class
const videoElement = document.querySelector('#video')
videoElement.classList.remove('video-24')

// add class
if (fontSize !== 'video-16') {
   videoElement.classList.add(fontSize)
}

// toggle class
let videoShow = document.getElementById('video-show')
videoShow.classList.toggle('fullscreen')

// check include class
if (myDiv.classList.contains('full')) {
  console.log('The div has the class "full".');
} else {
  console.log('The div does not have the class "full".');
}
```

##### style control
``` js
// check style exist #1
const videoTitle = document.getElementById('subtitle-text') as HTMLElement
const videoTitletyle = window.getComputedStyle(videoTitle)
if (subtitleMode === SUBTITLE_MODE[SUBTITLE_MODE_OFF]) {
  // @ts-ignore
  if (!videoTitletyle.style) {
    videoTitle.style.display = 'none'
  }
  return
} else {
  // @ts-ignore
  if (videoTitle.style) {
    videoTitle.style.removeProperty('display')
  }
}

// check style exist #2
if (element.style.color !== undefined) {
	// The 'color' style property exists
} else {
	// The 'color' style property does not exist
}

// set style 
const element = document.getElementById('exampleElement');
element.style.color = 'red';
// get style value
const color = window.getComputedStyle(element).color;

// remove style
const element = document.getElementById('exampleElement'); 
if (element) {
  element.removeAttribute('style');
}

// remove style item
const element = document.getElementById('exampleElement'); 
if (element) {
  element.style.removeProperty('color');
}
```

##### check button disable
``` js
const myButton = document.getElementById('myButton') as HTMLButtonElement 
if (myButton) {
  if (myButton.disabled) {
    console.log('The button is disabled.');
  } else {
    console.log('The button is enabled.');
  }
}

```

##### check iframe content
``` js
let iframe = document.querySelector(
	'iframe#unit-iframe'
) as HTMLIFrameElement

console.log('iframeElement', iframe)

if (iframe && iframe.contentDocument) {
	// Check if the iframe and its contentDocument are available
	let tcElement = iframe.contentDocument.querySelector('div.tc-wrapper')
	console.log('tcElement4', tcElement)
} else {
	console.log('iframe or contentDocument is null')
}
```

##### interval and timeout
``` js
let ACTIVE_COUNT_MAX = 10
let activerCount = 1
const intervalId = setInterval(() => {
  console.log('activerCount:', activerCount)

  if (activerCount >= ACTIVE_COUNT_MAX) {
    clearInterval(intervalId)
  }
  activerCount++
}, 1000)

setTimeout(() => {
	if (typeof event.target.className === 'string') {
		if (event.target.className === 'subtitle-label') {
			checkActiveChange()
			isRun = true
		}
	}
	
}, 300)
```

##### kep press
``` js
// set Esc event
document.addEventListener('keydown', function (e) {
  console.log("document.addEventListener('keydown'", e)
  if (e.key === 'Escape') {
		...
  }
})

// simulate Esc press
let escEvent = new KeyboardEvent("keydown", {
  bubbles: true, cancelable: true, keyCode: 27
   /* 27 is the keycode for ESC */
});
document.dispatchEvent(escEvent);


// Create a new keyboard event for Ctrl + Alt + F
var keyEvent = new KeyboardEvent('keydown', {
  key: 'F',
  code: 'KeyF',
  ctrlKey: true,
  altKey: true,
  bubbles: true,
})
// Dispatch the key event on the element
videoShow.dispatchEvent(keyEvent)

// listen Ctrl + Alt + F
const videoContainer = document.getElementById('video-show')
videoContainer.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.altKey && event.code === 'KeyF') {
    // Your code for handling Ctrl + Alt + F goes here
    console.log('Ctrl + Alt + F was pressed!')
		....
  }
})
```

##### full screen
``` html
<div id="video-show">
	<video id="my-video" controls width="100%" ref={videoRef}></video>
	<div id="subtitle-container">
		<p id="subtitle-text" ref={subtitleContainerRef}></p>
	</div>
</div>
```

``` js
// enter full screen(div-#video-show)
{
  const videoContainer = document.getElementById('video-show')
  const videoElement = document.getElementById('my-video')

  videoElement.addEventListener('click', () => {
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen()
      // @ts-ignore
    } else if (videoContainer.mozRequestFullScreen) {
      /* Firefox */
      // @ts-ignore
      videoContainer.mozRequestFullScreen()
      // @ts-ignore
    } else if (videoContainer.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      // @ts-ignore
      videoContainer.webkitRequestFullscreen()
      // @ts-ignore
    } else if (videoContainer.msRequestFullscreen) {
      /* IE/Edge */
      // @ts-ignore
      videoContainer.msRequestFullscreen()
    }
  })
}

// set video not enter full screen
document.addEventListener('fullscreenchange', function () {
  // The fullscreenchange event can sometimes fire more than once in certain browsers when requesting fullscreen.
  // 	1. First when fullscreen is requested
  // 	2. Second when fullscreen is exited

  console.log('document.fullscreenElement : ', document.fullscreenElement)

  if (document.fullscreenElement === myVideo) {
    console.log('fullscreenchange')

    if (document.fullscreenElement) {
      console.log('exitFullscreen..')
      // document.exitFullscreen()
    }

    isVirtualFullscreen = !isVirtualFullscreen
    console.log('isVirtualFullscreen', isVirtualFullscreen)
  }
})
```

##### button click
``` js
function buttonClick() {
  var myButton = document.getElementById('full-screen')
  myButton.click()
}
```

##### video click
``` js
const myVideo = document.getElementById('my-video')
myVideo.click()
```

##### simulate click
``` js
function triggeeClick() {
  const myVideo = document.getElementById('my-video')

  // Create a new mouse click event
  var clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  })

  myVideo.dispatchEvent(clickEvent)
}
```
##### string replace
``` js
// % replace by percent
element = element.replace(/%/g, 'percent')

// : or . remove
linesSutitle1[i].split(' --> ')[0].replace(/[:.]/g, '')
```

##### video current time
``` js
let INTERVAL_STEP = 1000
let activerCount = 1
function checkInterval() {
  const intervalId = setInterval(() => {
    const videoElement = document.querySelector(
      '#udemy video'
    ) as HTMLVideoElement
    console.log('videoElement', videoElement)

    if (videoElement) {
      videoElement.addEventListener('timeupdate', function () {
        // Get the current time in seconds
        var currentTime = videoElement.currentTime

        // Display or use the current time as needed
        console.log('Current Time: ' + currentTime)
      })
      clearInterval(intervalId)
    }
    console.log(` ${activerCount * INTERVAL_STEP} ms....`)
    activerCount++
  }, INTERVAL_STEP)
}
```

##### check element changed
``` js
const textElement = document.querySelector(
	'.captions-display--captions-cue-text--1W4Ia'
)

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
	for (const mutation of mutationsList) {
		if (
			mutation.type === 'childList' ||
			mutation.type === 'characterData'
		) {
			console.log('Text content changed:', textElement.textContent)
		}
	}
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)

// Configuration of the observer:
const config = {
	childList: true,
	subtree: true,
}

// Start observing the target node for configured mutations
observer.observe(textElement, config)

// Later, you can disconnect the observer
// observer.disconnect();
```

##### check element clild changed
``` js
const containerElement = document.querySelector(
	'.captions-display--captions-container--1SP58'
)

if (containerElement) {
	const handleTextChange = (mutationsList) => {
		for (const mutation of mutationsList) {
			if (mutation.type === 'childList' || mutation.type === 'characterData' ) {
				console.log('Container content changed')
				checkTextElement()
			}
		}
	}

	const observer = new MutationObserver(handleTextChange)

	const config = {
		childList: true,
		subtree: true,
    characterData: true,
	}

	observer.observe(containerElement, config)
}

function checkTextElement() {
  const textElement = document.querySelector(
    '.captions-display--captions-cue-text--1W4Ia'
  )

  if (textElement) {
    console.log('Text content:', textElement.textContent)
  } else {
    console.log('Text element not found')
  }
}
```

#### TypeScript
##### disable 
``` js
const handleToggleSubtitles = () => {
	var video = document.getElementById('my-video')
	// Get the first text track (assuming there's only one)
	// @ts-ignore
	var textTrack = video.textTracks[0]

	// Toggle the mode between showing and hiding subtitles
	if (textTrack.mode === 'showing') {
		textTrack.mode = 'hidden'
	} else {
		textTrack.mode = 'showing'
	}
	console.log('video', video)
	console.log('textTrack', textTrack)
}
```

#### API
##### Translate
``` js
let xhr = new XMLHttpRequest()
xhr.open(
	'GET',
	// `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${language_code}&dt=t&q=${element}`,
	`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${secondLanguage}&dt=t&q=${tempSubtitle}`,
	false
)
xhr.send()

if (xhr.status === 200) {
	let data = JSON.parse(xhr.responseText)
	let newWords = data[0][0][0]
	console.log('newWords', newWords)
	currentSubtitle = newWords + '\n' + currentSubtitle
} else {
	throw new Error('Network response was not ok')
}
```

### Ref
+ reference source 
	+ [SubtitlesForYoutube](https://github.com/yashagarwal1411/SubtitlesForYoutube) : Youtube Drop .SRT for subtitle
	+ [Movie Subtitles](https://github.com/gignupg/Movie-Subtitles/tree/master) : Video/Movie streaming platform Load .srt for subtitle
	+ [Super-Subtitles](https://github.com/noblenihal/Super-Subtitles) : YouTube subtitle transfer word for English
	+ [YouTube subtitles viewer - React Chrome Extension](https://github.com/eliascotto/youtube-subtitles-viewer) : view Youtube subtitle
	+ [youtube-captions](https://github.com/ADengrc/youtube-captions) : Youtube double subtitle　
	+ [antd-chrome-extension-boilerplate](https://github.com/shenmaxg/antd-chrome-extension-boilerplate) : react + antd for chrome-extension development
	+ [XHook](https://github.com/jpillora/xhook)
	+ [Ajax-hook 原理解析](https://www.jianshu.com/p/7337ac624b8e)
	+ [JS XHR HOOK js 实现 ajax](https://houbb.github.io/2022/07/09/js-xhr-hook)
	+ [ajax-hook](https://github.com/wendux/ajax-hook)
	+ [用Chrome 擴充實現修改ajax 請求的回應](https://www.zhihu.com/column/p/24189002)
	+ [Hook Ajax](https://greasyfork.org/en/scripts/426753-hook-ajax)
	+ [Ted subtitle merge](https://github.com/willard1218/Ted-subtitle-merge)
+ js-reference
	+ [getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
	+ [Language codes](https://docs.developers.optimizely.com/recommendations/docs/language-codes)