export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ result: "Method not allowed" });
  }

  try {
    const { input, mode } = req.body;

    if (!input || input.trim() === "") {
      return res.status(400).json({
        result:
          "It seems there's been an error. Could you please provide the text you'd like me to rewrite? I'm here to help!",
      });
    }

    const prompts = {
      gigi: `Rewrite this in a sharp, sassy, clever tone. Think Gigi — confident, slightly flirty, a bit ironic. No clichés, lots of attitude. Don't use "honey", "darling" "classic move"\n\n"${input}"`,

      linkedin: `Rephrase this like a professional but relatable LinkedIn post. Make it clear, concise, slightly humble but still impressive. Keep it real:\n\n"${input}"`,

      school: `Rewrite this in a formal, academic tone. Structure it clearly, avoid contractions, and make it sound like it belongs in a university essay:\n\n"${input}"`,

      corporate: `Rewrite this as a polished corporate email. Be professional and polite, but get to the point clearly. No fluff:\n\n"${input}"`,

      human: `Rewrite this so it sounds like a real human wrote it. Natural, a bit imperfect, honest, like a message you’d send to a friend:\n\n"${input}"`,
    };

    const selectedPrompt = prompts[mode] || prompts["human"];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a rewriting assistant." },
          { role: "user", content: selectedPrompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "Something went wrong.";

    return res.status(200).json({ result });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({
      result: "Oops! Something went wrong on the server. Try again in a sec 💔",
    });
  }
}