(function () {
    'use strict';
    angular
        .module('DeepBlueAdminWebApp')
        .config(translationConfig)
        .factory('translationStorageProvider', translationStorageProvider);

    translationConfig.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider', '$mdDateLocaleProvider','$sessionStorageProvider'];
    function translationConfig($translateProvider, tmhDynamicLocaleProvider, $mdDateLocaleProvider,$sessionStorageProvider) {
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });
        //if($sessionStorageProvider.get('lang')){
            $translateProvider.preferredLanguage($sessionStorageProvider.get('lang'));
        //}else{
        //    $translateProvider.determinePreferredLanguage();
        //}
        //$translateProvider.preferredLanguage('en');
        $translateProvider.useStorage('translationStorageProvider');
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

        tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.useCookieStorage();
        tmhDynamicLocaleProvider.storageKey('NG_TRANSLATE_LANG_KEY');
        $mdDateLocaleProvider.shortDays = ['日', '一', '二', '三', '四', '五', '六'];
    }

    translationStorageProvider.$inject = ['$cookies', '$log', 'LANGUAGES'];
    function translationStorageProvider($cookies, $log, LANGUAGES) {
        return {
            get: get,
            put: put
        };

        function get(name) {
            if (LANGUAGES.indexOf($cookies.getObject(name)) === -1) {
                $log.info('Resetting invalid cookie language "' + $cookies.getObject(name) + '" to prefered language "zh_cn"');
                $cookies.putObject(name, 'zh_cn');
            }
            return $cookies.getObject(name);
        }

        function put(name, value) {
            $cookies.putObject(name, value);
        }
    }
})();
