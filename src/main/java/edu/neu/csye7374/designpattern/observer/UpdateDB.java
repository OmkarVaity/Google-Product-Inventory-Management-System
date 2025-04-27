package edu.neu.csye7374.designpattern.observer;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import edu.neu.csye7374.model.Product;
import edu.neu.csye7374.repository.ProductRepository;

public class UpdateDB extends ObserverAPI{

	private ProductRepository productRepo;
	
	public UpdateDB(Notify notify, ProductRepository productRepo) {
		this.notify = notify;
		this.productRepo = productRepo;
		this.notify.attach(this);
		
	}

	@Override
	public void update(Product product) {
		if(productRepo.productExists(product.getProductName()))
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product already exists");
		productRepo.save(product);
	}

}
