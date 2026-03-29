import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  const body = JSON.parse(req.body);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are a NATO SLP speaking examiner.

Conduct an oral exam.

Rules:
- Speak only in English
- Ask questions
- Force long answers
- Correct mistakes
- Evaluate grammar, vocabulary, fluency and pronunciation
`
      },
      {
        role: "user",
        content: body.message
      }
    ]
  });

  res.status(200).json({
    reply: completion.choices[0].message.content
  });
}
