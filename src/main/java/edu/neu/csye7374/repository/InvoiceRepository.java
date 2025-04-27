package edu.neu.csye7374.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import edu.neu.csye7374.model.Invoice;


@Repository
@Transactional
public class InvoiceRepository {

    @Autowired
    private SessionFactory factory;
    //C
    public int save(Invoice invoice) {
        int id = (int) getSession().save(invoice);
        return id;
    }
    //R
    public List<Invoice> getInvoices() {
        String hql = "FROM Invoice";
        Query query = getSession().createQuery(hql);
        List<Invoice> results = query.list();
        return results;
    }

    //R by ID
    public Invoice getInvoicebyID(int id) {
        Invoice invoice = getSession().get(Invoice.class, id);
        return invoice;
    }

    //U
    public void update(Invoice invoice) {
        getSession().update(invoice);
        getSession().flush();
    }
    //D
    public void delete(Invoice invoice) {
        getSession().delete(invoice);
        getSession().flush();
    }


    private Session getSession() {
        Session session = factory.getCurrentSession();
        if (session == null) {
            session = factory.openSession();
        }
        return session;
    }
}