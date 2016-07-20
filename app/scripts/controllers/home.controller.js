'use strict';
angular.module('budgetApp')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl($rootScope, $scope, Rest) {
  this.rest = Rest;
  this.rest.getUserInfo().then(function(data){
    console.log(data);
  });
  console.log(this.rest);
  this.scope = $scope;
  this.budgets = [];
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  this.initialize();
  console.log('welcome');
}

HomeCtrl.prototype.initialize = function(){
  //var vm = this;
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

