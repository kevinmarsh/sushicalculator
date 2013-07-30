var sushiApp = angular.module('sushiApp', []);

sushiApp.config( function($routeProvider){
    // TODO: add html5 links --> $locationProvider.html5Mode(true)
    $routeProvider
        .when('/', {
            controller: 'SushiPlateCtrl',
            templateUrl: 'partials/sushiCalc.html'
        })
        .when('/about', {
            templateUrl: 'partials/about.html'
        })
        .when('/prices', {
            controller: 'SushiPlateCtrl',
            templateUrl: 'partials/prices.html'
        })
        .otherwise({redirectTo: '/'});
});

sushiApp.controller('SushiPlateCtrl', function($scope) {
    // TODO: store plate counts in local storage
    $scope.plates = [
        {name: 'Green', price: 1.90, count: 0},
        {name: 'Blue', price: 2.50, count: 0},
        {name: 'Purple', price: 3.10, count: 0},
        {name: 'Orange', price: 3.60, count: 0},
        {name: 'Pink', price: 4.10, count: 0},
        {name: 'Grey', price: 5.00, count: 0}
    ];
    $scope.getTotalPlates = function() {
        var totalPlates = 0;
        for (var i = 0, length = $scope.plates.length; i < length; i++) {
            totalPlates += $scope.plates[i].count;
        }
        return totalPlates;
    };
    $scope.getTotalPrice = function() {
        var totalPrice = 0;
        for (var i = 0, length = $scope.plates.length; i < length; i++) {
            totalPrice += $scope.plates[i].price * $scope.plates[i].count;
        }
        return totalPrice;
    };
    $scope.changeCount = function(plate, x) {
        if (plate.count + x >= 0) {
            plate.count += x;
        }
    };
    $scope.clearPlates = function() {
        for (var i = 0, length = $scope.plates.length; i < length; i++) {
            $scope.plates[i].count = 0;
        }
    }
});
