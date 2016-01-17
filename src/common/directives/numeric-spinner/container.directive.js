/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('spinnerContainer', ['$timeout', '$parse', 'validationHelperService', 'forexService', '$compile', spinnerContainer]);

    function spinnerContainer($timeout, $parse, validationHelperService, forexService, $compile) {

        return {
            link: {
                pre: pre,
                post: link
            },
            controller: controller
        };

        function pre(scope, elem, attrs, ctrl) {
            scope.component = attrs.component;
        }

        function link(scope, elem, attrs, ctrl) {

            // Listen to changes and re assign validation and default values on change
            scope.$watch(attrs.rate, function (newVal, oldVal) {
                if (newVal && newVal != oldVal) {
                    reassign();
                }
            });

            scope.$watch(attrs.action, function (newVal, oldVal) {
                if (newVal && newVal != oldVal) {
                    reassign();
                }
            });

            scope.$watch(attrs.orderType, function (newVal, oldVal) {
                if (newVal && newVal != oldVal) {
                    reassign();
                }
            });

            function reassign() {

                var data = ctrl.init();
                ctrl.publish(data);
            }
        }

        function controller($scope, $element, $attrs) {

            var registered = [];

            this.register = function (controller) {
                registered.push(controller);
            };

            this.publish = function (data, excludedCtrl) {

                angular.forEach(registered, function (controller) {

                    if (excludedCtrl && controller != excludedCtrl) {
                        controller.set(data);
                    } else if (!excludedCtrl) {
                        controller.set(data);
                    }
                });
            };

            this.init = function () {

                var action = $parse($attrs.action)($scope);
                var rate = $parse($attrs.rate)($scope);
                var orderType = $parse($attrs.orderType)($scope);
                var entryPrice = $parse($attrs.entryPriceModel)($scope);
                var baseRate = orderType != 'Market' ? entryPrice : (action == 'Sell' ? rate.Bid : rate.Ask);

                if ($scope.component == 'stoploss') {
                    return validationHelperService.calcStopLoss(action, orderType, rate, baseRate);
                } else if ($scope.component == 'takeprofit') {
                    return validationHelperService.calcTakeProfit(action, orderType, rate, baseRate);
                }

            };

            this.priceChanged = function (newRate, excludedCtrl) {

                var rate = $parse($attrs.rate)($scope);
                var action = $parse($attrs.action)($scope);
                var orderType = $parse($attrs.orderType)($scope);
                var entryPrice = $parse($attrs.entryPriceModel)($scope);
                var component = $parse($attrs.component)($scope);
                var baseRate = orderType != 'Market' ? entryPrice : (action == 'Sell' ? rate.Bid : rate.Ask);
                var isPlusOperation = action == 'Sell' && component == 'stoploss';

                var data = {
                    pips: {
                        default: forexService.calcPips(newRate, baseRate, rate, isPlusOperation)
                    }
                };

                this.publish(data, excludedCtrl);
            };

            this.pipsChanged = function (pips, excludedCtrl) {

                var rate = $parse($attrs.rate)($scope);
                var action = $parse($attrs.action)($scope);
                var orderType = $parse($attrs.orderType)($scope);
                var entryPrice = $parse($attrs.entryPriceModel)($scope);
                var component = $parse($attrs.component)($scope);
                var baseRate = orderType != 'Market' ? entryPrice : (action == 'Sell' ? rate.Bid : rate.Ask);
                var isPlusOperation = action == 'Sell' && component == 'stoploss';

                var data = {
                    price: {
                        default: forexService.calcPrice(pips, baseRate, rate.pipSize, rate.precision, isPlusOperation)
                    }
                };

                this.publish(data, excludedCtrl);
            }
        }
    }

})(angular.module('tradency.mobile'));