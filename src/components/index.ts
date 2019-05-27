import Vue from "vue";
import "./utils/remauto.ts";
import Tabs from "./page/tabs.vue";
import Page from "./page/index.vue";
import * as VueTouchRipple from "vue-touch-ripple/dist/vue-touch-ripple.js";
import * as VueCookie from  "vue-cookie";
import http from "./service/http";
import "./utils/index";
import { platform } from "./utils/platform"

// 定义Vue 扩展方法
declare module 'vue/types/vue' {
    interface Vue {
        $cookie: any;
        cookie: any;
        platform: any;
    }
}

// Tell Vue to use the plugin
Vue.use(VueCookie);

// import styles
import "vue-touch-ripple/dist/vue-touch-ripple.css";
Vue.use(VueTouchRipple, /* {
  // default global options
  color: '#fff',
  opacity: 0.3,
  speed: 1,
  transition: 'ease'
} */);

export const MyPlugin = {
    install(Vue:any) {
        // 全局vue扩展请求
        Vue.cookie = VueCookie;
        Vue.prototype.$http = http;
        Vue.prototype.$platform = platform;
        // 注册组件
        Vue.component("Tabs", Tabs);
        Vue.component("Page", Page);
    }
};

//page 接口
/**
 *  nav 控制导航 数据 @theme 主题 @name 名称 @show 显示 @layout 布局
 *  button 按钮组 @img 表示text  @text 按钮名称 @callback 按钮事件
 *  back  @callback 返回事件
 *  pull 下拉刷新
 *  more 加载更多
 */

export interface InterfacePage {
    nav: {
        theme?: string,
        name?: string,
        show?:boolean,
        layout?:boolean,
        preventBack?:boolean,
        slot?:boolean,
        transition?:boolean
    },
    tabs?: {
        show?:boolean
    },
    button?: {img?:string,text?:string,callback:()=>void}[],
    back?: {callback?:() => void},
    pull?:boolean,
    more?:boolean,
    bouncing?:boolean

}

// 暴露事件代理
export * from "./service/channel";
