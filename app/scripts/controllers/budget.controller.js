'use strict';
angular.module('budgetApp')
  .controller('BudgetCtrl', BudgetCtrl);

function BudgetCtrl($rootScope) {
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  //this.initialize();
  console.log('welcome');
}

/*BudgetsHomeCtrl.prototype.initialize = function(){
 var vm = this;
 };*/

BudgetCtrl.prototype.goTo = function(link){
  var vm = this;
  vm.window.location = '/#/'+link;
};

BudgetCtrl.prototype.deleteCatOrSubCat = function(row){
  console.log("In Delete: " + row)
};
