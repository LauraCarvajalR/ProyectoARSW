/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.model;

/**
 *
 * @author Felipe
 * @author Laura
 */
public class ServerPoint {
    private int x, y;
    private boolean drag;
    private String color;

    public ServerPoint(int x, int y, boolean drag, String color){
        System.out.println("ServerPointttttt");
        this.x=x;
        this.y=y;
        this.drag=drag;
        this.color=color;
    }
    
    /**
     * @return the x
     */
    public int getX() {
        return x;
    }   

    /**
     * @return the y
     */
    public int getY() {
        return y;
    }

    /**
     * @return the drag
     */
    public boolean getDrag() {
        return drag;
    }
    
    /**
     * @return the color
     **/
    public String getColor() {
        return color;
    }        
}