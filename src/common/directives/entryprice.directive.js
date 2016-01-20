/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('entryPrice', ['$timeout', '$parse', 'validationHelperService', '$compile', '$compile', entryPrice]);

    function entryPrice($timeout, $parse, validationHelperService, $compile) {

        return {
            require: 'ngModel',
            scope: true,
            priority: 1,
            link: link
        };

        function link(scope, elem, attrs, ctrl) {

            scope.$watch(attrs.rate, function (rate) {
                recompile();
            });

            scope.$watch(attrs.action, function (action) {
                recompile();
            });

            scope.$watch(attrs.orderType, function (orderType) {
                recompile();
            });

            function recompile() {

                var action = $parse(attrs.action)(scope);
                var rate = $parse(attrs.rate)(scope);
                var orderType = $parse(attrs.orderType)(scope);

                if (orderType != 'Market' && rate) {

                    var entryValues = validationHelperService.calcEntryPrice(action, orderType, rate);
                    scope._maxEntryPrice = entryValues.max;
                    scope._minEntryPrice = entryValues.min;

                    scope.$applyAsync(function() {
                        ctrl.$setViewValue(entryValues.default.toString());
                        ctrl.$render();
                    });
                }


            }

        }
    }

})(angular.module('tradency.mobile'));