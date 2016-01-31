'use strict';

angular.module('SampleApp', [])

.controller('SampleAppController', function ($scope) {
	var controller = this;

	$scope.model = {
		max: 0,
		datasets: []
	};

	$scope.init = function () {
		controller.loadDatasets();
	};

	$scope.addDataset = function () {
		// I don't really have to worry too much about setting empty keys for each field, as zero values will be indistingushable from undefined
		$scope.model.datasets.push({
			name: 'Window ' + ($scope.model.datasets.length + 1) // ideally we should check we don't make duplicates
		});
	};

	$scope.removeDataset = function (index) {
		$scope.model.datasets.splice(index, 1);
	};

	$scope.calculateMax = function () {
		$scope.model.max = 0;
		_.each($scope.model.datasets, function (dataset) {
			$scope.model.max = Math.max($scope.model.max, $scope.calculateValue(dataset));
		});
	};

	$scope.outputDatasets = function () {
		console.log(angular.toJson($scope.model.datasets));
	};

	$scope.calculateValue = function (dataset) {
		// this can turn into a performance bottleneck rather quickly due to date parse, so depending on the amount of data we could be better off changing the data storage to hold start date and amount of days instead of start and end dates
		var startTime = new Date(dataset.endDate).getTime();
		var endTime = new Date(dataset.startDate).getTime();
		return (startTime - endTime) / (24 * 60 * 60 * 1000) + 1; // inclusive
	};

	controller.loadDatasets = function () {
		// TODO
	};
});
