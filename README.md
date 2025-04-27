# Google Product Inventory Management System

This is the **Final Design Patterns Project** built to manage inventory for a Google Store, implementing key Object-Oriented Design Principles and popular **Design Patterns** in Java and React.js.

---

## 📈 Project Overview

This project is a simulation of an Inventory Management System for Google's e-commerce products. It enables:
- Managing product inventory and stock levels
- Order processing and tracking
- Admin and user-level interactions
- Invoice generation

We heavily utilized design patterns to ensure scalability, modularity, and maintainability.

---

## 🚀 Key Features
- Add, edit, or delete products from inventory
- Place new customer orders
- Manage stock quantities and automatically update stock on purchases
- Generate and view invoices
- View sales reports and inventory reports
- Admin and User Roles support
- Frontend User Interface built with React.js

---

## 🌐 Technologies Used
- **Java 17** (Backend)
- **JavaFX** (Admin Frontend)
- **Maven** (Backend Build Management)
- **React.js** (Frontend User Interface)
- **Node.js & npm** (Frontend Build Management)
- **Eclipse IDE** (Backend Project Setup)

---

## 🏛️ Design Patterns Implemented

| Pattern | Usage |
|--------|-------|
| **Factory Pattern** | To create different types of Products (e.g., Electronics, Accessories) |
| **Singleton Pattern** | To ensure a single Database/Inventory Manager instance |
| **Observer Pattern** | To notify system components on inventory updates |
| **Strategy Pattern** | To apply different payment strategies (e.g., Credit Card, PayPal) |
| **Decorator Pattern** | To add features dynamically to invoices/orders |
| **Command Pattern** | To queue and execute stock update operations |
| **Adapter Pattern** | To integrate external systems like third-party payment gateway |
| **Composite Pattern** | To handle a group of Products in Categories |
| **State Pattern** | To manage Order States (Processing, Shipped, Delivered) |
| **Facade Pattern** | To provide a unified interface for complex subsystem interactions |

---

## 🛠️ How to Run the Project

### 1. Backend (Java + JavaFX)
- Clone the repository:
```bash
git clone https://github.com/OmkarVaity/Google-Product-Inventory-Management-System.git
```
- Import the project into **Eclipse** or any Java IDE as a **Maven project**.
- Make sure JavaFX SDK is configured.
- Run `Main.java` from the `src/main/java` package.

### 2. Frontend (React.js)
- Navigate to the `frontend` folder:
```bash
cd frontend
```
- Install dependencies:
```bash
npm install
```
- Start the development server:
```bash
npm start
```
- Visit `http://localhost:3000/` to interact with the application frontend.

---

## 📚 Project Documents
- `Project Specification Document.md` - detailed functional and non-functional specifications
- `DesignPattern_Team08.pptx` - overview of design patterns usage
- `Milestone Documents` - all milestones and incremental progress

---

Thank you for visiting this repository! Feel free to ⭐ the project if you found it helpful! ✨
