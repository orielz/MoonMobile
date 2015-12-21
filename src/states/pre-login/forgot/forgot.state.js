/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.config(['$stateProvider', appRoutes]);

    function appRoutes($stateProvider) {

        $stateProvider
            .state('forgot-password', {
                url: '/forgot-password',
                abstract: true,
                template: '<div ui-view class="full-height"></div>'
            })
            .state('create', {
                parent: 'forgot-password',
                url: '/create',
                templateUrl: 'states/pre-login/forgot/create/create.html',
                controller: 'CreateConfirmationController',
                controllerAs: 'create',
                params: {
                    Culture: 'en-US'
                }
            })
            .state('approve', {
                parent: 'forgot-password',
                url: '/approve',
                templateUrl: 'states/pre-login/forgot/approve/approve.html',
                controller: 'ApproveConfirmationController',
                controllerAs: 'approve',
                params: {
                    BrokerID: '',
                    UserName: '',
                    Email: '',
                    Culture: ''
                }
            })
            .state('reset', {
                parent: 'forgot-password',
                url: '/reset',
                templateUrl: 'states/pre-login/forgot/reset/reset.html',
                controller: 'ResetPasswordController',
                controllerAs: 'reset',
                params: {
                    BrokerID: '',
                    UserName: '',
                    Email: '',
                    ConfirmationCode: '',
                    Culture: ''
                }
            });
    }

})(angular.module('tradency.mobile'));