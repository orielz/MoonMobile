/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'ratesService';

    app.factory(serviceId, ['$localStorage','$http', '$q', ratesService]);

    function ratesService($localStorage, $http, $q) {

        return {
            getRates: getRates
        };

        function getRates() {

            var accountId = $localStorage.accountId;

            return $http.post('http://mws.tradency.com/Rates/GetRates', {AccountID: accountId});
        }

    }

})(angular.module('tradency.mobile'));