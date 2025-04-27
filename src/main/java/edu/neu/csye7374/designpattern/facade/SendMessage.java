package edu.neu.csye7374.designpattern.facade;

import edu.neu.csye7374.designpattern.factory.CommunicationInstanceFactory;
import edu.neu.csye7374.repository.InvoiceRepository;

public class SendMessage extends Facade{

	@Override
	protected void udpTrigger(String msg) {
		// TODO Auto-generated method stub
		new CommunicationInstanceFactory().getObject().triggerServerClient(msg);
	}
	
	public static void message(String msg) {
		
		SendMessage send = new SendMessage();
		send.udpTrigger(msg);
	
	}

	@Override
	protected void pdfGen(int id, InvoiceRepository invoiceRepo) {
		// TODO Auto-generated method stub
		
	}

}
