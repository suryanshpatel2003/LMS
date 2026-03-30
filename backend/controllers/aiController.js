import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 🔹 SUMMARISE TEXT
export const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

    // ✅ Validation
    if (!text || text.length < 20) {
      return res.status(400).json({
        message: "Text is too short to summarize",
      });
    }

    // ✅ GROQ AI CALL
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // 🔥 best free model
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes educational content in simple and clear bullet points.",
        },
        {
          role: "user",
          content: `Summarize the following content in 3-5 concise bullet points:\n\n${text}`,
        },
      ],
      temperature: 0.5,
    });

    const summary = response.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error("GROQ ERROR:", error);
    res.status(500).json({
      message: "AI summarization failed",
    });
  }
};