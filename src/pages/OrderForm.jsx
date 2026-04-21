import React, { useState } from "react";
import { useOrder } from "../context/OrderContext";
import { v4 as uuidv4 } from "uuid";

const OrderForm = () => {
  const { orders, dispatch } = useOrder();
  const [order, setOrder] = useState({
    customerName: "",
    restaurant: "",
    items: [{ name: "", price: "", quantity: "" }],
    totalAmount: "",
    status: "Pending",
  });

  const handleChange = (event) => {
    setOrder((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...order.items];
    updatedItems[index][field] = value;
    setOrder((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setOrder((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", price: "", quantity: "" }],
    }));
  };

  const removeItem = (index) => {
    if (order.items.length > 1) {
      const updatedItems = order.items.filter((_, i) => i !== index);
      setOrder((prev) => ({ ...prev, items: updatedItems }));
    }
  };

  const calculateTotal = () => {
    return order.items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!order.customerName.trim() || !order.restaurant.trim()) {
      alert("Please enter customer name and restaurant");
      return;
    }

    const validItems = order.items.filter(
      (item) => item.name.trim() && item.price && item.quantity
    );

    if (validItems.length === 0) {
      alert("Please add at least one valid item");
      return;
    }

    const total = calculateTotal();
    if (total <= 0) {
      alert("Total amount must be greater than 0");
      return;
    }

    const newOrder = {
      orderId: Math.max(...orders.map(o => o.orderId), 1000) + 1,
      customerName: order.customerName.trim(),
      restaurant: order.restaurant.trim(),
      items: validItems.map(item => ({
        name: item.name.trim(),
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
      })),
      totalAmount: total,
      status: order.status,
    };

    dispatch({ type: "SET_ORDERS", payload: [...orders, newOrder] });
    setOrder({
      customerName: "",
      restaurant: "",
      items: [{ name: "", price: "", quantity: "" }],
      totalAmount: "",
      status: "Pending",
    });
  };

  return (
    <div className="order-form-container">
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit} className="order-form" data-testid="order-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Customer Name"
            name="customerName"
            value={order.customerName}
            onChange={handleChange}
            data-testid="input-customer"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Restaurant Name"
            name="restaurant"
            value={order.restaurant}
            onChange={handleChange}
            data-testid="input-restaurant"
            required
          />
        </div>

        <div className="items-section">
          <h3>Order Items</h3>
          {order.items.map((item, index) => (
            <div key={index} className="item-row" data-testid={`item-row-${index}`}>
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                data-testid={`item-name-${index}`}
              />
              <input
                type="number"
                placeholder="Price"
                min="0"
                step="0.01"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                data-testid={`item-price-${index}`}
              />
              <input
                type="number"
                placeholder="Quantity"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                data-testid={`item-quantity-${index}`}
              />
              {order.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="remove-item-btn"
                  data-testid={`remove-item-${index}`}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addItem} className="add-item-btn" data-testid="add-item-btn">
            Add Item
          </button>
        </div>

        <div className="form-group">
          <select name="status" value={order.status} onChange={handleChange} data-testid="select-status">
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="total-display">
          <strong>Total: ₹{calculateTotal().toFixed(2)}</strong>
        </div>

        <button type="submit" className="submit-btn" data-testid="add-order-btn">
          Add Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
