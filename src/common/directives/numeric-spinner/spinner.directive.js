/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.directive('numericSpinner', ['$timeout', '$compile', numericSpinner]);

    function numericSpinner($timeout, $compile) {

        return {
            require: ['ngModel', '^spinnerContainer'],
            scope: true,
            link: link
        };

        function link(scope, elem, attrs, controllers) {

            var isInnerChange = false;

            // This check performed in order to not $compile this directive twice
            if (elem.attr('compiled')) {

                elem.removeAttr('compiled');

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

                if (data.max)
                    scope.max = data.max;
                if (data.min)
                    scope.min = data.min;

                //ctrl.$render();
                isInnerChange = true;
                //elem.attr('compiled', true);
                //$compile(elem)(scope);

                ctrl.$setViewValue(data.default.toString());
                ctrl.$render();

            };

            $timeout(function() {
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
                        parentCtrl.pipsChanged(newVal, ctrl);
                    }

                    isInnerChange = false;

                }, 0);

            });

        }
    }

})(angular.module('tradency.mobile'));