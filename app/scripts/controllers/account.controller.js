'use strict';
angular.module('budgetApp')
  .controller('AccountCtrl', AccountCtrl);

function AccountCtrl($rootScope, $scope, Rest, $window) {
  this.scope = $scope;
  this.changingPassword = false;
  this.rootScope = $rootScope;
  this.window = $window;
  this.rest = Rest;
  this.newPassword = null;
  this.oldPassword = null;
  this.success = false;
  this.failure = false;
  this.noMatch = false;
  this.confNewPassword = null;
  this.rootScope.showNavBar = true;
  this.changePassword = true;
  this.changingPassword = false;
  this.currentUser = {firstName:'Joe', lastName:'Swanson', username:'jswanson'};
}

AccountCtrl.prototype.clickChangePassword = function () {
  var vm = this;
  vm.changingPassword = true;
};

AccountCtrl.prototype.submitNewPassword = function () {
  var vm = this;
  vm.success = false;
  vm.failure = false;
  if(vm.newPassword === vm.confNewPassword) {
    vm.noMatch = false;
    if(vm.rest.updateUserInfo(vm.username, vm.newPassword, vm.oldPassword)){
      vm.success = true;
    }
    else{
      vm.failure = true;
    }
    vm.window.alert('Password successfully changed!');
  }
  else{
    vm.noMatch = true;
  }
};
