/**
 *
 */
define(['Mstar', 'jq', '../Controller'], function(M, $, Controller) {

    var CardController = M.factory(Controller, {
	
	    init: function(options) {
		    if (!options.events) {
			    options.events = {
				    'tap .btnAdded': 'follow',
					'tap .handler': 'handler'
				};
			}
			this.constructor._superClass.call(this, options);
			this.view.render().$el.appendTo(this.options._View.$el.find('.wrapper'));
		},
		
		follow: function() {
		    console.log('follow.');
		},
		
		handler: function() {
		    console.log('handler');
		}
	
	});
	
	return CardController;
});