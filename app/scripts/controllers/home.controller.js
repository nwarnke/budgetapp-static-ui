'use strict';
angular.module('budgetApp')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl($rootScope, $scope, Rest, $window) {
  this.rest = Rest;
  this.window = $window;
  var vm = this;
  this.rest.isAuthenticatedToViewPage('/home/authenticated').then(function(data){
    if(!data.data){
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

