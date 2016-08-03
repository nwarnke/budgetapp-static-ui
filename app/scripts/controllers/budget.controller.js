'use strict';
angular.module('budgetApp')
  .controller('BudgetCtrl', BudgetCtrl);

function BudgetCtrl($rootScope, $routeParams, Rest) {
  this.rootScope = $rootScope;
  this.routeParams = $routeParams;
  this.rest = Rest;
  var vm = this;
  if(this.routeParams.budgetId != null){
    console.log(this.routeParams.budgetId);
    this.rest.getBudget(this.routeParams.budgetId).then(function(data){
      console.log(data);
    });
  }

  this.rootScope.showNavBar = true;
  this.testData = {
    'School': {
      'Value 1': ['a', 'b', 'c'],
      'Value 2': ['d', 'e']
    },
    'Vacation': {
      'Value 3': ['f'],
      'Value 4': ['g', 'h']
    },

    'Household': {
      'Value 3': ['f'],
      'Value 4': ['g', 'h']
    }
  };
  // this.categories = {subcategory}
  this.myBudget = {category: ['School', 'Vacation', 'Household'], subCategory:[]}
  //this.initialize();
  console.log('welcome');
}

/*BudgetsHomeCtrl.prototype.initialize = function(){
 var vm = this;
 };*/
BudgetCtrl.prototype.checkForRouteParams = function() {
  var vm = this;
  if (vm.$routeParams.budgetId) {
    vm.budgetId = vm.$routeParams.budgetId;
    vm.getBudgetData();
  }
};
BudgetCtrl.prototype.getBudgetData = function(link){
  var vm = this;

};


BudgetCtrl.prototype.goTo = function(link){
  var vm = this;
  vm.window.location = '/#/'+link;
};

BudgetCtrl.prototype.deleteCatOrSubCat = function(row){
  console.log("In Delete: " + row)
};
