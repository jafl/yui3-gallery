YUI.add("gallery-event-konami",function(A){A.Event.define("konami",{on:function(E,C,D){var B=A.guid();E.on(B+"|keydown",function(F){if(F.keyCode===C.keys[C.progress]){if(++C.progress===C.keys.length){D.fire();D.detach(C.fn,C.context);}}else{C.progress=0;}});A.mix(C,{progress:0,keys:[38,38,40,40,37,39,37,39,66,65],_evtGuid:B});},detach:function(C,B){C.detach(B._evtGuid+"|*");}});},"@VERSION@",{requires:["event-synthetic"]});