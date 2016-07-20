'use strict';

angular.module('budgetApp')
  .factory('Rest', Rest);

function Rest($http, $q){
  var SERVICE_URL = 'Service URL goes here'; //TODO
  var performPost = function (url, params) {
    var deferred = $q.defer();
    $http.post(
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
