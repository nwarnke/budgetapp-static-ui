'use strict';
angular.module('budgetApp')
  .controller('AccountCtrl', AccountCtrl);

function AccountCtrl($rootScope, $scope, $cookies, Rest, $window) {
  this.scope = $scope;
  this.cookies = $cookies;
  this.changingPassword = false;
  this.rootScope = $rootScope;
  this.window = $window;
  this.rest = Rest;
  this.newPassword = null;
  this.oldPassword = null;
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
  if(vm.newPassword === vm.confNewPassword) {
    vm.noMatch = false;
    vm.rest.updateUserInfo(vm.username, vm.newPassword, vm.oldPassword);
    vm.window.alert('Password successfully changed!');
  }
  else{
    vm.noMatch = true;
  }
};

AccountCtrl.prototype.logout = function(){
  this.cookies.remove('authenticated');
  var vm = this;
  this.rest.logout().then(function(data){
    vm.window.location = '#/';
    console.log(data);
  });
};
