/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common['x-brokerurl'] = 'http://web.tradency.com/b78/InvastSec';
        $httpProvider.defaults.headers.common['X-originID'] = 'WEB';
    }]);

})(angular.module('tradency.mobile'));