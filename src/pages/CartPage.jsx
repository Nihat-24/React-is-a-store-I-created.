import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../redux/counterSlice";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.counter.cart);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>You have no items added yet.</p>
        <button type="button" onClick={() => navigate("/")}>
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <div className="cart-header">
        <h1>My cart</h1>
      </div>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <div className="cart-item-controls">
                <button
                  type="button"
                  className="cart-quantity-button"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  −
                </button>
                <span className="cart-quantity">{item.quantity}</span>
                <button
                  type="button"
                  className="cart-quantity-button"
                  onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                >
                  +
                </button>
              </div>
              <p>Total: ${item.price * item.quantity}</p>
            </div>

            <button
              type="button"
              className="remove-cart-item"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <span>Total amount</span>
        <strong>${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default CartPage;
