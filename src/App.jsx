import React from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter.jsx";
import { OrderProvider } from "./context/MovieContext.jsx";

const App = () => {
  return (
    <OrderProvider>
      <AppRouter />
    </OrderProvider>
  );
};

export default App;
