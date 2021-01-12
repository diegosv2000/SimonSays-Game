// Se crean referencias para los cuatro pulsadores y demás elementos a fin de mejorar la legibilidad del código en los sucesivo..
let pulsGreen = document.querySelector('#green'),
    pulsRed = document.querySelector('#red'),
    pulsYellow = document.querySelector('#yellow'),
    pulsBlue = document.querySelector('#blue'),
    game = document.querySelector('#game'),
    start = document.querySelector('#start'),
    output = document.querySelector('#output'),
    rules = document.querySelector('#rules'),
    // variables con los estilos CSS para los cuatro pulsadores en ambos estados: apagado y encendido...
    greenOff = 'background: rgb(0, 255, 0, 0.8)',
    greenOn = 'background: rgb(104, 255, 104);',

    redOff = 'background: rgb(255, 30, 0, 0.8)',
    redOn = 'background: rgb(255, 110, 90);',

    yellowOff = 'background: rgba(255, 255, 0, 0.8)',
    yellowOn = 'background: rgb(255, 255, 125);',

    blueOff = 'background: rgb(41, 80, 255, 0.8)',
    blueOn = 'background: rgb(96, 124, 252);',

    gameColor = 'background: white; opacity: 0.8',

    level,          // indica el nivel actual
    sequence,      // array con los colores a repetir
    indSeq;         // índice de la secuencia de colores

// Creamos la función Sleep para iniciar el contador de tiempo para seguir jugando
function Sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
        break;
        }
    }
}
// Se programa que cuando se cliqueé el botón "COMENZAR" comienze la partida...  
start.addEventListener("click", startParty);
function startParty(){
    start.style.cssText = 'display: none;';           // se oculta el botón "EMPEZAR"

    resetGame();
    colorSequence();
    startSequence();

    function resetGame(){
        level = 1;
        sequence = [];
        indSeq = 0;

        pulsGreen.style.cssText = greenOff;
        pulsRed.style.cssText = redOff;
        pulsYellow.style.cssText = yellowOff;
        pulsBlue.style.cssText = blueOff;

        output.innerHTML = 'Level ' + level;
    }

    function colorSequence(){
        let colors = ['green', 'red', 'yellow', 'blue'];

        sequence.push( colors[numRand(0,3)] );   // se añade un color aleatorio al final del array
    }

    function startSequence(){
        if(indSeq < sequence.length){      // Si quedan colores por encender en la reproducción de la secuencia...
            onColor();
        }
        else{                               // Secuencia reproducida, ahora le toca al jugador repetirla
            indSeq = 0;
            game.addEventListener('click', verifPuls);
        }

        function onColor(){
            switch(sequence[indSeq]){
                case 'green':
                    pulsGreen.style.cssText = greenOn;
                    break;
                case 'red':
                    pulsRed.style.cssText = redOn;
                    break;
                case 'yellow':
                    pulsYellow.style.cssText = yellowOn;
                    break;
                case 'blue':
                    pulsBlue.style.cssText = blueOn;
                    break;
            }

            setTimeout(offColor, 700);
        }

        function offColor(){
            switch(sequence[indSeq]){
                case 'green':
                    pulsGreen.style.cssText = greenOff;
                    break;
                case 'red':
                    pulsRed.style.cssText = redOff;
                    break;
                case 'yellow':
                    pulsYellow.style.cssText = yellowOff;
                    break;
                case 'blue':
                    pulsBlue.style.cssText = blueOff;
                    break;
            }

            indSeq++;
            setTimeout(startSequence, 150);
        }

        function verifPuls(ev){
            let button = ev.target;

            if(button.id != 'game'){
                if(button.id == sequence[indSeq]){       // Si se pulsa el pulsador correcto...
                    onPul(button.id);
                }
                else{                                       // ERROR, y enciende a rojo todos los pulsadores
                    swal("You lost :(", "Try one more time.", "error");
                    pulsGreen.style.cssText = gameColor;
                    pulsRed.style.cssText = gameColor;
                    pulsYellow.style.cssText = gameColor;
                    pulsBlue.style.cssText = gameColor;
                    output.innerHTML = 'You lost.\n\nClick START to replay';
                    game.removeEventListener('click', verifPuls);
                    start.style.cssText = 'display: block;';          // se vuelve a mostrar el botón "EMPEZAR"
                }
            }

            function onPul(button){
                switch(button){
                    case 'green':
                        pulsGreen.style.cssText = greenOn;
                        break;
                    case 'red':
                        pulsRed.style.cssText = redOn;
                        break;
                    case 'yellow':
                        pulsYellow.style.cssText = yellowOn;
                        break;
                    case 'blue':
                        pulsBlue.style.cssText = blueOn;
                        break;
                }

                setTimeout(offPul, 150, button);
            }

            function offPul(button){
                switch(button){
                    case 'green':
                        pulsGreen.style.cssText = greenOff;
                        break;
                    case 'red':
                        pulsRed.style.cssText = redOff;
                        break;
                    case 'yellow':
                        pulsYellow.style.cssText = yellowOff;
                        break;
                    case 'blue':
                        pulsBlue.style.cssText = blueOff;
                        break;
                }

                indSeq++;
                
                if(indSeq == sequence.length){             // Si ya no queda secuencia, Nivel superado
                    if(level == 10){
                        swal("Congratulations, You win :)", "You can continue playing within 15 seconds", "success");
                    }
                    level++;                                // se pasa al siguiente nivel
                    output.innerHTML = 'Level ' + level;
                    console.log("funciona");
                    colorSequence();                 // se añade un nuevo color al final de la secuencia
                    indSeq = 0;                             // y se resetea el índice de la misma
                    game.removeEventListener('click', verifPuls);   // se elimina el escuchador de evento clic
                    setTimeout(startSequence, 1000);   // y se programa que tras un segundo se reproduzca la secuencia, repitiéndose así el proceso
                }
            }
        }
    }


    function numRand(limInf, limSup){
        return limInf + Math.floor( Math.random() * (limSup - limInf + 1) );
    }
}
rules.addEventListener("click", showRules);
function showRules() {
    document.getElementById('readRules').innerHTML ='<p>The game will show you a sequence of colors and you have to repeat this sequence by clicking</p>';
}

