/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.directive('jumpSize', ['$timeout', jumpSize]);

    function jumpSize($timeout) {

        return {
            require: 'ngModel',
            link: link
        };

        function link(scope, elem, attrs, ngModel) {

            var jumpSize = attrs.jumpSize;

            scope.$watch(attrs.ngModel, function (newVal, oldVal) {

                if (!newVal || !oldVal || newVal % jumpSize === 0) {
                    return;
                }

                var fixedValue = newVal;

                // Value increased
                if (newVal > oldVal) {
                    for (var i = 0; i < jumpSize; i++) {

                        fixedValue++;

                        if (fixedValue % jumpSize === 0) {
                            break;
                        }
                    }
                }

                // Value decreased
                if (newVal < oldVal) {
                    for (var i = jumpSize; i > 0; i--) {

                        fixedValue--;

                        if (fixedValue % jumpSize === 0) {
                            break;
                        }
                    }
                }

                $timeout(function() {
                    ngModel.$setViewValue(fixedValue);
                    ngModel.$render();
                },0);

            });

            ngModel.$parsers.unshift(function (value) {
                ngModel.$setValidity('jumpsize', value % jumpSize === 0);
                return value;
            });
        }
    }

})(angular.module('tradency.mobile'));