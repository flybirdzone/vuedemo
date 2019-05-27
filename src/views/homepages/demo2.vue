<template>
  <Page
    @refreshing="OnRefresh"
    @more="uploadMore"
    @scroll="scroll"
    :options="page"
    ref="page"
    name="demo2"
  >
    <div class="page-inner">
      <md-activity-indicator
              :size="20"
              :text-size="16"
              vertical
      >加载中...</md-activity-indicator>
      <md-activity-indicator
              :size="20"
              :text-size="16"
              vertical
      >vertical loading</md-activity-indicator>
      <md-activity-indicator
              vertical
              class="md-activity-indicator-css"
      >loading...</md-activity-indicator>

      <md-activity-indicator
              type="carousel"
              :size="15"
              vertical
      ></md-activity-indicator>
      <md-button type="primary" @click="click">
        <md-activity-indicator
                v-if="loading"
                class="md-activity-indicator-css"
                type="carousel"
                :size="15"
                color="#fff"
                text-color="#fff"
        ></md-activity-indicator>
        <span v-else>确认支付</span>
      </md-button>
    </div>

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
export default class Demo2 extends Mixins(PageMixins) {
   public currentPage: {
     list: any[];
   } = currentPage;
   public page: InterfacePage = {
    nav: {
      name: "demo2",
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
.page-inner {
  text-align: center;
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
