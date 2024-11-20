const Groq = require('groq-sdk');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');
require('dotenv').config();
const fileSearchService = require('./fileSearchService');

class GroqService {
  constructor() {
    if (!GroqService.instance) {
      this.client = new Groq({
        apiKey: process.env.GROQ_API_KEY 
      });
      this.conversationHistory = [];
      this.maxHistoryLength = 1000;
      this.fileStructure = null;
      GroqService.instance = this;
    }
    return GroqService.instance;
  }

  setFileStructure(structure) {
    console.log('Setting file structure in GroqService');
    console.log('Structure root:', structure.name);
    console.log('Number of children:', structure.children?.length);
    this.fileStructure = structure;
    fileSearchService.setFileStructure(structure);
  }

  findFileInTree(tree, query) {
    if (!tree || !tree.children) return null;
    
    for (const child of tree.children) {
      if (child.type === 'file' && child.name.toLowerCase().includes(query.toLowerCase())) {
        return child;
      } else if (child.type === 'folder') {
        const found = this.findFileInTree(child, query);
        if (found) return found;
      }
    }
    return null;
  }

  addToHistory(message) {
    this.conversationHistory.push(message);
    
    // Remove oldest messages if history exceeds maximum length
    if (this.conversationHistory.length > this.maxHistoryLength) {
      const itemsToRemove = this.conversationHistory.length - this.maxHistoryLength;
      this.conversationHistory.splice(0, itemsToRemove);
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  async generateResponse(message) {
    try {
      console.log('Generating response for:', message);
      
      const isStudyMaterialQuery = message.toLowerCase().match(
        /(material|notes|pdf|study|lecture|book|subject|course|semester|branch)/
      );

      // For study material queries, return only file list
      if (isStudyMaterialQuery && this.fileStructure) {
        const filters = {
          branch: message.match(/(?:CSE|IT|ECE|EE)/i)?.[0],
          semester: message.match(/(?:semester|sem)[\s-]*(\d+)/i)?.[1] || 
                   message.match(/(\d+)(?:st|nd|rd|th)?\s+(?:semester|sem)/i)?.[1],
          subject: message.match(/(?:mathematics|physics|chemistry|programming|computer)/i)?.[0]
        };

        console.log('Extracted filters:', filters);
        const results = fileSearchService.searchFiles(message, filters);
        
        if (results.length > 0) {
          return {
            content: fileSearchService.formatSearchResults(results),
            role: 'assistant'
          };
        }
        return {
          content: "I couldn't find any matching study materials in our database.",
          role: 'assistant'
        };
      }

      // For non-material queries, use normal AI response
      const systemPrompt = `You are Sehpaathi, an AI study assistant at MITS Gwalior, developed by a team of developers at MITS.

      - Structure responses with clear headings using # and ## for main points
      - Use **bold** for key concepts and *italic* for emphasis
      - Include relevant emojis to make explanations engaging
      - Format code examples with proper syntax highlighting using \`\`\`language
      - Use bullet points and numbered lists for step-by-step explanations
      - Add blockquotes for important notes or definitions
      - Keep explanations clear and concise with student-friendly language
      - Provide relatable examples from engineering contexts
      - End responses with encouraging messages or next steps
      
      Maintain a friendly, supportive tone while delivering accurate technical information.`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...this.conversationHistory,
        { role: 'user', content: message }
      ];

      const completion = await this.client.chat.completions.create({
        messages: messages,
        model: 'mixtral-8x7b-32768',
        temperature: 0.3,
        max_tokens: 1024
      });

      const responseMessage = completion.choices[0].message;
      this.addToHistory({ role: 'user', content: message });
      this.addToHistory({ role: 'assistant', content: responseMessage.content });

      return responseMessage;

    } catch (error) {
      console.error('Error in generateResponse:', error);
      logger.error('Groq API error:', error.message);
      if (error.response) {
        logger.error('Groq API response data:', error.response.data);
      }
      throw new AppError('Failed to generate response due to an API error', 503);
    }
  }
}

module.exports = new GroqService();