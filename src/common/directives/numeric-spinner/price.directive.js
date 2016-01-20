/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('numericPrice', ['$timeout', '$parse', '$compile', numericPrice]);

    function numericPrice($timeout, $parse, $compile) {

        return {
            require: ['ngModel', '^spinnerContainer'],
            link: link,
            scope: true
        };

        function link(scope, elem, attrs, controllers) {

            var isInnerChange = false;

            // This check performed in order to not $compile this directive twice
            if (elem.attr('compiled')) {

                $timeout(function () {
                    elem.removeAttr('compiled');
                }, 0);

                return;
            }

            var ctrl = controllers[0];
            var parentCtrl = controllers[1];

            parentCtrl.register(ctrl);

            /*
             * Receive default, minimum and maximum values and recompile the element
             * (Write this function on the controller in order to access the elem and scope params from link)
             * @param {object} data - the params
             */
            ctrl.set = function (data) {

                var data = data.price;

                if (!data)
                    return;

                if (data.max)
                    scope.max = data.max;
                if (data.min)
                    scope.min = data.min;

                elem.attr('compiled', true);

                isInnerChange = true;

                $timeout(function () {
                    ctrl.$setViewValue(data.default.toString());
                    ctrl.$render();
                }, 0);
            };

            $timeout(function () {
                // Get init values
                var data = parentCtrl.init();
                // Init the controls with values
                ctrl.set(data);
            }, 0);


            /*
             * Listen to changes on price field and update the pips accordingly
             */
            scope.$watch(attrs.ngModel, function (newVal, oldVal) {

                $timeout(function () {

                    if (newVal && newVal != oldVal && !isInnerChange && ctrl.$valid) {
                        parentCtrl.priceChanged(newVal, ctrl);
                    }

                    isInnerChange = false;

                }, 0);

            });
        }
    }

})(angular.module('tradency.mobile'));