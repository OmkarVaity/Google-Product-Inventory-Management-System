package edu.neu.csye7374.designpattern.command;

import java.util.ArrayList;
import java.util.List;

public class Communication {
	

 private List<CommandAPI> orderList = new ArrayList<CommandAPI>(); 
	 
	 public void takeOperation(CommandAPI op) {
		 orderList.add(op);
	 }
	 
	 public void executeOperation() {
		 for(CommandAPI op :orderList) {
			 op.execute();
		 }
		 
		 orderList.clear();
	 }
	 
	 public void triggerServerClient(String msg) {
		 Server s = new Server();
		 Client c = new Client(msg);
		 
		 Communication com = new Communication();
		 com.takeOperation(s);
		 com.takeOperation(c);
		 
		 com.executeOperation();
		 
		 
	 }
}
