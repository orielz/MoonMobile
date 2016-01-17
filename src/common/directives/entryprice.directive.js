/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('entryPrice', ['$timeout', '$parse', 'validationHelperService', '$compile','$compile', entryPrice]);

    function entryPrice($timeout, $parse, validationHelperService, $compile) {

        return {
            require: 'ngModel',
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

                var compile = false;
                var action = $parse(attrs.action)(scope);
                var rate = $parse(attrs.rate)(scope);
                var orderType = $parse(attrs.orderType)(scope);

                if (orderType != 'Market' && rate) {

                    var entryValues = validationHelperService.calcEntryPrice(action, orderType, rate);

                    ctrl.$setViewValue(entryValues.default);
                    elem.attr('max', entryValues.max);
                    elem.attr('min', entryValues.min);
                    ctrl.$render();

                    compile = true;
                }

                if (compile) {

                    if (!elem.attr('compiled')) {

                        elem.attr('compiled', true);
                        $compile(elem)(scope);
                    } else {
                        $timeout(function () {
                            elem.removeAttr('compiled');
                        }, 0);
                    }
                }

            }

        }
    }

})(angular.module('tradency.mobile'));