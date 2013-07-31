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
        .otherwise({redirectTo: '/'});
});

sushiApp.controller('SushiPlateCtrl', function($scope, angularFire) {
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
});

sushiApp.controller('HighScoreCtrl', function($scope, angularFire) {
    var url = 'https://bbd.firebaseio.com/sushiCalulator/highscore';
    var promise = angularFire(url, $scope, 'highscores', []);
    promise.then(function() {
        // TODO: save to highscore, reset high scores
    });
});
