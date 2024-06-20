const http = require('http');
const https = require('https');
const { app_url_obj } = require('./config.js');

/**
 * 获取年月日日期
 * @returns {string} date
 */
function getYearMonthDay () {
    try {
        const current_date = new Date();
        const year = current_date.getFullYear();
        const month = String(current_date.getMonth() + 1).padStart(2, '0');
        const day = String(current_date.getDate()).padStart(2, '0');
        const res = `${year}-${month}-${day}`;
        return res;
    } catch (err) {
        console.log('getYearMonthDay error:', err);
    }
    return '';
}

/**
 * 检查URL是否可访问
 * @param {string} url 
 * @returns {boolean} res
 */
function checkUrlCanLoad (url = '') {
    return new Promise((resolve) => {
        try {
            if (!judgeIsValidUrl(url)) {
                resolve(false)
                return;
            }
            if (url.indexOf('https') === 0) {
                // 创建一个新的HTTPS请求
                const req = https.request(url, { followRedirects: false }, (res) => {
                    try {
                        // 检查状态码是否为重定向状态码
                        if (res.statusCode >= 300 && res.statusCode < 400) {
                            // 尝试跟随重定向
                            const redirectUrl = res.headers.location;
                            if (redirectUrl) {
                                return checkUrlCanLoad(redirectUrl)
                                    .then(resolve(true))
                                    .catch(resolve(false));
                            } else {
                                resolve(false);
                            }
                        } else if (res.statusCode === 200) {
                            // 状态码200，请求成功
                            resolve(true);
                        } else {
                            // 其他非200状态码，请求失败
                            resolve(false);
                        }
                    } catch (err) { }
                });
                // 监听请求错误
                req.on('error', (e) => {
                    resolve(false);
                });
                // 消耗响应数据以释放内存
                req.end();
            } else {
                // 创建一个新的HTTP请求
                const req = http.request(url, { followRedirects: false }, (res) => {
                    try {
                        // 检查状态码是否为重定向状态码
                        if (res.statusCode >= 300 && res.statusCode < 400) {
                            // 尝试跟随重定向
                            const redirectUrl = res.headers.location;
                            if (redirectUrl) {
                                return checkUrlCanLoad(redirectUrl)
                                    .then(resolve(true))
                                    .catch(resolve(false));
                            } else {
                                resolve(false);
                            }
                        } else if (res.statusCode === 200) {
                            // 状态码200，请求成功
                            resolve(true);
                        } else {
                            // 其他非200状态码，请求失败
                            resolve(false);
                        }
                    } catch (err) { }
                });
                // 监听请求错误
                req.on('error', (e) => {
                    resolve(false);
                });
                // 消耗响应数据以释放内存
                req.end();
            }

        } catch (err) {
            console.log('checkUrlCanLoad error:', err);
            resolve(false);
        }
    });
}

/**
 * 判断是否是LTPP地址
 * @param {string} url 
 * @returns {boolean} res
 */
function judgeIsLTPPUrl (url = '') {
    try {
        const { hostname } = new URL(url);
        // 判断域名是否为 ltpp 站点
        if (hostname.includes(app_url_obj.hostname)) {
            return true;
        }
    } catch (err) {
        console.log('judgeIsLTPPUrl error:', err);
    }
    return false;
}

/**
 * 判断是否是严格LTPP地址（ltpp.vip | www.ltpp.vip）
 * @param {string} url 
 * @returns {boolean} res
 */
function judgeIsStrictLTPPUrl (url = '') {
    try {
        const { hostname } = new URL(url);
        return hostname && (hostname === app_url_obj?.hostname || hostname === `www.${app_url_obj?.hostname}`);
    } catch (err) {
        console.log('judgeIsStrictLTPPUrl error:', err);
    }
    return false;
}

/**
 * 判断是否是数组
 * @param {*} value 
 * @returns 
 */
function isArray (value) {
    try {
        return Array.isArray(value);
    } catch (err) {
        console.log('isArray error:', err);
    }
}

/**
 * 判断是否是对象
 * @param {*} value 
 * @returns 
 */
function isObject (value) {
    try {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    } catch (err) {
        console.log('isObject error:', err);
    }
}


/**
 * 休眠（毫秒）
 * @param {number} time 
 * @returns 
 */
function sleep (time = 0) {
    try {
        return new Promise((re) => {
            setTimeout(re, time);
        });
    } catch (err) {
        console.log('sleep error:', err);
    }
}

/**
 * 判断是否是合法URL
 * @param {string} url 
 * @returns 
 */
function judgeIsValidUrl (url) {
    try {
        // 匹配HTTP或HTTPS开头，然后是://，接着是合法的域名部分
        const urlPattern = /^(http|https):\/\/([\w.]+\/?)\S*$/;
        return urlPattern.test(url);
    } catch (err) {
        console.log('judgeIsValidUrl error:', err);
    }
    return false;
}

module.exports = {
    getYearMonthDay,
    checkUrlCanLoad,
    judgeIsLTPPUrl,
    judgeIsStrictLTPPUrl,
    isObject,
    isArray,
    sleep,
    judgeIsValidUrl,
};