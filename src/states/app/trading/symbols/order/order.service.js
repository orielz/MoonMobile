(function (app) {
    'use strict';

    var serviceId = 'orderService';

    app.factory(serviceId, ['validationHelperService', 'restrictionsService', '$http', '$q', 'constants', orderService]);

    function orderService(validationHelperService, restrictionsService, $http, $q, constants) {

        return {
            getTradeTypeId: getTradeTypeId,
            getModifyTypeID: getModifyTypeID,
            execute: execute
        };

        function getTradeTypeId(action, orderType) {

            // 1 : "market", //Buy,
            // 2 : "market", //Sell,
            // 3 : "limit",  //Buy Limit
            // 4 : "limit",  //Sell Limit
            // 5 : "stop",   //Buy Stop
            // 6 : "stop"    //Sell Stop

            if (action == 'Buy' && orderType == 'Market') {
                return 1;
            }

            if (action == 'Sell' && orderType == 'Market') {
                return 2;
            }

            if (action == 'Buy' && orderType == 'Limit') {
                return 3;
            }

            if (action == 'Sell' && orderType == 'Limit') {
                return 4;
            }

            if (action == 'Buy' && orderType == 'Stop') {
                return 5;
            }

            if (action == 'Sell' && orderType == 'Stop') {
                return 6;
            }
        }

        function getModifyTypeID() {
            return 1;
            //if (this.isAdd) {
            //    return 1;
            //}
            ////If none
            //var modeType = 3;
            //
            //var isStop, isLimit;
            //
            //if (this.resolvedData.stopLossRate == this.priceStopValue) {
            //    isStop = false;
            //}
            //else {
            //    isStop = true;
            //}
            //
            //if (this.resolvedData.takeProfitRate == this.priceLimitValue) {
            //    isLimit = false;
            //}
            //else {
            //    isLimit = true;
            //}
            //if (isStop && isLimit) {
            //    modeType = 3;
            //}
            //else if (isStop) {
            //    modeType = 1;
            //}
            //else if (isLimit) {
            //    modeType = 2;
            //}
            //return modeType;
        }

        function execute(model) {

            var deferred = $q.defer();

            $http.post(constants.EP.openUserMarketOrderUrl, model).then(success, failed);

            function success(response) {

                var data = response.data;

                if (data) {
                    deferred.resolve(data);
                }
                else {
                    deferred.reject();
                }
            }

            function failed(response) {
                deferred.reject(response);
            }

            return deferred.promise;

        }

    }

})(angular.module('tradency.mobile'));