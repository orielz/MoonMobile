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

            for (var attr in attributes) {

                if (!attributes.hasOwnProperty(attr)) {
                    continue;
                }

                var attribute = attributes[attr];

                if (_.endsWith(attr, subTabPrefix))
                    addTabToModel(attribute);
                else if (_.startsWith(attr, helpPrefix))
                    addHelpToModel(attribute);

            }
        }

        /*
         * Add the current tab to the requested navBarModel
         * @param attribute - {object} the attribute from attributes json that end with "_SUBTABS"
         * @return undefined
         */
        function addTabToModel(attribute) {

            attribute = attribute["AttributeValue"];

            // Iterate over the sent attribute
            for (var attr in attribute) {

                navBarModel[attr] = [];
                var subTabs = attribute[attr];

                for (var prop in subTabs) {

                    var item = {
                        name: subTabs[prop].translateKey,
                        order: subTabs[prop].order
                    };

                    navBarModel[attr].push(item);
                }
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