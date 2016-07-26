'use strict';

angular.module('budgetApp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl(Rest, $window, $cookies) {
  this.rest = Rest;
  this.cookies = $cookies;
  this.username = '';
  this.password = '';
  this.style = "display:none";
  this.failedLogin = false;
  this.display = true;
  this.window = $window;
  this.awesomeThings = [1,2,3];
}

LoginCtrl.prototype.submitBtnEvt = function(){
  this.failedLogin = false;
  this.style = "";
  this.display = false;
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
    vm.display = true;
  }).catch(function(error){
    vm.display = true;
    vm.failedLogin = true;
    vm.style = "display:none";
    console.log(error);
  });
};

