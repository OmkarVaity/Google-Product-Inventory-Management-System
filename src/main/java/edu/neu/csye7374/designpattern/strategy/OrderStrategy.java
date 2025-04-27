package edu.neu.csye7374.designpattern.strategy;

import java.util.List;

import edu.neu.csye7374.InventoryCartAPI;
import edu.neu.csye7374.designpattern.decorator.CustomDecorator;
import edu.neu.csye7374.designpattern.decorator.Product;
import edu.neu.csye7374.model.ProductPO;
import edu.neu.csye7374.model.PurchaseOrder;
import edu.neu.csye7374.repository.ProductPORepository;
import edu.neu.csye7374.repository.ProductRepository;
import edu.neu.csye7374.repository.OrderRepository;
import edu.neu.csye7374.designpattern.state.StockAlert;
import edu.neu.csye7374.designpattern.state.State;
import edu.neu.csye7374.designpattern.state.StockUpdate;


public class OrderStrategy implements StrategyAPI{

	private OrderRepository orderRepo;
	private ProductPORepository productPORepo;
	private ProductRepository productRepo;
	private int id;
	private PurchaseOrder purchaseOrder;
	private PurchaseOrder insertedPO; 
	
	public OrderStrategy(OrderRepository orderRepo,
						 ProductPORepository productPORepo, ProductRepository productRepo, PurchaseOrder insertedPO , PurchaseOrder purchaseOrder) {
		
		this.orderRepo = orderRepo;
		this.productPORepo = productPORepo;
		this.productRepo = productRepo;
		this.purchaseOrder = purchaseOrder;
		this.insertedPO = insertedPO;
	}
	
	public OrderStrategy(OrderRepository orderRepo, PurchaseOrder purchaseOrder) {
		this.orderRepo = orderRepo;
		this.purchaseOrder = purchaseOrder;
	}


	public OrderStrategy(OrderRepository orderRepo, int id) {
		super();
		this.orderRepo = orderRepo;
		this.id = id;
	}

	@Override
	public void add() {
	
		InventoryCartAPI cart = new Product();
		System.out.println("Inserted "+insertedPO.getId());
		List<ProductPO> productPOs = insertedPO.getProducts();
		//purchaseOrderRepository.save(insertedPO);
		
		for(ProductPO proPO : productPOs) {
			State s = new State();
			productPORepo.save(proPO);
			//Product product = productRepo.getProductbyID(proPO.getProduct().getId());
			edu.neu.csye7374.model.Product product = proPO.getProduct();
			
			cart = new CustomDecorator(cart, product, proPO);
			int difference = product.getQuantity() - proPO.getQuantity();
			
			if(difference <= 100) {
				
				StockAlert low = new StockAlert(product, productRepo);
				low.action(s, difference);
			}else {
				
				StockUpdate stock = new StockUpdate(product, productRepo);
				stock.action(s, difference);
			}

		}
		insertedPO.setTotalAmount(cart.getCost());
		orderRepo.update(insertedPO);
	}

	@Override
	public void update() {
		orderRepo.update(purchaseOrder);
	
	}

	@Override
	public void delete() {
		PurchaseOrder purchaseOrder = orderRepo.getPurchaseOrderbyID(id);
		orderRepo.delete(purchaseOrder);
		
	}

}