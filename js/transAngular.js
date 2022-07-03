let transId = 0
let token = ""

let inputTitle = false
let inputDescipcion = false
let inputDay = false
let inputMonto = false
document.getElementById("dia").disabled = true;

let play = $('#player')
let btnCamere = $('#btnCamera')
let btnCaBack = $('#btnBackCa')
let btnTakePh = $('#btnTakeOn')
let photoUser = $('#photoUser')
let photoBlob = null

$("#btnEnable").click(function (event) {
    console.log("Holiwi")
    event.preventDefault();
    $('.form-control').prop("disabled", false);
    $('.form-control-file').prop("disabled", false);
    $('.custom-select').prop("disabled", false);
    $('#btnCamera').prop("disabled", false);
    $('#btnBackCa').prop("disabled", false);
    $('#btnTakeOn').prop("disabled", false);
    document.getElementById("dia").disabled = false;
});

$("#title").change(function () {
    if ($("#title").val() == '') {
        $('#title').prop("style", "border-width: 3px; border-color: red;");
        $('#lblTitle').append('<span style="color: red;" class="borrable8"> *Requerido</span>')
        inputTitle = false
    } else {
        $('#title').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable8");
        inputTitle = true
    }
})

$("#exampleFormControlTextarea1").change(function () {
    if ($("#exampleFormControlTextarea1").val() == '') {
        $('#exampleFormControlTextarea1').prop("style", "border-width: 3px; border-color: red;");
        $('#lblDescrip').append('<span style="color: red;" class="borrable7"> *Requerido</span>')
        inputDescipcion = false
    } else {
        $('#exampleFormControlTextarea1').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable7");
        inputDescipcion = true
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
document.getElementById("dia").setAttribute("min", today)

$(".create").change(function () {
    if (inputTitle && inputDescipcion && inputMonto && inputDay) {
        $('#btnEdit').prop("disabled", false);
    } else {
        $('#btnEdit').prop("disabled", true);
    }
})

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

    $('#btnFile').prop("disabled", false);
})

var app = angular.module("money", ['ngRoute']);
app.controller("controllerTrans", function ($scope, $http, $window) {
    $scope.token = sessionStorage.getItem("token")
    $scope.userId = sessionStorage.getItem("idUsuario")
    $scope.transId = sessionStorage.getItem("idTransa")
    $scope.coinId = sessionStorage.getItem("idMonedero")

    transId = $scope.transId
    token = $scope.token

    if ($scope.token == null) {
        $window.location.href = "/index.html"
    } else {
        $scope.categorias = []
        $scope.transaccion = {}

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

        $scope.getTransa = function () {
            $http({
                url: "http://localhost:8080/I♥$/transaccion/one/" + $scope.transId,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.transaccion = response.data;
            })
        }

        $scope.getTransa();

        $scope.actualizarTransa = function () {
            let obj = {
                idTransaccion: $scope.transId,
                titulo: document.getElementById("title").value,
                descripcion: document.getElementById("exampleFormControlTextarea1").value,
                categoria: {
                    idCategoria: document.getElementById("categoria").value
                },
                tipo: document.getElementById("tipo").value,
                fechaCobro: document.getElementById("dia").value,
                monto: document.getElementById("mount").value
            }

            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://localhost:8080/I♥$/transaccion/update',
                data: JSON.stringify(obj)

            }).then(function (response) {
                if (response.data != "") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exitoso',
                        text: 'Los cambios han sido aplicados al registro solicitado',
                    }).then(() => {
                        $window.location.href = "/transaccion.html"
                    });

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
        }

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
                            $window.location.href = "/monedero.html"
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
            if ($scope.transaccion.monedero.monto - trans.monto <= 0) {
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
                            monto: $scope.transaccion.monedero.monto - trans.monto
                        }
                    } else {
                        obj = {
                            idMonedero: $scope.coinId,
                            monto: $scope.transaccion.monedero.monto + trans.monto
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
                            $window.location.href = "/monedero.html"
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

        $scope.cerrarSesion = function () {
            sessionStorage.clear()
            $window.location.href = "/index.html"
        }
    }
})

async function changePhoto() {
    var formData = new FormData();
    if (photoBlob) {
        formData.append("photo", photoBlob);
    }
    //formData.append("photo", exampleFormControlFile1.files[0]);
    formData.append("idTransa", transId);

    let res = await fetch('http://localhost:8080/I♥$/transaccion/changePhoto', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        }),
        body: formData
    });
    console.log(res)
    if (res.status === 200) {
        console.log("Awebo")
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso!!',
            text: 'Los cambios han sido aplicados al registro solicitado',
        }).then(() => {
            window.location.href = "/transaccion.html"
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo fallo durante el proceso de cambio',
        });
    }
}