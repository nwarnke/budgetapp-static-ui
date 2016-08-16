'use strict';
angular.module('budgetApp')
  .controller('AccountCtrl', AccountCtrl);

function AccountCtrl($rootScope, $scope, Rest, $window) {
  this.scope = $scope;
  this.cookies = $cookies;
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
  this.currentUser = {firstName:'Joe', lastName:'Swanson', username:'jswanson', };
}

AccountCtrl.prototype.saveUserInfo = function () {
  var vm = this;
  if(vm.rest.saveUserInfo(vm.currentUser.firstName, vm.currentUser.lastName, vm.currentUser.username)){
    vm.success = true;
  }
  else{
    vm.failure = true;
  }
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
