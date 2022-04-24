---
title: 於Github page部屬靜態Vue.js專案，在History Mode下子頁面會重新導向到404的解決方案。
description: 好不容易做好Vue.js的專案，想先部屬在Github page供內部快速測試時，你有很高的機率會遇上直接輸入子頁面網址卻被導向到404的困境。
date: '2021-07-21T08:52:16.800Z'
categories: []
keywords: []
slug: >-
  /@unzan/%E6%96%BCgithub-page%E9%83%A8%E5%B1%AC%E9%9D%9C%E6%85%8Bvue-js%E5%B0%88%E6%A1%88-%E5%9C%A8history-mode%E4%B8%8B%E5%AD%90%E9%A0%81%E9%9D%A2%E6%9C%83%E9%87%8D%E6%96%B0%E5%B0%8E%E5%90%91%E5%88%B0404%E7%9A%84%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%88-139f55323164
---
# 於Github page部屬靜態Vue.js專案，在History Mode下子頁面會重新導向到404的解決方案。
好不容易做好Vue.js的專案，想先部屬在Github page供內部快速測試時，你有很高的機率會遇上直接輸入子頁面網址卻被導向到404的困境。

![](https://cdn-images-1.medium.com/max/800/1*iuv9QTfokFxOWoh8cfAadg.png)

雖然Vue.js提供很方便的vue-router，協助進行SPA網站的開發，即使可以模擬多頁式網站的行為，但實際上並沒有給予新的頁面供Github page進行載入。整體網站中只存在著index.html。

所幸，Github page在導向404時支持自定義頁面，它會自動尋找根目錄中名稱為404.html的檔案，取代Github page原有的頁面。

有許多解方，一些人認為將History Mode改為Hash Mode即可，但這樣就失去了返回上一頁這種人性化的功能，若仍要維持History Mode，必然要想辦法繞過404.html，讓他重新載入為index的vue。

當然，你可以試著將index.html複製為404.html，但對我來說並不適用，當Github page重新導向到404.html時，並沒有辦法吃到我app的vue，跟空殼一樣。

以下是我在網路上找到的解方：

1.  將以下程式碼加入404.html的&lt;head&gt;中，當他被瀏覽時啟動重新導向到專案目錄。
```
  <script>
    sessionStorage.redirect = location.href;
  </script>

  <meta http-equiv="refresh" content="0;URL='/專案名稱'"></meta>
```

2. 將以下程式法加入index.html的&lt;body&gt;中的最上方，當他被重新導向到index.html時，取得index的vue時，在透過修改網址讓所需要的特定子頁面能直接訪問。
```
  <script>
    (function(){
      let redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
      }
    })();
  </script>
```


於是就能在User未察覺時，透過子頁面網址而成功訪問到指定的子頁面。

#### Reference:

Jeff Galbraith _Publish your Quasar SPA on Github.io with History Mode_ [https://dev.to/quasar/publish-your-quasar-spa-on-github-io-with-history-mode-20h2](https://dev.to/quasar/publish-your-quasar-spa-on-github-io-with-history-mode-20h2)