let userId = 0
let token = ""

let y = 2
namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

let play = $('#player')
let btnCamere = $('#btnCamera')
let btnCaBack = $('#btnBackCa')
let btnTakePh = $('#btnTakeOn')
let photoUser = $('#photoUser')
let photoBlob = null

$("#nombre").change(function () {
    if ($("#nombre").val() == '') {
        $("span").remove(".borrable4");
        $('#nombre').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateName').append('<span style="color: red;" class="borrable4"> *Requerido</span>')
        $('#btnEdit').prop("disabled", true);

    } else if (!namesRegex.test($("#nombre").val())) {
        $("span").remove(".borrable4");
        $('#nombre').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateName').append('<span style="color: red;" class="borrable4"> *Formato erroneo</span>')
        $('#btnEdit').prop("disabled", true);

    } else {
        $('#nombre').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable4");
        $('#btnEdit').prop("disabled", false);
    }
})

$("#apelPater").change(function () {
    if ($("#apelPater").val() == '') {
        $("span").remove(".borrable5");
        $('#apelPater').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreatePater').append('<span style="color: red;" class="borrable5"> *Requerido</span>')
        $('#btnEdit').prop("disabled", true);

    } else if (!namesRegex.test($("#apelPater").val())) {
        $("span").remove(".borrable5");
        $('#apelPater').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreatePater').append('<span style="color: red;" class="borrable5"> *Formato erroneo</span>')
        $('#btnEdit').prop("disabled", true);

    } else {
        $('#apelPater').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable5");
        $('#btnEdit').prop("disabled", false);
    }
})

$("#apelMater").change(function () {
    if ($("#apelMater").val() == '') {
        $("span").remove(".borrable6");
        $('#apelMater').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateMater').append('<span style="color: red;" class="borrable6"> *Requerido</span>')
        $('#btnEdit').prop("disabled", true);

    } else if (!namesRegex.test($("#apelMater").val())) {
        $("span").remove(".borrable6");
        $('#apelMater').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateMater').append('<span style="color: red;" class="borrable6"> *Formato erroneo</span>')
        $('#btnEdit').prop("disabled", true);

    } else {
        $('#apelMater').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable6");
        $('#btnEdit').prop("disabled", false);
    }
})

$("#modalBodyCate").on('change', '.inputCustom', function () {
    if ($(this).val() == '') {
        $(".borrable8").remove();
        $('#modalFooterCate').append('<span style="color: red;" class="borrable8"> *Falta un campo </span>')
        $('#btnCreateCategory').prop("disabled", true);
    } else {
        $(".borrable8").remove();
        $("#modalFooterCate").remove("span");
        $('#btnCreateCategory').prop("disabled", false);
    }

})

$("#nombreUpdate").change(function () {
    if ($("#nombreUpdate").val() == '') {
        $("span").remove(".borrable9");
        $('#nombreUpdate').prop("style", "border-width: 3px; border-color: red;");
        $('#lblUpdate').append('<span style="color: red;" class="borrable9"> *Requerido</span>')
        $('#btnCategoryUpdate').prop("disabled", true);
    } else {
        $("span").remove(".borrable9");
        $('#nombreUpdate').prop("style", "");
        $('#btnCategoryUpdate').prop("disabled", false);
    }

})

