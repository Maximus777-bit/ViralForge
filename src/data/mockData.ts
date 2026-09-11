export const platforms = [
  { id: 'tiktok', name: 'TikTok', color: 'bg-slate-800 text-white' },
  { id: 'instagram', name: 'Instagram', color: 'bg-pink-600 text-white' },
  { id: 'youtube', name: 'YouTube', color: 'bg-red-600 text-white' },
  { id: 'telegram', name: 'Telegram', color: 'bg-blue-500 text-white' },
  { id: 'x', name: 'X', color: 'bg-slate-700 text-white' },
] as const;

export const trendingTags = [
  '#fyp', '#viral', '#trending', '#contentstrategy', '#aicontent',
  '#socialmedia', '#creator', '#engagement', '#growth', '#shorts',
];

export const formats = [
  { id: 'video', name: 'Vertical Video', desc: '9:16 short-form video', icon: 'Video' },
  { id: 'carousel', name: 'Carousel', desc: 'Swipeable multi-slide post', icon: 'GalleryVerticalEnd' },
  { id: 'meme', name: 'Meme', desc: 'Trending meme format', icon: 'Image' },
  { id: 'thread', name: 'Thread', desc: 'Multi-post thread', icon: 'MessageSquare' },
  { id: 'story', name: 'Story', desc: '24h story sequence', icon: 'Circle' },
] as const;

export const projects = [
  { id: 1, name: 'TikTok Trend #1', platform: 'tiktok', score: 87, status: 'published', date: '2026-09-04' },
  { id: 2, name: 'Instagram Carousel', platform: 'instagram', score: 92, status: 'published', date: '2026-09-03' },
  { id: 3, name: 'YouTube Shorts Pack', platform: 'youtube', score: 78, status: 'draft', date: '2026-09-05' },
  { id: 4, name: 'X Thread — AI Tips', platform: 'x', score: 84, status: 'published', date: '2026-09-02' },
  { id: 5, name: 'Telegram Digest', platform: 'telegram', score: 71, status: 'scheduled', date: '2026-09-06' },
  { id: 6, name: 'Meme Drop #42', platform: 'tiktok', score: 95, status: 'published', date: '2026-09-01' },
  { id: 7, name: 'IG Story Series', platform: 'instagram', score: 68, status: 'draft', date: '2026-09-05' },
  { id: 8, name: 'YT Long-form Script', platform: 'youtube', score: 81, status: 'scheduled', date: '2026-09-07' },
];

export const viewsData = [
  { day: 'Mon', views: 12400, engagement: 3200 },
  { day: 'Tue', views: 18900, engagement: 5100 },
  { day: 'Wed', views: 15600, engagement: 4200 },
  { day: 'Thu', views: 24300, engagement: 6800 },
  { day: 'Fri', views: 31200, engagement: 9100 },
  { day: 'Sat', views: 28700, engagement: 8400 },
  { day: 'Sun', views: 22100, engagement: 6200 },
];

export const formatPerformance = [
  { format: 'Video', value: 42000 },
  { format: 'Carousel', value: 31000 },
  { format: 'Meme', value: 28000 },
  { format: 'Thread', value: 19000 },
  { format: 'Story', value: 12000 },
];

export const statCards = [
  { label: 'Avg Engagement', value: '8.4%', change: '+12%', positive: true },
  { label: 'Best Format', value: 'Video', change: '42K views', positive: true },
  { label: 'Follower Growth', value: '+3.2K', change: '+18%', positive: true },
];

export const heatmapData = [
  [20, 35, 50, 80],
  [30, 45, 60, 90],
  [25, 40, 55, 70],
  [15, 30, 65, 85],
  [40, 55, 75, 95],
  [50, 70, 90, 100],
  [35, 50, 60, 75],
];

export const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const heatmapSlots = ['6am', '12pm', '6pm', '10pm'];

