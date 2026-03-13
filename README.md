# 🛍 E-Commerce Mini App (React Native)

A simple and functional **E-Commerce mobile application** built using **React Native**.  
The app allows users to browse products, view product details, and add items to the cart.

This project demonstrates core React Native concepts such as API integration, navigation, state management, and UI components.

---

# 📱 Features

- Product listing screen
- Product detail screen
- Shopping cart screen
- Search products
- Price filtering (Low → High / High → Low)
- Add products to cart
- Clean and responsive UI

---

# 📷 Screens

### Product List
Displays all products fetched from the API with search and filter functionality.

### Product Detail
Shows complete information about a selected product.

### Cart
Displays all items added to the shopping cart.

---

# ⚙️ Tech Stack

- React Native
- React Navigation
- Redux Toolkit
- Axios
- FakeStore API

---

# 📂 Project Structure

src
 ┣ components
 ┃ ┗ ProductCard.js
 ┣ screens
 ┃ ┣ ProductListScreen.js
 ┃ ┣ ProductDetailScreen.js
 ┃ ┗ CartScreen.js
 ┣ redux
 ┃ ┣ store.js
 ┃ ┗ cartSlice.js
 ┣ services
 ┃ ┗ api.js
 ┗ navigation
   ┗ AppNavigator.js

---

# 🔌 API Used

https://fakestoreapi.com/products

---

# 🚀 Installation

Clone the repository

git clone https://github.com/yourusername/ecommerce-app.git

Go to project folder

cd ecommerce-app

Install dependencies

npm install

Run the project

npx react-native run-android

or

npx react-native run-ios

---
# 🧠 Learning Outcomes

Through this project you will learn:

- API integration in React Native
- Navigation between screens
- State management using Redux
- Creating reusable components
- Building responsive UI layouts

