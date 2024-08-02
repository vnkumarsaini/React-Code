import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./Routes";

function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.login.name} element={ROUTES.login.component} />
          <Route
            path={ROUTES.register.name}
            element={ROUTES.register.component}
          />
          <Route path={ROUTES.about.name} element={ROUTES.about.component} />
          <Route
            path={ROUTES.contact.name}
            element={ROUTES.contact.component}
          />
          <Route
            path={ROUTES.departmentAdmin.name}
            element={ROUTES.departmentAdmin.component}
          />
          <Route
            path={ROUTES.universityAdmin.name}
            element={ROUTES.universityAdmin.component}
          />
          <Route
            path={ROUTES.productAdmin.name}
            element={ROUTES.productAdmin.component}
          />
          <Route path={ROUTES.home.name} element={ROUTES.home.component} />
          <Route
            path={ROUTES.department.name}
            element={ROUTES.department.component}
          />
          <Route
            path={ROUTES.product.name}
            element={ROUTES.product.component}
          />
          <Route
            path={ROUTES.productDetails.name}
            element={ROUTES.productDetails.component}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navigation;
