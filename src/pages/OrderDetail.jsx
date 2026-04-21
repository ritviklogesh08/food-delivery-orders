import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import "../styles/OrderDetail.css";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrder();

  // Find the order by ID
  const order = orders.find((o) => o.orderId === parseInt(id));

  if (!order) {
    return (
      <div className="order-detail-container">
        <h2>Order not found</h2>
        <button onClick={() => navigate("/orders")} className="btn-back">
          Back to Orders
        </button>
      </div>
    );
  }

  // Calculate subtotal
  const subtotal = order.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity || 0);
  }, 0);

  return (
    <div className="order-detail-container">
      <button onClick={() => navigate("/orders")} className="btn-back">
        ← Back to Orders
      </button>

      <div className="order-detail">
        <h2>Order Details #{order.orderId}</h2>

        <div className="detail-section">
          <h3>Order Information</h3>
          <p>
            <strong>Customer:</strong> {order.customerName || "Unknown"}
          </p>
          <p>
            <strong>Restaurant:</strong> {order.restaurant}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </p>
          {order.rating && (
            <p>
              <strong>Rating:</strong> {order.rating} ⭐
            </p>
          )}
        </div>

        <div className="detail-section">
          <h3>Items</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="detail-section total">
          <p>
            <strong>Subtotal:</strong> ₹{subtotal}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
}
