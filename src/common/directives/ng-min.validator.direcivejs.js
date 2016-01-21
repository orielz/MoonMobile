/**
 * Created by oriel.zaken on 1/20/2016.
 */

/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    function isEmpty(value) {
        return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    app.directive('ngMin', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngMin, function () {
                    ctrl.$setViewValue(ctrl.$viewValue);
                });
                var minValidator = function (value) {
                    var min = scope.$eval(attr.ngMin) || 0;
                    if (!isEmpty(value) && value < min) {
                        ctrl.$setValidity('ngMin', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('ngMin', true);
                        return value;
                    }
                };

                ctrl.$parsers.push(minValidator);
                ctrl.$formatters.push(minValidator);
            }
        };
    });

})(angular.module('tradency.mobile'));