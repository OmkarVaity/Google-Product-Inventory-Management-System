//Navigation File

import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import { AuthContext } from '../context/Auth';
import AddProduct from '../pages/Product/AddProduct';
import ManageProduct from '../pages/Product/ManageProduct';
import Login from '../pages/Login';
import ManageBuyer from '../pages/Buyer/ManageBuyer';
import AddBuyer from '../pages/Buyer/AddBuyer';
import Profile from '../pages/Profile';
import ManageEmployee from '../pages/Employee/ManageEmployee';
import AddEmployee from '../pages/Employee/AddEmployee';
import ManagePurchaseOrder from '../pages/PurchaseOrder/ManagePurchaseOrder';
import AddPurchaseOrder from '../pages/PurchaseOrder/AddPurchaseOrder';
import Home from '../pages/Home';
import ManageInvoice from '../pages/Invoice/ManageInvoice';

function RouteWrapper({
  component: Component,
  TransparentNav,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => <Layout {...props} TransparentNav={TransparentNav}>
        <Component {...props} />
      </Layout>} />
  );
}

function Nav() {

  const { isLoggedIn, userData } = useContext(AuthContext);

  return (
    
    <BrowserRouter baseName="/">
      <Switch>
        {isLoggedIn ? (
          <React.Fragment>
            <RouteWrapper path="/manage-products" exact component={ManageProduct} />
            <RouteWrapper path="/add-product" exact component={AddProduct} />
            <RouteWrapper path="/edit-product" exact component={AddProduct} />

            <RouteWrapper path="/manage-buyers" exact component={ManageBuyer} />
            <RouteWrapper path="/add-buyer" exact component={AddBuyer} />
            <RouteWrapper path="/edit-buyer/" exact component={AddBuyer} />

            {userData.designation.toUpperCase() === 'MANAGER' && (
              <React.Fragment>
                <RouteWrapper path="/manage-employees" exact component={ManageEmployee} />
                <RouteWrapper path="/add-employee" exact component={AddEmployee} />
                <RouteWrapper path="/edit-employee/" exact component={AddEmployee} />
              </React.Fragment>
            )}
           
            <RouteWrapper path="/manage-purchase-order" exact component={ManagePurchaseOrder} />
            <RouteWrapper path="/add-purchase-order" exact component={AddPurchaseOrder} />
            <RouteWrapper path="/view-purchase-order/" exact component={AddPurchaseOrder} />
            
            <RouteWrapper path="/manage-invoice" exact component={ManageInvoice} />

            <RouteWrapper path="/home" exact component={Home} />
            <RouteWrapper path="/" exact component={Home} />
            
          </React.Fragment>
        ) : (
          <RouteWrapper path="/" exact component={Login} />
        )}
        
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Nav;
