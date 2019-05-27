import Vue from 'vue';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import router from '@/router';
import qs from 'qs';
import merge from 'lodash/merge';
import {api} from "./api";
//import { clearLoginInfo } from '@/utils'

// debugger debug = true 为调试版本
let debug:boolean = true;
let mock:boolean = true;

if(process.env.NODE_ENV == "development"){
    debug = true;
}else {
    debug = false;
}

export interface Http extends AxiosInstance {
    adornUrl(s: string): any;
    adornParams(params: {}, openDefultParams: boolean): any;
    adornData(data: {}, openDefultdata: boolean, contentType: string): any;
    $get(url: string,data: any): any;
    $post(url: string,data: any,type?: string): any;
    $api(name: string, query?: {}): any
}

const http  = axios.create({
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
}) as Http ;

axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN1111111111";

/**
 * 解决相同请求重复问题
 */
let pending:any = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (ever:any) => {
    for(let p in pending){
        if(pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
};
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    // 请求头带上token
    config.headers['token'] = (Vue as any).cookie.get('token');
    // ------------------------------------------------------------------------------------
    //在一个ajax发送前执行一下取消操作
    removePending(config);
    config.cancelToken = new cancelToken((c)=>{
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c });
    });
    // ------------------------------------------------------------------------------------
    return config
}, error => {
    return Promise.reject(error)
});

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    if (response.data && response.data.code === 401) { // 401, token失效
        //clearLoginInfo()
        //router.push({ name: 'login' })
    }
    return response
}, error => {
    return Promise.reject(error)
});

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    // 测试环境和正式环境!
    let baseurl: string = debug ? "https://www.baidu.com/" : "https://api.false.com/";
    return baseurl + actionName
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
        't': new Date().getTime()
    };
    data = openDefultdata ? merge(defaults, data) : data;
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
};

/**
 * get 请求
 * @param {*} url 请求地址
 * @param {*} data 数据对象
 * */
http.$get = (url, data) =>{
    return http({
        url: http.adornUrl(url),
        method: 'get',
        params: http.adornParams(data,true)
    })
};
/**
 * POST 请求
 * @param {*} url 请求地址
 * @param {*} data 数据对象
 * */
http.$post = (url, data, type = 'json') => {
    let CONTENTTYPE = type == 'json' ? {'Content-Type': 'application/json; charset=utf-8'} : {'Content-Type': 'application/x-www-form-urlencoded'};
    return http({
        headers: CONTENTTYPE,
        url: http.adornUrl(url),
        method: 'post',
        data: http.adornData(data,true, type)
    })
};

interface Api {
    name: string,
    url: string,
    method: string,
    query: object,
    type: string
}

// 格式化定义的API为map类型
const apiMap: any = (function(api){
    let map: any = {};
    api.forEach( item => {
        map[item.name] = item;
        if(mock && item.mock){
            map[item.name].mockData = require(`@/mock/${item.mock}`);
        }
    });
    return map;
})(api);

// 预定义api接口
http.$api = ( name, query ) => {
    return new Promise((resolve, reject)=>{
        if(apiMap[name]){
                let apiItem = apiMap[name];
                let queryItem = merge(apiItem.query,query || {});
                let methodItem = String.prototype.toUpperCase.call(apiItem.method || '');
                let urlItem = apiItem.url;
                let typeItem = apiItem.type || 'json';
            if(!mock){
                // 没有定义的 method 默认get 请求
                if(methodItem == "POST"){
                    http.$post(urlItem,queryItem,typeItem).then((sucess:any)=>{
                        resolve(sucess)
                    }).catch((err:any)=>{
                        reject(err)
                    })
                } else {
                    http.$get(urlItem,queryItem).then((sucess:any)=>{
                        resolve(sucess)
                    }).catch((err:any)=>{
                        reject(err)
                    })
                }
            }else{
                resolve(apiItem.mockData);
            }
        }else {
           throw new Error(`请检查你输入的API 名称:${name}-------service/api.ts文件--------- 是否预先定义`);
        }
    })
};

declare module 'vue/types/vue' {
    interface Vue {
        $http: Http
    }
}

export default http


