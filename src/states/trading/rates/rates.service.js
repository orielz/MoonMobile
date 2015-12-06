/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'ratesService';

    app.factory(serviceId, ['$localStorage','$http', '$q', 'constants', ratesService]);

    function ratesService($localStorage, $http, $q, constants) {

        return {
            getRates: getRates
        };

        function getRates() {

            var accountId = $localStorage.accountId;
            var getRatesUrl = constants.DEV.getRatesUrl;

            return $http.post(getRatesUrl, {AccountID: accountId});
        }

    }

})(angular.module('tradency.mobile'));