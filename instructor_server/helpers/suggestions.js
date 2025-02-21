const { OpenAI } = require('openai').default;
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAIAPIKEY
});

const rules = `
1. Formatting Rule: Output a single JSON object without any additional text, markdown, or code fences.
2. The JSON object must exactly follow this format:
{
  "main_goal": "string",
  "subtasks": [  // Array of objects; must have between 3-5 subtasks
    {
      "name": "string",
      "description": "string",
      "task": [ "string", ... ], // Array of tasks (must be at least 3 steps in each task)
      "dad_joke": "string"
    }
  ]
}
3. If the task is unrelated to guitar, output the following JSON object:
{
  "unrelated": true,
  "Message": "This goal is not related to guitar tasks."
}
Ensure that the keys are exactly as specified (case sensitive).
`;

// Fix JSON string by ensuring all keys are wrapped in double quotes
function fixJsonString(str) {
    return str.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
}

async function generateSubtask(goal) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a guitar teacher with a calm, wise, grandpa attitude. Your job is to provide guitar-related tasks strictly in the following JSON format:
${rules}
If the provided goal involves a song (e.g., "3 Little Birds by Bob Marley") or is clearly related to guitar, provide a detailed task list following the above format. If it is unrelated to guitar, output the JSON for unrelated as specified.
Do not include any additional text, markdown formatting, or explanations. Output only the raw JSON object.`
            },
            {
                role: "user",
                content: `Provide a detailed, structured task list for "${goal.title}" for a ${goal.skill} guitarist. Include hands-on examples.`
            }
        ],
    });

    const responseText = completion.choices[0].message.content;
    console.log("Raw AI response:", responseText);

    // Extract JSON from code block if present; otherwise assume the whole response is JSON.
    let jsonString;
    const codeBlockMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
        jsonString = codeBlockMatch[1].trim();
    } else {
        jsonString = responseText.trim();
    }

    console.log("Extracted JSON before fix:", jsonString);
    jsonString = fixJsonString(jsonString);
    console.log("Extracted JSON after fix:", jsonString);

    try {
        const parsed = JSON.parse(jsonString);
        if (parsed.unrelated === true) {
            return parsed;
        }
        if (!parsed.main_goal || !parsed.subtasks) {
            console.error("Parsed JSON does not contain 'main_goal' or 'subtasks'.");
            return { error: "Invalid JSON structure." };
        }
      
        const transformedGoal = {
            name: parsed.main_goal,
            description: parsed.description || "",
            subtasks: parsed.subtasks.map(sub => ({
                name: sub.name,
                description: sub.description || "",
                task: sub.task
            }))
        };

        const validSubtasks = transformedGoal.subtasks.every(sub =>
            sub.name && Array.isArray(sub.task)
        );
        if (!validSubtasks) {
            console.error("One or more subtasks do not have the required fields.");
            return { error: "Invalid subtask structure." };
        }
        return transformedGoal.subtasks;
    } catch (error) {
        console.error("JSON parsing failed:", error.message);
        return { error: "JSON parsing failed" };
    }
}

generateSubtask({ title: "Learn 3 Little Birds by Bob Marley", skill: "intermediate" })
  .then(result => {
      console.log("Final result:", result);
  })
  .catch(err => {
      console.error("Error generating subtask:", err);
  });

module.exports = generateSubtask;
