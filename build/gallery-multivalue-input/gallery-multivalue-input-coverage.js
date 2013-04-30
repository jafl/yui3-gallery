if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-multivalue-input/gallery-multivalue-input.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-multivalue-input/gallery-multivalue-input.js",
    code: []
};
_yuitest_coverage["build/gallery-multivalue-input/gallery-multivalue-input.js"].code=["YUI.add('gallery-multivalue-input', function (Y, NAME) {","","\"use strict\";","/**********************************************************************"," * Plugin which allows user select multiple value, it replaces the traditional ugly"," * multi select input control"," * @module gallery-multivalue-input"," * @author MaYanK(mzgupta)"," */","","/**"," *"," * @class QueryBuilder"," * @extends Widget"," * @constructor"," * @param config {Object} Widget configuration"," */","function MultiValueInput(config) {","	MultiValueInput.superclass.constructor.apply(this, arguments);","}","","","//Any frequently used shortcuts","var Lang   = Y.Lang, ","MVI        = \"multivalueinput\", ","getCN      = Y.ClassNameManager.getClassName,","DIVCONTENT = getCN(MVI, \"content\"), ","LIST       = getCN(MVI, \"list\"), ","LIST_ITEM  = getCN(MVI,\"listitem\"), ","UL         = getCN(MVI, \"ul\"), ","INPUT      = getCN(MVI, \"input\"), ","Node       = Y.Node;","","","","","","/* "," * Required NAME static field, to identify the Widget class and "," * used as an event prefix, to generate class names etc. (set to the "," * class name in camel case). "," */","MultiValueInput.NAME = \"multiValueInput\";","","//Name space of plugin in case host want to access the plugin","MultiValueInput.NS = \"mvi\";","/*"," * The attribute configuration for the widget. This defines the core user facing state of the widget"," */","MultiValueInput.ATTRS = {","    /*","     * Array of values selected","     * @attribute values","     * @type {array}","     *","     * */ ","	values : {","		value : [],","		validator: function(val) {","	       return Lang.isArray(val);","	    }","	},","    /*","     * Placeholder for inputbox","     * @attribute placeholder","     * @type {String}","     *","     * */ ","	placeholder : {","		value : \"type here\"","	}","};","","/* Templates for any markup for multivalue input includes {} tokens, which are replaced through Y.substitute */","","MultiValueInput.DIV_TEMPLATE = \"<div class={div_class}></div>\";","","//UL tag contain list of values ","MultiValueInput.VALUE_HOLDER_TEMPLATE = \"<ul class={ul_class}></ul>\";","","//LI tag contain item values ","MultiValueInput.LI_TEMPLATE = \"<li class={list_class}>{item}</li>\";","","//markup for input control ","MultiValueInput.INPUT_TEMPLATE = \"<input type='text' placeholder={placeholder} class={input_class}></input>\";","","//Markup for remove icon ","MultiValueInput.ITEM_REMOVE = \"<a href='javascript:void(0)'>,</a>\";","","/* MultiValueInput extends the base Widget class */","Y.extend(MultiValueInput, Y.Plugin.Base,","		{","","			initializer : function() {","                var values = this.get(\"values\"),placeholder=this.get(\"placeholder\");","				this._host = this.get(\"host\");","				this._host.set(\"placeholder\",placeholder); ","","				//Create Container div that contains list of values","				this._divContent = this._createDivNode();","				this._host.insert(this._divContent, \"before\");","","				//Create un order List","				this._ul = this._createULNode();","				","				if (values) {","					for(var i=0;i<values.length;i++){","					    this._ul.appendChild(this._createListNode(values[i], true));","					}","				}","				this._host.addClass(INPUT);","				this._inputWrapper = this._createListNode(\"\");","				this._inputWrapper.appendChild(this._host);","				this._ul.appendChild(this._inputWrapper);","				","","				this._divContent.appendChild(this._ul);","","				// Event Biniding","","				if (this._host.ac) {","					//If host has autocomplete plugged","					this._host.ac.after(\"select\", this._appendItem, this);","				} else {","					this._host.after(\"change\", this._appendItem, this);","				}","				","				this._host.after(\"blur\", function() {","					this._host.set(\"value\", \"\");","					this._divContent.removeClass(\"yui3-multivalueinput-border\");","				},this);","","				this._host.after(\"focus\", function() {","					this._host.set(\"value\", \"\");","					this._divContent.addClass(\"yui3-multivalueinput-border\");","				},this);","				","				this._host.on(\"keydown\", this._keyDownHandler, this);","				","","			},","			destructor : function() {","			},","			","			/**","			 * Generate Markup for UL tag","			 * @method _keyDownHandler","			 * @protected","			 * @param {Event} ","			 */","","			_keyDownHandler:function(/* Event */ e){","				var allList,lastItem, lastItemIndex;","				if(e.keyCode !== 8){","					return;","				}","				allList=this._ul.get(\"children\");","				lastItemIndex=allList.size()-2;","				lastItem=allList.item(lastItemIndex);","				if(!this._host.get(\"value\")){","					if(this._pendingDelete){","						this._removeItem(lastItem, lastItemIndex);","						this._pendingDelete = false;","					}","					else{","						lastItem.addClass(\"yui3-multivalueinput-pendingdelete\");","  					    this._pendingDelete = true;","					}","				}","			},","			","			/**","			 * Generate Markup for UL tag","			 * @method _createULNode","			 * @protected","			 * @return {Node} ","			 */","			","			_createULNode : function() {","				return Node.create(Y.substitute(","						MultiValueInput.VALUE_HOLDER_TEMPLATE, {","							ul_class : UL","						}));","			},","			","			/**","			 * Generate Markup for list tag","			 * @method _createListNode","			 * @protected","			 * @param index {int} the section index","			 * @return {Node}","			 */","			","			_createListNode : function(","					/* String */ item,","					/* boolean */ isListItem) ","			{","				var listNode, anchorNode;","				if (isListItem) {","					anchorNode = Node.create(Y","							.substitute(MultiValueInput.ITEM_REMOVE));","					listNode = Node.create(Y.substitute(","							MultiValueInput.LI_TEMPLATE, {","								item : item,","								list_class : LIST","							}));","					listNode.appendChild(anchorNode);","					anchorNode.on(\"click\", Y.bind(this._removeItem, this,","							listNode));","					listNode.addClass(LIST_ITEM);","				} else {","					listNode = Node.create(Y.substitute(","							MultiValueInput.LI_TEMPLATE, {","								item : item,","								list_class : LIST","								}));","				}","				return listNode;","			},","			","			/**","			 * Generate Markup for div tag","			 * @method _createDivNode","			 * @protected","			 * @return {Node} ","			 */","			","			_createDivNode : function() {","				return Node.create(Y.substitute(MultiValueInput.DIV_TEMPLATE, {","					div_class : DIVCONTENT","				}));","			},","			","			/**","			 * Get the index of remove item","			 * @method _getListIndex","			 * @protected","			 * @param {Node}","			 * @return {index}","			 */","			","			_getListIndex : function(listNode) {","				var allList=this._ul.get(\"children\"),size=allList.size();","				for(var i=0;i<size;i++){","					if(listNode.compareTo(allList.item(i))){","						return i;","					}","				}","				return -1;","			},","			","			/**","			 * add the item in to the list ","			 * @method _appendItem","			 * @protected","			 * @return ","			 */","","			_appendItem : function() {","				var val = this._host.get(\"value\");","				this._inputWrapper.insert(this._createListNode(val, true), \"before\");","				this._addValue(val);","				this._host.set(\"value\", \"\");","			},","			","			/**","			 * remove the item from the list ","			 * @method _removeItem","			 * @protected","			 * @param {Node}","			 * @return ","			 */","			","			_removeItem : function(/* Node */selectedListNode, /* int */ idx) {","				var index = idx || this._getListIndex(selectedListNode);","				this._host.focus();","				selectedListNode.get(\"parentNode\")","						.removeChild(selectedListNode);","				this._removeValue(index);","			},","","			/**","			 * Add value to value list","			 * @method _addValue","			 * @protected","			 * @return ","			 */","","			_addValue : function(val) {","				var values = this.get(\"values\");","				values.push(val);","				this.set(\"values\", values.slice(0));	// force change event","			},","			","			/**","			 * remove value from value list","			 * @method _removeValue","			 * @protected","			 * @param {index}","			 * @return ","			 */","			","			_removeValue : function(/* int */ index) {","				var values = this.get(\"values\"), val = values[index];","				values.splice(index,1);","				this.set(\"values\", values.slice(0));	// force change event","			}","","			","		});","","Y.MultiValueInput = MultiValueInput;","","","}, '@VERSION@', {\"skinnable\": \"true\", \"requires\": [\"plugin\", \"substitute\", \"node\"]});"];
_yuitest_coverage["build/gallery-multivalue-input/gallery-multivalue-input.js"].lines = {"1":0,"3":0,"18":0,"19":0,"24":0,"43":0,"46":0,"50":0,"60":0,"76":0,"79":0,"82":0,"85":0,"88":0,"91":0,"95":0,"96":0,"97":0,"100":0,"101":0,"104":0,"106":0,"107":0,"108":0,"111":0,"112":0,"113":0,"114":0,"117":0,"121":0,"123":0,"125":0,"128":0,"129":0,"130":0,"133":0,"134":0,"135":0,"138":0,"153":0,"154":0,"155":0,"157":0,"158":0,"159":0,"160":0,"161":0,"162":0,"163":0,"166":0,"167":0,"180":0,"198":0,"199":0,"200":0,"202":0,"207":0,"208":0,"210":0,"212":0,"218":0,"229":0,"243":0,"244":0,"245":0,"246":0,"249":0,"260":0,"261":0,"262":0,"263":0,"275":0,"276":0,"277":0,"279":0,"290":0,"291":0,"292":0,"304":0,"305":0,"306":0,"312":0};
_yuitest_coverage["build/gallery-multivalue-input/gallery-multivalue-input.js"].functions = {"MultiValueInput:18":0,"validator:59":0,"(anonymous 2):128":0,"(anonymous 3):133":0,"initializer:94":0,"_keyDownHandler:152":0,"_createULNode:179":0,"_createListNode:194":0,"_createDivNode:228":0,"_getListIndex:242":0,"_appendItem:259":0,"_removeItem:274":0,"_addValue:289":0,"_removeValue:303":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-multivalue-input/gallery-multivalue-input.js"].coveredLines = 82;
_yuitest_coverage["build/gallery-multivalue-input/gallery-multivalue-input.js"].coveredFunctions = 15;
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 1);
YUI.add('gallery-multivalue-input', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 3);
"use strict";
/**********************************************************************
 * Plugin which allows user select multiple value, it replaces the traditional ugly
 * multi select input control
 * @module gallery-multivalue-input
 * @author MaYanK(mzgupta)
 */

