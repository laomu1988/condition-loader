

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
                loader: __dirname + '/index',
                options: {
                    DEBUG: true,
                    version: 1.1
                }
            }
        ]
    }
}