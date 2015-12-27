(function (app) {

    app.service('httpInterceptor', function($q) {
        var service = this;

        service.request = function(config) {

            return config;
        };

        service.responseError = function(response) {

            if (response.status == 401) { // 401 == Unauthorized
                window.location = "/MoonMobile/src/#/login";
            }

            return $q.reject(response);
        };
    });

})(angular.module('tradency.mobile'));