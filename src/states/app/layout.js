/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$stateProvider', '$urlRouterProvider', appRoutes]);

    function appRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'states/app/layout.html',
                resolve: {
                    init: ['userDataService', 'signalRService', 'ratesService', 'openPositionsService', function (userDataService, signalRService, ratesService, openPositionsService) {

                        return userDataService.getUserData()
                            .then(function() {
                                openPositionsService.getOpenPositions();
                                return ratesService.getRates();
                            })
                            .then(function () {
                                return signalRService.listen();
                            });
                    }]
                }
            });

        $urlRouterProvider.otherwise('/login');
    }

})(angular.module('tradency.mobile'));