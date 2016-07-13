'use strict';
angular.module('permanenceStaticUiApp')
  .controller('BudgetsHomeCtrl', BudgetsHomeCtrl);

function BudgetsHomeCtrl($rootScope, $scope) {
  this.scope = $scope;
  this.budgets = [];
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  this.initialize();
  console.log('welcome');
}

BudgetsHomeCtrl.prototype.initialize = function(){
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

BudgetsHomeCtrl.prototype.goTo = function(link){
  var vm = this;
  vm.window.location = '/#/'+link;
};

