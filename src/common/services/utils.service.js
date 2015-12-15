(function (app) {
    'use strict';

    var serviceId = 'utilsService';

    app.factory(serviceId, ['constants', '$http', '$q', '$localStorage', utilsService]);

    function utilsService(constants, $http, $q, $localStorage) {

        return {
            addOrUpdateList: addOrUpdateList,
            addOrUpdateSingle: addOrUpdateSingle
        };

        /*
        * Update list of objects \ array
        * @param {object or []} listToUpdate - array or list objects
        * @param {object or []} updatedList - list to be merged into listToUpdate
        * @Return {object or []} listToUpdate - The updated list
         */
        function addOrUpdateList(listToUpdate, updatedList, identifier) {

            if (!listToUpdate || !updatedList)
                return;

            if ($.type(listToUpdate) === 'object')
                return new addOrUpdateListObjects(listToUpdate, updatedList, identifier);
            else if ($.type(listToUpdate) === 'array')
                throw new Error('Not implemented', 'utils.service.js', 21);
        }


        /*
         * Update list of objects \ array
         * @param {object or []} listToUpdate - array or list objects
         * @param {object} item - single object to be merged into listToUpdate
         * @Return {object or []} listToUpdate - The updated list
         */
        function addOrUpdateSingle(listToUpdate, item, identifier) {

            if (!listToUpdate || !item)
                return;

            if ($.type(listToUpdate) === 'object')
                return new addOrUpdateSingleObject(listToUpdate, item, identifier);
            else if ($.type(listToUpdate) === 'array')
                throw new Error('Not implemented', 'utils.service.js', 21);
        }


        function addOrUpdateListObjects(listToUpdate, dataArray, identifier) {

            // Loop through rates push update array
            _.each(dataArray, function (updatedModel) {

                // If the existing model contains the push object, store the model in variable
                var modelId = updatedModel[identifier];
                var model = listToUpdate[modelId];

                if (model)
                    $.extend(model, updatedModel); // Update an existing model
                else if (listToUpdate)
                    listToUpdate[modelId] = updatedModel;
            });

        }

        function addOrUpdateSingleObject(listToUpdate, item, identifier) {

            var modelId = item[identifier];
            var model = listToUpdate[modelId];

            if (model)
                $.extend(model, item); // Update an existing model
            else if (listToUpdate)
                listToUpdate[modelId] = item;
        }


    }

})(angular.module('tradency.mobile'));