/**
 *
 */
define(['Mstar', '../View'], function(M, View) {

    var ItemsView = M.factory(View, {
	    
		init: function(options) {
		    options && (options.tplId || (options.tplId = 'tpl_item'));
			View.call(this, options);
		},
		
		render: function(data) {
		    this.constructor._super.render.call(this, data);
			return this;
		},
		
		// 加载更多的时候 也就是model发生更改的时候
		onModelChange: function(changed) {
		    this.render(changed);
		}
		
	});
	
	return ItemsView;
});