/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('PositionEditController', ['openPositionsService', '$state', '$stateParams', PositionEditController]);

    function PositionEditController(openPositionsService, $state, $stateParams) {

        var vm = this;

        activate();

        function activate() {
            var positionId = $stateParams.positionId;
            vm.model = openPositionsService.getPosition(positionId);
        };

        vm.edit = function(form) {

        };

    }

})(angular.module('tradency.mobile'));