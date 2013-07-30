function SushiPlateCtrl($scope) {
    $scope.plates = [
        {name: 'Green', color: '#b2d34a', price: 1.90, count: 0},
        {name: 'Blue', color: '#00abea', price: 2.50, count: 0},
        {name: 'Purple', color: '#662d91', price: 3.10, count: 0},
        {name: 'Orange', color: '#f37021', price: 3.60, count: 0},
        {name: 'Pink', color: '#c80542', price: 4.10, count: 0},
        {name: 'Grey', color: '#8cabad', price: 5.00, count: 0}
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
        if (plate.count + x >= 0) {
            plate.count += x;
        }
    };
}
