import { Component, Prop, Provide, Vue } from "vue-property-decorator";

class Tiancai {
    tiancai() {

    }
}
@Component
export  class PageMixins extends Vue{
    @Provide() mixinValue = 'Hello';

    beforeRouteEnter (to:any, from:any, next:any) {
        next()
        //console.log(to,from,next)
        // called before the route that renders this component is confirmed.
        // does NOT have access to `this` component instance,
        // because it has not been created yet when this guard is called!
    }
}
