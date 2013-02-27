YUI.add("gallery-bottle",function(e,t){var n="btInit",r="btReady",i="btNative",s="btFixed",o="btFocus",u="btSwitcher",a="btActive",f=/^<!--([\s\S]+)-->$/,l="btSyncScreen",c=e.all("html, body"),h=c.item(1),p=e.one(".btRoot")||h.appendChild(e.Node.create('<div class="btRoot"></div>')),d=h.hasClass(n),v=!1,m={hidden:{overflow:"hidden"},scroll:{overflow:"auto",overflowX:"hidden"}},g={nativeScroll:!0,positionFixed:!1},y=function(t){v&&!t&&window.scrollTo(0,1);if(g.nativeScroll)return;h.setStyles({width:e.Bottle.Device.getBrowserWidth(),height:e.Bottle.Device.getBrowserHeight()})},b=function(t){var n=e.Bottle.ShortCut.getCurrent(),r=e.Bottle.Overlay.getCurrent(),i=e.Bottle.Page.getCurrent();i?(y(!0),i.resize()):e.fire(l),n&&n.scResize(t===!0),r&&r.olResize(t===!0)},w=function(t,n,r,i){r.all(t).each(function(t){new n(e.merge({srcNode:t,render:!0},i))})},E=function(t){var n=t.currentTarget,r=n.getAttribute("data-auto")==="false"?!1:!0;act=!0,n.hasClass(a)?(r&&n.removeClass(a),act=!1):r&&n.addClass(a),e.publish(u),e.fire(u,{event:t,action:act})},S=function(t){var u=e.one("[data-role=page]"),a=e.instanceOf(t,e.Node),f=a?t:h,S;v=t===!0;if(d&&!a)return;a||(u&&c.setStyles(m.hidden),h.addClass(n),d=!0),w("[data-role=viewer]",e.Bottle.Viewer,f,{axis:"x"}),w("[data-role=photogrid]",e.Bottle.PhotoGrid,f),w("[data-role=carousel]",e.Bottle.Carousel,f,{axis:"x"}),w("[data-role=slidetab]",e.Bottle.SlideTab,f),w("[data-role=loader]",e.Bottle.Loader,f),u&&!a&&(y(),S=new e.Bottle.Page({srcNode:u,render:!0}),S.resize(),S.get("nativeScroll")?(e.Bottle.Device.getPositionFixedSupport()&&(g.positionFixed=!0,h.addClass(s)),e.UA.ie>9&&(m.scroll.overflowX="",m.scroll.height="auto"),c.setStyles(m.scroll),h.addClass(i),S.item(0).get("scrollView").disable().unplug(e.Plugin.ScrollViewScrollbars)._set("axis","")._bindDrag(),e.publish(i,{fireOnce:!0}),e.fire(i),e.publish(l),p.on("gesturemove",function(e){e.preventDefault()},{standAlone:!0,root:p})):(g.nativeScroll=!1,y())),f.all("[data-role=shortcut]").each(function(t){new e.Bottle.ShortCut({srcNode:t,visible:!1,disabled:!0,render:p})}),f.all("[data-role=overlay]").each(function(t){new e.Bottle.Overlay({srcNode:t,visible:!1,disabled:!0,render:p})});if(a)return;e.on(e.UA.mobile==="Apple"?"orientationchange":"resize",b,window),h.delegate("focus",function(){h.addClass(o)},"input, select, textarea"),h.delegate("blur",function(){h.removeClass(o),b(!0)},"input, select, textarea"),h.delegate("click",E,".btSwitcher"),h.addClass(r).removeClass("btHideSCO").removeClass("btInPlace").removeClass("btHideAll"),e.publish(r,{fireOnce:!0}),e.fire(r)},x=function(t){var n=t.getHTML();n.match(f)&&(t.setHTML(n.replace(f,"$1")),e.Bottle.init(t))},T=function(e){return g[e]};e.namespace("Bottle").init=S,e.namespace("Bottle").get=T,e.namespace("Bottle").lazyLoad=x},"gallery-2013.02.27-21-03",{skinnable:"true",requires:["gallery-bt-shortcut","gallery-bt-overlay","gallery-bt-photogrid","gallery-bt-slidetab","gallery-bt-carousel","gallery-bt-loader","gallery-bt-viewer"]});
