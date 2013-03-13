/**
 *
 */
define(['Mstar', '../View', '../View/ListView', '../View/MoreView'], function(M, View, ListView, MoreView) {

    var BodyView = M.factory(View, {
	    
		init: function(options) {
		    options && (options.tplId || (options.tplId = 'tpl_body'));
			View.call(this, options);
		}
		
	});
	
	return BodyView;
});