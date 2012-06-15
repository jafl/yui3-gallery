YUI.add("gallery-node-event-set",function(a){function c(k,n,j,m){var l=k.call(this,j);n.apply(this,a.Array(arguments,2));this.fire(j+"Set",{prevVal:l,newVal:m});}function e(j,m,l){var k={};a.each(l,function(o,n){k[n]=j.call(this,n);},this);m.apply(this,a.Array(arguments,2));a.each(l,function(o,n){this.fire(n+"Set",{prevVal:k[n],newVal:o});},this);}function b(){this._event_set_patched_set=true;this.set=a.bind(c,this,this.get,this.set);this.setAttrs=a.bind(e,this,this.get,this.setAttrs);this.setAttribute=a.bind(c,this,this.getAttribute,this.setAttribute);this.setStyle=a.bind(c,this,this.getStyle,this.setStyle);this.setStyles=a.bind(e,this,this.getStyle,this.setStyles);}function h(){this._event_set_patched_data=true;var j=this.setData;this.setData=function(l,o){if(arguments.length>1){var m=this.getData(l);}else{var n={};a.each(this.getData(),function(q,p){n[p]={prevVal:q};});}j.apply(this,arguments);if(arguments.length>1){this.fire("dataSet",{dataKey:l,prevVal:m,newVal:o});}else{a.each(l,function(q,p){if(n[p]){n[p].newVal=q;}else{n[p]={newVal:q};}});a.each(n,function(q,p){this.fire("dataSet",{dataKey:p,prevVal:q.prevVal,newVal:q.newVal});},this);}};var k=this.clearData;this.clearData=function(l){if(l){var n=this.getData(l);}else{var m=this.getData();}k.apply(this,arguments);if(l){this.fire("dataSet",{dataKey:l,prevVal:n});}else{a.each(m,function(p,o){this.fire("dataSet",{dataKey:o,prevVal:p});},this);}};}function g(){this._event_set_patched_class=true;var k=this.addClass;this.addClass=function(n){if(this.hasClass(n)){return;}var m=this.get("className");k.apply(this,arguments);if(!this._event_set_do_not_fire_add_remove_class){this.fire("classNameSet",{prevVal:m,newVal:this.get("className"),addedClass:n});}};var l=this.removeClass;this.removeClass=function(n){if(!this.hasClass(n)){return;}var m=this.get("className");l.apply(this,arguments);if(!this._event_set_do_not_fire_add_remove_class){this.fire("classNameSet",{prevVal:m,newVal:this.get("className"),removedClass:n});}};var j=this.replaceClass;this.replaceClass=function(o,q){this._event_set_do_not_fire_add_remove_class=true;var n=this.get("className"),m=this.hasClass(o);j.apply(this,arguments);var p={prevVal:n,newVal:this.get("className"),addedClass:q};if(m){p.removedClass=o;}this.fire("classNameSet",p);this._event_set_do_not_fire_add_remove_class=false;};}function i(l,k){var j=this.getXY();l.apply(this,a.Array(arguments,1));this.fire("xySet",{prevVal:j,newVal:this.getXY()});}function f(){this._event_set_patched_xy=true;this.setX=a.bind(i,this,this.setX);this.setY=a.bind(i,this,this.setY);this.setXY=a.bind(i,this,this.setXY);}var d=a.Node.prototype.on;a.Node.prototype.on=function(l,k,j){if(l.length>3&&l.charAt&&l.charAt(l.length-3)=="S"&&l.charAt(l.length-2)=="e"&&l.charAt(l.length-1)=="t"){if(l=="dataSet"){if(!this._event_set_patched_data){h.call(this);}}else{if(l=="classNameSet"){if(!this._event_set_patched_class){g.call(this);}if(!this._event_set_patched_set){b.call(this);}}else{if(l=="xySet"){if(!this._event_set_patched_xy){f.call(this);}}else{if(!this._event_set_patched_set){b.call(this);}}}}this.publish(l,{emitFacade:true});}return d.apply(this,arguments);};},"@VERSION@",{requires:["node-base"],optional:["node-data","node-screen","node-style","event-custom-complex"]});