/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import edu.eci.arsw.model.*;

/**
 *
 * @author Felipe Gomez
 * @author Laura Carvajal
 */

@Controller
public class PointsController {

    @MessageMapping("/point")
    @SendTo("/topic/points")
    public ServerPoint serverPoint(ClientPoint punto) throws Exception {
            System.out.println("WSFZGDXFR");
            return new ServerPoint(punto.getX(), punto.getY(), punto.getDrag(), punto.getColor());
    }

}

