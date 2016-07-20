'use strict';
angular.module('budgetApp')
  .controller('AccountCtrl', AccountCtrl);

function AccountCtrl($rootScope, $scope) {
  this.scope = $scope;
  this.changingPassword = false;
  this.inEditMode = false;
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  this.initialize();
  console.log('welcome');
}

AccountCtrl.prototype.initialize = function() {
  this.changingPassword = false;
};

AccountCtrl.prototype.clickChangePassword = function () {
  this.changingPassword = true;
};

AccountCtrl.prototype.submitNewPassword = function () {
  this.changingPassword = false;
};
