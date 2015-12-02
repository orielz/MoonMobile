/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.directive('menuBar', ['$rootScope', MenuBar]);

    function MenuBar($rootScope) {

        return {
            restrict: 'E',
            templateUrl: 'components/menu-bar/menu-bar.html',
            scope: {},
            controller: 'MenuBarController',
            controllerAs: 'MenuBar'
        };

    }

})(angular.module('tradency.mobile'));