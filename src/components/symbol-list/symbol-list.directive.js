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

            scope.$on('onRatesUpdate', function (currentScope, updatedRates) {

                // Loop through rates push update array
                _.each(updatedRates, function (updatedModel) {

                    // If the existing model contains the push object, store the model in variable
                    var model = _.where(scope.model, {InstrumentID: updatedModel.InstrumentID})[0];

                    $timeout(function () {

                        if (model)
                            $.extend(model, updatedModel); // Update an existing model
                        else if (scope.model)
                            scope.model.push(updatedModel); // Add new model

                    }, 0);

                });

            });

            scope.$emit('onSymbolListReady');
        }


    }

})(angular.module('tradency.mobile'));