/**
 *
 * @class QueryBuilder
 * @extends Widget
 * @constructor
 * @param config {Object} Widget configuration
 */
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 18);
function MultiValueInput(config) {
	_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "MultiValueInput", 18);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 19);
MultiValueInput.superclass.constructor.apply(this, arguments);
}


//Any frequently used shortcuts
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 24);
var Lang   = Y.Lang, 
MVI        = "multivalueinput", 
getCN      = Y.ClassNameManager.getClassName,
DIVCONTENT = getCN(MVI, "content"), 
LIST       = getCN(MVI, "list"), 
LIST_ITEM  = getCN(MVI,"listitem"), 
UL         = getCN(MVI, "ul"), 
INPUT      = getCN(MVI, "input"), 
Node       = Y.Node;





/* 
 * Required NAME static field, to identify the Widget class and 
 * used as an event prefix, to generate class names etc. (set to the 
 * class name in camel case). 
 */
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 43);
MultiValueInput.NAME = "multiValueInput";

//Name space of plugin in case host want to access the plugin
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 46);
MultiValueInput.NS = "mvi";
/*
 * The attribute configuration for the widget. This defines the core user facing state of the widget
 */
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 50);
MultiValueInput.ATTRS = {
    /*
     * Array of values selected
     * @attribute values
     * @type {array}
     *
     * */ 
	values : {
		value : [],
		validator: function(val) {
	       _yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "validator", 59);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 60);
return Lang.isArray(val);
	    }
	},
    /*
     * Placeholder for inputbox
     * @attribute placeholder
     * @type {String}
     *
     * */ 
	placeholder : {
		value : "type here"
	}
};

