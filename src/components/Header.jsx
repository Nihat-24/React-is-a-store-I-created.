import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoImage from "../image/vecteezy_business-house-logo_24284719.png";
import { setSearchTerm } from "../redux/counterSlice";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.counter.cart);
  const searchTerm = useSelector((state) => state.counter.searchTerm);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`topbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="brand" aria-label="Enes A.Ş.">
        <img src={logoImage} alt="Enes A.Ş logo" className="brand-logo" />
        <div className="brand-text">QuickMart</div>
      </div>

      <div className="header-search" aria-label="Search field">
        <input
          type="text"
          placeholder="Search products"
          aria-label="Search products"
          value={searchTerm}
          onChange={(event) => dispatch(setSearchTerm(event.target.value))}
        />
      </div>

      <div className="header-tools" aria-label="Tools">
        <button
          type="button"
          className={`tool-button theme-button ${darkMode ? "active" : ""}`}
          aria-label="Theme"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3.7" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 1.8v2.6M12 19.6v2.6M4.7 4.7l1.8 1.8M17.5 17.5l1.8 1.8M1.8 12h2.6M19.6 12h2.6M4.7 19.3l1.8-1.8M17.5 6.5l1.8-1.8" />
            </g>
          </svg>
        </button>

        <button
          type="button"
          className="tool-button cart-button"
          aria-label="Cart"
          onClick={() => navigate("/cart")}
        >
          <span className="cart-button-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3.5 5.5h2l1.6 8.1A2 2 0 0 0 9.1 15h8.6a2 2 0 0 0 1.9-1.5l1.3-5.4H6.3m3.2 12.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Zm8.5 0a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
