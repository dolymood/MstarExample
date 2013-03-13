/**
 *
 */
define(['Mstar', 'jq', '../Controller', 
        '../Controller/DelayedImageController', '../Controller/MoreController'],
function(M, $, Controller, DelayedImageController, MoreController) {

    var ListController = M.factory(Controller, {
	
	    init: function(options) {
		    if (!options.events) {
			    options.events = {
				    
				};
			}
			this.constructor._superClass.call(this, options);
			// 加载更多 先绑定事件 后render
			this.view.itemsView.bind('finishRender', M.bind(this.onFinishRender, this));
			this.view.render().$el.appendTo(this.options._View.$el.find('.wrapper'));
			this.moreController = new MoreController({
				view: this.view.moreView,
				model: this.model
			});
			this.delay = new DelayedImageController({
			    view: this.view,
				scroller: this.options.scroller
			});
		},
		
		onFinishRender: function() {
			this.constructor._super.onFinishRender.call(this);
			setTimeout(function(scroller) {
				scroller.refresh();
			}, 100, this.options.scroller);
		}
	
	});
	
	return ListController;
});