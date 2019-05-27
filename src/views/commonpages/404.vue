<template>
  <Page @refreshing="OnRefresh" @more="uploadMore" :options="page" ref="page">
    <div class="page404">
        404page
    </div>
  </Page>
</template>
<script lang="ts">
  import { Component, Prop, Provide, Emit, Vue } from "vue-property-decorator/lib/vue-property-decorator";
  import {InterfacePage} from "@/components/index"

  let currentPage: any = {
     list:[],
     scrollTop:0
  }

  @Component
  export default class About extends Vue {
    @Provide() public currentPage:{list:any[],scrollTop:number} = currentPage;
    @Provide() public page:InterfacePage = {
      nav: {
        name:"404",
        show:false,
        preventBack:false,

      },
      button:[],
      back:{callback:()=>{
        console.log("back");
        //this.$router.back()
      }},
      bouncing:false,
      pull:false,
      more:false,
    };

    mounted() {

    };

    click() {
      alert(11111)
    }

    OnRefresh() {
      let page:any = this.$refs.page;
      setTimeout(() => {
        this.currentPage.list = this.currentPage.list.concat([1,2,3,4,5,6,7,8,9,10]);
        page.finishRefresh()
      }, 2000)
    };

    uploadMore(){
      let page:any = this.$refs.page;
      setTimeout(() => {
        this.currentPage.list = this.currentPage.list.concat([1,2,3,4,5,6,7,8,9,10]);
        page.finishLoadMore()
      }, 2000)
    }

  }
</script>
<style lang="scss" scoped>
   .about{
     .list{
       height: 50px;
       font-size: 48px;
       border-bottom: 1px solid #dedede;
     }
   }
</style>
