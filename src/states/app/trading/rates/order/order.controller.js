/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('OrderController', ['ratesService', 'restrictionsService', '$stateParams', 'ratesModel', 'constants', OrderController]);

    function OrderController(ratesService, restrictionsService, $stateParams, ratesModel, constants) {

        var vm = this;
        vm.model = {};
        vm.restrictions = restrictionsService.getRestrictions();
        console.log(vm.restrictions);
        activate();

        function activate() {
            vm.ratesModel = ratesModel.model;
            vm.selectedRate = ratesService.getRate($stateParams.InstrumentID);
            vm.model.sellOrBuy = constants.orderTypes[$stateParams.type];
        };

        vm.rateChanged = function(rate) {

        };

        vm.stopLossChanged = function() {

        };

        vm.takeProfitChanged = function() {

        };

        vm.expirationChanged = function() {

        };

        vm.orderTypeChanged = function(orderType) {
            if (orderType == 'Market') {
                vm.showExpiration = false;
            }
        };

        vm.execute = function(form) {

        };



    }

})(angular.module('tradency.mobile'));