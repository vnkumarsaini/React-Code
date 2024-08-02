import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function UserProduct() {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const queryParams = useQuery();

  useEffect(() => {
   
    getAllProducts();
  }, []);

  function getAllProducts() {
    axios
      .get(
        "http://localhost:8081/product?departmentId=" + queryParams.get("id")
      )
      .then((d) => {
        setProducts(d.data.productData);
      });
  }
  function renderProducts() {
    return products?.map((item) => {
      return (
        <div className="col-3">
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:8081/" + item.images[0]}
              height="150"
              width="150"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>

              <button
                onClick={() => {
                  navigate(ROUTES.productDetails.name + "?id=" + item._id);
                }}
                class="btn btn-primary"
              >
                View Detail
              </button>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Navbar />
      <div className="row">{renderProducts()}</div>
    </div>
  );
}

export default UserProduct;
