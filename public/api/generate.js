export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const params = req.body;
  const prompt = `Erstelle einen vollständigen SCP-Bericht mit folgenden Parametern:\n${JSON.stringify(params, null, 2)}`;

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 7814e89ea0eb49c7872d8cc16e5dd545',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const result = await response.json();
  res.status(200).json({
    title: 'SCP-' + Math.floor(Math.random() * 8999 + 1000),
    description: result.choices[0].message.content
  });
}
