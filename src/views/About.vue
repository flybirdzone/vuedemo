<template>
  <Page @refreshing="OnRefresh" @more="uploadMore" :options="page" ref="page" >
    <div class="about">
      <h1>This is an about page</h1>
      <div class="list" v-for="item in currentPage.list" @click="click(item)">list{{item}}</div>
    </div>
    <template  #footer>
      <md-action-bar :actions="buttons" >
           <span class="price">
            &yen;128.00<small>起</small>
           </span>
      </md-action-bar>
    </template>
  </Page>
</template>
<script lang="ts">
  import { Component, Prop, Provide, Emit, Vue } from "vue-property-decorator/lib/vue-property-decorator";
  import {InterfacePage} from "@/components/index";

  let currentPage: any = {
     list:[],
  }

  @Component
  export default class About extends Vue {
    @Provide() public currentPage:{list:any[],scrollTop:number} = currentPage;
    @Provide() public page:InterfacePage = {
      nav: {
        name:"关于我们",
        show:true,
        preventBack:false
      },
      button:[],
      back:{callback:()=>{
        console.log("back");
        //this.$router.back()
      }}
    };
    @Provide() public buttons = [
      {text: "按钮",onClick: this.onBtnClick}
    ]
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

    onBtnClick(event:any, action:any) {
      this.$dialog.alert({
        content: `${action.text}点击`,
      })
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
