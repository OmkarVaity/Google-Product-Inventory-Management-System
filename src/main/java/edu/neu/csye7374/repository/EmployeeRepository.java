package edu.neu.csye7374.repository;

import java.util.List;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import edu.neu.csye7374.model.Employee;

@Repository
@Transactional
public class EmployeeRepository {

    @Autowired
    private SessionFactory factory;
    //C
    public void saveEmployee(Employee emp) {
        getSession().save(emp);
    }
    //R
    public List<Employee> getEmployees() {
        String hql = "FROM Employee";
        Query query = getSession().createQuery(hql);
        List<Employee> results = query.list();
        return results;
    }

    //R by ID
    public Employee getEmployeebyID(int id) {
        Employee emp = getSession().get(Employee.class, id);
        return emp;
    }

    //U
    public void updateEmployee(Employee emp) {
        getSession().update(emp);
        getSession().flush();
    }
    //D
    public void deleteEmployee(Employee emp) {
        getSession().delete(emp);
        getSession().flush();
    }

    public Employee getEmployeeforLogin(String username, String password) {
        String hql = "FROM Employee WHERE username = :username AND password = :password";
        Query query = getSession().createQuery(hql);
        query.setParameter("username", username);
        query.setParameter("password", password);
        Employee emp = (Employee) query.uniqueResult();
        return emp;
    }

    public boolean usernameExists(String username) {
        String hql = "FROM Employee WHERE username = :username";
        Query query = getSession().createQuery(hql);
        query.setParameter("username", username);
        Employee emp = (Employee) query.uniqueResult();
        if(emp != null)
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