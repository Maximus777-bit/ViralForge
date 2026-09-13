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
        model: 'nvidia/nemotron-3.5-lightning:free',
        messages: [
          {
            role: 'system',
            content: `You are a viral content expert for ${platform}. Always respond using exactly these four labeled lines, each on its own line, with no extra commentary before or after:\nHOOK: ...\nBODY: ...\nCTA: ...\nVIRAL_SCORE: <a number 0-100>`
          },
          {
            role: 'user',
            content: `Create a viral ${format} script about: "${topic}".`
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

    const content = data.choices[0].message.content || '';

    // Robust parsing: tolerant of single/double newlines, extra spacing, case variations.
    const extract = (label, nextLabels) => {
      const nextPattern = nextLabels.length
        ? `(?:\\n\\s*(?:${nextLabels.join('|')}):|$)`
        : '$';
      const re = new RegExp(`${label}:\\s*([\\s\\S]*?)${nextPattern}`, 'i');
      return content.match(re)?.[1]?.trim() || '';
    };

    const hook = extract('HOOK', ['BODY', 'CTA', 'VIRAL_SCORE']);
    const body = extract('BODY', ['CTA', 'VIRAL_SCORE']);
    const cta = extract('CTA', ['VIRAL_SCORE']);
    const scoreMatch = content.match(/VIRAL_SCORE:\s*(\d+)/i);
    const viralScore = scoreMatch ? parseInt(scoreMatch[1]) : 75;

    // If parsing still failed entirely (model ignored the format), fall back to raw content
    // so the user at least sees something instead of empty boxes.
    if (!hook && !body && !cta) {
      console.error('Could not parse labeled sections, raw content:', content);
      return res.status(200).json({
        hook: '',
        body: content.trim(),
        cta: '',
        viralScore,
        warning: 'AI response was not in the expected format; showing raw output in Body.',
      });
    }

    res.status(200).json({ hook, body, cta, viralScore });

  } catch (error) {
    console.error('generate-script fatal error:', error);
    res.status(500).json({ error: 'Failed to generate', details: String(error) });
  }
}
