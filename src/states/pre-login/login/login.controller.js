/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.controller('LoginController', ['authService', '$state', 'loginService', 'attributesService', 'constants', 'translationService', '$q', 'restrictionsService', 'navbarService', LoginController]);

    function LoginController(authService, $state, loginService, attributesService, constants, translationService, $q, restrictionsService, navbarService) {

        var vm = this;
        vm.credentials = {};

        activate();

        function activate() {
            getData();
        };

        function getData() {
            loginService.getMobileBrokersList().then(onBrokerListSuccess, onBrokerListFailed);
        };

        function onBrokerListSuccess(list) {
            vm.brokers = list;
        }

        function onBrokerListFailed(reason) {

        }

        vm.login = function (form) {

            if (form.$invalid)
                return;

            authService.auth(vm.credentials).then(authSuccess, authFailed);
        };

        function authSuccess() {
            $state.go('rates');
        }

        function authFailed(err) {
            vm.loginError = err;
        }

        vm.getAttributesByBroker = function (broker) {

            var attributesPromise = attributesService.getGroupAttributes({
                BrokerID: broker.brokerID,
                ProductID: constants.EP.mobileProductId
            }).then(function(attributes) {
                navbarService.buildSideBar(attributes);
            });

            restrictionsService.buildRestrictions({
                BrokerID: broker.brokerID,
                ProductID: constants.EP.mobileProductId,
                LocationsIDs: 21
            });

            var translationPromise = translationService.getTranslations({
                BrokerID: broker.brokerID,
                ProductID: constants.EP.mobileProductId,
                Culture: "en-US"
            });

            $q.all([attributesPromise, translationPromise])
                .then(function () {
                    vm.brokerLoaded = true;

                });

        };

    }

})(angular.module('tradency.mobile'));