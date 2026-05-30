import { askAI } from "../services/aiService.js";
import Chat from "../models/Chat.js";
export const getAIResponse = async (req, res) => {

  try {
    const { message } = req.body;


    const response = await askAI(message);
 await Chat.create({
      userId: req.user.id,
      message,
      response
    });

    res.json({ response });

  } catch (err) {
 
  if (err.status === 429) {
    return res.status(429).json({
      error: "Too many requests. Please wait a moment and try again."
    });
  }

  res.status(500).json({
    error: err.message
  });
}
};
export const getChatHistory =
async (req, res) => {

  const chats =
    await Chat.find({

      userId: req.user.id

    }).sort({
      createdAt: -1
    });

  res.json(chats);
};