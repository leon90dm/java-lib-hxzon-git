zul.tab.Tabs=zk.$extends(zul.Widget,{getTabbox:function(){return this.parent},getWidth:function(){var b=this._width;if(!b){var a=this.getTabbox();if(a&&a.isVertical()){return"50px"}}return b},getZclass:function(){if(this._zclass!=null){return this._zclass}var a=this.getTabbox();if(!a){return"z-tabs"}return"z-tabs"+(a.getMold()=="default"&&a.isVertical()?"-ver":"")},beforeSize:zk.ie6_?function(){var b=this.getWidth(),a=this.getHflex();if(!b&&a!="min"){this.$n("header").style.width=this.$n().style.width=""}}:zk.$void,onSize:function(){this._fixWidth();this._scrollcheck("init")},insertChildHTML_:function(e,c,d){var b=e.previousSibling;if(c){jq(c).before(e.redrawHTML_())}else{if(b){jq(b).after(e.redrawHTML_())}else{var a=this.$n("edge");if(a){jq(a).before(e.redrawHTML_())}else{jq(this.getCaveNode()).append(e.redrawHTML_())}}}e.bind(d)},domClass_:function(d){var c=this.$supers("domClass_",arguments);if(!d||!d.zclass){var b=this.getTabbox(),a=b.isTabscroll()?c+"-scroll":"";if(a){c+=(c?" ":"")+a}}return c},setVflex:function(a){if(a!="min"){a=false}this.$super(zul.tab.Tabs,"setVflex",a)},setHflex:function(a){if(a!="min"){a=false}this.$super(zul.tab.Tabs,"setHflex",a)},bind_:function(g,f,e){this.$supers(zul.tab.Tabs,"bind_",arguments);zWatch.listen({onSize:this});if(zk.ie6_){zWatch.listen({beforeSize:this})}for(var d,c=["right","left","down","up"],b=c.length;b--;){if((d=this.$n(c[b]))){this.domListen_(d,"onClick")}}this._inited=false;var a=this;e.push(function(){a._inited=true})},unbind_:function(){zWatch.unlisten({onSize:this,beforeSize:this});for(var c,b=["right","left","down","up"],a=b.length;a--;){if((c=this.$n(b[a]))){this.domUnlisten_(c,"onClick")}}this.$supers(zul.tab.Tabs,"unbind_",arguments)},_isInited:function(){return this._inited},_scrollcheck:function(g,i){var f=this.getTabbox();if(!this.desktop||!f.isRealVisible()||!f.isTabscroll()){return}var j=this.$n(),y=f.$n();if(!j||!y){return}if(f.isVertical()){var r=this.$n("header"),v=r.offsetHeight,z=r.scrollTop,e=0;jq(this.$n("cave")).children().each(function(){e+=this.offsetHeight});if(f._scrolling){var w=this._getArrowSize();if(j.offsetHeight<w){return}var q=f.getSelectedTab(),p=i?i.$n():(q?q.$n():null),o=p?p.offsetTop:0,c=p?p.offsetHeight:0;if(e<=v+w){f._scrolling=false;this._showbutton(false);r.style.height=jq.px0(y.offsetHeight-2);r.scrollTop=0}switch(g){case"end":var u=e-v-z;this._doScroll(u>=0?"down":"up",u>=0?u:Math.abs(u));break;case"init":case"vsel":if(o<z){this._doScroll("up",z-o)}else{if(o+c>z+v){this._doScroll("down",o+c-z-v)}}break}}else{if(e-(v-zk(this.$n("cave")).padBorderHeight())>0){f._scrolling=true;this._showbutton(true);var w=this._getArrowSize(),t=y.offsetHeight-w;r.style.height=t>0?t+"px":"";if(g=="end"){var u=e-v-z+2;if(u>=0){this._doScroll(this.uuid,"down",u)}}}}}else{if(!f.inAccordionMold()){var k=this.$n("cave"),r=this.$n("header"),q=f.getSelectedTab(),p=i?i.$n():(q?q.$n():null),s=p?p.offsetLeft:0,m=p?p.offsetWidth:0,n=r.offsetWidth,x=r.scrollLeft,b=0,l=f.toolbar;jq(k).children().each(function(){b+=this.offsetWidth});if(l){l=l.$n()}if(f._scrolling){var w=this._getArrowSize();if(l){var a,h;if(zk.gecko2_){a=l.parentNode.parentNode;a.style.height="";h=a.offsetHeight}this.$n("right").style.right=l.offsetWidth+"px";if(zk.gecko2_){a.style.height=jq.px0(zk(a).revisedHeight(h))}}if(j.offsetWidth<w){return}if(b<=n+w){f._scrolling=false;this._showbutton(false);r.style.width=jq.px0(y.offsetWidth-(l?l.offsetWidth:0));r.scrollLeft=0}switch(g){case"end":var u=b-n-x;this._doScroll(u>=0?"right":"left",u>=0?u:Math.abs(u));break;case"init":case"sel":if(s<x){this._doScroll("left",x-s)}else{if(s+m>x+n){this._doScroll("right",s+m-x-n)}}break}}else{if(b-(n-zk(this.$n("cave")).padBorderWidth())>0){f._scrolling=true;this._showbutton(true);var k=this.$n("cave"),w=this._getArrowSize(),t=y.offsetWidth-(l?l.offsetWidth:0)-w;k.style.width="5555px";r.style.width=t>0?t+"px":"";if(l){this.$n("right").style.right=l.offsetWidth+"px"}if(g=="sel"){if(s<x){this._doScroll("left",x-s)}else{if(s+m>x+n){this._doScroll("right",s+m-x-n)}}}}}}}},_doScroll:function(f,a){if(!this._doingScroll){this._doingScroll={}}if(a<=0||this._doingScroll[f]){return}var c,b=this,e=this.$n("header");this._doingScroll[f]=a;c=a<=60?5:(5*(zk.parseInt(a/60)+1));var d=setInterval(function(){if(!a){delete b._doingScroll[f];clearInterval(d);return}else{a<c?goscroll(e,f,a):goscroll(e,f,c);a-=c;a=a<0?0:a}},10);goscroll=function(i,h,g){switch(h){case"right":i.scrollLeft+=g;break;case"left":i.scrollLeft-=g;break;case"up":i.scrollTop-=g;break;default:i.scrollTop+=g}i.scrollLeft=(i.scrollLeft<=0?0:i.scrollLeft);i.scrollTop=(i.scrollTop<=0?0:i.scrollTop)}},_getArrowSize:function(){var c=this.getTabbox(),d=c.isVertical(),b=d?this.$n("up"):this.$n("left"),a=d?this.$n("down"):this.$n("right");return b&&a?(d?b.offsetHeight+a.offsetHeight:b.offsetWidth+a.offsetWidth):0},_showbutton:function(a){var b=this.getTabbox(),c=this.getZclass();if(b.isTabscroll()){var d=this.$n("header");if(b.isVertical()){if(a){jq(d).addClass(c+"-header-scroll");jq(this.$n("down")).addClass(c+"-down-scroll");jq(this.$n("up")).addClass(c+"-up-scroll")}else{jq(d).removeClass(c+"-header-scroll");jq(this.$n("down")).removeClass(c+"-down-scroll");jq(this.$n("up")).removeClass(c+"-up-scroll")}}else{if(a){jq(d).addClass(c+"-header-scroll");jq(this.$n("right")).addClass(c+"-right-scroll");jq(this.$n("left")).addClass(c+"-left-scroll")}else{jq(d).removeClass(c+"-header-scroll");jq(this.$n("right")).removeClass(c+"-right-scroll");jq(this.$n("left")).removeClass(c+"-left-scroll")}}}},_doClick:function(n){var m=this.$n("cave"),g=jq(m).children();if(!g.length){return}var o=n.domTarget,b=0,a=this.getTabbox(),k=this.$n("header"),c=a.isVertical()?k.scrollTop:k.scrollLeft,f=a.isVertical()?k.offsetHeight:k.offsetWidth,j=c+f;if(o.id==this.uuid+"-right"){for(var e=0,h=g.length;e<h;e++){if(g[e].offsetLeft+g[e].offsetWidth>j){b=g[e].offsetLeft+g[e].offsetWidth-c-f;if(!b||isNaN(b)){return}this._doScroll("right",b);return}}}else{if(o.id==this.uuid+"-left"){for(var e=0,h=g.length;e<h;e++){if(g[e].offsetLeft>=c){var l=jq(g[e]).prev("li")[0];if(!l){return}b=c-l.offsetLeft;if(isNaN(b)){return}this._doScroll("left",b);return}}b=c-g[g.length-1].offsetLeft;if(isNaN(b)){return}this._doScroll("left",b);return}else{if(o.id==this.uuid+"-up"){for(var e=0,h=g.length;e<h;e++){if(g[e].offsetTop>=c){var d=jq(g[e]).prev("li")[0];if(!d){return}b=c-d.offsetTop;this._doScroll("up",b);return}}var d=g[g.length-1];if(!d){return}b=c-d.offsetTop;this._doScroll("up",b);return}else{if(o.id==this.uuid+"-down"){for(var e=0,h=g.length;e<h;e++){if(g[e].offsetTop+g[e].offsetHeight>j){b=g[e].offsetTop+g[e].offsetHeight-c-f;if(!b||isNaN(b)){return}this._doScroll("down",b);return}}}}}}},_fixWidth:function(){var h=this.$n();var b=this.getTabbox(),m=b.$n(),k=this.$n("cave"),i=this.$n("header"),d=this.$n("left"),a=this.$n("right"),c=b._scrolling?d&&a?d.offsetWidth+a.offsetWidth:0:0;this._fixHgh();if(this.parent.isVertical()){var f=b.getTabpanels();if(f){f._fixWidth()}var g=0;if(h.style.width){h._width=h.style.width}else{this._forceStyle(h,"w",h._width?h._width:"50px")}}else{if(!b.inAccordionMold()){if(m.offsetWidth<c){return}if(b.isTabscroll()){var j=b.toolbar;if(j){j=j.$n()}if(!m.style.width){this._forceStyle(m,"w","100%");this._forceStyle(h,"w",jq.px0(jq(h).zk.revisedWidth(m.offsetWidth)));if(b._scrolling){this._forceStyle(i,"w",jq.px0(m.offsetWidth-(j?j.offsetWidth:0)-c))}else{this._forceStyle(i,"w",jq.px0(jq(i).zk.revisedWidth(m.offsetWidth-(j?j.offsetWidth:0))))}}else{this._forceStyle(h,"w",jq.px0(jq(h).zk.revisedWidth(m.offsetWidth)));this._forceStyle(i,"w",h.style.width);if(b._scrolling){this._forceStyle(i,"w",jq.px0(i.offsetWidth-(j?j.offsetWidth:0)-c))}else{this._forceStyle(i,"w",jq.px0(i.offsetWidth-(j?j.offsetWidth:0)))}}if(j&&b._scrolling){this.$n("right").style.right=j.offsetWidth+"px"}}else{if(!m.style.width){if(m.offsetWidth){var e=jq.px0(m.offsetWidth);this._forceStyle(m,"w",e);this._forceStyle(h,"w",e)}}else{this._forceStyle(h,"w",jq.px0(m.offsetWidth))}}}}},_fixHgh:function(){var j=this.$n(),a=this.getTabbox(),n=a.$n(),k=this.$n("header"),o=this.$n("up"),i=this.$n("down"),m=this.$n("cave"),c=o&&i?isNaN(o.offsetHeight+i.offsetHeight)?0:o.offsetHeight+i.offsetHeight:0;if(a.isVertical()){var b=jq(n).children("div"),e=jq(m).children();if(!a.getHeight()&&(!a._vflex||a._vflex=="min")){var g=e.length*35,l=a.getSelectedPanel(),h=l?l.$n().offsetHeight:0,f=Math.max(g,h);this._forceStyle(n,"h",jq.px0(f))}this._forceStyle(j,"h",jq.px0(jq(j).zk.revisedHeight(n.offsetHeight,true)));if(a._scrolling){this._forceStyle(k,"h",jq.px0(j.offsetHeight-c))}else{this._forceStyle(k,"h",jq.px0(jq(k).zk.revisedHeight(j.offsetHeight,true)))}this._forceStyle(b[1],"h",jq.px0(jq(b[1]).zk.revisedHeight(j.offsetHeight,true)));this._forceStyle(b[2],"h",jq.px0(jq(b[1]).zk.revisedHeight(j.offsetHeight-(2-zk.parseInt(jq(this.$n("cave")).css("padding-top"))),true)))}else{if(k){k.style.height=""}}},_forceStyle:function(b,a,c){if(!c){return}switch(a){case"h":b.style.height=zk.ie6_?"0px":"";b.style.height=c;break;case"w":b.style.width=zk.ie6_?"0px":"";b.style.width="";b.style.width=c;break}},onChildRemoved_:function(b){var a=this.parent;if(a&&b==a._selTab){a._selTab=null;if(a=a.tabpanels){a._selPnl=null}}this._scrollcheck("init");this.$supers("onChildRemoved_",arguments)},onChildAdded_:function(){this._scrollcheck("init");this.$supers("onChildAdded_",arguments)},ignoreFlexSize_:function(a){var b=this.getTabbox();return(b.isVertical()&&"h"==a)||(b.isHorizontal()&&"w"==a)}});