/**
 * 
 */
define(['jq', 'Mstar', 'slider', 'FramesConfig', 'storage'],
function($, M, M1, FramesConfig, storage) {
    
	var dirMap = {
	    'left': 'right',
		'right': 'left',
		'up': 'down',
		'down': 'up'
	};
	var hashToBoxMap = {};
	var slide = M.slider.slide;
	var android = $.os.android;
	var loading = $('#loading');
	var box1 = $('#box1');
	
	function createBox(hash) {
	    var box = document.createElement('div');
		box.id = hash.replace(/^#/, '');
		box.className = 'box';
		if (android) {
		    box.style.marginLeft = '-100%';
		} else {
		    box.style.webkitTransform = 'translate3d(-100%, 0, 0)';
		}
		document.body.appendChild(box);
		return box;
	}
	
	function getBox(hash) {
	    var box = hashToBoxMap[hash];
		if (!box) {
		    box = $(createBox(hash));
			hashToBoxMap[hash] = box;
		}
		return box;
	}
	
	function getRequestURL(hash) {
	    return ('http://dev.w.sohu.com/m/' + (hash.replace(/^#\//, 'a_')));
	}

	function request(hash, callback) {
        M.ajax({
		    url: getRequestURL(hash),
			dataType: "json",
			local: true,
			success: function(d) {
				callback(d);
			}
		});
		// setTimeout(function() {
		    // callback(M.clone(tmpData));
		// }, 600);
	}
	
	var header = {
	    showBack: false
	};
	var baseModules = FramesConfig.modules;
	
	function initModules(showBox, hash, headerModule, contentModule) {
	    var frame = FramesConfig[hash.replace(/^#\/(.*?)\.do.*$/, '$1')];
		var headerModules = frame.headerModules;
		var contentModules = frame.contentModules;
		var allDone = [false, false];
		if (headerModules && headerModules.length) {
		    M.require(headerModules, function() {
				allDone[0] = true;
				var args = M.slice.call(arguments);
				args.forEach(function(arg) {
					new arg({
					    model: headerModule.model,
						_View: headerModule.view
						// _Controller: headerModule.controller 暂时不需要
					});
				});
				if (allDone[1]) {
				    showBox.trigger('renderFinish');
				}
			});
		} else {
		    allDone[0] = true;
			if (allDone[1]) {
				showBox.trigger('renderFinish');
			}
		}
		if (contentModules && contentModules.length) {
		    M.require(contentModules, function() {
				allDone[1] = true;
				var args = M.slice.call(arguments);
				args.forEach(function(arg) {
					new arg({
					    model: contentModule.model,
						_View: contentModule.view,
						_Controller: contentModule.controller
					});
				});
				if (allDone[0]) {
				    showBox.trigger('renderFinish');
				}
			});
		} else {
		    allDone[1] = true;
			if (allDone[0]) {
				showBox.trigger('renderFinish');
			}
		}
	}
	
	function navFrame(showBox, hash, data) {
		header.content = hash;
		data.data.header = header;
		hash = hash || '#/fridoc.do';
		M.require(baseModules, function() {
		    var args = M.slice.call(arguments);
			var headerModule = new args[0](data);
			var contentModule = new args[1](data);
			headerModule.view.$el.appendTo(showBox);
			contentModule.view.$el.appendTo(showBox);
			initModules(showBox, hash, headerModule, contentModule);
			setTimeout(function() {
			    data.data.header.showBack = true;
			});
		});
	}
	
	M.router = {
	    
		route: function(hideData, showData, reverse) {
			if (hideData) { // 第一次初始化的时候是没有hideData的
				var hideBox = getBox(hideData.hash);
			}
			var showBox = getBox(showData.hash);
			if (!showBox._hasRendered_) {
			    showBox.bind('renderFinish', function() {
					// android 特殊处理..
					if ($.os.android) {
						slide(showBox, loading);
					} else {
						M.animate(showBox);
						M.animate(loading, {
							x: '-100%'
						});
					}
				});
				slide(loading, (hideBox || box1), reverse ? hideData.dir : showData.dir, reverse);
				request(showData.hash, function(data) {
					navFrame(showBox, showData.hash, data);
				});
				showBox._hasRendered_ = true;
			} else {
			    slide(showBox, (hideBox || box1), reverse ? hideData.dir : showData.dir, reverse);
			}
		}
		
	};
	return M;
});