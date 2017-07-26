var myCtrl = angular.module('myCtrl', []);

myCtrl.controller('recomCtrl', ['$scope', 'load', function($scope, load){
	$scope.picSlider = [
		'img/T003R720x288M0000009DE8x2fTDuA.jpg',
		'img/T003R720x288M000001k51P90qEY57.jpg',
		'img/T003R720x288M000003Ckh8U0EKoqq.jpg',
		'img/T003R720x288M000002MFArM0QR01e.jpg',
		'img/T003R720x288M000001yilIW4Cq3ks.jpg'
	];
	$scope.radiolist = [
		{
			tlt: '热歌',
			img: 'img/track_radio_199_13_1.jpg'
		},
		{
			tlt: '一人一首招牌歌',
			img: 'img/track_radio_307_13_1.jpg'
		}
	];
	$scope.hotlist = [
		{
			tlt: '听有故事的歌 尝姚若龙笔下的悲欢离合',
			txt: '霜泧',
			hot: '77.9万',
			img: 'img/300.jpg'
		},
		{
			tlt: 'B-BOX狂魔：我一个人就是一支乐队',
			txt: '小叮当',
			hot: '17.6万',
			img: 'img/301.jpg'
		},
		{
			tlt: '韩语/拥抱了整个冬天',
			txt: '孩童🍃',
			hot: '15.7万',
			img: 'img/302.jpg'
		},
		{
			tlt: '【新灵魂乐】情歌，唱给你一人听',
			txt: 'L 。',
			hot: '12.8万',
			img: 'img/303.jpg'
		},
		{
			tlt: '中东神韵：30首阿拉伯风情歌曲合辑',
			txt: '焦糖玛奇朵',
			hot: '1.6万',
			img: 'img/304.jpg'
		},
		{
			tlt: '给最挑剔的你，纯正的意大利风~',
			txt: '取个与音乐有关的名字',
			hot: '3.4万',
			img: 'img/305.jpg'
		},

	];
}]);

myCtrl.controller('toplistCtrl', ['$scope', 'load', '$state', function($scope, load, $state){
	var idArr = {
		'3' : {
			index: '2',
			listname: '巅峰榜·欧美',
			hot: '1900.0万',
			cover: 'img/toplist_3.jpg'
		},
		'5' : {
			index: '3',
			listname: '巅峰榜·内地',
			hot: '1804.0万',
			cover: 'img/toplist_5.jpg'
		},
		'6' : {
			index: '4',
			listname: '巅峰榜·港台',
			hot: '1690.0万',
			cover: 'img/toplist_6.jpg'
		},
		'16': {
			index: '5',
			listname: '巅峰榜·韩国',
			hot: '1500.0万',
			cover: 'img/toplist_16.jpg'
		},
		'17': {
			index: '6',
			listname: '巅峰榜·日本',
			hot: '1210.0万',
			cover: 'img/toplist_17.jpg'
		},
		'18': {
			index: '7',
			listname: '巅峰榜·民谣',
			hot: '901.2万'
		},
		'19': {
			index: '8',
			listname: '巅峰榜·摇滚',
			hot: '1314.5万'
		},
		'23': {
			index: '9',
			listname: '巅峰榜·销量',
			hot: '1355.0万'
		},
		'26': {
			index: '1',
			listname: '巅峰榜·热歌',
			hot: '1901.2万',
			cover: 'img/toplist_26.jpg'
		}
	};
	$scope.datalist = [];
	$scope.order = 'index';
	for (var i in idArr) {
		load.getData('http://route.showapi.com/213-4', {
			showapi_appid: '26444',
			showapi_sign: 'e6ed68d43d734b78892a649fedd90cbe',
			topid: i
		},function(data, params){
			var obj = data.pagebean;
			obj.topid = params.topid;
			obj.index = idArr[params.topid].index;
			obj.listname = idArr[params.topid].listname;
			obj.hot = idArr[params.topid].hot;
			obj.cover = idArr[params.topid].cover || obj.songlist[0].albumpic_small
			$scope.datalist.push(obj);
		});
	}

	$scope.gotoList = function(topid){
		$state.go('toplistview', {topid: topid});
	}
}]);

myCtrl.controller('searchCtrl', ['$scope', 'load', '$state', function($scope, load, $state){
	$scope.search = {
		text: ''
	};
	$scope.results = {};
	$scope.isCancel = false;
	$scope.listOpen = false;
	$scope.keywordArr = [
		{key: '张杰', hot: 'true'},
		{key: '全世界都在说东北话'},
		{key: '顺流而下 张靓颖'},
		{key: '啷个哩个啷 鹏泊'},
		{key: '时间裂缝 李易峰'},
		{key: '国王与乞丐'},
		{key: '放弃我 抓紧我'},
		{key: '你还要我怎样'},
		{key: '太阳的后裔'}
	];

	$scope.searchFocus = function() {
		$scope.isCancel = true;
	};
	$scope.delClick = function() {
		$scope.search.text = '';
	};
	$scope.cancelClick = function() {
		$scope.search.text = ''
		$scope.isCancel = false;
		$scope.listOpen = false;
	};
	$scope.keywordClick = function(text) {
		$scope.search.text = text;
		$scope.toSearch();
	};
	$scope.isDel = function() {
		return ($scope.search.text != '');
	};
	$scope.toSearch = function() {
		if ($scope.search.text.trim() == '') return;
		load.getData('http://route.showapi.com/213-1', {
			showapi_appid: '26444',
			showapi_sign: 'e6ed68d43d734b78892a649fedd90cbe',
			keyword: $scope.search.text.trim()
		},function(data){
			$scope.results = data.pagebean;
			$scope.listOpen = true;
		});
	};


	$scope.play = function(song) {
		playlist.addSong(song);
		$state.go('song',{songid: song.songid})
	}
}]);

