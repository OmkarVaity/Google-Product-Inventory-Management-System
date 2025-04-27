package edu.neu.csye7374.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import edu.neu.csye7374.model.Product;


@Repository
@Transactional
public class ProductRepository {

    @Autowired
    private SessionFactory factory;
    //C
    public void save(Product product) {
        getSession().save(product);
    }
    //R
    public List<Product> getProducts() {
        String hql = "FROM Product";
        Query query = getSession().createQuery(hql);
        List<Product> results = query.list();
        return results;
    }

    //R by ID
    public Product getProductbyID(int id) {
        Product product = getSession().get(Product.class, id);
        return product;
    }

    //U
    public void update(Product product) {
        getSession().update(product);
        getSession().flush();
    }
    //D
    public void delete(Product product) {
        getSession().delete(product);
        getSession().flush();
    }

    public boolean productExists(String productName) {
        String hql = "FROM Product WHERE productName = :productName";
        Query query = getSession().createQuery(hql);
        query.setParameter("productName", productName);
        Product p = (Product) query.uniqueResult();
        if(p != null)
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
