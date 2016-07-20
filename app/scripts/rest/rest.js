'use strict';

angular.module('budgetApp')
  .factory('Rest', Rest);

function Rest($http, $q){
  var SERVICE_URL;
  if(window.location.hostname == 'localhost'){
    SERVICE_URL = 'http://localhost:8080';
  }else{
    SERVICE_URL = 'https://budget-management-backend.herokuapp.com';
  }
  var performPost = function (url, params) {
    var deferred = $q.defer();
    $http({
      url:SERVICE_URL+'/login/authenticate',
      method:'POST',
      params:params
    }).then(function (response) {
      deferred.resolve(response);
    })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  var performGet = function (url, params) {
    var deferred = $q.defer();
    $http.get(
      SERVICE_URL + url,
      {
        params: params
      }
    ).then(function (response) {
      deferred.resolve(response);
    })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  return{
    isAuthUser: function(username, password){
      var url = '/login/authenticate';
      var params = {
        username: username,
        password: password
      };
      return performPost(url, params);
    }
  }

}
