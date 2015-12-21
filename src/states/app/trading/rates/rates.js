/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$stateProvider', appRoutes]);

    function appRoutes($stateProvider) {

        $stateProvider
            .state('rates', {
                parent: 'trading',
                url: '/rates',
                templateUrl: 'states/app/trading/rates/rates.html',
                controller: 'RatesController',
                controllerAs: 'Rates'
            });
    }

})(angular.module('tradency.mobile'));