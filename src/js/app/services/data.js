angular.module('SampleApp')

.service('sampleAppDataService', function ($http, sampleAppConfig) {
	var service = this;

	service.promiseData = function () {
		return $http.get(sampleAppConfig.dataUrl);
	}
});
