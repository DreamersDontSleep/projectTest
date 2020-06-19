//基础依赖

//定义数据类型对象
const dataType = {
    '[object Number]': 'Number',
    '[object String]': 'String',
    '[object Boolean]': 'Boolean',
    '[object Null]': 'Null',
    '[object Undefined]': 'Undefined',
    '[object Object]': 'Object',
    '[object Symbol]': 'Symbol',
    '[object BigInt]': 'BigInt',
    '[object Function]': 'Function',
    '[object Math]': 'Math',
    '[object RegExp]': 'RegExp',
    '[object Array]': 'Array',
    '[object Date]': 'Date',
};

//存储toString
const TS = Object.prototype.toString;

//校验数据类型
function checkType(d) {
    try {
        let type = TS.call(d);
        if (dataType.hasOwnProperty(type)) {
            return dataType[type]
        } else {
            throw 'The type does not exist'
        }
    } catch (e) {
        console.log(e);
    }
}

export {checkType}
