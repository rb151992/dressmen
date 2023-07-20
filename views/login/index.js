const btnIniciar = document.querySelector("#btn_inicio");

btnIniciar.addEventListener('click',()=>{

const user = document.querySelector('#usuario').value;
const password = document.querySelector('#password').value;

console.log(user,password)

confirmarUser(user,password)

})

async function confirmarUser(correo,password) {
    
    const url = `/api/users/${correo}/${password}`; 
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(data);

        if(data.isOk){
            console.log("hola")
            window.location.href="/admin"
        }else{
            console.log("no puedes acceder")
        }

    } catch (error) {
      console.error('Error:', error);
    }
  }
 
