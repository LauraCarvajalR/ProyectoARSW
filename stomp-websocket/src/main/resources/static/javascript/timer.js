/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var HandleMiTimer = null;
var Contador = null;

    function iniciarTemporizador() {
        Contador = 100;
        startTemporizador();
        HandleMiTimer = window.setInterval('startTemporizador()', 1000);  // en milisegundos, 1000=1 segundo
    }

    function stopTemporizador(texto) {
        if(HandleMiTimer!=null) {
            window.clearInterval(HandleMiTimer);
            HandleMiTimer = null;
            actualizarTemporizador(texto);
        }
    }

    function actualizarTemporizador(Texto) {
        document.getElementById("temporizador").innerHTML = Texto;
    }

    function startTemporizador() {
        if (Contador > 0){
            Contador--;
            actualizarTemporizador("Tiempo: "+Contador);
        }else{
            stopTemporizador("Se acabo el tiempo");
            alert("La palabra era: "+ getPalabra());
            disconnect();            
        }
    }
