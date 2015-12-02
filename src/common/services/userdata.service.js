/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'userDataService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', userDataService]);

    function userDataService(constants, $http, $q, $localStorage) {

        return {
            getUserData: getUserData
        };

        function getUserData() {

            var deferred = $q.defer();

            $http.post(constants.DEV.getUserDataUrl, {LiveDemo: "1", HostName: "ILDEVWEB01"}).then(function(response) {

                $localStorage.accountId = response.data.UserAccounts[0].AccountID;

                deferred.resolve();

            });

            return deferred.promise;
        }

    }

})(angular.module('tradency.mobile'));