<template>
  <Page :move="false" :options="page" name="homepage" >
    <div class="home" >
      <md-field>
        <md-cell-item title="ActionBar" arrow @click="toLink('home/demo')" />
        <md-cell-item title="ActivityIndicator" arrow @click="toLink('home/demo2')" />
        <md-cell-item title="buttons" arrow @click="toLink('home/demo3')" />
        <md-cell-item title="CellItem" arrow @click="toLink('home/demo4')" />
        <md-cell-item title="DetailItem" arrow @click="toLink('home/demo5')" />
        <md-cell-item title="DropMenu" arrow @click="toLink('home/demo6')" />
        <md-cell-item title="Icons" arrow @click="toLink('home/demo7')" />
      </md-field>
    </div>
  </Page>
</template>

<script lang="ts">
import { Component, Provide, Vue ,Inject} from "vue-property-decorator";
import { InterfacePage } from "@/components/index";
@Component({
})
export default class Home extends Vue {
  public page: InterfacePage = {
    nav: {
      show: false,
      preventBack: false,
      slot: false,
      layout: true,
    },
    button: [],
    back: {
      callback: () => {
        console.log("back");
        //this.$router.back()
      }
    },
    pull: false,
    more: false,
    bouncing: false,
    tabs: { show: true }
  };

  mounted() {

  }

  getData() {
    this.$http.$api('test2',{a:1111})
  }

  toLink(path:string){
    this.$router.push(path)
  }


}
</script>

<style lang="scss" scoped>
.home {
  .home-header {
    height: 400px;
    .banner-item {
      height: 100%;
    }
  }
  article {
    .text-container {
      padding: 32px;
      background: #fff;
    }
    .text {
      margin-bottom: 20px;
      line-height: 1.5;
      font-size: 24px;
      text-indent: 2em;
    }
  }

}
.title {
  font-size: 36px;
}
</style>
