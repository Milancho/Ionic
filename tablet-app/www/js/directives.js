starter

// Here is where the magic works
.directive('date', function (dateFilter) {
    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'yyyy-MM-dd';
           
            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
})

.directive('decimals', function (numberFilter) {
    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ctrl) {

            var decimalsFormat = parseInt(attrs['decimals'], 10) || 2;
           
            ctrl.$formatters.unshift(function (modelValue) {
                return numberFilter((modelValue) ? parseInt(modelValue, 10) : 0, decimalsFormat);
            });
        }
    };
})

/*.directive('dynamicIcon', function($compile, $interpolate) {
    return {
        template: '',
        link: function($scope, element, attributes) {
            var content = JSON.parse(attributes.content);
            console.log(content);
            if(content && content>-1){
                var icon = '';
                var template = '';
                switch (content) {
                    ///////////////////////////// input tag ///////////////////
                    case 178:
                        icon = 'ion-alert-circled assertive';
                        template = '<i class="icon '+icon+'"></i>';
                        break;
                    ///////////////////////////// a tag ///////////////////////
                    case 180:
                        icon = 'ion-android-star';
                        template = '<i class="icon '+icon+'"></i>';
                        break;
                    default:
                        log('No ImageIndex value');
                        break;
                }
                console.log('dynamicIcon: ', template);
                element.replaceWith($compile(template)($scope));
            } else {
                log('No ImageIndex value or value <= -1');
            };
            element.bind('click', function() {
                alert('heheee');
                /*var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
                if (sideMenuCtrl) {
                    $ionicHistory.nextViewOptions({
                        historyRoot: false,
                        disableAnimate: false,
                        expire: 300
                    });
                    sideMenuCtrl.close();
                }*|/
            });
        }
    };
})*/
