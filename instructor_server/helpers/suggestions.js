const {OpenAI} = require('openai').default;
const dotenv = require('dotenv')
const result = dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAIAPIKEY
})
async function generateSubtask(goal){
        const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: `You are a guitar teacher with a calm and wise grandpa attitude, teaching a ${goal.skill} guitarist how to learn guitar, understand guitar amps, explore guitar effects, and related topics. Always respond in a structured JSON format with the following keys:
                main_goal: A single overarching goal.
                subtasks: An array of subtasks, where each subtask is an object with (This data template should be strictly followed):
                name: The title of the subtask.
                description: A detailed explanation of the subtask.
                task: A practical activity the user can do to complete the subtask(This should be in 3 steps max).
                dad_joke: A guitar-related dad joke for motivation.
            
                Only provide responses strictly related to guitar and related topics. Avoid any unrelated content. If you do not believe the users goal is related to guitar add a key to the datatype called(unrelated and it should be a boolean value of true). Before sending please confirm that is it in the data template desribed earlier`
            },{
                role: "user",
                type: "json",
                content: `Provide a detailed, structured task list for ${goal.title}. Format the response as JSON with Title(This should be a string datatype), Description(This should be a string datatype) and HandsOnTask(This should be an array with no more than 3 steps). This is for a ${goal.skill} guitarist. Always have hands on examples.`
            },
        ],
    })
    console.log(completion.choices[0].message)
    const response = JSON.parse(completion.choices[0].message.content.slice(7, -3)) || JSON.parse(completion.choices[0].message.content.slice())
    if(response.unrelated){
        return({"unrelated":true})  
    }
    else{
        return(response.subtasks)
    }

}

module.exports = generateSubtask
// Front End Categories
// 1. Learn a music theory concept 2. Learn a song 3. Performance 4. Practice Routine