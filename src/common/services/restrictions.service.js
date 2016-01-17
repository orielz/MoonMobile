/**
 * Build restrictions list per account type from attributes files
 */
(function (app) {
    'use strict';

    var serviceId = 'restrictionsService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', 'attributesService', 'utilsService', restrictionsService]);

    function restrictionsService(constants, $http, $q, $localStorage, attributesService, utilsService) {

        var model = {};

        return {
            buildRestrictions: buildRestrictions,
            getRestrictions: getRestrictions
        };

        function buildRestrictions(model) {
            attributesService.getGroupAttributes(model)
                .then(getRestrictionsFromAttributes);
        }

        function getRestrictions() {
            return model;
        }

        function getRestrictionsFromAttributes(data) {

            var accountSizeTypeID = $localStorage.userData.AccountSizeTypeID;
            var accountType = constants.accountTypes[accountSizeTypeID];
            var attributes = data.GroupAttributes;
            var otherAccountTypes = utilsService.getOtherThan(constants.accountTypes, accountType);

            for (var attr in attributes) {

                if (!attributes.hasOwnProperty(attr)) {
                    continue;
                }

                var attribute = attributes[attr];

                // Add relevant restrictions by account type

                if (_.endsWith(attribute.AttributeName, accountType)) {

                    addAttribute(attribute.AttributeName, attribute.AttributeValue, accountType);
                    continue;
                }

                // Add relevant restrictions which are GLOBAL and not related to specific account type (does not match other account types)
                var isGlobalAttribute = true;

                _.each(otherAccountTypes, function (accountType) {
                    if (_.endsWith(attribute.AttributeName, accountType)) {
                        isGlobalAttribute = false;
                    }
                });

                if (isGlobalAttribute) {
                    addAttribute(attribute.AttributeName, attribute.AttributeValue);
                    continue;
                }
            }
        }

        function addAttribute(key, value, accountType) {

            if (accountType) {
                key = key.replace(accountType, '');
            }

            if (!isNaN(parseFloat(value)))
                value = parseFloat(value);

            model[key] = value;
        }

    }

})(angular.module('tradency.mobile'));