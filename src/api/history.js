import request from '@/utils/request'

//历史人物
export function getPerson(data) {
    return request({
        url: '/history/getCultureFigure',
        method: "get",
        params: data
    });
}
//历史人物照片
export function getPersonImg(data) {
    return request({
        url: '/file/image',
        method: "get",
        params: data,
        responseType: 'arraybuffer',
    });
}
//历史事件
export function getEvent(data) {
    return request({
        url: '/history/getCultureEvent',
        method: "get",
        params: data
    });
}
//历史战争
export function getWar(data) {
    return request({
        url: '/history/getCultureWar',
        method: "get",
        params: data
    });
}

// 获取朝代详细信息
export function getDynasty(data) {
    return request({
        url: '/history/getDynasty',
        method: "get",
        params: data
    });
}

// 获取朝代和国家列表
export function getDynastyList(data) {
    return request({
        url: '/history/getDynastyList',
        method: "get",
        params: data
    });
}