/* Templates for any markup for multivalue input includes {} tokens, which are replaced through Y.substitute */

_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 76);
MultiValueInput.DIV_TEMPLATE = "<div class={div_class}></div>";

//UL tag contain list of values 
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 79);
MultiValueInput.VALUE_HOLDER_TEMPLATE = "<ul class={ul_class}></ul>";

//LI tag contain item values 
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 82);
MultiValueInput.LI_TEMPLATE = "<li class={list_class}>{item}</li>";

//markup for input control 
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 85);
MultiValueInput.INPUT_TEMPLATE = "<input type='text' placeholder={placeholder} class={input_class}></input>";

//Markup for remove icon 
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 88);
MultiValueInput.ITEM_REMOVE = "<a href='javascript:void(0)'>,</a>";

/* MultiValueInput extends the base Widget class */
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 91);
Y.extend(MultiValueInput, Y.Plugin.Base,
		{

			initializer : function() {
                _yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "initializer", 94);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 95);
var values = this.get("values"),placeholder=this.get("placeholder");
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 96);
this._host = this.get("host");
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 97);
this._host.set("placeholder",placeholder); 

				//Create Container div that contains list of values
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 100);
this._divContent = this._createDivNode();
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 101);
this._host.insert(this._divContent, "before");

				//Create un order List
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 104);
this._ul = this._createULNode();
				
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 106);
if (values) {
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 107);
for(var i=0;i<values.length;i++){
					    _yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 108);
