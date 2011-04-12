YUI.add("gallery-formmgr-css-validation",function(F){F.namespace("FormManager");var C="yiv-required";var A=/(?:^|\s+)yiv-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;var B=/(?:^|\s+)yiv-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;var E=/(?:^|\s+)yiv-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;F.FormManager.integer_value_re=/^[-+]?[0-9]+$/;F.FormManager.decimal_value_re=/^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;F.FormManager.Strings={validation_error:"Correct errors in the highlighted fields before continuing.",required_string:"This field requires a value.",required_menu:"This field is required. Choose a value from the pull-down list.",length_too_short:"Enter text that is at least {min} characters or longer.",length_too_long:"Enter text that is up to {max} characters long.",length_out_of_range:"Enter text that is {min} to {max} characters long.",integer:"Enter a whole number (no decimal point).",integer_too_small:"Enter a number that is {min} or higher (no decimal point).",integer_too_large:"Enter a number that is {max} or lower (no decimal point).",integer_out_of_range:"Enter a number between or including {min} and {max} (no decimal point).",decimal:"Enter a number.",decimal_too_small:"Enter a number that is {min} or higher.",decimal_too_large:"Enter a number that is {max} or lower.",decimal_out_of_range:"Enter a number between or including {min} and {max}."};function D(G){return(!F.Lang.isUndefined(G)&&G.length>0);}F.FormManager.validateFromCSSData=function(L,H){var K=F.FormManager.Strings;if(L instanceof F.Node){L=F.Node.getDOMNode(L);}var N=F.DOM.hasClass(L,C);if(N&&L.value===""){var M=null;if(H&&H.required){M=H.required;}else{if(L.tagName.toLowerCase()=="select"){M=K.required_menu;}else{M=K.required_string;}}return{keepGoing:false,error:M};}else{if(!N&&L.value===""){return{keepGoing:false};}}if(L.className){var G=L.className.match(A);if(G&&G.length){if(D(G[1])&&D(G[2])&&parseInt(G[1],10)>parseInt(G[2],10)){}var M=null;var I=(D(G[1])&&G[1]!=="0");if(I&&D(G[2])){M=K.length_out_of_range;}else{if(I){M=K.length_too_short;}else{if(D(G[2])){M=K.length_too_long;}}}if(L.value&&D(G[1])&&L.value.length<parseInt(G[1],10)){if(H&&H.min_length){M=H.min_length;}M=F.substitute(M,{min:parseInt(G[1],10),max:parseInt(G[2],10)});return{keepGoing:false,error:M};}if(L.value&&D(G[2])&&L.value.length>parseInt(G[2],10)){if(H&&H.max_length){M=H.max_length;}M=F.substitute(M,{min:parseInt(G[1],10),max:parseInt(G[2],10)});return{keepGoing:false,error:M};}}var G=L.className.match(B);if(G&&G.length){if(D(G[1])&&D(G[2])&&parseInt(G[1],10)>parseInt(G[2],10)){}var J=parseInt(L.value,10);if(L.value&&(!F.FormManager.integer_value_re.test(L.value)||(D(G[1])&&J<parseInt(G[1],10))||(D(G[2])&&J>parseInt(G[2],10)))){var M=null;if(H&&H.integer){M=H.integer;}else{if(D(G[1])&&D(G[2])){M=K.integer_out_of_range;}else{if(D(G[1])){M=K.integer_too_small;}else{if(D(G[2])){M=K.integer_too_large;}else{M=K.integer;}}}}M=F.substitute(M,{min:parseInt(G[1],10),max:parseInt(G[2],10)});return{keepGoing:false,error:M};}}var G=L.className.match(E);if(G&&G.length){if(D(G[1])&&D(G[2])&&parseFloat(G[1])>parseFloat(G[2])){}var J=parseFloat(L.value);if(L.value&&(!F.FormManager.decimal_value_re.test(L.value)||(D(G[1])&&J<parseFloat(G[1]))||(D(G[2])&&J>parseFloat(G[2])))){var M=null;if(H&&H.decimal){M=H.decimal;}else{if(D(G[1])&&D(G[2])){M=K.decimal_out_of_range;}else{if(D(G[1])){M=K.decimal_too_small;}else{if(D(G[2])){M=K.decimal_too_large;}else{M=K.decimal;}}}}M=F.substitute(M,{min:parseFloat(G[1],10),max:parseFloat(G[2],10)});return{keepGoing:false,error:M};}}}return{keepGoing:true};};},"@VERSION@",{requires:["substitute"]});