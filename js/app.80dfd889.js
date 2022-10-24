(function(){"use strict";var e={6990:function(e,t,n){var r=n(6369),o=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},i=[],u=n(1001),a={},c=(0,u.Z)(a,o,i,!1,null,null,null),l=c.exports,f=n(2631),s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"home"},e._l(e.clickList,(function(n,r){return t("div",{key:r,staticClass:"btn",on:{click:function(t){return e.go(n)}}},[e._v(" "+e._s(n.label)+" ")])})),0)},d=[],p=(n(7658),{name:"HomeView",components:{},data(){return{clickList:[{label:"shop",router:"/shop"},{label:"todoList",router:"/todo"},{label:"weather",router:"/weather"},{label:"bill",router:"/bill"},{label:"...",router:""}]}},methods:{go(e){this.$router.push({path:e.router})}}}),h=p,m=(0,u.Z)(h,s,d,!1,null,"e18705ee",null),v=m.exports;r["default"].use(f.ZP);const b=[{path:"/",name:"home",component:v},{path:"/about",name:"about",component:()=>n.e(443).then(n.bind(n,5399))},{path:"/shop",name:"shop",component:()=>n.e(443).then(n.bind(n,5448))},{path:"/todo",name:"todo",component:()=>n.e(98).then(n.bind(n,6098))},{path:"/weather",name:"weather",component:()=>n.e(633).then(n.bind(n,8633))},{path:"/bill",name:"bill",component:()=>n.e(137).then(n.bind(n,4137))},{path:"*",name:"404",component:()=>n.e(685).then(n.bind(n,5685))}],g=new f.ZP({routes:b});var y=g,w=n(3822);r["default"].use(w.ZP);var k=new w.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),C=n(8499),O=n.n(C),_=n(70);r["default"].use(O()),r["default"].prototype.axios=_.Z,r["default"].config.productionTip=!1,new r["default"]({el:"#app",router:y,store:k,render:e=>e(l)}).$mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,i){if(!r){var u=1/0;for(f=0;f<e.length;f++){r=e[f][0],o=e[f][1],i=e[f][2];for(var a=!0,c=0;c<r.length;c++)(!1&i||u>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(a=!1,i<u&&(u=i));if(a){e.splice(f--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[r,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+(443===e?"about":e)+"."+{98:"852583fc",137:"31349365",443:"8a5444df",633:"d4e1fc3b",685:"0e49f1bd"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{98:"9dd6731b",633:"a852995c",685:"71df8315"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="test:";n.l=function(r,o,i,u){if(e[r])e[r].push(o);else{var a,c;if(void 0!==i)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var s=l[f];if(s.getAttribute("src")==r||s.getAttribute("data-webpack")==t+i){a=s;break}}a||(c=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+i),a.src=r),e[r]=[o];var d=function(t,n){a.onerror=a.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/demo/"}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var u=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=u,c.request=a,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=i,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var u=document.getElementsByTagName("style");for(r=0;r<u.length;r++){o=u[r],i=o.getAttribute("data-href");if(i===e||i===t)return o}},r=function(r){return new Promise((function(o,i){var u=n.miniCssF(r),a=n.p+u;if(t(u,a))return o();e(r,a,o,i)}))},o={143:0};n.f.miniCss=function(e,t){var n={98:1,633:1,685:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var u=n.p+n.u(t),a=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),u=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+u+")",a.name="ChunkLoadError",a.type=i,a.request=u,o[1](a)}};n.l(u,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,u=r[0],a=r[1],c=r[2],l=0;if(u.some((function(t){return 0!==e[t]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var f=c(n)}for(t&&t(r);l<u.length;l++)i=u[l],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(f)},r=self["webpackChunktest"]=self["webpackChunktest"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(6990)}));r=n.O(r)})();
//# sourceMappingURL=app.80dfd889.js.map