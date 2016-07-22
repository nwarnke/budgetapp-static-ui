'use strict';
angular.module('budgetApp')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl($rootScope, $scope, $cookies, Rest, $window) {
  this.rest = Rest;
  this.cookies = $cookies;
  this.window = $window;
  var vm = this;

  this.budgets = [];

  this.rest.getBudgets().then(function(reply){
    if(reply.status == 200) {
      vm.budgets = reply.data;
    }
  }).catch(function(error){
    if(error.status == 500){
      console.log('server error occurred');
    }else if(error.status == 401){
      vm.cookies.put('authenticated', false);
      vm.window.location = '#/';
    }
  });


  this.scope = $scope;
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
}

HomeCtrl.prototype.goTo = function(link){
  var vm = this;
  vm.window.location = '/#/'+link;
};

