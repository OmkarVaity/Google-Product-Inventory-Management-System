package edu.neu.csye7374.controller;

import edu.neu.csye7374.model.Invoice;
import edu.neu.csye7374.repository.InvoiceRepository;
import edu.neu.csye7374.repository.OrderRepository;
import edu.neu.csye7374.designpattern.strategy.InventoryStrategy;
import edu.neu.csye7374.designpattern.strategy.InvoiceStrategy;
import edu.neu.csye7374.designpattern.facade.PDFGen;
import edu.neu.csye7374.designpattern.facade.SendMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @apiNote - REST Controller for Invoice
 */
@RestController
@RequestMapping("/invoice")
public class InvoiceController {

    @Autowired
    private InvoiceRepository invoiceRepo;

    @Autowired
    private OrderRepository purchaseOrderRepo;


  // 1. Get all invoices
    @GetMapping("/getAll")
    public List<Invoice> getAll() {
        return invoiceRepo.getInvoices();
    }

    // 2. Get invoice by ID
    @GetMapping("/getInvoice/{id}")
    public Invoice getInvoice(@PathVariable int id) {
        return invoiceRepo.getInvoicebyID(id);
    }

    // 3. Create invoice using strategy pattern
    @PostMapping("/generateInvoice/{id}")
    public void save(@PathVariable int id) {

        InventoryStrategy strategy = new InventoryStrategy(new InvoiceStrategy(invoiceRepo, id, purchaseOrderRepo));
        strategy.executeAdd();
    }

// 4. Update invoice
    @PutMapping("/update")
    public void update(@RequestBody Invoice invoice) {
        InventoryStrategy strategy = new InventoryStrategy(new InvoiceStrategy(invoiceRepo, invoice));
        strategy.executeUpdate();
    }

 // 5. Delete invoice
    @DeleteMapping("/delete/{id}")
    public void deletebyID(@PathVariable int id) {
        InventoryStrategy strategy = new InventoryStrategy(new InvoiceStrategy(invoiceRepo, id));
        strategy.executeDelete();
    }

    // 6. Generate PDF using Facade pattern
    @PostMapping("/generatePDF/{id}")
    public String generatePDF(@PathVariable int id) {
        try {
            PDFGen.pdfGenerator(id, invoiceRepo);
            return "PDF successfully generated for invoice ID: " + id;
        } catch (Exception e) {
            return "Failed to generate PDF: " + e.getMessage();
        }
    }

    // 7. Trigger UDP message using Facade pattern
    @PostMapping("/sendMessage")
    public String sendMessage(@RequestParam String message) {
        try {
            SendMessage.message(message);
            return "UDP message sent: " + message;
        } catch (Exception e) {
            return "Failed to send message: " + e.getMessage();
        }
    }
}
