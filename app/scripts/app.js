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
      }).when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl'
    }).when('/budget', {
      templateUrl: 'views/budget.html',
      controller: 'BudgetCtrl',
      controllerAs: 'budgetCtrl'
    }).when('/account', {
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl',
      controllerAs: 'accountCtrl'
    }).when('/newbudget',{
      templateUrl: 'views/newbudget.html',
      controller: 'NewBudgetCtrl',
      controllerAs: 'newBudgetCtrl'
    }).when('/logOut', {
      redirectTo: '/'
    }).otherwise({
      redirectTo: '/home'
    });

    $httpProvider.defaults.withCredentials = true;

  }).run(function ($rootScope, $cookies, $location) {
  $rootScope.$on('$routeChangeStart', function () {
    // if route requires auth and user is not logged in
    if (!$cookies.get('authenticated')) {
      // redirect back to login
      $location.path('/');
    }
  });
});
