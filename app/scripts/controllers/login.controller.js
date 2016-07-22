'use strict';

angular.module('budgetApp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl(Rest, $window, $cookies, $rootScope) {
  this.rest = Rest;
  this.rootScope = $rootScope;
  this.cookies = $cookies;
  this.username = '';
  this.password = '';
  this.style = "display:none";
  this.failedLogin = false;
  this.displayButton = true;
  this.window = $window;
}

LoginCtrl.prototype.submitBtnEvt = function(){
  this.failedLogin = false;
  this.style = "";
  this.displayButton = false;
  var vm = this;
  if(this.username == undefined){
    this.username = '';
  }
  if(this.password == undefined){
    this.password = '';
  }

  this.rest.isAuthUser(this.username, this.password).then(function(data){
    if(data.data){
      vm.cookies.put('authenticated', true);
      vm.window.location = "#/home";
    }else{
      vm.failedLogin = true;
    }
    vm.style = "display:none";
    vm.displayButton = true;
  }).catch(function(error){
    vm.displayButton = true;
    vm.failedLogin = true;
    vm.style = "display:none";
    console.log(error);
  });
};

