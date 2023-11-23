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
    <div className=" relative">
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
        </Route>
      </Routes>
      <ToastContainer />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
