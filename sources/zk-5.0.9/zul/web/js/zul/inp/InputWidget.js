(function(){function g(k,j,l){var i={value:j,start:zk(k.getInputNode()).getSelectionRange()[0]};if(l){i.bySelectBack=true}return i}function h(i){c(i);i._tidChg=setTimeout(i.proxy(b),zul.inp.InputWidget.onChangingDelay)}function c(j,i){if(j._tidChg){clearTimeout(j._tidChg);j._tidChg=null}if(i){if(zul.inp.InputWidget.onChangingForced&&j.isListen("onChanging")){b.call(j,-1)}a(j)}}function a(i){i._lastChg=i.valueEnter_=i.valueSel_=null}function b(k){var j=this.getInputNode(),l=this.valueEnter_||j.value;if(this._lastChg!=l){this._lastChg=l;var i=this.valueSel_;this.valueSel_=null;this.fire("onChanging",g(this,l,i==l),{ignorable:1,rtags:{onChanging:1}},k||5)}}var f=zk.ie?function(){return true}:zk.opera?function(i){return i==32||i>46}:function(i){return i>=32},e=zk.ie?function(i){setTimeout(function(){if(i==zk.currentFocus){zjq.fixInput(i.getInputNode())}},0)}:zk.$void;zul.inp.Renderer={renderSpinnerButton:function(i,j){}};zul.inp.RoundUtl={syncWidth:function(m,i){var l=m.$n();if(!zk(l).isRealVisible()||(!m._inplace&&!l.style.width)){return}var k=m.getInputNode();if(!l.style.width&&m._inplace&&(m._buttonVisible==undefined||m._buttonVisible)){l.style.width=jq.px0(this.getOuterWidth(m,true))}if(zk.ie6_&&l.style.width){k.style.width="0px"}var j=this.getOuterWidth(m,m.inRoundedMold());k.style.width=jq.px0(zk(k).revisedWidth(j-(i?i.offsetWidth:0)))},getOuterWidth:function(p,i){var l=p.$n(),k=jq(l),o=jq(p.getInputNode()),n=p.getInplaceCSS(),m=!l.style.width&&p._inplace;if(i&&m){k.removeClass(n);o.removeClass(n)}var j=zk(l).revisedWidth(l[zk.opera?"clientWidth":"offsetWidth"])+(zk.opera?zk(l).borderWidth():0);if(i&&m){k.addClass(n);o.addClass(n)}return j}};var d=zul.inp.InputWidget=zk.$extends(zul.Widget,{_maxlength:0,_cols:0,_type:"text",$define:{name:function(i){var j=this.getInputNode();if(j){j.name=i}},disabled:function(i){var j=this.getInputNode();if(j){j.disabled=i;var k=this.getZclass(),l=i?"addClass":"removeClass";jq(this.$n())[l](k+"-disd");jq(j)[l](k+"-text-disd")}},readonly:function(i){var k=this.getInputNode();if(k){e(this);var l=this.getZclass(),m=i?"addClass":"removeClass";k.readOnly=i;jq(this.$n())[m](l+"-real-readonly");jq(k)[m](l+"-readonly");if(!this.inRoundedMold()){return}var j=this.$n("btn");jq(j)[m](l+"-btn-readonly");if(zk.ie6_){jq(j)[m](l+(this._buttonVisible?"-btn-readonly":"-btn-right-edge-readonly"));jq(this.$n("right-edge"))[m](l+"-right-edge-readonly")}}},cols:function(j){var i=this.getInputNode();if(i){if(this.isMultiline()){i.cols=j}else{i.size=j}}},maxlength:function(i){var j=this.getInputNode();if(j&&!this.isMultiline()){j.maxLength=i}},tabindex:function(i){var j=this.getInputNode();if(j){j.tabIndex=i||""}},inplace:function(i){this.rerender()}},getInplaceCSS:function(){return this._inplace?this.getZclass()+"-inplace":""},select:function(j,i){zk(this.getInputNode()).setSelectionRange(j,i)},getType:function(){return this._type},isMultiline:function(){return false},inRoundedMold:function(){return this._mold=="rounded"},getText:function(){return this.coerceToString_(this.getValue())},setText:function(i){this.setValue(this.coerceFromString_(i))},getValue:function(){return this._value},setValue:function(k,i){var l;if(i){this.clearErrorMessage(true)}else{if(k==this._lastRawValVld){return}l=this._validate(k);k=l.value}a(this);if((!l||!l.error)&&(i||!this._equalValue(this._value,k))){this._value=k;var j=this.getInputNode();if(j){this._defValue=this._lastChg=j.value=k=this.coerceToString_(k)}}},set_value:function(j,i){this.setValue(this.unmarshall_(j),i)},getInputNode:_zkf=function(){return this.$n("real")||this.$n()},getTextNode:_zkf,domAttrs_:function(j){var i=this.$supers("domAttrs_",arguments);if(!j||!j.text){i+=this.textAttrs_()}return i},textAttrs_:function(){var j="",i;if(this.isMultiline()){i=this._cols;if(i>0){j+=' cols="'+i+'"'}}else{j+=' value="'+this._areaText()+'"';j+=' type="'+this._type+'"';i=this._cols;if(i>0){j+=' size="'+i+'"'}i=this._maxlength;if(i>0){j+=' maxlength="'+i+'"'}}i=this._tabindex;if(i){j+=' tabindex="'+i+'"'}i=this._name;if(i){j+=' name="'+i+'"'}if(this._disabled){j+=' disabled="disabled"'}if(this._readonly){j+=' readonly="readonly"'}var k=jq.filterTextStyle(this.domStyle_({width:true,height:true,top:true,left:true}));if(k){j+=' style="'+k+'"'}return j},_onChanging:b,_areaText:function(){return zUtl.encodeXML(this.coerceToString_(this._value))},setConstraint:function(i){if(typeof i=="string"&&i.charAt(0)!="["){this._cst=new zul.inp.SimpleConstraint(i)}else{this._cst=i}if(this._cst){delete this._lastRawValVld}},getConstraint:function(){return this._cst},doMouseOut_:function(){this._inplaceout=true;this.$supers("doMouseOut_",arguments)},doMouseOver_:function(){this._inplaceout=false;this.$supers("doMouseOver_",arguments)},doFocus_:function(j){this.$supers("doFocus_",arguments);var l=this.getInputNode();if(l){this._lastChg=l.value}if(j.domTarget.tagName){jq(this.$n()).addClass(this.getZclass()+"-focus");if(this._inplace){jq(this.getInputNode()).removeClass(this.getInplaceCSS());if(!this._inplaceout){this._inplaceout=true}}if(this._errbox){var k=this,i=k._cst&&k._cst._pos;setTimeout(function(){if(k._errbox){k._errbox.open(k,null,i||"end_before",{dodgeRef:!i})}})}}},doBlur_:function(i){c(this,true);jq(this.$n()).removeClass(this.getZclass()+"-focus");if(!zk.alerting&&this.shallUpdate_(zk.currentFocus)){this.updateChange_();this.$supers("doBlur_",arguments)}if(this._inplace&&this._inplaceout){jq(this.getInputNode()).addClass(this.getInplaceCSS())}},_doSelect:function(j){if(this.isListen("onSelection")){var l=this.getInputNode(),k=zk(l).getSelectionRange(),i=k[0],m=k[1];this.fire("onSelection",{start:i,end:m,selected:l.value.substring(i,m)})}},shallUpdate_:function(i){return !i||!zUtl.isAncestor(this,i)},getErrorMesssage:function(){return this._errmsg},setErrorMessage:function(i){this.clearErrorMessage(true,true);this._markError(i,null,true)},clearErrorMessage:function(l,k){var i=this._errbox;if(i){this._errbox=null;i.destroy()}if(!k){var j=this.getZclass();this._errmsg=null;jq(this.getInputNode()).removeClass(j+"-text-invalid");if(zk.ie6_&&this.inRoundedMold()){jq(this.$n("btn")).removeClass(j+"-btn-right-edge-invalid");jq(this.$n("right-edge")).removeClass(j+"-right-edge-invalid")}}if(l){delete this._lastRawValVld}},coerceFromString_:function(i){return i},coerceToString_:function(i){return i||""},_markError:function(n,m,k){this._errmsg=n;var l=this.getZclass();if(this.desktop){jq(this.getInputNode()).addClass(l+"-text-invalid");if(zk.ie6_&&this.inRoundedMold()){if(!this._buttonVisible){jq(this.$n("btn")).addClass(l+"-btn-right-edge-invalid")}jq(this.$n("right-edge")).addClass(l+"-right-edge-invalid")}var i=this._cst,j;if(i!="[c"){if(i&&(j=i.showCustomError)){j=j.call(i,this,n)}if(!j){this._errbox=this.showError_(n)}}if(!k){this.fire("onError",{value:m,message:n})}}},validate_:function(k){var i;if(i=this._cst){if(typeof i=="string"){return false}var j=i.validate(this,k);if(!j&&i.serverValidate){return false}return j}},_validate:function(j){zul.inp.validating=true;try{var l=j,k;if(typeof l=="string"||l==null){l=this.coerceFromString_(l);if(l&&(k=l.error)){this.clearErrorMessage(true);if(this._cst=="[c"){return{error:k,server:true}}this._markError(k,l);return l}}if(!this.desktop){this._errmsg=null}else{var i=this._errmsg;this.clearErrorMessage(true);k=this.validate_(l);if(k===false){this._lastRawValVld=j;return{value:l,server:true}}if(k){this._markError(k,l);return{error:k}}this._lastRawValVld=j;if(i){this.fire("onError",{value:l})}}return{value:l}}finally{zul.inp.validating=false}},_shallIgnore:function(i,k){var j=(zk.ie||zk.opera)?i.keyCode:i.charCode;if(!i.altKey&&!i.ctrlKey&&f(j)&&k.indexOf(String.fromCharCode(j))<0){i.stop();return true}},showError_:function(j){var i=new zul.inp.Errorbox();i.show(this,j);return i},_equalValue:function(j,i){return j==i||this.marshall_(j)==this.marshall_(i)},marshall_:function(i){return i},unmarshall_:function(i){return i},updateChange_:function(){if(zul.inp.validating){return false}var j=this.getInputNode(),l=j.value;if(l==this._lastRawValVld){return false}var i=this._errmsg,m=this._validate(l);if(!m.error||m.server){var k;if(!m.error){this._lastRawValVld=j.value=l=this.coerceToString_(m.value);k=i||!this._equalValue(m.value,this._value);if(k){this._value=m.value;this._defValue=l}}if(k||m.server){this.fire("onChange",g(this,this.marshall_(m.value)),m.server?{toServer:true}:null,90)}}return true},fireOnChange:function(i){this.fire("onChange",g(this,this.marshall_(this.getValue())),i)},_resetForm:function(){var i=this.getInputNode();if(i.value!=i.defaultValue){var j=this;setTimeout(function(){j.updateChange_()},0)}},focus_:function(i){zk(this.getInputNode()).focus(i);return true},domClass_:function(k){var j=this.$supers("domClass_",arguments),i=this.getZclass();if((!k||!k.zclass)&&this._disabled){j+=" "+i+"-disd"}if((!k||!k.input)&&this._inplace){j+=" "+this.getInplaceCSS()}if((!k||!k.zclass)&&this._readonly){j+=" "+i+"-real-readonly"}return j},bind_:function(){this.$supers(d,"bind_",arguments);var j=this.getInputNode(),i=this.getZclass();this._defValue=j.value;if(this._readonly){jq(j).addClass(i+"-readonly")}if(this._disabled){jq(j).addClass(i+"-text-disd")}this.domListen_(j,"onFocus","doFocus_").domListen_(j,"onBlur","doBlur_").domListen_(j,"onSelect");if(j=j.form){jq(j).bind("reset",this.proxy(this._resetForm))}},unbind_:function(){this.clearErrorMessage(true);var i=this.getInputNode();this.domUnlisten_(i,"onFocus","doFocus_").domUnlisten_(i,"onBlur","doBlur_").domUnlisten_(i,"onSelect");if(i=i.form){jq(i).unbind("reset",this.proxy(this._resetForm))}this.$supers(d,"unbind_",arguments)},resetSize_:function(i){var j;if(this.$n()!=(j=this.getInputNode())){j.style[i=="w"?"width":"height"]=""}this.$supers("resetSize_",arguments)},doKeyDown_:function(i){var m=i.keyCode;if(this._readonly&&m==8&&i.target==this){i.stop();return}if(!this._inplaceout){this._inplaceout=m==9}if(m==9&&!i.altKey&&!i.ctrlKey&&!i.shiftKey&&this._tabbable){var k=this.getInputNode(),l=zk(k),j=l.getSelectionRange(),n=k.value;n=n.substring(0,j[0])+"\t"+n.substring(j[1]);k.value=n;n=j[0]+1;l.setSelectionRange(n,n);i.stop();return}c(this);this.$supers("doKeyDown_",arguments)},doKeyUp_:function(){if(this.isMultiline()){var i=this._maxlength;if(i>0){var j=this.getInputNode(),k=j.value;if(k!=this._defValue&&k.length>i){j.value=k.substring(0,i)}}}if(this.isListen("onChanging")){h(this)}this.$supers("doKeyUp_",arguments)},afterKeyDown_:function(i,j){if(!j&&this._inplace){if(!this._multiline&&i.keyCode==13){var l=jq(this.getInputNode()),k=this.getInplaceCSS();if(l.toggleClass(k).hasClass(k)){l.zk.setSelectionRange(0,l[0].value.length)}}else{jq(this.getInputNode()).removeClass(this.getInplaceCSS())}}if(i.keyCode!=13||!this.isMultiline()){return this.$supers("afterKeyDown_",arguments)}},beforeCtrlKeys_:function(i){this.updateChange_()}},{onChangingDelay:350,onChangingForced:true})})();