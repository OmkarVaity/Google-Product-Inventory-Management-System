package edu.neu.csye7374.designpattern.command;

import java.io.IOException;

public class Server implements Runnable, CommandAPI{

	@Override
	public void run() {
		try {
			new ServerClient().Server();
		} catch (IOException e) {
			System.err.println("Error in Server");
			e.printStackTrace();
		}
		
	}

	@Override
	public void execute() {
		Thread t = new Thread(new Server());
		t.start();
		
	}

}