this._ul.appendChild(this._createListNode(values[i], true));
					}
				}
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 111);
this._host.addClass(INPUT);
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 112);
this._inputWrapper = this._createListNode("");
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 113);
this._inputWrapper.appendChild(this._host);
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 114);
this._ul.appendChild(this._inputWrapper);
				

				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 117);
this._divContent.appendChild(this._ul);

				// Event Biniding

				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 121);
if (this._host.ac) {
					//If host has autocomplete plugged
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 123);
this._host.ac.after("select", this._appendItem, this);
				} else {
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 125);
this._host.after("change", this._appendItem, this);
				}
				
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 128);
this._host.after("blur", function() {
					_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "(anonymous 2)", 128);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 129);
this._host.set("value", "");
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 130);
this._divContent.removeClass("yui3-multivalueinput-border");
				},this);

				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 133);
this._host.after("focus", function() {
					_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "(anonymous 3)", 133);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 134);
this._host.set("value", "");
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 135);
this._divContent.addClass("yui3-multivalueinput-border");
				},this);
				
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 138);
this._host.on("keydown", this._keyDownHandler, this);
				

			},
			destructor : function() {
			},
			
			/**
			 * Generate Markup for UL tag
			 * @method _keyDownHandler
			 * @protected
			 * @param {Event} 
			 */

			_keyDownHandler:function(/* Event */ e){
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_keyDownHandler", 152);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 153);
var allList,lastItem, lastItemIndex;
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 154);
if(e.keyCode !== 8){
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 155);
return;
				}
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 157);
allList=this._ul.get("children");
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 158);
lastItemIndex=allList.size()-2;
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 159);
lastItem=allList.item(lastItemIndex);
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 160);
if(!this._host.get("value")){
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 161);
if(this._pendingDelete){
						_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 162);
this._removeItem(lastItem, lastItemIndex);
						_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 163);
this._pendingDelete = false;
					}
					else{
						_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 166);
lastItem.addClass("yui3-multivalueinput-pendingdelete");
  					    _yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 167);
