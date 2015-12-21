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
                templateUrl: 'states/app/account/positions/positions.html',
                controller: 'OpenPositionsController',
                controllerAs: 'Positions'
            });
    }

})(angular.module('tradency.mobile'));