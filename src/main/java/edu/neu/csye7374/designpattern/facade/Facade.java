package edu.neu.csye7374.designpattern.facade;

import edu.neu.csye7374.repository.InvoiceRepository;

public abstract class Facade {

	protected abstract void udpTrigger(String msg);
	
	protected abstract void pdfGen(int id, InvoiceRepository invoiceRepo);
	
}
