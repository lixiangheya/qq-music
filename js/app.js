var app = angular.module('myApp', ['ionic', 'myCtrl', 'myService']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('main', {
		templateUrl: 'view/main.html',
		abstract: true
	}).state('main.recom', {
		url: '/recom',
		views: {
			'recom': {
				templateUrl: 'view/main-recom.html',
				controller: 'recomCtrl'
			}
		}
	}).state('main.toplist', {
		url: '/toplist',
		views: {
			'toplist': {
				templateUrl: 'view/main-toplist.html',
				controller: 'toplistCtrl'
			}
		}
	}).state('main.search', {
		url: '/search',
		views: {
			'search': {
				templateUrl: 'view/main-search.html',
				controller: 'searchCtrl'
			}
		}
	}).state('toplistview', {
		url: '/toplistview/:topid',
		templateUrl: 'view/toplistview.html',
		controller: 'toplistviewCtrl'
	}).state('song', {
		cache: false,
		url: '/song/:songid',
		templateUrl: 'view/song.html',
		controller: 'songCtrl'
	});

	$urlRouterProvider.otherwise('/recom');

}]);