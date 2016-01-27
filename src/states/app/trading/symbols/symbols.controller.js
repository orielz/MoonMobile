/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('SymbolsController', ['$scope', '$log', 'ratesModel', SymbolsController]);

    function SymbolsController($scope, $log, ratesModel) {

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