const express = require("express");
const { protect, fetchChatsProtect } = require("../middlewares/authMiddlewares");
const router = express.Router();
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup,searchUsersByRegNo } = require("../Controllers/chatController");

router.route("/search").get(protect,searchUsersByRegNo);
router.route("/").post(protect,accessChat);
router.route("/").get(fetchChatsProtect,fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);
//router.route("/clearChat/:chatId").delete(protect, clearChat);

module.exports = router; 