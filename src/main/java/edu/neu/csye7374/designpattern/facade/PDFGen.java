package edu.neu.csye7374.designpattern.facade;

import edu.neu.csye7374.model.Invoice;
import edu.neu.csye7374.repository.InvoiceRepository;

public class PDFGen extends Facade{

	@Override
	protected void udpTrigger(String msg) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void pdfGen(int invoiceID, InvoiceRepository invoiceRepo) {
		Invoice insertedInvoice = invoiceRepo.getInvoicebyID(invoiceID);
		createPDF pdf = new createPDF();
		pdf.generatePDF(insertedInvoice);
	}

	public static void pdfGenerator(int invoiceID, InvoiceRepository invoiceRepo) {
		new PDFGen().pdfGen(invoiceID, invoiceRepo);
	}
}
