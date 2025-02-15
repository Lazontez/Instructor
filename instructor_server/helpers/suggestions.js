const { OpenAI } = require('openai').default;
const dotenv = require('dotenv');
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
                    content: `You are a guitar teacher with a calm and wise grandpa attitude, teaching a ${goal.skill} guitarist how to learn guitar, understand guitar amps, explore guitar effects, and related topics. Always respond in a structured JSON format with the following keys:
                    
                    main_goal: A single overarching goal.
                    subtasks: An array of subtasks, where each subtask is an object with the following:
                    - name: The title of the subtask.
                    - description: A detailed explanation of the subtask.
                    - task: A practical activity the user can do to complete the subtask (This should be within 5 steps max).
                    - dad_joke: A guitar-related dad joke for motivation.

                    Ensure that the response is wrapped inside triple backticks (\`\`\`json\\n and \`\`\`) and follows proper JSON structure.
                    
                    Formatting Rules: ${rules}

                    Before sending ALWAYS double-check that it is in the correct format.
                    `
                },
                {
                    role: "user",
                    type: "json",
                    content: `Provide a detailed, structured task list for ${goal.title}. Format the response as JSON with:
                    - Title (string)
                    - Description (string)
                    - HandsOnTask (array, max 3 steps). 
                    This is for a ${goal.skill} guitarist. Always have hands-on examples.
                    
                    Before sending ALWAYS double-check that it is in the correct format.`
                },
            ],
        });

        const responseText = completion.choices[0].message.content.trim();

        console.log("🔍 Raw API Response:\n", responseText);

        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
        
        if (!jsonMatch) {
            console.error("❌ Could not locate properly formatted JSON content.");
            return;
        }

        const jsonString = jsonMatch[1].trim();

        try {
            const response = JSON.parse(jsonString);

            if (response.unrelated) {
                return { "unrelated": true };
            } else {
                return response.subtasks;
            }
        } catch (error) {
            console.error("❌ JSON parsing failed:", error.message);
            return [];
        }
    } catch (error) {
        console.error("❌ OpenAI API call failed:", error.message);
        return [];
    }
}

generateSubtask({ title: "Learn 3 Little Birds by Bob Marley", skill: "beginner" })
    .then(result => console.log("🎸 Processed Task List:", result))
    .catch(err => console.error("🚨 Error:", err.message));
