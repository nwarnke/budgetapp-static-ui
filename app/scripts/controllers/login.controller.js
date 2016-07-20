'use strict';

angular.module('budgetApp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($http, $window, $timeout, $rootScope) {
  this.http = $http;
  this.window = $window;
  this.rootScope = $rootScope;
  this.timeout = $timeout;
  this.username = '';
  this.password = '';
  this.failedLogin = false;
  this.style = 'display:none';
}

LoginCtrl.prototype.submitBtnEvt = function(){
  var vm = this;
  this.failedLogin = false;
  this.style = '';
  this.http({
    method: 'POST',
    params: {'username':vm.username, 'password':vm.password},
    url: 'https://budget-management-backend.herokuapp.com/login'
  }).then(function successCallback(response) {
    console.log('worked!');
    console.log(response.data);
    if(response.data.length > 0) {
      vm.rootScope.showNavBar = true;
      vm.window.location = '/#/BudgetsHome';
    }else {
      vm.style = 'display:none';
      vm.failedLogin = true;
    }
  }, function errorCallback(error) {
    console.log('didn\'t work :(');
    console.log(error);
    vm.style = 'display:none';
  });

};