export const features = [
  {
    title: 'Infinite Formats',
    desc: 'AI creates any format, not just templates. From vertical video to carousel to meme — all generated on demand.',
    icon: 'Layers',
    span: 'md:col-span-2',
  },
  {
    title: 'Viral Predictor',
    desc: 'Know before you post. Our AI scores your content 0–100 for virality potential.',
    icon: 'TrendingUp',
    span: '',
  },
  {
    title: 'Voice Clone',
    desc: 'Clone any voice for narrations and voiceovers in 30+ languages.',
    icon: 'Mic',
    span: '',
  },
  {
    title: 'Auto-Publish',
    desc: 'Schedule and auto-publish to every platform. Set it once, post forever.',
    icon: 'Calendar',
    span: 'md:col-span-2',
  },
  {
    title: 'Trend Hunter',
    desc: 'Real-time trending topics from every platform, delivered to your dashboard.',
    icon: 'Search',
    span: '',
  },
  {
    title: 'UGC Simulator',
    desc: 'Simulate comments and reactions before you publish. See how your audience will react.',
    icon: 'MessageCircle',
    span: '',
  },
];

export const pricingPlans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    desc: 'For trying out the factory',
    features: [
      '10 generations / month',
      '2 platforms connected',
      'Basic viral scoring',
      'Watermarked exports',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 19, yearly: 15 },
    desc: 'For serious creators',
    features: [
      'Unlimited generations',
      'All platforms connected',
      'Advanced viral scoring',
      'No watermark',
      'Voice clone (5 voices)',
      'Auto-publish scheduler',
    ],
    highlighted: true,
  },
  {
    name: 'Agency',
    price: { monthly: 49, yearly: 39 },
    desc: 'For teams & agencies',
    features: [
      'Everything in Pro',
      '5 team seats',
      'White-label exports',
      'Custom voice cloning',
      'Priority trend alerts',
      'API access',
    ],
    highlighted: false,
  },
];

export const testimonials = [
  { name: 'Sarah Chen', role: 'Content Creator', avatar: 'SC', stars: 5, quote: 'ViralForge replaced my entire content team. I post 3x a day now without lifting a finger.' },
  { name: 'Marcus Webb', role: 'Agency Owner', avatar: 'MW', stars: 5, quote: 'We went from 5 clients to 30 in two months. The viral predictor is scary accurate.' },
  { name: 'Priya Sharma', role: 'Influencer', avatar: 'PS', stars: 4, quote: 'The voice clone feature alone is worth the Pro plan. My followers think I narrate everything myself.' },
  { name: 'Diego Torres', role: 'Social Media Manager', avatar: 'DT', stars: 5, quote: 'Auto-publish across 5 platforms? Game changer. I schedule a week of content in 20 minutes.' },
  { name: 'Emma Liu', role: 'TikTok Creator', avatar: 'EL', stars: 5, quote: 'My engagement went up 340% in the first month. The trend hunter catches things before they blow up.' },
  { name: 'James Park', role: 'YouTube Creator', avatar: 'JP', stars: 4, quote: 'The format flexibility is unreal. One idea becomes a video, carousel, AND thread instantly.' },
];

export const timelineSteps = ['Idea', 'Format', 'Generate', 'Export', 'Publish'];

export const generateSteps = [
  'Analyzing trends',
  'Writing script',
  'Generating visuals',
  'Optimizing virality',
];

export const mockScript = {
  hook: 'POV: You just discovered the AI tool that creates content FOR you while you sleep... 🧵',
  body: 'Most creators spend 4+ hours per post. ViralForge does it in 4 seconds. Here\'s how:\n\n1️⃣ Type your topic\n2️⃣ Pick a format\n3️⃣ AI writes, designs, and scores it\n4️⃣ Auto-publish to every platform\n\nThe viral predictor tells you if it\'ll hit BEFORE you post. No more guessing.',
  cta: 'Stop creating content the hard way. Start your factory today → link in bio. Follow for daily AI content tips.',
};
