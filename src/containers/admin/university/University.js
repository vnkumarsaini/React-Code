import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
function University() {
  const [form, setForm] = useState({ name: "", image: null });
  const [formError, setFormError] = useState({ name: "", image: null });
  const [universities, setUniversities] = useState(null);
  const [universityId, setuniversityId] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if(localStorage.getItem("id")==null || localStorage.getItem("role")=="user")
    {
      alert("you are not Login");
      navigate(ROUTES.login.name);
    }
    getAllUniversities();
    // console.log(universities);
  }, []);

  function getAllUniversities() {
    axios.get("http://localhost:8081/university").then((d) => {
      setUniversities(d.data.univData);
    });
  }

  function saveUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      axios
        .post("http://localhost:8081/university", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("data saved");
          resetForm();
          getAllUniversities();
        });
    } catch (error) {
      alert("Fail to submit data !!");
    }
  }
  function updateUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("id", universityId);
      axios
        .put("http://localhost:8081/university", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("data updated");
          resetForm();
          getAllUniversities();
        });
    } catch (error) {
      alert("Fail to submit data !!");
    }
  }
  function onUniversitySubmit() {
    let errors = false;
    let error = { name: "", image: null };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "pl enter name !!!" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "pl select image !!!" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      {
        universityId ? updateUniversity() : saveUniversity();
      }
    }
  }
  function resetForm() {
    setForm({ name: "", image: null });
  }
  function renderUniversities() {
    return universities?.map((item) => {
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
                  ROUTES.departmentAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name
                );
              }}
              className="btn btn-primary"
            >
              Add Department
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                setuniversityId(item._id);
                setForm({ ...form, name: item.name });
              }}
              className="btn btn-success"
            >
              Edit
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                deleteUniversity(item._id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </th>
        </tr>
      );
    });
  }

  function deleteUniversity(id) {
    let ans = window.confirm("Want to delete data ?");
    if (!ans) return;
    axios
      .delete("http://localhost:8081/university", { data: { id: id } })
      .then((d) => {
        getAllUniversities();
      })
      .catch((e) => {
        alert("unable to delete data");
      });
  }

  return (
    <div>
      <Navbar />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {universityId ? "Edit University" : "New University"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label for="txtname" className="col-lg-4">
                University Name
              </label>
              <div className="col-lg-8">
                <input
                  id="txtname"
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  onChange={changeHandler}
                  value={form.name}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label for="txtimage" className="col-lg-4">
                University Image
              </label>
              <div className="col-lg-8">
                <input
                  id="txtimage"
                  type="file"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                  className="form-control"
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            {universityId ? (
              <button
                onClick={() => onUniversitySubmit()}
                className="btn btn-success"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => onUniversitySubmit()}
                className="btn btn-success"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container border m-2 p-2">
        <table className="table table-bordered table-stripped table-active">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderUniversities()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default University;
