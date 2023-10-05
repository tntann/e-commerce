const useRouter = require("./userRouter");
const { notFound, errHandler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", useRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
