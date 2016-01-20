/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('OrderController', ['ratesService', 'restrictionsService', '$stateParams', 'ratesModel', 'constants', 'orderService', '$localStorage', '$compile', '$rootScope', OrderController]);

    function OrderController(ratesService, restrictionsService, $stateParams, ratesModel, constants, orderService, $localStorage, $compile, $rootScope) {

        var vm = this;

        activate();

        function activate() {

            vm.ratesModel = ratesModel.model;
            vm.rate = angular.copy(ratesService.getRate($stateParams.InstrumentID));
            vm.action = constants.orderActions[$stateParams.type];
            vm.restrictions = restrictionsService.getRestrictions();

            vm.model = {
                AccountID: $localStorage.accountId,
                InstrumentID: $stateParams.InstrumentID,
                NumPositions: 1,
                SenderTypeID: 2,
                TradePositionTypeID: $stateParams.type,
                EntryPrice: parseFloat(vm.action == 'Sell' ? vm.rate.Bid : vm.rate.Ask)
            };

            console.log(vm.restrictions);
        };

        vm.rateChanged = function (rate) {
            vm.model.InstrumentID = rate.InstrumentID;
        };

        vm.actionChanged = function(action) {

            if (vm.orderType === 'Market') {
                vm.model.EntryPrice = parseFloat(action == 'Sell' ? vm.rate.Bid : vm.rate.Ask)
            }

        };

        vm.stopLossChanged = function () {
            vm.stopLossOption = 'pipsDistance';
        };

        vm.takeProfitChanged = function () {
            vm.takeProfitOption = 'pipsDistance';
        };

        vm.expirationChanged = function () {

        };

        vm.orderTypeChanged = function (orderType) {
            if (orderType == 'Market') {
                vm.showExpiration = false;
            }
        };

        vm.execute = function (form) {

            if (form.$invalid)
                return;

            if (vm.showStopLoss)
                vm.model.StopLossRate = vm.model.StopLoss;
            else
                vm.model.StopLoss = 0;

            if (vm.showTakeProfit)
                vm.model.TakeProfitRate = vm.model.TakeProfit;
            else
                vm.model.TakeProfit = 0;

            vm.model.SubResource = vm.orderType == 'Market' ? 'Market' : 'Entry';

            vm.model.TradePositionTypeID = orderService.getTradeTypeId(vm.action, vm.orderType);

            vm.model.ModifyType = orderService.getModifyTypeID();

            orderService.execute(vm.model).then(executeSuccess, executeFailed);

        };

        function executeSuccess(response) {

        }

        function executeFailed(response) {

        }

        vm.cancel = function (form) {
            console.log(form.$valid);
        }



    }

})(angular.module('tradency.mobile'));