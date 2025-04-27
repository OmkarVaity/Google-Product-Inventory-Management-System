package edu.neu.csye7374.designpattern.observer;

import java.util.List;

import edu.neu.csye7374.designpattern.facade.SendMessage;
import edu.neu.csye7374.model.Buyer;
import edu.neu.csye7374.model.Product;
import edu.neu.csye7374.repository.BuyerRepository;

public class NotifyBuyers extends Buyer {

	private List<Buyer> buyers;
	private Product product;
	private BuyerRepository buyerRepo;

	public NotifyBuyers(Product product, BuyerRepository buyerRepo) {
		this.product = product;
		this.buyerRepo = buyerRepo;
	}
	public void notifyAllBuyers() {
		StringBuilder sb =new StringBuilder();
		buyers = buyerRepo.getBuyers();
		
		for (Buyer buyer : buyers) {
			System.out.println(buyer.getOwnerName() + " notified of Product " + product.getProductName() + " addition");
			sb.append("Hello "+buyer.getOwnerName()).append(", new product available : ");
			sb.append(product.getProductName()+"\n");
			
			SendMessage.message(sb.toString());
		}
	}
}
