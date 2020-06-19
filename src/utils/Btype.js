const ua = navigator.userAgent;
// return {
//     trident: u.indexOf('Trident') > -1, //IE内核
//     presto: u.indexOf('Presto') > -1, //opera内核
//     webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//     gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
//     mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//     ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//     android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
//     iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
//     iPad: u.indexOf('iPad') > -1, //是否iPad
//     webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
//     weixin: u.indexOf('MicroMessenger') > -1, //是否微信
//     qq: u.match(/\sQQ/i) == " qq" //是否QQ
// };
let browerType = "";

// 如果是非IE或者Edge的浏览器会返回false，如果是IE或者Edge会返回对应的版本号。
function detectIE() {
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    // Edge 12 (Spartan)
    /* ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)
    Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';*/
    // Edge 13
    /*ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
    Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';*/
    var msie = ua.indexOf("MSIE");
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }
    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }
    // var edge = ua.indexOf("Edge/");
    // if (edge > 0) {
    //     // Edge (IE 12+) => return version number
    //     return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    // }
    // 其他浏览器
    return false;
}

console.log(ua, '33');
if (detectIE()) {
    browerType = "IE";
} else {
    if (ua.includes("Firefox")) {
        browerType = "Firefox";
    }
    if (ua.includes("Chrome")) {
        browerType = "Chrome";
    }
    if (ua.includes("Opera")) {
        browerType = "Opera";
    }
    if (ua.includes("Safari")) {
        browerType = "Safari";
    }
}
const Btype = {
    type: browerType
};
export default Btype;
