/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('spinnerContainer', ['$timeout', '$parse', 'validationHelperService', 'forexService', '$compile', spinnerContainer]);

    function spinnerContainer($timeout, $parse, validationHelperService, forexService, $compile) {

        return {
            link: {
                post: link
            },
            controller: controller
        };

        function link(scope, elem, attrs, ctrl) {

            if (attrs.component == 'stoploss')
            {
                scope.$on('onStopLossToggle', onToggle);
            }

            if (attrs.component == 'takeprofit')
            {
                scope.$on('onTakeProfitToggle', onToggle);
            }

            function onToggle() {
                var data = ctrl.calc(attrs.component);
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
                        new controller.set(data);
                    } else if (!excludedCtrl) {
                        new controller.set(data);
                    }
                });
            };

            this.calc = function (component) {

                var action = $parse($attrs.action)($scope);
                var rate = $parse($attrs.rate)($scope);
                var orderType = $parse($attrs.orderType)($scope);
                var entryPrice = $parse($attrs.entryPriceModel)($scope);
                var baseRate = orderType != 'Market' ? entryPrice : (action == 'Sell' ? rate.Bid : rate.Ask);

                if (component == 'stoploss') {
                    return validationHelperService.calcStopLoss(action, orderType, rate, baseRate);
                } else if (component == 'takeprofit') {
                    return validationHelperService.calcTakeProfit(action, orderType, rate, baseRate);
                }

            };

            this.priceChanged = function (newRate, excludedCtrl) {

                var component = $attrs.component;
                var rate = $parse($attrs.rate)($scope);
                var action = $parse($attrs.action)($scope);
                var orderType = $parse($attrs.orderType)($scope);
                var entryPrice = $parse($attrs.entryPriceModel)($scope);
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