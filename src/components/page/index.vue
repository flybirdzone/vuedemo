<template>
    <div>
    <transition name="page-transition" :appear="move">
        <div class="page-wrap">
            <div class="head-wrap">
                <slot name="header"></slot>
            </div>



            <div ref="nav" class="nav-wrap" v-if="settings.nav.show">
                <div class="nav-inner" ref="navInner">
                    <Navbar v-if="!settings.nav.slot" ref="navbar" @back="back"  ></Navbar>
                    <slot name="nav"></slot>
                    <div class="navbackground" :style="{opacity:navBackground,background:settings.nav.theme}"></div>
                </div>
            </div>

            <md-scroll-view
                    ref="scrollView"
                    :scrolling-x="false"
                    :bouncing="settings.bouncing"
                    @refreshing="refreshing"
                    @endReached="more"
                    @scroll="onScroll"
            >
                <md-scroll-view-refresh
                        v-if="settings.pull"
                        slot="refresh"
                        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
                        :scroll-top="scrollTop"
                        :is-refreshing="isRefreshing"
                        :is-refresh-active="isRefreshActive"
                ></md-scroll-view-refresh>
                <slot ></slot>
                <md-scroll-view-more
                        v-if="settings.more"
                        slot="more"
                        :is-finished="isFinished"
                >
                    <md-activity-indicator
                            type="carousel"
                            :size="15"
                    ></md-activity-indicator>
                </md-scroll-view-more>
            </md-scroll-view>

            <div class="foot-wrap">
                <slot name="footer"></slot>
            </div>
        </div>
    </transition>
    <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Provide, Emit, Vue } from "vue-property-decorator/lib/vue-property-decorator";
    import  Navbar from "./Navbar.vue";
    import * as _ from "lodash";
    import {InterfacePage} from '@/components/index';
    declare global {
        interface Window {
            ScrollViewTrigger1:any
        }
    }

    const distance:number = 340;

    // 页面对象
    class ItemPage<T> {
        private name:string;

        constructor(name:string){
            this.name = name;
        }

        public scrollTop:Number = 0;

        getName() {
            return this.name;
        }

        setName(v:string) {
            this.name = v;
        }

    }
    const pageCatch:any = {};
    function getItemPage(name:string){

        if(!pageCatch[name]){
            let itempage = new ItemPage(name);
            pageCatch[name]= itempage;
            return itempage;
        }else {
            return pageCatch[name];
        }
    }


    @Component({
        components: {
            Navbar
        }
    })
    export default class Page extends Vue {

        // 页面首屏是否启用动画
        @Prop({default:true}) move?:boolean;

        // 接受页面属性
        @Prop() options ?:InterfacePage;

        @Prop() name ?:string;

        // 页面属性
        settings:InterfacePage = {
            nav:{
                show:false,
                theme:'#fff',
                layout:false,
                preventBack:false,
                slot:false,
                transition:false,
                name:''
            },
            tabs:{
              show:false
            },
            button:[],
            back:{callback:() => {} },
            pull:true,
            more:true,
            bouncing:true
        };
        // 加载更多控制  true 加载完成  false 加载更多
        private isFinished:boolean = false;
        // nav 背景色
        private navBackground:string = `1`;
        // 返回事件
        private backEvent:any = null;
        // 床口resize
        private resizeEvent:any = null;
        // 页面组件属性
        private itempage:any;

        created(){
            this.itempage = getItemPage(this.name || 'currentpage2');
            // 属性继承
            _.mergeWith(this.settings,this.options || {});
            // 默认为透明 当启用背景色变换
            if(this.settings.nav.transition) {
                this.navBackground = '0';
            }
        }

        // 生命周期mounted
        mounted() {
            // 计算滚动区域
            this._initScrollContent();
            // 监控历史导航
            this.historyMinitor();
            // 监控窗口
            this.resizeMinitor();

            this.$nextTick(()=>{
                this.$refs.navbar && (this.$refs.navbar as any).setTitle(this.settings.nav.name);
                setTimeout(()=>{
                    let scrollView:any = this.$refs.scrollView as any;
                    console.log(this.itempage.scrollTop ,this.itempage.name)
                    this.$refs.scrollView && (this.$refs.scrollView as any).scrollTo(0,this.itempage.scrollTop)
                },0)
            })
        };

        // 计算滚动区域在页面范围
        _initScrollContent() {
            this.$nextTick(()=>{
                // 滚动区域
                let scrollView:any = this.$refs.scrollView as any;
                let $app = this._getApp(this);
                $app.getTabs().then(($tabs:any)=>{
                    let tabs = $tabs.$el;
                    let tabsHeight = tabs.querySelector('.mytab').offsetHeight;
                    this.settings.tabs = this.settings.tabs as {};
                    // 显示导航
                    if(this.settings.nav.show){
                        // @layout true 站空间位置
                        if(this.settings.nav.layout){
                            let navInner: HTMLElement = this.$refs.navInner as HTMLElement;
                            let nav: HTMLElement = this.$refs.nav as HTMLElement;
                            let marginTop = nav.offsetHeight;
                            let bodyHeight = document.body.offsetHeight - nav.offsetHeight;
                            let style:string;
                            if(this.settings.tabs.show){
                                style = `margin-top:${marginTop}px;height:${bodyHeight - tabsHeight}px;`;
                            }else{
                                style = `margin-top:${marginTop}px;height:${bodyHeight}px;`;
                            }
                            let innerStyle = `box-shadow:  0 0px 4px 1px rgba(38, 38, 38, 0.3);`;
                            scrollView.$el.setAttribute('style',style);
                            navInner.setAttribute('style',innerStyle);
                        }
                        // @layout false 不占空间位置
                        if(!this.settings.nav.layout){
                            let bodyHeight = document.body.offsetHeight;
                            let style:string;
                            if(this.settings.tabs.show){
                                style = `height:${bodyHeight - tabsHeight}px;`;
                            }else{
                                style = `height:${bodyHeight}px;`;
                            }
                            scrollView.$el.setAttribute('style',style);
                        }
                    }else {
                        let bodyHeight = document.body.offsetHeight;
                        let style:string;
                        if(this.settings.tabs.show){
                            style = `height:${bodyHeight - tabsHeight}px;`;
                        }else{
                            style = `height:${bodyHeight}px;`;
                        }
                        scrollView.$el.setAttribute('style',style);
                    }
                    // 重新计算滚动区域
                    scrollView.reflowScroller()
                })
            })
        }

        _getApp($app:any):any{
            if($app.name && $app.name == "app"){
                return $app
            }else{
                return this._getApp($app.$parent)
            }
        }


        onScroll(pageScroll:{scrollTop:number,scrollLeft:number}){
            // 当transition == true 计算 nav 背景色透明度

            if(pageScroll.scrollTop >= 0){
                console.log(pageScroll.scrollTop);
                this.itempage.scrollTop = pageScroll.scrollTop;
            }else {
                this.itempage.scrollTop = 0;
            }

            if(this.settings.nav.transition){
                this.navBackgroundColor(pageScroll)
            }
        }

        navBackgroundColor({scrollTop,scrollLeft}:{scrollTop:number,scrollLeft:number}){
            let scrollDistance = scrollTop - 50;
            if( scrollDistance > 0){
                let opacity = ((scrollDistance/distance) >= 1 ? 1 : parseFloat(Number(scrollDistance/distance).toFixed(2)));
                this.navBackground = `${opacity}`;
                this.scroll(opacity,scrollTop);
            }else{
                this.scroll(0,scrollTop);
            }
        }

        @Emit()
        scroll(percent:number,scrollTop:number){
        }

        // 历史记录监控
        historyMinitor(){
            // 阻止历史
            if(this.settings.nav.preventBack){
                window.history.pushState("back","");
                // 返回事件毁掉函数
                this.backEvent = function(e:any){
                        window.history.pushState("back","");
                };
                window.addEventListener("popstate",this.backEvent , false)
            }
        }

        // 返回
        back() {
            this.$router.back();
            this.settings.back = this.settings.back as {callback:() => void};
            this.settings.back.callback && this.settings.back.callback();
        }

        // 抽口监控
        resizeMinitor(){
            // 用定时器防止 速度过快出现bug
            let timer:any = null;
            this.resizeEvent = function(e:any) {
                if(timer){
                    clearTimeout(timer)
                }
                timer = setTimeout(()=>{
                    Vue.nextTick(()=>{
                        if(this.$refs.scrollView) {
                            this._initScrollContent();
                        }
                    });
                },100)

            }
            window.addEventListener("resize", this.resizeEvent.bind(this), false)
        }

        // 通知外部下拉事件
        @Emit()
        refreshing() {
            return this.$refs.scrollView;
        };

        // 通知外部加载更多
        @Emit()
        more() {
            return this.$refs.scrollView;
        }
        // 获取上拉状态
        getFinish(){
            return this.isFinished;
        }

        // 设置上拉是否完成
        setFinish(v:boolean){
            this.isFinished = v;
        }

        // 通知组件下拉刷新完成
        finishRefresh() {
            let scrollView:any = this.$refs.scrollView as any;
            scrollView.finishRefresh();
        }

        // 通知page组件上拉加载更多
        finishLoadMore(){
            let scrollView:any = this.$refs.scrollView as any;
            scrollView.finishLoadMore();
        }


        // 移除监控历史事件
        removeEventMinitor(){
            // 返回事件
            if(this.backEvent){
                window.removeEventListener('popstate',this.backEvent);
                this.backEvent = null;
            }
            // 窗口大小更改事件
            if(this.resizeEvent){
                window.removeEventListener('resize',this.resizeEvent);
                this.resizeEvent = null;
            }
        }

        beforeDestroy(): void {
            this.removeEventMinitor();
        }
        destroyed(): void {
            this.removeEventMinitor();
        }

    }
