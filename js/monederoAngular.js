let userId = 0
let token = ""
let coinId = 0

let inputTitle = false
let inputDesc = false
let inputMonto = false
let inputDay = false
let inputTipo = false
let inputCate = false
let inputFile = false

let play = $('#player')
let btnCamere = $('#btnCamera')
let btnCaBack = $('#btnBackCa')
let btnTakePh = $('#btnTakeOn')
let photoUser = $('#photoUser')
let photoBlob = null

$("#recipient-name").change(function () {
    if ($("#recipient-name").val() == '') {
        $('#recipient-name').prop("style", "border-width: 3px; border-color: red;");
        $('#lblTitle').append('<span style="color: red;" class="borrable8"> *Requerido</span>')
        inputTitle = false
    } else {
        $('#recipient-name').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable8");
        inputTitle = true
    }
})

$("#message-text").change(function () {
    if ($("#message-text").val() == '') {
        $('#message-text').prop("style", "border-width: 3px; border-color: red;");
        $('#lblDesc').append('<span style="color: red;" class="borrable7"> *Requerido</span>')
        inputDesc = false
    } else {
        $('#message-text').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable7");
        inputDesc = true
    }
})

$("#mount").change(function () {
    if ($("#mount").val() == '' || $("#mount").val() == '0') {
        $("span").remove(".borrable6");
        $('#mount').prop("style", "border-width: 3px; border-color: red;");
        $('#lblMonto').append('<span style="color: red;" class="borrable6"> *Requerido</span>')
        inputMonto = false
    } else {
        $('#mount').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable6");
        inputMonto = true
    }
})

$("#dia").change(function () {
    if ($("#dia").val() == '') {
        $('#dia').prop("style", "border-width: 3px; border-color: red;");
        $('#lblDay').append('<span style="color: red;" class="borrable5"> *Requerido</span>')
        inputDay = false
    } else {
        $('#dia').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable5");
        inputDay = true
    }
})

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("dia").setAttribute("min", today);

$("#tipo").change(function () {
    if ($("#tipo").val() == '0') {
        $('#tipo').prop("style", "border-width: 3px; border-color: red;");
        $('#lblType').append('<span style="color: red;" class="borrable4"> *Requerido</span>')
        inputTipo = false
    } else {
        $('#tipo').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable4");
        inputTipo = true
    }
})

$("#categoria").change(function () {
    if ($("#categoria").val() == '0') {
        $('#categoria').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCatego').append('<span style="color: red;" class="borrable3"> *Requerido</span>')
        inputCate = false
    } else {
        $('#categoria').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable3");
        inputCate = true
    }
})

$(".create").change(function () {
    if (inputTitle && inputDesc && inputMonto && inputDay && inputTipo && inputCate && inputFile) {
        $('#btnCreateTransa').prop("disabled", false);
    } else {
        $('#btnCreateTransa').prop("disabled", true);
    }
})

// -- camara --

const CAMARA = new Camera(play[0]);

btnCamere.on('click', () => {
    console.log("Abrir camara frontal");

    CAMARA.encender().then(result => {
        if (!result) {
            alert("Error al iniciar camara")
        }
    });

})

btnCaBack.on('click', () => {

    CAMARA.encenderBack().then(result => {
        if (!result) {
            alert("Error al iniciar camara")
        }
    });
})

btnTakePh.on('click', () => {
    console.log("Tomar foto");

    CAMARA.apagar();
    let photoObj = CAMARA.takePhoto();
    photoObj.then((obj) => {
        console.log(obj)

        photoUser.attr('src', obj.photo);

        photoBlob = obj.photoBlob
    })

    inputFile = true

    if (inputTitle && inputDesc && inputMonto && inputDay && inputTipo && inputCate && inputFile) {
        $('#btnCreateTransa').prop("disabled", false);
    } else {
        $('#btnCreateTransa').prop("disabled", true);
    }

})

