YUI.add("gallery-node-optimizations",function(E){var C=/\.([-_a-z0-9]+)/i;var A=/[a-z]+/i;var B=E.Node.prototype.ancestor;E.Node.prototype.ancestor=function(G,H){if(E.Lang.isString(G)){var F=C.exec(G);if(F&&F.length){return this.getAncestorByClassName(F[1],H);}if(A.test(G)){return this.getAncestorByTagName(G,H);}}return B(G,H);};E.Node.prototype.getAncestorByClassName=function(G,F){var H=this._node;if(!F){H=H.parentNode;}while(H&&!E.DOM.hasClass(H,G)){H=H.parentNode;if(!H||!H.tagName){return null;}}return E.one(H);};E.Node.prototype.getAncestorByTagName=function(H,F){var G=this._node;if(!F){G=G.parentNode;}H=H.toLowerCase();while(G&&G.tagName.toLowerCase()!=H){G=G.parentNode;if(!G||!G.tagName){return null;}}return E.one(G);};var D=E.Node.prototype.all;E.Node.prototype.all=function(G){if(E.Lang.isString(G)){var F=C.exec(G);if(F&&F.length){return this.getElementsByClassName(F[1]);}if(A.test(G)){return this.getElementsByTagName(G);}}return D(G);};E.Node.prototype.getElementsByClassName=function(I,K){var L=this.getElementsByTagName(K||"*");var H=null;var G=L.size();for(var F=0;F<G;F++){var J=L.item(F);if(E.DOM.hasClass(E.Node.getDOMNode(J),I)){if(!H){H=new E.NodeList(J);}else{H.push(J);}}}if(!H){H=new E.NodeList("#surely-this-cannot-possibly-exist-on-your-page");}return H;};},"@VERSION@",{requires:["node-base"]});