import React from "react";
import Login from "./components/LoginUI";
import Result from "./components/Result";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
// import "./App.css";
import DishPage from "./components/DishPage/DishPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "./store/rootReducer";
function App() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/dishpoll" element={<DishPage />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
