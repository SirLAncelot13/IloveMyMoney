let contexto = '/ILoveMyMoney/sw.js';
let url = window.location.href;
let isSubscribed = false;
let swRegistration = null;
// 1- Obtener el public key
const applicationServerPublicKey = 'BFyVM_09xBV1U_tS8qHmeXkKyMPSOdXXpa1PrfRtxArbmeXwdMq6lvKqC1kGhPrunLNOSrUqVg4JvQS94CGh2-0';

if(navigator.serviceWorker && window.PushManager){
    if(url.includes('localhost')){
        contexto = '/sw.js';
    }

    navigator.serviceWorker.register(contexto).then(function (swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        initialiseUI()
    })
}


function initialiseUI() { // saber si el usuario esta suscrito
    document.getElementById("btnSuscripcion").addEventListener('click', function () {
        document.getElementById("btnSuscripcion").disabled = true;
        if (isSubscribed) {
            // TODO: Unsubscribe user
            unsubscribeUser();
        } else {
            console.log("Suscribiendo")
            subscribeUser();
        }
    });

    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }

            updateBtn();
        });
}

function updateBtn() { //Habilitar el boton segun la respuesta del usuario
    if (Notification.permission === 'denied') {
        document.getElementById("btnSuscripcion").textContent = 'Bloqueadas';
        document.getElementById("btnSuscripcion").disabled = true;
        updateSubscriptionOnServer(null);
        return;
    }

    if (isSubscribed) {
        document.getElementById("btnSuscripcion").textContent = 'Deshabilitar';
    } else {
        document.getElementById("btnSuscripcion").textContent = 'Habilitar';
    }

    document.getElementById("btnSuscripcion").disabled = false;
}

function subscribeUser() {  //suscribir al usuario lanzando permiso de suscripcion
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
            console.log('User is subscribed:', subscription);

            updateSubscriptionOnServer(subscription);

            isSubscribed = true;

            updateBtn();
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
            updateBtn();
        });
}

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function() {
      updateSubscriptionOnServer(null);
  
      console.log('User is unsubscribed.');
      isSubscribed = false;
  
      updateBtn();
    });
  }

function updateSubscriptionOnServer(subscription) { // mostrar el codigo en la pagina
    // TODO: Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails =
        document.querySelector('.js-subscription-details');

    if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
        subscriptionDetails.classList.remove('is-invisible');
    } else {
        subscriptionDetails.classList.add('is-invisible');
    }
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}