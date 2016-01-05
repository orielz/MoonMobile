/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'signalRService';

    app.factory(serviceId, ['$interval', 'constants', '$log', '$localStorage', '$rootScope', '$q', signalRService]);

    function signalRService($interval, constants, $log, $localStorage, $rootScope, $q) {

        return {
            listen: listen
        };

        function listen() {

            var deferred = $q.defer();

            var socket = {
                connection: $.hubConnection()
            };

            socket.connection.url = constants.EP.signalRUrl;
            socket.hub = socket.connection.createHubProxy('tradencyHub');

            socket.connection.start().done(function () {
                var token = $localStorage.token;
                socket.hub.invoke('Login', token);
                deferred.resolve();
            });

            socket.hub.on('pushRates', function (data) {

                if (!data)
                    return;

                try {
                    var model = JSON.parse(data).Rate;
                    $rootScope.$broadcast('onRatesPushModel', model);
                } catch (e) {

                }


            });

            socket.hub.on('onPushOpenPosition', function (data) {
                var model = JSON.parse(data).Rate;
                $rootScope.$broadcast('onOpenPositionsPushModel', model);
            });

            return deferred.promise;
        }


    }

})(angular.module('tradency.mobile'));