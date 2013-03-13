/**
 *
 */
define(['Mstar', '../View'], function(M, View) {

    var CardView = M.factory(View, {
	    
		init: function(options) {
			options && (options.tplId || (options.tplId = 'tpl_card'));
			View.call(this, options);
		}
		
	});
	
	return CardView;
});