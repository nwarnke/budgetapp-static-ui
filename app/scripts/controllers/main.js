'use strict';

angular.module('permanenceStaticUiApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl($http, $window, $timeout) {
  this.http = $http;
  this.window = $window;
  this.timeout = $timeout;
  this.username = '';
  this.password = '';
  this.failedLogin = false;
  this.pageLoading = false;
  this.style = 'display:none';
}

MainCtrl.prototype.submitBtnEvt = function(){
  var vm = this;
  this.pageLoading = true;
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
      vm.window.location = '/#/welcome';
    }
    vm.style = 'display:none';
    vm.failedLogin = true;
  }, function errorCallback(error) {
    console.log('didn\'t work :(');
    console.log(error);
    vm.pageLoading = false;
  });

};

