var app = angular.module('rrsoApp', [
]);
app
.controller('HomeCtrl', function ($scope, $timeout) {
    $scope.viewModel = {
        wyplata: 1000,
        liczbaRat: 12,
        kwotaRaty: 100,
        period: 30,
        rrso: null,
        data: null,
    };
    $scope.estimateRRSO = function() {
        if ($scope.validateData()) {
            $scope.viewModel.wyplata = parseFloat($scope.viewModel.wyplata);
            $scope.viewModel.liczbaRat = parseFloat($scope.viewModel.liczbaRat);
            $scope.viewModel.kwotaRaty = parseFloat($scope.viewModel.kwotaRaty);
            var calculator = new RRSO();
            var cashflow = [];
            cashflow.push({period:0, amount:(-1*$scope.viewModel.wyplata)});
            for (i = 1; i <= $scope.viewModel.liczbaRat; i++) {
                cashflow.push({
                    period: i*$scope.viewModel.period/365,
                    amount: $scope.viewModel.kwotaRaty
                });
            }
            $scope.viewModel.data = cashflow;
            $scope.viewModel.rrso = null;
            $scope.viewModel.rrso = "szacowanie w toku";
            $timeout(function () {
                $scope.viewModel.rrso = calculator.RRSO(cashflow);
            }, 0);
        } else {
            // TODO
        }
    };
    $scope.validateData = function() {
        return $scope.validateFloat($scope.viewModel.wyplata) &&
            $scope.validateInteger($scope.viewModel.liczbaRat) &&
            $scope.validateFloat($scope.viewModel.kwotaRaty) &&
            $scope.validatePeriod();
    };
    $scope.validateInteger = function (data) {
        return (data == parseInt(data, 10));
    };
    $scope.validateFloat = function (data) {
        return (data == parseFloat(data, 10));
    };
    $scope.validatePeriod = function () {
        return ($scope.viewModel.period=='7' || $scope.viewModel.period=='30' || $scope.viewModel.period=='91' || $scope.viewModel.period=='182' || $scope.viewModel.period=='365');
    };
})
.directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                return '' + val;
            });
        }
    };
});