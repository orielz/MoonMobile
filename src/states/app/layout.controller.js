/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.controller('LayoutController', ['$scope', '$log', LayoutController]);

    function LayoutController($scope, $log) {

        var vm = this;

        vm.layoutInitialized = function() {

            var leftCanvas = $('#offCanvasLeft');
            var rightCanvas = $('#offCanvasRight');
            new Foundation.OffCanvas(leftCanvas);
            new Foundation.OffCanvas(rightCanvas);

        };

    }

})(angular.module('tradency.mobile'));