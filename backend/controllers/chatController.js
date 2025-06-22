const chatService = require('../services/chat');
const { AppError } = require('../utils/errors');

const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    
    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Message is required and must be a non-empty string'
      });
    }
    
    if (message.length > 10000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Message is too long. Maximum length is 10,000 characters.'
      });
    }
    
    const response = await chatService.generateResponse(message.trim());
    
    res.status(200).json({
      status: 'success',
      data: {
        message: {
          text: response,
          sender: 'ai'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage };