angular.module("liveChat").controller("HeaderController", function($scope, $location) {
	$scope.currentPage = "";

	$scope.setCurrentPage = function() {
		var fullPath = $location.path().slice(1);
		if(fullPath.indexOf("/") != -1) {
			$scope.currentPage = fullPath.slice(0, fullPath.indexOf("/"));
		}else {
			$scope.currentPage = fullPath;
		}
	};
	$scope.setCurrentPage();
});