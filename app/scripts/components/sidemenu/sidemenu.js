(function(window, angular, undefined) {
    'use strict';

    angular.module('DeepBlueAdminWebApp.mdSideMenu', [])
        .provider('mdSideMenuSections', function mdSideMenuSectionsProvider() {
            var _sections = [],
                _theme,
                _palettes;

            this.initWithSections = function(value) {
                _sections = value ? value : [];
            };

            this.initWithTheme = function(value) {
                _theme = value.theme('default');
                value.theme('default').primaryPalette('deepbluePalette', {'default': '500'});
                _palettes = value._PALETTES;
            };

            this.$get = [
                function mdSideMenuSectionsFactory() {
                    var mdSideMenuSections = function() {
                        this.sections = _sections;
                        this.theme = _theme;
                        this.palettes = _palettes;
                    };

                    return new mdSideMenuSections();
                }
            ];
        })
        .factory('mdSideMenuSharedService', [
            '$rootScope',
            function($rootScope) {
                var _sharedService = {};

                _sharedService.broadcast = function(eventName, eventData) {
                    $rootScope.$broadcast(eventName, eventData);
                };

                _sharedService.emit = function(eventName, eventData) {
                    $rootScope.$emit(eventName, eventData);
                };

                return _sharedService;
            }
        ])
        .factory('mdSideMenu', [
            '$rootScope',
            '$location',
            '$state',
            '$stateParams',
            'mdSideMenuSections',
            'mdSideMenuSharedService',
            'Principal',
            'Auth',
            function(
                $rootScope,
                $location,
                $state,
                $stateParams,
                mdSideMenuSections,
                mdSideMenuSharedService,
                Principal,
                Auth) {

                var self,
                    sections = mdSideMenuSections.sections;

                var matchPage = function(section, page, newState) {
                    var toState = newState ? newState.toState : null;

                    if (!toState) {
                        return console.warn('md-sidemenu: `toState` key not found');
                    }

                    if (toState.name !== page.state) {
                        return;
                    }

                    if (!self) {
                        console.warn('md-sidemenu: strange `self` is undef');
                        return;
                    }

                    self.selectSection(section);
                    self.selectPage(section, page);
                };

                var onStateChangeStart = function(event, toState, toParams) {
                    var newState = {
                        toState: toState,
                        toParams: toParams
                    };
                    $rootScope.toState = toState;
                    $rootScope.toParams = toParams;
                    if(Principal.isIdentityResolved){
                        Auth.authorize();
                    }
                    sections.forEach(function(section) {
                        if (section.children) {
                            section.children.forEach(function(child) {
                                if (child.pages) {
                                    child.pages.forEach(function(page) {
                                        matchPage(child, page, newState);
                                    });
                                } else if (child.type === 'link') {
                                    matchPage(child, child, newState);
                                }
                            });
                        } else if (section.pages) {
                            section.pages.forEach(function(page) {
                                matchPage(section, page, newState);
                            });
                        } else if (section.type === 'link') {
                            matchPage(section, section, newState);
                        }
                    });
                };

                self = {
                    sections: sections,
                    forceSelectionWithId: function(id) {
                        mdSideMenuSharedService.broadcast('MD_SIDEMENU_FORCE_SELECTED_ITEM', id);
                    },
                    selectSection: function(section) {
                        self.openedSection = section;
                    },
                    toggleSelectSection: function(section) {
                        self.openedSection = (self.openedSection === section) ? null : section;
                    },
                    isSectionSelected: function(section) {
                        return self.openedSection === section;
                    },
                    selectPage: function(section, page) {
                        self.currentSection = section;
                        self.currentPage = page;
                    },
                    isPageSelected: function(page) {
                        return self.currentPage ? self.currentPage.state === page : false;
                    },
                    setVisible: function(id, value) {
                        if (!Array.prototype.every) {
                            // TODO prototyp for every,
                            // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every;
                            return console.error('every funct not implemented');
                        }

                        self.sections.every(function(section) {
                            if (section.id === id) {
                                section.hidden = !value;
                                return false;
                            }

                            if (section.children) {
                                section.children.every(function(child) {
                                    if (child.id === id) {
                                        child.hidden = !value;
                                        return false;
                                    };

                                    if (child.pages) {
                                        child.pages.every(function(page) {
                                            if (page.id === id) {
                                                page.hidden = !value;
                                                return false;
                                            }

                                            return true;
                                        });
                                    }

                                    return true;
                                });
                            }

                            return true;
                        });
                    },
                    setVisibleFor: function(ids) {
                        if (!Array.prototype.every) {
                            // TODO prototyp for every,
                            // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every;
                            return console.error('every funct not implemented');
                        }

                        ids.forEach(function(id) {
                            self.setVisible(id.id, id.value);
                        });
                    }
                };

                $rootScope.$on('$stateChangeStart', onStateChangeStart);

                onStateChangeStart(null, $state.current, $stateParams);

                return self;
            }
        ])
        .controller('menuToggleCtrl', [
            '$scope',
            '$state',
            'mdSideMenu',
            function(
                $scope,
                $state,
                mdSideMenu) {

                $scope.isOpen = function(section) {
                    return mdSideMenu.isSectionSelected(section);
                };

                $scope.toggle = function(section) {
                    mdSideMenu.toggleSelectSection(section);
                };

                this.isOpen = $scope.isOpen;

                $scope.$on('MD_SIDEMENU_FORCE_SELECTED_ITEM', function(event, args) {
                    if ($scope.section && $scope.section.pages) {
                        for (var i = $scope.section.pages.length - 1; i >= 0; i--) {
                            var _e = $scope.section.pages[i];

                            if (args === _e.id) {
                                $scope.toggle($scope.section);
                                $state.go(_e.state);
                            }
                        };
                    }
                });
            }
        ])
        .controller('menuLinkCtrl', [
            '$scope',
            '$state',
            '$mdSidenav',
            'mdSideMenu',
            'mdSideMenuSharedService',
            function(
                $scope,
                $state,
                $mdSidenav,
                mdSideMenu,
                mdSideMenuSharedService) {

                $scope.isSelected = function(page) {
                    return mdSideMenu.isPageSelected(page);
                };

                $scope.focusSection = function(item) {
                    $mdSidenav('left').close();
                    mdSideMenuSharedService.broadcast('MD_SIDEMENU_CLICK_ITEM', item);
                };

                $scope.$state = $state;
            }
        ])
        .directive('menuLink', [
            function() {
                return {
                    scope: {
                        section: '='
                    },
                    templateUrl: 'scripts/components/sidemenu/sidemenu-link.tpl.html',
                    controller: 'menuLinkCtrl'
                };
            }
        ])
        .directive('menuToggle', [
            '$timeout',
            '$animateCss',
            '$mdSidenav',
            '$mdMedia',
            function(
                $timeout,
                $animateCss,
                $mdSidenav,
                $mdMedia) {

                var link = function($scope, $element, $attr, $ctrl) {
                    var _el_ul = $element.find('ul');

                    var getTargetHeight = function() {
                        var _targetHeight;

                        _el_ul.addClass('no-transition');
                        _el_ul.css('height', '');

                        _targetHeight = _el_ul.prop('clientHeight');

                        _el_ul.css('height', 0);
                        _el_ul.removeClass('no-transition');

                        return _targetHeight;
                    };

                    if (!_el_ul) {
                        return console.warn('md-sidemenu: `menuToggle` cannot find ul element');
                    }

                    $scope.$watch(function() {
                        return $ctrl.isOpen($scope.section);
                    }, function(open) {
                        $timeout(function() {
                            if (!$mdMedia('gt-sm') && !$mdSidenav('left').isOpen() && open) {
                                return;
                            }

                            $animateCss(_el_ul, {
                                from: {
                                    height: open ? 0 : (getTargetHeight() + 'px')
                                },
                                to: {
                                    height: open ? (getTargetHeight() + 'px') : 0
                                },
                                duration: 0.3
                            }).start();
                        }, 0, false);
                    });
                };

                return {
                    scope: {
                        section: '='
                    },
                    templateUrl: 'scripts/components/sidemenu/sidemenu-toggle.tpl.html',
                    controller: 'menuToggleCtrl',
                    link: link
                };
            }
        ])
        .directive('mdSidemenu', [
            function() {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        menu: '='
                    },
                    templateUrl: 'scripts/components/sidemenu/sidemenu.tpl.html'
                };
            }
        ])
        .directive('ssStyleColor', [
            'mdSideMenuSections',
            function(mdSideMenuSections) {
                return {
                    restrict: 'A',
                    scope: {
                        ssStyleColor: '='
                    },
                    link: function($scope, $el) {

                        var _apply_color = function() {
                            for (var p in $scope.ssStyleColor) {
                                if ($scope.ssStyleColor.hasOwnProperty(p)) {
                                    if(($scope.ssStyleColor[p].indexOf('#') != -1)){
                                        $el.css(p, $scope.ssStyleColor[p]);
                                        if ($el.parent().attr('md-component-id')) $el.parent().css('color', '#fff');
                                        return;
                                    }
                                    var themeColors = mdSideMenuSections.theme.colors,
                                        split = ($scope.ssStyleColor[p] || '').split('.'),
                                        hueR,
                                        colorR,
                                        colorA,
                                        hueA,
                                        colorValue;

                                    if (split.length < 2) {
                                        split.unshift('primary');
                                    }

                                    hueR = split[1] || 'hue-1'; // 'hue-1'
                                    colorR = split[0] || 'primary'; // 'warn'

                                    // Absolute color: 'orange'
                                    colorA = themeColors[colorR] ? themeColors[colorR].name : colorR;

                                    // Absolute Hue: '500'
                                    hueA = themeColors[colorR] ? (themeColors[colorR].hues[hueR] || hueR) : hueR;

                                    colorValue = mdSideMenuSections.palettes[colorA][hueA] ? mdSideMenuSections.palettes[colorA][hueA].value : mdSideMenuSections.palettes[colorA]['500'].value;

                                    $el.css(p, 'rgb(' + colorValue.join(',') + ')');

                                    // Add color to md-sidenav
                                    if ($el.parent().attr('md-component-id')) $el.parent().css(p, 'rgb(' + colorValue.join(',') + ')');
                                }else{

                                }
                            }
                        };

                        if (!mdSideMenuSections.theme || !mdSideMenuSections.palettes) {
                            return console.warn('md-sidemenu: you probably want to mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider)');
                        }

                        $scope.$watch('ssStyleColor', function(oldVal, newVal) {
                            if ((oldVal && newVal) && oldVal !== newVal) {
                                _apply_color();
                            }
                        });

                        _apply_color();
                    }
                };
            }
        ]);


})(window, window.angular);
