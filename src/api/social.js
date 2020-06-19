import request from '@/utils/request'

//国家年龄分布
export function getAge(data) {
    return request({
        url: '/social/selectAge',
        method: "get",
        params: data
    });
}
//国家年龄分布
export function getSocialInfo(data) {
    return request({
        url: '/social/getSocialTemporaryInfo',
        method: "get",
        params: data
    });
}
//其他矛盾
export function getOtherConflicts(data) {
    return request({
        url: '/social/selectOtherConflicts',
        method: "get",
        params: data
    });
}

//就业率
export function getEmployment(data) {
    return request({
        url: '/social/selectEmployment',
        method: "get",
        params: data
    });
}

//社会治安:交通指数
export function getTraffic(data) {
    return request({
        url: '/social/selectTraffic',
        method: "get",
        params: data
    });
}

//社会治安:安全指数，犯罪率
export function getSelectLists(data) {
    return request({
        url: 'social/selectLists',
        method: "get",
        params: data
    });
}

//国家民族
export function getStateNation(data) {
    return request({
        url: '/social/selectStateNation',
        method: "get",
        params: data
    });
}
//国家种族
export function getSelectRace(data) {
    return request({
        url: '/social/selectRace',
        method: "get",
        params: data
    });
}

//国家影响力排行
export function getTopCountries(data) {
    return request({
        url: '/social/selectTopCountries',
        method: "get",
        params: data
    });
}
