import request from '@/utils/request'

//获取国家列表
export function getCountryList() {
    return request({
        url: '/common/getCountryList',
        method: "get",
    });
}
