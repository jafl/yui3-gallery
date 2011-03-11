YUI.add("gallery-timer",function(a){var d="running",h="paused",i="stopped",g="start",e="stop",c="pause",b="resume",f="timer";a.Timer=a.Base.create("timer",a.Base,[],{initializer:function(j){this.after("statusChange",this._afterStatusChange,this);this.publish(g,{defaultFn:this._defStartFn});this.publish(e,{defaultFn:this._defStopFn});this.publish(c,{defaultFn:this._defPauseFn});this.publish(b,{defaultFn:this._defResumeFn});},start:function(){if(this.get("status")!==d){this.fire(g);}return this;},stop:function(){if(this.get("status")===d){this.fire(e);}return this;},pause:function(){if(this.get("status")===d){this.fire(c);}return this;},resume:function(){if(this.get("status")===h){this.fire(b);}return this;},_date:new Date(),_makeTimer:function(){var k=null,j=this.get("repeatCount");if(j===0||j>this.get("step")){k=a.later(this.get("length"),this,this._timer);}this.set("timer",k);this.set("start",this._date.getTime());},_destroyTimer:function(){this.get("timer").cancel();this.set("stop",this._date.getTime());this.set("step",0);},_timer:function(){this.fire(f);var j=this.get("step"),k=this.get("repeatCount");this.set("step",++j);if(k>0&&k<=j){this.stop();}else{this._makeTimer();}this._executeCallback();},_afterStatusChange:function(j){switch(this.get("status")){case d:this._makeTimer();break;case i:case h:this._destroyTimer();break;}},_defStartFn:function(k){var j=this.get("startDelay");if(j>0){a.later(j,this,function(){this.set("status",d);});}else{this.set("status",d);}},_defStopFn:function(j){this.set("status",i);},_defPauseFn:function(j){this.set("status",h);},_defResumeFn:function(k){var j=this.get("length")-(this.get("stop")-this.get("start"));a.later(j,this,function(){this._executeCallback();this.set("status",d);});},_repeatCountValidator:function(j){return(this.get("status")===i);},_executeCallback:function(){var j=this.get("callback");if(a.Lang.isFunction(j)){(this.get("callback"))();}}},{ATTRS:{callback:{value:null,validator:a.Lang.isFunction},length:{value:3000,setter:function(j){return parseInt(j,10);}},repeatCount:{validator:"repeatCountValidator",setter:function(j){return parseInt(j,10);},value:0,lazyAdd:false},start:{readonly:true},status:{value:i,readonly:true},step:{value:0,readonly:true},startDelay:{value:0},stop:{readonly:true},timer:{readonly:true}},STATUS:{RUNNING:d,PAUSED:h,STOPPED:i},EVENTS:{START:g,STOP:e,PAUSE:c,RESUME:b,TIMER:f}});},"gallery-2011.01.03-18-30",{requires:["base-build","event-custom"]});