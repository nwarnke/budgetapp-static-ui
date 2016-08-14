'use strict';
angular.module('budgetApp')
  .controller('BudgetCtrl', BudgetCtrl);

function BudgetCtrl($rootScope, $routeParams, Rest, $window) {
  this.rootScope = $rootScope;
  this.routeParams = $routeParams;
  this.window = $window;
  this.rest = Rest;
  this.tableData = [];
  this.newCategory = {id: null, name:null, limit:null, expenses:null};
  this.newSubcategory = {categoryId: null, name:null, limit:null, expenses:null};
  this.budgetEdit = false;

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

BudgetCtrl.prototype.editBudget = function () {
  var vm = this;
  if(vm.budgetEdit) {
    vm.budgetEdit= false;
  }
  else {
    vm.budgetEdit = true;
  }
};

BudgetCtrl.prototype.switchEdit = function (item) {
 if(item.edit) {
   item.edit= false;
 }
 else {
   item.edit = true;

 }
};

BudgetCtrl.prototype.cancelCategory = function (category, $index) {
  var vm = this;
  category = vm.tableData.categories[$index];
  vm.switchEdit(category);
};

BudgetCtrl.prototype.cancelSubcategory = function (subcategory, $index) {
  var vm = this;

  vm.switchEdit(subcategory);
};


BudgetCtrl.prototype.updateCategory = function (category) {
   var vm = this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.updateCategory(category.categoryId, category.categoryName, category.categoryLimit, category.categoryExpenses)){
    vm.updateBudget();
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
 if(vm.rest.updateSubcategory(subcategory.subcategoryId, subcategory.subcategoryName, subcategory.subcategoryLimit, subcategory.subcategoryExpenses)){
   vm.updateBudget();
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
  }
  else{
    vm.failure = true;
  }
};

BudgetCtrl.prototype.addNewSubcategory = function () {
  var vm = this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.addNewSubcategory(vm.newSubcategory.name, vm.newSubcategory.limit, vm.newSubcategory.expenses, vm.newSubcategory.categoryId)){
    vm.updateBudget();
  }
  else{
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
  }
  else{

    vm.failure = true;
  }
};

BudgetCtrl.prototype.deleteSubcategory = function (subcategory) {
  var vm =this;
  vm.success = false;
  vm.failure = false;
  if(vm.rest.deleteSubcategory(subcategory.subcategoryId)){
    vm.updateBudget();
  }
  else{
    vm.failure = true;
  }
};

BudgetCtrl.prototype.deleteBudget = function () {
  var vm =this;
  if(vm.rest.deleteBudget(vm.tableData.budgetId)){
    vm.window.location = '/#/home';
  }
  else{
    vm.failure = true;
  }
};

BudgetCtrl.prototype.updateBudget = function(){
  var vm = this;
  this.rest.getBudget(this.routeParams.budgetId).then(function (data) {
    vm.tableData = data.data;
    var categories = vm.tableData.categories;
    var budgetExpenses = 0;
    var budgetLimit = 0;
    for(var x = 0; x< categories.length; x++){
      var subcategories = categories[x].subcategories;
      var catExpenses = 0;
      var categoryLimit =  0;
      for(var y =0; y< subcategories.length; y++){ //adding up subcategory expenses
        catExpenses+= parseInt(subcategories[y].subcategoryExpenses); //replacing current categoryexpenses
        categoryLimit += parseInt(subcategories[y].subcategoryLimit);
      }
      if(catExpenses !== 0) {
        categories[x].categoryExpenses = catExpenses.toString();
      }
      if(categoryLimit > parseInt(categories[x].categoryLimit)){
        categories[x].categoryLimit = categoryLimit.toString(); //if new category limit is greater replace old category limit
      }
      budgetExpenses += parseInt(categories[x].categoryExpenses);
      budgetLimit += parseInt(categories[x].categoryLimit);
      if(budgetLimit > parseInt(vm.tableData.budgetLimit)){
        vm.tableData.budgetLimit = budgetLimit.toString();
      }
      vm.tableData.budgetExpenses = budgetExpenses.toString();
      vm.rest.updateCategory(categories[x].categoryId, categories[x].categoryName, categories[x].categoryLimit, categories[x].categoryExpenses);
    }
    vm.rest.updateBudget(vm.tableData.budgetId, vm.tableData.budgetName,  vm.tableData.budgetExpenses, vm.tableData.budgetLimit);
    vm.rest.getBudget(vm.routeParams.budgetId).then(function (data) {
      vm.tableData = data.data;
      vm.budgetEdit = false;
      vm.success = true;
    });
    //vm.window.location.reload();
  });
  vm.newCategory = {id: null, name:null, limit:null, expenses:null};
  vm.newSubcategory = {categoryId: null, name:null, limit:null, expenses:null};
  }