</script>
<style lang="scss">
    .page-wrap{
        .scroll-view-container{
            min-height: 100%;
        }
    }
</style>
<style scoped lang="scss">



    .nav-wrap{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        .nav-inner{
            position: relative;
            .nav-content{
                width: 100vw;
                height: 90px;
                display: flex;
                overflow: hidden;
                align-items: center;
                overflow: hidden;
            }
            .back,.name,fun{
                font-size: 36px;
            }
            .back{
                flex: 0 0 100px;
                display: flex;
                justify-content: center;
                .back-btn{
                    border-radius: 50%;
                    display: flex;
                    width: 70px;
                    height: 70px;
                    overflow: hidden;
                    align-items: center;
                    justify-content: center;
                }
            }
            .name{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                overflow: hidden;
            }
            .fun{
                flex: 0 0 100px;
            }
            .navbackground{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
            }
        }

    }
    .page-wrap{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #ffffff;
    }
    .head-wrap,.foot-wrap{
        position: fixed;
        left: 0;
        right: 0;
    }
    .head-wrap{
        top: 0;
        z-index: 2;
    }
    .foot-wrap{
        bottom: 0;
        z-index: 2;
    }
    .page-transition-enter-active {
        transition: opacity 0.15s linear,transform 0.01s linear ;
    }
    .page-transition-leave-active {
        /*transition: opacity 10s;*/
    }
    .page-transition-enter {
        opacity: 0;
        transform: scale3d(0.95,0.95,1) translate3d(0,30px,0);
    }
    .page-transition-leave-to {
        opacity: 1;
        z-index: -100;
    }

    .nav-name-enter-active {
        transition: all .2s ease;
    }
    .nav-name-enter {
        transform: translateX(300px);
        opacity: 0;
    }

    .nav-left-enter-active {
        transition: all .2s ease;
    }
    .nav-left-enter {
        transform: translateX(-100px);
        opacity: 0;
    }
</style>
