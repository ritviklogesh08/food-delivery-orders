import React from "react";
import AppRouter from "./routers/AppRouter.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

const App = () => {
  return (
    <OrderProvider>
      <AppRouter />
    </OrderProvider>
  );
};

export default App;
