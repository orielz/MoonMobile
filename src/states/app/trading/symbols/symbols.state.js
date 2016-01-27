/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$stateProvider', appRoutes]);

    function appRoutes($stateProvider) {

        $stateProvider
            .state('symbols', {
            parent: 'trading',
            url: '/symbols',
            templateUrl: 'states/app/trading/symbols/symbols.html',
            controller: 'SymbolsController',
            controllerAs: 'symbols'
        }).state('order', {
            url: '/order/{InstrumentID}/{type}/{isEdit}',
            templateUrl: 'states/app/trading/symbols/order/order.html',
            controller: 'OrderController',
            controllerAs: 'order'
        })
    }

})(angular.module('tradency.mobile'));