/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.directive('titleBar', TitleBar);

    function TitleBar() {

        return {
            restrict: 'E',
            templateUrl: 'components/title-bar/title-bar.html',
            scope: {},
            controller: 'TitleBarController',
            controllerAs: 'TitleBar'
        };
    }

})(angular.module('tradency.mobile'));