var app = angular.module("money", ['ngRoute']);
app.controller("controllerCoin", function ($scope, $http, $window) {
    $scope.token = sessionStorage.getItem("token")
    $scope.userId = sessionStorage.getItem("idUsuario")
    $scope.coinId = sessionStorage.getItem("idMonedero")

    if ($scope.token == null) {
        $window.location.href = "/index.html"
    } else {
        $scope.user = {}
        $scope.categorias = []
        $scope.emergencies = []
        $scope.ingresos = []
        $scope.egresos = []

        $scope.getMonedero = function () {
            $http({
                url: "http://localhost:8080/I♥$/monedero/getByUser/" + $scope.userId,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.user = response.data;
                sessionStorage.setItem("idMonedero", response.data.idMonedero)
                coinId = response.data.idMonedero

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd;
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }

                today = yyyy + '-' + mm + '-' + dd;

                let obj = {
                    fecha: today,
                    monedero: response.data.idMonedero
                }

                $http({
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    },
                    url: 'http://localhost:8080/I♥$/transaccion/yesterday',
                    data: JSON.stringify(obj)
                }).then(function (res) {
                    $scope.emergencies = res.data;
                })

                obj = {
                    monedero: response.data.idMonedero,
                    tipo: 1
                }

                $http({
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    },
                    url: 'http://localhost:8080/I♥$/transaccion/orderAll',
                    data: JSON.stringify(obj)
                }).then(function (resp) {
                    $scope.ingresos = resp.data;
                })

                obj = {
                    monedero: response.data.idMonedero,
                    tipo: 2
                }

                $http({
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    },
                    url: 'http://localhost:8080/I♥$/transaccion/orderAll',
                    data: JSON.stringify(obj)
                }).then(function (resp) {
                    $scope.egresos = resp.data;
                })
            })
        }

        $scope.getMonedero();

        userId = $scope.userId
        token = $scope.token

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

        $scope.eliminar = function (id) {
            Swal.fire({
                title: '¿Estas completamente seguro de querer hacer esto?',
                text: "¡Esta acción no puede ser revertida!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡ESTOY SEGURO!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {

                    $http({
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + $scope.token
                        },
                        url: 'http://localhost:8080/I♥$/transaccion/delete/' + id
                    }).then(function (response) {
                        Swal.fire(
                            '¡TRANSACCION ELIMINADA!',
                            'Esta transaccion fué eliminada con exito.',
                            'success'
                        ).then(() => {
                            window.location.reload();
                        })
                    }, function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Algo fallo durante el proceso de cambio',
                        });
                    });

                }
            })
        }

        $scope.cobrar = function (trans) {
            if ($scope.user.monto - trans.monto <= 0 && trans.tipo == 2) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error, tu monedero no puede quedar en 0, realiza un ingreso',
                });
            } else {
                $http({
                    url: "http://localhost:8080/I♥$/transaccion/cobrar/" + trans.idTransaccion,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    }
                }).then(function (response) {
                    let obj = {}
                    if (trans.tipo == 2) {
                        obj = {
                            idMonedero: $scope.coinId,
                            monto: $scope.user.monto - trans.monto
                        }
                    } else {
                        obj = {
                            idMonedero: $scope.coinId,
                            monto: $scope.user.monto + trans.monto
                        }
                    }

                    $http({
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + $scope.token
                        },
                        url: 'http://localhost:8080/I♥$/monedero/update',
                        data: JSON.stringify(obj)

                    }).then(function (response) {
                        if (response.data != "") {
                            window.location.reload();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Algo fallo durante el proceso de cambio',
                            });
                        }
                    }, function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Algo fallo durante el proceso de cambio',
                        });
                    });
                })
            }
        }

        $scope.categoriaSave = function (id, tipo) {
            sessionStorage.setItem("idCatego", id)
            sessionStorage.setItem("tipo", tipo)
            $window.location.href = "/egresos.html"
        }

        $scope.transaGuardar = function (id) {
            sessionStorage.setItem("idTransa", id)
            $window.location.href = "/transaccion.html"
        }

        $scope.cerrarSesion = function () {
            sessionStorage.clear()
            $window.location.href = "/index.html"
        }
    }

})

async function createTrans() {
    var formData = new FormData();
    if (photoBlob) {
        formData.append("photo", photoBlob);
    }
    //formData.append("photo", myfile.files[0]);
    formData.append("title", document.getElementById("recipient-name").value)
    formData.append("description", document.getElementById("message-text").value)
    formData.append("payday", document.getElementById("dia").value)
    formData.append("mount", document.getElementById("mount").value)
    formData.append("type", document.getElementById("tipo").value)
    formData.append("category", document.getElementById("categoria").value)
    formData.append("coin", coinId)

    let res = await fetch('http://localhost:8080/I♥$/transaccion/create', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        }),
        body: formData
    });
    if (res.status === 200) {
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso!!',
            text: 'La transaccion ha sido registrada',
        }).then(() => {
            window.location.href = "/monedero.html"
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo fallo durante el proceso de cambio',
        });
    }
}