YUI.add("gallery-object-extras",function(A){A.mix(A.Object,{every:function(E,D,F,C){for(var B in E){if((C||E.hasOwnProperty(B))&&!D.call(F,E[B],B,E)){return false;}}return true;},filter:function(G,F,H,E){var B={};for(var D in G){var C=G[D];if((E||G.hasOwnProperty(D))&&F.call(H,C,D,G)){B[D]=C;}}return B;},find:function(F,E,G,D){for(var C in F){var B=F[C];if((D||F.hasOwnProperty(C))&&E.call(G,B,C,F)){return B;}}return null;},keyOf:function(E,C,D){for(var B in E){if((D||E.hasOwnProperty(B))&&E[B]===C){return B;}}return null;},invoke:function(G,F){var E=A.Array(arguments,2,true),B={};for(var D in G){var C=G[D];if(G.hasOwnProperty(D)&&A.Lang.isFunction(C[F])){B[D]=C[F].apply(C,E);}}return B;},map:function(F,E,G,D){var B={};for(var C in F){if(D||F.hasOwnProperty(C)){B[C]=E.call(G,F[C],C,F);}}return B;},partition:function(G,F,I,E){var B={matches:{},rejects:{}};for(var D in G){var C=G[D];if(E||G.hasOwnProperty(D)){var H=F.call(I,C,D,G)?B.matches:B.rejects;H[D]=C;}}return B;},reduce:function(G,F,E,H,D){var B=F;for(var C in G){if(D||G.hasOwnProperty(C)){B=E.call(H,B,G[C],C,G);}}return B;},reject:function(D,C,E,B){return A.Object.filter(D,function(G,F,H){return !C.call(E,G,F,H);},E,B);},zip:function(D,C){var B={};A.Array.each(D,function(E,F){B[E.toString()]=C[F];});return B;}});A.mix(A.Array,{toObject:function(C,D){var B={};A.Array.each(C,function(E){B[E[D]]=E;});return B;}});},"@VERSION@",{optional:["gallery-funcprog"]});