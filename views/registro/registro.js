//form 
const loader = document.querySelector('.loader');
// select inputs 
const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');
const notification = document.querySelector('#notification');

submitBtn.addEventListener('click', () => {
    if(name.value.length < 3){
        showAlert('el nombre debe tener mas de 3 letras');
    } else if(!email.value.length){
        showAlert('ingresa tu email');
    } else if(password.value.length < 8){
        showAlert('la contraseña debe tener mas de 8 caracteres');
    } else if(!number.value.length){
        showAlert('ingresa tu numero de telefono');
    } else if(!Number(number.value) || number.value.length < 10){
        showAlert('ingresa un numero valido');
    } else if(!tac.checked){
        showAlert('debes aceptar los terminos y condiciones');
    } else{
        // submit form
        loader.style.display = 'block';
        sendData('/signup', {
            name: name.value,
            email: email.value,
            password: password.value,
            number: number.value,
            tac: tac.checked,
            notification: notification.checked,
            seller: false
        })
    }
})

// send data function
const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .then(response => {
        console.log(response);
    })
}

// alert function
const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

