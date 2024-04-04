import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.page";
import Products from "./pages/produtcs/Products.page";
import AddProduct from "./pages/add-product/AddProduct.page";
import EditProduct from "./pages/edit-product/EditProduct.page";
import DeleteProduct from "./pages/delete-product/DeleteProduct.page";
const App: React.FC = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar></Navbar>
      {/* <Navbar/> */}
      {/* Wrapper */}
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products">
            <Route index element={<Products/>}></Route>
            <Route path="add" element={<AddProduct></AddProduct>}></Route>
            <Route path="edit/:id" element={<EditProduct></EditProduct>}/>
            <Route path="delete/:id" element={<DeleteProduct></DeleteProduct> }></Route>
          </Route>
        </Routes>
      </div>
      {/* routtes */}
    </div>
  );
};

export default App;
