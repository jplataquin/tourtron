/**
const _createClass = function(){
    function defineProperties(target,props){
        for(var i=0;i<props.length;i++){
            var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;
            
            if("value"in descriptor){
                descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);
            }
        }
    }
    
    return function(Constructor,protoProps,staticProps){
        if(protoProps){
            defineProperties(Constructor.prototype,protoProps);
        }
        
        if(staticProps){
            defineProperties(Constructor,staticProps);
            return Constructor;
        }
    };
}();

function _classCallCheck(instance,Constructor){
    if(!(instance instanceof Constructor)){
        throw new TypeError("Cannot call a class as a function");
    }
}

function findKey(collection, predicate, eachFunc) {
    let result;
    
    eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
            result = key;
            return false;
        }
    });
    
    return result;
}

const BROWSER={
    messenger:/\bFB[\w_]+\/(Messenger|MESSENGER)/,
    facebook:/\bFB[\w_]+\//,
    twitter:/\bTwitter/i,
    line:/\bLine\//i,
    wechat:/\bMicroMessenger\//i,
    puffin:/\bPuffin/i,
    miui:/\bMiuiBrowser\//i,
    instagram:/\bInstagram/i,
    chrome:/\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
    safari:/Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
    ie:/IEMobile|MSIEMobile/,
    firefox:/fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/
};


const InApp = function(){

    function InApp(useragent)
    {
        _classCallCheck(this,InApp);
        this.ua='';
        this.ua=useragent;
    }
    
    _createClass(InApp,[
    {
        key:'browser',
        get:function get(){
            var _this=this;
            return findKey(BROWSER,function(regex){return regex.test(_this.ua);})||'other';
        }
    },
    {
        key:'isMobile',
        get:function get(){
            return /(iPad|iPhone|Android|Mobile)/i.test(this.ua)||false;
        }
    },
    {
        key:'isDesktop',
        get:function get(){
            return!this.isMobile;
        }
    },
    {
        key:'isInApp',
        get:function get(){
            var rules=['WebView','(iPhone|iPod|iPad)(?!.*Safari\/)','Android.*(wv|\.0\.0\.0)'];

            var regex = new RegExp('('+rules.join('|')+')','ig');
            return Boolean(this.ua.match(regex));

        }
    }]);

    return InApp;
}();

**/


function findKey(collection, predicate, eachFunc) {
    let result;
    
    eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
            result = key;
            return false;
        }
    });
    
    return result;
}

class DetectBrowser {

    constructor(){
        this.userAgent = navigator.userAgent || navigator.vendor || window.opera;


        this._browser = {
            messenger:/\bFB[\w_]+\/(Messenger|MESSENGER)/,
            facebook:/\bFB[\w_]+\//,
            twitter:/\bTwitter/i,
            line:/\bLine\//i,
            wechat:/\bMicroMessenger\//i,
            puffin:/\bPuffin/i,
            miui:/\bMiuiBrowser\//i,
            instagram:/\bInstagram/i,
            chrome:/\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
            safari:/Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
            ie:/IEMobile|MSIEMobile/,
            firefox:/fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/
        };
    }

    isInApp(){

        var rules=[
            'WebView',
            '(iPhone|iPod|iPad)(?!.*Safari\/)',
            'Android.*(wv|\.0\.0\.0)'
        ];

        var regex = new RegExp('('+rules.join('|')+')','ig');

        return Boolean(this.userAgent.match(regex));

    }

    isMobile(){
        return /(iPad|iPhone|Android|Mobile)/i.test(this.userAgent) || false;
    }


    browser(){
     
        return findKey(this._browser,(regex)=>{
            return regex.test(this.userAgent);
        })||'other';
    }
}

export default DetectBrowser;
