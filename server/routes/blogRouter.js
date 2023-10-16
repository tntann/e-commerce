const router = require("express").Router();
const ctrls = require("../controllers/blogControllers");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", ctrls.getBlogs);
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);

router.get("/one/:bid", ctrls.getBlog);
router.put("/like/:bid", [verifyAccessToken], ctrls.likeBlog);
router.put("/dislike/:bid", [verifyAccessToken], ctrls.dislikeBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
