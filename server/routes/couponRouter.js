const router = require("express").Router();
const ctrls = require("../controllers/couponControllers");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewCoupon);
router.get("/", ctrls.getCoupons);

router.put("/:cpid", [verifyAccessToken, isAdmin], ctrls.updateCoupon);
router.delete("/:cpid", [verifyAccessToken, isAdmin], ctrls.deleteCoupon);

module.exports = router;
