package edu.neu.csye7374.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import edu.neu.csye7374.model.Product;
import edu.neu.csye7374.repository.BuyerRepository;
import edu.neu.csye7374.repository.ProductRepository;
import edu.neu.csye7374.designpattern.strategy.ProductStrategy;
import edu.neu.csye7374.designpattern.strategy.InventoryStrategy;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private BuyerRepository buyerRepo;

    @Autowired
    private ProductRepository productRepo;

    @GetMapping("/getAll")
    public List<Product> getAll() {
        return productRepo.getProducts();
    }

    @GetMapping("/getProduct/{id}")
    public Product getProduct(@PathVariable int id) {
        return productRepo.getProductbyID(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody Product product) {
        InventoryStrategy strategy = new InventoryStrategy(new ProductStrategy(productRepo, product, buyerRepo));
        strategy.executeAdd();
    }

    @PutMapping("/update")
    public void update(@RequestBody Product product) {
        InventoryStrategy strategy = new InventoryStrategy(new ProductStrategy(productRepo, product));
        strategy.executeUpdate();
    }

    @DeleteMapping("/delete/{id}")
    public void deletebyID(@PathVariable int id) {
        InventoryStrategy strategy = new InventoryStrategy(new ProductStrategy(productRepo, id));
        strategy.executeDelete();
    }

}
