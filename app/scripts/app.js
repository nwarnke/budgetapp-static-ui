'use strict';

/**
 * @ngdoc overview
 * @name permanenceStaticUiApp
 * @description
 * # permanenceStaticUiApp
 *
 * Main module of the application.
 */
angular
  .module('permanenceStaticUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
