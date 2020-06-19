import request from '@/utils/request'

//组织架构
export function getPosTree(data) {
    return request({
        url: '/military/getPosTree',
        method: "get",
        params: data
    });
}

//军队人员特点
export function getPersonnel() {
    return request({
        url: '/military/getPersonnelCharacteristics',
        method: "get"
    });
}

// JQ军事活动和非军事活动列表
export function getMilActivities(data, param) {
    return request({
        url: `/military/getMilActivities?startTime=${data.startTime}&endTime=${data.endTime}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        method: "post",
        data: param,
        'Content-Type': 'application/json'
    });
}

//JQ获取军事活动以及非军事活动的统计
export function getMilitaryActStatistics(data) {
    return request({
        url: '/military/getMilitaryActStatistics',
        method: "get",
        params: data
    });
}

// JQ获取分类信息content内容列表
export function getCategoryInfos(data) {
    return request({
        url: '/military/getMilitaryTemporaryInfo',
        method: "get",
        params: data
    });
}

//信息数据统计
export function getOrganization(url) {
    return request({
        url: url,
        method: "get"
    });
}
