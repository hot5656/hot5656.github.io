---
title: CSS animation
abbrlink: 11b2
date: 2022-01-10 11:47:09
categories: Front End
tags:
	- css
---

[Demo](/ref/css-6)

<!--more-->

### Simple 
#### 簡單浮動
``` html
		<style>
			.card-group {
				list-style: none;
				display: flex;
			}

			.card {
				margin: 20px;
				padding: 10px;
				box-shadow: 1px 2px 5px #999;
				transition: all .4s;
			}

			.card:hover {
				box-shadow: 2px 3px 15px #999;
				transform: translateY(-1px);
			}

		</style>
		<ul class="card-group">
			<li class="card">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, vitae?</li>
			<li class="card">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, vitae?</li>
			<li class="card">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, vitae?</li>
			<li class="card">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, vitae?</li>
		</ul>
```

### Text
#### 文字移動
``` html
		<style>
			header {
				position: relative;
				height: 200px;
				background: linear-gradient(rgba(0,0,0, .4),rgba(0,0,0, .5))
			}

			.banner {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 80%;
			}

			.banner-heading {
					/* map @keyframes name */
					animation-name: anim;
					/* animation time */
					animation-duration: 2s;
			}

			.banner-par {
				animation-name: anim;
				animation-duration: 2s;
				/* delay for start animation */
				animation-delay: .5s;
				/* animation style */
				/* none : default( run as @keyframes) - 執行後回到初始狀態
				forwards : 停於動畫執行後畫面
				backwards : 無動畫執行前狀態
				both: 無動畫執行前狀態 + 停於動畫執行後畫面 */
				animation-fill-mode: backwards;
			}

			/* 關鍵影格(@keyframe) */
			@keyframes anim {
				0% {
					transform: translateX(-100px);
					opacity: 0;
				}
				100% {
					transform: translateX(0);
					opacity: 1;
				}
			}
		</style>
		<header>
			<div class="text-center banner">
				<h1 class="banner-heading">Welcome to photoX</h1>
				<p class="banner-par">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
			</div>
		</header>
```

#### 文字移動(demo animation-fill-mode)
``` html
		<style>
			header {
				position: relative;
				height: 200px;
				background: linear-gradient(rgba(0,0,0, .4),rgba(0,0,0, .5))
			}

			.banner2 {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 80%;
			}

			.banner2-heading {
					/* map @keyframes name */
					animation-name: anim2;
					/* animation time */
					animation-duration: 2s;
			}

			.banner2-par {
				animation-name: anim2;
				animation-duration: 2s;
				/* delay for start animation */
				animation-delay: .5s;
				/* animation style */
				/* none : default( run as @keyframes) - 執行後回到初始狀態
				forwards : 停於動畫執行後畫面
				backwards : 無動畫執行前狀態
				both: 無動畫執行前狀態 + 停於動畫執行後畫面 */
				animation-fill-mode: backwards;
			}

			/* 關鍵影格(@keyframe) */
			@keyframes anim2 {
				0% {
					transform: translateX(-100px);
					opacity: 0;
				}
				50% {
					transform: translateX(0);
					opacity: .5;
				}
				100% {
					transform: translateX(100px);
					opacity: 1;
				}
			}
		</style>
		<header>
			<div class="text-center banner2">
				<h1 class="banner2-heading">Welcome to photoX</h1>
				<p class="banner2-par">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
			</div>
		</header>
```

