(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-84e8","chunk-08d6","chunk-fb87","chunk-8a30"],{"14Xm":function(e,t,r){e.exports=r("cSMa")},"3ADX":function(e,t,r){"use strict";var n=r("14Xm"),o=r.n(n),i=r("4d7F"),a=r.n(i),s=r("D3Ub"),l=r.n(s),u=r("bNJ/");function c(e,t){return Object(u.a)({url:e,method:"get",params:t})}t.a={data:function(){return{loading:!0,data:[],page:0,size:10,total:0,url:"",params:{},query:{}}},methods:{init:function(){var e=this;return l()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.beforeInit();case 2:if(t.sent){t.next=4;break}return t.abrupt("return");case 4:return t.abrupt("return",new a.a(function(t,r){e.loading=!0,c(e.url,e.params).then(function(r){e.total=r.total,e.data=r.list,setTimeout(function(){e.loading=!1},200),t(r)}).catch(function(t){e.loading=!1,r(t)})}));case 5:case"end":return t.stop()}},t,e)}))()},beforeInit:function(){return!0},pageChange:function(e){this.page=e-1,this.init()},sizeChange:function(e){this.page=0,this.size=e,this.init()}}}},"41Be":function(e,t,r){"use strict";r.d(t,"a",function(){return o});var n=r("Q2AE");function o(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(n.a.getters&&n.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},D3Ub:function(e,t,r){"use strict";t.__esModule=!0;var n=function(e){return e&&e.__esModule?e:{default:e}}(r("4d7F"));t.default=function(e){return function(){var t=e.apply(this,arguments);return new n.default(function(e,r){return function o(i,a){try{var s=t[i](a),l=s.value}catch(e){return void r(e)}if(!s.done)return n.default.resolve(l).then(function(e){o("next",e)},function(e){o("throw",e)});e(l)}("next")})}}},E5PS:function(e,t,r){},HzRm:function(e,t,r){"use strict";r.r(t);var n=r("41Be"),o=r("3ADX"),i=r("wk8/"),a=r("zF5t"),s=r("7Qib"),l=r("iM05"),u=r("YOUW"),c={components:{eHeader:l.default,edit:u.default},mixins:[o.a],data:function(){return{roles:[],delLoading:!1,sup_this:this}},created:function(){var e=this;this.getRoles(),this.$nextTick(function(){e.init()})},methods:{parseTime:s.c,checkPermission:n.a,beforeInit:function(){this.url="/user/tree";var e=this.query,t=e.type,r=e.value,n=e.enabled;return this.params={page:this.page,size:this.size,sort:"+id"},t&&r&&(this.params[t]=r),""!==n&&null!==n&&(this.params.enabled=n),!0},subDelete:function(e,t){var r=this;this.delLoading=!0,Object(i.b)(t.id).then(function(){r.delLoading=!1,t.delPopover=!1,r.init(),r.$notify({title:"删除成功",type:"success",duration:1500})}).catch(function(e){r.delLoading=!1,t.delPopover=!1,console.log(e.msg)})},getRoles:function(){var e=this;Object(a.d)().then(function(t){e.roles=t.list})}}},d=(r("dRRL"),r("KHd+")),f=Object(d.a)(c,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("eHeader",{attrs:{roles:e.roles,query:e.query}}),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.data,size:"small",border:""}},[r("el-table-column",{attrs:{prop:"username",label:"用户名"}}),e._v(" "),r("el-table-column",{attrs:{label:"头像"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{staticClass:"avatar",attrs:{src:e.row.avatar+"?size=120",width:"100px",align:"center"}})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),e._v(" "),r("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.enabled?"激活":"锁定"))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"注册日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e.parseTime(1e3*t.row.createTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.checkPermission(["ADMIN","USER_ALL","USER_EDIT"])?r("edit",{attrs:{data:t.row,roles:e.roles,sup_this:e.sup_this}}):e._e(),e._v(" "),e.checkPermission(["ADMIN","USER_ALL","USER_DELETE"])?r("el-popover",{attrs:{placement:"top",width:"180"},model:{value:t.row.delPopover,callback:function(r){e.$set(t.row,"delPopover",r)},expression:"scope.row.delPopover"}},[r("p",[e._v("确定删除本条数据吗？")]),e._v(" "),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.row.delPopover=!1}}},[e._v("取消")]),e._v(" "),r("el-button",{attrs:{loading:e.delLoading,type:"primary",size:"mini"},on:{click:function(r){e.subDelete(t.$index,t.row)}}},[e._v("确定")])],1),e._v(" "),1e4!=t.row.id?r("el-button",{attrs:{slot:"reference",type:"danger",size:"mini"},on:{click:function(e){t.row.delPopover=!0}},slot:"reference"},[e._v("删除")]):e._e()],1):e._e()]}}])})],1),e._v(" "),r("el-pagination",{staticStyle:{"margin-top":"8px"},attrs:{total:e.total,layout:"total, prev, pager, next, sizes"},on:{"size-change":e.sizeChange,"current-change":e.pageChange}})],1)},[],!1,null,"499125a9",null);f.options.__file="index.vue";t.default=f.exports},SUGL:function(e,t,r){"use strict";var n=r("tvDv");r.n(n).a},YOUW:function(e,t,r){"use strict";r.r(t);var n={components:{eForm:r("fIwS").default},props:{roles:{type:Array,required:!0},data:{type:Object,required:!0},sup_this:{type:Object,required:!0}},methods:{to:function(){var e=this.$refs.form;e.roleIds=[],e.form={id:this.data.id,username:this.data.username,email:this.data.email,enabled:this.data.enabled?"true":"false",roles:[]},this.data.roles||(this.data.roles=[]),this.data.roles.forEach(function(t,r){e.roleIds.push(t.id)}),e.dialog=!0}}},o=(r("kYG4"),r("KHd+")),i=Object(o.a)(n,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[1e4!=e.data.id?r("el-button",{attrs:{size:"mini",type:"success"},on:{click:e.to}},[e._v("编辑")]):e._e(),e._v(" "),1e4===e.data.id?r("el-tag",{staticStyle:{color:"#666666","font-weight":"bolder"}},[e._v("不可编辑")]):e._e(),e._v(" "),r("eForm",{ref:"form",attrs:{roles:e.roles,sup_this:e.sup_this,"is-add":!1}})],1)},[],!1,null,"174394a8",null);i.options.__file="edit.vue";t.default=i.exports},cSMa:function(e,t,r){var n=function(){return this}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,e.exports=r("u4eC"),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(e){n.regeneratorRuntime=void 0}},dRRL:function(e,t,r){"use strict";var n=r("E5PS");r.n(n).a},fIwS:function(e,t,r){"use strict";r.r(t);var n=r("wk8/"),o=r("cCY5"),i=r.n(o),a=(r("VCwm"),{name:"Form",components:{TreeSelect:i.a},props:{roles:{type:Array,required:!0},isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{dialog:!1,loading:!1,form:{username:"",email:"",enabled:"false",status:1,roles:[]},roleIds:[],rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],status:[{required:!0,message:"状态不能为空",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.loading=!0,e.form.roles=[];var r=e;e.roleIds.forEach(function(e,t){var n={id:e};r.form.roles.push(n)}),e.isAdd?e.doAdd():e.doEdit()})},doAdd:function(){var e=this;Object(n.a)(this.form).then(function(t){e.resetForm(),e.$notify({title:"添加成功",message:t.msg,type:"success",duration:1e4}),e.loading=!1,e.$parent.$parent.init()}).catch(function(t){e.loading=!1,console.log(t.response.data.message)})},doEdit:function(){var e=this;Object(n.c)(this.form).then(function(t){e.resetForm(),e.$notify({title:"修改成功",type:"success",duration:1500}),e.loading=!1,e.sup_this.init()}).catch(function(t){e.loading=!1,console.log(t.response.data.message)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.roleIds=[],this.form={username:"",email:"",enabled:"false",roles:[]}}}}),s=(r("SUGL"),r("KHd+")),l=Object(s.a)(a,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{"append-to-body":!0,visible:e.dialog,title:e.isAdd?"新增用户":"编辑用户",width:"500px"},on:{"update:visible":function(t){e.dialog=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"66px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{staticStyle:{width:"370px"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{staticStyle:{width:"370px"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"状态",prop:"enabled"}},[r("el-radio",{attrs:{label:"true"},model:{value:e.form.enabled,callback:function(t){e.$set(e.form,"enabled",t)},expression:"form.enabled"}},[e._v("激活")]),e._v(" "),r("el-radio",{attrs:{label:"false"},model:{value:e.form.enabled,callback:function(t){e.$set(e.form,"enabled",t)},expression:"form.enabled"}},[e._v("锁定")])],1),e._v(" "),r("el-form-item",{staticStyle:{"margin-bottom":"0px"},attrs:{label:"角色"}},[r("TreeSelect",{staticStyle:{width:"370px"},attrs:{multiple:!0,options:e.roles,placeholder:"请选择角色"},model:{value:e.roleIds,callback:function(t){e.roleIds=t},expression:"roleIds"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),r("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"c11d6e38",null);l.options.__file="form.vue";t.default=l.exports},iM05:function(e,t,r){"use strict";r.r(t);var n=r("41Be"),o=r("7Qib"),i={components:{eForm:r("fIwS").default},props:{roles:{type:Array,required:!0},query:{type:Object,required:!0}},data:function(){return{downloadLoading:!1,queryTypeOptions:[{key:"username",display_name:"用户名"},{key:"email",display_name:"邮箱"}],enabledTypeOptions:[{key:"true",display_name:"激活"},{key:"false",display_name:"锁定"}]}},methods:{checkPermission:n.a,toQuery:function(){this.$parent.page=0,this.$parent.init()},download:function(){var e=this;this.downloadLoading=!0,Promise.all([r.e("chunk-04d5"),r.e("chunk-1f2f")]).then(r.bind(null,"S/jZ")).then(function(t){var r=e.formatJson(["id","username","email","avatar","enabled","createTime","lastPasswordResetTime"],e.$parent.data);t.export_json_to_excel({header:["ID","用户名","邮箱","头像地址","状态","注册日期","最后修改密码日期"],data:r,filename:"table-list"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"createTime"===e||"lastPasswordResetTime"===e?Object(o.c)(t[e]):"enabled"===e?Object(o.c)(t[e])?"启用":"禁用":t[e]})})}}},a=r("KHd+"),s=Object(a.a)(i,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"head-container"},[r("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入用户名"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.toQuery(t):null}},model:{value:e.query.value,callback:function(t){e.$set(e.query,"value",t)},expression:"query.value"}}),e._v(" "),r("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{clearable:"",placeholder:"类型"},model:{value:e.query.type,callback:function(t){e.$set(e.query,"type",t)},expression:"query.type"}},e._l(e.queryTypeOptions,function(e){return r("el-option",{key:e.key,attrs:{label:e.display_name,value:e.key}})})),e._v(" "),r("el-select",{staticClass:"filter-item",staticStyle:{width:"90px"},attrs:{clearable:"",placeholder:"状态"},on:{change:e.toQuery},model:{value:e.query.enabled,callback:function(t){e.$set(e.query,"enabled",t)},expression:"query.enabled"}},e._l(e.enabledTypeOptions,function(e){return r("el-option",{key:e.key,attrs:{label:e.display_name,value:e.key}})})),e._v(" "),r("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:e.toQuery}},[e._v(e._s(e.$t("actions.search")))]),e._v(" "),r("div",{staticStyle:{display:"inline-block",margin:"0px 2px"}},[e.checkPermission(["ADMIN","USER_ALL","USER_CREATE"])?r("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.$refs.form.dialog=!0}}},[e._v(e._s(e.$t("actions.add")))]):e._e(),e._v(" "),r("eForm",{ref:"form",attrs:{roles:e.roles,"is-add":!0}})],1),e._v(" "),e.checkPermission(["ADMIN"])?r("el-button",{staticClass:"filter-item",attrs:{loading:e.downloadLoading,size:"mini",type:"primary",icon:"el-icon-download"},on:{click:e.download}},[e._v(e._s(e.$t("actions.export")))]):e._e()],1)},[],!1,null,null,null);s.options.__file="header.vue";t.default=s.exports},kYG4:function(e,t,r){"use strict";var n=r("vfLn");r.n(n).a},tvDv:function(e,t,r){},u4eC:function(e,t){!function(t){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag",u="object"==typeof e,c=t.regeneratorRuntime;if(c)u&&(e.exports=c);else{(c=t.regeneratorRuntime=u?e.exports:{}).wrap=_;var d="suspendedStart",f="suspendedYield",p="executing",h="completed",m={},v={};v[a]=function(){return this};var y=Object.getPrototypeOf,g=y&&y(y(q([])));g&&g!==n&&o.call(g,a)&&(v=g);var b=L.prototype=x.prototype=Object.create(v);k.prototype=b.constructor=L,L.constructor=k,L[l]=k.displayName="GeneratorFunction",c.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===k||"GeneratorFunction"===(t.displayName||t.name))},c.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,L):(e.__proto__=L,l in e||(e[l]="GeneratorFunction")),e.prototype=Object.create(b),e},c.awrap=function(e){return{__await:e}},E(S.prototype),S.prototype[s]=function(){return this},c.AsyncIterator=S,c.async=function(e,t,r,n){var o=new S(_(e,t,r,n));return c.isGeneratorFunction(t)?o:o.next().then(function(e){return e.done?e.value:o.next()})},E(b),b[l]="Generator",b[a]=function(){return this},b.toString=function(){return"[object Generator]"},c.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},c.values=q,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach($),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,o){return s.type="throw",s.arg=e,t.next=n,o&&(t.method="next",t.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var l=o.call(a,"catchLoc"),u=o.call(a,"finallyLoc");if(l&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),$(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;$(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:q(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),m}}}function _(e,t,r,n){var o=t&&t.prototype instanceof x?t:x,i=Object.create(o.prototype),a=new P(n||[]);return i._invoke=function(e,t,r){var n=d;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw i;return R()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=O(a,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var l=w(e,t,r);if("normal"===l.type){if(n=r.done?h:f,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=h,r.method="throw",r.arg=l.arg)}}}(e,r,a),i}function w(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}function x(){}function k(){}function L(){}function E(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function S(e){var t;this._invoke=function(r,n){function i(){return new Promise(function(t,i){!function t(r,n,i,a){var s=w(e[r],e,n);if("throw"!==s.type){var l=s.arg,u=l.value;return u&&"object"==typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(e){t("next",e,i,a)},function(e){t("throw",e,i,a)}):Promise.resolve(u).then(function(e){l.value=e,i(l)},a)}a(s.arg)}(r,n,t,i)})}return t=t?t.then(i,i):i()}}function O(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,O(e,t),"throw"===t.method))return m;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=w(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,m;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,m):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function j(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function $(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(j,this),this.reset(!0)}function q(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){for(;++n<e.length;)if(o.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return i.next=i}}return{next:R}}function R(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},vfLn:function(e,t,r){},zF5t:function(e,t,r){"use strict";r.d(t,"d",function(){return i}),r.d(t,"a",function(){return a}),r.d(t,"b",function(){return s}),r.d(t,"c",function(){return l});var n=r("bNJ/"),o=r("8SHQ");function i(){return Object(n.a)({url:o.a.PathRoleTree,method:"get"})}function a(e){return Object(n.a)({url:"/role",method:"post",data:e})}function s(e){var t={id:e};return Object(n.a)({url:"/role",method:"delete",data:t})}function l(e){return Object(n.a)({url:"/role",method:"put",data:e})}}}]);