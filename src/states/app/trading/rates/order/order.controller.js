/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('OrderController', ['ratesService', 'restrictionsService', '$stateParams', 'ratesModel', 'constants', 'orderService', OrderController]);

    function OrderController(ratesService, restrictionsService, $stateParams, ratesModel, constants, orderService) {

        var vm = this;
        vm.model = {};



        activate();

        function activate() {

            vm.ratesModel = ratesModel.model;
            vm.rate = ratesService.getRate($stateParams.InstrumentID);
            vm.model.action = constants.orderActions[$stateParams.type];
            vm.restrictions = restrictionsService.getRestrictions();
            console.log(vm.restrictions);
        };

        vm.rateChanged = function(rate) {

        };

        vm.stopLossChanged = function() {
            vm.model.stopLossOption = 'pipsDistance';
        };

        vm.takeProfitChanged = function() {
            vm.model.takeProfitOption = 'pipsDistance';
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