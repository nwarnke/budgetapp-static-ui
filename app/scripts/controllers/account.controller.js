'use strict';
angular.module('budgetApp')
  .controller('AccountCtrl', AccountCtrl);

function AccountCtrl($rootScope, $scope, Rest) {
  this.scope = $scope;
  this.changingPassword = false;
  this.rootScope = $rootScope;
  this.rest = Rest;
  this.newPassword = null;
  this.oldPassword = null;
  this.rootScope.showNavBar = true;
  this.changingPassword = false;
  console.log('on Account page');
}

AccountCtrl.prototype.clickChangePassword = function () {
  var vm = this;
  vm.changingPassword = true;
};

AccountCtrl.prototype.submitNewPassword = function () {
  var vm = this;
  this.rest.updateUserInfo(vm.username, vm.newPassword, vm.oldPassword).then(function(data){
    console.log(data);
  });
};
