package edu.neu.csye7374.designpattern.state;

import edu.neu.csye7374.model.Product;
import edu.neu.csye7374.repository.ProductRepository;

public class StockUpdate extends StateAPI{

    Product product;
    ProductRepository productRepo;

    public StockUpdate(Product product, ProductRepository productRepo) {
        this.product = product;
        this.productRepo = productRepo;
    }

    @Override
    public void action(State state, int stock) {

        product.setQuantity(stock);
        productRepo.update(product);

    }
}