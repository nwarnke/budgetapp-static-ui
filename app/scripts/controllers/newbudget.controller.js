'use strict';
angular.module('budgetApp')
  .controller('NewBudgetCtrl', NewBudgetCtrl);

function NewBudgetCtrl($cookies, Rest, $window) {
  this.rest = Rest;
  this.cookies = $cookies;
  this.window = $window;
  if(this.cookies.get('authenticated')){
    this.initialize();
  }
}

NewBudgetCtrl.prototype.initialize = function(){
  console.log('hello world');
};

NewBudgetCtrl.prototype.logout = function(){
  this.cookies.remove('authenticated');
  var vm = this;
  this.rest.logout().then(function(data){
    vm.window.location = '#/';
  });
};
