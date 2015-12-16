(function () {
    "use strict";

    var running = false;

    /*
     * Calc AskDiff and BidDiff properties
     * @param {object} updatedRates - list of rates (push data)
     * @param {array} ratesModel - list of current rates model
     * @param {array} spreads - list of spreads
     * @return {array} ratesModel - calculated rates list with updated AskDiff and BidDiff
     */
    function calcRates(updatedRates, ratesModel, spreads) {

        for (var rateProp in updatedRates) {

            if (!updatedRates.hasOwnProperty(rateProp)) {
                continue;
            }

            var pushRate = updatedRates[rateProp];
            var modelRate = ratesModel[pushRate.InstrumentID];
            var spread = spreads[pushRate.InstrumentID];
            calcSingleRate(modelRate, pushRate, spread);
        }

        postMessage(ratesModel); // Send the updated positions list to the service
        running = false;
    }


    function calcSingleRate(rate, pushModel, spread) {

        //First of all calculate the askDiff and bidDiff
        rate.AskDiff  = parseFloat(rate.Ask) - parseFloat(pushModel.Ask);
        rate.BidDiff  = parseFloat(rate.Bid) - parseFloat(pushModel.Bid);

        //Only then override the last ask and bid
        var spreadAsk = Number(spread ? spread.AskMarkup : 0);
        var spreadBid = Number(spread ? spread.BidMarkup : 0);

        rate.Ask      = pushModel.Ask + spreadAsk;
        rate.Bid      = pushModel.Bid + spreadBid;
        rate.Favotire = !!rate.Favotire;
    }

    addEventListener('message', function (e) {
        // doesn't matter what the message is, just toggle the worker
        if (running === false) {
            running = true;
            var updatedRates = e.data.updatedRates;
            var ratesModel = e.data.ratesModel;
            var spreads = e.data.spreads;

            calcRates(updatedRates, ratesModel, spreads);
        }

    });


}());