'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('budgetApp'));

  var ctrl, $scope;
  //   rest, cookies, window;
  //
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    console.log("Hello world");
    ctrl = $controller('LoginCtrl', {

    });
  }));

  it('has a dummy spec test 2 + 2', function () {
    expect(2 + 2).toEqual(4);
  });



});
