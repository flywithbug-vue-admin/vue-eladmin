(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5764","chunk-c09b"],{"41Be":function(e,t,o){"use strict";o.d(t,"a",function(){return r});var i=o("Q2AE");function r(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(i.a.getters&&i.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},"5ZET":function(e,t,o){"use strict";o.r(t);var i=o("41Be"),r={components:{eForm:o("gAlZ").default},props:{query:{type:Object,required:!0},menus:{type:Array,required:!0},roles:{type:Array,required:!0}},data:function(){return{downloadLoading:!1}},methods:{checkPermission:i.a,toQuery:function(){console.log(this.query),this.$parent.page=0,this.$parent.init()}}},n=o("KHd+"),s=Object(n.a)(r,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"head-container"},[o("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入名称搜索"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.toQuery(t):null}},model:{value:e.query.value,callback:function(t){e.$set(e.query,"value",t)},expression:"query.value"}}),e._v(" "),o("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:e.toQuery}},[e._v("搜索")]),e._v(" "),o("div",{staticStyle:{display:"inline-block",margin:"0px 2px"}},[e.checkPermission(["ADMIN","MENU_ALL","MENU_CREATE"])?o("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.$refs.form.dialog=!0}}},[e._v("新增")]):e._e(),e._v(" "),o("eForm",{ref:"form",attrs:{roles:e.roles,menus:e.menus,"is-add":!0}})],1)],1)},[],!1,null,null,null);s.options.__file="header.vue";t.default=s.exports},HufR:function(e,t,o){"use strict";var i=o("oDta");o.n(i).a},NT5j:function(e,t,o){},R3kk:function(e,t,o){"use strict";var i=o("NT5j");o.n(i).a},gAlZ:function(e,t,o){"use strict";o.r(t);var i=o("Hycs"),r=o("cCY5"),n=o.n(r),s=/\.\/(.*)\.svg/,l=function(e){return e.keys()}(o("Uf/o")).map(function(e){return e.match(s)[1]}),a={name:"IconSelect",data:function(){return{name:"",iconList:l}},methods:{filterIcons:function(){var e=this;this.name?this.iconList=this.iconList.filter(function(t){return t.includes(e.name)}):this.iconList=l},selectedIcon:function(e){this.$emit("selected",e),document.body.click()},reset:function(){this.name="",this.iconList=l}}},c=(o("HufR"),o("KHd+")),u=Object(c.a)(a,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"icon-body"},[o("el-input",{staticStyle:{position:"relative"},attrs:{clearable:"",placeholder:"请输入图标名称"},on:{clear:e.filterIcons},nativeOn:{input:function(t){return e.filterIcons(t)}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}},[o("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})]),e._v(" "),o("div",{staticClass:"icon-list"},e._l(e.iconList,function(t,i){return o("div",{key:i,on:{click:function(o){e.selectedIcon(t)}}},[o("svg-icon",{staticStyle:{height:"30px",width:"16px"},attrs:{"icon-class":t}}),e._v(" "),o("span",[e._v(e._s(t))])],1)}))],1)},[],!1,null,"1628183e",null);u.options.__file="index.vue";var f=u.exports,m=(o("VCwm"),{components:{Treeselect:n.a,IconSelect:f},props:{menus:{type:Array,required:!0},roles:{type:Array,required:!0},isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{loading:!1,dialog:!1,form:{name:"",sort:999,path:"",component:"",iframe:"false",roles:[],pid:0,icon:""},roleIds:[],rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],sort:[{required:!0,message:"请输入序号",trigger:"blur",type:"number"}],iframe:[{required:!0,message:"请选择菜单类型",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.loading=!0,e.form.roles=[];var o=e;e.roleIds.forEach(function(e,t){var i={id:e};o.form.roles.push(i)}),e.isAdd?e.doAdd():e.doEdit()})},doAdd:function(){var e=this;Object(i.a)(this.form).then(function(t){e.resetForm(),e.$notify({title:"添加成功",type:"success",duration:2500}),e.loading=!1,setTimeout(function(){e.$parent.$parent.init(),e.$parent.$parent.getMenus()},200)}).catch(function(t){e.loading=!1,console.log(t.response.data.message)})},doEdit:function(){var e=this;Object(i.d)(this.form).then(function(t){e.resetForm(),e.$notify({title:"修改成功",type:"success",duration:2500}),e.loading=!1,setTimeout(function(){e.sup_this.init(),e.sup_this.getMenus()},200)}).catch(function(t){e.loading=!1,console.log(t.msg)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={name:"",sort:999,path:"",component:"",iframe:"false",roles:[],pid:0,icon:""},this.roleIds=[]},selected:function(e){this.form.icon=e}}}),d=(o("R3kk"),Object(c.a)(m,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dialog",{attrs:{"append-to-body":!0,visible:e.dialog,title:e.isAdd?"新增菜单":"编辑菜单",width:"600px"},on:{"update:visible":function(t){e.dialog=t}}},[o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"80px"}},[o("el-form-item",{attrs:{label:"菜单图标"}},[o("el-popover",{attrs:{placement:"bottom-start",width:"460",trigger:"click"},on:{show:function(t){e.$refs.iconSelect.reset()}}},[o("IconSelect",{ref:"iconSelect",on:{selected:e.selected}}),e._v(" "),o("el-input",{staticStyle:{width:"460px"},attrs:{slot:"reference",placeholder:"点击选择图标",readonly:""},slot:"reference",model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}},[e.form.icon?o("svg-icon",{staticClass:"el-input__icon",staticStyle:{height:"32px",width:"16px"},attrs:{slot:"prefix","icon-class":e.form.icon},slot:"prefix"}):o("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"prefix"},slot:"prefix"})],1)],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"菜单名称",prop:"name"}},[o("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"菜单排序",prop:"sort"}},[o("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"序号越小越靠前"},model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",e._n(t))},expression:"form.sort"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"内部菜单",prop:"iframe"}},[o("el-radio",{attrs:{label:"true"},model:{value:e.form.iframe,callback:function(t){e.$set(e.form,"iframe",t)},expression:"form.iframe"}},[e._v("是")]),e._v(" "),o("el-radio",{attrs:{label:"false"},model:{value:e.form.iframe,callback:function(t){e.$set(e.form,"iframe",t)},expression:"form.iframe"}},[e._v("否")])],1),e._v(" "),o("el-form-item",{attrs:{label:"链接地址"}},[o("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"菜单路径"},model:{value:e.form.path,callback:function(t){e.$set(e.form,"path",t)},expression:"form.path"}})],1),e._v(" "),"true"===e.form.iframe?o("el-form-item",{attrs:{label:"组件路径"}},[o("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"菜单路径"},model:{value:e.form.component,callback:function(t){e.$set(e.form,"component",t)},expression:"form.component"}})],1):e._e(),e._v(" "),o("el-form-item",{attrs:{label:"上级类目"}},[o("treeselect",{staticStyle:{width:"460px"},attrs:{options:e.menus,placeholder:"选择上级类目"},model:{value:e.form.pid,callback:function(t){e.$set(e.form,"pid",t)},expression:"form.pid"}})],1),e._v(" "),o("el-form-item",{staticStyle:{"margin-top":"-10px","margin-bottom":"0px"},attrs:{label:"选择角色"}},[o("treeselect",{staticStyle:{width:"460px"},attrs:{multiple:!0,options:e.roles,placeholder:"请选择角色"},model:{value:e.roleIds,callback:function(t){e.roleIds=t},expression:"roleIds"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),o("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"74a9ff71",null));d.options.__file="form.vue";t.default=d.exports},oDta:function(e,t,o){}}]);