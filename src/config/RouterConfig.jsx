import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import ProductsList from "../components/productsList";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default RouterConfig;
