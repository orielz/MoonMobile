/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function(app) {

    app.controller('MyAccountController', ['$scope', '$log', MyAccountController]);

    function MyAccountController($scope, $log) {

        $log.log('Hello from MyAccountController');

    }

})(angular.module('tradency.mobile'));