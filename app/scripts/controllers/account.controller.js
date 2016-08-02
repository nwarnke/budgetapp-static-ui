'use strict';
angular.module('budgetApp')
  .controller('AccountCtrl', AccountCtrl);

function AccountCtrl($rootScope, $scope) {
  this.scope = $scope;
  this.changingPassword = false;
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  this.initialize();
  console.log('on Account page');
}

AccountCtrl.prototype.initialize = function() {
  var vm = this;
  vm.changingPassword = false;
};

AccountCtrl.prototype.clickChangePassword = function () {
  var vm = this;
  vm.changingPassword = true;
};

AccountCtrl.prototype.submitNewPassword = function () {
  var vm = this;
  alert('Password successfully changed!');
  vm.changingPassword = false;
};
