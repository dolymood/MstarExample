/**
 *
 */
define(['Mstar', 'jq', '../Controller'], function(M, $, Controller) {

    var MoreController = M.factory(Controller, {
	
	    init: function(options) {
		    if (!options.events) {
			    options.events = {
				    
				};
			}
			this.constructor._superClass.call(this, options);
			var that = this;
			this._taped = false;
		    this.view.$el.each(function() {
			    var el = $(this);
				if (el.hasClass('more')) {
				    el.bind('tap', M.bind(that.getMore, that));
				}
			});
		},
		
		getMore: function(e) {
		    if (this._taped) return;
			this._taped = true;
			var model = this.model;
			var data = this.model.getAttr();
			var ele = $(e.target);
			var that = this;
			ele.html('加载中...');
			M.ajax({
				url: ('http://dev.w.sohu.com' + ele.attr('data-moreurl')),
				dataType: 'json',
				local: true,
				success: function(d) {
					ele.attr('data-moreurl', d.data.moreUrl);
					ele.html('加载更多');
					model.update(function() {
						// this -- model
						this.changed = {
							docs: d.data.docs
						};
						this.attributes.docs.push.apply(this.attributes.docs, this.changed.docs);
					});
					that._taped = false;
				}
			});
			
			// this.model
		}
	
	});
	
	return MoreController;
});