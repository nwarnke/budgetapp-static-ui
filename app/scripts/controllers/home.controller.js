'use strict';
angular.module('budgetApp')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl($cookies, Rest, $window) {
  this.rest = Rest;
  this.cookies = $cookies;
  this.window = $window;
  this.budgets = [];
  if(this.cookies.get('authenticated')){
    this.initialize();
  }
}

HomeCtrl.prototype.initialize = function(){
  var vm = this;
  this.rest.getBudgets().then(function(reply){
    if(reply.status == 200) {
      vm.budgets = reply.data;
    }
  }).catch(function(error){
    if(error.status == 500){
      console.log('server error occurred');
    }else if(error.status == 401){
      vm.cookies.remove('authenticated');
      vm.window.location = '#/';
    }
  });
};

HomeCtrl.prototype.logout = function(){
  this.cookies.remove('authenticated');
  var vm = this;
  this.rest.logout().then(function(data){
    vm.window.location = '#/';
  });
};

HomeCtrl.prototype.navigate = function(url){
  this.window.location = url;
};
