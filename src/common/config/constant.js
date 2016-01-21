/**
 * Created by oriel.zaken on 11/30/2015.
 */
(function (app) {

    app.constant('constants', {

        EP: {
            mobileProductId: 4,
            authUrl: 'http://mws.tradency.com/authentication',
            getUserDataUrl: 'http://mws.tradency.com/UserData/GetUserData',
            signalRUrl: 'http://192.168.1.34:8081/signalr',
            getOpenPositions: 'http://mws.tradency.com/Positions/GetPositions',
            getRatesUrl: 'http://mws.tradency.com/Rates/GetRates',
            getSpreadsUrl: 'http://mws.tradency.com/Spreads/GetSpreads',
            createConfirmationCodeUrl: 'http://mws.tradency.com/UserManager/CreateConfirmationCode',
            isConfirmationCodeValidUrl: 'http://mws.tradency.com/UserManager/IsConfirmationCodeValid',
            updateNewPasswordUrl: 'http://mws.tradency.com/UserManager/updateNewPassword',
            getMobileBrokersListUrl: 'http://mws.tradency.com/MobileDeviceController/GetMobileBrokersList',
            getGroupAttributesUrl: 'http://mws.tradency.com/GroupAttributes/GetGroupAttributes',
            getTranslationsUrl: 'http://mws.tradency.com/GroupTranslations/GetTranslations',
            openUserMarketOrderUrl: 'http://mws.tradency.com/Signals/OpenUserMarketOrder'
        },
        accountTypes: {
            1: '_MICRO',
            2: '_MINI',
            3: '_STANDARD'
        },
        orderActions: {
            1: 'Sell',
            2: 'Buy'
        },
        orderTypes: {
            1: 'Market',
            2: 'Stop',
            3: 'Limit'
        }


    });

})(angular.module('tradency.mobile'));