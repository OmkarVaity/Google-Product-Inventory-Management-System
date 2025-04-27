package edu.neu.csye7374.designpattern.strategy;

import edu.neu.csye7374.model.Product;
import edu.neu.csye7374.designpattern.observer.Notify;
import edu.neu.csye7374.designpattern.observer.UpdateBuyers;
import edu.neu.csye7374.designpattern.observer.UpdateDB;
import edu.neu.csye7374.repository.BuyerRepository;
import edu.neu.csye7374.repository.ProductRepository;

public class ProductStrategy implements StrategyAPI{

	private ProductRepository productRepo;
	private int id;
	private Product product;
	private BuyerRepository buyerRepo;
	
	public ProductStrategy(ProductRepository productRepo, int id) {
		this.productRepo = productRepo;
		this.id = id;
	}
	
	public ProductStrategy(ProductRepository productRepo, Product product) {
		this.productRepo = productRepo;
		this.product = product;
	}
	
	public ProductStrategy(ProductRepository productRepo, Product product, BuyerRepository buyerRepo) {
		this.productRepo = productRepo;
		this.product = product;
		this.buyerRepo = buyerRepo;
	}

	@Override
	public void add() {
		
		Notify a = new Notify();
		new UpdateBuyers(a, buyerRepo);
		new UpdateDB(a, productRepo);
		
		a.setState(product);
	}
	
	@Override
	public void update() {
		productRepo.update(product);
	}
	
	@Override
	public void delete() {
		Product product = productRepo.getProductbyID(id);
		productRepo.delete(product);
	}
}
