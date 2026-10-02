import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchProducts } from "../redux/counterSlice";

function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.counter.products);
  const loading = useSelector((state) => state.counter.loading);
  const hasLoaded = useSelector((state) => state.counter.hasLoaded);
  const error = useSelector((state) => state.counter.error);
  const searchTerm = useSelector((state) => state.counter.searchTerm);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading || !hasLoaded) {
    return <div className="products-status">Loading...</div>;
  }

  if (error) {
    return (
      <div className="products-status" role="alert">
        <p>Could not load products: {error}</p>
        <button type="button" onClick={() => dispatch(fetchProducts())}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="products-section">
      <div className="products-header">
        <h2>Featured products</h2>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="products-status">No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article
              className="product-card"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-image-wrap">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <span className="product-price">${product.price}</span>
                  <button
                    type="button"
                    className="add-cart-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(addToCart({ ...product, quantity: 1 }));
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductsList;
