'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('budgetApp'));

  var ctrl, rest, cookies, window;
  //
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, Rest, $cookies, $window) {
    rest = Rest;
    cookies = $cookies;
    window = $window;
    ctrl = $controller('LoginCtrl', {

    });
  }));

  it('has a dummy spec test 2 + 2', function () {
    expect(2 + 2).toEqual(4);
  });

  it('should initialize the controller', function(){
    expect(ctrl).toBeTruthy();
  });

  it('should have a list of awesomethings', function(){
    expect(ctrl.awesomeThings.length).toEqual(3);
  });

  // it()

});
