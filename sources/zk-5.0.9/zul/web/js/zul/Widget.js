(function(){var b,j,l,c;function h(n){if(l&&!l.isOpen()){k();g();l=c=null}var m=l&&zUtl.isAncestor(l,n);if(m){g()}return !m}function e(n,m,o){if(l!=n||c!=m){f();b={tip:n,ref:m,params:o,timer:setTimeout(a,o.delay!==undefined?o.delay:zk.tipDelay)}}else{g()}}function d(m){if(c==m||l==m){g();j=setTimeout(f,100)}else{k()}}function k(){var m=b;if(m){b=null;clearTimeout(m.timer)}}function g(){var m=j;if(m){j=null;clearTimeout(m)}}function a(){var m=b;if(m){l=m.tip,c=m.ref;b=null;var q=c.$n();if(q&&!zk(q).isRealVisible()){return l=c=null}var p=m.params,o=p.x!==undefined?[p.x,p.y]:zk.currentPointer;l.open(c,o,p.position?p.position:p.x===null?"after_pointer":null,{sendOnOpen:true})}}function f(){k();g();var m=l;if(m){l=c=null;m.close({sendOnOpen:true})}}function i(m){zk.error("setCtrlKeys: "+m)}zul.Widget=zk.$extends(zk.Widget,{getContext:function(){return this._context},setContext:function(m){if(zk.Widget.isInstance(m)){m="uuid("+m.uuid+")"}this._context=m;return this},getPopup:function(){return this._popup},setPopup:function(m){if(zk.Widget.isInstance(m)){m="uuid("+m.uuid+")"}this._popup=m;return this},getTooltip:function(){return this._tooltip},setTooltip:function(m){if(zk.Widget.isInstance(m)){m="uuid("+m.uuid+")"}this._tooltip=m;return this},getCtrlKeys:function(){return this._ctrlKeys},setCtrlKeys:function(w){if(this._ctrlKeys==w){return}if(!w){this._ctrlKeys=this._parsedCtlKeys=null;return}var t=[{},{},{},{},{}],o=0;for(var q=0,r=w.length;q<r;++q){var m=w.charAt(q);switch(m){case"^":case"$":case"@":if(o){return i("Combination of Shift, Alt and Ctrl not supported: "+w)}o=m=="^"?1:m=="@"?2:3;break;case"#":var n=q+1;for(;n<r;++n){var p=w.charAt(n);if((p>"Z"||p<"A")&&(p>"z"||p<"a")&&(p>"9"||p<"0")){break}}if(n==q+1){return i("Unexpected character "+m+" in "+w)}var x=w.substring(q+1,n).toLowerCase();if("pgup"==x){m=33}else{if("pgdn"==x){m=34}else{if("end"==x){m=35}else{if("home"==x){m=36}else{if("left"==x){m=37}else{if("up"==x){m=38}else{if("right"==x){m=39}else{if("down"==x){m=40}else{if("ins"==x){m=45}else{if("del"==x){m=46}else{if("bak"==x){m=8}else{if(x.length>1&&x.charAt(0)=="f"){var u=zk.parseInt(x.substring(1));if(u==0||u>12){return i("Unsupported function key: #f"+u)}m=112+u-1}else{return i("Unknown #"+x+" in "+w)}}}}}}}}}}}}t[o][m]=true;o=0;q=n-1;break;default:if(!o||((m>"Z"||m<"A")&&(m>"z"||m<"a")&&(m>"9"||m<"0"))){return i("Unexpected character "+m+" in "+w)}if(o==3){return i("$a - $z not supported (found in "+w+"). Allowed: $#f1, $#home and so on.")}if(m<="z"&&m>="a"){m=m.toUpperCase()}t[o][m.charCodeAt(0)]=true;o=0;break}}this._parsedCtlKeys=t;this._ctrlKeys=w;return this},_parsePopParams:function(m){var q={},n=m.indexOf(","),r=m.indexOf("="),o=m;if(r!=-1){o=m.substring(0,m.substring(0,r).lastIndexOf(","))}if(n!=-1){q.id=o.substring(0,n).trim();var p=o.substring(n+1,o.length);if(p){q.position=p.trim()}zk.copy(q,zUtl.parseMap(m.substring(o.length,m.length)))}else{q.id=m.trim()}if(q.x){q.x=zk.parseInt(q.x)}if(q.y){q.y=zk.parseInt(q.y)}if(q.delay){q.delay=zk.parseInt(q.delay)}return q},doClick_:function(n,p){if(!this.shallIgnoreClick_(n)&&!n.contextSelected){var r=this._popup?this._parsePopParams(this._popup):{},m=this._smartFellow(r.id);if(m){n.contextSelected=true;var o=this,q=r.x!==undefined?[r.x,r.y]:[n.pageX,n.pageY];setTimeout(function(){m.open(o,q,r.position?r.position:null,{sendOnOpen:true})},0);n.stop({dom:true})}}if(p!==true){this.$supers("doClick_",arguments)}},doRightClick_:function(n){if(!this.shallIgnoreClick_(n)&&!n.contextSelected){var q=this._context?this._parsePopParams(this._context):{},m=this._smartFellow(q.id);if(m){n.contextSelected=true;var o=this,p=q.x!==undefined?[q.x,q.y]:[n.pageX,n.pageY];setTimeout(function(){m.open(o,p,q.position?q.position:null,{sendOnOpen:true})},0);n.stop({dom:true})}}this.$supers("doRightClick_",arguments)},doTooltipOver_:function(m){if(!m.tooltipped&&h(this)){var o=this._tooltip?this._parsePopParams(this._tooltip):{},n=this._smartFellow(o.id);if(n){m.tooltipped=true;e(n,this,o)}}this.$supers("doTooltipOver_",arguments)},doTooltipOut_:function(m){d(this);this.$supers("doTooltipOut_",arguments)},_smartFellow:function(m){return m?m.startsWith("uuid(")&&m.endsWith(")")?zk.Widget.$(m.substring(5,m.length-1)):this.$f(m,true):null},afterKeyDown_:function(n){var s=n.keyCode,r="onCtrlKey",p;switch(s){case 13:var q=n.domTarget,m=jq.nodeName(q);if(m=="textarea"||(m=="button"&&(!q.id||!q.id.endsWith("-a")))||(m=="input"&&q.type.toLowerCase()=="button")){return}p=r="onOK";break;case 27:p=r="onCancel";break;case 16:case 17:case 18:return;case 45:case 46:case 8:break;default:if((s>=33&&s<=40)||(s>=112&&s<=123)||n.ctrlKey||n.altKey){break}return}var q=n.target,t=q;for(;;t=t.parent){if(!t){return}if(!t.isListen(r,{any:true})){continue}if(p){break}var o=t._parsedCtlKeys;if(o&&o[n.ctrlKey?1:n.altKey?2:n.shiftKey?3:0][s]){break}}setTimeout(function(){for(var u=q;;u=u.parent){if(u.beforeCtrlKeys_&&u.beforeCtrlKeys_(n)){return}if(u==t){break}}t.fire(r,zk.copy({reference:q},n.data))},0);n.stop();if(jq.nodeName(n.domTarget,"select")){n.stop({dom:true,revoke:true})}if(zk.ie&&s==112){zk._oldOnHelp=window.onhelp;window.onhelp=function(){return false};setTimeout(function(){window.onhelp=zk._oldOnHelp;zk._oldOnHelp=null},200)}return true},beforeCtrlKeys_:function(m){}},{getOpenTooltip:function(){return l&&l.isOpen()?l:null}})})();