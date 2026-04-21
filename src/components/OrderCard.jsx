import { Link } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import "../styles/OrderCard.css";

export default function OrderCard({ order }) {
  const { toggleOrderStatus } = useOrder();

  return (
    <div className="order-card">
      <div className="order-header">
        <h3>Order #{order.orderId}</h3>
        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <div className="order-info">
        <p>
          <strong>Customer:</strong> {order.customerName || "Unknown"}
        </p>
        <p>
          <strong>Restaurant:</strong> {order.restaurant}
        </p>
        <p>
          <strong>Items:</strong> {order.items.length}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>
        {order.rating && (
          <p>
            <strong>Rating:</strong> {order.rating} ⭐
          </p>
        )}
      </div>

      <div className="order-actions">
        <Link to={`/orders/${order.orderId}`} className="btn-view">
          View Details
        </Link>
        <button
          onClick={() => toggleOrderStatus(order.orderId)}
          className="btn-status"
        >
          Mark as {order.status === "Pending" ? "Delivered" : "Pending"}
        </button>
      </div>
    </div>
  );
}
