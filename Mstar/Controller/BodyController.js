/**
 *
 */
define(['Mstar', 'jq', '../Controller'],
function(M, $, Controller) {

    var TimelineController = M.factory(Controller, {
	
	    init: function(options) {
		    if (!options.events) {
			    options.events = {
				    
				};
			}
			this.constructor._superClass.call(this, options);
			this.view.render();
		},
		
		onFinishRender: function() {
			this.constructor._super.onFinishRender.call(this);
			if (!this.scroller) {
			    this.scroller = new iScroll(this.view.$el[0], {useTransition: true});
			} else {
			    setTimeout(function(scroller) {
				    scroller.refresh();
				}, 100, this.scroller);
			}
		}
	
	});
	
	return TimelineController;
});