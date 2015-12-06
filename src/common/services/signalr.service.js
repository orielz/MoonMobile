/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'signalRService';

    app.factory(serviceId, ['Hub', 'constants', '$log', '$localStorage', '$rootScope', '$q', signalRService]);

    function signalRService(Hub, constants, $log, $localStorage, $rootScope, $q) {

        return {
            listen: listen
        };

        function listen() {

            var deferred = $q.defer();

            var socket = {
                connection:  $.hubConnection()
            };

            socket.connection.url = constants.DEV.signalRUrl;
            socket.hub = socket.connection.createHubProxy('tradencyHub');

            socket.connection.start().done(function () {
                var token = $localStorage.token;
                socket.hub.invoke( 'Login', token );
                deferred.resolve();
            });

            socket.hub.on('pushRates' , function (data) {
                var model = JSON.parse(data).Rate;
                $rootScope.$broadcast('onRatesPushModel', model);
            });

            socket.hub.on('onPushOpenPosition' , function (data) {
                var model = JSON.parse(data).Rate;
                $rootScope.$broadcast('onOpenPositionsPushModel', model);
            });

            return deferred.promise;
        }

        function errorHandler(error) {
            $log.log('errorHandler', arguments);
        }

        function onPushRates(rates) {
            $log.log('onPushRates', arguments);
        }

        function onPushMarketStatus(rates) {
            $log.log('onPushMarketStatus', arguments);
        }

        function onPushAccountFinancialData(rates) {
            $log.log('onPushAccountFinancialData', arguments);
        }

        function onPushBrokerNotification(rates) {
            $log.log('onPushBrokerNotification', arguments);
        }

        function onPushUserMessageData(rates) {
            $log.log('onPushUserMessageData', arguments);
        }

        function onPushOpenPosition(rates) {
            $log.log('onPushOpenPosition', arguments);
        }

        function onPushClosedPosition(rates) {
            $log.log('onPushClosedPosition', arguments);
        }

    }

})(angular.module('tradency.mobile'));