let play = $('#player')
let btnCamere = $('#btnCamera')
let btnCaBack = $('#btnBackCa')
let btnTakePh = $('#btnTakeOn')
let photoUser = $('#photoUser')
let photoBlob = null
let principal = $("#lyLogin");
let news = $("#lyCreate");
let inputLoginName = false
let inputLoginPass = false
let inputCreateMount = false
let inputCreateName = false
let inputCreatePater = false
let inputCreateMater = false
let inputCreateEmail = false
let inputCreatePass = false
let inputCreateFile = false

emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

$("#exampleInputEmail1").change(function () {
    if ($("#exampleInputEmail1").val() == '') {
        $("span").remove(".borrable1");
        $('#exampleInputEmail1').prop("style", "border-width: 3px; border-color: red;");
        $('#lblLoginEmail').append('<span style="color: red;" class="borrable1"> *Requerido</span>')
        inputLoginName = false

    } else if (!emailRegex.test($("#exampleInputEmail1").val())) {
        $("span").remove(".borrable1");
        $('#exampleInputEmail1').prop("style", "border-width: 3px; border-color: red;");
        $('#lblLoginEmail').append('<span style="color: red;" class="borrable1"> *Formato erroneo</span>')
        inputLoginName = false

    } else {
        $('#exampleInputEmail1').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable1");
        inputLoginName = true
    }
})

$("#exampleInputPassword1").change(function () {
    if ($("#exampleInputPassword1").val() == '') {
        $('#exampleInputPassword1').prop("style", "border-width: 2px; border-color: red;");
        $('#lblLoginPass').append('<span style="color: red;" class="borrable2"> *Requerido</span>')
        inputLoginPass = false
    } else {
        $('#exampleInputPassword1').prop("style", "border-width: 2px; border-color: #33C313;");
        $("span").remove(".borrable2");
        inputLoginPass = true
    }
})

$(".login").change(function () {
    if (inputLoginPass && inputLoginName) {
        $('#btnLogin').prop("disabled", false);
    } else {
        $('#btnLogin').prop("disabled", true);
    }
})

$("#monto").change(function () {
    if ($("#monto").val() == '') {
        $('#monto').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateMonto').append('<span style="color: red;" class="borrable3"> *Requerido</span>')
        inputCreateMount = false
    } else {
        $('#monto').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable3");
        inputCreateMount = true
    }
})

$("#nombre").change(function () {
    if ($("#nombre").val() == '') {
        $("span").remove(".borrable4");
        $('#nombre').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateName').append('<span style="color: red;" class="borrable4"> *Requerido</span>')
        inputCreateName = false

    } else if (!namesRegex.test($("#nombre").val())) {
        $("span").remove(".borrable4");
        $('#nombre').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateName').append('<span style="color: red;" class="borrable4"> *Formato erroneo</span>')
        inputCreateName = false

    } else {
        $('#nombre').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable4");
        inputCreateName = true
    }
})

$("#apelPater").change(function () {
    if ($("#apelPater").val() == '') {
        $("span").remove(".borrable5");
        $('#apelPater').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreatePater').append('<span style="color: red;" class="borrable5"> *Requerido</span>')
        inputCreatePater = false

    } else if (!namesRegex.test($("#apelPater").val())) {
        $("span").remove(".borrable5");
        $('#apelPater').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreatePater').append('<span style="color: red;" class="borrable5"> *Formato erroneo</span>')
        inputCreatePater = false

    } else {
        $('#apelPater').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable5");
        inputCreatePater = true
    }
})

$("#apelMater").change(function () {
    if ($("#apelMater").val() == '') {
        $("span").remove(".borrable6");
        $('#apelMater').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateMater').append('<span style="color: red;" class="borrable6"> *Requerido</span>')
        inputCreateMater = false

    } else if (!namesRegex.test($("#apelMater").val())) {
        $("span").remove(".borrable6");
        $('#apelMater').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateMater').append('<span style="color: red;" class="borrable6"> *Formato erroneo</span>')
        inputCreateMater = false

    } else {
        $('#apelMater').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable6");
        inputCreateMater = true
    }
})

