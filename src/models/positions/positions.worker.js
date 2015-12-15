(function () {
    "use strict";

    var running = false;

    /*
     * Update Profit and Pips for each position
     * @param {object} rateList - list of rates (push data)
     * @param {array} positionsList - list of current positions
     * @return {array} calculated position list with updated PNL
     */
    function calcPositionsPNL(updatedRates, positionsList, userData) {

        for (var rateProp in updatedRates) {

            if (!updatedRates.hasOwnProperty(rateProp)) {
                continue;
            }

            var rate = updatedRates[rateProp];

            for (var posProp in positionsList) {

                if (!positionsList.hasOwnProperty(posProp)) {
                    continue;
                }

                var position = positionsList[posProp];

                // DO NOT use === here. one InstrumentID is string and the other is number
                if (position.InstrumentID == rate.InstrumentID) {
                    var result = calcSinglePositionPNL(rate, position, userData);
                    position.Pips = result.pips;
                    position.Profit = result.profit;
                }
            }
        }

        postMessage(positionsList); // Send the updated positions list to the service
        running = false;
    }


    function calcSinglePositionPNL(rate, position, userData) {

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

        var floatRounding = userData.FloatRounding;
        floatRounding = Math.pow(10, floatRounding);

        profit = (floatRounding * profit) / floatRounding;

        return {pips: pips, profit: profit};
    }

    addEventListener('message', function (e) {
        // doesn't matter what the message is, just toggle the worker
        if (running === false) {
            running = true;
            var updatedRates = e.data.updatedRates;
            var positionsList = e.data.positionsList;
            var userData = e.data.userData;

            calcPositionsPNL(updatedRates, positionsList, userData)
        }

    });


}());