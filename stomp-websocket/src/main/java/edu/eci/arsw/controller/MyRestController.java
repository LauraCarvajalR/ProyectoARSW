/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import edu.eci.arsw.model.ClientMessage;
import edu.eci.arsw.model.ClientPoint;
import edu.eci.arsw.model.ClientUser;
import edu.eci.arsw.model.ServerMessage; 
import edu.eci.arsw.model.ServerPoint;
import edu.eci.arsw.model.ServerUser;

/**
 *
 * @author Felipe Gomez
 * @author Laura Carvajal
 */

@RestController
@RequestMapping("/rest")
public class MyRestController {


    @Autowired 
    private SimpMessagingTemplate template;  

    @RequestMapping(value = "/msg",method = RequestMethod.POST)        
    public ResponseEntity<?> addMessage(@RequestBody ClientMessage p) { 
        
        template.convertAndSend("/topic/messages",new ServerMessage(p.getMessage()));
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    
    @RequestMapping(value = "/pnt",method = RequestMethod.POST)        
    public ResponseEntity<?> addPoint(@RequestBody ClientPoint p) { 
        template.convertAndSend("/topic/points",new ServerPoint(p.getX(), p.getY(), p.getDrag(), p.getColor()));
       return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/plb",method = RequestMethod.POST)        
    public ResponseEntity<?> addPalabra(@RequestBody ClientMessage p) {         
        template.convertAndSend("/topic/palabras",new ServerMessage(p.getMessage()));
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    
    @RequestMapping(value = "/usr",method = RequestMethod.POST)        
    public ResponseEntity<?> addUsuario(@RequestBody ClientUser u) {         
        template.convertAndSend("/topic/users",new ServerUser(u.getName()));
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    
    
    @RequestMapping(value = "/check",method = RequestMethod.GET)        
    public String check() {
        return "REST API OK";                
    }

}
