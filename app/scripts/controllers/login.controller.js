'use strict';

angular.module('budgetApp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl(Rest) {
  this.rest = Rest;
  this.username = null;
  this.password = null;
}

LoginCtrl.prototype.submitBtnEvt = function(){
  this.rest.isAuthUser(this.username, this.password).then(function(data){
    console.log(data);
  });
};

