/**
 *
 */
define(['Mstar', 'Event', 'jq'], function(M, Event, $) {
    
	var navi = window.navigator,
	    appCache = window.applicationCache,
	    online = navi.onLine ? true : false;
	
	if (online) {
        online = checkOnLine();
	}
	if (online) {
		try {
		    appCache.update();
		} catch(e) {}
	}
	
    function checkOnLine() {
        var ret = true;
        try {
            $.ajax({
            	url: ('http://dev.w.sohu.com/m/a_remind.do?ts=' + new Date()),
            	async: false,
            	error: function() {
            		ret = false;
            	}
            });
        } catch(e) {
            ret = false;
        }
        return ret;
    }

	window.ononline = function() {
	    ApplicationCacheSupport.trigger('online');
		ApplicationCacheSupport.isOnline = true;
	};
	window.onoffline = function() {
	    ApplicationCacheSupport.trigger('offline');
		ApplicationCacheSupport.isOnline = false;
	};
	
	appCache.addEventListener('updateready', function() {
		appCache.swapCache();
		location.reload();
	});
	
	var ApplicationCacheSupport = {
	    
		isOnline: online
		
	};
	
	M.mix(ApplicationCacheSupport, Event);
	
	return (M.ApplicationCacheSupport = ApplicationCacheSupport);
});
