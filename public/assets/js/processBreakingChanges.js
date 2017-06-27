//Módulo para manipulação das tabelas.
var moduleProcess =  angular.module('moduleProcess', ['moduleRoutes']);

moduleProcess.controller('controllerProcess', function($scope, factoryPrincipal) {
		$scope.data = [];
		$scope.formData = {};
	  	$scope.formData.commit = 0;
  		$scope.formData.id = 0;
  		$scope.formData.option = '0';
		
		// Inicializa a página com o gráfico default.
		factoryPrincipal.findAllBreakingChanges() 
		.success(function(data){
			if(data){
				$scope.records = data;
			}
		});

		$scope.removeBreakingChange = function(commit, id, option){
			$scope.formData.commit = commit;
			$scope.formData.id = id;
			$scope.formData.option = option;
			factoryPrincipal.removeBreakingChangeById($scope.formData);
			addLine(id);
		}

		$scope.removeBreakingChangeAll = function(commit, option){
			$scope.formData.commit = commit;
			$scope.formData.option = option;
			factoryPrincipal.removeAllBreakingChange($scope.formData);
			addLine(commit);
		}

		function addLine(id){
			$("#" + id).css("text-decoration", "line-through");
		}
});

