export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, platform, format } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://viral-forge-ten.vercel.app',
        'X-Title': 'ViralForge'
      },
      body: JSON.stringify({
        model: 'qwen/qwen-2.5-7b-instruct:free',
        messages: [
          {
            role: 'system',
            content: `You are a viral content expert for ${platform}.`
          },
          {
            role: 'user',
            content: `Create a viral ${format} script about: "${topic}".
Format:
HOOK: [attention-grabbing opening]
BODY: [main content]
CTA: [call to action]
VIRAL_SCORE: [0-100]`
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    const hook = content.match(/HOOK:\s*(.+?)(?=\n\nBODY:)/s)?.[1]?.trim() || '';
    const body = content.match(/BODY:\s*(.+?)(?=\n\nCTA:)/s)?.[1]?.trim() || '';
    const cta = content.match(/CTA:\s*(.+?)(?=\n\nVIRAL_SCORE:)/s)?.[1]?.trim() || '';
    const scoreMatch = content.match(/VIRAL_SCORE:\s*(\d+)/);
    const viralScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    res.status(200).json({ hook, body, cta, viralScore });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate' });
  }
}