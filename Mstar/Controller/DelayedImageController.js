/**
 *
 */
define(['Mstar', 'jq', '../Controller'], function(M, $, Controller) {
    
	var screenHeight = window.screen.height;
	
	var DelayedImageController = M.factory({
	    
		Extends: Controller,
		
		init: function(options) {
		    this.constructor._superClass.call(this, options);
			this.refindImages();
			this.shouldLoad = true;
			this.lastTime = Date.now();
			// 加载更多 先绑定事件
			this.view.itemsView.bind('finishRender', M.bind(this.refindImages, this));
			setTimeout(function(that) {
			    that.handlerScrollEnd();
			}, 10, this);
			this.bindDelay();
		},
		
		bindDelay: function() {
			this.options.scroller.options.onBeforeScrollMove = M.bind(this.handlerBeforeScrollMove, this);
			this.options.scroller.options.onScrollEnd = M.bind(this.handlerScrollEnd, this);
		},
		
		handlerBeforeScrollMove: function() {
		    var now = Date.now(), lastTime = this.lastTime;
			if (this.timeout) clearTimeout(this.timeout);
			if ((now - lastTime) < 300) {
			    this.shouldLoad = false;
			} else {
			    this.shouldLoad = true;
			}
			this.lastTime = now;
		},
		
		handlerScrollEnd: function() {
			this.lastTime = Date.now();
			if (this.shouldLoad) {
				this.getViewportImages().forEach(function(img) {
					this.loadImage(img);
				}, this);
				this.refindImages();
			} else {
			    if (this.timeout) clearTimeout(this.timeout);
				this.timeout = setTimeout(function(that) {
				    that.shouldLoad = true;
					that.handlerScrollEnd();
				}, 200, this);
			}
		},
		
		refindImages: function() {
		    this.delayImgs = this.view.$el.find('.media[data-delay]');
		},
		
		getViewportImages: function() {
			var keyV = screenHeight + 200,
			    delayImgs = this.delayImgs,
				i = 0,
				loadingImgs = [],
				len = delayImgs.length, img;
			for (i = 0; i < len; i++) {
			    img = delayImgs[i];
				var top = img.getBoundingClientRect().top;
				if (top > keyV) { // 此时的img已经是在视口一下了
				    break;
				}
				if (top > -200 && top <= screenHeight) {
				    loadingImgs.push(img);
				}
			}
			return loadingImgs;
		},
		
		loadImage: function(img) {
			var ig = new Image();
			img = $(img);
			var src = img.attr('data-delay');
			img.html('加载中...');
			ig.onload = function() {
				img.addClass('opy').html('');
				setTimeout(function() {
					img.css('background-image', 'url(' + src + ')');
					setTimeout(function() {
					    img.addClass('opyShow');
					}, 100);
				}, 100);
				// img.style.cssText = ('background-image: url(' + src +
				                     // '); height: ' + img.height + 'px; line-height: ' + img.height + ';');
			};
			ig.onerror = function() {
				img.html('加载失败');
			};
			ig.src = src;
			img.removeAttr('data-delay', '');
		},
		
		destroy: function() {
		    this.delayImgs = null;
			this.loadingImgs = null;
			this.constructor._super.destroy.call(this);
		}
		
	});
	
	return DelayedImageController;
});