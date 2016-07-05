'use strict';
angular.module('permanenceStaticUiApp')
  .controller('MyAccountCtrl', MyAccountCtrl);

function MyAccountCtrl($scope) {
  this.scope = $scope;
  this.scope.mainCtrl.showNavBar = true;
  console.log('welcome');
}




