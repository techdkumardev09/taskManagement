import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Layout>
      <AppRoutes />
      <ToastContainer />
    </Layout>
  );
}

export default App;
