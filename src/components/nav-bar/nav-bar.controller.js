/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.controller('NavBarController', ['$scope', '$state', 'navbarService', NavBar]);

    function NavBar($scope, $state, navbarService) {

        var vm = this;

        vm.model = navbarService.getNavBar();
    }

})(angular.module('tradency.mobile'));