package edu.neu.csye7374.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import edu.neu.csye7374.model.ProductPO;

@Repository
@Transactional
public class ProductPORepository {

    @Autowired
    private SessionFactory factory;

    //C
    public void save(ProductPO productPO) {
        getSession().save(productPO);
    }
    //R
    public List<ProductPO> getProductPOs() {
        String hql = "FROM ProductPO";
        Query query = getSession().createQuery(hql);
        List<ProductPO> results = query.list();
        return results;
    }

    //R by ID
    public ProductPO getProductPObyID(int id) {
        ProductPO productPO = getSession().get(ProductPO.class, id);
        return productPO;
    }

    //U
    public void update(ProductPO productPO) {
        getSession().update(productPO);
        getSession().flush();
    }
    //D
    public void delete(ProductPO productPO) {
        getSession().delete(productPO);
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