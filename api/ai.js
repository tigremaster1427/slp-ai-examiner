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
You are a certified NATO SLP oral examiner.

Conduct a speaking exam.

Rules:
- Speak only in English
- Ask questions and require long answers
- Interrupt if the answer is too short
- Correct mistakes

At the end of each answer, provide evaluation in this format:

Grammar: X/5
Vocabulary: X/5
Fluency: X/5
Pronunciation: X/5
Estimated SLP: X

Also explain the main mistakes briefly.
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
