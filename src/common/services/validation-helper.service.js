(function (app) {
    'use strict';

    var serviceId = 'validationHelperService';

    app.factory(serviceId, ['restrictionsService', 'forexService', validationHelperService]);

    function validationHelperService(restrictionsService, forexService) {

        return {
            calcEntryPrice: calcEntryPrice,
            calcStopLoss: calcStopLoss,
            calcTakeProfit: calcTakeProfit
        };

        function calcStopLoss(action, orderType, rate, entryPrice) {

            var restrictions = restrictionsService.getRestrictions();
            //var baseRate = action == 'Sell' ? rate.Bid : rate.Ask;

            var isPlusOperation = action == 'Sell';

            var _min = forexService.calcPrice(restrictions.MANUAL_MINIMUM_PIPS_SL, entryPrice, rate.pipSize, rate.precision, isPlusOperation);
            var _max = forexService.calcPrice(restrictions.MANUAL_MAXIMUM_PIPS_SL, entryPrice, rate.pipSize, rate.precision, isPlusOperation);
            var _default = forexService.calcPrice(restrictions.MANUAL_DEFAULT_SL_PIPS, entryPrice, rate.pipSize, rate.precision, isPlusOperation);

            return {
                price: {
                    min: _min > _max ? _max : _min,
                    max: _min > _max ? _min : _max,
                    default: _default
                },
                pips :{
                    min: restrictions.MANUAL_MINIMUM_PIPS_SL,
                    max: restrictions.MANUAL_MAXIMUM_PIPS_SL,
                    default: restrictions.MANUAL_DEFAULT_SL_PIPS
                }
            };

        }

        function calcTakeProfit(action, orderType, rate, entryPrice) {

            var restrictions = restrictionsService.getRestrictions();
            //var baseRate = action == 'Sell' ? rate.Bid : rate.Ask;

            var isPlusOperation = action == 'Buy';

            var _min = forexService.calcPrice(restrictions.MANUAL_MINIMUM_PIPS_TP, entryPrice, rate.pipSize, rate.precision, isPlusOperation);
            var _max = forexService.calcPrice(restrictions.MANUAL_MAXIMUM_PIPS_TP, entryPrice, rate.pipSize, rate.precision, isPlusOperation);
            var _default = forexService.calcPrice(restrictions.MANUAL_DEFAULT_TP_PIPS, entryPrice, rate.pipSize, rate.precision, isPlusOperation);

            return {
                price: {
                    min: _min > _max ? _max : _min,
                    max: _min > _max ? _min : _max,
                    default: _default
                },
                pips :{
                    min: restrictions.MANUAL_MINIMUM_PIPS_TP,
                    max: restrictions.MANUAL_MAXIMUM_PIPS_TP,
                    default: restrictions.MANUAL_DEFAULT_TP_PIPS
                }
            };

        }

        function calcEntryPrice(action, orderType, rate) {

            var restrictions = restrictionsService.getRestrictions();
            //var baseRate = fixRate(action == 'Sell' ? rate.Bid : rate.Ask, rate.precision);
            var baseRate = action == 'Sell' ? rate.Bid : rate.Ask;
            var min, max, defaultValue;

            if (orderType == 'Limit') {
                min = restrictions.LIMIT_ORDER_MIN_FROM_MARKET;
                max = restrictions.LIMIT_ORDER_MAX_FROM_MARKET;
                defaultValue = restrictions.LIMIT_ORDER_DEFAULT;
            }
            else {
                min = restrictions.STOP_ORDER_MIN_FROM_MARKET;
                max = restrictions.STOP_ORDER_MAX_FROM_MARKET;
                defaultValue = restrictions.STOP_ORDER_DEFAULT;
            }

            var isPlusOperation = (action == 'Sell' && orderType == 'Limit') || (action == 'Buy' && orderType == 'Stop');

            var _default = forexService.calcPrice(defaultValue, baseRate, rate.pipSize, rate.precision, isPlusOperation);
            var _max = forexService.calcPrice(max, baseRate, rate.pipSize, rate.precision, isPlusOperation);
            var _min = forexService.calcPrice(min, baseRate, rate.pipSize, rate.precision, isPlusOperation);

            return {
                default: _default,
                min: _min > _max ? _max : _min,
                max: _min > _max ? _min : _max
            };
        }


    }

})(angular.module('tradency.mobile'));