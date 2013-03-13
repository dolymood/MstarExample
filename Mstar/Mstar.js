(function($) {
    
	var Mstar = Mstar || {},
        win = this;
	    DOC = win.document,
		html = DOC.documentElement,
		head = DOC.head || DOC.getElementsByTagName("head")[0],
		hasOwnProperty = Mstar.hasOwnProperty,
		ArrayProto = Array.prototype,
        nativeForEach = ArrayProto.forEach,
		slice = ArrayProto.slice,
		toStr = Mstar.toString,
		loadings = [],
		parsings = [],
		cbi = 1e5,
		basePath = '';
	
	if (!$) throw '$ is not defined.';
	
	function hideAddressBar() {
	    var screenH = win.screen.height;
		var body = DOC.body;
		if ($.os.ios) {
		    if (win.navigator.standalone) {
			    body.style.height = screenH - 20 + 'px';
			} else {
			    body.style.height = screenH - 65 + 'px';
			}
		} else { // android
		    
		}
		body.addEventListener('touchmove', function(e) {
			e.preventDefault();
		});
		var scrollHandler = function() {
		     win.scrollTo(0, 1);
			 setTimeout(scrollHandler, 2000);
		};
		setTimeout(scrollHandler, 500);
	}
	
	Mstar.window = $(win);
	Mstar.slice = slice;
	
	Mstar.start = function() {
	    if (Mstar._start) throw 'Mstar started.';
		Mstar._start = true;
		hideAddressBar();
	};
	
	Mstar.rword = /[^, ]+/g;
	
	Mstar.uniqueId = function(prefix) {
	    var idCounter = 0;
		return function(prefix) {
		    var id = idCounter++;
            return prefix ? prefix + id : id;
		};
	}();
	// GUID生成器
	Mstar.guid = function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		}).toUpperCase();
	};
	
	Mstar.uuid = function() {
	    return ('mstar_') + (+new Date()) + (Math.random() + '').slice(-8);
	}();
	
	// 根据某个对象得到其唯一对应的id，一般用于映射信息
	Mstar.getUid = function() {
	    var __UID__ = 1;
		var uuid = Mstar.uuid;
		return function(obj) {
			return obj[uuid] || (obj[uuid] = __UID__++);
		};
	}();
	
	Mstar.clone = function(obj) {
	    if (!Mstar.isObject(obj)) return obj;
		return Mstar.isArray(obj) ? obj.slice() : Mstar.mix({}, obj);
	};
	
	Mstar.once = function(func) {
	    var raned = false, ret;
		return function() {
		    if (raned) return ret;
			raned = true;
			return ret = func.apply(this, arguments);
		};
	};
	
	Mstar.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };
	
    Mstar.mix = function(target, source) {
        var args = Array.apply([], arguments),
            override = typeof args[args.length - 1] == 'boolean' ? args.pop() : true,
            has = Mstar.has,
            i = 1, key;
        while((source = args[i++])) {
            for (key in source) {
                if (has(source, key) && (override || !(key in target))) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
	
	Mstar.each = Mstar.forEach = function(obj, iterator, context) {
        if (obj == null) return;
		var has = Mstar.has;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === false) return;
            }
        } else {
            for (var key in obj) {
                if (has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === false) return;
                }
            }
        }
    };
	
    Mstar.oneObject = function(array, val) {
        if (typeof array == 'string') {
            array = array.match(Mstar.rword) || [];
        }
        var result = {},
            value = val !== void 0 ? val : 1,
            i = 0,
            len = array.length;
        for (; i < len; i++) {
            result[array[i]] = value;
        }
        return result;
    };
	
	Mstar.isObject = function(obj) {
	    return obj === Object(obj);
	};
	
    Mstar.isFunction = function(o) {
        return toStr.call(o) === '[object Function]';
    };
    
	Mstar.isArray = Array.isArray || function(ary) {
	    return Mstar.type(ary, 'Array');
	};
	
	Mstar.isDefined = function(o) {
	    return typeof o != 'undefined';
	};

	Mstar.isString = function(o) {
	    return typeof o == 'string';
	};
	
	Mstar.isNumber = function(o) {
	    return typeof o == 'number' && isFinite(o);
	};
	
	Mstar.isEmpty = function(obj) {
	    if (obj == null) return true;
		if (Mstar.isArray(obj) || Mstar.isString(obj)) return obj.length === 0;
		var has = Mstar.has;
		for (var key in obj) if (has(obj, key)) return false;
		return true;
	};
	
	Mstar.getURLHash = function(url) {
	    var hash;
		var rhash = /^.*?#(.+$)/;
		hash = url.match(rhash);
		if (hash && hash.length >= 2) {
		    return '#' + hash[1];
		}
		return '';
	};
	
	Mstar.type = function(obj, name) {
	    if (name) {
		    return toStr.call(obj) === ('[object ' + name + ']');
		}
		return toStr.call(obj).slice(8, -1);
	};
	
	Mstar.toArray = function(aryLike) {
	    return slice.call(aryLike);
	};
	
    Mstar.bind = function(func, context) {
        context = context || win;
        if (Mstar.isFunction(func)) {
            return function() {
                func.apply(context, arguments);
            };
        }
    };
    
    Mstar.noop = function() {};
    
	Mstar.head = head;
	Mstar.html = html;
	
	/***********************开始模块加载部分***********************/
	
	(function(scripts) {
        var cur = scripts[scripts.length - 1],
            url = (cur.hasAttribute ? cur.src : cur.getAttribute('src', 4)).replace(/[?#].*/, '');
        basepath = url.slice(0, url.lastIndexOf('/') + 1);
    })(DOC.getElementsByTagName('script'));
	
	var modules = Mstar.modules = {
		'Mstar': {
			state: 2,
			exports: Mstar
		},
		'jq': {
		    state: 2,
			exports: $
		}
	};
	
	function parseURL(url, parent, ret) {
		if (/^(Mstar|jq)$/.test(url)) { //特别处理Mstar,jq标识符
            return [url, 'js'];
        }
		parent = parent.substr(0, parent.lastIndexOf('/'));
		if (/^(\w+)(\d)?:.*/.test(url)) { //如果用户路径包含协议
			ret = url;
		} else {
			var tmp = url.charAt(0);
			if (tmp !== '.' && tmp !== '/') { //相对于根路径
				ret = basepath + url;
			} else if (url.slice(0, 2) === './') { //相对于兄弟路径
				ret = parent + url.slice(1);
			} else if (url.slice(0, 2) === '..') { //相对于父路径
				var arr = parent.replace(/\/$/, '').split('/');
				tmp = url.replace(/\.\.\//g, function() {
					arr.pop();
					return '';
				});
				ret = arr.join('/') + '/' + tmp;
			} else if (tmp === '/') {
				ret = parent + url;
			} else {
				throw '不符合模块标识规则: ' + url;
			}
		}
        var ext = 'js';
        tmp = ret.replace(/[?#].*/, '');
        if (/\.(css|js)$/.test(tmp)) { // 处理"http://113.93.55.202/mass.draggable"的情况
            ext = RegExp.$1;
        }
        if (ext !== 'css' && tmp === ret && !/\.js$/.test(ret)) { //如果没有后缀名会补上.js
            ret += '.js';
        }
        return [ret, ext];
    }

    function getCurrentScript() {
        //取得正在解析的script节点
        if (DOC.currentScript) { //firefox 4+
            return DOC.currentScript.src;
        }
        // 参考 https://github.com/samyk/jiagra/blob/master/jiagra.js
        var stack;
        try {
            a.b.c(); //强制报错,以便捕获e.stack
        } catch (e) { //safari的错误对象只有line,sourceId,sourceURL
            stack = e.stack;
            if (!stack && window.opera) {
                //opera 9没有e.stack,但有e.Backtrace,但不能直接取得,需要对e对象转字符串进行抽取
                stack = (String(e).match(/of linked script \S+/g) || []).join(' ');
            }
        }
        if (stack) {
            stack = stack.split(/[@ ]/g).pop(); //取得最后一行,最后一个空格或@之后的部分
            stack = stack[0] === '(' ? stack.slice(1, -1) : stack;
            return stack.replace(/(:\d+)?:\d+$/i, ''); //去掉行号与或许存在的出错字符起始位置
        }
        var nodes = head.getElementsByTagName('script'); //只在head标签中寻找
        for (var i = 0, node; node = nodes[i++]; ) {
            if (node.className === moduleClass && node.readyState === 'interactive') {
                return node.className = node.src;
            }
        }
    }

    function checkCycle(deps, nick) {
        //检测是否存在循环依赖
        for (var id in deps) {
            if (deps[id] === 'sohuMstar' && modules[id].state !== 2 && (id === nick || checkCycle(modules[id].deps, nick))) {
                return true;
            }
        }
    }

    function checkDeps() {
        var has = Mstar.has;
		//检测此JS模块的依赖是否都已安装完毕,是则安装自身
        loop: for (var i = loadings.length, id; id = loadings[--i]; ) {
            var obj = modules[id],
                deps = obj.deps;
            for (var key in deps) {
                if (has(deps, key) && modules[key].state !== 2) {
                    continue loop;
                }
            }
            //如果deps是空对象或者其依赖的模块的状态都是2
            if (obj.state !== 2) {
                loadings.splice(i, 1); //必须先移除再安装，防止在IE下DOM树建完后手动刷新页面，会多次执行它
                fireFactory(obj.id, obj.args, obj.factory);
                checkDeps();
            }
        }
    }

    function checkFail(node, error) {
        //检测是否死链
        var id = node.src;
        node.onload = node.onreadystatechange = node.onerror = null;
        if (error || !modules[id].state) {
            setTimeout(function() {
                head.removeChild(node);
            });
            throw '加载 ' + id + ' 失败' + error + ' ' + (!modules[id].state);
        } else {
            return true;
        }
    }
	
    var moduleClass = 'Mstar' + (new Date - 0);
    function loadJS(url) {
        //通过script节点加载目标模块
        var node = DOC.createElement('script');
        node.className = moduleClass; //让getCurrentScript只处理类名为moduleClass的script节点
        node.onload = function() {
			var factory = parsings.pop();
			factory && factory.delay(node.src);
			if (checkFail(node)) {
				
			}
        };
        node.onerror = function() {
            checkFail(node, true);
        };
        node.src = url;
        head.insertBefore(node, head.firstChild);
    }

    function loadCSS(url) {
        //通过link节点加载模块需要的CSS文件
        var id = url.replace(rmakeid, '');
        if (!DOC.getElementById(id)) {
            var node = DOC.createElement('link');
            node.rel = 'stylesheet';
            node.href = url;
            node.id = id;
            head.insertBefore(node, head.firstChild);
        }
    }
	
	function fireFactory(id, deps, factory) {
        for (var i = 0, array = [], d; d = deps[i++]; ) {
            array.push(modules[d].exports);
        }
        var module = Object(modules[id]),
            ret = factory.apply(win, array);
        module.state = 2;
        if (ret !== void 0) {
            modules[id].exports = ret;
        }
        return ret;
    }
	
	win.define = Mstar.define = function(id, deps, factory) {
	    var args = slice.call(arguments);
        if (typeof id === 'string') {
            var _id = args.shift();
        }
        if (typeof args[0] === 'boolean') { //用于文件合并, 在标准浏览器中跳过补丁模块
            if (args[0]) {
                return;
            }
            args.shift();
        }
        if (typeof args[0] === 'function') {
            args.unshift([]);
        }
		//上线合并后能直接得到模块ID,否则寻找当前正在解析中的script节点的src作为模块ID
        //现在除了safari外，我们都能直接通过getCurrentScript一步到位得到当前执行的script节点，safari可通过onload+delay闭包组合解决
        id = modules[id] && modules[id].state >= 1 ? _id : getCurrentScript();
        factory = args[1];
        factory.id = _id; //用于调试
        factory.delay = function(id) {
            args.push(id);
            if (checkCycle(modules[id].deps, id)) {
                throw id + '模块与之前的某些模块存在循环依赖';
            }
            delete factory.delay; //释放内存
            require.apply(null, args); //0,1,2 --> 1,2,0
        };
        if (id) {
            factory.delay(id, args);
        } else { //先进先出
            parsings.push(factory);
        }
	};
	win.require = Mstar.require = function(list, factory, parent) {
	    // 用于检测它的依赖是否都为2
        var deps = {},
			// 用于依赖列表中的模块的返回值
			args = [],
			// 需要安装的模块数
			dn = 0,
			// 已安装完的模块数
			cn = 0,
			id = parent || 'cb' + (cbi++).toString(32);
        parent = parent || basepath;
        String(list).replace(Mstar.rword, function(el) {
            var array = parseURL(el, parent),
				url = array[0];
            if (array[1] === 'js') {
                dn++;
                if (!modules[url]) {
                    modules[url] = {
                        id: url,
                        parent: parent,
                        exports: {}
                    };
                    loadJS(url);
                } else if (modules[url].state === 2) {
                    cn++;
                }
                if (!deps[url]) {
                    args.push(url);
                    deps[url] = 'sohuMstar'; //去重
                }
            } else if (array[1] === 'css') {
                loadCSS(url);
            }
        }); 
        //创建或更新模块的状态
        modules[id] = {
            id: id,
            factory: factory,
            deps: deps,
            args: args,
            state: 1
        };
        if (dn === cn) { //如果需要安装的等于已安装好的
            fireFactory(id, args, factory); //装配到框架中
            return checkDeps();
        }
        //在正常情况下模块只能通过checkDeps执行
        loadings.unshift(id);
	};
	
	/***********************结束模块加载部分***********************/
	
	Mstar.factory = (function(Mstar) {
        var F = function() {},
            mix = Mstar.mix,
            isArray = Array.isArray,
            unextend = Mstar.oneObject(['_super', '_superClass', 'extend', 'implement', 'prototype']),
            Class = function(o) {
                if (!(this instanceof Class) && Mstar.isFunction(o)) {
                    return classify(o);
                }
            };
        function classify(cls) {
            cls.extend || (cls.extend = Class.extend);
            cls.implement || (cls.implement = Class.implement);
            return cls;
        }
        // 提供两种方式(继承父类ParentClass)：
        // Class.create(ParentClass, {...});
        // Class.create({
        //     Extends: ParentClass，
        //     Implements: OthersClass//从其他类（数组或者单个类）中混入属性
        // });
        Class.create = function(P, properties) {
            var C, init;
            if (!Mstar.isFunction(P)) {
                properties = P;
                P = null;
            }
            properties || (properties = {});
            P || (P = properties.Extends || Class);
            init = properties.init;
            delete properties.Extends;
            delete properties.init;
            C = Mstar.isFunction(init) ?
                init :
                function() { P.apply(this, arguments); };
            inherit(C, P, properties);
            return classify(C);
        };

        // 为一个普通的函数cls添加两个方法，
        // 使得使其具有使用Class.create创建的类对象相同的能力
        function classify(cls) {
            cls.extend || (cls.extend = Class.extend);
            cls.implement || (cls.implement = implement);
            return cls;
        }
        // 给类的prototype动态添加成员（不能包含Extends ？）
        function implement(properties) {
            var mutators = Mstar.mutators,
                proto = this.prototype;
            Mstar.each(properties, function(val, key, properties) {
                if (Mstar.has(mutators, key)) {
                    mutators[key].call(this, val);
                    delete properties[key];
                } else {
                    proto[key] = val;
                }
            }, this);
        }
        // 创建子类的快捷方式 直接调用extend即可
        Class.extend = function(properties) {
            properties.Extends = this;
            return Class.create(properties);
        }

        function inherit(C, P, properties) {
            var key;
            F.prototype = P.prototype;
            C.prototype = new F;//添加原型方法
            //复制父类的静态成员
            for (key in P) {
                if (Mstar.has(P, key) && !unextend[key]) {
                    C[key] = P[key];
                }
            }
            C._super = P.prototype;//重新指定_super方便调用
            C._superClass = P;
            implement.call(C, properties);
            C.prototype.constructor = C;//修正constructor
        }

        Mstar.mutators = {
            // 从items这些类中混入属性
            'Implements': function(items) {
                var proto = this.prototype;
                isArray(items) || (items = [items]);
                items.forEach(function(item) {
                    Mstar.mix(proto, item.prototype || item);
                });
            }
        };
        return Class.create;
    })(Mstar);
	
	win.M = win.Mstar = Mstar;
})($);