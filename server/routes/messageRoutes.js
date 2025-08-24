const express = require('express');
//const { protect } = require("../middlewares/authMiddlewares");
const { protect,localVariables } = require("../middlewares/authMiddlewares");
const
 {
       sendMessage,
       allMessages,
       deleteMessage,
    //    addReaction,
    //    getMessageWithReactions
    // likePost,
    // dislikePost,
    // heart,
    // disheart
    }= require("C:\Users\hp\SMVP\server\controllers\messageController.js");
const router = express.Router();
router.route('/messages').post(protect,sendMessage);

router.route('/:chatId').get(protect,allMessages);
router.route('/deleteMessage/:id').delete(protect, deleteMessage);
//router.route('/reaction').post(protect,addReaction);
//router.route('/messageWithReactions/:id').get(protect, getMessageWithReactions);
// router.route('/like-post').put(protect,likePost);
// router.route('/dislike-post').put(protect,dislikePost);
// router.route('/heart-post').put(protect,heart);
// router.route("/unheart-post").put(protect,disheart)



module.exports=router;