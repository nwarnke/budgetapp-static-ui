'use strict';

angular.module('budgetApp')
  .factory('Rest', Rest);

function Rest($http, $q) {
  var SERVICE_URL;
  /*if (window.location.hostname === 'localhost') {
    SERVICE_URL = 'http://localhost:8080';
  } else {*/
    SERVICE_URL = 'https://budget-management-backend.herokuapp.com';
  //}
  var performPost = function (url, params) {
    var deferred = $q.defer();
    $http({
      url: SERVICE_URL + url,
      method: 'POST',
      params: params
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

  return {
    isAuthUser: function (username, password) {
      var url = '/login/authenticate';
      var params = {
        username: username,
        password: password
      };
      return performPost(url, params);
    },
    getUserInfo: function () {
      var url = '/account/userinfo';
      var params = {};
      return performGet(url, params);
    },
    isAuthenticatedToViewPage:function(url){
      var params = {};
      return performGet(url, params);
    },
    updateUserInfo:function(username, newPassword,oldPassword ){
      var params = {
        username: username,
        newPassword: newPassword,
        oldPassword: oldPassword
      };
      var url = '/account/update';
      return performGet(url, params);
    },
    logout:function(){
      var params = {};
      var url = '/logout';
      return performPost(url, params);
    },
    submitNewBudget:function(budgetName, amount, startDate, endDate){
      var params = {
        budgetName:budgetName,
        amount:amount,
        startDate:startDate,
        endDate:endDate
      };
      var url = '/budget/newbudget';
      return performPost(url, params);
    },
    getBudget:function(budgetId){
      var params = {
        budgetId:budgetId
      };
      var url = '/budget/getbudget';
      return performGet(url, params);
    },
    getBudgets:function(){
    var params = {};
    var url = '/home/budgets';
    return performGet(url, params);
  },
    addCategory:function(id, name, limit, expenses){
      var params = {
        categoryId:id,
        categoryName:name,
        limit: limit,
        expenses:expenses,
        startDate: '2016-08-01',
        endDate:'2016-08-31'
      };
      var url = '/budget/addcategory';
      return performPost(url, params);
    },
    addSubcategory:function(id, name, limit, expenses){
      var params = {
        subcategoryId:id,
        subcategoryName:name,
        limit: limit,
        expenses:expenses,
        startDate: '2016-08-01',
        endDate:'2016-08-31'
      };
      var url = '/budget/addsubcategory';
      return performPost(url, params);
    },
    updateCategory:function(id, name, limit, expenses){
      var params = {
        categoryId:id,
        categoryName:name,
        limit: limit,
        expenses:expenses,
        startDate: '2016-08-01',
        endDate:'2016-08-31'
      };
      var url = '/budget/updatecategory';
      return performPost(url, params);
    },
    updateSubcategory:function(id, name, limit, expenses){
      var params = {
        subcategoryId:id,
        subcategoryName:name,
        limit: limit,
        expenses:expenses,
        startDate: '2016-08-01',
        endDate:'2016-08-31'
      };
      var url = '/budget/updatesubcategory';
      return performPost(url, params);
    },
    addNewCategory:function(name, limit, expenses, budgetId){
      var params = {
        categoryName:name,
        limit: limit,
        expenses:expenses,
        startDate: '2016-08-01',
        endDate:'2016-08-31',
        budgetId: budgetId
      };
      var url = '/budget/addcategory';
      return performPost(url, params);
    },
    addNewSubcategory:function(name, limit, expenses, catId){
      var params = {
        subcategoryName:name,
        limit: limit,
        expenses:expenses,
        startDate: '2016-08-01',
        endDate:'2016-08-31',
        categoryId: catId
      };
      var url = '/budget/addsubcategory';
      return performPost(url, params);
    },
    updateBudget:function(budgetName, amount, startDate, endDate){
      var params = {
        budgetName:budgetName,
        amount:amount,
        startDate:startDate,
        endDate:endDate
      };
      var url = '/home/updatebudget';
      return performPost(url, params);
    },
    deleteBudget:function(budgetId){
      var params = {
        budgetId:budgetId
      };
      var url = '/home/deletebudget';
      return performPost(url, params);
    },
    deleteCategory: function(categoryId){
      var params = {
        categoryId:categoryId
      };
      var url = '/budget/deletecategory';
      return performPost(url, params);
    },
    deleteSubcategory: function(subcategoryId){
      var params = {
        subcategoryId:subcategoryId
      };
      var url = '/budget/deletesubcategory';
      return performPost(url, params);
    },
  };

}
