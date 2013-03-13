/**
 *
 */
define(['Mstar', 'jq', '../Module', '../Model',
        '../View/ListView', '../Controller/ListController'],
function(M, $, Module, Model, ListView, ListController) {
	
    var ListModule = M.factory(Module, {
        
        init: function(options) {
			this.constructor._superClass.call(this, options);
			if (!this.model) {
			    this.model = new Model(options.data);
			}
			if (!this.view) {
				this.view = new ListView({
				    model: this.model
				});
			}
			if (!this.controller) {
				this.controller = new ListController({
				    model: this.model,
					view: this.view,
					scroller: this.options._Controller.scroller,
					_View: this.options._View
				});
			}
        },
        
        destroy: function() {
            this.constructor._super.destroy.call(this);
        }
        
    });
    
	return ListModule;
});