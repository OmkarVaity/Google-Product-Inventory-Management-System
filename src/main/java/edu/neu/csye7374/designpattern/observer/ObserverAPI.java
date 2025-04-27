package edu.neu.csye7374.designpattern.observer;

import edu.neu.csye7374.model.Product;
import edu.neu.csye7374.designpattern.observer.Notify;

public abstract class ObserverAPI {
	
	protected Notify notify;
	
	public abstract void update(Product product);
}
