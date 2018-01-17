# 什么是pwa

# pwa特性

- 离线缓存
- 推送通知（push notifications）
- 添加主屏

以上三种特性都基于service worker技术实现，因此，在介绍这三个特性之前，我们先来了解一下service worker。

## service worker

### 概述

service worker是一个注册在指定源和路径下的事件驱动worker，运行在浏览器后台线程。它旨在创建更好的离线体验。


Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。

Service worker。它采用JavaScript控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。你可以完全控制应用在特定情形（最常见的情形是网络不可用）下的表现。

Service worker运行在worker上下文，因此它不能访问DOM。相对于驱动应用的主JavaScript线程，它运行在其他线程中，所以不会造成阻塞。它设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用。

注意：Service workers之所以优于以前同类尝试（如AppCache），是因为它们无法支持当操作出错时终止操作。Service workers可以更细致地控制每一件事情。

注意：Service workers大量使用Promise，因为通常它们会等待响应后继续，并根据响应返回一个成功或者失败的操作。Promise非常适合这种场景。

### 功能
- 缓存文件和数据
- 网络代理，拦截和处理网络请求

### 依赖
- https
由于service worker可以对网络请求进行拦截、改写等操作，出于安全考量，Service workers只能由HTTPS承载。
- browser
在Firefox浏览器的用户隐私模式，Service Worker不可用。
目前

### 生命周期

### 其他说明

- service worker中大部分场景是等待响应的结果，然后再进行下一步操作，因此大量使用了Promise。为了更好地理解service worker，需要先对promise有一定了解。

- 在service worker之前，也有一些其他的解决离线缓存的技术方案，比如AppCache，但是其他方案都存在一些问题，而service worker则在设计上避免了这些问题。


## 离线缓存
### 数据流转
### 普通的文件缓存

1）离线缓存数据流转说明
2）技术支持（service worker）https
    - service worker是什么

        特点：
        1）service worker是一个javascript worker，所以不能直接操作dom；如果需要的话，可以通过postMessage的方式，由页面来操作dom更新
        2）网络代理，可以编码控制请求
        3）不用的时候会被终止，用到的时候再启动
        4）大量的用到promise
    - 生命周期
        service worker的生命周期与网页的生命周期完全不同，它是执行在浏览器层级的，由浏览器在后台运行。
        安装service worker需要先进行注册

        在install阶段，可以缓存一些静态资源。如果所有的静态资源都缓存成功，service worker就会install成功。如果有任意一个文件没能下载或者缓存成功，install就不会成功

        install完成后，会触发activition，在activation步骤我们可以管理旧的缓存

        首次加载的页面，还不会受service worker的控制；只有二次加载的页面，才会被控制

        要求：
        https
        浏览器（chrome、firefox等）

        1）首次
        2）更新
        3）一次只能运行一个版本，如何保证，什么机制（在开发时会导致一些问题，通过devTools解决）
        4）开发利器
        5）处理更新

    - 注册
    
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

        1) service worker 作用域
        2）chrome://inspect/#service-workers 监控
    
    - 安装

    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
        '/',
        '/styles/main.css',
        '/script/main.js'
    ];

    self.addEventListener('install', function(event) {
        // Perform install steps
        event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
        );
    });

    demo

    问题：
    如果index.html想要更新，该如何处理？现在都是直接从service worker里读取缓存
    如何更新呢？
    最大的坑，如何更新页面数据

    - 更新



    - 加载更快
    - 数据流
    - 关闭浏览器后是否仍然可以运行
    
    拦截网络请求，通过程序控制响应缓存
    
    离线存储

    这种离线存储方案与from cache这种的区别在哪儿？

    ？ websocket & webrtc 如何处理

    app cache 和 indexedDB API
    https://developer.mozilla.org/en-US/Apps/Fundamentals/Basic_data_flow

## 推送通知（push notifications）

1）push的工作原理

![web push protocol](https://tools.ietf.org/html/draft-ietf-webpush-protocol-12)
    
![]('./images/push.svg')
    
ServiceWorkerRegistration


## 添加主屏

### manifest.json简介：

manifest文件中定义了应用的名称，显示方式，开屏背景色，主题色，应用图标等信息

```
{
    "name": "Minimal app to try PWA",
    "short_name": "Minimal PWA",
    "display": "fullscreen",
    "start_url": "/pwa/demos/manifest/index.html",
    "theme_color": "#8888ff",
    "background_color": "#aaaaff",
    "icons": [
        {
            "src": "logo-36.png",
            "sizes": "36x36",
            "type": "image/png"
        },
        {
            "src": "logo-48.png",
            "sizes": "48x48",
            "type": "image/png"
        },
        {
            "src": "logo-72.png",
            "sizes": "72x72",
            "type": "image/png"
        },
        {
            "src": "logo-96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "logo-144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": "logo-192.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
}
```

说明：
1）name
2) short_name
3) display
4) theme_color
5) background_color
6）icons
    将图标保存到主屏幕时，Chrome 首先寻找与显示密度匹配并且尺寸调整到 48dp 屏幕密度的图标。如果未找到任何图标，则会查找与设备特性匹配度最高的图标。无论出于任何原因，如果您想把目标明确锁定在具有特定像素密度的图标，可以使用带数字参数的可选 density 成员。如果您不声明密度，其默认值为 1.0。这意味着“可将该图标用于等于和大于 1.0 的屏幕密度”，而这通常就是您所需要的。

### 注册安装service worker

在添加到主屏时，会检测是否注册了service worker，以及service worker是否做了离线缓存的处理，即是否监听了fetch事件

```
self.addEventListener('install', e => {
    console.log('installed');
})
self.addEventListener('activate', function(e) {
    console.log('activate');
})
self.addEventListener('fetch', function(e) {
    console.log('fetch');
})
```

demo演示

使用service worker缓存文件并拦截请求，提升离线体验

```
var cacheVersion = 'cache-v1';

var cacheList = ['index.html'];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheVersion)
        .then(cache => cache.addAll(cacheList))
        .then(() => self.skipWaiting())
    )
})
self.addEventListener('activate', function(e) {
    console.log('activate');
})

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response != null) {
                return response
            }
            return fetch(e.request.url)
        })
    )
})
```

图：
![](./images/cache.png)

### 为什么，如何理解

demo演示

# 兼容性

# 发展

# 参考资料



