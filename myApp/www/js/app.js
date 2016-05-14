angular.module('app', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('page1', {
      url: "/page1",
      templateUrl: "templates/page1.html",
      controller: "Page1Ctrl"
    })
    .state('page2', {
      url: "/page2",
      templateUrl: "templates/page2.html",
      controller: "Page2Ctrl"
    });

  $urlRouterProvider.otherwise("/page1");
})


.controller('Page1Ctrl', function($scope, $state, formData) {
  $scope.user = {};
   $scope.submitForm = function(user) {
   if (user.firstName && user.lastName && user.comments) {
     console.log("Submitting Form", user);
        formData.updateForm(user);
   console.log("Retrieving form from service", formData.getForm());
   $state.go('page2');
   } else {
     alert("Please fill out some information for the user");
   }
 };

})

.controller('Page2Ctrl', function($scope, formData) {
    $scope.user = formData.getForm();
})

.service('formData', function() {
 return {
   form: {},
   getForm: function() {
     return this.form;
   },
   updateForm: function(form) {
     this.form = form;
   }
 }
})



