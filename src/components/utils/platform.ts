/**
 * 判断平台类型 在网上查找整理的 可能不准
 */
interface Platform {
    device: string;
    is: (type: any) => boolean;
    isIos: () => boolean;
    isIPhone: () => boolean;
    isIPad: () => boolean;
    isAndroid: () => boolean;
    isWeChat: () => boolean;
    isIphoneX: () => boolean;
    isIPhoneXSMax:() => boolean;
    isIPhoneXR: () => boolean;
}
const platform = <Platform>{};
platform.device = navigator.userAgent.toLowerCase();
platform.is = function(type):boolean{
    console.log(this);
    return false;
};

/**
 * 判断平台为ios
 */
platform.isIos = function () {
    if(/(iphone|ipad|ipod|ios)/i.test(this.device)){
        return true;
    }else{
        return false;
    }
};
/**
 * 判断平台为iphone
 */
platform.isIPhone =function (){
    if(/iphone/i.test(this.device)){
        return true;
    }else{
        return false;
    }
};
/**
 * 判断平台为ipad
 */
platform.isIPad = function (){
    if(/ipad/i.test(this.device)){
        return true;
    }else{
        return false;
    }
};
/**
 * 判断平台为android
 */
platform.isAndroid = function () {
    if(/android/i.test(this.device)){
        return true;
    }else{
        return false;
    }
};
/**
 * 判断平台为wechat
 */
platform.isWeChat = function () {
    if(/micromessenger/i.test(this.device)){
        return true;
    }else{
        return false;
    }
};
/**
 * 判断平台为iphonex
 */
platform.isIphoneX =function () {
    let isIos = this.isIos();
    if(isIos){
        if (window.screen.height == 812 && window.screen.width == 375){
            return true;
        }else{
            return false;
        }
    }else{
        return false
    }
};
/**
 * 判断平台为isIphonexr
 */
platform.isIPhoneXR = function () {
    let isIos = this.isIos();
    if(isIos){
        if (window.screen.height == 896 && window.screen.width == 414 && window.devicePixelRatio === 3){
            return true;
        }else{
            return false;
        }
    }else{
        return false
    }
};
/**
 * 判断平台为iphonexsmax
 */
platform.isIPhoneXSMax = function () {
    let isIos = this.isIos();
    if(isIos){
        if (window.screen.height == 896 && window.screen.width == 414 && window.devicePixelRatio === 2){
            return true;
        }else{
            return false;
        }
    }else{
        return false
    }
};

export { platform };
