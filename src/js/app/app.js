'use strict';

angular.module('SampleApp', [])

.controller('SampleAppController', function ($scope) {
	var controller = this;

	$scope.model = {
		datasets: []
	};

	$scope.init = function () {
		controller.loadDatasets();
	};

	$scope.addDataset = function () {
		$scope.model.datasets.push({});
	};

	$scope.removeDataset = function (index) {
		$scope.model.datasets.splice(index, 1);
	};

	$scope.calculateMax = function () {
		var max = 0;
		_.each($scope.model.datasets, function (dataset) {
			max = Math.max(max, controller.calculateValue(dataset));
		});
		return max;
	};

	$scope.outputDatasets = function () {
		console.log(angular.toJson($scope.model.datasets));
	};

	controller.calculateValue = function () {
		// TODO
	};

	controller.loadDatasets = function () {
		// TODO
	};
});
