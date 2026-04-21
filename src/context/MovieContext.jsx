import { createContext, useContext, useReducer, useEffect } from "react";
import OrderReducer from "../reducer/MovieReducer";
import axios from "axios";
import { getToken, getDataset } from "../api/api";

const initialState = {
  orders: [],
  filteredOrders: [],
  loading: true,
  filterRestaurant: "",
};

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Fetch orders from server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Step 1: Get Token
        const tokenRes = await getToken(
          "E0423001", // replace during exam
          "890473", // replace during exam
          "food", // dataset set
        );

        // Step 2: Fetch dataset
        const orders = await getDataset(tokenRes.token, tokenRes.dataUrl);

        dispatch({ type: "SET_ORDERS", payload: orders });
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchOrders();
  }, []);

  // Expose global state for testing
  useEffect(() => {
    const validOrders = state.orders.filter(order => 
      Array.isArray(order.items) && 
      order.items.length > 0 &&
      order.totalAmount && 
      order.totalAmount > 0
    );
    
    const stats = {
      totalOrders: validOrders.length,
      deliveredOrders: validOrders.filter(o => o.status === "Delivered").length,
      cancelledOrders: validOrders.filter(o => o.status === "Cancelled").length,
    };
    
    window.appState = stats;
  }, [state.orders]);

  const toggleOrderStatus = (id) =>
    dispatch({ type: "TOGGLE_ORDER_STATUS", payload: id });

  const filterOrdersByRestaurant = (restaurant) =>
    dispatch({ type: "FILTER_ORDERS", payload: restaurant });

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        filteredOrders: state.filteredOrders,
        loading: state.loading,
        filterRestaurant: state.filterRestaurant,
        toggleOrderStatus,
        filterOrdersByRestaurant,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
