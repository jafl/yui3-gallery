YUI.add("gallery-dataschema-class",function(E){var B=E.Lang,D=B.isFunction,A=B.isObject;function C(F){this._init(F);}C.prototype={_init:function(F){F=A(F)?F:{};E.mix(this,F);this._impl=this._resolve(F.type||"Base");},_resolve:function(G){var F;if(B.isString(G)){F=C[G]||C[G.toUpperCase()]||C[G.charAt(0).toUpperCase()+G.slice(1)];}else{if(D(G)){F=E.Object(C.Base);F.apply=G;}else{if(A(G)&&D(G.apply)){F=G;}}}if(!F){}return F||C.Base;},apply:function(G){var F=E.Array(arguments,0,true);F.unshift(this.schema);return this._impl.apply.apply(this._impl,F);}};E.DataSchema=E.mix(C,E.DataSchema);},"@VERSION@",{requires:["dataschema-base"]});