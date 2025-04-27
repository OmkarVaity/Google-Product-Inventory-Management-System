package edu.neu.csye7374.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import edu.neu.csye7374.model.Buyer;

@Repository
@Transactional
public class BuyerRepository {

	@Autowired
	private SessionFactory factory;
	
	//C
	public void save(Buyer buyer) {
		getSession().save(buyer);
	}
	
	//R
	public List<Buyer> getBuyers() {
		String hql = "FROM Buyer";
        Query query = getSession().createQuery(hql);
        List<Buyer> results = query.list();
        return results;
	}
	
	//R by ID
	public Buyer getBuyerbyID(int id) {
        Buyer buyer = getSession().get(Buyer.class, id);
        return buyer;
    }
	
	//U
	public void update(Buyer buyer) {
		getSession().update(buyer);
		getSession().flush();
	}
	//D
	public void delete(Buyer buyer) {
		getSession().delete(buyer);
		getSession().flush();
	}
	
	public boolean companyExists(String company) {
        String hql = "FROM Buyer WHERE companyName = :company";        
        Query query = getSession().createQuery(hql);
        query.setParameter("company", company);
        Buyer buyer = (Buyer) query.uniqueResult();
        if(buyer != null) 
        	return true;
        else
        	return false;
    }
	
	private Session getSession() {
		Session session = factory.getCurrentSession();
		if (session == null) {
			session = factory.openSession();
		}
		return session;
	}
}
