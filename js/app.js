function SushiPlateCtrl($scope) {
    $scope.plates = [
        {name:'Red', price: 1.00, count:0},
        {name:'Yellow', price: 2.00, count:0},
        {name:'Blue', price: 3.00, count:0}
    ];

    $scope.getTotalPlates = function () {
        var totalPlates = 0;
        for (var i = 0, length = $scope.plates.length; i < length; i++) {
            totalPlates += $scope.plates[i].count;
        }
        return totalPlates;
    };
    $scope.getTotalPrice = function () {
        var totalPrice = 0;
        for (var i = 0, length = $scope.plates.length; i < length; i++) {
            totalPrice += $scope.plates[i].price * $scope.plates[i].count;
        }
        return totalPrice;
    };

    $scope.changeCount = function (plate, x) {
        plate.count += x;
    };
}
