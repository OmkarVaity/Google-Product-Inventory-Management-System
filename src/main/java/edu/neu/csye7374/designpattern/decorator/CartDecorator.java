package edu.neu.csye7374.designpattern.decorator;

import edu.neu.csye7374.InventoryCartAPI;

public class CartDecorator implements InventoryCartAPI{

    InventoryCartAPI cart;

    public CartDecorator(InventoryCartAPI cart) {
        this.cart = cart;
    }

    @Override
    public double getCost() {
        return this.cart.getCost();
    }

}