$("#btnAdd").click(function (event) {
    event.preventDefault();
    let personas = $('#modalBodyCate')
    let card = $('<div class="form-group border-bottom border-dark" style="padding-bottom: 30px;">' +
        '<label for="exampleInputEmail1">Nombre</label>' +
        '<input type="text" class="form-control inputCustom" id="nombreCategor-' + y + '" aria-describedby="emailHelp">' +
        '</div>')
    personas.append(card)
    y++
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
app.controller("controllerPerfil", function ($scope, $http, $window) {
    $scope.token = sessionStorage.getItem("token")
    $scope.userId = sessionStorage.getItem("idUsuario")

    userId = $scope.userId
    token = $scope.token

    if ($scope.token == null) {
        $window.location.href = "/index.html"
    } else {
        $scope.user = {}
        $scope.categorias = []
        $scope.desactivadas = []

        $scope.getMonedero = function () {
            $http({
                url: "http://localhost:8080/I♥$/monedero/getByUser/" + $scope.userId,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.user = response.data;
                console.log($scope.monto)
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

        $scope.getDesactivada = function () {
            $http({
                url: "http://localhost:8080/I♥$/categoria/getByUserOff/" + $scope.userId,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.desactivadas = response.data;
            })
        }

        $scope.getDesactivada();

        $scope.checkPassword = function () {
            let obj = {
                idUser: $scope.userId,
                contrasena: $scope.check.contrasena
            }

            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://localhost:8080/I♥$/usuario/checkPassword',
                data: JSON.stringify(obj)

            }).then(function (response) {
                if (response.data != "") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exitoso',
                        text: 'Ya puedes actualizar',
                    });
                    $('.form-control').prop("disabled", false);
                    $('.form-control-file').prop("disabled", false);
                    $('#btnCamera').prop("disabled", false);
                    $('#btnBackCa').prop("disabled", false);
                    $('#btnTakeOn').prop("disabled", false);
                    $('#btnEdit').prop("disabled", false);
                    $('#btnEnable').prop("disabled", true);
                    $('#exampleModal2').modal('toggle');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'La contraseña actual no es correcta',
                    });
                    $scope.check.contrasena = ""
                    $('#exampleModal2').modal('toggle');
                }
            }, function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'La contraseña actual no es correcta',
                });
            });
        }

        $scope.actualizarUser = function () {
            let obj = {
                idUsuario: $scope.userId,
                nombre: document.getElementById("nombre").value,
                apellidoPaterno: document.getElementById("apelPater").value,
                apellidoMaterno: document.getElementById("apelMater").value
            }

            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://localhost:8080/I♥$/usuario/update',
                data: JSON.stringify(obj)

            }).then(function (response) {
                if (response.data != "") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exitoso',
                        text: 'Los cambios han sido aplicados a la cuenta de usuario',
                    }).then(() => {
                        $window.location.href = "/perfil.html"
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

        $scope.registrarCategorias = function () {
            var array = document.getElementsByClassName("inputCustom")

            for (i = 1; i < array.length; i++) {
                let obj = {
                    nombre: $("#nombreCategor-" + i).val(),
                    status: 1,
                    usuario: {
                        idUsuario: $scope.userId
                    }
                }

                console.log(JSON.stringify(obj))

                $http({
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    },
                    url: 'http://localhost:8080/I♥$/categoria/create',
                    data: JSON.stringify(obj)

                })
            }
            Swal.fire({
                icon: 'success',
                title: 'Exitoso',
                text: 'Las categorias han sido insertadas con exito',
            }).then(() => {
                $window.location.href = "/perfil.html"
            });
        }

        $scope.changeStatus = function (id) {
            $http({
                url: "http://localhost:8080/I♥$/categoria/status/" + id,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $window.location.href = "/perfil.html"
            })
        }

        $scope.getCategory = function (id) {
            $http({
                url: "http://localhost:8080/I♥$/categoria/one/" + id,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.categoria = response.data

                console.log($scope.categoria)
            })
        }

        $scope.categoryUpdate = function () {
            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://localhost:8080/I♥$/categoria/update',
                data: $scope.categoria

            }).then(function (response) {
                if (response.data != "") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exitoso',
                        text: 'Los cambios han sido aplicados a la categoria seleccionada',
                    }).then(() => {
                        $window.location.href = "/perfil.html"
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
    formData.append("idUser", userId);

    let res = await fetch('http://localhost:8080/I♥$/usuario/changePhoto', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        }),
        body: formData
    });
    if (res.status === 200) {
        console.log("Awebo")
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso!!',
            text: 'Los cambios han sido aplicados a la cuenta de usuario',
        }).then(() => {
            window.location.href = "/perfil.html"
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo fallo durante el proceso de cambio',
        });
    }
}