zul.grid.Column=zk.$extends(zul.mesh.SortWidget,{getGrid:zul.mesh.HeaderWidget.prototype.getMeshWidget,$init:function(){this.$supers("$init",arguments);this.listen({onGroup:this},-1000)},getMeshBody:function(){var a=this.getGrid();return a?a.rows:null},checkClientSort_:function(b){var a;return !(!(a=this.getMeshBody())||a.hasGroup())&&this.$supers("checkClientSort_",arguments)},group:function(e,s){var v=this.getSortDirection();if(e){if("ascending"==v){return false}}else{if("descending"==v){return false}}var y=e?this._sortAscending:this._sortDescending;if(y=="fromServer"){return false}else{if(y=="none"){s.stop();return false}}var a=this.getMeshWidget();if(!a||a.isModel()||!zk.feature.pe||!zk.isLoaded("zkex.grid")){return false}var q=this.getMeshBody();if(!q){return false}s.stop();var D=q.desktop,x=q.$n();try{q.unbind();if(q.hasGroup()){for(var u=q.getGroups(),C=u.length;--C>=0;){q.removeChild(u[C])}}var E=[],f=this.getChildIndex();for(var B=0,o=0,g=a.getBodyWidgetIterator(),p;(p=g.next());o++){for(var A=0,b=p.firstChild;b;b=b.nextSibling,A++){if(A==f){E[B++]={wgt:b,index:o}}}}var l=v=="ascending"?-1:1,n=this.sorting,r=y=="client(number)";E.sort(function(i,d){var k=n(i.wgt,d.wgt,r)*l;if(k==0){k=(i.index<d.index?-1:1)}return k});for(;q.firstChild;){q.removeChild(q.firstChild)}for(var c,j,h=this.getChildIndex(),B=0,A=E.length;B<A;B++){j=E[B];if(!c||n(c.wgt,j.wgt,r)!=0){var m,b=j.wgt.parent.getChildAt(h);if(b&&b.$instanceof(zul.wgt.Label)){m=new zkex.grid.Group();m.appendChild(new zul.wgt.Label({value:b.getValue()}))}else{var t=b.firstChild;if(t&&t.$instanceof(zul.wgt.Label)){m=new zkex.grid.Group();m.appendChild(new zul.wgt.Label({value:t.getValue()}))}else{m=new zkex.grid.Group();m.appendChild(new zul.wgt.Label({value:msgzul.GRID_OTHER}))}}q.appendChild(m)}q.appendChild(j.wgt.parent);c=j}this._fixDirection(e)}finally{q.replaceHTML(x,D)}return true},setLabel:function(a){this.$supers("setLabel",arguments);if(this.parent){this.parent._syncColMenu()}},setVisible:function(a){if(this.isVisible()!=a){this.$supers("setVisible",arguments);if(this.parent){this.parent._syncColMenu()}}},onGroup:function(a){var b=this.getSortDirection();if("ascending"==b){this.group(false,a)}else{if("descending"==b){this.group(true,a)}else{if(!this.group(true,a)){this.group(false,a)}}}},getZclass:function(){return this._zclass==null?"z-column":this._zclass},bind_:function(){this.$supers(zul.grid.Column,"bind_",arguments);var b=this.$n();this.domListen_(b,"onMouseOver").domListen_(b,"onMouseOut");var a=this.$n("btn");if(a){this.domListen_(a,"onClick")}},unbind_:function(){var b=this.$n();this.domUnlisten_(b,"onMouseOver").domUnlisten_(b,"onMouseOut");var a=this.$n("btn");if(a){this.domUnlisten_(a,"onClick")}this.$supers(zul.grid.Column,"unbind_",arguments)},_doMouseOver:function(a){if(this.isSortable_()||(this.parent._menupopup&&this.parent._menupopup!="none")){jq(this.$n()).addClass(this.getZclass()+"-over");zul.grid.Renderer.updateColumnMenuButton(this)}},_doMouseOut:function(a){if(this.isSortable_()||(this.parent._menupopup&&this.parent._menupopup!="none")){var d=this.$n(),b=jq(d),c=this.getZclass();if(!b.hasClass(c+"-visi")&&(!zk.ie||!jq.isAncestor(d,a.domEvent.relatedTarget||a.domEvent.toElement))){b.removeClass(c+"-over")}}},_doClick:function(h){if(this.parent._menupopup&&this.parent._menupopup!="none"){var c=this.parent._menupopup,d=this.$n(),b=this.$n("btn"),a=this.getZclass();jq(d).addClass(a+"-visi");if(c=="auto"&&this.parent._mpop){c=this.parent._mpop}else{c=this.$f(this.parent._menupopup)}if(zul.menu.Menupopup.isInstance(c)){var f=zk(b).revisedOffset(),g=this.getSortAscending()!="none",e=this.getSortDescending()!="none";if(c.$instanceof(zul.grid.ColumnMenupopup)){c.getAscitem().setVisible(g);c.getDescitem().setVisible(e);if(c.getGroupitem()){c.getGroupitem().setVisible((g||e))}var i=c.getDescitem().nextSibling;if(i){i.setVisible((g||e))}}else{c.listen({onOpen:[this.parent,this.parent._onMenuPopup]})}c.open(b,[f[0],f[1]+b.offsetHeight-4],null,{sendOnOpen:true})}h.stop()}}});