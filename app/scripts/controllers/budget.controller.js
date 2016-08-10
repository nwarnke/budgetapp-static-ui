'use strict';
angular.module('budgetApp')
  .controller('BudgetCtrl', BudgetCtrl);

function BudgetCtrl($rootScope, $routeParams, Rest) {
  this.rootScope = $rootScope;
  this.routeParams = $routeParams;
  this.rest = Rest;
  this.tableData = [];


  var vm = this;
  if (this.routeParams.budgetId !== null) {
    console.log(this.routeParams.budgetId);
    this.rest.getBudget(this.routeParams.budgetId).then(function (data) {
      vm.tableData = data.data;
      console.log(vm.tableData);
    });
  }
  this.rootScope.showNavBar = true;

}

BudgetCtrl.prototype.switchEdit = function (item) {
 if(item.edit) {
   item.edit= false;
 }
 else {
   item.edit = true;
 }
};
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
  // var vm = this;
  console.log(link);
};


BudgetCtrl.prototype.goTo = function (link) {
  var vm = this;
  vm.window.location = '/#/' + link;
};

BudgetCtrl.prototype.deleteCatOrSubCat = function (row) {
  console.log("In Delete: " + row);
};
