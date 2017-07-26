var myService = angular.module('myService', []);

myService.service('load', ['$http', function($http) {

	this.getData = function(url, params, callback) {
		$http.get(url, {
			params: params
		}).success(function(data) {

			if (data && data.showapi_res_code==0 && data.showapi_res_body.length != 0) {
				callback(data.showapi_res_body, params);
			} else {
				console.log('Error!');
				console.log(data);
				console.log(url);
				console.log(params);
			}

		})
	}

}]);

myService.service('playlist', function() {
	this.setList = function(list) {
		sessionStorage.setItem('playlist', JSON.stringify(list));
	}
	this.getList = function() {
		return JSON.parse(sessionStorage.getItem('playlist')||'[]');
	}
	this.clearList = function() {
		sessionStorage.removeItem('playlist');
	}
	this.addSong = function(song) {
		var list=this.getList();
		for (var i=0;i<list.length;i++) {
			if (list[i].songid == song.songid) return;
		}
		list.push(song);
		this.setList(list);
	}
	this.removeSong = function(id) {
		var list=this.getList();
		for (var i=0;i<list.length;i++) {
			if (list[i].songid == id) {
				list.splice(i, 1);
				this.setList(list);
				return;
			}
		}
	}
	this.searchSong = function(id) {
		var list=this.getList();
		for (var i=0;i<list.length;i++) {
			if (list[i].songid == id) return list[i];
		}
		return null;
	}
	this.prevSong = function(id, loop) {
		var list=this.getList();
		for (var i=1;i<list.length;i++) {
			if (list[i].songid == id) return list[i-1];
		}
		if (loop && list[0].songid == id) return list[list.length-1];
		return null;
	}
	this.nextSong = function(id, loop) {
		var list=this.getList();
		for (var i=0;i<list.length-1;i++) {
			if (list[i].songid == id) return list[i+1];
		}
		if (loop && list[list.length-1].songid == id) return list[0];
		return null;
	}
})