(function (app) {
    'use strict';

    var serviceId = 'positionsListService';

    app.factory(serviceId, ['$localStorage', positionsListService]);

    function positionsListService($localStorage) {

        return {
            calcPositionsPNL: calcPositionsPNL
        };

        /*
         * Update Profit and Pips for each position
         * @param {object} rateList - list of rates (push data)
         * @param {array} positionsList - list of current positions
         * @return {array} calculated position list with updated PNL
         */
        function calcPositionsPNL(updatedRates, positionsList) {

            // Loop through positions model
            _.each(positionsList, function (position) {

                // Loop through rates array
                _.each(updatedRates, function (rate) {

                    if (rate.InstrumentName == position.InstrumentName) {
                        var result = calcSinglePositionPNL(rate, position);
                        position.Pips = result.pips;
                        position.Profit = result.profit;
                    }

                });

            });

            return positionsList;
        }

        function calcSinglePositionPNL(rate, position) {

            if (!rate.Bid && !rate.Ask)
                return NaN;

            var bid = rate.Bid,
                ask = rate.Ask,
                coif = rate.Coif,
                sellTypes = [2, 4, 6];
            var pips;

            if (sellTypes.indexOf(position.TradePositionTypeID) == -1 && bid) {
                if (position.TradePositionTypeID === 1) {
                    pips = ((bid - position.OpenPrice) / coif).toFixed(1);
                }
                else {
                    pips = ((ask - position.OpenPrice) / coif).toFixed(1);
                }
            }
            else if (sellTypes.indexOf(position.TradePositionTypeID) > -1 && ask) {
                if (position.TradePositionTypeID === 2) {
                    pips = ((position.OpenPrice - ask) / coif).toFixed(1);
                }
                else {
                    pips = ((position.OpenPrice - bid) / coif).toFixed(1);
                }
            }
            else {
                return NaN;
            }

            var profit = pips * rate.PipsValue * rate.MinContractSize * position.Lots / 10;

            var floatRounding = $localStorage.userData.FloatRounding;
            floatRounding = Math.pow(10, floatRounding);

            profit = (floatRounding * profit) / floatRounding;

            return { pips: pips, profit: profit };
        }

    }

})(angular.module('tradency.mobile'));