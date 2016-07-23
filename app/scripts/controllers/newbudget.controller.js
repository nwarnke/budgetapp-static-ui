'use strict';
angular.module('budgetApp')
  .controller('NewBudgetCtrl', NewBudgetCtrl);

function NewBudgetCtrl($cookies, Rest, $window) {
  this.rest = Rest;
  this.cookies = $cookies;
  this.window = $window;
  this.budgetName = '';
  this.amount = 0;
  this.startDate = '';
  this.endDate = '';

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

NewBudgetCtrl.prototype.submit = function(){
  var vm = this;
  this.rest.submitNewBudget(this.budgetName, this.amount, this.startDate, this.endDate).then(function(data){
    if(data.status == 202){
      vm.navigate('#/home');
    }else{
      console.log('print some error to the screen here please');
    }
  });
};

NewBudgetCtrl.prototype.navigate = function(url){
  this.window.location = url;
};

