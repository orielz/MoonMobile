/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'forgotService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', forgotService]);

    function forgotService(constants, $http, $q, $localStorage) {

        return {
            createConfirmationCode: createConfirmationCode,
            isConfirmationCodeValid: isConfirmationCodeValid,
            updateNewPassword: updateNewPassword

        };

        function createConfirmationCode(model) {

            var _statusCodes = {
                Ok: 1,
                NameAccountNotExsists: 2,
                WrongEmail: 3,
                InternalServerError: 4
            };

            var deferred = $q.defer();

            $http.post(constants.DEV.createConfirmationCodeUrl, model).then(success, failed);

            function success(response) {

                var data = response.data;

                if (data && data.Result == _statusCodes.Ok)
                    deferred.resolve();
                else
                    deferred.reject(data.Result);
            }

            function failed(response) {
                deferred.reject(response.data.Result);
            }

            return deferred.promise;
        }

        function isConfirmationCodeValid(model) {

            var _statusCodes = {
                Ok: 1,
                WrongConfirmCode: 2,
                ServerGeneralFailure: 3
            };

            var deferred = $q.defer();

            $http.post(constants.DEV.isConfirmationCodeValidUrl, model).then(success, failed);

            function success(response) {

                var data = response.data;

                if (data && data.Result == _statusCodes.Ok)
                    deferred.resolve();
                else
                    deferred.reject(data.Result);
            }

            function failed(response) {
                deferred.reject(response.data.Result);
            }

            return deferred.promise;
        }

        function updateNewPassword(model) {

            var _statusCodes = {
                Ok: 1,
                WrongConfirmCode: 2,
                ServerGeneralFailure: 3
            };

            var deferred = $q.defer();

            $http.post(constants.DEV.updateNewPasswordUrl, model).then(success, failed);

            function success(response) {

                var data = response.data;

                if (data && data.Result == _statusCodes.Ok)
                    deferred.resolve();
                else
                    deferred.reject(data.Result);
            }

            function failed(response) {
                deferred.reject(response.data.Result);
            }

            return deferred.promise;
        }


    }

})(angular.module('tradency.mobile'));