/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$stateProvider', '$urlRouterProvider', appRoutes]);

    function appRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('account', {
                parent: 'app',
                url: '/account',
                abstract: true,
                template: '<ui-view/>',
                controller: 'MyAccountController',
                controllerAs: 'MyAccount'
            });

        $urlRouterProvider.otherwise('/account/open-positions');

    }

})(angular.module('tradency.mobile'));