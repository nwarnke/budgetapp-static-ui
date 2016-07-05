'use strict';
angular.module('permanenceStaticUiApp')
  .controller('MyAccountCtrl', MyAccountCtrl);

function MyAccountCtrl($rootScope) {
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  console.log('welcome');
}




