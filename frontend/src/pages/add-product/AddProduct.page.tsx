import React from "react";
import "./add-product.scss";
import { TextField, Button } from "@mui/material";
import { IProduct } from "../../types/global.typing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/url.constants";
const AddProduct: React.FC = () => {
  const [product, setProducts] = React.useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });
  const redirect = useNavigate();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProducts({
      ...product,
      [event.target.name]: event.target.value,
    });
  };
  const handleSaveBtnClick = () => {
    if (product.title === "" || product.brand === "") {
      alert("enter values");
      return;
    }
    const data: Partial<IProduct> = {
      brand: product.brand,
      title: product.title,
    };
    axios
      .post(baseUrl, data)
      .then(responce=>redirect("/products",{state:{message:"Product Created Successfully"}}))
      .catch((error) => alert("Error"));
      
  };
  const handleBackBtnClick = () => {
    redirect("/products");
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <TextField
        autoComplete="off"
        label="Brand"
        variant="outlined"
        name="brand"
        value={product.brand}
        onChange={changeHandler}
      ></TextField>
      <TextField
        autoComplete="off"
        label="Title"
        name="title"
        variant="outlined"
        value={product.title}
        onChange={changeHandler}
      ></TextField>
      
      <div>
        <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
          Save
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackBtnClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
