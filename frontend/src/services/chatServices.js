import { chatMethods } from '../api/methods';

export const sendMessage = async (message) => {
  try {
    const response = await chatMethods.sendMessage(message);
    if (response.data.message) {
      return response.data.message.text;
    } else {
      throw new Error('No message received from AI');
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};