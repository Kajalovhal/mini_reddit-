const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentController = require("../controllers/commentController");

router.post("/", auth, commentController.createComment);
router.get("/:commentId", commentController.getComment);
router.put("/:commentId", auth, commentController.updateComment);
router.delete("/:commentId", auth, commentController.deleteComment);

module.exports = router;
