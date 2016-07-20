'use strict';

/**
 * @ngdoc overview
 * @name budgetApp
 * @description
 * # budgetApp
 *
 * Main module of the application.
 */
angular
  .module('budgetApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      }).when('/home',{
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl'
      }).when('/budget',{
        templateUrl: 'views/budget.html',
        controller: 'BudgetCtrl',
        controllerAs: 'budgetCtrl'
      }).when('/account',{
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl',
      controllerAs: 'accountCtrl'
    }).when('/logOut',{
      redirectTo: '/'
    }).otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.withCredentials = true;

  });
