// openai v2
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { system, user } = req.body;
  if (!system || !user) {
    return res.status(400).json({ error: 'system, user 필드가 필요해요' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 4000,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: JSON.stringify(data) });
    }

    const raw = data.choices?.[0]?.message?.content || '';

    if (!raw) {
      return res.status(500).json({ error: '응답이 비어있어요: ' + JSON.stringify(data) });
    }

    const clean = raw.replace(/```json|```/g, '').trim();

    try {
      const ideas = JSON.parse(clean);
      return res.status(200).json({ ideas });
    } catch (parseErr) {
      return res.status(500).json({ error: '파싱 실패: ' + clean.substring(0, 200) });
    }

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
