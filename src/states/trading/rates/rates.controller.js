/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('RatesController', ['$scope', '$log', 'ratesService', RatesController]);

    function RatesController($scope, $log, ratesService) {

        activate();

        function activate() {
            registerEvents();
            getData();
        };

        function registerEvents() {
            $scope.$on('onSymbolListReady', onSymbolListReady);
        };

        function getData() {

        };

        function onSymbolListReady(currentEvent) {

            ratesService.getRates().then(function(model) {
                $scope.$broadcast('onRatesModel', model.data);
            });
        }
    }

})(angular.module('tradency.mobile'));