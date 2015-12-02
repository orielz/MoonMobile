/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$stateProvider', appRoutes]);

    function appRoutes($stateProvider) {

        $stateProvider
            .state('app', {
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    init: ['authService', 'userDataService', 'signalRService', function (authService, userDataService, signalRService) {

                        return authService.auth()
                            .then(function () {
                                return userDataService.getUserData();
                            })
                            .then(function () {
                                return signalRService.listen();
                            });
                    }]
                }
            });
    }

})(angular.module('tradency.mobile'));