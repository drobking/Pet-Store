import "./home.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import kitten from "../../assets/images/kitten.jpeg";
const Home = () => {
  const redirect = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to Pet Store</h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => redirect("/products")}
      >
        Product List
      </Button>
      <img src={kitten} alt="kitten" />
    </div>
  );
};

export default Home;
