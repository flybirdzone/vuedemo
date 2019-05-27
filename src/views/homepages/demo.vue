<template>
  <Page
    @refreshing="OnRefresh"
    @more="uploadMore"
    @scroll="scroll"
    :options="page"
    ref="page"
    name="demo1"
  >
    <div class="page-inner">

    </div>
    <template #footer>
      <md-action-bar :actions="data" @click="click">
        <span class="price">
          &yen;128.00<small>起</small>
        </span>
      </md-action-bar>
    </template>
  </Page>
</template>
<script lang="ts">
import { Component, Prop, Provide, Emit, Vue, Mixins } from "vue-property-decorator/lib/vue-property-decorator";
import { InterfacePage } from "@/components";
import { PageMixins } from "@/components/Mixins/mixins.ts";

let currentPage: any = {
  list: [],
};
@Component
export default class Demo extends Mixins(PageMixins) {
   public currentPage: {
     list: any[];
   } = currentPage;
   public page: InterfacePage = {
    nav: {
      name: "demo1",
      show: true,
      preventBack: false,
      transition: true,
      layout:true,
      theme: "#330033"
    },
    button: [],
    back: {
      callback: () => {
      }
    },
    pull:false,
    more:false
  };

  public data = [
      {
        text: '主要按钮',
      },
  ];

  mounted() {}

  scroll(a: any, b: any) {
    console.log(a, b);
  }

  click() {
  }

  OnRefresh() {
    let page: any = this.$refs.page;

  }

  uploadMore() {
    let page: any = this.$refs.page;

  }
}
</script>
<style lang="scss" scoped>
.about {
  .price {
    font-weight: 500;
    font-size: 48px;
    color: #FF823A;
     .small{
        margin-left: 10px;
        font-size: 32px;
        color: #858B9C;
     }

  }
}
</style>
