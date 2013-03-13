/**
 *
 */

define(['Mstar', 'Event'], function(M, Event) {
    
	var Model = M.Model = M.factory({
	    
		Implements: Event, // 从Event中混入属性
		
		init: function(attributes) {
		    this.mid = M.uniqueId('model');
			var attrs = attributes || {};
			this.attributes = attrs;
			this.changed = {};
			this.trigger('initialized');
		},
		
		get: function(func, context) {
		    context || (context = this);
			return func.call(context, this.attributes);
		},
		
		getAttr: function() {
		    return this.attributes;
		},
		
		set: function(attrs) {
		    if (!attrs || this.attributes == attrs) return this;
			this._previousAttributes = this.attributes;
			this.attributes = attrs;
			this.changed = {};
			this.trigger('reset', attrs);
		},
		
		update: function(func, context) {
		    context || (context = this);
			this._previousAttributes = this.attributes;
			var ret = func.call(context, this.attributes);
			this.trigger('change', this.changed);
			return ret;
		},
		
		has: function(func, context) {
		    context || (context = this);
			return func.call(context, this.attributes);
		},
		
		clear: function() {
		    this.attributes = {};
			this.changed = {};
			this._previousAttributes = null;
			this.trigger('clear');
		},
		
		hasChanged: function(attr) {
		    if (attr == null) return !M.isEmpty(this.changed);
            return M.has(this.changed, attr);
		},
		
		changedAttributes: function() {
		    return this.hasChanged() ? M.clone(this.changed) : false;
		},
		
		previous: function() {
		    return M.clone(this._previousAttributes);
		},
		
		save: function() {},
		
		parse: function(func, context) {
		    context || (context = this);
			return func.call(context, this.attributes);
		},
		
		destroy: function() {
		    this.attributes = null;
			this.changed = null;
			this._previousAttributes = null;
			this.trigger('destroy');
		}
		
	});
	
	return Model;
});