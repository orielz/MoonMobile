/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'authService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', authService]);

    function authService(constants, $http, $q, $localStorage) {

        return {
            auth: auth
        };

        function auth() {

            var deferred = $q.defer();

            $http.post(constants.DEV.authUrl, {userName: "feteam", password: "987654", liveDemo: "1"}).then(function(response) {

                var data = response.data;

                if (data && data.Status == 1 && data.Token) {
                    $localStorage.token = data.Token;
                    $http.defaults.headers.common['Authorization'] = 'tradency ' + data.Token;
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                }
            });

            return deferred.promise;
        }

    }

})(angular.module('tradency.mobile'));