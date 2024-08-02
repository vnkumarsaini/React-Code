import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function UserDepartment() {
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const queryParams = useQuery();

  useEffect(() => {
    getAllDepartments();
  }, []);

  function getAllDepartments() {
    axios
      .get(
        "http://localhost:8081/department?universityId=" + queryParams.get("id")
      )
      .then((d) => {
        setDepartments(d.data.depData);
      });
  }
  function renderDepartments() {
    return departments?.map((item) => {
      return (
        <div className="col-3">
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:8081/" + item.image}
              height="150"
              width="150"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>

              <button
                onClick={() => {
                  navigate(ROUTES.product.name + "?id=" + item._id);
                }}
                class="btn btn-primary"
              >
                View Product
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
      <div className="row">{renderDepartments()}</div>
    </div>
  );
}

export default UserDepartment;
