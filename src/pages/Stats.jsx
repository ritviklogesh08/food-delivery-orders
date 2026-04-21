import { useOrder } from "../context/MovieContext";
import "../styles/Stats.css";

export default function Stats() {
  const { orders } = useOrder();

  // Calculate stats dynamically using reduce
  const validOrders = orders.filter(
    (order) =>
      Array.isArray(order.items) &&
      order.items.length > 0 &&
      order.totalAmount &&
      order.totalAmount > 0,
  );

  const stats = validOrders.reduce(
    (acc, order) => {
      acc.totalOrders++;
      if (order.status === "Delivered") acc.deliveredOrders++;
      if (order.status === "Cancelled") acc.cancelledOrders++;
      return acc;
    },
    { totalOrders: 0, deliveredOrders: 0, cancelledOrders: 0 },
  );

  return (
    <div className="stats-container">
      <h2>Orders Analytics Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Valid Orders</h3>
          <div className="stat-value" data-testid="total-orders">
            {stats.totalOrders}
          </div>
        </div>

        <div className="stat-card delivered">
          <h3>Delivered Orders</h3>
          <div className="stat-value" data-testid="delivered-orders">
            {stats.deliveredOrders}
          </div>
        </div>

        <div className="stat-card cancelled">
          <h3>Cancelled Orders</h3>
          <div className="stat-value" data-testid="cancelled-orders">
            {stats.cancelledOrders}
          </div>
        </div>

        <div className="stat-card pending">
          <h3>Pending Orders</h3>
          <div className="stat-value">
            {stats.totalOrders - stats.deliveredOrders - stats.cancelledOrders}
          </div>
        </div>
      </div>

      <div className="stats-summary">
        <h3>Summary</h3>
        <ul>
          <li>
            Delivery Rate:{" "}
            {stats.totalOrders > 0
              ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1)
              : 0}
            %
          </li>
          <li>
            Cancellation Rate:{" "}
            {stats.totalOrders > 0
              ? ((stats.cancelledOrders / stats.totalOrders) * 100).toFixed(1)
              : 0}
            %
          </li>
          <li>
            Pending Rate:{" "}
            {stats.totalOrders > 0
              ? (
                  ((stats.totalOrders -
                    stats.deliveredOrders -
                    stats.cancelledOrders) /
                    stats.totalOrders) *
                  100
                ).toFixed(1)
              : 0}
            %
          </li>
        </ul>
      </div>
    </div>
  );
}
