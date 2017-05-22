angular.module('DeepBlueAdminWebApp')
    .directive('digitalInput', function() {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function(scope, element, attributes, ngModel) {
                element.bind('input', function () {
                    var number = ngModel.$viewValue.replace(/\D/g,'');
                    scope.$apply(function() {
                        setValue(number);
                    });
                });
                function setValue(value) {
                    ngModel.$setViewValue(value);//change value in model
                    element.val(value);//change value in view(which is displayed)
                }
            }
        }

    });
