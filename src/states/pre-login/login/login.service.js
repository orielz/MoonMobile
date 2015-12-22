/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'loginService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', loginService]);

    function loginService(constants, $http, $q, $localStorage) {

        return {
            getMobileBrokersList: getMobileBrokersList

        };

        function getMobileBrokersList() {

            var _statusCodes = {
                Ok: 1,
                NameAccountNotExsists: 2,
                WrongEmail: 3,
                InternalServerError: 4
            };

            var deferred = $q.defer();

            $http.post(constants.DEV.getMobileBrokersListUrl, {ProductID: constants.DEV.mobileProductId}).then(success, failed);

            function success(response) {

                var data = response.data;

                if (data && data.length > 0)
                    deferred.resolve(data);
                else
                    deferred.reject();
            }

            function failed(response) {
                deferred.reject();
            }

            return deferred.promise;
        }


    }

})(angular.module('tradency.mobile'));