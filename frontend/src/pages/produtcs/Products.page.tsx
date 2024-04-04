import axios from "axios";
import { IProduct } from "../../types/global.typing";
import "./products.scss";
import { useState, useEffect } from "react";
import { baseUrl } from "../../constants/url.constants";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const location = useLocation();
  const redirect = useNavigate();
  console.log(location);
  const fetchProductsList = async () => {
    try {
      const responce = await axios.get<IProduct[]>(baseUrl + "/GetAllProducts");
      setProducts(responce.data);
      if (location?.state) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        redirect(location.pathname, { replace: true });
      }
    } catch (error) {
      alert("An Error Happend");
    }
  };
  useEffect(() => {
    fetchProductsList();
  }, []);
  const redirectToEditPage = (id: string) => {
    redirect(`/products/edit/${id}`);
  };
  const redirectToDeletePage = (id: string) => {
    redirect(`/products/delete/${id}`);
  };
  //console.log(products);

  return (
    <div className="products">
      <h1>Products List</h1>
      {products.length === 0 ? (
        <h1>No Product</h1>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Brand</th>
                <th>Creation time</th>
                <th>Updated time</th>
                <th>Oprations</th>
              </tr>
            </thead>
            <tbody>
              {products.map((products) => (
                <tr key={products.id}>
                  <td>{products.title}</td>
                  <td>{products.brand}</td>
                  <td>{moment(products.createdAt).fromNow()}</td>
                  <td>{moment(products.updatedAt).fromNow()}</td>

                  <td>
                    {" "}
                    <Button
                      variant="outlined"
                      color="warning"
                      sx={{ mx: 3 }}
                      onClick={() => redirectToEditPage(products.id)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => redirectToDeletePage(products.id)}
                    >
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
