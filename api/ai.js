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

Conduct a full speaking exam.

Rules:
- Speak only in English
- Be strict and formal
- Do not accept short answers
- If the answer is under 10 words, interrupt and ask for more detail
- Ask follow-up questions
- Change topics like a real examiner

Exam structure:
Phase 1: Personal questions
Phase 2: Discussion
Phase 3: Situational task

After each answer evaluate:

Grammar: X/5
Vocabulary: X/5
Fluency: X/5
Pronunciation: X/5
Estimated SLP: X

At the end provide a FINAL REPORT with:
- Average Grammar
- Average Vocabulary
- Average Fluency
- Average Pronunciation
- Final Estimated SLP
- Main weaknesses
- Recommendations
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
