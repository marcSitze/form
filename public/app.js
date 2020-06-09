const form = document.querySelector('form');
const modules = document.querySelector('.modules');
const button = document.querySelector('.pay');

let count = 0;

// modules.addEventListener('click', e => {

// });

function trigger() {
  button.addEventListener('click', e => {
    sendPaymentInfos (numero_commande,'INTX8878', 'LF750BzV0KueVeBNPeDhtaR03iLRoSQWOEezaMK57Gd4LmyrV5', 'https://form-candidature.herokuapp.com/','https://form-candidature.herokuapp.com/leduc/welcome',' url_notif_failed', montant , ville , email, clientFirstname, clientLastname, clientPhone);
  });
}