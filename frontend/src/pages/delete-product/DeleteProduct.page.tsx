import React from "react";
import "./delete-product.scss";
import { Button, TextField } from "@mui/material";
import { ICreateUpdateProductId, IProduct } from "../../types/global.typing";
import { redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/url.constants";
const DeleteProduct = () => {
  const [product, setProducts] = React.useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });
  const redirect = useNavigate();
  const { id } = useParams();
 

  const handleDeleteBtnClick = () => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((responce) =>
        redirect("/products", {
          state: { message: "Product Deleted Successfully" },
        })
      )
      .catch((error) => alert("Error"));
  };
  const handleBackBtnClick = () => {
    redirect("/products");
  };

  return (
    <div className="delete-product">
      <h2>Delete Product</h2>
      <h4>Are You Sure You want to Delete this Product?</h4>

      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDeleteBtnClick}
        >
          Yes Delete it
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

export default DeleteProduct;
