const Groq = require('groq-sdk');
require('dotenv').config();

async function testModels() {
    const models = [
        'llama3-8b-8192',
        'llama3-70b-8192', 
        'mixtral-8x7b-32768',
        'gemma-7b-it',
        'gemma2-9b-it'
    ];

    const client = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    for (const model of models) {
        try {
            console.log(`\nTesting model: ${model}`);
            const completion = await client.chat.completions.create({
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: 'Hello' }
                ],
                model: model,
                temperature: 0.3,
                max_tokens: 50
            });
            console.log(`✓ ${model} works: ${completion.choices[0].message.content.substring(0, 50)}...`);
        } catch (error) {
            console.log(`✗ ${model} failed: ${error.message.substring(0, 100)}`);
        }
    }
}

testModels();
