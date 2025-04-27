package edu.neu.csye7374.controller;

import edu.neu.csye7374.model.ProductPO;
import edu.neu.csye7374.repository.ProductPORepository;
import edu.neu.csye7374.designpattern.strategy.InventoryStrategy;
import edu.neu.csye7374.designpattern.strategy.ProductPOStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productPO")
public class ProductPOController {

    @Autowired
    private ProductPORepository productPORepo;

    @GetMapping("/getAll")
    public List<ProductPO> getAll() {
        return productPORepo.getProductPOs();
    }

    @GetMapping("/getProductPO/{id}")
    public ProductPO getProductPO(@PathVariable int id) {
        return productPORepo.getProductPObyID(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody ProductPO productPO) {
        InventoryStrategy strategy = new InventoryStrategy(new ProductPOStrategy(productPORepo, productPO));
        strategy.executeUpdate();
    }

    @PostMapping("/save")
    public void save(@RequestBody ProductPO productPO) {
        InventoryStrategy strategy = new InventoryStrategy(new ProductPOStrategy(productPORepo, productPO));
        strategy.executeAdd();
    }

    @DeleteMapping("/delete/{id}")
    public void deletebyID(@PathVariable int id) {
        InventoryStrategy strategy = new InventoryStrategy(new ProductPOStrategy(productPORepo, id));
        strategy.executeDelete();
    }
}