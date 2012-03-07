YUI.add("gallery-dimensions",function(D){var B=null,C=["marginLeft","borderLeftWidth","paddingLeft","paddingRight","borderRightWidth","marginRight"],A=["marginTop","borderTopWidth","paddingTop","paddingBottom","borderBottomWidth","marginBottom"];D.Node.emToPx=function(E){if(!B){B=D.config.doc.createElement("div");B.style.position="absolute";B.style.top="-10000px";B.style.left="-10000px";B.style.visibility="hidden";B.style.width="10em";B.style.height="10em";D.config.doc.body.appendChild(B);}return(E||1)*(B.offsetWidth/10);};D.Node.prototype.totalWidth=function(){return this._node.offsetWidth+this.parseDimensionStyle("marginLeft")+this.parseDimensionStyle("marginRight");};D.Node.prototype.totalHeight=function(){return this._node.offsetHeight+this.parseDimensionStyle("marginTop")+this.parseDimensionStyle("marginBottom");};D.Node.prototype.insideWidth=function(){return this._node.clientWidth-this.parseDimensionStyle("paddingLeft")-this.parseDimensionStyle("paddingRight");};D.Node.prototype.insideHeight=function(){return this._node.clientHeight-this.parseDimensionStyle("paddingTop")-this.parseDimensionStyle("paddingBottom");};D.Node.prototype.horizMarginBorderPadding=function(){return D.Array.reduce(C,0,function(E,F){return E+this.parseDimensionStyle(F);},this);};D.Node.prototype.vertMarginBorderPadding=function(){return D.Array.reduce(A,0,function(F,E){return F+this.parseDimensionStyle(E);},this);};D.Node.prototype.parseDimensionStyle=function(G){var F=this.getComputedStyle(G);if(!F||!/^[0-9]/.test(F)){return 0;}var E=parseFloat(F,10);if(/em$/.test(F)){E*=D.Node.emToPx(1);}return Math.round(E);};},"@VERSION@",{requires:["node-style","array-extras"]});