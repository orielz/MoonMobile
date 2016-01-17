/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('numericSpinner', ['$timeout', '$compile', numericSpinner]);

    function numericSpinner($timeout, $compile) {

        return {
            require: ['ngModel', '^spinnerContainer'],
            link: link
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

                var data = data.pips;

                if (!data)
                    return;

                ctrl.$setViewValue(data.default);
                isInnerChange = true;

                if (data.max)
                    elem.attr('max', data.max);
                if (data.min)
                    elem.attr('min', data.min);

                ctrl.$render();
                elem.attr('compiled', true);
                $compile(elem)(scope);
            };

            // Get init values
            var data = parentCtrl.init();
            // Init the controls with values
            ctrl.set(data);

            /*
             * Listen to changes on price field and update the pips accordingly
             */
            scope.$watch(attrs.ngModel, function (newVal, oldVal) {

                $timeout(function () {

                    if (newVal && newVal != oldVal && !isInnerChange && ctrl.$valid) {
                        parentCtrl.pipsChanged(newVal, ctrl);
                    }

                    isInnerChange = false;

                }, 0);

            });

        }
    }

})(angular.module('tradency.mobile'));