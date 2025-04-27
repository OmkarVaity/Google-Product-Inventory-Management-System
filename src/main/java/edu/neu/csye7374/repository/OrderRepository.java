package edu.neu.csye7374.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import edu.neu.csye7374.model.PurchaseOrder;

@Repository
@Transactional
public class OrderRepository {

	@Autowired
	private SessionFactory factory;
	//C
	public int save(PurchaseOrder purchaseOrder) {
		int id = (int) getSession().save(purchaseOrder);
		return id;
	}
	//R
	public List<PurchaseOrder> getPurchaseOrders() {
		String hql = "FROM PurchaseOrder";
        Query query = getSession().createQuery(hql);
        List<PurchaseOrder> results = query.list();
        return results;
	}
	
	//R by ID
	public PurchaseOrder getPurchaseOrderbyID(int id) {
		PurchaseOrder purchaseOrder = getSession().get(PurchaseOrder.class, id);
        return purchaseOrder;
    }
	
	//U
	public void update(PurchaseOrder purchaseOrder) {
		getSession().update(purchaseOrder);
		getSession().flush();
	}
	//D
	public void delete(PurchaseOrder purchaseOrder) {
		getSession().delete(purchaseOrder);
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
