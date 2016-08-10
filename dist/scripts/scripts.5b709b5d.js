"use strict";function LoginCtrl(a,b,c){this.rest=a,this.cookies=c,this.username="",this.password="",this.failedLogin=!1,this.display=!0,this.window=b,this.awesomeThings=[1,2,3]}function HomeCtrl(a,b,c){this.rest=b,this.cookies=a,this.window=c,this.budgets=[],this.cookies.get("authenticated")&&this.initialize()}function BudgetCtrl(a,b,c){this.rootScope=a,this.routeParams=b,this.rest=c;var d=this;this.tableData=[],null!=this.routeParams.budgetId&&(console.log(this.routeParams.budgetId),this.rest.getBudget(this.routeParams.budgetId).then(function(a){d.tableData=a.data})),this.rootScope.showNavBar=!0;var e=[{name:"School fees",expense:2e3,allowance:3e3},{name:"Textbooks",expense:500,allowance:700},{name:"Insurance",expense:800,allowance:850}],f=[{name:"Groceries",expense:200,allowance:300},{name:"Cleaning Supplies",expense:50,allowance:45},{name:"Decoration",expense:400,allowance:200}],g={name:"Bills",items:[{name:"Electric",expense:80,allowance:50},{name:"Gas",expense:25,allowance:30},{name:"Water/Sewage",expense:20,allowance:25}]};this.myBudget=[e,f,g],console.log("welcome")}function AccountCtrl(a,b,c){this.scope=b,this.changingPassword=!1,this.rootScope=a,this.rest=c,this.newPassword=null,this.oldPassword=null,this.rootScope.showNavBar=!0,this.changingPassword=!1,console.log("on Account page")}function NewBudgetCtrl(a,b,c){this.rest=b,this.cookies=a,this.window=c,this.budgetName="",this.amount=0,this.startDate="",this.endDate="",this.cookies.get("authenticated")&&this.initialize()}function Rest(a,b){var c;c="localhost"==window.location.hostname?"http://localhost:8080":"https://budget-management-backend.herokuapp.com";var d=function(d,e){var f=b.defer();return a({url:c+d,method:"POST",params:e}).then(function(a){f.resolve(a)}).catch(function(a){f.reject(a)}),f.promise},e=function(d,e){var f=b.defer();return a.get(c+d,{params:e}).then(function(a){f.resolve(a)}).catch(function(a){f.reject(a)}),f.promise};return{isAuthUser:function(a,b){var c="/login/authenticate",e={username:a,password:b};return d(c,e)},getUserInfo:function(){var a="/account/userinfo",b={};return e(a,b)},isAuthenticatedToViewPage:function(a){var b={};return e(a,b)},updateUserInfo:function(a,b){var c={username:a,newPassword:newPassword,oldPassword:oldPassword},d="/account/update";return e(d,c)},logout:function(){var a={},b="/logout";return d(b,a)},submitNewBudget:function(a,b,c,e){var f={budgetName:a,amount:b,startDate:c,endDate:e},g="/home/addbudget";return d(g,f)},getBudget:function(a){var b={budgetId:a},c="/budget/getbudget";return e(c,b)},getBudgets:function(){var a={},b="/home/budgets";return e(b,a)}}}angular.module("budgetApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$httpProvider",function(a,b){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"loginCtrl"}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"homeCtrl"}).when("/budget",{templateUrl:"views/budget.html",controller:"BudgetCtrl",controllerAs:"budgetCtrl"}).when("/budget/:budgetId",{templateUrl:"views/budget.html",controller:"BudgetCtrl",controllerAs:"budgetCtrl"}).when("/account",{templateUrl:"views/account.html",controller:"AccountCtrl",controllerAs:"accountCtrl"}).when("/newbudget",{templateUrl:"views/newbudget.html",controller:"NewBudgetCtrl",controllerAs:"newBudgetCtrl"}).when("/logOut",{redirectTo:"/"}).otherwise({redirectTo:"/home"}),b.defaults.withCredentials=!0}]).run(["$rootScope","$cookies","$location",function(a,b,c){a.$on("$routeChangeStart",function(){b.get("authenticated")||c.path("/")})}]),angular.module("budgetApp").controller("LoginCtrl",LoginCtrl),LoginCtrl.$inject=["Rest","$window","$cookies"],LoginCtrl.prototype.submitBtnEvt=function(){this.failedLogin=!1,this.display=!1;var a=this;void 0==this.username&&(this.username=""),void 0==this.password&&(this.password=""),this.rest.isAuthUser(this.username,this.password).then(function(b){b.data?(a.cookies.put("authenticated",!0),a.window.location="#/home"):a.failedLogin=!0,a.display=!0}).catch(function(b){a.display=!0,a.failedLogin=!0,console.log(b)})},angular.module("budgetApp").controller("HomeCtrl",HomeCtrl),HomeCtrl.$inject=["$cookies","Rest","$window"],HomeCtrl.prototype.initialize=function(){var a=this;this.rest.getBudgets().then(function(b){200==b.status&&(a.budgets=b.data)}).catch(function(b){500==b.status?console.log("server error occurred"):401==b.status&&(a.cookies.remove("authenticated"),a.window.location="#/")})},HomeCtrl.prototype.logout=function(){this.cookies.remove("authenticated");var a=this;this.rest.logout().then(function(b){a.window.location="#/"})},HomeCtrl.prototype.navigate=function(a){this.window.location=a},angular.module("budgetApp").controller("BudgetCtrl",BudgetCtrl),BudgetCtrl.$inject=["$rootScope","$routeParams","Rest"],BudgetCtrl.prototype.checkForRouteParams=function(){var a=this;a.$routeParams.budgetId&&(a.budgetId=a.$routeParams.budgetId,a.getBudgetData())},BudgetCtrl.prototype.getBudgetData=function(a){},BudgetCtrl.prototype.goTo=function(a){var b=this;b.window.location="/#/"+a},BudgetCtrl.prototype.deleteCatOrSubCat=function(a){console.log("In Delete: "+a)},angular.module("budgetApp").controller("AccountCtrl",AccountCtrl),AccountCtrl.$inject=["$rootScope","$scope","Rest"],AccountCtrl.prototype.clickChangePassword=function(){var a=this;a.changingPassword=!0},AccountCtrl.prototype.submitNewPassword=function(){var a=this;this.rest.updateUserInfo(a.username,a.newPassword,a.oldPassword).then(function(a){console.log(a)})},angular.module("budgetApp").controller("NewBudgetCtrl",NewBudgetCtrl),NewBudgetCtrl.$inject=["$cookies","Rest","$window"],NewBudgetCtrl.prototype.initialize=function(){console.log("hello world")},NewBudgetCtrl.prototype.logout=function(){this.cookies.remove("authenticated");var a=this;this.rest.logout().then(function(b){a.window.location="#/"})},NewBudgetCtrl.prototype.submit=function(){var a=this;this.rest.submitNewBudget(this.budgetName,this.amount,this.startDate,this.endDate).then(function(b){202==b.status?a.navigate("#/home"):console.log("print some error to the screen here please")})},NewBudgetCtrl.prototype.navigate=function(a){this.window.location=a},angular.module("budgetApp").factory("Rest",Rest),Rest.$inject=["$http","$q"],angular.module("budgetApp").run(["$templateCache",function(a){a.put("views/account.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li><a href="#/home">Home</a></li> <li class="active"><a href="#/account">My Account</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-click="homeCtrl.logout()" style="cursor:pointer"><a>Logout</a></li> </ul> </div> </div> </nav> <div class="container-fluid text-center"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>Account</h1> </div> <hr> <hr> <hr> <hr> <table> <tr> <td><label>Enter Old Password: </label></td> <td><input type="text" ng-model="accountCtrl.oldPassword" required></td> </tr> <tr> <td><label>Enter New Password: </label></td> <td><input type="text" ng-model="accountCtrl.oldPassword" required></td> </tr> <tr> <td><label>Re-enter New Password: </label></td> <td><input type="text" ng-model="accountCtrl.password" required></td> </tr> <tr> <td> <button class="button-primary" style="float:right" ng-click="accountCtrl.submitNewPassword()">Submit</button> </td> </tr> </table> </div> </div>  <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>'),a.put("views/budget.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li class="active"><a href="#/home">Home</a></li> <li><a href="#/account">My Account</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-click="homeCtrl.logout()" style="cursor:pointer"><a>Logout</a></li> </ul> </div> </div> </nav> <head> <meta charset="UTF-8"> <title>Budget - The Budget you clicked on</title> </head> <body> <h1>Budget Manager - The Budget you clicked on</h1> <table> <thead> <tr> <th>Categories</th> <th>Sub-Categories</th> <th>Expenses</th> <th>Allowance</th> <th>Action</th> </tr> </thead> <tbody> <tr> </tr> </tbody> </table> <table> <thead> <tr> <th>()</th> <th>Categories</th> <th>Sub-Categories</th> <th>Expenses</th> <th>Allowance</th> <th>Action</th> </tr> </thead> <tbody> <tr ng-repeat-start="category in budget.myBudget"> <td> <button ng-if="category.expanded" ng-click="category.expanded = false">-</button> <button ng-if="!category.expanded" ng-click="category.expanded = true">+</button> </td> <td>{{category.name}}</td> <td> <tr ng-repeat-start="item in category.items"> </tr></td> </tr> <tr ng-if="category.expanded" ng-repeat-end=""> <td colspan="3">{{category.items}}</td> </tr> </tbody> </table> </body> <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>'),a.put("views/home.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li class="active"><a href="#/home">Home</a></li> <li><a href="#/account">My Account</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-click="homeCtrl.logout()" style="cursor:pointer"><a>Logout</a></li> </ul> </div> </div> </nav> <div class="container-fluid text-center"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>My Budgets</h1> </div> <div class="col-sm-10 text-right"> <button input type="button" ng-click="homeCtrl.navigate(\'#/newbudget\')">New Budget</button> </div> <hr> <hr> <hr> <hr> <table> <tr> <th> Budget Name </th> <th> Budget Limit </th> <th> Current Amount </th> <th> Start Date </th> <th> End Date </th> <th></th> </tr> <tr ng-repeat="budget in homeCtrl.budgets"> <td> <a href="#/budget/{{budget.budgetId}}">{{budget.budgetName}}</a> </td> <td> {{budget.budgeLimit}} </td> <td> {{budget.budgetExpenses}} </td> <td> {{budget.startDate}} </td> <td> {{budget.endDate}} </td> </tr> </table> </div> </div> <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>'),a.put("views/login.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li class="active"><a href="#/home">Home</a></li> <!--<li><a href="#">About</a></li>--> <!--<li><a href="#">Projects</a></li>--> <!--<li><a href="#">Contact</a></li>--> </ul> <ul class="nav navbar-nav navbar-right"> <!--<li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>--> </ul> </div> </div> </nav> <div class="container-fluid text-center"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>Budget Management Application</h1> </div> <hr> <hr> <hr> <hr> <form ng-submit="loginCtrl.submitBtnEvt()"> <div class="form-signin"> <h2 class="form-signin-heading">Please login</h2> <input type="text" class="form-control" name="username" placeholder="Username" ng-model="loginCtrl.username" required autofocus> <input type="password" class="form-control" name="password" placeholder="Password" ng-model="loginCtrl.password" required> <p ng-if="loginCtrl.failedLogin" style="color:red">Invalid username/password combination</p> <div ng-if="!loginCtrl.display"> <div class="spinner"></div> </div> <button class="button-primary" type="submit" ng-if="loginCtrl.display" ng-click="loginCtrl.submitBtnEvt()">Login </button> </div> <!--</div>--> </form></div>  </div> <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>'),a.put("views/newbudget.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li class="active"><a href="#/home">Home</a></li> <li class="active"><a href="#/account">My Account</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-click="newBudgetCtrl.logout()" style="cursor:pointer"><a>Logout</a></li> </ul> </div> </div> </nav> <div class="container-fluid text-center"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>New Budget</h1> </div> <hr> <hr> <hr> <hr> <table> <tr> <td><label>Budget Name:</label></td> <td><input type="text" class="form-control" name="budgetname" placeholder="Budget Name" ng-model="newBudgetCtrl.budgetName"></td> </tr> <tr> <td><label>Budget Limit:</label></td> <td><input type="text" class="form-control" name="limit" placeholder="Amount" ng-model="newBudgetCtrl.amount"></td> </tr> <tr> <td><label>Start Date:</label></td> <td><input type="date" class="form-control" name="startDate" placeholder="Date" ng-model="newBudgetCtrl.startDate"></td> </tr> <tr> <td><label>End Date:</label></td> <td><input type="date" class="form-control" name="startDate" placeholder="Date" ng-model="newBudgetCtrl.endDate"></td> </tr> <tr> <td></td> </tr> </table> <div class="text-center"><button type="button" style="width:100px" ng-click="newBudgetCtrl.submit()">Submit</button></div> </div> </div> <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>')}]);