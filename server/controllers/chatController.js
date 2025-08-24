const User = require('../Models/userModel');
const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel")

// exports.createTeam = async (req, res) => {
//     try {
//         const { createdBy, members } = req.body;
        
//         // Check if the user creating the team is a mentor with role 'admin'
//         const mentor = await User.findById(createdBy);
//         if (!mentor || mentor.role !== 'admin') {
//             return res.status(403).json({ status: 'fail', message: 'Only admin mentors can create teams' });
//         }

//         const team = await Team.create({ createdBy, members });
//         res.status(201).json({ status: 'success', data: { team } });
//     } catch (err) {
//         res.status(400).json({ status: 'fail', message: err.message });
//     }
// };

// exports.searchUser = async (req, res) => {
//     try {
//       const keyword = req.query.search 
//         ? {
//             $or: [
//                 { username: { $regex: req.query.search, $options: "i"} },
//                 { email: {$regex: req.query.search, $options: "i"} },
//             ],
//           }
//         : {};
  
//       const users = await User.find(keyword).select('-password'); // Assuming 'password' is a sensitive field
//       res.status(200).json(users);
//     } catch (err) {
//       console.error('Error searching users:', err);
//       res.status(400).json({ status: 'fail', message: err.message });
//     }
//   };
  

// 
//  const clearChat = asyncHandler(async (req, res) => {
//    const { chatId } = req.params;
//    console.log(chatId);

//   try {

//     // Delete all messages associated with the chat
//     await Message.deleteMany({ chat: chatId });

//     // Optionally, update the chat document to reflect that it's now empty

//     res.status(200).json({ message: 'Chat cleared successfully' });   } catch (error) {
//     res.status(500).json({ message: 'Failed to clear chat', error: error.message });
//   }
//  });

//accessChat api handler(one on one chat between user logged in and userid provided)
const accessChat = asyncHandler(async (req,res)=>{
    const {userId} = req.body;
    if(!userId){
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    //if chat exits with user
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id} } },
            { users: { $elemMatch: { $eq: userId} } },
        ],
    }).populate("users", "-password").populate("latestMessage");

      isChat = await User.populate(isChat,{
        path: 'latestMessage.sender',
        select: "username profile email ",
      });

      if(isChat.length > 0){
        res.send(isChat[0]);
      }else {
        //creating a new chat
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id,userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users", 
                "-password"
            );
            res.status(200).send(FullChat);
        } catch (error){
            res.status(400);
            throw new Error(error.message);
        }
      }
});

//fetchChats api handler(fetch chat for that particular user is part of )
const fetchChats = asyncHandler(async (req,res)=>{
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id} } }).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt: -1}).then(async (results)=> {
            results = await User.populate(results,{
                path: "latestMessage.sender",
                select: "username profile email",
            });
            res.status(200).send(results);
        });
    }catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//groupchat api handler

const  createGroupChat = asyncHandler(async (req,res)=> {
   if(!req.body.users || !req.body.name){
    return res.status(400).send({message: "please Fill all the fields"});
   }
   let users;
    try {
        users = JSON.parse(req.body.users);
    } catch (error) {
        return res.status(400).send({ message: "Invalid JSON format for 'users' field" });
    }
   if(users.length<2){
    return res.status(400).send("More Than 2 users are required to form a group");
   }
    const isAdminMentor = await User.findOne({ _id: req.user,role: 'admin'});
    if(!isAdminMentor){
        return res.status(403).json({success: false,message: 'Only mentors can create group chats'})
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName : req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,

        });
        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password");
        res.status(200).json(fullGroupChat);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//rename api handler
const renameGroup = asyncHandler(async (req,res)=> {
    const {chatId,chatName} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
           chatName: chatName,
        },
        {
            new: true,
        }
    )
    .populate("users" , "-password")
    .populate("groupAdmin", "-password");

    if(!updatedChat){
        res.status(404);
        throw new Error("Chat Not Found");
    }else {
        res.json(updatedChat);
    }
});

//api for adding to group
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  });
  
  // @desc    Add user to Group / Leave
  // @route   PUT /api/chat/groupadd
  // @access  Protected
 const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });
  //user search api/user/register?search=aradhya

  const searchUsersByRegNo = asyncHandler(async(req, res) => {
    try {
      const regNo = req.query.regNo;
      if (!regNo) {
        return res.status(400).json({ success: false, message: 'Registration number is required' });
      }
      const users = await User.find({ regno: { $regex: regNo, $options: 'i' }, role: 'user' });
      console.log(users);

  
      if (!users || users.length === 0) {
        return res.status(404).json({ success: false, message: 'No users found' });
      }
  
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  


module.exports = {accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup,searchUsersByRegNo};
   