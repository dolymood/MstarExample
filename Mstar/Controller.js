/**
 *
 */
define(['Mstar', 'Model', 'View'], function(M, Model, View) {
    
	var ADD_TO_THIS = ['model', 'view', 'events'];
	var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    
    function bindSysEvents() {
        var view = this.view;
        if (view && view instanceof View) {
            view.bind('beforeRender', M.bind(this.onBeforeRender, this));
			view.bind('finishRender', M.bind(this.onFinishRender, this));
        }
    }
    
    function checkViewEle() {
        var view = this.view, el;
        if (!view) return false;
        el = view.$el;
        if (!el || !el.length) return false;
        return el;
    }
	
	var Controller = M.Controller = M.factory({
	    
		Implements: M.Event,
		
		init: function(options) {
		    options || (options = {}); 
			this.mid = M.uniqueId('controller');
			var tmp;
			ADD_TO_THIS.forEach(function(key) {
			    if ((tmp = options[key])) {
				    this[key] = tmp;
					delete options[key];
				}
			}, this);
			this.options = options;
			this.delegateEvents();
            bindSysEvents.call(this);
		},
		
		delegateEvents: function(events) {
		    if (!(events || (events = this.events))) return this;
            this.undelegateEvents();
            var el, key, method, match, eventName, selector;
            if (!(el = checkViewEle.call(this))) return this;
            for (key in events) {
                method = events[key];
                if (!M.isFunction(method)) method = this[events[key]];
                if (!method) throw new Error('Method "' + events[key] + '" does not exist');
                match = key.match(delegateEventSplitter);
                eventName = match[1], selector = match[2];
                method = M.bind(method, this);
                eventName += '.delegateEvents' + this.mid;
                if (selector === '') {
                    el.on(eventName, method);
                } else {
                    el.on(eventName, selector, method);
                }
              }
            return this;
		},
		
		undelegateEvents: function() {
            var el;
            if (!(el = checkViewEle.call(this))) return this;
            el.off('.delegateEvents' + this.mid);
            return this;
		},
		
        onBeforeRender: function() {
            this.undelegateEvents();
        },
		
		onFinishRender: function() {
		    this.delegateEvents();
		}
		
	});
	
	return Controller;
});