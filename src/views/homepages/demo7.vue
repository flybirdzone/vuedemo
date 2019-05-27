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
      <div
              class="md-example-item"
              v-for="icon in iconList"
              :key="icon"
      >
        <md-icon
                :name="icon.split('/')[0]"
                size="lg"
        ></md-icon>
        <p>{{ icon }}</p>
      </div>
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
    bouncing:false,
    pull:false,
    more:false
  };

  public iconList = [
      'rectangle',
      'right',
      'wrong',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'arrow-down',
      'invisible',
      'visible',
      'service',
      'setting',
      'close',
      'refresh',
      'edit',
      'sort',
      'info',
      'question',
      'security',
      'rmb',
      'wait',
      'check',
      'checked/success',
      'check-disabled',
      'clear/fail',
      'warn',
      'info-solid',
      'scan',
      'share',
      'back',
      'card-bag',
      'message',
      'order',
      'balance',
      'coupon',
      'address-book',
      'mobile-phone',
      'calendar',
      'home',
      'discovery',
      'switch',
      'time',
      'search',
      'user',
      'camera',
      'clock',
      'delete',
      'profession',
      'id-card',
      'authentication',
      'location',
      'filter',
      'motor-vehicle',
      'phone',
      'volumn',
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
