/**
 * 
 */
define(['Mstar'], function(M) {
	
	var his = M.history = {
	    
		history: [],
		activeIndex: 0,
		
		getActive: function() {
		    return this.history[this.activeIndex];
		},
		
		getNext: function() {
		    return this.history[this.activeIndex + 1];
		},
		
		getPrev: function() {
			return this.history[this.activeIndex - 1];
		},
		
		clearForward: function() {
		    this.history = this.history.slice( 0, this.activeIndex + 1 );  
		},
		
		find: function(hash, stack) {
		    for (var i = 0, his = (stack || this.history), len = his.length, tmp; i < len; i++) {
			    tmp = his[i];
				if (decodeURIComponent(hash) === decodeURIComponent(tmp.hash) ||
				    decodeURIComponent(hash) === decodeURIComponent(tmp.url)) {
				    return i;
				}
			}
			return;
		},
		
		getInfo: function(index) {
		    return this.history[index];
		},
		
		add: function(url, data) {
		    data = data || {};
			if (this.getNext()) {
				this.clearForward();
			}
			if (data.hash && data.hash.indexOf('#') === -1) {
				data.hash = '#' + data.hash;
			}

			data.url = url;
			this.history.push(data);
			this.activeIndex = this.history.length - 1;
		}
	};
	
	return M;
});