const loaderUtils = require('loader-utils')

module.exports = function(source) {
    const options = loaderUtils.getOptions(this)
    // console.log('loader:', options)
    try {
        return parse(source, options)
    } catch(err) {
        const errorMessage = `condition-loader error: ${err}`
        this.callback(new Error(errorMessage))
    }
}


function parse(source, defs) {
    if (source.indexOf('#if') < 0) {
        return source
    }
      
    var deep = 0
    var index = 0
    var func = 'var __$arr = [];\n'
    source.replace(/(.*)#(if |elseif |else|endif)(.*)(\n|\r\n|$)/g, function(all, pre, keyword, condition, endLine, startIndex) {
        if (!/(<!--|\/\/|\/\*)/.test(pre)) {
            return
        }

        func += `__$arr.push([${index}, ${startIndex}]);`
        index = startIndex + all.length
        keyword = keyword.trim()

        // js块注释结束
        if (condition.indexOf('*/') > 0) {
            condition = condition.replace(/\*\**\//g, '')
        }

        if (condition.indexOf('-->') > 0) {
            // html中注释结尾处理
            condition = condition.replace(/--+>/g, '')
        }

        switch(keyword) {
        case 'if':
            deep += 1
            func += `\nif(${condition}) {\n`
            break
        case 'elseif':
            func += `\n} else if(${condition}) {\n`
            break
        case 'else':
            func += '\n} else {\n'
            break
        case 'endif':
            deep -= 1
            func += '\n}\n'
            break
        }
    })
    if (deep !== 0) {
        throw '#if and #endif not matched..'
    }
      
    if (index < source.length) {
        func += `__$arr.push([${index}, ${source.length}]);`
    }
    func += 'return __$arr;'
      
    var arr = evaluate(func, defs)
    var result = arr.map(position => source.substring(position[0], position[1])).join('')
    // console.log(result)
    return result
}



/**
 * @return evaluate code with defs
 */
function evaluate(code, defs) {
    var args = Object.keys(defs)
    var result
    try {
        var f = new (Function.bind.apply(Function, [void 0].concat(args, [code])))()
        result = f.apply(void 0, args.map(function (k) { return defs[k] }))
    }
    catch (error) {
        throw 'error evaluation: ' + code + '\n' + error
    }
    return result
}