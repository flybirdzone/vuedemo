import Vue from "vue";
import Router from "vue-router";
import Component from "vue-class-component";
import Home from "./views/Home.vue";
Vue.use(Router);

Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate" // for vue-router 2.2+
]);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component:  () => import("./views/Home.vue")
       ,
      children: [
        {
          path: "demo",
          name: "demo",
          component: () =>
            import("./views/homepages/demo.vue")
        },
        {
          path: "demo2",
          name: "demo2",
          component: () =>
              import("./views/homepages/demo2.vue")
        },
        {
          path: "demo3",
          name: "demo3",
          component: () =>
              import("./views/homepages/demo3.vue")
        },
        {
          path: "demo4",
          name: "demo4",
          component: () =>
              import("./views/homepages/demo4.vue")
        },
        {
          path: "demo5",
          name: "demo5",
          component: () =>
              import("./views/homepages/demo5.vue")
        },
        {
          path: "demo6",
          name: "demo6",
          component: () =>
              import("./views/homepages/demo6.vue")
        },
        {
          path: "demo7",
          name: "demo7",
          component: () =>
              import("./views/homepages/demo7.vue")
        },
      ]
    },
    {
      path: "/user",
      name: "user",
      component: () =>
        import("./views/user.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import("./views/About.vue")
    },
    {
      path: "/find",
      name: "find",
      component: () =>
        import( "./views/find.vue")
    },
    {
      path: "/goods",
      name: "goods",
      component: () =>
          import( "./views/Goods.vue"),
      children: [
        {
          path: "shopping",
          name: "shopping",
          component: () =>
              import("./views/shoppingpages/Shopping.vue")
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: () =>
        import("./views/commonpages/404.vue")
    }
  ]
});
