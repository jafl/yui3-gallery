YUI.add("gallery-formmgr",function(D){function K(O,N){N=N||{};K.superclass.constructor.call(this,N);this.form_name=O;this.status_node=D.one(N.status_node);this.enabled=true;this.default_value_map=N.default_value_map;this.validation={fn:{},regex:{}};this.validation_msgs={};this.has_messages=false;this.has_errors=false;this.button_list=[];this.user_button_list=[];this.has_file_inputs=false;}var E="(?:^|\\s)(?:";var H=")(?:\\s|$)";K.row_marker_class="formmgr-row";K.field_marker_class="formmgr-field";K.status_marker_class="formmgr-message-text";K.status_none_class="formmgr-status-hidden";K.status_success_class="formmgr-status-success";K.status_failure_class="formmgr-status-failure";K.row_status_prefix="formmgr-has";var G;var M;var L;function B(){if(!G){G=K.status_success_class+"|"+K.status_failure_class;}return G;}function C(){if(!M){M=K.row_status_prefix+"([^\\s]+)";}return M;}function A(){if(!L){L=new RegExp(E+C()+H);}return L;}K.status_order=["error","warn","success","info"];K.getStatusPrecedence=function(N){for(var O=0;O<K.status_order.length;O++){if(N==K.status_order[O]){return O;}}return K.status_order.length;};K.statusTakesPrecendence=function(O,N){return(!O||K.getStatusPrecedence(N)<K.getStatusPrecedence(O));};K.getElementStatus=function(O){var N=D.one(O).get("className").match(A());return(N&&N.length>1?N[1]:false);};function F(N){if(D.Lang.isString(N)){return N.replace(/^#/,"");}else{if(N instanceof D.Node){return N.get("id");}else{return N.id;}}}K.cleanValues=function(R){var Q=false;for(var O=0;O<R.length;O++){var N=R[O];var P=N.type&&N.type.toLowerCase();if(P=="file"){Q=true;}else{if(P=="select-multiple"){}else{if(N.value){N.value=D.Lang.trim(N.value);}}}}return Q;};function I(){var R=(this.button_list.length===0);for(var Q=0;Q<this.form.elements.length;Q++){var U=this.form.elements[Q];var P=U.tagName.toLowerCase();var S=(U.type?U.type.toLowerCase():null);if(R&&(S=="submit"||S=="reset"||P=="button")){this.button_list.push(U);}if(!U.name){continue;}var N=this.default_value_map[U.name];if(P=="input"&&S=="file"){U.value="";}else{if(D.Lang.isUndefined(N)){if(P=="input"&&(S=="password"||S=="text")){this.default_value_map[U.name]=U.value;}else{if(P=="input"&&S=="checkbox"){this.default_value_map[U.name]=(U.checked?U.value:"");}else{if(P=="input"&&S=="radio"){var T=this.form[U.name];if(T&&!T.length){this.default_value_map[U.name]=T.value;}else{if(T){this.default_value_map[U.name]=T[0].value;for(var O=0;O<T.length;O++){if(T[O].checked){this.default_value_map[U.name]=T[O].value;break;}}}}}else{if((P=="select"&&S=="select-one")||P=="textarea"){this.default_value_map[U.name]=U.value;}}}}}else{if(P=="input"&&(S=="password"||S=="text")){U.value=N;}else{if(P=="input"&&(S=="checkbox"||S=="radio")){U.checked=(U.value==N);}else{if(P=="select"&&S=="select-one"){U.value=N;if(U.selectedIndex>=0&&U.options[U.selectedIndex].value!==N.toString()){U.selectedIndex=-1;}}else{if(P=="textarea"){U.value=N;}}}}}}}}D.extend(K,D.Plugin.Host,{getForm:function(){if(!this.form){this.form=D.config.doc.forms[this.form_name];}return this.form;},hasFileInputs:function(){return this.has_file_inputs;},setDefaultValues:function(N){this.default_value_map=N;},setDefaultValue:function(O,N){this.default_value_map[O]=N;},saveCurrentValuesAsDefault:function(){this.default_value_map={};this.button_list=[];I.call(this);},setFunction:function(O,N){this.validation.fn[F(O)]=N;},setRegex:function(P,O,N){P=F(P);if(D.Lang.isString(O)){this.validation.regex[P]=new RegExp(O,N);}else{this.validation.regex[P]=O;}if(!this.validation_msgs[P]||!this.validation_msgs[P].regex){D.error(D.substitute("No error message provided for regex validation of {id}!",{id:P}),null,"FormManager");}},setErrorMessages:function(O,N){this.validation_msgs[F(O)]=N;},addErrorMessage:function(P,N,O){P=F(P);if(!this.validation_msgs[P]){this.validation_msgs[P]={};}this.validation_msgs[P][N]=O;},clearForm:function(){this.clearMessages();this.form.reset();this.postPopulateForm();},populateForm:function(){if(!this.default_value_map){this.default_value_map={};}this.clearMessages();I.call(this);this.postPopulateForm();},postPopulateForm:function(){},isChanged:function(){for(var P=0;P<this.form.elements.length;P++){var S=this.form.elements[P];if(!S.name){continue;}var Q=(S.type?S.type.toLowerCase():null);var O=S.tagName.toLowerCase();var N=this.default_value_map[S.name];if(N===null||typeof N==="undefined"){N="";}if(O=="input"&&Q=="file"){if(S.value){return true;}}else{if(O=="input"&&(Q=="password"||Q=="text"||Q=="file")){if(S.value!=N){return true;}}else{if(O=="input"&&(Q=="checkbox"||Q=="radio")){var R=(S.value==N);if((R&&!S.checked)||(!R&&S.checked)){return true;}}else{if((O=="select"&&Q=="select-one")||O=="textarea"){if(S.value!=N){return true;}}}}}}return false;},prepareForm:function(){this.getForm();if(!this.prePrepareForm.apply(this,arguments)){return false;}this.populateForm();return this.postPrepareForm.apply(this,arguments);},prePrepareForm:function(){return true;},postPrepareForm:function(){return true;},initFocus:function(){for(var P=0;P<this.form.elements.length;P++){var R=this.form.elements[P];if(R.disabled||R.offsetHeight===0){continue;}var N=R.tagName.toLowerCase();var Q=(R.type?R.type.toLowerCase():null);if((N=="input"&&(Q=="file"||Q=="password"||Q=="text"))||N=="textarea"){try{R.focus();}catch(O){}R.select();break;}}},validateForm:function(){this.clearMessages();var O=true;var T=this.form.elements;this.has_file_inputs=K.cleanValues(T);for(var P=0;P<T.length;P++){var U=T[P].id;var N=this.validation_msgs[U];var S=K.validateFromCSSData(T[P],N);if(S.error){this.displayMessage(T[P],S.error,"error");O=false;continue;}if(S.keepGoing){if(this.validation.regex[U]&&!this.validation.regex[U].test(T[P].value)){this.displayMessage(T[P],N?N.regex:null,"error");O=false;continue;}}var R=this.validation.fn[U];var Q=this;if(D.Lang.isFunction(R)){}else{if(D.Lang.isString(R)){R=Q[R];}else{if(R&&R.scope){Q=R.scope;R=(D.Lang.isString(R.fn)?Q[R.fn]:R.fn);}else{R=null;}}}if(R&&!R.call(Q,this.form,D.one(T[P]))){O=false;
continue;}}if(!this.postValidateForm(this.form)){O=false;}if(!O){this.notifyErrors();}return O;},postValidateForm:function(N){return true;},registerButton:function(N){var O={e:D.Lang.isString(N)||N.tagName?D.one(N):N};this.user_button_list.push(O);},isFormEnabled:function(){return this.enabled;},enableForm:function(){this.setFormEnabled(true);},disableForm:function(){this.setFormEnabled(false);},setFormEnabled:function(N){this.enabled=N;var P=!N;for(var O=0;O<this.button_list.length;O++){this.button_list[O].disabled=P;}for(O=0;O<this.user_button_list.length;O++){var Q=this.user_button_list[O];Q.e.set("disabled",P);}},hasMessages:function(){return this.has_messages;},hasErrors:function(){return this.has_errors;},getRowStatus:function(O){var N=D.one(O).getAncestorByClassName(K.row_marker_class,true);return K.getElementStatus(N);},clearMessages:function(){this.has_messages=false;this.has_errors=false;if(this.status_node){this.status_node.set("innerHTML","");this.status_node.replaceClass(B(),K.status_none_class);}for(var O=0;O<this.form.elements.length;O++){var R=this.form.elements[O];var N=R.tagName.toLowerCase();var P=(R.type?R.type.toLowerCase():null);if(N=="button"||P=="submit"||P=="reset"){continue;}var Q=D.one(R).getAncestorByClassName(K.row_marker_class);if(Q&&Q.hasClass(C())){Q.all("."+K.status_marker_class).set("innerHTML","");Q.removeClass(C());Q.all("."+K.field_marker_class).removeClass(C());}}D.one(this.form).all("fieldset").removeClass(C());},displayMessage:function(R,O,T,U){if(D.Lang.isUndefined(U)){U=true;}R=D.one(R);var N=R.getAncestorByClassName(K.row_marker_class);if(N&&K.statusTakesPrecendence(K.getElementStatus(N),T)){var Q=N.all("."+K.field_marker_class);if(Q){Q.removeClass(C());}if(O){N.one("."+K.status_marker_class).set("innerHTML",O);}var P=K.row_status_prefix+T;N.replaceClass(C(),P);Q=R.getAncestorByClassName(K.field_marker_class,true);if(Q){Q.replaceClass(C(),P);}var V=R.getAncestorByTagName("fieldset");if(V&&K.statusTakesPrecendence(K.getElementStatus(V),T)){V.removeClass(C());V.addClass(K.row_status_prefix+T);}if(!this.has_messages&&U){N.scrollIntoView();try{R.focus();}catch(S){}}this.has_messages=true;if(T=="error"){this.has_errors=true;}return true;}return false;},notifyErrors:function(){this.displayFormMessage(K.Strings.validation_error,true,false);},displayFormMessage:function(P,O,N){if(D.Lang.isUndefined(N)){N=true;}if(this.status_node){if(!this.status_node.innerHTML){this.status_node.replaceClass(K.status_none_class,(O?K.status_failure_class:K.status_success_class));this.status_node.set("innerHTML",P);}if(N){this.status_node.scrollIntoView();}}else{}}});if(D.FormManager){for(var J in D.FormManager){if(D.FormManager.hasOwnProperty(J)){K[J]=D.FormManager[J];}}}D.FormManager=K;},"@VERSION@",{optional:["gallery-scrollintoview"],requires:["pluginhost-base","gallery-node-optimizations","gallery-formmgr-css-validation"]});