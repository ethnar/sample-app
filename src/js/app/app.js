'use strict';

angular.module('SampleApp', [])

.controller('SampleAppController', function ($scope, sampleAppDataService) {
	var controller = this;

	$scope.model = {
		dataLoading: false,
		max: 1,
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
		$scope.model.max = 1;
		_.each($scope.model.datasets, function (dataset) {
			$scope.model.max = Math.max($scope.model.max, controller.calculateValue(dataset) || 0);
		});
	};

	$scope.outputDatasets = function () {
		console.log(angular.toJson($scope.model.datasets));
	};

	$scope.calculatePercent = function (dataset) {
		var percent =  (100 * controller.calculateValue(dataset) / $scope.model.max);
		return Math.round(100 * percent) / 100 + '%';
	};

	$scope.checkValidDateFormat = function (dateString) {
		return !isNaN(new Date(dateString).getTime());
	};

	controller.calculateValue = function (dataset) {
		// this can turn into a performance bottleneck rather quickly due to date parse, so depending on the amount of data we could be better off changing the data storage to hold start date and amount of days instead of start and end dates
		var startTime = new Date(dataset.endDate).getTime();
		var endTime = new Date(dataset.startDate).getTime();
		return Math.max((startTime - endTime) / (24 * 60 * 60 * 1000) + 1 /* inclusive */ || 0, 0);
	};

	controller.loadDatasets = function () {
		sampleAppDataService.promiseData().then(function (response) {
			$scope.model.datasets = response.data;
			$scope.calculateMax();
		});
	};
});
