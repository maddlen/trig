var v=Object.defineProperty;var g=(n,e,t)=>e in n?v(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var h=(n,e,t)=>(g(n,typeof e!="symbol"?e+"":e,t),t);let b=class{constructor(e){h(this,"scriptId","zbar_wasm");h(this,"video");h(this,"stream");this.el=e,this.loadZbarWasm()}dispatch(e,t){document.dispatchEvent(new CustomEvent(this.scriptId+e,{detail:t}))}on(e,t){document.addEventListener(this.scriptId+e,i=>t(i))}loadZbarWasm(){if(!document.getElementById(this.scriptId)){const e=document.createElement("script");e.id=this.scriptId,e.src="/vendor/barcode-scanner/zbar-wasm/zbar-wasm-0.10.1.js",document.head.appendChild(e)}}createVideo(){const e=document.createElement("video");e.muted=!0,e.autoplay=!0,e.playsInline=!0,this.el.appendChild(e),this.video=e}start(){this.createVideo(),navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment"}}).then(e=>{this.stream=e,this.video.srcObject=e,this.detectVideo(),this.dispatch("ready")})}stop(){this.stream.getVideoTracks().forEach(e=>e.stop()),this.video.remove()}detectVideo(){this.read(this.video).then(()=>requestAnimationFrame(()=>this.detectVideo()))}read(e){const t=e.naturalWidth||e.videoWidth||e.width,i=e.naturalHeight||e.videoHeight||e.height,a=new OffscreenCanvas(t,i),o=a.getContext("2d");if(a.height&&a.width){o.drawImage(e,0,0);const c=o.getImageData(0,0,a.width,a.height);return zbarWasm.scanImageData(c).then(l=>{if(l.length){const s=l[0].decode("utf-8");this.dispatch("result",{result:s})}})}else return Promise.resolve()}};function f(n,e,t,i,a,o,c,l){var s=typeof n=="function"?n.options:n;e&&(s.render=e,s.staticRenderFns=t,s._compiled=!0),i&&(s.functional=!0),o&&(s._scopeId="data-v-"+o);var d;if(c?(d=function(r){r=r||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!r&&typeof __VUE_SSR_CONTEXT__<"u"&&(r=__VUE_SSR_CONTEXT__),a&&a.call(this,r),r&&r._registeredComponents&&r._registeredComponents.add(c)},s._ssrRegister=d):a&&(d=l?function(){a.call(this,(s.functional?this.parent:this).$root.$options.shadowRoot)}:a),d)if(s.functional){s._injectStyles=d;var p=s.render;s.render=function(_,m){return d.call(m),p(_,m)}}else{var u=s.beforeCreate;s.beforeCreate=u?[].concat(u,d):[d]}return{exports:n,options:s}}const C={mixins:[Fieldtype],data(){return{isScanning:!1,scanner:void 0}},methods:{onScanResult(n){this.update(n.detail.result),this.isScanning=!1}}};var y=function(){var e=this,t=e._self._c;return t("div",{staticClass:"barcode_scanner-fieldtype-container"},[e.isScanning?t("barcode-scanner-modal",{attrs:{title:e.__("Barcode scanner")},on:{result:e.onScanResult,cancel:function(i){e.isScanning=!1}}}):e._e(),t("div",{staticClass:"input-group"},[t("div",{staticClass:"input-group-prepend flex items-center cursor-pointer",on:{click:function(i){e.isScanning=!0}}},[t("svg-icon",{staticClass:"w-4 h-4",attrs:{name:"light/revealer"}})],1),t("div",{staticClass:"input-text border border-gray-500 border-l-0"},[t("input",{staticClass:"input-text-minimal p-0 bg-transparent leading-none",domProps:{value:e.value},on:{input:e.update}})])])],1)},S=[],$=f(C,y,S,!1,null,null,null,null);const w=$.exports;const x={data(){return{escBinding:null,isScanning:!1,scanner:void 0}},methods:{dismiss(){this.scanner.stop(),this.$emit("cancel")},opened(){this.$emit("opened"),this.scanner=this.scanner||new BarcodeScanner(document.getElementById("barcode_scanner")),this.scanner.start(),this.scanner.on("ready",this.scan.bind(this))},scan(){this.isScanning=!0,this.scanner.on("result",this.onScanResult)},onScanResult(n){this.scanner.stop(),this.$emit("result",n)}},created(){this.escBinding=this.$keys.bind("esc",this.dismiss)},beforeDestroy(){this.escBinding.destroy()}};var B=function(){var e=this,t=e._self._c;return t("modal",{attrs:{name:"barcode-scanner-modal"},on:{opened:function(i){return e.opened()}}},[t("div",{staticClass:"barcode-scanner-modal flex flex-col h-full"},[t("header",{staticClass:"text-lg font-semibold px-5 py-3 bg-gray-200 rounded-t-lg flex items-center justify-between border-b"},[e._v(" "+e._s(e.__("Barcode scanner"))+" ")]),t("div",{staticClass:"flex-1 px-5 py-6 text-gray"},[t("div",{staticClass:"border border-dashed border-pink-dark"},[t("div",{staticClass:"flex relative",attrs:{id:"barcode_scanner"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.isScanning,expression:"isScanning"}],staticClass:"z-ray absolute w-full h-full"})])])]),t("div",{staticClass:"px-5 py-3 bg-gray-200 rounded-b-lg border-t flex items-center justify-end text-sm"},[t("button",{staticClass:"text-gray hover:text-gray-900",domProps:{textContent:e._s(e.__("Cancel"))},on:{click:function(i){return e.dismiss()}}})])])])},I=[],R=f(x,B,I,!1,null,null,null,null);const E=R.exports;window.BarcodeScanner=b;Statamic.booting(()=>{Statamic.$components.register("barcode_scanner-fieldtype",w),Statamic.$components.register("barcode-scanner-modal",E)});
