/**
 *
 */
define(function() {
	// 暂时这样 利用此处的配置信息进行组合的形式来初始化对应的画面信息
	// 不知道效果如何 待测试
	return {
		
		modules: ['Module/HeaderModule', 'Module/BodyModule'], // 基础Module部分[头部分, 下边内容部分]
		
		fridoc: {
		    
			// headerModules: [], // 包含的是此画面需要哪些模块组合加入到header模块中
			
			contentModules: [ // 包含的是此画面需要哪些模块组合加入到body模块中
				'Module/ListModule'
			]
			
		},
		
		profile: {
		    
			contentModules: [
			    'Module/CardModule',
				'Module/ListModule'
			],
			
			frames: [] // 包含的是此画面需要的额外的一些控制 --暂时
		}
		
	};
});