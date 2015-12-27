/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-originID'] = 'WEB';
        $httpProvider.interceptors.push('httpInterceptor');
    }]);

})(angular.module('tradency.mobile'));