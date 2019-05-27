<template>
  <div id="app">
    <router-view />
    <tabs ref="tabs" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue ,Provide ,Inject} from "vue-property-decorator";
declare function require(string: string): string;

@Component({
  provide () {
    return {
      "Phide": () => {
        let loading = document.querySelector('#loading');
        console.log(loading)
      },
      "Pshow": () => {
        let loading = document.querySelector('#loading');
      }
    }
  },
})
export default class App extends Vue {
  name = 'app';
  public tabs: any;
  // vue 加载成功
  created() {
    let loading = document.querySelector('#loading') as HTMLElement;
    setTimeout(()=>{
      loading.style.display = 'none';
    },1000)
  };

  mounted() {
    // app 启动完毕
    this.appStart().then(() => {
      // 去除apploading;
      this.tabs = this.$refs.tabs;
      // app
      let myTabs = [
        {
          name: 1,
          label: "首页",
          icon: "home",
          url: "/home",
          image: {
            on: require("@/assets/11.png"),
            off: require("@/assets/1.png")
          }
        },
        {
          name: 2,
          label: "我的",
          icon: "user",
          url: "/user",
          image: {
            on: require("@/assets/22.png"),
            off: require("@/assets/1.png")
          }
        },
        {
          name: 3,
          label: "发现",
          icon: "user",
          url: "/find",
          image: {
            on: require("@/assets/33.png"),
            off: require("@/assets/1.png")
          }
        },
        {
          name: 4,
          label: "购物",
          icon: "user",
          url: "/goods",
          image: {
            on: require("@/assets/33.png"),
            off: require("@/assets/1.png")
          }
        }
      ];
      let $tabs: any = this.$refs.tabs;
      $tabs && $tabs.setTabs(myTabs);
    });
  }

  getTabs() {
    return new Promise((resolve)=>{
      this.$nextTick(()=>{
          resolve(this.$refs.tabs)
      })
    });
  }

  appStart() {
    return new Promise(resolve => {
      this.$nextTick(() => {
        resolve();
      });
    });
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
