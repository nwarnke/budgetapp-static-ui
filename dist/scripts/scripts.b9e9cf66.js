"use strict";function LoginCtrl(a,b,c){this.rest=a,this.cookies=c,this.username="",this.password="",this.failedLogin=!1,this.display=!0,this.window=b,this.awesomeThings=[1,2,3]}function HomeCtrl(a,b,c){this.rest=b,this.loading=!0,this.cookies=a,this.window=c,this.budgets=[],this.cookies.get("authenticated")&&this.initialize()}function BudgetCtrl(a,b,c,d,e){this.cookies=c,this.rootScope=a,this.routeParams=b,this.window=e,this.rest=d,this.tableData=[],this.newCategory={id:null,name:null,limit:null,expenses:null},this.newSubcategory={categoryId:null,name:null,limit:null,expenses:null},this.budgetEdit=!1,this.loading=!0;var f=this;null!==this.routeParams.budgetId&&(console.log(this.routeParams.budgetId),this.rest.getBudget(this.routeParams.budgetId).then(function(a){f.tableData=a.data,f.budgetId=f.routeParams.budgetId,f.loading=!1})),this.rootScope.showNavBar=!0}function AccountCtrl(a,b,c,d){this.scope=b,this.changingPassword=!1,this.rootScope=a,this.window=d,this.rest=c,this.newPassword=null,this.oldPassword=null,this.confNewPassword=null,this.rootScope.showNavBar=!0,this.changePassword=!0,this.changingPassword=!1,this.currentUser={firstName:"Joe",lastName:"Swanson",username:"jswanson"}}function NewBudgetCtrl(a,b,c){this.rest=b,this.cookies=a,this.window=c,this.budgetName="",this.amount=0,this.startDate="",this.endDate="",this.cookies.get("authenticated")&&this.initialize()}function Rest(a,b){var c;c="localhost"===window.location.hostname?"http://localhost:8080":"https://budget-management-backend.herokuapp.com";var d=function(d,e){var f=b.defer();return a({url:c+d,method:"POST",params:e}).then(function(a){f.resolve(a)}).catch(function(a){f.reject(a)}),f.promise},e=function(d,e){var f=b.defer();return a.get(c+d,{params:e}).then(function(a){f.resolve(a)}).catch(function(a){f.reject(a)}),f.promise};return{isAuthUser:function(a,b){var c="/login/authenticate",e={username:a,password:b};return d(c,e)},getUserInfo:function(){var a="/account/userinfo",b={};return e(a,b)},isAuthenticatedToViewPage:function(a){var b={};return e(a,b)},updateUserInfo:function(a,b,c){var d={username:a,newPassword:b,oldPassword:c},f="/account/update";return e(f,d)},logout:function(){var a={},b="/logout";return d(b,a)},submitNewBudget:function(a,b,c,e){var f={budgetName:a,amount:b,startDate:c,endDate:e},g="/budget/newbudget";return d(g,f)},getBudget:function(a){var b={budgetId:a},c="/budget/getbudget";return e(c,b)},getBudgets:function(){var a={},b="/home/budgets";return e(b,a)},addCategory:function(a,b,c,e){var f={categoryId:a,categoryName:b,limit:c.toString(),expenses:e.toString(),startDate:"2016-08-01",endDate:"2016-08-31"},g="/budget/addcategory";return d(g,f)},addSubcategory:function(a,b,c,e){var f={subcategoryId:a,subcategoryName:b,limit:c.toString(),expenses:e.toString(),startDate:"2016-08-01",endDate:"2016-08-31"},g="/budget/addsubcategory";return d(g,f)},updateCategory:function(a,b,c,e){var f={categoryId:a,categoryName:b,limit:c.toString(),expenses:e.toString(),startDate:"2016-08-01",endDate:"2016-08-31"},g="/budget/updatecategory";return d(g,f)},updateSubcategory:function(a,b,c,e){var f={subcategoryId:a,subcategoryName:b,limit:c.toString(),expenses:e.toString(),startDate:"2016-08-01",endDate:"2016-08-31"},g="/budget/updatesubcategory";return d(g,f)},addNewCategory:function(a,b,c,e){var f={categoryName:a,limit:b.toString(),expenses:c.toString(),startDate:"2016-08-01",endDate:"2016-08-31",budgetId:e},g="/budget/addcategory";return d(g,f)},addNewSubcategory:function(a,b,c,e){var f={subcategoryName:a,limit:b.toString(),expenses:c.toString(),startDate:"2016-08-01",endDate:"2016-08-31",categoryId:e},g="/budget/addsubcategory";return d(g,f)},updateBudget:function(a,b,c,e){var f={budgetId:a,budgetName:b,amount:c.toString(),limit:e.toString(),startDate:"2016-08-01",endDate:"2016-08-31"},g="/home/updatebudget";return d(g,f)},deleteBudget:function(a){var b={budgetId:a},c="/home/deletebudget";return d(c,b)},deleteCategory:function(a){var b={categoryId:a},c="/budget/deletecategory";return d(c,b)},deleteSubcategory:function(a){var b={subcategoryId:a},c="/budget/deletesubcategory";return d(c,b)}}}angular.module("budgetApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$httpProvider",function(a,b){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"loginCtrl"}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"homeCtrl"}).when("/budget",{templateUrl:"views/budget.html",controller:"BudgetCtrl",controllerAs:"budgetCtrl"}).when("/budget/:budgetId",{templateUrl:"views/budget.html",controller:"BudgetCtrl",controllerAs:"budgetCtrl"}).when("/account",{templateUrl:"views/account.html",controller:"AccountCtrl",controllerAs:"accountCtrl"}).when("/newbudget",{templateUrl:"views/newbudget.html",controller:"NewBudgetCtrl",controllerAs:"newBudgetCtrl"}).when("/logOut",{redirectTo:"/"}).otherwise({redirectTo:"/home"}),b.defaults.withCredentials=!0}]).run(["$rootScope","$cookies","$location",function(a,b,c){a.$on("$routeChangeStart",function(){b.get("authenticated")||c.path("/")})}]),angular.module("budgetApp").controller("LoginCtrl",LoginCtrl),LoginCtrl.$inject=["Rest","$window","$cookies"],LoginCtrl.prototype.submitBtnEvt=function(){this.failedLogin=!1,this.display=!1;var a=this;void 0===this.username&&(this.username=""),void 0===this.password&&(this.password=""),this.rest.isAuthUser(this.username,this.password).then(function(b){b.data?(a.cookies.put("authenticated",!0),a.window.location="#/home"):a.failedLogin=!0,a.display=!0}).catch(function(b){a.display=!0,a.failedLogin=!0,console.log(b)})},angular.module("budgetApp").controller("HomeCtrl",HomeCtrl),HomeCtrl.$inject=["$cookies","Rest","$window"],HomeCtrl.prototype.initialize=function(){var a=this;this.rest.getBudgets().then(function(b){200===b.status&&(a.budgets=b.data,a.loading=!1)}).catch(function(b){500===b.status?console.log("server error occurred"):401===b.status&&(a.cookies.remove("authenticated"),a.window.location="#/")})},HomeCtrl.prototype.logout=function(){this.cookies.remove("authenticated");var a=this;this.rest.logout().then(function(b){a.window.location="#/",console.log(b)})},HomeCtrl.prototype.navigate=function(a){this.window.location=a},angular.module("budgetApp").controller("BudgetCtrl",BudgetCtrl),BudgetCtrl.$inject=["$rootScope","$routeParams","$cookies","Rest","$window"],BudgetCtrl.prototype.editBudget=function(){var a=this;a.budgetEdit=!a.budgetEdit},BudgetCtrl.prototype.switchEdit=function(a){a.edit?a.edit=!1:a.edit=!0},BudgetCtrl.prototype.cancelCategory=function(a,b){var c=this;a=c.tableData.categories[b],c.switchEdit(a)},BudgetCtrl.prototype.cancelSubcategory=function(a,b){var c=this;c.switchEdit(a)},BudgetCtrl.prototype.updateCategory=function(a){var b=this;b.success=!1,b.failure=!1,b.rest.updateCategory(a.categoryId,a.categoryName,a.categoryLimit,a.categoryExpenses)?b.updateBudget():b.failure=!0,b.switchEdit(a)},BudgetCtrl.prototype.updateSubcategory=function(a){var b=this;b.success=!1,b.failure=!1,b.rest.updateSubcategory(a.subcategoryId,a.subcategoryName,a.subcategoryLimit,a.subcategoryExpenses)?b.updateBudget():b.failure=!0,b.switchEdit(a)},BudgetCtrl.prototype.addNewCategory=function(){var a=this;a.success=!1,a.failure=!1,a.rest.addNewCategory(a.newCategory.name,a.newCategory.limit,a.newCategory.expenses,a.budgetId)?a.updateBudget():a.failure=!0},BudgetCtrl.prototype.addNewSubcategory=function(){var a=this;a.success=!1,a.failure=!1,a.rest.addNewSubcategory(a.newSubcategory.name,a.newSubcategory.limit,a.newSubcategory.expenses,a.newSubcategory.categoryId)?a.updateBudget():a.failure=!0},BudgetCtrl.prototype.goTo=function(a){var b=this;b.window.location="/#/"+a},BudgetCtrl.prototype.deleteCategory=function(a){var b=this;b.success=!1,b.failure=!1,b.rest.deleteCategory(a.categoryId)?b.updateBudget():b.failure=!0},BudgetCtrl.prototype.deleteSubcategory=function(a){var b=this;b.success=!1,b.failure=!1,b.rest.deleteSubcategory(a.subcategoryId)?b.updateBudget():b.failure=!0},BudgetCtrl.prototype.deleteBudget=function(){var a=this;a.rest.deleteBudget(a.tableData.budgetId)?a.window.location="/#/home":a.failure=!0},BudgetCtrl.prototype.updateBudget=function(){var a=this;this.rest.getBudget(this.routeParams.budgetId).then(function(b){a.tableData=b.data;for(var c=a.tableData.categories,d=0,e=0,f=0;f<c.length;f++){for(var g=c[f].subcategories,h=0,i=0,j=0;j<g.length;j++)h+=parseInt(g[j].subcategoryExpenses),i+=parseInt(g[j].subcategoryLimit);0!==h&&(c[f].categoryExpenses=h.toString()),i>parseInt(c[f].categoryLimit)&&(c[f].categoryLimit=i.toString()),d+=parseInt(c[f].categoryExpenses),e+=parseInt(c[f].categoryLimit),e>parseInt(a.tableData.budgetLimit)&&(a.tableData.budgetLimit=e.toString()),a.tableData.budgetExpenses=d.toString(),a.rest.updateCategory(c[f].categoryId,c[f].categoryName,c[f].categoryLimit,c[f].categoryExpenses)}a.rest.updateBudget(a.tableData.budgetId,a.tableData.budgetName,a.tableData.budgetExpenses,a.tableData.budgetLimit),a.rest.getBudget(a.routeParams.budgetId).then(function(b){a.tableData=b.data,a.budgetEdit=!1,a.success=!0})}),a.newCategory={id:null,name:null,limit:null,expenses:null},a.newSubcategory={categoryId:null,name:null,limit:null,expenses:null}},BudgetCtrl.prototype.logout=function(){this.cookies.remove("authenticated");var a=this;this.rest.logout().then(function(b){a.window.location="#/",console.log(b)})},angular.module("budgetApp").controller("AccountCtrl",AccountCtrl),AccountCtrl.$inject=["$rootScope","$scope","Rest","$window"],AccountCtrl.prototype.clickChangePassword=function(){var a=this;a.changingPassword=!0},AccountCtrl.prototype.submitNewPassword=function(){var a=this;a.newPassword===a.confNewPassword?(a.noMatch=!1,a.rest.updateUserInfo(a.username,a.newPassword,a.oldPassword),a.window.alert("Password successfully changed!")):a.noMatch=!0},angular.module("budgetApp").controller("NewBudgetCtrl",NewBudgetCtrl),NewBudgetCtrl.$inject=["$cookies","Rest","$window"],NewBudgetCtrl.prototype.initialize=function(){console.log("hello world")},NewBudgetCtrl.prototype.logout=function(){this.cookies.remove("authenticated");var a=this;this.rest.logout().then(function(b){a.window.location="#/",console.log(b)})},NewBudgetCtrl.prototype.submit=function(){var a=this;this.rest.submitNewBudget(this.budgetName,this.amount,this.startDate,this.endDate).then(function(b){202===b.status?a.navigate("#/home"):console.log("print some error to the screen here please")})},NewBudgetCtrl.prototype.navigate=function(a){this.window.location=a},angular.module("budgetApp").factory("Rest",Rest),Rest.$inject=["$http","$q"],angular.module("budgetApp").run(["$templateCache",function(a){a.put("views/account.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li><a href="#/home">Home</a></li> <li><a href="#/newbudget"> Create Budget</a></li> <li class="active"><a href="#/account">My Account</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-click="homeCtrl.logout()" style="cursor:pointer"><a>Logout</a></li> </ul> </div> </div> </nav> <ul class="nav nav-tabs"> <li class="active"><a data-toggle="tab" href="#profile">Menu 1</a></li> <li><a data-toggle="tab" href="#password">Menu 2</a></li> </ul> <div class="tab-content"> <div id="home" class="tab-pane fade in active"> <h3>HOME</h3> <p>Some content.</p> </div> <div id="menu1" class="tab-pane fade"> <h3>Menu 1</h3> <p>Some content in menu 1.</p> </div> <div id="menu2" class="tab-pane fade"> <h3>Menu 2</h3> <p>Some content in menu 2.</p> </div> </div> <div class="container-fluid text-center"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>Edit Profile</h1> </div> <table> <tr> <td><label>First Name:</label></td> <td><input type="text" class="form-control" name="firstName" ng-model="accountCtrl.currentUser.firstName" required></td> </tr> <tr> <td><label>Last Name:</label></td> <td><input type="text" class="form-control" name="lastName" ng-model="accountCtrl.currentUser.lastName" required></td> </tr> <tr> <td><label>Username</label></td> <td><input type="text" class="form-control" name="username" ng-model="accountCtrl.currentUser.username"></td> </tr> </table> <div class="text-center"><button type="submit" ng-click="accountCtrl.saveUserInfo()">Save Changes</button></div> </div> <form ng-submit="accountCtrl.submitNewPassword()" ng-if="accountCtrl.changePassword"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>Change Password</h1> </div> <table> <tr> <td><label>User Name:</label></td> <td><input type="text" class="form-control" name="username" placeholder="Enter username" ng-model="accountCtrl.username" required></td> </tr> <tr> <td><label>Old Password:</label></td> <td><input type="password" class="form-control" name="oldPassword" placeholder="Enter current password" ng-model="accountCtrl.oldPassword" required></td> </tr> <tr> <td><label>New Password:</label></td> <td><input type="password" class="form-control" name="newPassword" placeholder="Enter new password" ng-model="accountCtrl.newPassword"></td> </tr> <tr> <td><label>Confirm New Password</label></td> <td><input type="password" class="form-control" name="confNewPassword" placeholder="Re-enter new password" ng-model="accountCtrl.confNewPassword"></td> </tr> <p ng-if="accountCtrl.noMatch" style="color:red">Passwords entered don\'t match</p> <tr> <td></td> </tr> </table> <div class="text-center"><button type="button" style="width:100px" ng-click="accountCtrl.submitNewPassword()">Submit</button></div> </div> </form> </div>'),a.put("views/budget.html",'<style>td {\n    font-size : large;\n  }\n  thead {\n    font-size : large;\n  }</style> <div class="loading" ng-if="budgetCtrl.loading">Loading&#8230;</div> <nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li class="active"><a href="#/home">Home</a></li> <li><a href="#/newbudget"> Create Budget</a></li> <li><a href="#/account">My Account</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-click="budgetCtrl.logout()" style="cursor:pointer"><a>Logout</a></li> </ul> </div> </div> </nav> <head> <meta charset="UTF-8"> <title>Budget - {{budgetCtrl.tableData.budgetName}}</title> </head> <body> <h1>Budget Manager -{{budgetCtrl.tableData.budgetName}}</h1> <div class="alert alert-success" ng-show="budgetCtrl.success"> <strong>Success!</strong> Record was saved successfully. </div> <div class="alert alert-danger" ng-show="budgetCtrl.failure"> <strong>Error!</strong> Record was not saved successfully. </div> <button ng-click="budgetCtrl.deleteBudget()" style=":background-color:red">Delete Budget</button> <div> <table border="1"> <thead> <tr> <th></th> <th>Category</th> <th>Expense</th> <th>Allowance</th> <th>Actions</th> </tr> </thead> <tbody ng-repeat="category in budgetCtrl.tableData.categories" ng-switch on="category.edit"> <tr> <td> <span ng-if="category.subcategories.length>0"><button ng-if="category.expanded" ng-click="category.expanded = false">-</button> <button ng-if="!category.expanded" ng-click="category.expanded = true">+</button></span> </td> <td><span ng-switch-when="true"><input type="text" ng-model="category.categoryName"></span> <span ng-switch-default><b>{{category.categoryName}}</b></span></td> <td><span ng-switch-when="true"><input type="number" ng-model="category.categoryExpenses"></span> <span ng-switch-default><b>${{category.categoryExpenses}}</b></span></td> <td><span ng-switch-when="true"><input type="number" ng-model="category.categoryLimit"></span> <span ng-switch-default><b>${{category.categoryLimit}}</b></span></td> <td><button ng-click="budgetCtrl.switchEdit(category)" ng-show="!category.edit">Edit</button> <button ng-click="budgetCtrl.deleteCategory(category)" ng-show="!category.edit">Delete</button> <button ng-click="budgetCtrl.updateCategory(category)" ng-show="category.edit">Save</button></td> <button ng-click="budgetCtrl.cancelCategory(category, $index)" ng-show="category.edit">Cancel</button> </tr> <tr ng-if="category.expanded" ng-repeat="subcat in category.subcategories" ng-switch on="subcat.edit"> <td></td> <td><span ng-switch-when="true"><input type="text" ng-model="subcat.subcategoryName"></span> <span ng-switch-default>{{subcat.subcategoryName}}</span></td> <td><span ng-switch-when="true"><input type="number" ng-model="subcat.subcategoryExpenses"></span> <span ng-switch-default>${{subcat.subcategoryExpenses}}</span></td> <td><span ng-switch-when="true"><input type="number" ng-model="subcat.subcategoryLimit"></span> <span ng-switch-default>${{subcat.subcategoryLimit}}</span></td> <td><button ng-click="budgetCtrl.switchEdit(subcat)" ng-show="!subcat.edit">Edit</button> <button ng-click="budgetCtrl.deleteSubcategory(subcat)" ng-show="!subcat.edit">Delete</button> <button ng-click="budgetCtrl.updateSubcategory(subcat)" ng-show="subcat.edit">Save</button></td> <button ng-click="budgetCtrl.cancelSubcategory(subcat, $index)" ng-show="subcat.edit">Cancel</button> </tr> </tbody> <tr> <td></td> <td><b>Total</b></td> <td><b>${{budgetCtrl.tableData.budgetExpenses}}</b></td> <td><span ng-if="budgetCtrl.budgetEdit"><input type="text" ng-model="budgetCtrl.tableData.budgetLimit"></span> <span ng-if="!budgetCtrl.budgetEdit">${{budgetCtrl.tableData.budgetLimit}}</span></td> <td><button ng-click="budgetCtrl.editBudget()" ng-if="!budgetCtrl.budgetEdit">Edit</button> <button ng-click="budgetCtrl.updateBudget()" ng-if="budgetCtrl.budgetEdit">Save</button></td> </tr> <!-- Blank category row for adding new subcats--> <tr> <td> </td> <td colspan="3"> <b>Add a category</b></td></tr> <tr> <td></td> <td><input type="text" ng-model="budgetCtrl.newCategory.name"></td> <td><input type="number" ng-model="budgetCtrl.newCategory.expenses"></td> <td><input type="number" ng-model="budgetCtrl.newCategory.limit"></td> <td><button ng-click="budgetCtrl.addNewCategory()">Save</button></td> </tr> <br> <tr><td></td><td></td><td></td><td></td></tr> <!-- Blank subcategory row for adding new subcats--> <tr> <td></td> <td colspan="2"> <b>Add a subcategory for category:</b> <select ng-options="category.categoryId as category.categoryName for category in budgetCtrl.tableData.categories" ng-model="budgetCtrl.newSubcategory.categoryId"></select> </td></tr> <tr> <td></td> <td><input type="text" ng-model="budgetCtrl.newSubcategory.name"></td> <td><input type="number" ng-model="budgetCtrl.newSubcategory.expenses"></td> <td><input type="number" ng-model="budgetCtrl.newSubcategory.limit"></td> <td><button ng-click="budgetCtrl.addNewSubcategory()">Save</button></td> </tr> </table> </div> </body> <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>'),a.put("views/home.html",'<div class="loading" ng-if="homeCtrl.loading">Loading&#8230;</div> <nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li class="active"><a href="#/home">Home</a></li> <li><a href="#/newbudget"> Create Budget</a></li> <li><a href="#/account">My Account</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-click="homeCtrl.logout()" style="cursor:pointer"><a>Logout</a></li> </ul> </div> </div> </nav> <div class="container-fluid text-center"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>My Budgets</h1> </div> <div class="col-sm-10 text-right"> <button input type="button" ng-click="homeCtrl.navigate(\'#/newbudget\')">New Budget</button> </div> <hr> <hr> <hr> <hr> <table> <tr> <th> Budget Name </th> <th> Budget Limit </th> <th> Current Expenses </th> <th> Start Date </th> <th> End Date </th> <th></th> </tr> <tr ng-repeat="budget in homeCtrl.budgets"> <td> <a href="#/budget/{{budget.budgetId}}">{{budget.budgetName}}</a> </td> <td> ${{budget.budgetLimit}} </td> <td> ${{budget.budgetExpenses}} </td> <td> {{budget.startDate}} </td> <td> {{budget.endDate}} </td> </tr> </table> </div> </div> <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>'),a.put("views/login.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> </ul> <ul class="nav navbar-nav navbar-right"> <!--<li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>--> </ul> </div> </div> </nav> <div class="container-fluid text-center"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>Budget Management Application</h1> </div> <hr> <hr> <hr> <hr> <form ng-submit="loginCtrl.submitBtnEvt()"> <div class="form-signin"> <h2 class="form-signin-heading">Please log in</h2> <input type="text" class="form-control" name="username" placeholder="Username" ng-model="loginCtrl.username" required autofocus> <input type="password" class="form-control" name="password" placeholder="Password" ng-model="loginCtrl.password" required> <p ng-if="loginCtrl.failedLogin" style="color:red">Invalid username/password combination</p> <div ng-if="!loginCtrl.display"> <div class="spinner"></div> </div> <button class="button-primary" type="submit" ng-if="loginCtrl.display" ng-click="loginCtrl.submitBtnEvt()">Login </button> </div> <!--</div>--> </form></div>  </div> <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>'),a.put("views/newbudget.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/home"><img src="../images/4.bf0ae54e.png" alt="4th dimensional thinkers" style="padding-bottom: 30px"></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li><a href="#/home">Home</a></li> <li class="active"><a href="#/newbudget"> Create Budget</a></li> <li><a href="#/account">My Account</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-click="homeCtrl.logout()" style="cursor:pointer"><a>Logout</a></li> </ul> </div> </div> </nav> <div class="container-fluid text-center"> <div class="row content"> <div class="col-sm-8 text-left"> <h1>New Budget</h1> </div> <hr> <hr> <hr> <hr> <table> <tr> <td><label>Budget Name:</label></td> <td><input type="text" class="form-control" name="budgetname" placeholder="Budget Name" ng-model="newBudgetCtrl.budgetName"></td> </tr> <tr> <td><label>Budget Limit:</label></td> <td><input type="text" class="form-control" name="limit" placeholder="Amount" ng-model="newBudgetCtrl.amount"></td> </tr> <tr> <td><label>Start Date:</label></td> <td><input type="date" class="form-control" name="startDate" placeholder="Date" ng-model="newBudgetCtrl.startDate"></td> </tr> <tr> <td><label>End Date:</label></td> <td><input type="date" class="form-control" name="startDate" placeholder="Date" ng-model="newBudgetCtrl.endDate"></td> </tr> <tr> <td></td> </tr> </table> <div class="text-center"><button type="button" style="width:100px" ng-click="newBudgetCtrl.submit()">Submit</button></div> </div> </div> <footer class="container-fluid text-center"> <p>4th Dimensional Thinkers</p> </footer>')}]);