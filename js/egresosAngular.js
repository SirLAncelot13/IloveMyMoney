let userId = 0
let token = ""
let coinId = 0
let cambio = false
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

let inputTitle = false
let inputDesc = false
let inputMonto = false
let inputDay = false
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

$(".create").change(function () {
    if (inputTitle && inputDesc && inputMonto && inputDay && inputFile) {
        $('#btnCreateTransa').prop("disabled", false);
    } else {
        $('#btnCreateTransa').prop("disabled", true);
    }
})

output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

let principal = $("#busAvan");
let news = $("#mostrar");

$(".btn-seguir").on("click", function (e) {
    e.preventDefault();
    console.log("Btn-seguir pulsado")
    principal.fadeOut(function () {
        news.slideDown(1000)
    })
});

$(".btn-mostrar").on("click", function () {
    news.fadeOut(function () {
        principal.slideDown(1000)
    })
})

$("#myRange").change(function () {
    cambio = true
    console.log("Cambio: " + cambio)
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

    inputFile = true

    if (inputTitle && inputDesc && inputMonto && inputDay && inputFile) {
        $('#btnCreateTransa').prop("disabled", false);
    } else {
        $('#btnCreateTransa').prop("disabled", true);
    }

})

var app = angular.module("money", ['ngRoute']);
app.controller("controllerEgresos", function ($scope, $http, $window) {
    $scope.token = sessionStorage.getItem("token")
    $scope.userId = sessionStorage.getItem("idUsuario")
    $scope.coinId = sessionStorage.getItem("idMonedero")
    $scope.cateId = sessionStorage.getItem("idCatego")
    $scope.tipo = sessionStorage.getItem("tipo")

    if ($scope.token == null) {
        $window.location.href = "/index.html"
    } else {
        userId = $scope.userId
        token = $scope.token

        $scope.monto = 0
        $scope.categorias = []
        $scope.emergencies = []

        $scope.getMonedero = function () {
            $http({
                url: "http://localhost:8080/I♥$/monedero/getByUser/" + $scope.userId,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.monto = response.data.monto;
                coinId = response.data.idMonedero
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

        $scope.getAllFilter = function () {
            let obj = {
                coinId: $scope.coinId,
                cateId: $scope.cateId,
                tipo: $scope.tipo
            }

            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://localhost:8080/I♥$/transaccion/filter',
                data: JSON.stringify(obj)
            }).then(function (res) {
                $scope.emergencies = res.data;
                console.log($scope.emergencies)
            })
        }

        $scope.getAllFilter();

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
            if ($scope.monto - trans.monto <= 0) {
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
                            monto: $scope.monto - trans.monto
                        }
                    } else {
                        obj = {
                            idMonedero: $scope.coinId,
                            monto: $scope.monto + trans.monto
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

        $scope.greaterThan = function (prop, val) {
            console.log("Estado = " + cambio)
            if (cambio) {
                return function (item) {
                    return item[prop] >= val;
                }
            } else {
                return function (item) {
                    return item[prop] >= 1;
                }
            }

        }

        $scope.betweenAt = function (prop, vali1, vali2) {
            //console.log(vali1.getDate() + " - " + vali2)
            var day = 0;
            var month = 0;
            var year = 0;

            var dia = 0;
            var mes = 0;
            var ano = 0;
            if (vali1 == null && vali2 == null) {
                return function (item) {
                    return item[prop] >= '2000-06-13' && item[prop] <= '2099-06-13';
                }
            } else if (vali1 != null && vali2 == null) {
                day = vali1.getDate();
                month = vali1.getMonth() + 1;
                year = vali1.getFullYear();
                vali1 = year + "-" + month + "-" + day
                return function (item) {
                    return item[prop] >= vali1 && item[prop] <= '2099-06-13';
                }
            } else if (vali1 == null && vali2 != null) {
                dia = vali2.getDate();
                mes = vali2.getMonth() + 1;
                ano = vali2.getFullYear();
                vali2 = ano + "-" + mes + "-" + dia
                return function (item) {
                    return item[prop] >= '2000-06-13' && item[prop] <= vali2;
                }
            } else {
                day = vali1.getDate();
                month = vali1.getMonth() + 1;
                year = vali1.getFullYear();
                vali1 = year + "-" + month + "-" + day

                dia = vali2.getDate();
                mes = vali2.getMonth() + 1;
                ano = vali2.getFullYear();
                vali2 = ano + "-" + mes + "-" + dia
                return function (item) {
                    return item[prop] >= vali1 && item[prop] <= vali2;
                }
            }
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
            window.location.href = "/egresos.html"
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo fallo durante el proceso de cambio',
        });
    }
}