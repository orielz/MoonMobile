/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.directive('step', ['$timeout', step]);

    function step($timeout) {

        return {
            require: 'ngModel',
            link: link
        };

        function link(scope, elem, attrs, ngModel) {

            var step = attrs.step;

            //scope.$watch(attrs.ngModel, function (newVal, oldVal) {
            //
            //    //if (!newVal || !oldVal || newVal % step === 0) {
            //    //    return;
            //    //}
            //
            //    if (!newVal)
            //        return;
            //
            //    var fixedValue = newVal;
            //
            //    // Value increased
            //    if (newVal > oldVal) {
            //        for (var i = 0; i < step; i++) {
            //
            //            fixedValue++;
            //
            //            if (fixedValue % step === 0) {
            //                break;
            //            }
            //        }
            //    }
            //
            //    // Value decreased
            //    if (newVal < oldVal) {
            //        for (var i = step; i > 0; i--) {
            //
            //            fixedValue--;
            //
            //            if (fixedValue % step === 0) {
            //                break;
            //            }
            //        }
            //    }
            //
            //    if (fixedValue < step)
            //        fixedValue = step;
            //
            //    $timeout(function() {
            //        ngModel.$setViewValue(fixedValue);
            //        ngModel.$render();
            //    },0);
            //
            //});

            ngModel.$parsers.unshift(function (value) {
                ngModel.$setValidity('step', (value / step) % 1 === 0);
                return value;
            });
        }
    }

})(angular.module('tradency.mobile'));