(function () {
    var app = angular.module('tradency.mobile', [
        'ui.router',
        'ngStorage',
        'ngAnimate'
    ]);


    function isEmpty(value) {
        return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    app.directive('validationMin', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.validationMin, function () {
                    ctrl.$setViewValue(ctrl.$viewValue);
                });
                var minValidator = function (value) {
                    var min = scope.$eval(attr.validationMin) || 0;
                    if (!isEmpty(value) && value < min) {
                        ctrl.$setValidity('validationMin', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('validationMin', true);
                        return value;
                    }
                };

                ctrl.$parsers.push(minValidator);
                ctrl.$formatters.push(minValidator);
            }
        };
    });

    app.directive('validationMax', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.validationMax, function () {
                    ctrl.$setViewValue(ctrl.$viewValue);
                });
                var maxValidator = function (value) {
                    var max = scope.$eval(attr.validationMax) || Infinity;
                    if (!isEmpty(value) && value > max) {
                        ctrl.$setValidity('validationMax', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('validationMax', true);
                        return value;
                    }
                };

                ctrl.$parsers.push(maxValidator);
                ctrl.$formatters.push(maxValidator);
            }
        };
    });


    $(document).foundation();

})();