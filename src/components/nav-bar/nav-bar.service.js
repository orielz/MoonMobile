/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {
    'use strict';

    var serviceId = 'navbarService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', navbarService]);

    function navbarService(constants, $http, $q, $localStorage) {

        var model = {};

        return {
            buildSideBar: buildSideBar,
            getSideBar: getSideBar
        };

        function buildSideBar(attributes) {

            var attributes = attributes.GroupAttributes;

            for(var attr in attributes){
                if (!attributes.hasOwnProperty(attr)) {
                    continue;
                }

                if (_.endsWith(attr, "_SUBTABS")) {

                    var subTabObj = attributes[attr]["AttributeValue"];
                    console.log(subTabObj);
                    var subTabValues = [];

                    for(var subTabValue in subTabObj){
                        if (!attributes.hasOwnProperty(attr)) {
                            continue;
                        }

                        model[subTabValue] = "Kfir";
                    }
                }
            }
            console.log(model);
            console.log(attributes);
        }

        function getSideBar() {
            // To return the model
            return model;
        }
    }

})(angular.module('tradency.mobile'));