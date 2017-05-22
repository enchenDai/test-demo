(function (window, angular, undefined) {
    'use strict';
    
    angular.module('DeepBlueAdminWebApp.mdPopup', [])
        .factory('popup', [
        '$mdDialog', '$animate', '$mdUtil', '$document', function ($mdDialog, $animate, $mdUtil, $document) {
            
            function showFullscreenBackdrop(dialog) {
                dialog.hasBackdrop = false;
                dialog.fullscreenBackdrop = $mdUtil.createBackdrop(dialog, "md-dialog-backdrop md-opaque md-click-catcher");
                $animate.enter(dialog.fullscreenBackdrop, $document[0].body);
                
                if (dialog.clickOutsideToClose) {
                    var onRemoving = dialog.onRemoving;
                    dialog.onRemoving = function () {
                        $animate.leave(dialog.fullscreenBackdrop);
                        if (onRemoving)
                            onRemoving();
                    };
                    dialog.fullscreenBackdrop.on('click', function () {
                        $mdUtil.nextTick($mdDialog.cancel, true);
                    });
                }
            }
            
            return {
                show: function (dialog) {
                    dialog.parent.css("display", "block");
                    dialog.onRemoving = function () {
                        dialog.parent.css("display", "none");
                    };
                    
                    showFullscreenBackdrop(dialog);
                    
                    $mdDialog.show(dialog);
                }
            };
        }
    ]);
})(window, window.angular);