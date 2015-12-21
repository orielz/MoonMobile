/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('ResetPasswordController', ['forgotService', '$state', '$stateParams', ResetPasswordController]);

    function ResetPasswordController(forgotService, $state, $stateParams) {

        var vm = this;
        vm.model = $stateParams;

        activate();

        function activate() {

        };

        vm.reset = function(form) {

            if (form.$invalid)
                return;

            forgotService.updateNewPassword(vm.model).then(success, failed);

            function success() {
                $state.go('rates');
            }

            function failed(reason) {
                vm.error = reason;
            }
        };

    }

})(angular.module('tradency.mobile'));