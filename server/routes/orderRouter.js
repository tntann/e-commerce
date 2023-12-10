const router = require("express").Router();
const ctrls = require("../controllers/orderControllers");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken], ctrls.createOrder);
router.put("/status/:oid", [verifyAccessToken, isAdmin], ctrls.updateStatus);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getOrders);
router.get("/", [verifyAccessToken], ctrls.getUserOrder);

module.exports = router;
