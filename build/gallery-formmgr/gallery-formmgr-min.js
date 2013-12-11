YUI.add("gallery-formmgr",function(e,t){"use strict";function n(t,r){r=r||{},n.superclass.constructor.call(this,r),this.form_name=t,this.status_node=e.one(r.status_node),this.enabled=!0,this.default_value_map=r.default_value_map||{},this.validation={fn:{},regex:{}},this.validation_msgs={},this.has_messages=!1,this.has_errors=!1,this.button_list=[],this.user_button_list=[],this.has_file_inputs=!1}function o(){return r||(r=n.status_success_class+"|"+n.status_failure_class),r}function u(){return i||(i=n.row_status_prefix+"([^\\s]+)"),i}function a(){return s||(s=new RegExp(e.Node.class_re_prefix+u()+e.Node.class_re_suffix)),s}function f(t){return e.Lang.isString(t)?t.replace(/^#/,""):t._node?t.get("id"):t.id}function l(){var t=this.button_list.length===0;for(var n=0;n<this.form.elements.length;n++){var r=this.form.elements[n],i=r.tagName,s=r.type?r.type.toLowerCase():null;t&&(s=="submit"||s=="reset"||i=="BUTTON")&&this.button_list.push(r);if(!r.name)continue;var o=this.default_value_map[r.name];if(i=="INPUT"&&s=="file")r.value="";else if(e.Lang.isUndefined(o))if(i!="INPUT"||s!="password"&&s!="text"){if(i=="INPUT"&&s=="checkbox")this.default_value_map[r.name]=r.checked?r.value:"";else if(i=="INPUT"&&s=="radio"){var u=this.form[r.name];if(u&&!u.length)this.default_value_map[r.name]=u.value;else if(u){this.default_value_map[r.name]=u[0].value;for(var a=0;a<u.length;a++)if(u[a].checked){this.default_value_map[r.name]=u[a].value;break}}}else if(i=="SELECT"&&s=="select-one"||i=="TEXTAREA")this.default_value_map[r.name]=r.value}else this.default_value_map[r.name]=r.value;else i!="INPUT"||s!="password"&&s!="text"?i!="INPUT"||s!="checkbox"&&s!="radio"?i=="SELECT"&&s=="select-one"?(r.value=o,r.selectedIndex>=0&&r.options[r.selectedIndex].value!==o.toString()&&(r.selectedIndex=-1)):i=="TEXTAREA"&&(r.value=o):r.checked=r.value==o:r.value=o}}function c(e){var t=this.form.elements[e];if(!t.name)return!1;var n=t.type?t.type.toLowerCase():null,r=t.tagName,i=this.default_value_map[t.name];if(i===null||typeof i=="undefined")i="";if(r=="INPUT"&&n=="file"){if(t.value)return!0}else if(r!="INPUT"||n!="password"&&n!="text"&&n!="file")if(r!="INPUT"||n!="checkbox"&&n!="radio"){if((r!="SELECT"||n!="select-one")&&r!="TEXTAREA")return!1;if(t.value!=i)return!0}else{var s=t.value==i;if(s&&!t.checked||!s&&t.checked)return!0}else if(t.value!=i)return!0}n.row_marker_class="formmgr-row",n.field_marker_class="formmgr-field",n.status_marker_class="formmgr-message-text",n.status_none_class="formmgr-status-hidden",n.status_success_class="formmgr-status-success",n.status_failure_class="formmgr-status-failure",n.row_status_prefix="formmgr-has";var r,i,s;n.getElementStatus=function(t){var n=e.one(t).get("className").match(a());return n&&n.length>1?n[1]:!1},n.clearMessage=function(t){var n=e.one(t).getAncestorByClassName(e.FormManager.row_marker_class);n&&n.hasClass(u())&&(n.all("."+e.FormManager.status_marker_class).set("innerHTML",""),n.removeClass(u()),n.all("."+e.FormManager.field_marker_class).removeClass(u()))},n.displayMessage=function(t,r,i,s,o){e.Lang.isUndefined(o)&&(o=!s),t=e.one(t);var a=t.getAncestorByClassName(n.row_marker_class);if(a&&n.statusTakesPrecedence(n.getElementStatus(a),i)){var f=a.all("."+n.field_marker_class);f&&f.removeClass(u()),r&&a.one("."+n.status_marker_class).set("innerHTML",r);var l=n.row_status_prefix+i;a.replaceClass(u(),l),f=t.getAncestorByClassName(n.field_marker_class,!0),f&&f.replaceClass(u(),l);var c=t.getAncestorByTagName("fieldset");c&&n.statusTakesPrecedence(n.getElementStatus(c),i)&&(c.removeClass(u()),c.addClass(n.row_status_prefix+i));if(o&&t.get("offsetHeight")!==0){a.scrollIntoView();try{t.focus()}catch(h){}}return!0}return!1},e.extend(n,e.Plugin.Host,{getForm:function(){return this.form||(this.form=e.config.doc.forms[this.form_name]),this.form},hasFileInputs:function(){return this.has_file_inputs},setStatusNode:function(t){this.status_node=e.one(t)},setDefaultValues:function(t){e.Model&&t instanceof e.Model&&(t=t.getAttrs()),this.default_value_map=t},setDefaultValue:function(e,t){this.default_value_map[e]=t},saveCurrentValuesAsDefault:function(){this.default_value_map={},this.button_list=[],l.call(this)},setFunction:function(e,t){this.validation.fn[f(e)]=t},setRegex:function(t,n,r){t=f(t),e.Lang.isString(n)?this.validation.regex[t]=new RegExp(n,r):this.validation.regex[t]=n,(!this.validation_msgs[t]||!this.validation_msgs[t].regex)&&e.error(e.substitute("No error message provided for regex validation of {id}!",{id:t}),null,"FormManager")},setErrorMessages:function(e,t){this.validation_msgs[f(e)]=t},addErrorMessage:function(e,t,n){e=f(e),this.validation_msgs[e]||(this.validation_msgs[e]={}),this.validation_msgs[e][t]=n},clearForm:function(){this.clearMessages(),this.form.reset(),this.postPopulateForm()},populateForm:function(){this.clearMessages(),l.call(this),this.postPopulateForm()},postPopulateForm:function(){},isChanged:function(){for(var e=0;e<this.form.elements.length;e++)if(c.call(this,e))return!0;return!1},getChanges:function(){var e={};for(var t=0;t<this.form.elements.length;t++)if(c.call(this,t)){var n=this.form.elements[t];e[n.name]=n.value}return e},prepareForm:function(){return this.getForm(),this.prePrepareForm.apply(this,arguments)?(this.populateForm(),this.postPrepareForm.apply(this,arguments)):!1},prePrepareForm:function(){return!0},postPrepareForm:function(){return!0},initFocus:function(){for(var e=0;e<this.form.elements.length;e++){var t=this.form.elements[e];if(t.disabled||t.offsetHeight===0)continue;var n=t.tagName,r=t.type?t.type.toLowerCase():null;if(n=="INPUT"&&(r=="file"||r=="password"||r=="text")||n=="TEXTAREA"){try{t.focus()}catch(i){}t.select();break}}},validateForm:function(){this.clearMessages();var t=!0,r=this.form.elements;this.has_file_inputs=n.cleanValues(r);for(var i=0;i<r.length;i++){var s=r[i].id,o=this.validation_msgs[s],u=n.validateFromCSSData(r[i],o);if(u.error){this.displayMessage(r[i],u.error,"error"),t=!1;continue}if(u.keepGoing&&this.validation
.regex[s]&&!this.validation.regex[s].test(r[i].value)){this.displayMessage(r[i],o?o.regex:null,"error"),t=!1;continue}var a=this.validation.fn[s],f=this;e.Lang.isFunction(a)||(e.Lang.isString(a)?a=f[a]:a&&a.scope?(f=a.scope,a=e.Lang.isString(a.fn)?f[a.fn]:a.fn):a=null);if(a&&!a.call(f,this.form,e.one(r[i]))){t=!1;continue}}return this.postValidateForm(this.form)||(t=!1),t||this.notifyErrors(),t},postValidateForm:function(e){return!0},registerButton:function(t){var n={e:e.Lang.isString(t)||t.tagName?e.one(t):t};this.user_button_list.push(n)},isFormEnabled:function(){return this.enabled},enableForm:function(){this.setFormEnabled(!0)},disableForm:function(){this.setFormEnabled(!1)},setFormEnabled:function(e){this.enabled=e;var t=!e;for(var n=0;n<this.button_list.length;n++)this.button_list[n].disabled=t;for(n=0;n<this.user_button_list.length;n++){var r=this.user_button_list[n];r.e.set("disabled",t)}},hasMessages:function(){return this.has_messages},hasErrors:function(){return this.has_errors},getRowStatus:function(t){var r=e.one(t).getAncestorByClassName(n.row_marker_class,!0);return n.getElementStatus(r)},clearMessages:function(){this.has_messages=!1,this.has_errors=!1,this.status_node&&(this.status_node.set("innerHTML",""),this.status_node.replaceClass(o(),n.status_none_class)),e.Array.each(this.form.elements,function(e){var t=e.type?e.type.toLowerCase():null;e.tagName!="BUTTON"&&t!="submit"&&t!="reset"&&n.clearMessage(e)}),e.one(this.form).all("fieldset").removeClass(u())},displayMessage:function(e,t,r,i){return n.displayMessage(e,t,r,this.has_messages,i)?(this.has_messages=!0,r=="error"&&(this.has_errors=!0),!0):!1},notifyErrors:function(){this.displayFormMessage(n.Strings.validation_error,!0,!1)},displayFormMessage:function(t,r,i){e.Lang.isUndefined(i)&&(i=!0),this.status_node&&(this.status_node.innerHTML||(this.status_node.replaceClass(n.status_none_class,r?n.status_failure_class:n.status_success_class),this.status_node.set("innerHTML",t)),i&&this.status_node.scrollIntoView())}}),e.aggregate(n,e.FormManager),e.FormManager=n},"gallery-2013.09.25-18-27",{requires:["pluginhost-base","gallery-node-optimizations","gallery-formmgr-css-validation"],optional:["gallery-scrollintoview"]});
