package edu.neu.csye7374.designpattern.observer;

import java.util.ArrayList;
import java.util.List;

import edu.neu.csye7374.model.Product;

public class Notify {

	private List<ObserverAPI> subscribers = new ArrayList<ObserverAPI>();
	   
	   public void setState(Product product) {
	      notifyAllSubscribers(product);
	   }

	   public void attach(ObserverAPI sub){
	      subscribers.add(sub);
	   }

	   public void notifyAllSubscribers(Product product){
	      for (ObserverAPI observer : subscribers) {
	         observer.update(product);
	      }
	   } 	
	
}
