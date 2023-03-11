"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6125],{89557:function(e,t,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var i=o?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(r,u,i):r[u]=e[u]}return r.default=e,t&&t.set(e,r),r}(r(70079)),u=r(26697),i=r(12489);function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(t){d(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function f(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(a,e);var t,r,i,c=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r,o=y(a);if(t){var u=y(this).constructor;r=Reflect.construct(o,arguments,u)}else r=o.apply(this,arguments);return(e=r)&&("object"===n(e)||"function"==typeof e)?e:s(this)});function a(){var e;!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,a);for(var t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];return d(s(e=c.call.apply(c,[this].concat(r))),"callPlayer",u.callPlayer),d(s(e),"duration",null),d(s(e),"currentTime",null),d(s(e),"fractionLoaded",null),d(s(e),"mute",function(){e.setVolume(0)}),d(s(e),"unmute",function(){null!==e.props.volume&&e.setVolume(e.props.volume)}),d(s(e),"ref",function(t){e.iframe=t}),e}return r=[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function(e,t){var r=this;(0,u.getSDK)("https://w.soundcloud.com/player/api.js","SC").then(function(n){if(r.iframe){var o=n.Widget.Events,u=o.PLAY,i=o.PLAY_PROGRESS,c=o.PAUSE,a=o.FINISH,f=o.ERROR;t||(r.player=n.Widget(r.iframe),r.player.bind(u,r.props.onPlay),r.player.bind(c,function(){r.duration-r.currentTime<.05||r.props.onPause()}),r.player.bind(i,function(e){r.currentTime=e.currentPosition/1e3,r.fractionLoaded=e.loadedProgress}),r.player.bind(a,function(){return r.props.onEnded()}),r.player.bind(f,function(e){return r.props.onError(e)})),r.player.load(e,l(l({},r.props.config.options),{},{callback:function(){r.player.getDuration(function(e){r.duration=e/1e3,r.props.onReady()})}}))}})}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){}},{key:"seekTo",value:function(e){this.callPlayer("seekTo",1e3*e)}},{key:"setVolume",value:function(e){this.callPlayer("setVolume",100*e)}},{key:"getDuration",value:function(){return this.duration}},{key:"getCurrentTime",value:function(){return this.currentTime}},{key:"getSecondsLoaded",value:function(){return this.fractionLoaded*this.duration}},{key:"render",value:function(){var e=this.props.display;return o.default.createElement("iframe",{ref:this.ref,src:"https://w.soundcloud.com/player/?url=".concat(encodeURIComponent(this.props.url)),style:{width:"100%",height:"100%",display:e},frameBorder:0,allow:"autoplay"})}}],f(a.prototype,r),i&&f(a,i),a}(o.Component);t.default=b,d(b,"displayName","SoundCloud"),d(b,"canPlay",i.canPlay.soundcloud),d(b,"loopOnEnded",!0)}}]);