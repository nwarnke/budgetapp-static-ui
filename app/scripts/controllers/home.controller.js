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
  this.budgets = [];
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  this.initialize();
  console.log('welcome');
}

HomeCtrl.prototype.initialize = function(){
  this.budgets = [{
    name: 'Vacation Budget',
    expenseTotal: 550,
    totalLimit: 2000,
    origDate: '7/12/2016'
  },
    {
      name: 'Fixed Expenses Budget',
      expenseTotal: 800,
      totalLimit: 1000,
      origDate: '7/12/2016'
    },
    {
      name: 'Fixed Expenses Budget',
      expenseTotal: 400,
      totalLimit: 600,
      origDate: '7/02/2016'
    }]

};

HomeCtrl.prototype.goTo = function(link){
  var vm = this;
  vm.window.location = '/#/'+link;
};

