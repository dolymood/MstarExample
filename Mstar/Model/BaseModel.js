/**
 *
 */
define(['Mstar', '../Model'], function(M, Model) {
    
	var BaseModel = M.factory(Model, {
	    
		init: function(options) {
		    var data = options.data || {};
			this.constructor._superClass.call(this, data);
		}
		
	});
	
	return BaseModel;
});