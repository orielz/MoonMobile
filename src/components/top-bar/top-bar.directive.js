/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.directive('topBar', TopBar);

    function TopBar() {

        return {
            restrict: 'E',
            templateUrl: 'components/top-bar/top-bar.html',
            scope: {},
            controller: 'TopBarController',
            controllerAs: 'TopBar'
        };
    }

})(angular.module('tradency.mobile'));