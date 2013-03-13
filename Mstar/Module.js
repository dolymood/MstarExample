/**
 *
 */
define(['Mstar', 'Model', 'View', 'Controller'], function(M, Model, View, Controller) {
	
    var Module = M.Module = M.factory({
		
        init: function(options) {
            options || (options = {});
			this.mid = M.uniqueId('module');
			var tmp;
			this.constructor.mvc.forEach(function(key) {
			    if ((tmp = options[key])) {
				    this[key] = tmp;
					delete options[key];
				}
			}, this);
			this.options = options;
        },
        
        destroy: function() {
			this.constructor.mvc.forEach(function(key) {
			    this[key] = null;
			}, this);
			this.options = null;
        }
        
    });
	
	Module.mvc = ['model', 'view', 'controller'];
	
	return Module;
});