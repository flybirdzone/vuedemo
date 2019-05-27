import { Vue } from "vue-property-decorator";

class Channel {

    private _vm: any = new Vue({});

    emit(eventNmae: string,args: any) {
        this._vm.$emit(eventNmae,args);
    }

    on(eventNmae: string,callback: Function){
        this._vm.$on(eventNmae,callback)
    }
}

let eventProxy = new Channel();

export default eventProxy;
