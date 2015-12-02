/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.constant('constants', {

        DEV: {
            authUrl: 'http://mws.tradency.com/authentication',
            getUserDataUrl: 'http://mws.tradency.com/UserData/GetUserData',
            signalRUrl: 'http://192.168.1.34:8081/signalr'
        },
        PROD: {}


    });

})(angular.module('tradency.mobile'));