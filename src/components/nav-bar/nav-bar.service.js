(function (app) {
    'use strict';

    var serviceId = 'navbarService';

    app.factory(serviceId, [navbarService]);

    function navbarService() {

        var navBarModel = {
            help: []
        };

        return {
            buildSideBar: buildSideBar,
            getNavBar: getNavBar
        };

        /*
         * Add the current tab to the requested model
         * @param attribute - {object} the attribute from attributes json
         * @return undefined
         */
        function buildSideBar(attributes) {

            var subTabPrefix = "_SUBTABS";
            var helpPrefix = "HELP_";
            var attributes = attributes.GroupAttributes;

            for (var name in attributes) {

                if (!attributes.hasOwnProperty(name)) {
                    continue;
                }

                var attribute = attributes[name];

                if (_.endsWith(name, subTabPrefix)) {
                    var name = Object.keys(attribute["AttributeValue"])[0];
                    var model = attribute["AttributeValue"][name];
                    addTabToModel(name, model);
                }
                else if (_.startsWith(name, helpPrefix))
                    addHelpToModel(attribute);

            }
        }

        /*
         * Add the current tab to the requested navBarModel
         * @param attribute - {object} the attribute from attributes json that end with "_SUBTABS"
         * @return undefined
         */
        function addTabToModel(parentName, model) {

            navBarModel[parentName] = [];

            // Iterate over the sent attribute
            for (var childName in model) {

                var tab = model[childName];

                var item = {
                    name: childName,
                    translationKey: tab.translateKey,
                    order: tab.order
                };

                navBarModel[parentName].push(item);
            }
        }

        /*
         * Add the current help section to the requested navBarModel
         * @param attribute - {object} the attribute from attributes json that start with "HELP_"
         * @return undefined
         */
        function addHelpToModel(attribute) {

            var item = {
                name: attribute.AttributeName,
                translationKey: attribute.AttributeName,
                value: attribute.AttributeValue
            };

            navBarModel.help.push(item);
        }

        /*
         * Return the navBarModel Object
         * @param attribute - undefined
         * @return - {object} the navigation bar model
         */
        function getNavBar() {
            // To return the model
            return navBarModel;
        }
    }

})(angular.module('tradency.mobile'));