package edu.neu.csye7374.designpattern.command;

import java.io.IOException;


public class Client implements Runnable, CommandAPI{

	static String message;
	
	public Client() {
	}

	public Client(String message) {
		super();
		Client.message = message;
	}

	@Override
	public void run() {
		try {
			new ServerClient().Client(Client.message);
		} catch (IOException e) {

			e.printStackTrace();
		}
		
	}

	@Override
	public void execute() {
		Thread t = new Thread(new Client(Client.message));
		t.start();
		
	}

}
