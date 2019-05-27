<template>
  <Page :options="page" @scroll="scroll">
      <template #header>
          <nav>11111</nav>
      </template>
      <header >
          <div class="filter-wrap">
              <div class="filter-box" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558543466090&di=995082f736c1a113a415cdc451d45e99&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140408%2FImg397875090.jpg)"></div>
          </div>
      </header>
      <div  class="item-wrap">
          <md-tab-bar
                  v-model="current"
                  :items="items"
                  :hasInk="false"
          />
      </div>
      <article class="shopping-content">
          <div class="menu">
              <md-scroll-view
                      ref="scrollViewMenu"
                      :bouncing="false"
                      :auto-reflow="true"
              >
                 <div class="shopping-tab-item" :class="{active:activeBlockIndex == index }" v-for="(item,index) in menus" :key="item" @click="_$changeTab(index)">
                     {{item}}
                 </div>
              </md-scroll-view>
          </div>
          <div class="content">
              <md-scroll-view
                      ref="scrollViewContent"
                      :auto-reflow="true"
                      @scroll="_$scroll"
                      @mousedown.native="$_onScrollStart"
                      @touchstart.native="$_onScrollStart"
              >
                  <template >
                      <div class="block" v-for="item in contents" :key="item.id">
                          <div class="shopping-name">{{item.name}}</div>
                          <div class="shopping-item-wrap">
                              <div class="shopping-item" v-for="sub in item.goods" :key="sub.id">
                                  <div class="image"></div>
                                  <div class="content">
                                      <div class="title">{{sub.name}}</div>
                                      <div class="desc">咸粥</div>
                                      <div class="message">
                                          <div class="sellcount">1000份</div>
                                          <div class="comments">好评率100%</div>
                                      </div>
                                      <div class="price">
                                          <div class="new">¥36</div>
                                          <div class="old">¥20</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </template>
              </md-scroll-view>
          </div>
      </article>
      <template #footer>
          <footer  class="shopping-cart-wrap">
              <div class="content">
                  <div class="cat-icon"></div>
                  <div class="text">
                      <div class="money">¥ 0</div>
                      <div class="diliver"></div>
                      <div class="desc">另需配送费¥4元</div>
                  </div>
              </div>
              <div class="button">
                  ¥&nbsp;20起送
              </div>
          </footer>
      </template>
  </Page>
</template>


<script lang="ts">
  import { Component, Provide, Vue ,Inject} from "vue-property-decorator";
  import { InterfacePage } from "@/components/index";
  import { debounce } from "@/components/utils/common"
  import "@/assets/svg/shopping_cart.svg";
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
      tabs: { show: false }
    };
     current = 1;
     items = [
          {name: 1, label: '商品'},
          {name: 2, label: '评价'},
          {name: 3, label: '商家'}
     ];

     menus:any[] = [];
     contents:any[] = [];
     menudimensions:any = [];
     dimensions:any = [];
     activeBlockIndex = 0;
     mounted() {
         this.getData()
     }

     getData() {
      this.$http.$api('goods',{a:1111}).then((res:any)=>{
          if(res.code == 1){
              let result = res.results;
              this.contents = result;
              result.forEach((item:any)=>{
                  this.menus.push(item.name)
              });

              this.countContent()
          }
          console.log(res)
      })
    }

    // 计算高度
    countContent(){
         this.$nextTick(()=>{
             let Menu = (this.$refs.scrollViewMenu as any);
             let Content = (this.$refs.scrollViewContent as any);

             const blocks = Content.$el.querySelectorAll('.block');
             let offset = 0;
             Array.prototype.slice.call(blocks).forEach((block, index) => {
                 const innerHeight = block.clientHeight;
                 this.$set(this.dimensions, index, [offset, offset + innerHeight]);
                 offset += innerHeight
             });

             const blocks2 = Menu.$el.querySelectorAll('.shopping-tab-item');
             let offset2 = 0;
             Array.prototype.slice.call(blocks2).forEach((block, index) => {
                 const innerHeight = block.clientHeight;
                 this.$set(this.menudimensions, index, [offset2, offset2 + innerHeight]);
                 offset2 += innerHeight
             });
             console.log(this.menudimensions)
         })
    }

    refresh() {

    }

    toLink(path:string){
      this.$router.push(path)
    }

    scroll(x:any,y:any) {
        console.log(x,y)
    }

    scrollSwitch = true;

    _$scroll(obj:any){
        let Menu = (this.$refs.scrollViewMenu as any);
        if(this.scrollSwitch){
            let scrollTop = obj.scrollTop;
            // 优化便利 如果成功了 不会在往后执行
            this.dimensions.some((dimension:any, index:any) => {
                if (scrollTop >= dimension[0] && scrollTop <= dimension[1]) {
                    this.activeBlockIndex = index;
                    Menu.scrollTo(0,this.menudimensions[index][0],true);
                    return true
                }
            })
        }

    }

    _$changeTab(index:any){
        this.scrollSwitch = false;
        let Content = (this.$refs.scrollViewContent as any);
        this.activeBlockIndex = index;
        // 移动到 content 位置
        Content.scrollTo(0,this.dimensions[index][0] + 1,true);
    }

    $_onScrollStart(){
        this.scrollSwitch = true;
    }
  }
