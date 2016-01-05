/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'attributesService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', attributesService]);

    function attributesService(constants, $http, $q, $localStorage) {

        return {
            getGroupAttributes: getGroupAttributes
        };

        function getGroupAttributes(model) {

            var deferred = $q.defer();

            $http.post(constants.EP.getGroupAttributesUrl, model).then(success, failed);

            function success(response) {

                var data = response.data;

                if (data) {
                    $localStorage.attributes = data;
                    deferred.resolve(data);
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