/**
 *
 */
define(['Mstar', 'jq'], function(M, $) {
    
	var lStorage = window.localStorage,
	    sStorage = window.sessionStorage,
		db = window.openDatabase;
	
	function supportLocal() {
	    try {
		    lStorage.setItem(M.uuid, '1');
			lStorage.removeItem(M.uuid);
		} catch(e) {
		    if ($.os.ios) {
			    alert('亲，只有关闭您手机上safari的“秘密浏览”才可以正常浏览哦');
			}
			throw 'storage.js : not support localStorage';
		}
		return true;
	}
	supportLocal();
	
	var storage = {
	    
		local: {
		    
			setItem: function(key, val) {
				lStorage.setItem(key, val);
			},
			
			getItem: function(key) {
				lStorage.getItem(key);
			},
			
			removeItem: function(key) {
				lStorage.removeItem(key);
			},
			
			removeAll: function() {
			    var that = this;
				Object.keys(lStorage).forEach(function(key) {
				    that.removeItem(key);
				});
			}
			
		},
		
		session: {
		    
			setItem: function(key, val) {
				sStorage.setItem(key, val);
			},
			
			getItem: function(key) {
				sStorage.getItem(key);
			},
			
			removeItem: function(key) {
				sStorage.removeItem(key);
			},
			
			removeAll: function() {
			    var that = this;
				Object.keys(sStorage).forEach(function(key) {
				    that.removeItem(key);
				});
			}
			
		},
		
		db: {
		    
		}
		
	};
	
	return (M.storage = storage);
});