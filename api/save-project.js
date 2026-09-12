import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { title, platform, format, script, viralScore, imageUrl } = req.body;

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ title, platform, format, script, viral_score: viralScore, image_url: imageUrl }])
      .select();

    if (error) throw error;
    res.status(200).json({ project: data[0] });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}