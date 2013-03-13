/**
 *
 */
define(['Mstar', 'jq', '../Module', '../Model', '../View/CardView', '../Controller/CardController'],
function(M, $, Module, Model, CardView, CardController) {
	
    var CardModule = M.factory(Module, {
        
        init: function(options) {
			this.constructor._superClass.call(this, options);
			if (!this.model) {
			    this.model = new Model(options.data);
			}
			if (!this.view) {
				this.view = new CardView({
				    model: this.model,
					tplId: 'tpl_card'
				});
			}
			if (!this.controller) {
				this.controller = new CardController({
				    model: this.model,
					view: this.view,
					_View: this.options._View
				});
			}
        },
        
        destroy: function() {
            this.constructor._super.destroy.call(this);
        }
        
    });
    
	return CardModule;
});