/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.controller('TradingController', ['$scope', '$log', TradingController]);

    function TradingController($scope, $log) {

        $log.log('Hello from TradingController');

    }

})(angular.module('tradency.mobile'));