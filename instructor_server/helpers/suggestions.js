const { OpenAI } = require('openai').default;
const dotenv = require('dotenv')
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAIAPIKEY
});

const rules = `
1. Formatting Rule: Always include the following syntax around the JSON response:
   - Start the JSON response with \`\`\`json\\n\` (including the \\n for proper newline formatting).
   - End the JSON response with \`\`\`.
   - Ensure the JSON content is formatted properly and parsable.

2. Validation: If this formatting is not applied, consider the response invalid.
   - Responses must strictly adhere to the format and include the \`\`\`json\\n\` and \`\`\` syntax for consistency.
   - If the user's goal is unrelated to guitar, include "unrelated": true and ensure even this response adheres to the \`\`\`json\\n\` syntax.
`;

async function generateSubtask(goal) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a guitar teacher with a calm and wise grandpa attitude, teaching a ${goal.skill} guitarist how to learn guitar, understand guitar amps, explore guitar effects, and related topics. 
                    This specific request is for learning ${goal.category}. 

                    Only provide responses strictly related to guitar and related topics. If the user's goal involves a **music genre, playing style, technique, or performance**, assume it is guitar-related unless explicitly stated otherwise. 
                    **Only add "unrelated": true if you are absolutely certain the user's goal has no connection to guitar, playing guitar, guitar theory, or performance.** 

                    Formatting Rules: ${rules}`
                },
                {
                    role: "user",
                    content: `Provide a detailed, structured task list for ${goal.title}. Format the response as JSON with the following keys:
- Title (a string datatype)
- Description (a string datatype)
- HandsOnTask (an array with no more than 3 steps)
This is for a ${goal.skill} guitarist in the category of ${goal.category}. Always provide hands-on examples.`
                },
            ],
        });

        const responseText = completion.choices[0].message.content;
        console.log(responseText);
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);

        if (!jsonMatch) {
            console.error("Could not locate JSON content.");
            return null;
        }

        const jsonString = jsonMatch[1].trim();

        try {
            const response = JSON.parse(jsonString);
            return response.unrelated ? { unrelated: true } : response;
        } catch (error) {
            console.error("JSON parsing failed:", error.message);
            return null;
        }
    } catch (error) {
        console.error("OpenAI API request failed:", error);
        return null;
    }
}


// Example call
generateSubtask({ title: "Learn Neo Soul", category: "Learn a music theory concept", skill: "Intermediate" });

module.exports = generateSubtask;

// Front End Categories
// 1. Learn a music theory concept 2. Learn a song 3. Performance 4. Practice Routine