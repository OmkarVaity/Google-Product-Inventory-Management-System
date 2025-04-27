package edu.neu.csye7374.designpattern.observer;

import edu.neu.csye7374.model.Product;
import edu.neu.csye7374.repository.BuyerRepository;

public class UpdateBuyers extends ObserverAPI{

	private BuyerRepository buyerRepo;
	
	public UpdateBuyers(Notify notify, BuyerRepository buyerRepo) {
		this.notify = notify;
		this.notify.attach(this);
		this.buyerRepo = buyerRepo;
		// TODO Auto-generated constructor stub
	}

	@Override
	public void update(Product product) {
		NotifyBuyers notify = new NotifyBuyers(product, buyerRepo);
		notify.notifyAllBuyers();
		
	}

}
