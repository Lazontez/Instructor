const { OpenAI } = require('openai').default;
const dotenv = require('dotenv')
const result = dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAIAPIKEY
})

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
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a guitar teacher with a calm and wise grandpa attitude, teaching a ${goal.skill} guitarist how to learn guitar, understand guitar amps, explore guitar effects, and related topics. This specific request is for learning ${goal.category}  Always respond in a structured JSON format with the following keys:
  - main_goal: A single overarching goal.
  - subtasks: An array of subtasks, where each subtask is an object with the following properties:
      - name: The title of the subtask.
      - description: A detailed explanation of the subtask.
      - task: A practical activity the user can do to complete the subtask (this should be within 5 steps max).
      - dad_joke: A guitar-related dad joke for motivation.
      
Only provide responses strictly related to guitar and related topics. If the user's goal might not explicitly mention the word "guitar" (for example, genres like Neosoul, Blues, or Jazz that can involve guitar playing), treat it as guitar-related. Only add the key "unrelated": true if you are certain the user's goal is completely outside the realm of guitar and related subjects.

Before sending, please confirm that the response is in the data template described above.

Formatting Rules: ${rules}`
            },
            {
                role: "user",
                type: "json",
                content: `Provide a detailed, structured task list for ${goal.title}. Format the response as JSON with the following keys:
- Title (a string datatype)
- Description (a string datatype)
- HandsOnTask (an array with no more than 3 steps)
This is for a ${goal.skill} guitarist. Always have hands on examples.`
            },
        ],
    })

    const responseText = completion.choices[0].message.content;

    const start = responseText.indexOf('{');
    const end = responseText.lastIndexOf("```");

    if (start !== -1 && end !== -1) {
        const jsonString = responseText.slice(start, end).trim();

        try {
            const response = JSON.parse(jsonString);

            if (response.unrelated) {
                return ({ "unrelated": true })
            } else {
                return (response.subtasks)
            }
        } catch (error) {
            console.error("JSON parsing failed:", error.message);
            return []
        }
    } else {
        console.error("Could not locate JSON content.");
        return
    }
}

generateSubtask({ title: "Learn Neo Soul" })

module.exports = generateSubtask
// Front End Categories
// 1. Learn a music theory concept 2. Learn a song 3. Performance 4. Practice Routine