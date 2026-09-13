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
        model: 'nex-agi/nex-n2.5-mini:free',
        reasoning_effort: 'none',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `You are a viral content expert for ${platform}. Respond with ONLY a raw JSON object (no markdown fences, no commentary) matching exactly this shape: {"hook": string, "body": string, "cta": string, "viralScore": number between 0 and 100}.`
          },
          {
            role: 'user',
            content: `Create a viral ${format} script about: "${topic}". Return only the JSON object.`
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!response.ok || !data.choices || !data.choices[0]) {
      console.error('OpenRouter error response:', JSON.stringify(data));
      return res.status(500).json({
        error: 'OpenRouter API error',
        status: response.status,
        details: data,
      });
    }

    let content = data.choices[0].message.content || '';
    // Strip markdown code fences if the model added them despite instructions.
    content = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseErr) {
      console.error('Could not parse JSON from model, raw content:', content);
      return res.status(200).json({
        hook: '',
        body: content || 'The AI returned an unexpected response. Please try again.',
        cta: '',
        viralScore: 75,
        warning: 'AI response was not valid JSON; showing raw output in Body.',
      });
    }

    const hook = String(parsed.hook || '').trim();
    const body = String(parsed.body || '').trim();
    const cta = String(parsed.cta || '').trim();
    const viralScore = Number.isFinite(parsed.viralScore) ? Math.round(parsed.viralScore) : 75;

    res.status(200).json({ hook, body, cta, viralScore });

  } catch (error) {
    console.error('generate-script fatal error:', error);
    res.status(500).json({ error: 'Failed to generate', details: String(error) });
  }
}
