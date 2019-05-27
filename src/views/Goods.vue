<template>
  <Page :options="page" :move="false">
      <div class="shopping-cart-wrap">
        <md-field>
          <md-cell-item title="shopping" arrow @click="toLink('goods/shopping')" />
        </md-field>
      </div>
  </Page>
</template>

<script lang="ts">
  import { Component, Provide, Vue ,Inject} from "vue-property-decorator";
  import { InterfacePage } from "@/components/index";
  import "@/assets/svg/shopping_cart.svg";
  import { debounce } from "@/components/utils/common.ts"
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
        let fun = debounce(()=>{
            console.log(11111)
        },1000);
        fun()
    }

    getData() {
      this.$http.$api('test2',{a:1111})
    }

    toLink(path:string){
      this.$router.push(path)
    }


  }
</script>

<style scoped></style>ßß