myCtrl.controller('toplistviewCtrl', ['$scope', 'load', '$stateParams', '$state', 'playlist', function($scope, load, $stateParams, $state, playlist){
	var idArr = {
		'3' : '巅峰榜·欧美',
		'5' : '巅峰榜·内地',
		'6' : '巅峰榜·港台',
		'16': '巅峰榜·韩国',
		'17': '巅峰榜·日本',
		'18': '巅峰榜·民谣',
		'19': '巅峰榜·摇滚',
		'23': '巅峰榜·销量',
		'26': '巅峰榜·热歌'
	};
	$scope.headimg = {'background-image':'none'};
	$scope.color = '#000000';
	load.getData('http://route.showapi.com/213-4', {
		showapi_appid: '26444',
		showapi_sign: 'e6ed68d43d734b78892a649fedd90cbe',
		topid: $stateParams.topid
	},function(data, params){
		data.pagebean.listname = idArr[params.topid];
		$scope.listdata = data.pagebean;
		$scope.headimg = {
			'background-image': 'url(' + $scope.listdata.songlist[0].albumpic_big + ')'
		};
		$scope.color = '#'+($scope.listdata.color+16777216).toString(16).substring(1);//防止color位数不足6位
	});


	$scope.play = function(song) {
		playlist.addSong(song);
		$state.go('song',{songid: song.songid})
	}
}])

myCtrl.controller('songCtrl', ['$scope', 'load', '$state', '$stateParams', '$sce', '$ionicScrollDelegate', 'playlist', '$rootScope', function($scope, load, $state, $stateParams, $sce, $ionicScrollDelegate, playlist, $rootScope){
	$scope.song = playlist.searchSong($stateParams.songid);
	$scope.songurl = $sce.trustAsResourceUrl($scope.song.url||$scope.song.m4a);
	$scope.songbg = {
		'background-image': 'url(' + $scope.song.albumpic_big + ')'
	}

	//播放器控制部分
	var player = document.getElementById('player');
	$scope.currentTime = {
		num: function(){
			return player.currentTime||0;
		},
		format: format
	};
	$scope.duration = {
		num: function(){
			return player.duration||0;
		},
		format: format
	};
	$scope.progress = 0;
	function format() {
		var time = Math.floor(this.num());
		var min=Math.floor(time/60);
		var sec=time%60;
		sec=sec<10?'0'+sec:sec;
		return min+':'+sec;
	}
	// player.oncanplay = function() {
	// 	$scope.duration.num = player.duration;
	// }
	player.ontimeupdate = function() {
		// $scope.currentTime.num = player.currentTime;
		$scope.progress = player.currentTime / player.duration *100;
		console.log(player);
		var currentIndex = 0;
		for (var i in $scope.lyricArr) {
			if ($scope.lyricArr[i][0]<=player.currentTime) currentIndex = i
				else break;
		}
		$scope.currentIndex = currentIndex;
		$ionicScrollDelegate.$getByHandle('lyricPage').scrollTo(0, (currentIndex-2)*41, true)
		$scope.$apply();
	}
	$scope.isPaused = function() {
		return player.paused;
	}
	$scope.playOrPause = function() {
		player.paused?player.play():player.pause();
	}
	$scope.change = function() {
		player.currentTime = $scope.progress/100 * player.duration;
	}

	player.onended = function() {
		$state.go('song',{songid: playlist.nextSong($stateParams.songid, true).songid});
	}

	//初始化歌词
	$scope.lyricArr = [];
	load.getData('http://route.showapi.com/213-2', {
		showapi_appid: '26444',
		showapi_sign: 'e6ed68d43d734b78892a649fedd90cbe',
		musicid: $stateParams.songid
	},function(data, params){
		var lyricArr = data.lyric.replace(/&#\d+;/g,function(char){
			return String.fromCharCode(char.substring(2,char.length-1));
		}).split('\n');
		for (var i in lyricArr) {
			lyricArr[i] = lyricArr[i].split(']');
			lyricArr[i][0] = lyricArr[i][0].substring(1).split(':');
			lyricArr[i][0] = lyricArr[i][0][0]*60 + lyricArr[i][0][1]*1;
			if (!isNaN(lyricArr[i][0])) $scope.lyricArr.push(lyricArr[i]);
		}
	})
}])