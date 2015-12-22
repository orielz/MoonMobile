/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('LoginController', ['authService', '$state', 'loginService', LoginController]);

    function LoginController(authService, $state, loginService) {

        var vm = this;
        vm.credentials = {};

        activate();

        function activate() {
            getData();
        };

        function getData() {
            loginService.getMobileBrokersList().then(onBrokerListSuccess, onBrokerListFailed);
        };

        function onBrokerListSuccess(list) {
            vm.brokers = list;
        }

        function onBrokerListFailed(reason) {

        }

        vm.login = function(form) {

            if (form.$invalid)
                return;

            authService.auth(vm.credentials).then(authSuccess, authFailed);
        };

        function authSuccess() {
            $state.go('rates');
        }

        function authFailed(err) {
            vm.loginError = err;
        }

    }

})(angular.module('tradency.mobile'));