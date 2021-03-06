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

                if (data.max) {
                    scope.max = data.max;
                    scope.form[ctrl.$name].maxValue = data.max;
                }

                if (data.min) {
                    scope.min = data.min;
                    scope.form[ctrl.$name].minValue = data.min;
                }

                $timeout(function() {
                    ctrl.$setViewValue(data.default.toString());
                    ctrl.$render();
                }, 0);


            };

            /*
             * Listen to changes on price field and update the pips accordingly
             */
            elem.on('change', function(e) {
                parentCtrl.pipsChanged(ctrl.$modelValue, ctrl);
            });

        }
    }

})(angular.module('tradency.mobile'));