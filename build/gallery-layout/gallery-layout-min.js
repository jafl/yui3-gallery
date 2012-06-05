YUI.add("gallery-layout",function(a){function m(){m.superclass.constructor.apply(this,arguments);}m.NAME="pagelayout";m.FIT_TO_VIEWPORT=0;m.FIT_TO_CONTENT=1;m.ATTRS={mode:{value:m.FIT_TO_VIEWPORT,validator:function(p){return(p===m.FIT_TO_VIEWPORT||p===m.FIT_TO_CONTENT);}},minWidth:{value:73,validator:function(p){return(a.Lang.isNumber(p)&&p>0);}},minHeight:{value:44,validator:function(p){return(a.Lang.isNumber(p)&&p>0);}},stickyFooter:{value:false,validator:a.Lang.isBoolean},matchColumnHeights:{value:true,validator:a.Lang.isBoolean}};m.fit_to_viewport_class="FIT_TO_VIEWPORT";m.fit_to_content_class="FIT_TO_CONTENT";m.force_fit_class="FORCE_FIT";m.page_header_class="layout-hd";m.page_body_class="layout-bd";m.page_footer_class="layout-ft";m.module_rows_class="layout-module-row";m.module_cols_class="layout-module-col";m.module_class="layout-module";m.module_header_class="layout-m-hd";m.module_body_class="layout-m-bd";m.module_footer_class="layout-m-ft";m.not_managed_class="layout-not-managed";m.collapse_vert_nub_class="layout-vert-collapse-nub";m.collapse_left_nub_class="layout-left-collapse-nub";m.collapse_right_nub_class="layout-right-collapse-nub";m.expand_vert_nub_class="layout-vert-expand-nub";m.expand_left_nub_class="layout-left-expand-nub";m.expand_right_nub_class="layout-right-expand-nub";m.collapsed_vert_class="layout-collapsed-vert";m.collapsed_horiz_class="layout-collapsed-horiz";m.min_module_height=10;m.unmanaged_size=-1;var h=/\bFIT_TO_[A-Z_]+/,c=/(?:^|\s)height:([0-9]+)%/,f=/(?:^|\s)width:([0-9]+)%/,d=100,n={row:{module:"gallery-layout-rows",plugin:"PageLayoutRows",outer_size:c,inner_size:f},col:{module:"gallery-layout-cols",plugin:"PageLayoutCols",outer_size:f,inner_size:c}};function o(){this.viewport={w:0,h:0,bcw:0};var q=a.one("body").get("children");var r=q.filter("."+m.page_header_class);if(r.size()>1){throw Error("There must be at most one div with class "+m.page_header_class);}this.header_container=(r.isEmpty()?null:r.item(0));r=q.filter("."+m.page_body_class);if(r.size()!=1){throw Error("There must be exactly one div with class "+m.page_body_class);}this.body_container=r.item(0);this.body_horiz_mbp=this.body_container.horizMarginBorderPadding();this.body_vert_mbp=this.body_container.vertMarginBorderPadding();var p=this.body_container.get("className").match(h);if(p&&p.length){this.set("mode",m[p[0]]);}r=q.filter("."+m.page_footer_class);if(r.size()>1){throw Error("There must be at most one div with class "+m.page_footer_class);}this.footer_container=(r.isEmpty()?null:r.item(0));a.one(a.config.win).on("resize",b,this);j.call(this);e.call(this);this.rescanBody();this.after("modeChange",function(){j.call(this);if(this.body_container){this.body_container.scrollTop=0;}e.call(this);b.call(this);});this.after("minWidthChange",b);this.after("minHeightChange",b);this.after("stickyFooterChange",function(){e.call(this);b.call(this);});this.after("matchColumnHeightsChange",b);}function g(u,t){var s=a.map(u,function(x){if(x.hasClass(m.not_managed_class)){return m.unmanaged_size;}var w=x.get("className").match(t);return(w&&w.length?parseInt(w[1],10):0);});var v=a.reduce(s,[0,0],function(x,w){if(w>0){x[0]+=w;}else{if(w===0){x[1]++;}}return x;});var r=v[0],q=v[1];if(q>0){var p=Math.max((100-r)/q,10);s=a.map(s,function(w){return(w===0?p:w);});r=a.reduce(s,0,function(y,x,w){return(x<0?y:y+x);});}return a.map(s,function(w){return(w>0?w*(100/r):w);});}function j(){this.body_container.replaceClass("FIT_TO_(VIEWPORT|CONTENT)",this.get("mode")===m.FIT_TO_VIEWPORT?"FIT_TO_VIEWPORT":"FIT_TO_CONTENT");}function e(){if(!this.footer_container){return;}if(this.get("mode")===m.FIT_TO_VIEWPORT||this.get("stickyFooter")){this.body_container.get("parentNode").insertBefore(this.footer_container,this.body_container.next(function(p){return p.get("tagName").toLowerCase()!="script";}));}else{this.body_container.appendChild(this.footer_container);}}function b(){if(!this.layout_plugin||!this.body_container){return;}var t=this.single_module?a.PageLayout.FIT_TO_VIEWPORT:this.get("mode");var w=this.get("stickyFooter");this.body_container.setStyle("overflowX",t===a.PageLayout.FIT_TO_CONTENT?"auto":"hidden");this.body_container.setStyle("overflowY",t===a.PageLayout.FIT_TO_CONTENT?"scroll":"hidden");var v={w:a.DOM.winWidth(),h:a.DOM.winHeight()};var p=arguments[0]&&arguments[0].type=="resize";if(p&&(v.w===this.viewport.w&&v.h===this.viewport.h)){return;}this.viewport=v;this.fire("beforeReflow");var q=a.Node.emToPx(this.get("minWidth"));var r=Math.max(this.viewport.w,q);if(this.header_container){this.header_container.setStyle("width",r+"px");}this.body_container.setStyle("width",(r-this.body_horiz_mbp)+"px");if(this.footer_container){this.footer_container.setStyle("width",w?r+"px":"auto");}r=this.body_container.get("clientWidth")-this.body_horiz_mbp;this.viewport.bcw=this.body_container.get("clientWidth");var s=this.viewport.h;var u=a.Node.emToPx(this.get("minHeight"));if(t===a.PageLayout.FIT_TO_VIEWPORT&&s<u){s=u;a.one(document.documentElement).setStyle("overflowY","auto");}else{if(!window.console||!window.console.layout_force_viewport_scrollbars){a.one(document.documentElement).setStyle("overflowY","hidden");}}if(this.header_container){s-=this.header_container.get("offsetHeight");}if(this.footer_container&&(t===a.PageLayout.FIT_TO_VIEWPORT||w)){s-=this.footer_container.get("offsetHeight");}if(t===a.PageLayout.FIT_TO_VIEWPORT){var x=s-this.body_vert_mbp;}else{if(s<0){s=10+this.body_vert_mbp;}}this.body_container.setStyle("height",(s-this.body_vert_mbp)+"px");this.layout_plugin.resize(this,t,r,x);this.body_container.setStyle("visibility","visible");if(this.footer_container){this.footer_container.setStyle("visibility","visible");}a.later(100,this,k);}function k(){if(a.DOM.winWidth()!=this.viewport.w||a.DOM.winHeight()!=this.viewport.h||this.body_container.get("clientWidth")!=this.viewport.bcw){b.call(this);}else{this.fire("afterReflow");}}function l(r){var q=r.currentTarget;function p(v,s){var u=q.getAncestorByClassName(this.layout_plugin.collapse_classes[v]);
if(u&&u.hasClass(s)){var t=this._analyzeModule(u);this.fire("beforeExpandModule",{bd:t.bd});u.removeClass(s);b.call(this);this.fire("afterExpandModule",{bd:t.bd});}}if(q.hasClass(m.expand_vert_nub_class)){p.call(this,"vert_parent_class",m.collapsed_vert_class);}else{p.call(this,"horiz_parent_class",m.collapsed_horiz_class);}}function i(q){var p=q.currentTarget;function r(v,s){var u=p.getAncestorByClassName(this.layout_plugin.collapse_classes[v]);if(u&&!u.hasClass(s)){var t=this._analyzeModule(u);this.fire("beforeCollapseModule",{bd:t.bd});u.addClass(s);b.call(this);this.fire("afterCollapseModule",{bd:t.bd});}}if(p.hasClass(m.collapse_vert_nub_class)){r.call(this,"vert_parent_class",m.collapsed_vert_class);}else{r.call(this,"horiz_parent_class",m.collapsed_horiz_class);}}a.extend(m,a.Base,{initializer:function(){a.on("domready",o,this);},rescanBody:function(){a.detach("PageLayoutCollapse|click");this.body_info={outers:[],modules:[],outer_sizes:[],inner_sizes:[]};var q=this.body_container.all("div."+m.module_rows_class);var u=n.row;if(q.isEmpty()){q=this.body_container.all("div."+m.module_cols_class);u=n.col;}if(q.isEmpty()){throw Error("There must be at least one "+m.module_rows_class+" or "+m.module_cols_class+" inside "+m.page_body_class+".");}this.body_info.outers=q;var r="("+m.collapse_vert_nub_class+"|"+m.collapse_left_nub_class+"|"+m.collapse_right_nub_class+")";var s="("+m.expand_vert_nub_class+"|"+m.expand_left_nub_class+"|"+m.expand_right_nub_class+")";var t=this.body_info.outers.size();a.each(this.body_info.outers,function(x){var v=x.generateID();this.body_info.outer_sizes.push(100/t);var w=x.all("div."+m.module_class);if(w.isEmpty()){this.body_info.outers=[];this.body_info.modules=[];throw Error("There must be at least one "+m.module_class+" inside "+m.module_rows_class+".");}this.body_info.modules.push(w);a.each(w,function(z){var y=z.getFirstElementByClassName(r);if(y){y.on("PageLayoutCollapse|click",i,this);}y=z.getFirstElementByClassName(s);if(y){y.on("PageLayoutCollapse|click",l,this);}},this);this.body_info.inner_sizes.push(g(w,u.inner_size));},this);this.body_info.outer_sizes=g(this.body_info.outers,u.outer_size);this.single_module=false;if(this.body_info.outers.size()==1&&this.body_info.modules[0].size()==1&&!this.body_container.hasClass(m.force_fit_class)){u=n.row;this.single_module=true;}var p=this;a.use(u.module,function(v){p.layout_plugin=v[u.plugin];j.call(p);b.call(p);});},getHeaderHeight:function(){return(this.header_container?this.header_container.get("offsetHeight"):0);},getHeaderContainer:function(){return this.header_container;},getBodyHeight:function(){return this.body_container.get("offsetHeight");},getBodyContainer:function(){return this.body_container;},getFooterHeight:function(){return(this.get("stickyFooter")&&this.footer_container?this.footer_container.get("offsetHeight"):0);},getFooterContainer:function(){return this.footer_container;},moduleIsCollapsed:function(q){var p="("+m.collapsed_horiz_class+"|"+m.collapses_vert_class+")";q=a.one(q);if(q.getFirstElementByClassName(this.layout_plugin.collapse_classes.collapse_parent_pattern)){q=q.get("parentNode");}return q.hasClass(p);},expandModule:function(r){r=a.one(r);var q=r.getFirstElementByClassName(m.expand_vert_nub_class);if(!q){var p="("+m.expand_left_nub_class+"|"+m.expand_right_nub_class+")";q=r.getFirstElementByClassName(p);}if(q){l.call(this,{currentTarget:q});}},collapseModule:function(q){q=a.one(q);var p=q.getFirstElementByClassName(m.collapse_vert_nub_class);if(!p){var r="("+m.collapse_left_nub_class+"|"+m.collapse_right_nub_class+")";p=q.getFirstElementByClassName(r);}if(p){i.call(this,{currentTarget:p});}},toggleModule:function(p){p=a.one(p);if(this.moduleIsCollapsed(p)){this.expandModule(p);}else{this.collapseModule(p);}},elementResized:function(p){p=a.one(p);if((this.header_container&&this.header_container.contains(p))||(this.body_container&&this.body_container.contains(p))||(this.footer_container&&this.footer_container.contains(p))){if(this.refresh_timer){this.refresh_timer.cancel();}var q=(new Date()).getTime();this.refresh_timer=a.later(d,this,function(){this.refresh_timer=null;var r=(new Date()).getTime();if(r>q+2*d){this.elementResized(p);}else{b.call(this);}});return true;}else{return false;}},_analyzeModule:function(q){var p={root:q,hd:null,bd:null,ft:null};var s=q.one("."+m.module_body_class);if(!s){return p;}var r=s.siblings().filter("."+m.module_body_class);r.unshift(s);p.bd=r.find(function(t){return(t.get("offsetWidth")>0);});if(!p.bd){p.bd=s;}if(p.bd){p.hd=p.bd.siblings().filter("."+m.module_header_class).item(0);p.ft=p.bd.siblings().filter("."+m.module_footer_class).item(0);}return p;},_setWidth:function(q,p){q.root.setStyle("width",p+"px");}});a.PageLayout=m;},"@VERSION@",{requires:["base","gallery-funcprog","gallery-node-optimizations","gallery-dimensions","gallery-nodelist-extras2"],optional:["gallery-layout-rows","gallery-layout-cols"],skinnable:true});