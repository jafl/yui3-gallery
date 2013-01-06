YUI.add("gallery-bt-pushpop",function(e,t){var n="renderUI",r="pushpop",i="heightChange",s="widthChange",o="visibleChange",u="addChild",a={none:"none","with":"with",after:1},f={right:[1,0],left:[-1,0],top:[0,-1],bottom:[0,1],tr:[1,-1],br:[1,1],tl:[-1,-1],bl:[-1,1]},l=function(e,t){e.get("boundingBox").setStyles({left:t.left,top:t.top})},c=function(){this._bppEventHandlers=new e.EventHandle([e.after(this._renderUIPushPop,this,n),this.before(u,this._beforePPAddChild),this.after(u,this._afterPPAddChild),this.after(s,this._afterPPWidthChange),this.after(i,this._afterPPHeightChange),this.on("destroy",this._destroyPushPop)])};c.ATTRS={defaultChildType:{value:e.Bottle.Container},childQuery:{value:"> [data-role=container]",writeOnce:!0},cfgChild:{value:{},validator:e.Lang.isObject,writeOnce:!0},underlay:{value:"none",validator:function(t){return a[t]||e.Lang.isNumber(t)},setter:function(e){return a[e]}},ppTrans:{value:{duration:.5},lazyAdd:!1,validator:e.Lang.isObject,setter:function(e){return this._updateTransitions(0,e),e}},pushFrom:{value:"right",lazyAdd:!1,validator:function(e){return f[e]},setter:function(e){return this._updateTransitions(e),e}}},c.HTML_PARSER={childQuery:function(e){return e.getData("child-query")},cfgChild:function(t){try{return e.JSON.parse(t.getData("cfg-child"))}catch(n){}},ppTrans:function(t){try{return e.JSON.parse(t.getData("cfg-pp-trans"))}catch(n){}},pushFrom:function(e){return e.getData("push-from")},underlay:function(e){return e.getData("underlay")}},c.prototype={initializer:function(){var e;this.get("visible")?this._addAllChildren():e=this.after(o,function(t){t.newVal&&(e.detach(),this._addAllChildren())})},_addAllChildren:function(){var t=this.get("childQuery"),n=this.get("cfgChild");if(!t||this._bppAllAdded)return;this._bppAllAdded=!0,this.get("contentBox").all(t).each(function(t){this.add(e.merge(n,{srcNode:t}))},this)},_destroyPushPop:function(){this._bppEventHandlers.detach(),delete this._bppEventHandlers},_updateTransitions:function(t,n){var r=t||this.get("pushFrom"),i=n||this.get("ppTrans"),s=f[r];this._PUSHPOP_TRANS=e.merge(i,{left:s[0]*this.get("width")+"px",top:s[1]*this.get("height")+"px"}),this._DONE_TRANS=e.merge(i,{left:0,top:0}),this._UNDERLAY_TRANS=e.merge(i,{left:-s[0]*this.get("width")+"px",top:-s[1]*this.get("height")+"px"})},_syncOneSide:function(e){var t=this.get(e);this.each(function(){this.set(e,t)}),this._updateTransitions()},_afterPPHeightChange:function(){this._syncOneSide("height")},_afterPPWidthChange:function(){this._syncOneSide("width")},_beforePPAddChild:function(t){e.instanceOf(t.child,this.get("defaultChildType"))||t.halt()},_afterPPAddChild:function(e){this.sync(e.child)},_renderUIPushPop:function(){this.get("boundingBox").addClass(e.Widget.getClassName(r))},syncWH:function(){var e=this.get("boundingBox"),t=this.get("contentBox"),n=e.get("offsetWidth")||t.get("offsetWidth"),r=e.get("offsetHeight")||t.get("offsetHeight");!this.get("height")&&r&&this.set("height",r),!this.get("width")&&n&&this.set("width",n)},sync:function(e){return e.set("width",this.get("width")),e.set("height",this.get("height")),this},absMove:function(e,t){return this.get("boundingBox").setStyles({top:t+"px",left:e+"px"}),this},topItem:function(){return this._addAllChildren(),this.item(this.size()-1)},topScroll:function(){var e=this.topItem();return e?e.get("scrollView"):undefined},getChild:function(t){if(e.instanceOf(t,this.get("defaultChildType")))return t;if(e.Lang.isNumber(t))return this.item(t)},moveChild:function(e,t,n){var r=this.getChild(e),i=this;return n===!0?l(r,t):this.get("visible")?r.get("boundingBox").transition(t,function(){n&&n.apply(i)}):(l(r,t),n&&n.apply(i)),this},push:function(t){var n=this.size()-1,r=this.get("underlay");return r==="with"&&this.moveChild(n,this._UNDERLAY_TRANS),this.add(t),this.moveChild(t,this._PUSHPOP_TRANS,!0),e.Lang.isNumber(r)?this.moveChild(n,this._UNDERLAY_TRANS,function(){e.later(r,this,function(){this.moveChild(t,this._DONE_TRANS)})}):this.moveChild(t,this._DONE_TRANS)},pop:function(t){var n=this.size()-1,r=this.item(n),i=this.get("underlay");return r?(i!=="none"&&(this.moveChild(n-1,this._UNDERLAY_TRANS,!0),i==="with"&&n&&this.moveChild(n-1,this._DONE_TRANS)),this.moveChild(r,this._PUSHPOP_TRANS,function(){r.remove(),t||r.destroy(!0),n&&e.Lang.isNumber(i)&&e.later(i,this,function(){this.moveChild(n-1,this._DONE_TRANS)})})):this}},e.namespace("Bottle").PushPop=c},"gallery-2012.12.19-21-23",{requires:["base-build","widget-parent","gallery-bt-container"]});
