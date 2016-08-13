'use strict';
angular.module('budgetApp')
  .controller('BudgetCtrl', BudgetCtrl);

function BudgetCtrl($rootScope, $routeParams, Rest) {
  this.rootScope = $rootScope;
  this.routeParams = $routeParams;
  this.rest = Rest;
  this.tableData = [];
  this.newCategory = {id: null, name:null, limit:null, expenses:null};
  this.newSubcategory = {categoryId: null, name:null, limit:null, expenses:null};

  var vm = this;
  if (this.routeParams.budgetId !== null) {
    console.log(this.routeParams.budgetId);
    this.rest.getBudget(this.routeParams.budgetId).then(function (data) {
      vm.tableData = data.data;
      vm.budgetId = vm.routeParams.budgetId;
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
/*BudgetCtrl.prototype.checkForRouteParams = function () {
  var vm = this;
  if (vm.$routeParams.budgetId) {
    vm.budgetId = vm.$routeParams.budgetId;
    vm.getBudgetData();
  }
};*/
/*BudgetCtrl.prototype.getBudgetData = function (link) {
  // var vm = this;
  console.log(link);
};*/

BudgetCtrl.prototype.updateCategory = function (category) {
   var vm = this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.updateCategory(category.id, category.name, category.limit, category.expenses)){
    vm.success = true;
  }
  else{
    vm.failure = true;
  }
  vm.switchEdit(category);
};

BudgetCtrl.prototype.updateSubcategory = function (subcategory) {
  var vm = this;
  vm.success = false;
  vm.failure = false;
 if(vm.rest.updateSubcategory(subcategory.id, subcategory.name, subcategory.limit, subcategory.expenses)){
   vm.success = true;
 }
 else{
   vm.failure = true;
 }
  vm.switchEdit(subcategory);
};


BudgetCtrl.prototype.addNewCategory = function () {
  var vm = this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.addNewCategory(vm.newCategory.name, vm.newCategory.limit, vm.newCategory.expenses, vm.budgetId)){
    vm.window.location.reload();
    vm.success = true;
  }
  else{
    vm.window.location.reload();
    vm.failure = true;
  }

};

BudgetCtrl.prototype.addNewSubcategory = function () {
  var vm = this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.addNewSubcategory(vm.newSubcategory.name, vm.newSubcategory.limit, vm.newSubcategory.expenses, vm.newSubcategory.categoryId)){
    vm.window.location.reload();
    vm.success = true;
  }
  else{
    vm.window.location.reload();
    vm.failure = true;
  }
};

BudgetCtrl.prototype.goTo = function (link) {
  var vm = this;
  vm.window.location = '/#/' + link;
};

BudgetCtrl.prototype.deleteCatOrSubCat = function (row) {
  console.log("In Delete: " + row);
};
