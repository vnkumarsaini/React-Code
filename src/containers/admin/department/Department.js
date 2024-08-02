import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Department() {
  const navigate = useNavigate();
  const queryParams = useQuery();
  const [departmentId, setdepartmentId] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [form, setForm] = useState({
    name: "",
    image: null,
    universityId: queryParams.get("id"),
  });
  const [formError, setFormError] = useState({
    name: "",
    image: null,
  });
  useEffect(() => {
    if(localStorage.getItem("id")==null)
    {
      alert("you are not Login");
      navigate(ROUTES.login.name);
    }
    getAllDepartments();
    console.log(departments);
  }, []);
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function getAllDepartments() {
    axios
      .get(
        "http://localhost:8081/department?universityId=" + queryParams.get("id")
      )
      .then((d) => {
        setDepartments(d.data.depData);
      });
  }

  function saveDepartment() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", form.universityId);
      axios
        .post("http://localhost:8081/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("data saved");
          resetForm();
          getAllDepartments();
        });
    } catch (error) {
      alert("Unable to submit data !!");
    }
  }
  function updateDepartment() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", form.universityId);
      formData.append("id", departmentId);
      axios
        .put("http://localhost:8081/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("data update");
          resetForm();
          getAllDepartments();
        });
    } catch (error) {
      alert("Unable to submit data !!");
    }
  }
  function onDepartmentSubmit() {
    const errors = false;
    const error = { name: "", image: null };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "pl enter name !!" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "pl select image !!" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      {
        departmentId ? updateDepartment() : saveDepartment();
      }
    }
  }
  function resetForm() {
    setForm({ name: "", image: null });
  }

  function renderDepartments() {
    return departments?.map((item) => {
      return (
        <tr>
          <th>
            <img
              src={"http://localhost:8081/" + item.image}
              height="150"
              width="150"
            />
          </th>
          <th>{item.name}</th>
          <th>
            <button
              onClick={() => {
                navigate(
                  ROUTES.productAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name
                );
              }}
              className="btn btn-info"
            >
              Add Product
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                deleteDepartment(item._id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                setdepartmentId(item._id);
                setForm({ ...form, name: item.name });
              }}
              className="btn btn-success"
            >
              Edit
            </button>
          </th>
        </tr>
      );
    });
  }

  function deleteDepartment(id) {
    let ans = window.confirm("Want to delete data?");
    if (!ans) return;
    axios
      .delete("http://localhost:8081/department", { data: { id: id } })
      .then((d) => {
        alert("data deleted");
        getAllDepartments();
      });
  }
  return (
    <div>
      <Navbar />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {departmentId ? "Edit Department" : "New Department"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4">University Name</label>
              <div className="col-lg-8">
                <input
                  value={queryParams.get("name")}
                  type="text"
                  disabled
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Department Name</label>
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
              <label className="col-lg-4">Department Image</label>
              <div className="col-lg-8">
                <input
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                  type="file"
                  className="form-control"
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            {departmentId ? (
              <button
                onClick={() => {
                  onDepartmentSubmit();
                }}
                className="btn btn-success"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => {
                  onDepartmentSubmit();
                }}
                className="btn btn-success"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container p-2 m-2">
        <table className="table table-bordered table-stripped table-active">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Add Products</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
