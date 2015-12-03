/**
 *
 * @author Felipe Gomez
 * @author Laura Carvajal
 */
var temporizador = null;

var stompClient = null;

var canvas = null;
var context = null;
var clickX = null;
var clickY = null;
var clickDrag = null;
var palabra = null;
var i = 0;
var jsonPuntos = {puntos:[{'x':1, 'y':1, 'drag':true, 'color':'#000000'}]};
var jsonUsers = {usuarios:[{'name':"admin"}]};
var arregloPalabras=["BALON", "SOMBRILLA", "TELEFONO", "HOSPITAL", "COMPUTADOR"];
var colorD='#AA0000';
    /**
     * Add information where the user clicked at.
     * @param {number} x
     * @param {number} y
     * @return {boolean} dragging
     */
    function addClick(x, y, dragging, color) {
        jsonPuntos.puntos.push({'x':x, 'y':y, 'drag':dragging, 'color':color});
      }
    
    /**
     * SEND DRAW
     */
    function drawNewSend() {        
        var i = jsonPuntos.puntos.length-1;          
        colorD=jsonPuntos.puntos[i].color;
        
        if(jsonPuntos.puntos.length > 2) {
            if(jsonPuntos.puntos[i-1].drag) {
                //context.beginPath();
                context.moveTo(jsonPuntos.puntos[i-1].x, jsonPuntos.puntos[i-1].y);
                context.lineTo(jsonPuntos.puntos[i].x, jsonPuntos.puntos[i].y);                
                context.strokeStyle=colorD;
                context.stroke();
            }else{
                context.moveTo(jsonPuntos.puntos[i].x, jsonPuntos.puntos[i].y);
                //alert("movetooo"+jsonPuntos.puntos[i].x);
            }
         }
         
    
        
            /*if (!jsonPuntos.puntos[i-1].drag) { 
                //alert(jsonPuntos.puntos[i].drag);                
                
                if (jsonPuntos.puntos.length == 0) {                
                    context.beginPath();
                    context.moveTo(jsonPuntos.puntos[i].x, jsonPuntos.puntos[i].y);
                    context.strokeStyle=colorD;
                    context.stroke();
                } else {                
                    context.closePath();
                    context.beginPath();
                    context.moveTo(jsonPuntos.puntos[i].x, jsonPuntos.puntos[i].y);                
                    context.strokeStyle=colorD;
                    context.stroke();                  
                }
            } else {
                context.lineTo(jsonPuntos.puntos[i].x, jsonPuntos.puntos[i].y);
                context.strokeStyle=colorD;
                context.stroke();
            }   */  
        
        //alert("Color: "+colorD);
    }
     

    function mouseDownEventHandler(e) {
        paint = true;
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, false, colorD);
            drawNewSend();
        }
    }

    function touchstartEventHandler(e) {
        paint = true;
        if (paint) {
            addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, false, colorD);
            drawNewSend();
        }
    }

    function mouseUpEventHandler(e) {
        context.closePath();
        paint = false;
    }

    function mouseMoveEventHandler(e) {
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;        
        if (paint) {
            addClick(x, y, true, colorD);
            sendPoints();
            drawNewSend();
        }
    }

    function touchMoveEventHandler(e) {
        if (paint) {
            addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, true, colorD);
            
            drawNewSend();
        }
    }

    function setUpHandler(isMouseandNotTouch, detectEvent) {
        removeRaceHandlers();
        if (isMouseandNotTouch) {
            canvas.addEventListener('mouseup', mouseUpEventHandler);
            canvas.addEventListener('mousemove', mouseMoveEventHandler);
            canvas.addEventListener('mousedown', mouseDownEventHandler);
            mouseDownEventHandler(detectEvent);
        } else {
            canvas.addEventListener('touchstart', touchstartEventHandler);
            canvas.addEventListener('touchmove', touchMoveEventHandler);
            canvas.addEventListener('touchend', mouseUpEventHandler);
            touchstartEventHandler(detectEvent);
        }
    }

    function mouseWins(e) {
        setUpHandler(true, e);
    }

    function touchWins(e) {
        setUpHandler(false, e);
    }

    function removeRaceHandlers() {
        canvas.removeEventListener('mousedown', mouseWins);
        canvas.removeEventListener('touchstart', touchWins);
    }         


    function setConnected(connected) {
        document.getElementById('connect').disabled = connected;
        document.getElementById('disconnect').disabled = !connected;
        document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
        document.getElementById('response').innerHTML = '';
        if(connected)
            initCanvas();   
    }

    function connect() {         
        if(document.getElementById('usuario')!=""){           
            ocultarIndex();
            alert("ANTEEES");
            //sendUsuario();
            alert("DESPUUUUUES");
            var socket = new SockJS('/ws');
            stompClient = Stomp.over(socket);        
            stompClient.connect({}, function(frame) {            
                setConnected(true);
                console.log('LLEGO2: ');
                console.log('Connected: ' + frame);
                /*stompClient.subscribe('/topic/messages', function(serverMessage){
                    showServerMessage(JSON.parse(serverMessage.body).content);
                  
                });*/
                stompClient.subscribe('/topic/points', function(serverPoint){
                    // ------Se debería verificar si el punto ya existe ----
                    if(jsonPuntos.puntos.indexOf(JSON.parse(serverPoint.body)) == null){
                      alert("Nada");
                    }else{ 
                       alert("En el s de points "+ JSON.parse(serverPoint.body));
                       jsonPuntos.puntos.push(JSON.parse(serverPoint.body)); 
                    }
                    //jsonPuntos.puntos.push(JSON.parse(serverPoint.body));
                    showServerPoints();
                });
                stompClient.subscribe('/topic/palabras', function(serverPalabra){
                    //sendPalabra();
                    cambiarPalabra(JSON.parse(serverPalabra.body).content);
                }); 
                stompClient.subscribe('/topic/users', function(serverUser){
                    alert("en el subscribe "+JSON.parse(serverUser.body).name);
                    jsonUsers.usuarios.push(JSON.parse(serverUser.body).name);                                       
                    showServerUsers();
                });
                
                
            });
            temporizador= iniciarTemporizador();    

        }else{
            alert("Ingrese un usuario valido!");
        }
    }

    function disconnect() {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        //canvas.removeEventListener('mousedown', mouseWins);
        //canvas.addEventListener('touchstart', touchWins); 
        setConnected(false);
        console.log("Disconnected");
        temporizador = stopTemporizador("Se ha desconectado");
    }

    function sendMessage() {
        var message = document.getElementById('message').value;
        stompClient.send("/app/message", {}, JSON.stringify({ 'message': message }));
    }

    function sendPoints(){            
        stompClient.send("/app/point", {}, JSON.stringify(jsonPuntos.puntos[jsonPuntos.puntos.length-1]));
        console.log("Enviando "+JSON.stringify(jsonPuntos.puntos[jsonPuntos.puntos.length-1])+" a /app/point");
        //stompClient.send("/app/points", {}, JSON.stringify({'puntos':points[{'x':x, 'y':y, 'drag':drag}]}));
    }
    
    function sendPalabra() { 
        var message = document.getElementById('message').value;
        //alert(JSON.stringify({ 'message': message }));
        stompClient.send("/app/palabra", {}, JSON.stringify({ 'message': message }));
        
    }
    
    function sendUsuario(){
        alert("send:  "+document.getElementById('usuario').value);
        var usuario=document.getElementById('usuario').value;
        alert("EN SEND USUARIO:    "+(JSON.stringify({'user':usuario}))) ;
        stompClient.send("/app/user",  {}, JSON.stringify({'name':usuario}));
       
    }
    
   
    function showServerPoints() { 
        //alert("POINTSSSS:  "+jsonPuntos.puntos[jsonPuntos.puntos.length-1].x);
        drawNewSend();
    }
    
    function showServerUsers(){ 
        alert("Show usuer¿¿");        
    }
    
     
    function showServerMessage(message) {
        var response = document.getElementById('response');
        var p = document.createElement('p');
        p.style.wordWrap = 'break-word';
        p.appendChild(document.createTextNode(message));
        response.appendChild(p);
    }

    function initCanvas(){    
        canvas = document.getElementById("sheet");
        context = canvas.getContext("2d");
        context.strokeStyle = colorD;    
        context.lineJoin = "round";
        context.lineWidth = 5;
        console.log("HOLAAA.....");
        clickX = [];
        clickY = [];
        clickDrag = [];    
        canvas.addEventListener('mousedown', mouseWins);
        canvas.addEventListener('touchstart', touchWins);          
    }
    

    function limpiarCanvas(){
        jsonPuntos = {puntos:[{'x':1, 'y':1, 'drag':true, 'color':'#000000'}]};
        document.getElementById('btnLimpiarCanvas').addEventListener('click', function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }, false);
    }

    function cambiarPalabra(){
        temporizador= iniciarTemporizador();
        palabra = arregloPalabras[i];
        var response = palabra;
         if(i<arregloPalabras.length-1){
            i++;
        }else{
            i=0;
        }
        //var p = document.createElement('p');
        
        document.getElementById('labelPalabraAleatoria').innerHTML=response;
               
        //document.getElementById('labelPalabraAleatoria').innerHTML = palabra;
        //console.log(palabra);
        //context.clearRect(0, 0, canvas.width, canvas.height);
        limpiarCanvas();    
    }

    function setTextColor(picker) {
        document.getElementsByTagName('body')[0].style.color = '#' + picker.toString();
        context.strokeStyle ='#' + picker.toString();
        //context.stroke();
        context.lineWidth = 5;        
        colorD = picker.toString();
        
    }

    function borrar(){    
        context.strokeStyle ='#FFFFFF';
        context.lineWidth = 15;
    }

    function getPalabra(){
        return palabra;
    }

    function ocultarIndex(){
        obj=document.getElementById('index');
        obj.style.display = (obj.style.display=='block') ? 'none' : 'block';
    }

    function init() {  
       //initCanvas(); 
       ocultarIndex();
       var btnSend = document.getElementById('send');
       //btnSend.onclick=sendMessage;
       btnSend.onclick=sendUsuario;

       var btnConnect = document.getElementById('connect');
       btnConnect.onclick=connect;

       var btnDisconnect = document.getElementById('disconnect');
       btnDisconnect.onclick=disconnect;

       var btnLimpiarCanvas = document.getElementById('btnLimpiarCanvas');
       btnLimpiarCanvas.onclick=limpiarCanvas;

       var btnCambiarPalabra = document.getElementById('btnCambiarPalabra');
       //btnCambiarPalabra.onclick=cambiarPalabra;
       btnCambiarPalabra.onclick=sendPalabra;
       

       var btnBorrar = document.getElementById('btnBorrar');
       btnBorrar.onclick=borrar;
       
       disconnect();
    }
    window.onload = init;

