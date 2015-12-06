/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.controller('MenuBarController', ['$scope', '$state', MenuBar]);

    function MenuBar($scope, $state) {
        $scope.$state = $state;
    }

})(angular.module('tradency.mobile'));