/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.model;

/**
 *
 * @author Felipe Gomez
 * @author Laura Carvajal
 */

public class ServerUser {
    private String name;

    public ServerUser(String name) {
            System.out.println("Si creo ServerUser  "+ name);
            this.name = name;
    }

    public String getName() {
            return name;
    }
}
