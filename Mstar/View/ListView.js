/**
 *
 */
define(['Mstar', '../View', '../View/ItemsView', '../View/MoreView'],
function(M, View, ItemsView, MoreView) {

    var ListView = M.factory(View, {
	    
		init: function(options) {
			options && (options.tplId || (options.tplId = 'tpl_list'));
			View.call(this, options);
			this.moreView = new MoreView({
				model: this.model
			});
			this.itemsView = new ItemsView({
			    model: this.model,
				tplId: this.options.itemsTplId // 配置items View的模版id
			});
		},
		
		render: function() {
		    this.constructor._super.render.call(this);
			this.$el.append(this.moreView.render().$el).find('.list').append(this.itemsView.render().$el);
			return this;
		}
		
	});
	
	return ListView;
});