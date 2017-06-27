var moduleRoutes = angular.module('moduleRoutes', []);


moduleRoutes.factory('factoryPrincipal', function($http) {
	return {
		//Retorna todas as breaking changes.
		findAllBreakingChanges : function(data) {
			return $http.post('/api/findAllBreakingChanges', data);
		},

		removeAllBreakingChange : function(data) {
			return $http.post('/api/removeAllBreakingChange', data);
		},

		removeBreakingChangeById : function(data) {
			return $http.post('/api/removeBreakingChangeById', data);
		}
	}
});