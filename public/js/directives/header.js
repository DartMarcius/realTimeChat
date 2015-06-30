angular.module("liveChat").directive("siteHeader", function() {
	return {
		restrict: "E",
		templateUrl: "views/templates/directives/header.html",
		controller: "HeaderController",
		controllerAs: "header"
	}
});