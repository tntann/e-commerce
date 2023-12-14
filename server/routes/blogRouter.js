const router = require("express").Router();
const ctrls = require("../controllers/blogControllers");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.get("/", ctrls.getBlogs);
router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.createNewBlog
);
router.get("/one/:bid", ctrls.getBlog);
router.put("/likes/:bid", [verifyAccessToken], ctrls.likeBlog);

router.put("/dislike/:bid", [verifyAccessToken], ctrls.dislikeBlog);
router.post(
  "/admin/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.updateBlog
);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
