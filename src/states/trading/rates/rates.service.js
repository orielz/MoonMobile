/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'ratesService';

    app.factory(serviceId, ['$localStorage', '$http', '$rootScope', 'constants', 'ratesModel', ratesService]);

    function ratesService($localStorage, $http, $rootScope, constants, ratesModel) {

        return {
            getRates: getRates
        };

        function getRates() {

            var accountId = $localStorage.accountId;
            var getRatesUrl = constants.DEV.getRatesUrl;

            return $http.post(getRatesUrl, {AccountID: accountId})
                .then(function (response) {
                    return ratesModel.model = response.data;
                }).then(function () {
                    return listenToRatesPush();
                });
        }

        function listenToRatesPush() {

            $rootScope.$on('onRatesPushModel', function (currentScope, ratesList) {

                // Loop through rates push update array
                _.each(ratesList, function (pushModel) {

                    // Convert the InstrumentID from number to string
                    pushModel.InstrumentID = pushModel.InstrumentID.toString();

                    // If the existing model contains the push object, store the model in variable
                    var model = _.where(ratesModel.model, {InstrumentID: pushModel.InstrumentID})[0];

                    if (model)
                        $.extend(model, pushModel); // Update an existing model
                    else if (ratesModel.model)
                        ratesModel.model.push(pushModel); // Add new model

                });

                $rootScope.$broadcast('onRatesUpdate', ratesModel.model);

            });

        }

    }

})(angular.module('tradency.mobile'));