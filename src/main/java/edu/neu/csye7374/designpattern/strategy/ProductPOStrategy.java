package edu.neu.csye7374.designpattern.strategy;

import edu.neu.csye7374.model.ProductPO;
import edu.neu.csye7374.repository.ProductPORepository;

public class ProductPOStrategy implements StrategyAPI{

	private ProductPORepository productPORepo;
	private int id;
	private ProductPO productPO;
	
	public ProductPOStrategy(ProductPORepository productPORepo, int id) {
		super();
		this.productPORepo = productPORepo;
		this.id = id;
	}
	
	public ProductPOStrategy(ProductPORepository productPORepo, ProductPO productPO) {
		super();
		this.productPORepo = productPORepo;
		this.productPO = productPO;
	}

	@Override
	public void add() {
		productPORepo.save(productPO);
	}

	@Override
	public void update() {
		productPORepo.update(productPO);
	}

	@Override
	public void delete() {
		ProductPO productPO = productPORepo.getProductPObyID(id);
		productPORepo.delete(productPO);
	}

	
}
