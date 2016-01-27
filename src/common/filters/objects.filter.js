(function (app) {

    app.filter('objectsFilter', [objectsFilter]);

    function objectsFilter() {

        return function(input, field, query){
            if(!query) return input;
            var result = [];

            angular.forEach(input, function(item){
                if(_.contains(item[field], query))
                    result.push(item);
            });
            return result;
        };

    }

})(angular.module('tradency.mobile'));