</script>
<style lang="scss">
    .item-wrap{
        border-bottom: 1px solid #e5e6e8;
        .md-tab-bar-item{
            height: 80px;
            min-height: auto;
            &.is-active {
                color: #f61a1a !important;
            }
        }
    }
</style>
<style scoped lang="scss">
    header{
        position: relative;
        height: 270px;
        overflow: hidden;
        .filter-wrap{
            left: -5px;
            top:-5px;
            bottom:-5px;
            position: absolute;
            right: -5px;
            z-index: 1;
            filter: blur(10px);
            margin:-5px;
        }
        .filter-box{
            height: 100%;
            width: 100%;
            z-index: 1;
            background-size: cover;
            background-position: center;
        }
    }
    .md-tab-bar{
        background: #fff;
    }
    .shopping-content{
        position: absolute;
        top: 351px;
        bottom: 98px;
        left: 0;
        right: 0;
        display: flex;
        .menu{
            flex: 0 0 160px;
        }
        .content{
            flex: 1;
        }
    }
    .shopping-tab-item{
        position: relative;
        display: flex;
        background: #f4f5f7;
        height: 108px;
        align-items: center;
        padding-left: 22px;
        padding-right: 40px;
        font-size: 22px;
        line-height: 1.4;
        &.active{
            background: #fff;
            &:after{
                display: none;
            }
        }
        &:after{
            position: absolute;
            content: '';
            left: 22px;
            right: 40px;
            bottom: 1px;
            border-bottom: 1px solid #dddee0;
        }
    }
    .shopping-name{
        display: flex;
        align-items: center;
        padding-left: 24px;
        font-size: 24px;
        color: #969ba1;
        height: 52px;
        background: #f4f5f7;
        border-left: 5px solid #d9dce1;
    }
    /* 购买的物品 */
    .shopping-item-wrap{
        padding-bottom: 15px;
        .shopping-item{
            position: relative;
            display: flex;
            padding-top: 36px;
            padding-left: 36px;
            padding-bottom: 36px;
            &:last-child:after{
                display: none;
            }
            &:after{
                position: absolute;
                content: '';
                bottom: 0;
                left: 36px;
                right: 36px;
                border-bottom: 1px solid #dcdddf;
            }
            .image{
                flex: 0 0 114px;
                height: 114px;
                background: #999;
                margin-right: 18px;
            }
            .content{
                flex: 1;
                .title{
                    display: flex;
                    font-size: 28px;
                    height: 36px;
                    font-weight: 600;
                    color: #010b14;
                    align-items: center;
                }
                .desc{
                    display: flex;
                    font-size: 20px;
                    height: 36px;
                    color: #bfc0c4;
                    align-items: center;
                }
                .message{
                    display: flex;
                    font-size: 20px;
                    height: 36px;
                    color: #bfc0c4;
                    align-items: center;
                    .sellcount{
                        margin-right: 26px;
                    }
                }
                .price{
                    display: flex;
                    align-items: flex-start;
                    padding-top: 10px;
                    .new{
                        font-size: 24px;
                        color: #f5110e;
                        font-weight: 600;
                        margin-right: 18px;
                    }
                    .old{
                        font-size: 17px;
                        color: #969ba1;
                        text-decoration-line: line-through;
                        font-weight: 500;
                    }
                }
            }
        }
    }

    /* 购物车 */
    .shopping-cart-wrap{
        display: flex;
        height: 92px;
        background: #131d26;
        .content{
            display: flex;
            flex: 1;
            padding-left: 36px;
            .cat-icon{
                position: relative;
                background: #2c353e;
                border-radius: 50%;
                width: 88px;
                height: 88px;
                border: 15px solid #121f28;
                top: -20px;
            }
            .text{
                display: flex;
                align-items: center;
                padding-left: 33px;
                .money{
                    font-size: 32px;
                    color: #939498;
                    font-weight: 700;
                    padding-right: 22px;
                }
                .diliver{
                    border-left: 1px solid #2c343f;
                    height: 50px;
                }
                .desc{
                    flex: 1;
                    font-size: 20px;
                    color: #7d8184;
                    padding-left: 22px;
                }
            }
        }
        .button{
            display: flex;
            flex: 0 0 212px;
            background:#2b343b;
            color: #97989c;
            align-self: stretch;
            justify-content: center;
            align-items: center;
            font-size: 24px;
        }
    }
</style>
