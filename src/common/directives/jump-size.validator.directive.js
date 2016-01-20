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

            ngModel.$parsers.unshift(function (value) {
                ngModel.$setValidity('step', (value / step) % 1 === 0);
                return value;
            });
        }
    }

})(angular.module('tradency.mobile'));