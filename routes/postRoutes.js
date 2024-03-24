const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");

router.post("/", auth, postController.createPost);
router.get("/:postId", postController.getPost);
router.put("/:postId", auth, postController.updatePost);
router.delete("/:postId", auth, postController.deletePost);

module.exports = router;
