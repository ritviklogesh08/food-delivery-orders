import { useState, useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import OrderCard from "../components/OrderCard";
import "../styles/Filter.css";

export default function Filter() {
  const { orders, filterOrdersByRestaurant, filteredOrders } = useOrder();
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");

  // Get unique restaurants for autocomplete
  const validOrders = orders.filter(
    (order) =>
      Array.isArray(order.items) &&
      order.items.length > 0 &&
      order.totalAmount &&
      order.totalAmount > 0,
  );

  const restaurants = [...new Set(validOrders.map((order) => order.restaurant))];

  const handleSearch = (value) => {
    setSearchInput(value);
    setError("");

    if (value.trim() === "") {
      setError("");
      filterOrdersByRestaurant("");
    } else {
      filterOrdersByRestaurant(value);

      // Check if results are empty
      if (filteredOrders.length === 0) {
        setError("No results found");
      }
    }
  };

  const handleClear = () => {
    setSearchInput("");
    setError("");
    filterOrdersByRestaurant("");
  };

  return (
    <div className="filter-container">
      <h2>Filter Orders by Restaurant</h2>

      <div className="search-section">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter restaurant name..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={handleClear} className="btn-clear">
            Clear
          </button>
        </div>

        {searchInput === "" && (
          <div className="suggestions">
            <p className="suggestions-label">Popular restaurants:</p>
            <div className="suggestion-tags">
              {restaurants.map((restaurant) => (
                <button
                  key={restaurant}
                  className="suggestion-tag"
                  onClick={() => {
                    setSearchInput(restaurant);
                    filterOrdersByRestaurant(restaurant);
                    setError("");
                  }}
                >
                  {restaurant}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="filter-results">
        {searchInput && (
          <p className="result-count">
            Found {filteredOrders.length} order(s) for "{searchInput}"
          </p>
        )}

        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>

        {searchInput && filteredOrders.length === 0 && !error && (
          <p className="no-results">No matching orders found.</p>
        )}
      </div>
    </div>
  );
}
