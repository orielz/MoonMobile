/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('ApproveConfirmationController', ['forgotService', '$state', '$stateParams', ApproveConfirmationController]);

    function ApproveConfirmationController(forgotService, $state, $stateParams) {

        var vm = this;
        vm.model = $stateParams;

        activate();

        function activate() {

        };

        vm.approve = function(form) {

            if (form.$invalid)
                return;

            forgotService.isConfirmationCodeValid(vm.model).then(success, failed);

            function success() {
                $state.go('reset', vm.model);
            }

            function failed(reason) {
                vm.error = reason;
            }
        };

    }

})(angular.module('tradency.mobile'));