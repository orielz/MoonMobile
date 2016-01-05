/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'openPositionsService';
    var worker = null;
    var isWorkerInProgress = false;

    app.factory(serviceId, ['$localStorage', '$http', 'constants', 'positionsModel', '$rootScope', 'utilsService', '$interval', '$timeout', 'ratesModel', openPositionsService]);

    function openPositionsService($localStorage, $http, constants, positionsModel, $rootScope, utilsService, $interval, $timeout, ratesModel) {

        return {
            getOpenPositions: getOpenPositions,
            getPosition: getPosition
        };

        function getOpenPositions() {

            var accountId = $localStorage.accountId;
            var getOpenPositionsUrl = constants.EP.getOpenPositions;

            return $http.post(getOpenPositionsUrl, {AccountID: accountId})
                .then(addToModel)
                .then(registerEventListener);
        }

        // Add ajax response to persistence model
        function addToModel(response) {

            // Loop through the response.data array and convert it to an object list
            // This is done in order to access properties by ID and not loop all over the array to find an item
            _.each(response.data, function (position) {
                positionsModel.model[position.PositionID] = position;
            });
        }

        // Register listeners for angular events
        function registerEventListener() {
            $rootScope.$on('onOpenPositionsPushModel', onOpenPositionsPushModel);
            $rootScope.$on('onRatesUpdated', onRatesUpdated);
        }

        function onOpenPositionsPushModel(currentScope, position) {
            $timeout(function () {
                utilsService.addOrUpdateSingle(positionsModel.model, position, 'PositionID');
            }, 0);
        }

        function onRatesUpdated(currentScope) {

            if (!positionsModel.model || !ratesModel.model)
                return;

            if (isWorkerInProgress)
                return;

            if (!worker)
                worker = new Worker('models/positions/positions.worker.js');

            isWorkerInProgress = true;

            worker.onmessage = onWorkerMessage;
            worker.onerror = onWorkerError;

            function onWorkerMessage(event) {
                $timeout(function () {
                    utilsService.addOrUpdateList(positionsModel.model, event.data, 'PositionID');
                }, 0);
                isWorkerInProgress = false;
            }

            function onWorkerError(error) {
                console.log(error);
            }

            worker.postMessage({
                updatedRates: ratesModel.model,
                positionsList: positionsModel.model,
                userData: $localStorage.userData
            }); // Start processing
        }


        function simulatePush() {
            $interval(function () {
                var mock = {
                    "T": "OP",
                    "Message": {
                        "PositionID": 582577,
                        "TicketID": 542739458,
                        "AccountID": 10523,
                        "Lots": 10.0,
                        "OpenTime": "08/23/2015 12:12:56",
                        "OpenPrice": 135.631,
                        "StopLossRate": 0.0,
                        "TakeProfitRate": 0.0,
                        "Commission": 0.0,
                        "Swap": 0.0,
                        "UsedMargin": 54252.4,
                        "Pips": (Math.floor(Math.random() * 10) + -10).toString(),
                        "LastPrice": 138.731,
                        "Profit": -31000.0,
                        "InstrumentID": 12,
                        "InstrumentName": "EURJPY",
                        "SystemID": 0,
                        "SystemName": "Manual",
                        "AutoClose": 2,
                        "MappingIndexID": 0,
                        "ELS": "false",
                        "SignalID": 321671803,
                        "SubSignalID": 1,
                        "TradePositionTypeName": "Sell",
                        "TradePositionTypeID": "-1",
                        "SPCloseTime": "",
                        "SPPips": ""
                    }
                };

                $rootScope.$broadcast('onOpenPositionsPushModel', mock.Message); // SIMULATOR

            }, 1000);
        }

        function getPosition(positionId) {
            return positionsModel.model[positionId];
        }

    }

})(angular.module('tradency.mobile'));