const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const productCategoryRouter = require("./productCategoryRouter");
const blogCategoryRouter = require("./blogCategoryRouter");
const brandRouter = require("./brandRouter");
const blogRouter = require("./blogRouter");
const couponRouter = require("./couponRouter");
const orderRouter = require("./orderRouter");
const insertDataRouter = require("./insertDataRouter");

const { notFound, errHandler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodcategory", productCategoryRouter);
  app.use("/api/blogcategory", blogCategoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/insertdata", insertDataRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
