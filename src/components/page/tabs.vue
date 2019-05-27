<template>
    <div class="mytabs">
        <transition name="fade">
            <div class="mytab md-example-child md-example-child-tabs md-example-child-tab-bar-4" v-show="dismiss">
                <md-tab-bar
                        v-model="current"
                        :items="items"
                        :has-ink="false"
                        :maxLength="5"
                        :ink-length="100"
                        @change="change"
                >
                    <template slot="item" slot-scope="{ item, index }">
                            <touch-ripple :speed="1" :opacity="0.3" color="#dedede" transition="ease">
                                <div class="custom-item">
                                    <div class="icon">
                                        <md-icon v-if="!item.image" :name="item.icon" />
                                        <template v-else>
                                            <img  v-if="index +1 == current " :src="item.image.on" :alt="index"  />
                                            <img  v-if="index +1 != current"  :src="item.image.off" alt="index" />
                                        </template>
                                    </div>
                                    <div class="text">
                                        <span v-text="item.label"></span>
                                    </div>
                                </div>
                            </touch-ripple>
                    </template>
                </md-tab-bar>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Model, Watch, Prop, Provide, Vue } from "vue-property-decorator";

    interface TabsItem { name : number;label ?: string;icon ?: string;url ?: string;}
    @Component({
        components: {}
    })
    export default class Tabs extends Vue {
        @Prop() private msg!: string;
        // data

        private items :TabsItem[] = [];
        private current:any = 1;
        private dismiss:boolean = true;

        mounted () {
            let url = this.$route.path;
            this.setDismiss(url)
        }

        setTabs(tabs: TabsItem[]){
            this.items = tabs;
            let url = this.$route.path;
            this.setDismiss(url)
        }

        change(item:any,current:any) {
            this.$router.replace(item.url);
            this.setDismiss(item.url)
        }

        setDismiss(url: String){
            if(url) {
             let dismiss = (this.items.filter(res =>{
                   if(res.url === url){
                       return true;
                   }else{
                       return false;
                   }
               }).length > 0) ? true: false;
             let itemIndex = this.items.findIndex( (res: TabsItem) => {
                 if(res.url === url){
                     return true;
                 }else{
                     return false
                 }
             })
             if(itemIndex >= 0){
                 let currentIndex = this.items[itemIndex].name ;
                 // control tabitems active
                 this.current = currentIndex;
             }
             // control tabs show or hide
             this.dismiss = dismiss;
             // 处罚窗口resize 事件
             let resizeEvent = new Event('resize');
             window.dispatchEvent(resizeEvent);
            }
        }

        show() {
            this.dismiss = true;
        }

        hide() {
            this.dismiss = false;
        }

        @Watch('$route.path')
        public onChildChanged(val: string, oldVal: string) {
            this.setDismiss(val)
        }




    }
</script>
<style lang="scss">
    .md-example-child-tab-bar-4{
        .md-tab-bar{
            padding: 0;
        }
        .custom-item{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            height:100%;
            flex:1;
        }
        .md-tab-bar-list{
            width: 100%;
            justify-content: space-around;
            .md-tab-bar-item{
                padding: 0;
                margin: 0;
                flex: 1;
            }
        }
        .v-touch-ripple{
            display: flex;
            height: 100%;
            overflow: hidden;
            align-items: center;
            width: 100%;
        }
        img{
            width: 60px;
        }
        .icon{
            padding-left: 19px;
            padding-right: 19px;
            padding-bottom: 4px;
        }
        .text{
            font-size:20px;
        }
    }
</style>
<style lang="scss" scoped>
    .mytabs {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        pointer-events: none;
        .mytab{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            pointer-events: all;
            box-shadow: 0 7px 16px 0px rgba(38,38,38,.3);
        }
        .md-tab-bar{
            background: #ffffff;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: transform .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translate3d(0,100%,0);
    }
</style>
