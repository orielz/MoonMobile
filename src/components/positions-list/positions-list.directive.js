/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('openPositionsList', ['$timeout', 'positionsModel', openPositionsList]);

    function openPositionsList($timeout, positionsModel) {

        return {
            restrict: 'A',
            templateUrl: 'components/positions-list/positions-list.html',
            scope: {},
            link: link
        };

        function link(scope, iElement, attr, controller) {

            scope.model = positionsModel.model;

            scope.$emit('onOpenPositionsListReady');
        }
    }

})(angular.module('tradency.mobile'));