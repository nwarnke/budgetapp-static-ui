'use strict';
angular.module('permanenceStaticUiApp')
  .controller('MyAccountCtrl', MyAccountCtrl);

function MyAccountCtrl($rootScope, $scope) {
  this.scope = $scope;
  this.changingPassword = false;
  this.inEditMode = false;
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  this.initialize();
  console.log('welcome');
}

MyAccountCtrl.prototype.initialize = function() {
  this.changingPassword = false;
}

MyAccountCtrl.prototype.clickChangePassword = function () {
  this.changingPassword = true;
};

MyAccountCtrl.prototype.submitNewPassword = function () {
  this.changingPassword = false;
};
