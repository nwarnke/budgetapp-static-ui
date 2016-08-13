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

BudgetCtrl.prototype.updateCategory = function (category) {
   var vm = this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.updateCategory(category.id, category.name, category.limit, category.expenses)){
    vm.updateBudget();
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
   vm.updateBudget();
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
    vm.updateBudget();
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
    vm.updateBudget();
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

BudgetCtrl.prototype.deleteCategory = function (category) {
  var vm =this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.deleteCategory(category.categoryId)){
    vm.updateBudget();
    vm.window.location.reload();
    vm.success = true;
  }
  else{
    vm.window.location.reload();
    vm.failure = true;
  }
};

BudgetCtrl.prototype.deleteSubcategory = function (subcategory) {
  var vm =this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.deleteSubcategory(subcategory.subcategoryId)){
    vm.updateBudget();
    vm.window.location.reload();
    vm.success = true;
  }
  else{
    vm.window.location.reload();
    vm.failure = true;
  }
};

BudgetCtrl.prototype.updateBudget = function(){
  var vm = this;
  var categories = vm.tableData.categories;
  var budgetExpenses = 0;
  var budgetLimit = 0;
  for(var x = 0; x< categories.length(); x++){
    var subcategories = categories[x].subcategories;
    categories[x].categoryExpenses = 0;
    var categoryLimit =  0;
    for(var y =0; y< subcategories.length(); y++){ //adding up subcategory expenses
      categories[x].categoryExpenses+= subcategories[y].subcategoryExpenses; //replacing current categoryexpenses
      categoryLimit += subcategories[y].subcategoryLimit;
    }
    if(categoryLimit > categories[x].categoryLimit){
      categories[x].categoryLimit = categoryLimit; //if new category limit is greater replace old category limit
    }
    budgetExpenses += categories[x].categoryExpenses;
    budgetLimit += categories[x].categoryLimit;
    if(budgetLimit > vm.tableData.budgetLimit){
      vm.tableData.budgetLimit = budgetLimit;
    }
    vm.rest.updateCategory(categories[x].categoryId, categories[x].categoryName, categories[x].categoryLimit, categories[x].categoryExpenses);
  }
  vm.rest.updateBudget(vm.tableData.budgetName, budgetExpenses, vm.tableData.budgetLimit);
}
