import React, { useContext } from "react";
import SideNav, { NavItem, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faUsers,
  faFileInvoice,
  faUserTie,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import displayToast from "../../utils/displayToast";
import { Button, Navbar, Container } from "react-bootstrap";
import googleLogo from "../../assets/google-logo.png";

function Sidenav() {
  const history = useHistory();
  const location = useLocation();
  const { isLoggedIn, setUserData, userData } = useContext(AuthContext);

  const logoutUser = () => {
    displayToast("Logged out successfully!", "success");
    setTimeout(() => {
      setUserData(null);
      history.push("/");
    }, 1000);
  };

  if (!isLoggedIn) return null;

  return (
    <>
      {/* Top Navbar */}
      <Navbar
        fixed="top"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #dee2e6",
          height: "70px",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1030,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={googleLogo}
            alt="Google Logo"
            style={{ height: "36px", marginRight: "12px" }}
          />
          <Navbar.Brand
            href="/"
            style={{
              fontWeight: "600",
              fontSize: "20px",
              color: "#1a73e8",
              margin: 0,
            }}
          >
            Google Product Inventory
          </Navbar.Brand>
        </div>

        <Button
          variant="outline-dark"
          size="sm"
          onClick={logoutUser}
          style={{
            fontWeight: 500,
            borderRadius: "6px",
          }}
        >
          Logout
        </Button>
      </Navbar>

      {/* Sidebar */}
      <SideNav
        onSelect={(selected) => {
          const to = "/" + selected;
          if (location.pathname !== to) {
            history.push(to);
          }
        }}
        expanded={true}
        style={{
          backgroundColor: "#1f2937",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
          width: "220px",
          paddingTop: "70px", // below the navbar
          zIndex: 1020,
        }}
      >
        <SideNav.Nav defaultSelected="manage-products">
          <StyledNavItem
            eventKey="manage-products"
            icon={faBoxOpen}
            label="Products"
          />
          {userData.designation.toUpperCase() === "MANAGER" && (
            <StyledNavItem
              eventKey="manage-employees"
              icon={faUserTie}
              label="Employees"
            />
          )}
          <StyledNavItem
            eventKey="manage-buyers"
            icon={faUsers}
            label="Buyers"
          />
          <StyledNavItem
            eventKey="manage-purchase-order"
            icon={faCartPlus}
            label="Orders"
          />
          <StyledNavItem
            eventKey="manage-invoice"
            icon={faFileInvoice}
            label="Invoices"
          />
        </SideNav.Nav>
      </SideNav>
    </>
  );
}

// Reusable sidebar item with icon and hover effect
const StyledNavItem = ({ eventKey, icon, label }) => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    const to = "/" + eventKey;
    if (location.pathname !== to) {
      history.push(to);
    }
  };

  return (
    <NavItem eventKey={eventKey}>
      <NavText>
        <div
          onClick={handleClick}
          className="nav-item-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 18px",
            borderRadius: "6px",
            color: "#f3f4f6",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#374151")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <FontAwesomeIcon icon={icon} />
          {label}
        </div>
      </NavText>
    </NavItem>
  );
};


export default Sidenav;
