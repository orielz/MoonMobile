/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$stateProvider', appRoutes]);

    function appRoutes($stateProvider) {

        $stateProvider
            .state('open-positions', {
                parent: 'account',
                url: '/open-positions',
                templateUrl: 'states/account/positions/positions.html',
                controller: 'OpenPositionsController',
                controllerAs: 'Positions'//,
                //resolve: {
                //    rates: function getRates(ratesService) {
                //        return ratesService.getRates();
                //    }
                //
                //}//,
                //controller: function ($scope, simpleObj) {
                //    //$scope.rates = rates;
                //}
            });
    }

})(angular.module('tradency.mobile'));