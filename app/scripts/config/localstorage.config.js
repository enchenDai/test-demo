(function () {
    'use strict';
    angular.module('DeepBlueAdminWebApp')
        .config(LocalStorageConfig)
    LocalStorageConfig.inject = ['localStorageServiceProvider'];
    function LocalStorageConfig(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('deepblue');
    }
})();
