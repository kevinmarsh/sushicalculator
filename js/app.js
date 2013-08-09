var sushiApp = angular.module('sushiApp', ['firebase', 'LocalStorageModule']);

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
        .when('/prices', {
            controller: 'SushiPlateCtrl',
            templateUrl: 'partials/prices.html'
        })
        .when('/highscores', {
            controller: 'HighScoreCtrl',
            templateUrl: 'partials/highscores.html'
        })
        .when('/highscores/save', {
            controller: 'HighScoreCtrl',
            templateUrl: 'partials/saveHighscore.html'
        })
        .otherwise({redirectTo: '/'});
});

sushiApp.controller('SushiPlateCtrl', function($scope, localStorageService, $location) {
    $scope.plates = [
        {name: 'Green', price: 1.90, count: parseInt(localStorageService.get('greenCount') || 0)},
        {name: 'Blue', price: 2.50, count: parseInt(localStorageService.get('blueCount') || 0)},
        {name: 'Purple', price: 3.10, count: parseInt(localStorageService.get('purpleCount') || 0)},
        {name: 'Orange', price: 3.60, count: parseInt(localStorageService.get('orangeCount') || 0)},
        {name: 'Pink', price: 4.10, count: parseInt(localStorageService.get('pinkCount') || 0)},
        {name: 'Grey', price: 5.00, count: parseInt(localStorageService.get('greyCount') || 0)}
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
        // To ensure that the count doesn't drop below 0
        if (plate.count + x >= 0) {
            localStorageService.add(plate.name.toLowerCase() + 'Count', parseInt(plate.count += x));
        }
    };
    $scope.clearPlates = function() {
        for (var i = 0, length = $scope.plates.length; i < length; i++) {
            localStorageService.add($scope.plates[i].name.toLowerCase() + 'Count', $scope.plates[i].count = 0)

        }
    };
    $scope.savePlates = function() {
        localStorage.setItem('score', $scope.getTotalPrice());
        $location.path('/highscores/save');
    };
    angular.element(document).scope().noHTML5 = typeof(Storage) === "undefined";
});

sushiApp.controller('HighScoreCtrl', function($scope, angularFire, $location) {
    var url = 'https://bbd.firebaseio.com/sushiCalulator/highscore';
    var promise = angularFire(url, $scope, 'highscores', []);
    $scope.loading = true;
    promise.then(function() {
        $scope.newHighscore = {
            score: parseFloat(localStorage.getItem('score')),
            name: '',
            people: 2,  // TODO: Validate that this is never < 1
            date: new Date(),
            location: ''
        };
        $scope.save = function(newScore) {
            $scope.highscores.push(newScore);
            $location.path('/highscores');
        };
        $scope.loading = false;
    });
    angular.element(document).scope().noHTML5 = typeof(Storage) === "undefined";
});

