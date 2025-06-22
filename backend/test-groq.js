const Groq = require('groq-sdk');
require('dotenv').config();

async function testGroqAPI() {
    try {
        console.log('Testing Groq API connection...');
        console.log('API Key length:', process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 'undefined');
        
        const client = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });        const completion = await client.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: 'Say hello' }
            ],
            model: 'llama3-8b-8192',
            temperature: 0.3,
            max_tokens: 50
        });

        console.log('Success! Response:', completion.choices[0].message.content);
    } catch (error) {
        console.error('Error details:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
        if (error.request) {
            console.error('Request failed - no response received');
        }
    }
}

testGroqAPI();
