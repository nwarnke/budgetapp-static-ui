'use strict';

angular.module('permanenceStaticUiApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl($http, $window) {
  this.http = $http;
  this.window = $window;
  this.username = null;
  this.password = null;
  this.failedLogin = false;

}

MainCtrl.prototype.submitBtnEvt = function(){
  var vm = this;
  this.http({
    method: 'POST',
    params: {'username':vm.username, 'password':vm.password},
    url: 'https://budget-management-backend.herokuapp.com/login'
  }).then(function successCallback(response) {
    console.log('worked!');
    console.log(response.data);
    if(response.data.length > 0) {
      vm.window.location = '/#/welcome';
    }else{
      vm.failedLogin = true;
    }
  }, function errorCallback(error) {
    console.log('didn\'t work :(');
    console.log(error);
  });
};
