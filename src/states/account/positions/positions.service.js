/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'openPositionsService';

    app.factory(serviceId, ['$localStorage','$http', 'constants', openPositionsService]);

    function openPositionsService($localStorage, $http, constants) {

        return {
            getOpenPositions: getOpenPositions
        };

        function getOpenPositions() {

            var accountId = $localStorage.accountId;
            var getOpenPositionsUrl = constants.DEV.getOpenPositions;

            return $http.post(getOpenPositionsUrl, {AccountID: accountId});
        }

    }

})(angular.module('tradency.mobile'));