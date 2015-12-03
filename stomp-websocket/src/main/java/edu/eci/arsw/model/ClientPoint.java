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
public class ClientPoint {
    private int x, y;
    private boolean drag;
    private String color;
    
    /**
     * @return the x
     */
    public int getX() {
        return x;
    }

    /**
     * @param x the x to set
     */
    public void setX(int x) {
        this.x = x;
    }

    /**
     * @return the y
     */
    public int getY() {
        return y;
    }

    /**
     * @param y the y to set
     */
    public void setY(int y) {
        this.y = y;
    }

    /**
     * @return the drag
     */
    public boolean getDrag() {
        return drag;
    }

    /**
     * @param drag the drag to set
     */
    public void setDrag(boolean drag) {
        this.drag = drag;
    }

    /**
     * @return the color
     */
    public String getColor() {
        return color;
    }

    
    /** 
     * @param color the color to set
     */
    public void setColor(String color) {
        this.color = color;
    }
        
}
