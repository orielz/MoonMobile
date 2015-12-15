/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('RatesController', ['$scope', '$log', 'ratesModel', RatesController]);

    function RatesController($scope, $log, ratesModel) {

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