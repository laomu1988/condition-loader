# conditional loader for webpack

Webpack loader that allows text file conditional compilation directly from Webpack.

support javascript、html、vue and any other text file.
support command #if、#else、#elseif、#endif

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

## version
### 1.0.0
- support if,else,elseif,endif command.