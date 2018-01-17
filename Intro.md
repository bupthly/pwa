# 什么是pwa

# pwa特性

- 离线缓存
- 推送通知（push notifications）
- 添加主屏

## 离线缓存
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

### 注册安装service worker

在添加到主屏时，会检测是否注册了service worker，以及service worker是否做了离线缓存的处理

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




### 为什么，如何理解

demo演示

# 兼容性

# 发展

# 参考资料



