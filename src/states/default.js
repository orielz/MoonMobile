/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$stateProvider', appRoutes]);

    function appRoutes($stateProvider) {

        $stateProvider
            .state('app', {
                abstract: true,
                template: '<div ui-view class="full-height"></div>',
                resolve: {
                    init: ['authService', 'userDataService', 'signalRService', 'ratesService', function (authService, userDataService, signalRService, ratesService) {

                        return authService.auth()
                            .then(function () {
                                return userDataService.getUserData();
                            })
                            .then(function() {
                                return ratesService.getRates();
                            })
                            .then(function () {
                                return signalRService.listen();
                            });
                    }]
                }
            });
    }

})(angular.module('tradency.mobile'));