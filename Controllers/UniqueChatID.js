const router =require('express').Router()
const { v4: uuidv4 } = require('uuid');

router.get('/chat_id',async (req, res) => {
    try{
        const chatId = uuidv4();
        return res.status(200).json({ chat_id: chatId,message:"got the chat id",isChat_id:true });
    }catch(error){
        return res.status(500).json({message:error.message,isChat_id:false})
    }
});

module.exports=router
