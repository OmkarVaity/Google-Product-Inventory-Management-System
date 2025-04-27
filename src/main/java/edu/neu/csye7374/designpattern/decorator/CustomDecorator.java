package edu.neu.csye7374.designpattern.decorator;

import edu.neu.csye7374.InventoryCartAPI;
import edu.neu.csye7374.model.Product;
import edu.neu.csye7374.model.ProductPO;

public class CustomDecorator extends CartDecorator {

    int quantity;
    double price;

    public CustomDecorator(InventoryCartAPI cart, Product product, ProductPO proPo) {
        super(cart);
        this.quantity = proPo.getQuantity();
        this.price = product.getPrice();
    }

    public double getCost() {
        return super.getCost()+(this.quantity * this.price);
    }
}