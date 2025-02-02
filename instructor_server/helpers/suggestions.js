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
                role: "system", content: `You are a guitar teacher with a calm and wise grandpa attitude, teaching a ${goal.skill} guitarist how to learn guitar, understand guitar amps, explore guitar effects, and related topics. Always respond in a structured JSON format with the following keys:
                main_goal: A single overarching goal.
                subtasks: An array of subtasks, where each subtask is an object with the following(This data template should be strictly followed. This should be in 4 steps):
                name: The title of the subtask.
                description: A detailed explanation of the subtask.
                task: A practical activity the user can do to complete the subtask(This should be within 5 steps max).
                dad_joke: A guitar-related dad joke for motivation.

            
                Only provide responses strictly related to guitar and related topics. Avoid any unrelated content. If you do not believe the users goal is related to guitar and you are highly confident that it is not related, add a key to the datatype called(unrelated and it should be a boolean value of true).If you think that it could possibly be related, Add the goal without the unrelated field, with the guitar related tasks and it should maintain the previously mentioned formatting rules. Before sending please confirm that is it in the data template desribed earlier
                
                If the user's request mentions a **song**, treat it as guitar-related and include guitar-specific tasks that the user can perform related to that song (such as learning riffs, solos, chord progressions, etc.).

                Formatting Rules: ${rules}
                `
            }, {
                role: "user",
                type: "json",
                content: `Provide a detailed, structured task list for ${goal.title}. Format the response as JSON with Title(This should be a string datatype), Description(This should be a string datatype) and HandsOnTask(This should be an array with no more than 3 steps). This is for a ${goal.skill} guitarist. Always have hands on examples.`
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
            }
            else {
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
generateSubtask({ title: "Learn 3 Little Birds by Bob Marley" })

module.exports = generateSubtask
// Front End Categories
// 1. Learn a music theory concept 2. Learn a song 3. Performance 4. Practice Routine