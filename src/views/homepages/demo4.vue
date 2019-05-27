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
        <md-cell-item title="交通银行(尾号3089)" brief="展示摘要描述" />
        <md-cell-item title="招商银行(尾号2342)" brief="展示摘要描述">
          <md-switch v-model="open" slot="right" />
        </md-cell-item>
        <md-cell-item title="交通银行(尾号3089)" brief="展示摘要描述" addon="附加文案" arrow />
        <md-cell-item title="交通银行" brief="展示摘要描述" addon="附加文案" arrow>
          <span class="holder" slot="left"></span>
        </md-cell-item>
        <md-cell-item title="招商银行" brief="展示摘要描述" addon="禁用的项目" disabled arrow>
          <span class="holder" slot="left"></span>
        </md-cell-item>
        <md-cell-item title="Mand Mobile" brief="A mobile UI toolkit" arrow>
          <p slot="children" style="font-size:0.24rem;color:#858B9C;">
            面向金融场景的Vue移动端UI组件库，丰富、灵活、实用，快速搭建优质的金融类产品，让复杂的金融场景变简单。基于「合理、好用」设计价值观，从交互操作、视觉抽象、图形可视等角度共同解决问题。
          </p>
        </md-cell-item>
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
export default class Demo4 extends Mixins(PageMixins) {
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
  public open = true;

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
  .holder{
    display: block;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: #e5e5e5;
  }
}
</style>
