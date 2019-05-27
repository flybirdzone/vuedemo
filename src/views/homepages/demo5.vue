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
      <md-field>
        <md-detail-item title="承保公司" content="众安" bold />
        <md-detail-item title="投保人" content="张三" />
        <md-detail-item title="被保人" content="李四" />
        <md-detail-item title="保险费用" content="0.1元/日" />
        <md-detail-item title="保障日期" content="2018/08/08 ~ 2019/08/08" />
        <md-detail-item title="保单号" content="123456789" />
        <md-detail-item title="保单协议">
          <a href="#" style="color:#5878B4;text-decoration:none;">查看</a>
        </md-detail-item>
      </md-field>
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
export default class Demo5 extends Mixins(PageMixins) {
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
  text-align: left;


}
</style>
