package edu.neu.csye7374.designpattern.facade;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import edu.neu.csye7374.model.Invoice;
import edu.neu.csye7374.model.ProductPO;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

public class createPDF {
	
	private Invoice invoice;
	
	public void generatePDF(Invoice invoice) {
		this.invoice = invoice;
		Document document = new Document();
		try {
			String filename = "Invoice_" + invoice.getId() + "_" + invoice.getPurchaseOrder().getBuyer().getCompanyName() + ".pdf";
			PdfWriter.getInstance(document, new FileOutputStream(filename));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		document.open();
		Font font1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, BaseColor.BLACK);
		Font font2 = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.BLACK);
		Paragraph p1 = new Paragraph("Invoice for your Purchase", font1);
		Paragraph p2 = new Paragraph("Payment Date: " + invoice.getPaymentDate(), font2);
		
		PdfPTable table = new PdfPTable(4);
		addTableHeader(table);
		addRows(table);
		try {
			document.add(p1);
			document.add(p2);
			document.add( Chunk.NEWLINE );
			document.add(table);
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		document.close();
	}
	
	private void addTableHeader(PdfPTable table) {
		Stream.of("Product", "Quantity", "Unit Price", "Total Price").forEach(columnTitle -> {
			PdfPCell header = new PdfPCell();
			header.setBackgroundColor(BaseColor.LIGHT_GRAY);
			header.setBorderWidth(2);
			header.setPhrase(new Phrase(columnTitle));
			table.addCell(header);
		});
	}

	private void addRows(PdfPTable table) {
		List<ProductPO> productPOs = invoice.getPurchaseOrder().getProducts();

		// Group products by name and sum quantities
		Map<String, Double> productQuantityMap = new HashMap<>();
		Map<String, Double> productPriceMap = new HashMap<>();

		for (ProductPO po : productPOs) {
			String productName = po.getProduct().getProductName();
			double quantity = po.getQuantity();
			double price = po.getProduct().getPrice();

			// Add quantity if product already exists in map, otherwise set it
			productQuantityMap.put(productName,
					productQuantityMap.getOrDefault(productName, 0.0) + quantity);

			// Store the price (assumes same product has same price)
			productPriceMap.put(productName, price);
		}

		// Add rows to the table
		for (String productName : productQuantityMap.keySet()) {
			double quantity = productQuantityMap.get(productName);
			double price = productPriceMap.get(productName);
			double total = price * quantity;

			table.addCell(productName);
			table.addCell(String.valueOf(quantity));
			table.addCell("$" + price);
			table.addCell("$" + total);
		}

		table.addCell("Total");
		table.addCell("---");
		table.addCell("---");
		table.addCell("$" + invoice.getPurchaseOrder().getTotalAmount());
	}
}
