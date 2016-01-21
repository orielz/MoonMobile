(function (app) {
    'use strict';

    var serviceId = 'forexService';

    app.factory(serviceId, ['restrictionsService', 'constants', forexService]);

    function forexService(restrictionsService, constants) {

        return {
            getPipSize: getPipSize,
            getPrecision: getPrecision,
            getOnePipsValue: getOnePipsValue,
            calcPrice: calcPrice,
            calcPips: calcPips
        };


        function getPipSize(coif) {
            var digitsNumber = coif.indexOf("1") - 1;
            digitsNumber = digitsNumber < 0 ? 0 : digitsNumber;
            return Math.pow(10, digitsNumber);//Return the location of pip in the rate
        }


        function getPrecision(coif) {
            var precision = coif.indexOf("1");
            return (precision != -1) ? precision : 5;
        }

        function getOnePipsValue(pipsSize) {
            return 1 / pipsSize;
        }

        function calcPips(newRate, baseRate, rate, discountFromBaseRate) {

            //var currentBaseRate = Number(baseRate);
            //var isValid = _isPriceValid.call(this, newRate, rate.precision);

            //if(isValid){
            baseRate = parseFloat(baseRate);
            newRate = parseFloat(newRate);

            var fractionalPips = rate.precision - 1 > 0 ? rate.precision - 1 : 0;

            var diffrence;

            if (!discountFromBaseRate) {
                diffrence = Number(baseRate.toFixed(fractionalPips) - newRate.toFixed(fractionalPips)).toFixed(rate.precision);
            }
            else {
                diffrence = Number(newRate.toFixed(fractionalPips) - baseRate.toFixed(fractionalPips)).toFixed(rate.precision);
                //diffrence = Number(newRate.toFixed(fractionalPips) - baseRate.toFixed(fractionalPips)).toFixed(rate.precision);
            }

            //if (isSell) {
            //    //Above the base rate
            //    if (isStop) {
            //        diffrence = Number(newRate.toFixed(fractionalPips) - baseRate.toFixed(fractionalPips)).toFixed(rate.precision);
            //    }
            //    else {
            //        diffrence = Number(baseRate.toFixed(fractionalPips) - newRate.toFixed(fractionalPips)).toFixed(rate.precision);
            //    }
            //}
            //else {
            //    if (isStop) {
            //        diffrence = Number(baseRate.toFixed(fractionalPips) - newRate.toFixed(fractionalPips)).toFixed(rate.precision);
            //    }
            //    else {
            //        diffrence = Number(newRate.toFixed(fractionalPips) - baseRate.toFixed(fractionalPips)).toFixed(rate.precision);
            //    }
            //}
            var price = (parseFloat(diffrence) * rate.pipSize).toString();
            //price = Math.round(price);

            //Fix javascript bug
            //if (_.contains.(price, '.') && price.substring(price.indexOf('.') + 1) > rate.precision) {
            if (true) {
                price = Math.round(price);
            }

            var pipsDelta = _correctFloatingPointError.call(this, price);

            return pipsDelta;
            //newData["SLTPValue"] = pipsDelta;
            //newData["prevValue"] = newRate;
            //
            //
            //priceReference = this.entryInput !== "" && this.entryInput !== undefined ? this.entryInput : this.initialStopRate;
            //fixedValue = this.amountService.validatePrice(this.priceStopValue, this.precision, parseFloat(priceReference), this.pipsSize, this.isSell, true);
        }


        // Private methods
        function calcPrice(pipsNumber, baseRate, pipsCalcSize, allowedPrecision, isPlusOperation) {

            var rate = parseFloat(baseRate);
            var pipsValue = pipsNumber / pipsCalcSize;
            rate = isPlusOperation ? (rate + pipsValue) : (rate - pipsValue);
            rate = fixFloatingPoint(rate, allowedPrecision);
            rate = _correctFloatingPointError(rate, allowedPrecision);
            rate = fixRate(String(rate), allowedPrecision);
            return rate;
        }

        /*
         * Fix the floating point problem of long decimal numbers in JS
         * Read the next link for more details:
         * http://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
         */
        function fixFloatingPoint(baseRate, allowedPrecision) {

            var JAVASCRIPT_FLOATING_POINT = 17;
            var decimal = baseRate.toString().split('.')[1];

            if (decimal && decimal.length + allowedPrecision >= JAVASCRIPT_FLOATING_POINT) {
                baseRate = baseRate.toFixed(allowedPrecision);
                baseRate = parseFloat(baseRate);
            }

            return baseRate;
        }

        /*
         * Fix the rate precision,
         * if the decimal numbers of the rate is not long as needed, add zeros in order to make it precise
         */
        function fixRate(rate, allowedPrecision) {

            var decimalLength = rate.split('.')[1] ? rate.split('.')[1].length : 0;

            if (decimalLength < allowedPrecision) {

                rate = !_.contains(rate, '.') ? rate + '.' : rate;

                var howManyZeroToAdd = allowedPrecision - decimalLength;

                for (var i = 0; i < howManyZeroToAdd; i++) {
                    rate += "0";
                }
            }

            return rate;
        }

        /*
         * Correct floating point error
         */
        function _correctFloatingPointError(number, precision) {
            precision = precision || 10;
            var correction = Math.pow(10, precision);
            var result = correction * number;
            result = result > 0 ? Math.floor(result) : Math.ceil(result);
            return result / correction;
        }
    }

})(angular.module('tradency.mobile'));