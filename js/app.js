var sushiApp = angular.module('sushiApp', ['firebase']);

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

sushiApp.controller('SushiPlateCtrl', function($scope, angularFire, $location) {
    var url = 'https://bbd.firebaseio.com/sushiCalulator/plates';
    var promise = angularFire(url, $scope, 'plates', []);
    promise.then(function() {
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
                plate.count += x;
            }
        };
        $scope.clearPlates = function() {
            for (var i = 0, length = $scope.plates.length; i < length; i++) {
                $scope.plates[i].count = 0;
            }
        }
        $scope.savePlates = function() {
            localStorage.setItem('score', $scope.getTotalPrice());
            $location.path('/highscores/save');
        }
    });
});

sushiApp.controller('HighScoreCtrl', function($scope, angularFire, $location) {
    var url = 'https://bbd.firebaseio.com/sushiCalulator/highscore';
    var promise = angularFire(url, $scope, 'highscores', []);
    promise.then(function() {
        $scope.newHighscore = {
            score: parseFloat(localStorage.getItem('score')),
            name: '',
            people: 2,  // TODO: Validate that this is never < 1
            date: new Date(),
            location: ''
        }
        $scope.save = function(newScore) {
            $scope.highscores.push(newScore);
            $location.path('/highscores');
        }
    });
});
