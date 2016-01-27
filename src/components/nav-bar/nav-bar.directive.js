/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.directive('navBar', ['$state', navBar]);

    function navBar($state) {

        return {
            restrict: 'E',
            templateUrl: 'components/nav-bar/nav-bar.html',
            scope: {},
            controller: 'NavBarController',
            controllerAs: 'nav',
            link: link
        };

        function link(scope, iElement, attr, controller) {
            controller.$state = $state;
        }


    }

})(angular.module('tradency.mobile'));