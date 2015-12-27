/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('PositionDetailsController', ['openPositionsService', '$state', '$stateParams', PositionDetailsController]);

    function PositionDetailsController(openPositionsService, $state, $stateParams) {

        var vm = this;
        vm.model = $stateParams;

        activate();

        function activate() {
            var positionId = $stateParams.positionId;
            vm.model = openPositionsService.getPosition(positionId);
        };

        vm.edit = function(form) {

        };

    }

})(angular.module('tradency.mobile'));