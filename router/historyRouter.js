class Routers {
	constructor() {
		this.routes = {};
		// 在初始化时监听popstate事件
		this._bindPopState();
	}
	// 初始化路由
	init(path) {
		// history.pushState / history.replaceState 用于在浏览历史中添加历史记录,但是并不触发跳转,此方法接受三个参数，依次为：
		// state:一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
		// title:新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
		// url:新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
		history.replaceState({path: path}, null, path);
		this.routes[path] && this.routes[path]();
	}
	// 将路径和对应回调函数加入hashMap储存
	route(path, callback) {
		this.routes[path] = callback || function() {};
	}
	// 触发路由对应回调
	go(path) {
		history.pushState({path: path}, null, path);
		this.routes[path] && this.routes[path]();
	}
	// 监听popstate事件
	_bindPopState() {
		window.addEventListener('popstate', e => {
			const path = e.state && e.state.path;
			this.routes[path] && this.routes[path]();
		})
	}
}

window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');

function changeBgcolor(color) {
	content.style.backgroundColor = color;	
}

Router.route('/', function(){
	changeBgcolor('yellow');
})
Router.route('/blue', function(){
	changeBgcolor('blue');
})
Router.route('/green', function(){
	changeBgcolor('green');
})

ul.addEventListener('click', e => {
	if(e.target.tagName === 'A'){
		e.preventDefault();
		Router.go(e.target.getAttribute('href'));
	}
})

