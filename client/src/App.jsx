import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Products,
  ProductDetail,
  DetailBlogs,
  Services,
  FAQs,
  FinalRegister,
  ResetPassword,
  DetailCart,
} from "./pages/public";
import {
  AdminLayout,
  ManageOrder,
  ManageProducts,
  ManageUser,
  CreateProducts,
  Dashboard,
  CreateBlog,
  ManageBlog,
} from "./pages/admin";
import {
  UserLayout,
  Personal,
  Wishlist,
  History,
  // MyCart,
  Checkout,
} from "./pages/user";
import path from "./utils/path";
import { getCategories } from "./app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cart, Modal } from "./components";
import { showCart } from "./app/appSlice";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCart } = useSelector(
    (state) => state.appReducer
  );
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="font-jp">
      {isShowCart && (
        <div
          onClick={() => dispatch(showCart())}
          className="absolute inset-0 bg-overlay z-50 flex justify-end"
        >
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />} />
          <Route
            path={path.PRODUCT_DETAIL__CATEGORY__PID__TITLE}
            element={<ProductDetail />}
          />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />

          <Route path={path.BLOGS__ID__TITLE} element={<DetailBlogs />} />
          <Route path={path.FAQS} element={<FAQs />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>

        {/* Admin */}
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
          <Route path={path.CREATE_BLOG} element={<CreateBlog />} />
          <Route path={path.MANAGE_BLOGS} element={<ManageBlog />} />
        </Route>

        {/* User */}
        <Route path={path.USER} element={<UserLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<DetailCart />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
          <Route path={path.HISTORY} element={<History />} />
        </Route>
      </Routes>
      <ToastContainer />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
