/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'userDataService';

    app.factory(serviceId, ['constants', '$http', '$localStorage', userDataService]);

    function userDataService(constants, $http, $localStorage) {

        return {
            getUserData: getUserData
        };

        function getUserData() {
            return $http.post(constants.EP.getUserDataUrl, {LiveDemo: "1", HostName: "ILDEVWEB01"}).then(onUserData, userDataFailed);
        }

        function onUserData(response) {
            $localStorage.accountId = response.data.UserAccounts[0].AccountID;
            $localStorage.userData = response.data;
        }

        function userDataFailed() {

        }
    }

})(angular.module('tradency.mobile'));