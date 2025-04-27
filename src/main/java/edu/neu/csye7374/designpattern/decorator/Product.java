package edu.neu.csye7374.designpattern.decorator;

import edu.neu.csye7374.InventoryCartAPI;

public class Product implements InventoryCartAPI{

    double totalCost;

    public Product() {
        this.totalCost = 0;
    }

    @Override
    public double getCost() {
        // TODO Auto-generated method stub
        return this.totalCost;
    }

}