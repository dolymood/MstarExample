/**
 *
 */
define(['Mstar', 'Event'], function(M, Event) {
    
	var navi = window.navigator,
	    appCache = window.applicationCache,
	    online = navi.onLine ? true : false;
	
	if (online) {
	    try {
		    appCache.update();
		} catch(e) {
		
		}
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