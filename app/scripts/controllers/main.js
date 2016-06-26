'use strict';

angular.module('permanenceStaticUiApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl($http) {
  this.http = $http;

  this.data = null;
  var vm = this;
  this.http({
    method: 'GET',
    url: 'http://localhost:8080/something'
  }).then(function successCallback(response) {
    vm.data = response.data;
  }, function errorCallback(error) {
    console.log(error);
  });


}
