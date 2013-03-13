/**
 *
 */
define(['Mstar', 'jq', '../Module', '../Model/BaseModel', '../View/BodyView', '../Controller/BodyController'],
function(M, $, Module, BaseModel, BodyView, BodyController) {
	
    var TimelineModule = M.factory(Module, {
        
        init: function(options) {
			this.constructor._superClass.call(this, options);
			if (!this.model) {
			    this.model = new BaseModel(options);
			}
			if (!this.view) {
				this.view = new BodyView({
				    model: this.model,
					tplId: 'tpl_body'
				});
			}
			if (!this.controller) {
			    this.controller = new BodyController({
				    model: this.model,
					view: this.view
				});
			}
        },
        
        destroy: function() {
            this.constructor._super.destroy.call(this);
        }
        
    });
    
	return TimelineModule;
});