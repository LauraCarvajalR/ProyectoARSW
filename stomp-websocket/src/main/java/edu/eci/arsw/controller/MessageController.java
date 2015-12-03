/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import edu.eci.arsw.model.*;
import java.util.logging.Logger;

/**
 *
 * @author Felipe Gomez
 * @author Laura Carvajal
 */

@Controller
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public ServerMessage serverMessage(ClientMessage message) throws Exception {
        LOG.info("Mensaje recibido "+message);
        return new ServerMessage("Message: " + message.getMessage() + "!");
    }       

    @MessageMapping("/point")
    @SendTo("/topic/points")
    public ServerPoint serverPoint(ClientPoint punto) throws Exception {
        LOG.info("PUNTO recibido: "+punto.getX());        
        return new ServerPoint(punto.getX(), punto.getY(), punto.getDrag(), punto.getColor());
    }       

    @MessageMapping("/palabra")
    @SendTo("/topic/palabras")
    public ServerMessage serverPalabra(ClientMessage message) throws Exception {
        LOG.info("PALABRA recibida "+message.getMessage());
        //Thread.sleep(3000); // simulated delay
        return new ServerMessage("PALABRAAA: " + message.getMessage() + "!");
    }       
    
    @MessageMapping("/user")
    @SendTo("/topic/users")
    public ServerUser serverUser(ClientUser user) throws Exception {
        LOG.info("usuariooooooo recibido "+user.getName());
        
        return new ServerUser(user.getName());
    }
          
    private static final Logger LOG = Logger.getLogger(MessageController.class.getName());


}
