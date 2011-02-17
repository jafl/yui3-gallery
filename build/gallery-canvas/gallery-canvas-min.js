YUI.add("gallery-canvas",function(C){function B(F,E,D){F[D]=function(){return E[D].apply(E,arguments);};}function A(E,D){this.context=E.invoke("getContext","2d");if(!this.context){C.error("Canvas requires a canvas element.");}D=D||{};this.set("pixelAlign",C.Lang.isUndefined(D.pixelAlign)?true:D.pixelAlign);for(var F in this.context){if(C.Lang.isFunction(this.context[F])&&!this[F]){B(this,this.context,F);}}}A.NAME="canvas2dcontext";A.prototype={get:function(D){if(D=="pixelAlign"){return this.pixel_align;}else{return this.context[D];}},set:function(D,E){if(D=="pixelAlign"){this.pixel_align=E;this.pixel_offset=E?0.5:0;}else{this.context[D]=E;}},moveTo:function(D,E){this._x=D;this._y=E;this.context.moveTo(D+this.pixel_offset,E+this.pixel_offset);},move:function(E,D){this.moveTo(this._x+E,this._y+D);},lineTo:function(D,E){this._x=D;this._y=E;this.context.lineTo(D+this.pixel_offset,E+this.pixel_offset);},line:function(E,D){this.lineTo(this._x+E,this._y+D);},arc:function(D,E){D+=this.pixel_offset;E+=this.pixel_offset;this.context.arc.apply(this.context,arguments);},arcTo:function(F,H,E,G,D){this.context.arcTo(F+this.pixel_offset,H+this.pixel_offset,E+this.pixel_offset,G+this.pixel_offset,D);},bezierCurveTo:function(F,E,H,G,D,I){D+=this.pixel_offset;I+=this.pixel_offset;this.context.bezierCurveTo.apply(this.context,arguments);},quadraticCurveTo:function(F,E,D,G){D+=this.pixel_offset;G+=this.pixel_offset;this.context.quadraticCurveTo.apply(this.context,arguments);},roundedRect:function(H,G,E,F,D){this.beginPath();var I=this.pixel_offset;this.moveTo(G+D,H);this.lineTo(F-D,H);this.arcTo(F,H,F,E,D);this.moveTo(F,H+D);this.lineTo(F,E-D);this.arcTo(F,E,G,E,D);this.moveTo(F-D,E);this.lineTo(G+D,E);this.arcTo(G,E,G,H,D);this.moveTo(G,E-D);this.lineTo(G,H+D);this.arcTo(G,H,F,H,D);},poly:function(D){C.Array.each(D,function(E){this.line(E.dx||0,E.dy||0);},this);}};C.namespace("Canvas");C.Canvas.Context2d=A;},"@VERSION@",{requires:["node-base"]});