if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>i(e,a),o={module:{uri:a},exports:c,require:r};s[a]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Soldier.glb",revision:"0998e2b4baf1dfd2e0877805fe1f5f5b"},{url:"/_next//static/media/googleIcon.a85f3377.svg",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/Mt86ihrwmHZFZwqdD6494/_buildManifest.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/Mt86ihrwmHZFZwqdD6494/_middlewareManifest.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/Mt86ihrwmHZFZwqdD6494/_ssgManifest.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/238-843e4cf66215936f.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/319-d536309a2fdce0c1.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/352-dcb4144d0f6519cd.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/76-4a263818b2d293ad.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/ab5c09eb-51bb6d8bb88febf9.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/fb7d5399-d2b1e8f017fb6618.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/framework-8957c350a55da097.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/main-ac2e80b86bbc5c80.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/404-b65e44be65c571ca.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/_app-71bef86be25cb89b.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/_error-254d32891cff5125.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/challange/pushUp-da09a0c393b056a9.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/fitnessGame-1c6363f183e3f1cb.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/gym-0f85cdcabcf288f4.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/index-2e6a13de9146a95b.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/learn/exercise/curl-ee438ce5c28aa4e8.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/learn/exercise/pushUp-50a9613bd814146d.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/learn/yoga/asan1-2abc2f98ce3449c6.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/login-04829b37c62ff29d.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/music-a945d244e0b859fc.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/notepad-4d97b38e56da39ee.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/plans-98d6092e2945ef48.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/profile/%5Buid%5D-d0943a89d82e6067.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/settings-51a38208e7f90498.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/timer-ca90eb4b4e62bfe4.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/pages/yoga-6c7bc910c41d0be7.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/chunks/webpack-d2cef17dcd7cee1f.js",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/css/19f52de7a73b2ab0.css",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/css/24487fc8bcad31ab.css",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/css/4e39cf18b5c716f0.css",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/css/cf86e75dd7b9a62c.css",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/_next/static/css/dbacdb85901d5935.css",revision:"Mt86ihrwmHZFZwqdD6494"},{url:"/googleIcon.svg",revision:"887cfda38130dba55c9c6def6159cb82"},{url:"/icon-192x192.png",revision:"4fc45c8aefbce72dbcbf0eb09f08a809"},{url:"/icon-256x256.png",revision:"319dcb599ac69f17fcac01392d710d29"},{url:"/icon-384x384.png",revision:"27618dd060259833ec730aaad57c24d0"},{url:"/icon-512x512.png",revision:"fb1e04745ec5f412a45078ed841ea8f0"},{url:"/icon.jpg",revision:"ed1f41bbf88360a0f48f6334e9dcc78a"},{url:"/idealCurl.mkv",revision:"b92000c4905f6492f4ceed946498b751"},{url:"/lib/comfort_fit.mp3",revision:"66e970bb172f7a3e5aad43989734b3e4"},{url:"/manifest.json",revision:"d05eddd8b1b6256b58f70d290aef27fb"},{url:"/normalMap.png",revision:"08a1b88ee3c07e0103c4d7de5416f0fb"},{url:"/spaceBack.jpg",revision:"c27a915510f8144a138dddb82d04a23a"},{url:"/starsHD.jpg",revision:"000c7f6a32b030e9f88524ea8fdbb08e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
