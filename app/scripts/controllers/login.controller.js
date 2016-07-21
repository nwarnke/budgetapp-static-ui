'use strict';

angular.module('budgetApp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl(Rest, $window, AuthenticationService) {
  this.rest = Rest;
  this.authenticationservice = AuthenticationService;
  this.username = '';
  this.password = '';
  this.style = "display:none";
  this.failedLogin = false;
  this.window = $window;
}

LoginCtrl.prototype.submitBtnEvt = function(){
  this.failedLogin = false;
  this.style = "";
  var vm = this;
  if(this.username == undefined){
    this.username = '';
  }
  if(this.password == undefined){
    this.password = '';
  }
  this.rest.isAuthUser(this.username, this.password).then(function(data){
    if(data.data){
      vm.authenticationservice.setUserAuthenticated(true);
      vm.window.location = "#/home";
    }else{
      vm.failedLogin = true;
    }
    vm.style = "display:none";
  });
};

