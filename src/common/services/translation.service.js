/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'translationService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', translationService]);

    function translationService(constants, $http, $q, $localStorage) {

        return {
            getTranslations: getTranslations
        };

        function getTranslations(model) {

            var deferred = $q.defer();

            $http.post(constants.EP.getTranslationsUrl, model).then(success, failed);

            function success(response) {

                var data = response.data;

                if (data) {
                    $localStorage.translations = data;
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