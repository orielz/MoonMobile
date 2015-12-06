/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.directive('menuBar', ['$state', MenuBar]);

    function MenuBar($state) {

        return {
            restrict: 'E',
            templateUrl: 'components/menu-bar/menu-bar.html',
            scope: {},
            controller: 'MenuBarController',
            controllerAs: 'MenuBar',
            link: link
        };

        function link(scope, iElement, attr, controller) {
            controller.$state = $state;
        }


    }

})(angular.module('tradency.mobile'));