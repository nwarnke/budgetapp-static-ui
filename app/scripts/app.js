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
      }).when('/BudgetsHome',{
      templateUrl: 'views/budgets/BudgetsHome.html',
      controller: 'BudgetsHomeCtrl',
      controllerAs: 'budgetsHome'
      }).when('/budget',{
        templateUrl: 'views/budgets/Budget.html',
        controller: 'BudgetCtrl',
        controllerAs: 'budget'
      }).when('/myAccount',{
      templateUrl: 'views/myAccount.html',
      controller: 'MyAccountCtrl',
      controllerAs: 'myAccount'
    }).when('/logOut',{
      redirectTo: '/'
    }).otherwise({
        redirectTo: '/'
      });
  });
