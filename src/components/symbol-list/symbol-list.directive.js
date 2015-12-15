/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('symbolList', ['ratesModel', SymbolList]);

    function SymbolList(ratesModel) {

        return {
            restrict: 'A',
            templateUrl: 'components/symbol-list/symbol-list.html',
            scope: {},
            link: link
        };

        function link(scope, iElement, attr, controller) {

            scope.model = ratesModel.model;

            scope.$emit('onSymbolListReady');
        }
    }

})(angular.module('tradency.mobile'));