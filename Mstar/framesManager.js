/**
 *
 */
define(['Mstar', 'jq', 'history'], function(M, $) {
    
	var his = M.history;
	
	function handlerHisChange() {
	    var nextHis = his.getNext();
		var preHis = his.getPrev();
		// 策略是向前保存1个 向后保存2个
		// 销毁的需要destroy掉
	    // todo...
		if (preHis && nextHis) {
		    
		} else {
		    
		}
	}
	
	var hisManager = M.hisManager = {
	    
		_started: false,
		
		start: function() {
		    if (this._started) throw 'framesManager has started.';
			his.bind('hischange', handlerHisChange);
		}
		
	};
	
	return hisManager;
});