<template>
  <Page
    @refreshing="OnRefresh"
    @more="uploadMore"
    @scroll="scroll"
    :options="page"
    ref="page"
    name="demo2"
  >
    <template #header>
      <md-drop-menu :data="data" />
    </template>
    <div class="page-inner">
      <div class="content">正文区域</div>
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
      layout:false,
      theme: "#330033",
      slot:true
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
            text: '一级选项1',
            options: [
              {
                value: '0',
                text: '二级选项1',
              },
              {
                value: '1',
                text: '二级选项2',
              },
            ],
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
  padding-top: 60px;

}
</style>
