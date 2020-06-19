//校验接口返回的状态不正常及返回的数据为空
//空返回true,具有值返回false
export function isNullData(res) {
    if (!res
        || !res.hasOwnProperty('status')
        || !res.hasOwnProperty('data')
        || res.status !== 0
        || Object.keys(res.data).length === 0
        || Object.values(res.data).length === 0
        || res.data.length === 0) {
        return true
    } else {
        return false
    }
}



