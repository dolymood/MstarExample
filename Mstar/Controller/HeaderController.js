/**
 *
 */
define(['Mstar', 'jq', '../Controller'], function(M, $, Controller) {

    var HeaderController = M.factory(Controller, {
	
	    init: function(options) {
		    if (!options.events) {
			    options.events = {
				    'tap .menu': 'showMenu',
					'tap .back': 'back'
				};
			}
			this.constructor._superClass.call(this, options);
			this.view.render();
		},
		
		showMenu: function() {
		    console.log('show menu.');
		},
		
		back: function() {
		    window.history.back();
		}
	
	});
	
	return HeaderController;
});