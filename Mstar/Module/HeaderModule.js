/**
 *
 */
define(['Mstar', 'jq', '../Module', '../Model', '../View/HeaderView', '../Controller/HeaderController'],
function(M, $, Module, Model, HeaderView, HeaderController) {
	
    var HeaderModule = M.factory(Module, {
        
        init: function(options) {
			this.constructor._superClass.call(this, options);
			if (!this.model) {
			    this.model = new Model(options.data.header);
			}
			if (!this.view) {
				this.view = new HeaderView({
				    model: this.model,
					tplId: 'tpl_header'
				});
			}
			if (!this.controller) {
				this.controller = new HeaderController({
				    view: this.view
				});
			}
        },
        
        destroy: function() {
            this.constructor._super.destroy.call(this);
        }
        
    });
    
	return HeaderModule;
});