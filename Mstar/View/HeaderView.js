/**
 *
 */
define(['Mstar', '../View'], function(M, View) {

    var HeaderView = M.factory(View, {
	    
		init: function(options) {
			options && (options.tplId || (options.tplId = 'tpl_header'));
			View.call(this, options);
		}
		
	});
	
	return HeaderView;
});