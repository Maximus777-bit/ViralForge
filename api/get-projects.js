import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const projects = (data || []).map((row) => ({
      id: row.id,
      name: row.title || 'Untitled',
      platform: row.platform || 'tiktok',
      format: row.format || 'video',
      score: row.viral_score ?? 0,
      status: 'draft',
      date: row.created_at ? row.created_at.slice(0, 10) : '',
      imageUrl: row.image_url || '',
      script: row.script || '',
    }));

    res.status(200).json({ projects });

  } catch (error) {
    console.error('get-projects error:', error);
    res.status(500).json({ error: 'Failed to load projects', details: String(error) });
  }
}
