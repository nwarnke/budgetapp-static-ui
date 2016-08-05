'use strict';
angular.module('budgetApp')
  .controller('BudgetCtrl', BudgetCtrl);

function BudgetCtrl($rootScope, $routeParams, Rest) {
  this.rootScope = $rootScope;
  this.routeParams = $routeParams;
  this.rest = Rest;
  var vm = this;
  this.tableData = [];

  if (this.routeParams.budgetId != null) {
    console.log(this.routeParams.budgetId);
    this.rest.getBudget(this.routeParams.budgetId).then(function (data) {
      vm.tableData = data.data;
    });
  }
  this.rootScope.showNavBar = true;

  var schoolCategory = [{
    name: 'School fees',
    expense: 2000,
    allowance: 3000
  },
    {
      name: 'Textbooks',
      expense: 500,
      allowance: 700
    },
    {
      name: 'Insurance',
      expense: 800,
      allowance: 850
    }
  ];


  var householdCategory = [{
    name: 'Groceries',
    expense: 200,
    allowance: 300
  },
    {
      name: 'Cleaning Supplies',
      expense: 50,
      allowance: 45
    },
    {
      name: 'Decoration',
      expense: 400,
      allowance: 200
    }
  ];

  var billsCategory = {
    name: 'Bills',
    items: [{
      name: 'Electric',
      expense: 80,
      allowance: 50
    },
      {
        name: 'Gas',
        expense: 25,
        allowance: 30
      },
      {
        name: 'Water/Sewage',
        expense: 20,
        allowance: 25
      }
    ]
  };

this.myBudget = [schoolCategory, householdCategory, billsCategory];

  console.log('welcome');
}

/*BudgetsHomeCtrl.prototype.initialize = function(){
 var vm = this;
 };*/
BudgetCtrl.prototype.checkForRouteParams = function () {
  var vm = this;
  if (vm.$routeParams.budgetId) {
    vm.budgetId = vm.$routeParams.budgetId;
    vm.getBudgetData();
  }
};
BudgetCtrl.prototype.getBudgetData = function (link) {
  var vm = this;

};


BudgetCtrl.prototype.goTo = function (link) {
  var vm = this;
  vm.window.location = '/#/' + link;
};

BudgetCtrl.prototype.deleteCatOrSubCat = function (row) {
  console.log("In Delete: " + row)
};
