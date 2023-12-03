import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Products,
  ProductDetail,
  News,
  Services,
  FAQs,
  FinalRegister,
  ResetPassword,
} from "./pages/public";
import {
  AdminLayout,
  ManageOrder,
  ManageProducts,
  ManageUser,
  CreateProducts,
  Dashboard,
} from "./pages/admin";
import { UserLayout, Personal } from "./pages/user";
import path from "./utils/path";
import { getCategories } from "./app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "./components";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector(
    (state) => state.appReducer
  );
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route
            path={path.PRODUCT_DETAIL__CATEGORY__PID__TITLE}
            element={<ProductDetail />}
          />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />

          <Route path={path.NEWS} element={<News />} />
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
        </Route>

        {/* User */}
        <Route path={path.USER} element={<UserLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
      </Routes>
      <ToastContainer />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
