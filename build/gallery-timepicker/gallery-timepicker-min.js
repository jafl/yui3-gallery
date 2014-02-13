YUI.add("gallery-timepicker",function(e,t){function g(e){g.superclass.constructor.apply(this,arguments),this._model={ampm:{},hour:{},minute:{}}}function y(e){return e<10?"0"+e:e}function b(e,n){var i=r(g[t],g[e]),s='<li class="'+i+" "+g[o]+" "+g[n]+'">'+e+"</li>";return s}var n=e.Array,r=e.ClassNameManager.getClassName,i="Saw",s="Timepicker",o="cell",u="hour",a="minute",f="ampm",l="active",t="NAME",c="row",h="strings.am",p="strings.pm",d="delay",v=0,m=1;g[t]="timepicker",g.ATTRS={time:{value:{hour:0,minute:0,ampm:v}},delay:{value:15},strings:{value:{am:"AM",pm:"PM",seperator:":"}}},g[u]=r(g[t],u),g[a]=r(g[t],a),g[f]=r(g[t],f),g[u]=r(g[t],u,c),g[a]=r(g[t],a,c),g[o]=r(g[t],o),g[l]=r(g[t],l),e.extend(g,e.Widget,{AM:v,PM:m,_timer:null,initializer:function(){this.set("time.ampm",v);var e=this.get("time.hour");this.set("time.hour",e===0?12:e)},destructor:function(){delete this._model.ampm,delete this._model.hour,delete this._model.minute},_syncTime:function(){var e=this.get("time"),t=e.ampm,n=this.get("strings.seperator"),r=y(e.minute),i=t===v?this.get(h):this.get(p);this.set("time.s12hour",(e.hour===0?12:e.hour)+n+r+i);var s=t===m?parseInt(e.hour,10)+12:parseInt(e.hour,10);if(s==24||s===0)s=Math.abs(s-12);s==12&&t==v&&(s=0),this.set("time.s24hour",s+n+r),this.fire("timeset",this.get("time"))},_handleClick:function(e){e.target.test("."+g[o])&&this.fire("cellclick",this.get("time"))},_handleOver:function(t){var n=t.target,r=this.get(d);this._timer&&(this._timer.cancel(),this._timer=null),this._timer=e.later(r,this,this._highlight,n)},_highlight:function(e){if(e.test("."+g[o])){var t=e.get("innerHTML");if(e.hasClass(g[u]))this.set("time.hour",t);else if(e.hasClass(g[f])){var n=this.get(h);t==n?this.set("time.ampm",v):this.set("time.ampm",m)}else this.set("time.minute",t)}this._syncTime(),this.syncUI()},_handleOut:function(e){this._timer&&(this._timer.cancel(),this._timer=null)},renderUI:function(){function s(){return e.create("<ol>")}function l(t,n){return e.create(b(t,n))}function c(e,n,r,i,s){for(var o=e;o<=r;o+=i){var u=l(o,s);t[s][o]=u,n.appendChild(u)}}var e=this.get("contentBox"),t=this._model,r=[],i,o=[];for(i=0;i<=3;i++)o[i]=s();t[f].AM=l(this.get(h),f),t[f].PM=l(this.get(p),f),o[0].appendChild(t[f].AM),o[0].appendChild(t[f].PM),c(1,o[1],12,1,u),c(0,o[2],45,15,a),this._model[f].row=o[0],this._model[u].row=o[1],this._model[a].row=o[2];var d=e.create("<div>");n.each(o,function(e){d.appendChild(e)}),e.appendChild(d),this.allCells=e.all("li")},toggle:function(){this[this.get("visible")?"hide":"show"](),this.syncUI()},bindUI:function(){var e=this.get("contentBox");e.on("click",this._handleClick,this),e.on("mouseover",this._handleOver,this),e.on("mouseout",this._handleOut,this)},syncUI:function(){var e=this.get("time");this.allCells.removeClass(g[l]);var t=this._model,n=t.ampm.AM.getX(),r=0;e.ampm==v?t.ampm.AM.addClass(g[l]):e.ampm==m&&(t.ampm.PM.addClass(g[l]),r=t.ampm.PM.getX()-n),t.minute[e.minute].addClass(g[l]),t.hour[e.hour].addClass(g[l]),t.hour.row.setStyle("margin-left",r+"px"),t.minute.row.setStyle("margin-left",t.hour[e.hour].getX()-n+"px")}}),e.Base.build(g.NAME,g,{dynamic:!1}),e.namespace(i+"."+s),e[i][s]=g},"@VERSION@",{skinnable:"true",requires:["oop","event-custom","attribute","base","dom","classnamemanager","widget","event"]});
