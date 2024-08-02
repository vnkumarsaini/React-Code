import About from "../containers/about/About";
import Department from "../containers/admin/department/Department";
import Product from "../containers/admin/product/Product";
import University from "../containers/admin/university/University";
import Contact from "../containers/contact/Contact";
import Login from "../containers/login/Login";
import Register from "../containers/register/Register";
import UserDepartment from "../containers/user/department/UserDepartment";
import Home from "../containers/user/home/Home";
import UserProduct from "../containers/user/product/UserProduct";
import ProductDetails from "../containers/user/productDetails/ProductDetails";

const ROUTES = {
  about: {
    name: "/about",
    component: <About />,
  },
  contact: {
    name: "/contact",
    component: <Contact />,
  },
  login: {
    name: "/login",
    component: <Login />,
  },
  register: {
    name: "/register",
    component: <Register />,
  },
  home: {
    name: "/",
    component: <Home />,
  },
  departmentAdmin: {
    name: "/departmentAdmin",
    component: <Department />,
  },
  universityAdmin: {
    name: "/universityAdmin",
    component: <University />,
  },
  productAdmin: {
    name: "/productAdmin",
    component: <Product />,
  },
  department: {
    name: "/department",
    component: <UserDepartment />,
  },
  product: {
    name: "/product",
    component: <UserProduct />,
  },
  productDetails: {
    name: "/productDetails",
    component: <ProductDetails />,
  },
};

export default ROUTES;
