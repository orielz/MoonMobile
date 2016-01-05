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

        function auth(credentials) {

            var deferred = $q.defer();

            credentials.liveDemo = "1";

            var headers = {
                'x-brokerurl': 'http://web.tradency.com/b78/InvastSec'
            };

            $http.post(constants.EP.authUrl, credentials, {
                headers: headers
            }).then(success, failed);

            function success(response) {

                var data = response.data;

                if (data && data.Status == 1 && data.Token) {
                    $localStorage.token = data.Token;
                    $http.defaults.headers.common['Authorization'] = 'tradency ' + data.Token;
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                }
            }

            function failed(response) {
                deferred.reject(response);
            }

            return deferred.promise;
        }

    }

})(angular.module('tradency.mobile'));