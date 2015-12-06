/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('openPositionsList', ['$timeout', openPositionsList]);

    function openPositionsList($timeout) {

        return {
            restrict: 'A',
            templateUrl: 'components/open-positions-list/open-positions.html',
            scope: {},
            link: link
        };

        function link(scope, iElement, attr, controller) {

            scope.$on('onOpenPositionsModel', function (currentScope, model) {
                $timeout(function () {
                    scope.model = model;
                }, 0);
            });

            scope.$on('onOpenPositionsPushModel', function (currentScope, pushModel) {

                // If the existing model contains the push object, store the model in variable
                var model = _.where(scope.model, {PositionID: pushModel.PositionID})[0];

                $timeout(function () {

                    if (model)
                        model.Pips = pushModel.Pips; // Update an existing model
                    else if (scope.model)
                        scope.model.push(pushModel); // Add new model

                }, 0);

            });

            scope.$emit('onOpenPositionsListReady');
        }
    }

})(angular.module('tradency.mobile'));