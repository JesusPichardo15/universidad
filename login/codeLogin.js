
//declaracion de variables, constantes, objetos, etc
const buttonSendInformation = document.querySelectorAll(".sendInformation");


//agregar eventos listener a los botones

buttonSendInformation.forEach(element => {
    element.addEventListener("click",()=>{
        sendDataDB(element.id)
    })
});


//creacion de funciones
async function sendDataDB(type){
    const user = document.getElementById(`user${type}`)
    const password = document.getElementById(`password${type}`)
    if(type === "Login"){
        await axios({
            method: "post",
            url: "https://servidor-alpha.vercel.app/api/login",
            data : {
                user : `${user.value}`,
                password : `${password.value}`
            }
        }).then(response=>{
            if(response.data){
                window.location.href = "index.html";
                
            }else {
                console.log("la contraseña esta mal")
             }
        }).catch(error =>{
            console.log(error);
        })
    }else{
        await axios({
            method: "post",
            url: "https://servidor-alpha.vercel.app/api/register",
            data: {
                user : `${user.value}`,
                password : `${password.value}`
            }
        }).then(response =>{
            if(response.data == true){
                console.log(response.data)

            }else{
                console.log(response.data)
            }
        })
    }

}

function mostrarFormulario(formulario) {
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach(section => {
        section.classList.remove('active');
    });

    const activeForm = document.getElementById(`${formulario}Form`);
    activeForm.classList.add('active');

    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (formulario === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else if (formulario === 'register') {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}