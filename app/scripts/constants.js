angular.module("DeepBlueAdminWebApp")
    .constant('LocalStorageKeys', {

    })
    // enable lodash
    .constant('_',
        window._)
    .constant('DatePickI18N', {
        'zh_cn': {
            'weekdays': ['日', '一', '二', '三', '四', '五', '六'],
            'months': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            'ok': '确认',
            'cancel': '取消'
        }
    })
;
