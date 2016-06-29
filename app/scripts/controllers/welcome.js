'use strict';

function WelcomeCtrl() {
  console.log('welcome');
}

angular.module('permanenceStaticUiApp')
  .controller('WelcomeCtrl', WelcomeCtrl);