this._pendingDelete = true;
					}
				}
			},
			
			/**
			 * Generate Markup for UL tag
			 * @method _createULNode
			 * @protected
			 * @return {Node} 
			 */
			
			_createULNode : function() {
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_createULNode", 179);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 180);
return Node.create(Y.substitute(
						MultiValueInput.VALUE_HOLDER_TEMPLATE, {
							ul_class : UL
						}));
			},
			
			/**
			 * Generate Markup for list tag
			 * @method _createListNode
			 * @protected
			 * @param index {int} the section index
			 * @return {Node}
			 */
			
			_createListNode : function(
					/* String */ item,
					/* boolean */ isListItem) 
			{
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_createListNode", 194);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 198);
var listNode, anchorNode;
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 199);
if (isListItem) {
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 200);
anchorNode = Node.create(Y
							.substitute(MultiValueInput.ITEM_REMOVE));
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 202);
listNode = Node.create(Y.substitute(
							MultiValueInput.LI_TEMPLATE, {
								item : item,
								list_class : LIST
							}));
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 207);
listNode.appendChild(anchorNode);
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 208);
anchorNode.on("click", Y.bind(this._removeItem, this,
							listNode));
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 210);
listNode.addClass(LIST_ITEM);
				} else {
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 212);
listNode = Node.create(Y.substitute(
							MultiValueInput.LI_TEMPLATE, {
								item : item,
								list_class : LIST
								}));
				}
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 218);
return listNode;
			},
			
			/**
			 * Generate Markup for div tag
			 * @method _createDivNode
			 * @protected
			 * @return {Node} 
			 */
			
			_createDivNode : function() {
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_createDivNode", 228);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 229);
return Node.create(Y.substitute(MultiValueInput.DIV_TEMPLATE, {
					div_class : DIVCONTENT
				}));
			},
			
			/**
			 * Get the index of remove item
			 * @method _getListIndex
			 * @protected
			 * @param {Node}
			 * @return {index}
			 */
			
			_getListIndex : function(listNode) {
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_getListIndex", 242);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 243);
var allList=this._ul.get("children"),size=allList.size();
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 244);
for(var i=0;i<size;i++){
					_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 245);
if(listNode.compareTo(allList.item(i))){
						_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 246);
return i;
					}
				}
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 249);
return -1;
			},
			
			/**
			 * add the item in to the list 
			 * @method _appendItem
			 * @protected
			 * @return 
			 */

			_appendItem : function() {
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_appendItem", 259);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 260);
var val = this._host.get("value");
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 261);
this._inputWrapper.insert(this._createListNode(val, true), "before");
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 262);
this._addValue(val);
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 263);
this._host.set("value", "");
			},
			
			/**
			 * remove the item from the list 
			 * @method _removeItem
			 * @protected
			 * @param {Node}
			 * @return 
			 */
			
			_removeItem : function(/* Node */selectedListNode, /* int */ idx) {
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_removeItem", 274);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 275);
var index = idx || this._getListIndex(selectedListNode);
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 276);
this._host.focus();
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 277);
selectedListNode.get("parentNode")
						.removeChild(selectedListNode);
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 279);
this._removeValue(index);
			},

			/**
			 * Add value to value list
			 * @method _addValue
			 * @protected
			 * @return 
			 */

			_addValue : function(val) {
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_addValue", 289);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 290);
var values = this.get("values");
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 291);
values.push(val);
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 292);
this.set("values", values.slice(0));	// force change event
			},
			
			/**
			 * remove value from value list
			 * @method _removeValue
			 * @protected
			 * @param {index}
			 * @return 
			 */
			
			_removeValue : function(/* int */ index) {
				_yuitest_coverfunc("build/gallery-multivalue-input/gallery-multivalue-input.js", "_removeValue", 303);
_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 304);
var values = this.get("values"), val = values[index];
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 305);
values.splice(index,1);
				_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 306);
this.set("values", values.slice(0));	// force change event
			}

			
		});

_yuitest_coverline("build/gallery-multivalue-input/gallery-multivalue-input.js", 312);
Y.MultiValueInput = MultiValueInput;


}, '@VERSION@', {"skinnable": "true", "requires": ["plugin", "substitute", "node"]});
