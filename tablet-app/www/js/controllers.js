var localUrl = 'http://localhost/jsons/tabletApp/';

var loadingOptions = {
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
};

var access_token = '';
//var serviceUrl = 'http://aspekt.dyndns.org/tablet-app';
var serviceUrl = 'http://192.168.1.25:8081/tablet-app';
var menu = [];

var log = function(json) {
    console.log('Log: ', JSON.stringify(json));
}

var httpTimeout = 15000;


var starter = angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $window, $state, $http, $ionicLoading, $httpParamSerializer, $rootScope) {
    $scope.loginData = {
        grant_type: 'password',
        username: 'aspekt',
        password: 'aspekt',
        //username: 'aspekt2',
        //password: 'Qwerty1$'
    };
    $scope.doLogin = function() {
        $ionicLoading.show(loadingOptions);
        var request = {
            method: 'POST',
            url: serviceUrl + '/token',
            //url: 'http://aspekt.dyndns.org/tablet-app/api/dependency',
            //url: 'http://192.168.1.25:8081/tablet-app/api/Dependency',
            //url: localUrl + 'link1.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            xhrFields: { withCredentials: true },
            data: $httpParamSerializer($scope.loginData),
            timeout: httpTimeout,
        }
        $http(request).then(function(response) {
            //alert(JSON.stringify(response));

                $ionicLoading.hide();
                console.log("RESPONSE: " + JSON.stringify(response));
                access_token = response.data.access_token;
                console.log('Token: ', access_token);
                //
                var request = {
                    method: 'GET',
                    url: serviceUrl + '/api/Navigation',
                    //url: localUrl + 'link2.php',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + access_token },
                    xhrFields: { withCredentials: true },
                    //data: JSON.stringify(data),
                    timeout: httpTimeout
                }
                $http(request).then(function(response) {
                    console.log("RESPONSE: " + JSON.stringify(response.data));
                    //$scope.form = response.data;
                    //$ionicLoading.hide();
                    $rootScope.$broadcast('menu:changed', response.data);
                    $state.go('app.dashboard');
                }, function(error) {
                    console.log("ERROR: " + JSON.stringify(error));
                    //$ionicLoading.hide();
                });
                //
                //$state.go('app.dashboard');
            },
            function(error) {
                console.log("ERROR: " + JSON.stringify(error));
                $window.alert("Wrong credentials");
                $ionicLoading.hide();
            });

    }
})

.controller('AppCtrl', function($scope, $state) {
    $scope.menu = menu;
    $scope.openMenu = function(menuItem) {

        var params = JSON.stringify({ Tree: menuItem.NavigationItemID, title: menuItem.Text });

        //if (menuItem.type == 'List') {
        //    $state.go('app.list', { params: params });
        //}
        //if (menuItem.type == 'New') {
        $state.go('app.edit', { params: params });
        //}
        console.log(JSON.stringify(menuItem));
        console.log('params: ', params);
    }

    $scope.$on('menu:changed', function(event, data) {
        // you could inspect the data to see if what you care about changed, or just update your own scope
        //$scope.userInfo = User.getUserInfo()[0];
        //$scope.isLoggedIn = user.loggedIn;
        $scope.menu = data;
        console.log('MENU LINKS CHANGED');
    });
})

.controller('DashboardCtrl', function($scope) {

})

.controller('ListCtrl', function($scope, $stateParams) {
    console.log(JSON.stringify($stateParams));
})

