import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetails() {
  const navigate = useNavigate();
  const queryParams = useQuery();
  const [productDetail, setProductDetail] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("id") == null) {
      alert("pl login to buy products!!!");
      navigate(ROUTES.login.name);
    }
    getProductDetail();
  });
  function getProductDetail() {
    axios
      .get("http://localhost:8081/productDetails?id=" + queryParams.get("id"))
      .then((d) => {
        setProductDetail(d.data.productData);
      });
  }
  function renderImages() {
    return productDetail?.images?.map((item) => {
      return (
        <img
          class="card-img-top"
          src={"http://localhost:8081/" + item}
          height="150"
          width="150"
          alt="Card image cap"
        />
      );
    });
  }
  function renderProduct() {
    return (
      <div className="col-6 mx-auto">
        <div class="card">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {renderImages()}
          </div>
          <div class="card-body">
            <p className="text-danger">Product Name</p>
            <h5 class="card-title">{productDetail?.name}</h5>
            <p className="text-danger">Product Description</p>
            <h5 class="card-title">{productDetail?.description}</h5>
            <p className="text-danger">Product Qty</p>
            <h5 class="card-title">{productDetail?.qty}</h5>
            <p className="text-danger">Product Price</p>
            <h5 class="card-title">{productDetail?.price}</h5>

            <button class="btn btn-primary">Add To Cart</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="row">{renderProduct()}</div>
    </div>
  );
}

export default ProductDetails;
