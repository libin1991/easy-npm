### 安装
```
npm install superplaceholder-es6 -S
```

### API
```js
const tag=superplaceholder({
    el: document.querySelector('input'),
    sentences: [ '要显示的占位文本1', '要显示的占位文本2', '要显示的占位文本3', '要显示的占位文本4'],
    options: {
        // 各个字符显示之间的延迟时间，单位毫秒
        letterDelay: 100, // milliseconds
        // 各个句子之间的延迟时间，单位毫秒
        sentenceDelay: 1000,
        // 在输入框聚焦时才开始播放，设置为 false 会自动开始播放
        startOnFocus: true,
        // 是否循环播放
        loop: false,
        // 是否打乱传入的句子
        shuffle: false,
        // 是否显示光标，默认为显示
        showCursor: true,
        // 光标字符串
        cursor: '|'
    },
    callback(inedx) {
        // 当前显示数组的index
        console.log(val);
     }
});
```