import React from "react";
import "./edit-product.scss";
import { Button, TextField } from "@mui/material";
import { ICreateUpdateProductId, IProduct } from "../../types/global.typing";
import { redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/url.constants";
const EditProduct: React.FC = () => {
  const [product, setProducts] = React.useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });
  const redirect = useNavigate();
  const { id } = useParams();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProducts({
      ...product,
      [event.target.name]: event.target.value,
    });
  };
  React.useEffect(() => {
    axios.get(`${baseUrl}/${id}`).then((response) =>
      setProducts({
        title: response.data.title,
        brand: response.data.brand,
      })
    );
  }, []);
  const handleSaveBtnClick = () => {
    if (product.title === "" || product.brand === "") {
      alert("enter values");
      return;
    }
    console.log(id);
    const data: Partial<ICreateUpdateProductId> = {
      id: id,
      cuPdto: {
        brand: product.brand!,
        title: product.title!,
      },
    };
console.log(data);
    axios
      .put(`${baseUrl}`, data)
      .then((responce) =>
        redirect("/products", {
          state: { message: "Product Updated Successfully" },
        })
      )
      .catch((error) => alert("Error"));
  };
  const handleBackBtnClick = () => {
    redirect("/products");
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
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

export default EditProduct;
