/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('LoginController', ['authService', '$state', '$log', LoginController]);

    function LoginController(authService, $state, $log) {

        var vm = this;
        vm.credentials = {};

        activate();

        function activate() {
            registerEvents();
            getData();
        };

        function registerEvents() {

        };

        function getData() {

        };

        vm.login = function(form) {

            //if (form.$invalid)
            //    return;

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