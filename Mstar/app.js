define([
    'jq',
	'ApplicationCacheSupport',
	'navigator',
	'storage'],
function($, AppSupport, M, storage) {
	
	function getObjectAjaxArgs() {
	    var len = arguments.length, data, tmp;
		if (len > 1) {
			tmp = arguments[0];
			if (M.isString(tmp)) {
				data = arguments[1];
				if (M.isObject(data)) {
					data.url = tmp;
					return data;
				}
			}
		} else if (len == 1 && M.isObject((tmp = arguments[0]))) {
			return tmp;
		}
	}
	if (AppSupport.isOnline) {
	    storage.local.removeAll();
	}
	if (!M.ajax) {
	    var locStorage = storage.local;
		M.ajax = function() {
		    var argsObj = getObjectAjaxArgs.apply(null, arguments);
			if (AppSupport.isOnline) { // 在线
				if (argsObj.local) { // 代表存储到本地
				    var success = argsObj.success;
					argsObj.success = function(data) {
					    try {
						    locStorage.setItem(argsObj.url, JSON.stringify(data));
						} catch(e) {
						    throw 'M.ajax setItem error.'
						}
						success(data);
					};
				}
				$.ajax(argsObj);
			} else {
			    var data;
				try {
				    data = JSON.parse(locStorage.getItem(argsObj.url));
				} catch(e) {
				    data = null;
				}
				if (M.isFunction(argsObj.success) && data !== null) {
				    argsObj.success(data);
				}
			}
		};
	}
	
	M.start();
	M.navigator.start();
});

