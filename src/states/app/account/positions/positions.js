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
            })
            .state('details', {
                url: '/details/{positionId}',
                templateUrl: 'states/app/account/positions/details/details.html',
                controller: 'PositionDetailsController',
                controllerAs: 'details'
            })
            .state('edit', {
                    url: '/edit/{positionId}',
                    templateUrl: 'states/app/account/positions/edit/edit.html',
                    controller: 'PositionEditController',
                    controllerAs: 'edit'
                });
    }

})(angular.module('tradency.mobile'));