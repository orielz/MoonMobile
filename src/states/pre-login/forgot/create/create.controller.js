/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('CreateConfirmationController', ['forgotService', '$localStorage', '$state', '$stateParams', CreateConfirmationController]);

    function CreateConfirmationController(forgotService, $localStorage, $state, $stateParams) {

        var vm = this;
        vm.model = $stateParams;

        activate();

        function activate() {

        };

        vm.create = function(form) {

            if (form.$invalid)
                return;

            vm.model.BrokerID = $localStorage.userData.BrokerID;

            forgotService.createConfirmationCode(vm.model).then(success, failed);

            function success() {
                $state.go('approve', vm.model);
            }

            function failed(reason) {
                vm.error = reason;
            }
        };

    }

})(angular.module('tradency.mobile'));