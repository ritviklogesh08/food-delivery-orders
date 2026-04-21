import { useOrder } from "../context/MovieContext";
import OrderCard from "../components/OrderCard";
import "../styles/Orders.css";

export default function Orders() {
  const { orders, loading } = useOrder();

  // Filter valid orders
  const validOrders = orders.filter(
    (order) =>
      Array.isArray(order.items) &&
      order.items.length > 0 &&
      order.totalAmount &&
      order.totalAmount > 0,
  );

  if (loading) {
    return <div className="orders-container">Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <h2>All Valid Orders</h2>
      <p className="order-count">Total: {validOrders.length} orders</p>

      <div
        className="orders-grid"
        data-testid="total-orders"
      >
        {validOrders.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>

      {validOrders.length === 0 && (
        <p className="no-orders">No valid orders found.</p>
      )}
    </div>
  );
}