.controller('EditCtrl', function($scope, $stateParams, $ionicModal, $http, $httpParamSerializer, $ionicLoading, $ionicScrollDelegate, $ionicPopup, ionicDatePicker) {

    // console.log(JSON.stringify($stateParams));
    $ionicScrollDelegate.scrollTop();

    var params = JSON.parse($stateParams['params']);
    log(params);
    $scope.title = params['title'];
    $scope.enumValueTypes = enumValueTypes;
    $scope.iconValues = iconValues;
    var tree = params['Tree'];

    /*ionic-datepicker*/
    $scope.itemClicked = -1;

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        console.log('itemClicked', $scope.itemClicked);
        console.log('val', val);
        //console.log($scope.form.groups[1][$scope.itemClicked]);
        if ($scope.itemClicked !== -1) {
            $scope.itemClicked.AnswerValueID = val;
            $scope.itemClicked = -1;
        }
        
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      dateFormat: 'dd/MM/yyyy',
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(gKey, iKey, item){
        //console.log('group', gKey);
        //console.log('itemId', iKey);
        //console.log(item.AnswerValueID);
        $scope.itemClicked = $scope.form.groups[gKey].items[iKey];
          
        if(item.AnswerValueID){
            ipObj1.inputDate = new Date( item.AnswerValueID );
        } else {
            ipObj1.inputDate = new Date();
        }

        ionicDatePicker.openDatePicker(ipObj1);
    };
    /*ionic-datepicker end*/

    /*ion-autocomplete*/
    $scope.model = "";
    $scope.clickedValueModel = "";
    $scope.removedValueModel = "";

    $scope.callbackMethod = function (query) {
        if (query) {
            var retItems = [];
            angular.forEach($scope.form.comboAnswers, function(comboItem, key) {
              if((comboItem.Item_Id == 1751) && (comboItem.Answer.toLowerCase().indexOf(query.toLowerCase()) != -1)){
                //retItems.push(key + ': ' + value);
                retItems.push({id: comboItem.ComboAnswerID, name: comboItem.Answer, view: comboItem.Answer});
              }
            });
            //var myStr = "I think, therefore I am.";if (myStr.indexOf(query) != -1){  console.log (myStr);}
            return { items: retItems };
            /*return {
                items: [
                    {id: "1", name: query + "1", view: "view: " + query + "1"},
                    {id: "2", name: query + "2", view: "view: " + query + "2"},
                    {id: "3", name: query + "3", view: "view: " + query + "3"}]
            };*/
        }
        return {items: []};
    };

    $scope.itemsClicked = function (callback) {
        $scope.clickedValueModel = callback;
    };
    $scope.itemsRemoved = function (callback) {
        $scope.removedValueModel = callback;
    };
    /*ion-autocomplete end*/

    var processData = function(data) {
        log(data);
        $ionicLoading.show(loadingOptions);
        
        /*var request = {
            method: 'POST',
            //url: serviceUrl + '/token',
            url: localUrl + 'link_init.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            xhrFields: { withCredentials: true },
            data: $httpParamSerializer(data),
            timeout: httpTimeout,
        }*/
        var request = {
            method: 'POST',
            url: serviceUrl + '/api/item/',
            data: JSON.stringify(data),
            //url: localUrl + 'link_init.php',
            //data: $httpParamSerializer(data),
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + access_token },
            xhrFields: { withCredentials: true },
            timeout: httpTimeout
        }
        $http(request).then(function(response) {
            console.log("RESPONSE: " + JSON.stringify(response.data));
            console.log(JSON.stringify(response.data.initialize.f_Continue));
            if(response.data.initialize.f_Continue && (response.data.initialize.ActionKey == "Save")){
                $ionicPopup.alert({
                      title: 'Save successful',
                      content: 'Click to continue.'
                })
                .then(function(result) {
                  /*if(!result) {
                    ionic.Platform.exitApp();
                  }*/
                });
            }
            $scope.form = response.data;
            $ionicLoading.hide();
        }, function(error) {
            console.log("ERROR: " + JSON.stringify(error));
            $ionicLoading.hide();
        });
    }

    $scope.myClick = function(msg) {
        console.log('I was clicked', msg);
        if(msg && msg != 'Required'){
            $ionicPopup.alert({
                          title: msg,
                          content: ''
            })
            .then(function(result) {
              /*if(!result) {
                ionic.Platform.exitApp();
              }*/
            });
        }
    }
    $scope.submit = function(method) {
        console.log('FORM DATA: ', JSON.stringify($scope.form));
        if ($scope.form.initialize.ActionKey || method) {
            $scope.form.initialize.ActionKey = method;
        }
        processData($scope.form);
    }
    $scope.conditionalSubmit = function(item) {
        if (item.Validate) {
            $scope.submit('Load');
        }
    }

    processData({ "initialize": { "rDACID": 0, "Tree": tree, "ActionKey": "Load", "f_Continue": true } });

})


;

/*var menu = [{
    menuId: '',
    text: 'Contacts List',
    icon: 'ion-person-stalker',
    type: 'List'
}, {
    menuId: 'DAC-ASR-7',
    text: 'New Contact',
    icon: 'ion-person-add',
    type: 'New'
}, {
    menuId: 'DAC-ASR-25',
    text: 'New Contact Test',
    icon: 'ion-person-add',
    type: 'New'
}]*/



/*

[  
   {  
      "navigationItems":[  
         {  
            "NavigationItemID":"9809010101",
            "NavigationGroupID":"98",
            "Text":"ФИЗИЧКО ЛИЦЕ"
         }
      ],
      "NavigationGroupID":"98",
      "Text":"Registers"
   },
   {  
      "navigationItems":[  
         {  
            "NavigationItemID":"701004",
            "NavigationGroupID":"70",
            "Text":"Client Mobile"
         }
      ],
      "NavigationGroupID":"70",
      "Text":"Transaction Account"
   }
]

*/

var enumValueTypes = {
    VTText: 0,
    VTComboFromDB: 6,
    VTComboFromCode: 7,

    VTInteger: 1,
    VTDecimal: 2,
    VTDate: 3,
    VTDateCombo: 11,
    VTFile: 10,

    VTZoom: 4,
    VTZoomMultiChoice: 8,
    VTComboMultiChoice: 9,

    VTRange: 5
};

var iconValues = {
    178: {name: 'ion-alert-circled assertive'},
    180: {name: 'ion-android-star'}
}