(function(angular){
	'use strict';
	var batchModule = angular.module('batchModule', []);
	/**
	 * The `batchLog` service allows for messages to be queued in memory and flushed
	 * to the console.log every 50 seconds.
	 *
	 * @param {*} message Message to be logged.
	 */
	 batchModule.factory('batchLog', ['$interval', '$log', function($interval, $log){
	 	var messageQueue = [];

	 	function log(){
	 		if(messageQueue.length){
	 			$log.log('batchLog message: ', messageQueue);
	 			messageQueue =[];
	 		}
	 	};

	 	$interval(log, 500000);
	 	return function(message){
	 		messageQueue.push(message);
	 	};
	 }]);

	 /**
	 * `routeTemplateMonitor` monitors each `$route` change and logs the current
	 * template via the `batchLog` service.
	 */
	 batchModule.factory('routeTemplateMonitor', ['$route', 'batchLog', '$rootScope', function($route, batchLog, $rootScope){
	 	return {
	 		startMonitoring : function(){
	 			$rootScope.$on('$routeChangeSucess', function(){
	 				batchLog($route.current? $route.current.template : null);
	 			});
	 		}
	 	};
	 }]);
})(window.angular);

/*
In the example, note that:

*The batchLog service depends on the built-in $interval and $log services.
*The routeTemplateMonitor service depends on the built-in $route service and our custom batchLog service.
*Both services use the array notation to declare their dependencies.
*The order of identifiers in the array is the same as the order of argument names in the factory function.

*/