$("#exampleInputEmail2").change(function () {
    if ($("#exampleInputEmail2").val() == '') {
        $("span").remove(".borrable7");
        $('#exampleInputEmail2').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateEmail').append('<span style="color: red;" class="borrable7"> *Requerido</span>')
        inputCreateEmail = false

    } else if (!emailRegex.test($("#exampleInputEmail2").val())) {
        $("span").remove(".borrable7");
        $('#exampleInputEmail2').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateEmail').append('<span style="color: red;" class="borrable7"> *Formato erroneo</span>')
        inputCreateEmail = false
    } else {
        $('#exampleInputEmail2').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable7");
        inputCreateEmail = true
    }
})

$("#exampleInputPassword2").change(function () {
    if ($("#exampleInputPassword2").val() == '') {
        $('#exampleInputPassword2').prop("style", "border-width: 3px; border-color: red;");
        $('#lblCreateContra').append('<span style="color: red;" class="borrable8"> *Requerido</span>')
        inputCreatePass = false
    } else {
        $('#exampleInputPassword2').prop("style", "border-width: 3px; border-color: #33C313;");
        $("span").remove(".borrable8");
        inputCreatePass = true
    }
})

$(".create").change(function () {
    if (inputCreateMount && inputCreateName && inputCreatePater && inputCreateMater && inputCreateEmail && inputCreatePass && inputCreateFile) {
        $('#btnRegistro').prop("disabled", false);
    } else {
        $('#btnRegistro').prop("disabled", true);
    }
})

$(".btnShow").on("click", function (e) {
    e.preventDefault();
    principal.fadeOut(function () {
        news.slideDown(1000)
    })
    $('.page-footer').removeClass('fixed-bottom');
});

$(".btnHide").on("click", function (e) {
    e.preventDefault();
    news.fadeOut(function () {
        principal.slideDown(1000)
    })
    $('.page-footer').addClass('fixed-bottom');
})

// ------ Camara --------- 

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

    inputCreateFile = true

    if (inputCreateMount && inputCreateName && inputCreatePater && inputCreateMater && inputCreateEmail && inputCreatePass && inputCreateFile) {
        $('#btnRegistro').prop("disabled", false);
    } else {
        $('#btnRegistro').prop("disabled", true);
    }

})

async function uploadFile() {
    var formData = new FormData();
    console.log(photoBlob)
    if (photoBlob) {
        formData.append("photo", photoBlob);
    }
    //formData.append("photo", exampleFormControlFile1.files[0]);
    formData.append("monto", document.getElementById("monto").value)
    formData.append("nombre", document.getElementById("nombre").value)
    formData.append("apellidoPaterno", document.getElementById("apelPater").value)
    formData.append("apellidoMaterno", document.getElementById("apelMater").value)
    formData.append("correo", document.getElementById("exampleInputEmail2").value)
    formData.append("password", document.getElementById("exampleInputPassword2").value)

    let res = await fetch('http://localhost:8080/I♥$/usuario/save', {
        method: 'POST',
        body: formData
    });
    if (res.status === 200) {
        console.log("Awebo")
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso!!',
            text: 'La cuenta de usuario ha sido creada',
        }).then(() => {
            window.location.href = "/index.html"
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo fallo durante el proceso de registro',
        });
    }
}

var app = angular.module("money", ['ngRoute']);
app.controller("controllerUser", function ($scope, $http, $window) {
    $scope.token = sessionStorage.getItem("token")

    if ($scope.token == null) {
        $scope.loginService = function () {
            $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:8080/I♥$/login',
                data: $scope.login
            }).then(function (response) {
                console.log(response.data)
                if (response.data[1] = ! null) {
                    sessionStorage.setItem("idUsuario", response.data.idUsuario)
                    sessionStorage.setItem("token", response.data.token)
                    $window.location.href = "/monedero.html"
                } else {
                    console.log("no entre");
                }

            }, function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario y/o contraseña incorrectos',
                });
            });
        }
    } else {
        $window.location.href = "/monedero.html"
    }

})