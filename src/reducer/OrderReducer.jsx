const OrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: Array.isArray(action.payload) ? action.payload : [],
        filteredOrders: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case "TOGGLE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload
            ? {
                ...order,
                status:
                  order.status === "Delivered" ? "Pending" : "Delivered",
              }
            : order,
        ),
      };

    case "FILTER_ORDERS":
      const validOrders = state.orders.filter(
        (order) =>
          Array.isArray(order.items) &&
          order.items.length > 0 &&
          order.totalAmount &&
          order.totalAmount > 0,
      );

      const filtered =
        action.payload === ""
          ? validOrders
          : validOrders.filter(
              (order) =>
                order.restaurant &&
                order.restaurant
                  .toLowerCase()
                  .includes(action.payload.toLowerCase()),
            );

      return {
        ...state,
        filteredOrders: filtered,
        filterRestaurant: action.payload,
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default OrderReducer;
