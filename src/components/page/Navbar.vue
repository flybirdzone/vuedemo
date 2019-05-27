<template>
    <div class="navbar-components">
        <div class="back-btn-wrap" @click="back">
             <touch-ripple class="back-btn" :speed="2" :opacity="0.5" color="#d3d3d3" transition="ease-out">
                 <md-icon
                         name="arrow-left"
                         size="lg"
                 ></md-icon>
             </touch-ripple>
        </div>
        <div class="title">
            {{title}}
        </div>
        <div class="right-menu">

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Provide, Emit, Vue } from "vue-property-decorator"

    @Component
    export default class Navbar extends Vue {
        title:string = '';
        created() {

        }
        mounted() {

        }
        @Emit()
        back(){
        }
        setTitle(v:string) {
            this.title = v;
        }
    }
</script>

<style lang="scss">
    .navbar-components{
        display: flex;
        padding: 0px 30px;
        align-items: center;
        height: 90px;
        .back-btn-wrap{
            width: 75px;
            height: 75px;
            border-radius: 50%;
            overflow: hidden;
            .back-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                font-weight: 600;
            }
        }
        .title{
            flex: 1;
            font-size: 38px;
            font-weight: 600;
        }
        .right-menu{
            min-width: 80px;
        }
    }
</style>
