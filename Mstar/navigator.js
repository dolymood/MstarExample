/**
 * 
 */
define(['jq', 'router', 'history'], function($, M) {
    var $body = $(document.body);
	var locn = location;
	var his = M.history;
	var router = M.router;
	
	function orientationChangeHandler() {}
	
	function tapHandler(e) {
	    var target = $(e.target);
		var href = target.attr('data-href') || (target = target.closest('[data-href]')) && target.attr('data-href');
		var hash = '';
		if (href && (hash = href.match(/^#.*$/))) {
			hash = hash[0];
			goTo(hash, target.attr('data-direction') || 'left');
			setHash(hash);
		}
	}
	function parentIfText(node) {
		return 'tagName' in node ? node : node.parentNode
	}
	function touchStartHandler(e) {
		var target = $(parentIfText(e.target));
		
		// touchSelector
		if (target.length && (target.hasClass('btn') || (target = target.closest('.btn')))) {
		    target.addClass('active');
		}
		target.on('touchmove', function() {
			target.removeClass('active');
		});

		target.on('touchend', function() {
			target.removeClass('active');
			target.unbind('touchmove touchend');
		});
	}
	
	function setHash(hash) {
	    locn.hash = '#' + hash.replace(/^#/, '');
	}
	
	function checkBack(hash) {
	    if (hash === '') return true;
		var pre = his.getPrev();
		if (pre && hash === pre.hash) return true;
		return false;
	}
	
	function hashchangeHandler(e) {
		if (locn.hash === his.getActive().hash) {
			return true;
		} else if (checkBack(locn.hash)) {
			goBack();
			return true;
		} else {
			goTo(locn.hash);
		}
	}
	
	function goBack() {
	    if (his.history.length <= 1) {
		    return;
		}
		router.route(his.getActive(), his.getPrev(), true);
		his.activeIndex -= 1;
	}
	
	function goTo(hash, dir) {
	   	var act = his.getActive();
		hash = hash || '#/fridoc.do';
		if (act && hash === act.hash) return;
		if (checkBack(hash)) { // 应该判断假设目的画面是当前画面的上一个的话 是否是执行的返回操作。
		    goBack();
			return;
		}
		var showData;
		var index = his.find(hash);
		if (index !== undefined) { // 已经存在 or ...用his.find来查找确定(是否销毁,现在no)
			showData = his.getInfo(index);
		} else {
		    showData = {
				hash: hash,
				url: hash,
				dir: dir || 'left'
			};
		}
		router.route(his.getActive(), showData);
		his.add(hash, showData);
	}
	
	function initAndroidBox() {
	    if ($.os.android) {
		    // 修改loading的默认状态
			$('#loading').hide().css('margin-left', '-100%').css('-webkit-transform', '');
		}
	}
	
	var navigator = M.navigator = {
	    _start: false,
		start: function() {
		    if (navigator._start) {
			    throw 'navigator has started.';
			}
			$body.bind('click', tapHandler)
			     .bind('orientationchange', orientationChangeHandler)
                 .bind('tap', tapHandler)
                 .bind('touchstart', touchStartHandler)
                 .trigger('orientationchange');
			M.window.bind('hashchange', hashchangeHandler);
			initAndroidBox();
            goTo(locn.hash);
			navigator._start = true;
		}
	};
	
	return M;
});