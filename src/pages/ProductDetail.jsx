import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "../redux/counterSlice";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.counter.products);
  const loading = useSelector((state) => state.counter.loading);
  const hasLoaded = useSelector((state) => state.counter.hasLoaded);
  const error = useSelector((state) => state.counter.error);
  const product = products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");

  if (loading || !hasLoaded) {
    return <div className="products-status">Loading product...</div>;
  }

  if (error) {
    return (
      <div className="product-detail-empty" role="alert">
        <p>Could not load products: {error}</p>
        <button type="button" onClick={() => dispatch(fetchProducts())}>
          Try again
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-empty">
        <p>Product not found.</p>
        <button type="button" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
    );
  }

  const handleQuantityChange = (value) => {
    const nextValue = Number(value);
    if (Number.isSafeInteger(nextValue) && nextValue >= 1) {
      setQuantity(nextValue);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      }),
    );
    setAddedMessage(`${quantity} item(s) added to cart.`);
  };

  return (
    <div className="product-detail-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <div className="product-detail-card">
        <div className="product-detail-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="product-detail-description">{product.description}</p>

          <div className="quantity-box">
            <span className="quantity-label">How many units do you want?</span>
            <div className="quantity-controls">
              <button
                type="button"
                className="quantity-button"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => handleQuantityChange(event.target.value)}
                className="quantity-input"
              />
              <button
                type="button"
                className="quantity-button"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-detail-meta">
            <span className="product-detail-price">${product.price}</span>
            <button
              type="button"
              className="product-detail-button"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>

          {addedMessage && (
            <div className="cart-success-message">{addedMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
