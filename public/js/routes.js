angular.module("liveChat").config(function($routeProvider) {
	$routeProvider
	.when("/", {
		redirectTo: "/chat"
	})
	.when("/chat", {
		templateUrl: "views/templates/chat.html"
	})
	.when("/about", {
		templateUrl: "views/templates/about.html"
	})
	.otherwise({
		redirectTo: "/"
	});
});