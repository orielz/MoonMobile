/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('OpenPositionsController', ['$scope', '$log', 'openPositionsService', '$interval', OpenPositionsController]);

    function OpenPositionsController($scope, $log, openPositionsService, $interval) {

        activate();

        function activate() {
            registerEvents();
            getData();
        };

        function registerEvents() {

        };

        function getData() {

        };
    }

})(angular.module('tradency.mobile'));