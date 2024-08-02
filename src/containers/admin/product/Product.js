import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Product() {
  const navigate = useNavigate();
  const queryParam = useQuery();
  const [products, setProducts] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    qty: 1,
    images: null,
    price: 0,
    departmentId: queryParam.get("id"),
  });
  const [formError, setFormError] = useState({
    name: "",
    description: "",
    qty: "",
    images: null,
    price: "",
  });
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("id")==null)
    {
      alert("you are not Login");
      navigate(ROUTES.login.name);
    }
    getAllProducts();
  }, []);

  function getAllProducts() {
    axios
      .get("http://localhost:8081/product?departmentId=" + queryParam.get("id"))
      .then((d) => {
        setProducts(d.data.productData);
      });
  }

  function renderProducts() {
    return products?.map((item) => {
      return (
        <tr>
          <th>
            <img
              src={"http://localhost:8081/" + item.images[0]}
              height="150"
              width="150"
            />
          </th>
          <th>{item.name}</th>
          <th>{item.description}</th>
          <th>{item.qty}</th>
          <th>{item.price}</th>
          <th>
            <button
              onClick={() => {
                deleteProduct(item._id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                setProductId(item._id);
                setForm({
                  ...form,
                  name: item.name,
                  description: item.description,
                  qty: item.qty,
                  price: item.price,
                });
              }}
              className="btn btn-info"
            >
              Edit
            </button>
          </th>
        </tr>
      );
    });
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function onProductSubmit() {
    let errors = false;
    let error = { name: "", description: "", qty: "", images: null, price: "" };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Product Name Empty !!!" };
    }
    if (form.description.trim().length == 0) {
      errors = true;
      error = { ...error, description: "Product Description Empty !!!" };
    }
    if (form.qty <= 0) {
      errors = true;
      error = { ...error, qty: "Product qty >0 !!!" };
    }
    if (form.price <= 0) {
      errors = true;
      error = { ...error, price: "Product price >0 !!!" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      {
        productId ? updateProduct() : saveProduct();
      }
    }
  }

  function saveProduct() {
    try {
      const formData = new FormData();
      // alert(form.images.length)
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("qty", form.qty);
      formData.append("price", form.price);
      formData.append("departmentId", form.departmentId);

      axios
        .post("http://localhost:8081/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("data saved");
          ressetForm();
          getAllProducts();
        });
    } catch (error) {
      alert("Unable to submit data !!");
    }
  }
  function deleteProduct(id) {
    let ans = window.confirm("Want to delete data?");
    if (!ans) return;
    axios
      .delete("http://localhost:8081/product", { data: { id: id } })
      .then((d) => {
        getAllProducts();
      })
      .catch((e) => {
        alert("unable to delete data");
      });
  }
  function updateProduct() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("qty", form.qty);
      formData.append("price", form.price);
      formData.append("departmentId", form.departmentId);
      formData.append("id", productId);
      axios
        .put("http://localhost:8081/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("data update");
          window.location.reload();
          ressetForm();
          getAllProducts();

        });
    } catch (error) {
      alert("Unable to submit data !!");
    }
  }
  function ressetForm() {
    setForm({ name: "", description: "", qty: 1, price: 0, images: null });
  }
  return (
    <div>
      <Navbar />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {productId ? "Edit Product" : "New Product"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4">Department Name</label>
              <div className="col-lg-8">
                <input
                  value={queryParam.get("name")}
                  type="text"
                  disabled
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  onChange={changeHandler}
                  value={form.name}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Description</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  onChange={changeHandler}
                  value={form.description}
                />
                <p className="text-danger">{formError.description}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Qty</label>
              <div className="col-lg-8">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Qty"
                  name="qty"
                  onChange={changeHandler}
                  value={form.qty}
                />
                <p className="text-danger">{formError.qty}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Price</label>
              <div className="col-lg-8">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  onChange={changeHandler}
                  value={form.price}
                />
                <p className="text-danger">{formError.price}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Image</label>
              <div className="col-lg-8">
                <input
                  onChange={(e) => {
                    let files = e.target.files;
                    setForm({ ...form, images: files });
                  }}
                  type="file"
                  className="form-control"
                  multiple name="images"
                />
                <p className="text-danger">{formError.images}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            {productId ? (
              <button
                onClick={() => {
                  onProductSubmit();
                }}
                className="btn btn-success"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => {
                  onProductSubmit();
                }}
                className="btn btn-success"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container border p-2 m-2" >
        <table className="table table-bordered table-stripped table-active">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
