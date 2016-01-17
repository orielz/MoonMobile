(function (app) {
    'use strict';

    var serviceId = 'orderService';

    app.factory(serviceId, ['validationHelperService', 'restrictionsService', orderService]);

    function orderService(validationHelperService, restrictionsService) {

        return {

        };


    }

})(angular.module('tradency.mobile'));