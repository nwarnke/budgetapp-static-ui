'use strict';
angular.module('permanenceStaticUiApp')
  .controller('BudgetsHomeCtrl', BudgetsHomeCtrl);

function BudgetsHomeCtrl($rootScope) {
  this.rootScope = $rootScope;
  this.rootScope.showNavBar = true;
  //this.initialize();
  console.log('welcome');
}

/*BudgetsHomeCtrl.prototype.initialize = function(){
  var vm = this;
};*/

BudgetsHomeCtrl.prototype.goTo = function(link){
  var vm = this;
  vm.window.location = '/#/'+link;
};

