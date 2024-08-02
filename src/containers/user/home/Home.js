import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";

function Home() {
  const [universities, setUniversities] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUnivetsities();
    // console.log(universities);
  }, []);

  function getAllUnivetsities() {
    axios.get("http://localhost:8081/university").then((d) => {
      setUniversities(d.data.univData);
    });
  }
  function rendrUniversities() {
    return universities?.map((item) => {
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
                  navigate(ROUTES.department.name + "?id=" + item._id);
                }}
                class="btn btn-primary"
              >
                View Department
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
      <div className="row">{rendrUniversities()}</div>
    </div>
  );
}

export default Home;
