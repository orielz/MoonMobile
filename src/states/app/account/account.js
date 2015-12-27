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
                template: '<div ui-view class="full-height"></div>',
                controller: 'MyAccountController',
                controllerAs: 'MyAccount'
            });

        $urlRouterProvider.otherwise('/account/open-positions/list');

    }

})(angular.module('tradency.mobile'));