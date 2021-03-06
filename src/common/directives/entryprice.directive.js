/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('entryPrice', ['$timeout', '$parse', 'validationHelperService', '$compile', '$compile', entryPrice]);

    function entryPrice($timeout, $parse, validationHelperService, $compile) {

        return {
            require: 'ngModel',
            scope: true,
            priority: 1, // Higher priority than the other directives cause the other depends on this directive
            link: link
        };

        function link(scope, elem, attrs, ctrl) {

            scope.$watch(attrs.rate, function (rate) {
                onCalcEntryPrice();
            });

            scope.$watch(attrs.action, function (action) {
                onCalcEntryPrice();
            });

            scope.$watch(attrs.orderType, function (orderType) {
                onCalcEntryPrice();
            });

            function onCalcEntryPrice() {

                var action = $parse(attrs.action)(scope);
                var rate = $parse(attrs.rate)(scope);
                var orderType = $parse(attrs.orderType)(scope);

                if (orderType != 'Market' && rate) {

                    var entryValues = validationHelperService.calcEntryPrice(action, orderType, rate);
                    scope.max = entryValues.max;
                    scope.min = entryValues.min;
                    scope.form.entryPrice.minValue = entryValues.min;
                    scope.form.entryPrice.maxValue = entryValues.max;

                    scope.$applyAsync(function () {
                        ctrl.$setViewValue(entryValues.default.toString());
                        ctrl.$render();
                    });

                }
            }

        }
    }

})(angular.module('tradency.mobile'));