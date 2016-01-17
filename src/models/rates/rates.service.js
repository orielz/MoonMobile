/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'ratesService';
    var worker = null;
    var isWorkerInProgress = false;

    app.factory(serviceId, ['$localStorage', '$http', '$rootScope', 'constants', 'ratesModel', '$interval', 'utilsService', '$timeout', 'forexService', ratesService]);

    function ratesService($localStorage, $http, $rootScope, constants, ratesModel, $interval, utilsService, $timeout, forexService) {

        return {
            getRates: getRates,
            getRate: getRate
        };

        function getRates() {

            var getRatesUrl = constants.EP.getRatesUrl;
            var getSpreadsUrl = constants.EP.getSpreadsUrl;

            var accountId = $localStorage.accountId;
            var userId = $localStorage.userData.UserID;

            // Get spreads
            $http.post(getSpreadsUrl, {AccountID: accountId, UserID: userId})
                .then(addSpreads);

            // Get rates
            return $http.post(getRatesUrl, {AccountID: accountId})
                .then(addRates)
                .then(registerEventListeners);
        }

        function getRate(InstrumentID) {
            return ratesModel.model[InstrumentID];
        }

        // Add ajax response to persistence model
        function addRates(response) {
            // Loop through the response.data array and convert it to an object list
            // This is done in order to access properties by ID and not loop all over the array to find an item
            _.each(response.data, function (rate) {

                rate.precision = forexService.getPrecision(rate.Coif);
                rate.pipSize = forexService.getPipSize(rate.Coif);
                rate.onePipValue = forexService.getOnePipsValue(rate.pipSize);

                ratesModel.model[rate.InstrumentID] = rate;
            });
        }

        // Add ajax response to persistence model
        function addSpreads(response) {
            // Loop through the response.data array and convert it to an object list
            // This is done in order to access properties by ID and not loop all over the array to find an item

            ratesModel.spreads = response.data.reduce(__hashSpread, {});

            function __hashSpread(result, current) {
                result[current.InstrumentID] = current;
                return result;
            }
        }

        // Register listeners for angular events
        function registerEventListeners() {
            $rootScope.$on('onRatesPushModel', onRatesPushModel);
            //startSimulationOfRates();
        }

        function onRatesPushModel(currentScope, ratesList) {

            if (!ratesModel.model || !ratesList)
                return;

            if (isWorkerInProgress)
                return;

            if (!worker)
                worker = new Worker('models/rates/rates.worker.js');

            isWorkerInProgress = true;

            worker.onmessage = onWorkerMessage;
            worker.onerror = onWorkerError;

            function onWorkerMessage(event) {

                $timeout(function () {
                    utilsService.addOrUpdateList(ratesModel.model, event.data, 'InstrumentID');
                    $rootScope.$broadcast('onRatesUpdated');
                    isWorkerInProgress = false;
                }, 0);

            }

            function onWorkerError(error) {
                console.log(error);
            }

            worker.postMessage({
                updatedRates: ratesList,
                ratesModel: ratesModel.model,
                spreads: ratesModel.spreads
            }); // Start processing


        }

        function startSimulationOfRates() {
            var ratesCounter = 0;
            var ratesArr = [
                {
                    "InstrumentID": "35",
                    "InstrumentName": "ZARJPY",
                    "Bid": 9.184,
                    "Ask": 9.190
                },
                {
                    "InstrumentID": "1",
                    "InstrumentName": "AUDCAD",
                    "Bid": 0.95336,
                    "Ask": 0.95366
                },
                {
                    "InstrumentID": "42",
                    "InstrumentName": "GBPNZD",
                    "Bid": 2.4147,
                    "Ask": 2.41566
                },
                {
                    "InstrumentID": "51",
                    "InstrumentName": "CADCHF",
                    "Bid": 0.71517,
                    "Ask": 0.71540
                },
                {
                    "InstrumentID": "43",
                    "InstrumentName": "NZDCHF",
                    "Bid": 0.61591,
                    "Ask": 0.61620
                },
                {
                    "InstrumentID": "2",
                    "InstrumentName": "AUDCHF",
                    "Bid": 0.6818,
                    "Ask": 0.68213
                },
                {
                    "InstrumentID": "3",
                    "InstrumentName": "AUDJPY",
                    "Bid": 86.848,
                    "Ask": 86.861
                },
                {
                    "InstrumentID": "4",
                    "InstrumentName": "AUDNZD",
                    "Bid": 1.10686,
                    "Ask": 1.10727
                },
                {
                    "InstrumentID": "5",
                    "InstrumentName": "AUDUSD",
                    "Bid": 0.72398,
                    "Ask": 0.72405
                },
                {
                    "InstrumentID": "6",
                    "InstrumentName": "CADJPY",
                    "Bid": 91.079,
                    "Ask": 91.094
                },
                {
                    "InstrumentID": "7",
                    "InstrumentName": "CHFJPY",
                    "Bid": 127.332,
                    "Ask": 127.359
                },
                {
                    "InstrumentID": "8",
                    "InstrumentName": "EURAUD",
                    "Bid": 1.58941,
                    "Ask": 1.58964
                },
                {
                    "InstrumentID": "9",
                    "InstrumentName": "EURCAD",
                    "Bid": 1.51555,
                    "Ask": 1.51575
                },
                {
                    "InstrumentID": "10",
                    "InstrumentName": "EURCHF",
                    "Bid": 1.08396,
                    "Ask": 1.0840
                },
                {
                    "InstrumentID": "11",
                    "InstrumentName": "EURGBP",
                    "Bid": 0.72856,
                    "Ask": 0.72863
                },
                {
                    "InstrumentID": "12",
                    "InstrumentName": "EURJPY",
                    "Bid": 138.055,
                    "Ask": 138.064
                },
                {
                    "InstrumentID": "13",
                    "InstrumentName": "EURNZD",
                    "Bid": 1.75942,
                    "Ask": 1.76000
                },
                {
                    "InstrumentID": "14",
                    "InstrumentName": "EURUSD",
                    "Bid": 1.15084,
                    "Ask": 1.15086
                },
                {
                    "InstrumentID": "15",
                    "InstrumentName": "GBPAUD",
                    "Bid": 2.18140,
                    "Ask": 2.18180
                },
                {
                    "InstrumentID": "16",
                    "InstrumentName": "GBPCHF",
                    "Bid": 1.48769,
                    "Ask": 1.48805
                },
                {
                    "InstrumentID": "17",
                    "InstrumentName": "GBPJPY",
                    "Bid": 189.473,
                    "Ask": 189.488
                },
                {
                    "InstrumentID": "18",
                    "InstrumentName": "GBPUSD",
                    "Bid": 1.57953,
                    "Ask": 1.57954
                },
                {
                    "InstrumentID": "19",
                    "InstrumentName": "NZDJPY",
                    "Bid": 78.44,
                    "Ask": 78.468
                },
                {
                    "InstrumentID": "20",
                    "InstrumentName": "NZDUSD",
                    "Bid": 0.6538,
                    "Ask": 0.65408
                },
                {
                    "InstrumentID": "21",
                    "InstrumentName": "USDCAD",
                    "Bid": 1.31694,
                    "Ask": 1.31705
                },
                {
                    "InstrumentID": "22",
                    "InstrumentName": "USDCHF",
                    "Bid": 0.94194,
                    "Ask": 0.94206
                },
                {
                    "InstrumentID": "24",
                    "InstrumentName": "USDJPY",
                    "Bid": 119.961,
                    "Ask": 119.964
                }
            ];

            $interval(function () {
                if (ratesCounter == 0) {
                    for (var i = 0; i < ratesArr.length; i++) {
                        ratesArr[i].Ask = ratesArr[i].Ask + 0.01;
                        ratesArr[i].Bid = ratesArr[i].Bid + 0.01;
                    }
                    ratesCounter = 1;
                }
                else {
                    for (var i = 0; i < ratesArr.length; i++) {
                        ratesArr[i].Ask = ratesArr[i].Ask - 0.01;
                        ratesArr[i].Bid = ratesArr[i].Bid - 0.01;
                    }
                    ratesCounter = 0;
                }

                $rootScope.$broadcast('onRatesPushModel', ratesArr); // SIMULATOR

            }, 3 * 1000);
        }

    }

})(angular.module('tradency.mobile'));