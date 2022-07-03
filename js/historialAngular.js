var app = angular.module("money", ['ngRoute']);
app.controller("controllerHistory", function($scope, $http, $window) { 
    $scope.token = sessionStorage.getItem("token")
    $scope.userId = sessionStorage.getItem("idUsuario")
    $scope.coinId = sessionStorage.getItem("idMonedero")

    if ($scope.token == null) {
        $window.location.href = "/index.html"
    } else {
        $scope.monto = 0
        $scope.categorias = []
        $scope.muertos = []

        $scope.getMonedero = function() {
            $http({
                url: "http://localhost:8080/I♥$/monedero/getByUser/" + $scope.userId,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                $scope.monto = response.data.monto;
            })
        }

        $scope.getMonedero();

        $scope.getCategoria = function () {
            $http({
                url: "http://localhost:8080/I♥$/categoria/getByUserOn/" + $scope.userId,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.categorias = response.data;
            })
        }

        $scope.getCategoria();

        $scope.historial = function () {
            $http({
                url: "http://localhost:8080/I♥$/transaccion/historial/" + $scope.coinId,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.muertos = response.data;
                console.log($scope.muertos)
            })
        }

        $scope.historial();

        $scope.categoriaSave = function(id, tipo){
            sessionStorage.setItem("idCatego", id)
            sessionStorage.setItem("tipo", tipo)
            $window.location.href = "/egresos.html" 
        }

        $scope.cerrarSesion = function () {
            sessionStorage.clear()
            $window.location.href = "/index.html" 
        }
    }
})