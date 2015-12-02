/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('symbolList', ['$timeout', SymbolList]);

    function SymbolList($timeout) {

        return {
            restrict: 'A',
            templateUrl: 'components/symbol-list/symbol-list.html',
            scope: {},
            link: link
        };

        function link(scope, iElement, attr, controller) {

            scope.$on('onRatesModel', function (currentScope, model) {
                $timeout(function () {
                    scope.model = model;
                }, 0);
            });

            scope.$on('onRatesPushModel', function (currentScope, ratesList) {

                // Loop through rates push update array
                _.each(ratesList, function (pushModel) {

                    // Convert the InstrumentID from number to string
                    pushModel.InstrumentID = pushModel.InstrumentID.toString();

                    // If the existing model contains the push object, store the model in variable
                    var model = _.where(scope.model, {InstrumentID: pushModel.InstrumentID})[0];

                    $timeout(function () {

                        if (model)
                            $.extend(model, pushModel);
                        else
                            scope.model.push(pushModel);

                    }, 0);

                });

            });

            scope.$emit('onSymbolListReady');
        }


    }

})(angular.module('tradency.mobile'));