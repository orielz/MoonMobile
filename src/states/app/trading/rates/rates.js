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
        }).state('order', {
            url: '/order/{InstrumentID}/{type}',
            templateUrl: 'states/app/trading/rates/order/order.html',
            controller: 'OrderController',
            controllerAs: 'order'
        })
    }

})(angular.module('tradency.mobile'));