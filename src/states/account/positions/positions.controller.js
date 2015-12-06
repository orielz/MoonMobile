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
            //simulatePush();
        };

        function registerEvents() {
            $scope.$on('onOpenPositionsListReady', onOpenPositionsListReady);
        };

        function getData() {

        };

        function onOpenPositionsListReady(currentEvent) {
            openPositionsService.getOpenPositions().then(function(model) {
                $scope.$broadcast('onOpenPositionsModel', model.data);
            });
        }

        function simulatePush() {
            $interval(function() {
                var mock = {
                    "T":"OP",
                    "Message": {
                        "PositionID":582577,
                        "TicketID":542739458,
                        "AccountID":10523,
                        "Lots":10.0,
                        "OpenTime":"08/23/2015 12:12:56",
                        "OpenPrice":135.631,
                        "StopLossRate":0.0,
                        "TakeProfitRate":0.0,
                        "Commission":0.0,
                        "Swap":0.0,
                        "UsedMargin":54252.4,
                        "Pips":(Math.floor(Math.random() * 10) + -10).toString(),
                        "LastPrice":138.731,
                        "Profit":-31000.0,
                        "InstrumentID":12,
                        "InstrumentName":"EURJPY",
                        "SystemID":0,
                        "SystemName":"Manual",
                        "AutoClose":2,
                        "MappingIndexID":0,
                        "ELS":"false",
                        "SignalID":321671803,
                        "SubSignalID":1,
                        "TradePositionTypeName":"Sell",
                        "TradePositionTypeID":"-1",
                        "SPCloseTime":"",
                        "SPPips":""
                    }
                };

                $scope.$broadcast('onOpenPositionsPushModel', mock.Message);

            }, 1000);
        }



    }

})(angular.module('tradency.mobile'));