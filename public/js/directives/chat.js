angular.module("liveChat").directive("chatBody", function() {
	return {
		restrict: "E",
		templateUrl: "views/templates/directives/chat.html",
		controller: "ChatController",
		controllerAs: "chat"
	}
});