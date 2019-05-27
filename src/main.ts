import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

// 引入全局样式
import "./style/global.scss";
// 引入 mand-mobile
import mandMobile from "mand-mobile";
import "mand-mobile/lib/mand-mobile.css";
Vue.use(mandMobile);

// 使用自己的组件
import { MyPlugin } from "@/components";
Vue.use(MyPlugin);

Vue.config.productionTip = true;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
