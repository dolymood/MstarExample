/**
 *
 */
define(['Mstar', '../View'], function(M, View) {

    var MoreView = M.factory(View, {
	    
		init: function(options) {
		    options && (options.tplId || (options.tplId = 'tpl_more'));
			View.call(this, options);
		}
		
	});
	
	return MoreView;
});