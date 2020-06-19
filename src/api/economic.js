import request from '@/utils/request'

//信息数据统计
export function getMessageNum(data) {
    return request({
        url: "/economic/messageNum",
        method: "get",
        params: data
    });
}

//获取指定国家贸易金额
export function getCountryTrading(data) {
    return request({
        url: "/economic/countryTrading",
        method: "get",
        params: data
    });
}

//获取gdp
export function getGDP(data) {
    return request({
        url: `/economic/gdp`,
        method: "get",
        params: data
    });
}

//获取gdp排名（2019）
export function getGDPRanking(data) {
    return request({
        url: "/economic/gdpRanking",
        method: "get",
        params: data
    });
}

//获取通货膨胀率
export function getInflation(data) {
    return request({
        url: "/economic/inflation",
        method: "get",
        params: data
    });
}

//获取文章
//type值：(0、经济趋势, 1、GDP, 2、收入和租房, 3、通货膨胀, 4、股票指数)
export function getEssay(data) {
    return request({
        url: `/economic/message`,
        method: "get",
        params: data
    });
}

//根据国家获取收入和租房，获取房价收入比、租金指数、生活成本加租金指数
export function getPriceToIncome(data) {
    return request({
        url: "/economic/priceToIncome",
        method: "get",
        params: data
    });
}

//获取股票指数
export function getStock(data) {
    return request({
        url: "/economic/stock",
        method: "get",
        params: data
    });
}

//获取贸易金额
export function getTrading(data) {
    return request({
        url: `/economic/trading`,
        method: "get",
        params: data
    });
}
