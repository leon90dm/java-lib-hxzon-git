zul.sel.Option=zk.$extends(zul.Widget,{_selected:false,$define:{disabled:function(a){var b=this.$n();if(b){b.disabled=a?"disabled":""}},value:null},focus:function(a){var b=this.parent;if(b){b.focus(a)}},setVisible:function(a){if(this._visible!=a){this._visible=a;if(this.desktop){this.parent.rerender()}}},setSelected:function(a){a=a||false;if(this._selected!=a){if(this.parent){this.parent.toggleItemSelection(this)}this._setSelectedDirectly(a)}},_setSelectedDirectly:function(a){var b=this.$n();if(b){b.selected=a?"selected":""}this._selected=a},isSelected:function(){return this._selected},getLabel:function(){return this.firstChild?this.firstChild.getLabel():null},getMaxlength:function(){return this.parent?this.parent.getMaxlength():0},domLabel_:function(){return zUtl.encodeXML(this.getLabel(),{maxlength:this.getMaxlength()})},domAttrs_:function(){var a=this.getValue();return this.$supers("domAttrs_",arguments)+(this.isDisabled()?' disabled="disabled"':"")+(this.isSelected()?' selected="selected"':"")+(a?' value="'+a+'"':"")},replaceWidget:function(a){this._syncItems(a);this.$supers("replaceWidget",arguments)},_syncItems:function(b){if(this.parent&&this.isSelected()){var a=this.parent._selItems;if(a&&a.$remove(this)){a.push(b)}}}});