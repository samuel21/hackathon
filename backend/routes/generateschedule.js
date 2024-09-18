const { AzureOpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
  const apiKey = process.env["AZURE_OPENAI_API_KEY"];
  const apiVersion = "2023-03-15-preview";
  const deployment = "gpt-35-turbo"; // This must match your deployment name

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

  const result = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are an AI assistant that only responds with json output and helps manage daily and weekly schedules. Ensure work, personal tasks, health, and family time are balanced. Prioritize tasks and include breaks. Respond only in minified JSON with date, start time, end time, task name, and priority." },
      { role: "user", content: "Male, 28, software engineer at Microsoft in Nagpur, India. Single, lives with family. Priorities: health, family, guitar. Work hours: 10am-7pm, Mon-Fri. Generate a week's schedule to balance priorities." },    ],
    max_tokens: 4000,
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null
  });

  for (const choice of result.choices) {
    console.log(choice.message.content);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };