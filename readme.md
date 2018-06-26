# conditional loader for webpack

Webpack loader that allows text file conditional compilation directly from Webpack.

* 支持js、html、vue、css其他任何文本文件(support javascript、html、vue、css and any other text file).
* 支持命令#if、#else、#elseif、#endif
* 命令务必独立一行
* 命令务必包含在注释内，注释现匹配开始字符`<!--` or `//` or `/*` 

## install
```
npm install condition-loader --save-dev
```

## example
js example
```js
// #if DEBUG
console.log('this is debug code');
// #endif

/* #if DEBUG */
console.log('DEBUG')
    // #if version < 1
    console.log('version < 0')
    // #elseif version < 2
    console.log('version > 1 and version < 2')
    // #else
    console.log('version > 2')
    // #endif
// #endif
```

html example
```html
<!--#if DEBUG-->
<div>DEBUG</div>
<!--#endif-->
```


## webpack config example
```js
let defs = {
    DEBUG: true,
    version: 1.1
}
module.exports = {
    entry: {
        index: './test/index.js'
    },
    output: {
        path: __dirname + '/test',
        filename: 'output.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'condition-loader',
                options: defs
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'condition-loader',
                        options: defs
                    }
                ]
            }
        ]
    }
}
```

## License
MIT

## 注意问题
* less等类型文件假如配置了condition-loader，只会对js直接引入的样式文件或者vue文件内部的样式生效，less中再次@import引入的文件只会经过less处理，不会通过condition-loader

## version
* 1.0.5
    - 修复windows的\r\n换行符格式
* 1.0.4
    - 不需要使用map，避免影响webpack-dev-server时缓存
* 1.0.3
    - 命令前缀检查,匹配开始字符`<!--` or `//` or `/*` 
* 1.0.2
    - remove log;
    - add semicolon before return at the evaluate code 
* 1.0.0
    - support if,else,elseif,endif command.