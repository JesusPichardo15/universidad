
const pointsGame = [5,3,2],
secretWordGame= [
    "profesionista",
    "servicio social", 
    "indigentes",
    "economicamente",
    "respuetoso",
    "mexicana",
    "gobierno",
    "servicios profesionales",
    "auxilar",
    "investigacion cientifica",
    "documentos",
    "participar",
    "difundiendo",
    "equilibrio",
    "derechos",
    "desarrollo profesional",
    "conocimientos"
],
secretWordDescription = [
    "Articulo 34. El ____ debe prestar el servicio social profesional por conviccion solidaria y conciencia social",
    "¿Segun el articulo 34 que debe prestar el profesionista?", 
    "Articulo 35. El profesionista debe dar servicio a los ____ o a cualquier persona economicamente desprotegida cuando asi se lo soliciten",
    "Segun el articulo 35, ¿Ademas de los indigentes, cual otra persona debe ayudar el profesionista? Pista: desprotegidos:",
    "Segun el articulo 36 ¿Cómo debe ser el profesionista?",
    "Articulo 36. El profesionista debe ser respetuoso de las tradiciones, costumbres y cultura de los diversos grupos que conforman la nacion ____",
    "Segun el articulo 37 ¿A quien debe prestar sus servicios profesionales el profesionista?",
    "articulo 37. El profesionista debe poner a disposicion del gobierno sus ____ ____ cuando ocurran circunstancias de emergencia",
    "Segun el articulo 38. ¿Cómo debe servir el profesionista en las investigaciones cientificas?",
    "Articulo 38. El profesionista debe servir como auxiliar de las instituciones de ___ ___.",
    "Segun el articulo 38. ¿Qué debe de proporcionar el profesinista en las investigaciones cientificas?",
    "articulo 39. El profesionista debe ____ activamente en su entorno social difundiendo la cultura y los valores nacionales ",
    "segun el articulo 39 ¿Qué debe de hacer el profesional con la cultura y los valores nacionales?",
    "Segun el articulo 40 ¿que debe de buscar el profesionsta? ",
    "Articulo 40. El profesionsita debe buscar el equilibrio entre los distintos aspectos del desarrollo humano y la conservacion de los recursos naturales y el medio ambiente. atendiendo a los ____ de las generaciones futuras.",
    "Segun el articulo 41, ademas de su desempeño ¿Qué debe procurar el profesionsita?",
    "Articulo 41. El profesionista debe procurar su desempeño y desarrollo profesional en las localidades donde mas pueda contribuir con sus ____ al desarrollo nacional"
];
const numberRandom = Math.floor(Math.random()*17);

let winAnswer= [];
let positions = [];
let attemps = 0;
let changePoints = 0;
let lifes = 2;
let pointsRefreshPage = document.getElementById("score"),
secretWordPage = document.getElementById("secretWord"),
descriptionWordPage = document.getElementById("description"),
answerPage = document.getElementById("answer"),
buttonV = document.querySelector(".buttonV"),
imageCustome = document.getElementById("image"),
pointsPage = document.getElementById("score");
//variables cronometro
let segundos = 0;
let minutos = 0;

window.addEventListener("load",async ()=>{
    await axios({
        method :'get',
        url:"https://servidor-alpha.vercel.app/api/getPoints",
        responseType: 'json'
    }).then(response=> { 
        data = response.data;
        changePoints = data[0].points
        pointsPage.innerHTML = changePoints
    })
});

//mostrar en la pagina la descripcion y la secret word
showSecretWord(secretWordPage,descriptionWordPage);

function getSecretWordAndDescription(){
    let secretWord = secretWordGame[numberRandom];
    let secretWordChange = changeSecretWordToLowBarrel(secretWord);
    const definitionWord = secretWordDescription[numberRandom];
    return [secretWord, secretWordChange ,definitionWord]
}

function changeSecretWordToLowBarrel(word){
    for(let i = 0; i < word.length; i++){
        if(word[i] != " ")word = word.replace(word[i],"-");
    }
    return word
}

function showSecretWord(word,description){
    let secretWordAndDescription = getSecretWordAndDescription();
    let secretWord = secretWordAndDescription[1];
    let descriptionWord = secretWordAndDescription[2];

    word.innerHTML = secretWord;
    description.innerHTML = descriptionWord;
}

//verificar si la letra seleccionada esta en la palabra secreta
//click al boton
buttonV.addEventListener("click",showLetterInSecretWord);

//funciones
//mostrar la letra 
function showLetterInSecretWord(){
    const secretWord = getSecretWordAndDescription()[0];
    let wordChange = getSecretWordAndDescription()[1];
    let valueAnswer = answerPage.value.toLowerCase();
    let update;
    //verificar si perdiste o ganaste 
    console.log(secretWord);
    if(secretWord.includes(valueAnswer)&& valueAnswer !== ""){
        let positions = positionSecretWord(valueAnswer,secretWord);
        update = ChangeLettersInSecretWord(valueAnswer,positions,wordChange);
        secretWordPage.innerHTML = update;
        console.log(positions)
        if(minutos < 2){
            changePoints += pointsGame[0]*positions.length;
            pointsPage.innerHTML = changePoints;
        }else if(minutos >= 2 && minutos < 5){
            changePoints += pointsGame[1]*positions.length;
            pointsPage.innerHTML = changePoints;
        }else if(minutos >= 5){
            changePoints += pointsGame[2]*positions.length;
            pointsPage.innerHTML = changePoints;
        }
    }else{
        attemps++;
        let custome = `monito${attemps}.jpeg`;
        imageCustome.src = `${custome}`;
    }
    answerPage.value = ""; 
    if(update === secretWord){
        axios({
            method: "post",
            url: "https://servidor-alpha.vercel.app/api/postPoints",
            data : {
                user: "jesus",
                points : `${changePoints}`,
            }
        }).then(response=>{
            if(response.data){
                location.reload();
            }
        })
    }
}
function positionSecretWord(letter, word){
    let position = []
    for(let i = 0; i < word.length;i++){
        if(word[i] == letter.toLowerCase()){
            position.push(i);
            positions.push(i);
        }
    }
    return position
}

function ChangeLettersInSecretWord(letter,position,secretWord){
    let arraySecretWord = secretWord.split("");
    for(let i = 0; i < position.length;i++){
        winAnswer[position[i]] = letter
    }

    for(let i = 0; i<positions.length; i++){
        arraySecretWord[positions[i]] = winAnswer[positions[i]]; 
    }
    arraySecretWord = arraySecretWord.join("");
    return arraySecretWord;
}

//aumentar puntos
function upPoints (points){
    
}
//cambiar monito

//cronometro 

function actualizarCronometro() {
    segundos++;
    if (segundos >= 60) {
        segundos = 0;
        minutos++;
    }
    document.getElementById('timer').innerText = 
        (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
}



//determinar si el juego ya acabo
function gameOver(){
    totalPoint = pointsPage.innerHTML;
    if(attemps >=6 || lifes == 0){
        document.body.innerHTML = `
            <h1>SE TERMINO EL JUEGO</h1>
            <h1>CON UN PUNTAJE DE : ${totalPoint}</h1> `

            axios({
                method: "post",
                url: "https://servidor-alpha.vercel.app/api/postPoints",
                data : {
                    user: "jesus",
                    points : 0,
                }
            })
    }
}

setInterval(actualizarCronometro, 1000);
setInterval(gameOver,1000);
