// 温暖手作风备用图片生成器与错误容灾工具
// 确保即使在离线、网络限制或 Unsplash 加载受阻时，所有卡片与头像依然保有高质感手作美学

export function getCategoryFallbackSvg(category: string, title?: string): string {
  const cleanTitle = (title || '邻里手作').slice(0, 16);
  
  let bg = '#FAF4EE';
  let accent = '#9E5A44';
  let label = '生活手作';
  let iconSvg = `
    <!-- 手作/画笔调色盘线稿 -->
    <path d="M70 120 C70 90, 130 90, 130 120 C130 140, 115 150, 100 150 C85 150, 70 140, 70 120 Z" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    <path d="M115 110 L145 80" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="90" cy="115" r="4" fill="${accent}"/>
    <circle cx="105" cy="125" r="3" fill="${accent}"/>
  `;

  if (category === 'music') {
    bg = '#F7F3EE';
    accent = '#8C4A34';
    label = '音乐艺术';
    iconSvg = `
      <circle cx="85" cy="130" r="14" fill="none" stroke="${accent}" stroke-width="3"/>
      <circle cx="125" cy="120" r="14" fill="none" stroke="${accent}" stroke-width="3"/>
      <path d="M99 130 L99 85 L139 75 L139 120" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M99 98 L139 88" stroke="${accent}" stroke-width="3"/>
    `;
  } else if (category === 'tech') {
    bg = '#F2F5F3';
    accent = '#2D5239';
    label = '编程技术';
    iconSvg = `
      <rect x="65" y="80" width="80" height="55" rx="8" fill="none" stroke="${accent}" stroke-width="3"/>
      <path d="M85 107 L75 97 L85 87" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M125 107 L135 97 L125 87" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="110" y1="87" x2="100" y2="107" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="65" y1="122" x2="145" y2="122" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.3"/>
    `;
  } else if (category === 'photo') {
    bg = '#F5F5F0';
    accent = '#4B5563';
    label = '光影摄影';
    iconSvg = `
      <rect x="65" y="85" width="80" height="52" rx="10" fill="none" stroke="${accent}" stroke-width="3"/>
      <circle cx="105" cy="111" r="16" fill="none" stroke="${accent}" stroke-width="3"/>
      <circle cx="105" cy="111" r="7" fill="${accent}" fill-opacity="0.2"/>
      <circle cx="130" cy="95" r="3.5" fill="${accent}"/>
      <path d="M88 85 L94 77 L116 77 L122 85" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linejoin="round"/>
    `;
  } else if (category === 'language') {
    bg = '#FBF8EE';
    accent = '#B46C18';
    label = '语言文化';
    iconSvg = `
      <rect x="65" y="80" width="55" height="42" rx="8" fill="none" stroke="${accent}" stroke-width="3"/>
      <path d="M78 122 L72 134 L88 122" fill="${bg}" stroke="${accent}" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="95" y="96" width="50" height="38" rx="8" fill="${bg}" stroke="${accent}" stroke-width="2.5"/>
      <text x="82" y="106" font-size="14" font-family="serif" font-weight="bold" fill="${accent}">A</text>
      <text x="114" y="120" font-size="14" font-family="sans-serif" font-weight="bold" fill="${accent}">文</text>
    `;
  } else if (category === 'life') {
    bg = '#FAF6F0';
    accent = '#5A7558';
    label = '烘焙生活';
    iconSvg = `
      <path d="M75 90 C75 90, 85 135, 125 135 C135 135, 140 125, 140 115 C140 105, 135 98, 125 98" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      <line x1="72" y1="90" x2="130" y2="90" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      <path d="M88 78 C88 74, 94 72, 94 68" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-opacity="0.6"/>
      <path d="M102 78 C102 74, 108 72, 108 68" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-opacity="0.6"/>
      <ellipse cx="105" cy="142" rx="35" ry="6" fill="none" stroke="${accent}" stroke-width="2.5"/>
    `;
  }

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="100%" height="100%">
  <defs>
    <linearGradient id="g_${category}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#EFE8DD"/>
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="${accent}" fill-opacity="0.08"/>
    </pattern>
  </defs>

  <!-- 背景与纹理 -->
  <rect width="400" height="240" fill="url(#g_${category})"/>
  <rect width="400" height="240" fill="url(#grid)"/>

  <!-- 细腻线框 -->
  <rect x="12" y="12" width="376" height="216" rx="14" fill="none" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="4 4"/>

  <!-- 居中矢量徽章与线稿 -->
  <g transform="translate(95, 10)">
    <circle cx="105" cy="110" r="46" fill="#FFFFFF" fill-opacity="0.75" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.3"/>
    ${iconSvg}
  </g>

  <!-- 手作标签与标题 -->
  <g transform="translate(200, 182)" text-anchor="middle">
    <rect x="-42" y="-22" width="84" height="20" rx="10" fill="${accent}" fill-opacity="0.12"/>
    <text y="-8" font-size="10" font-weight="600" font-family="sans-serif" fill="${accent}" letter-spacing="1">${label}</text>
    <text y="20" font-size="12" font-weight="700" font-family="serif" fill="#2C2825" opacity="0.85">${cleanTitle}</text>
  </g>
</svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function getAvatarFallbackSvg(name: string): string {
  const char = (name || '友').trim().charAt(0);
  const colors = [
    { bg: '#FAF0EB', border: '#D4A390', text: '#9E5A44' },
    { bg: '#EFF4F0', border: '#9EB8A3', text: '#3B5B43' },
    { bg: '#FAF4E8', border: '#DBC593', text: '#B46C18' },
    { bg: '#F1F3F5', border: '#B4BDC6', text: '#4B5563' },
  ];
  
  // 按照字符哈希挑选和谐手作配色
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const theme = colors[hash % colors.length];

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="${theme.bg}"/>
  <circle cx="50" cy="50" r="44" fill="none" stroke="${theme.border}" stroke-width="3"/>
  <text x="50" y="62" font-size="40" font-weight="700" font-family="serif" fill="${theme.text}" text-anchor="middle">
    ${char}
  </text>
</svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string
) {
  const target = event.currentTarget;
  if (target.dataset.hasFallback === 'true') {
    return;
  }
  target.dataset.hasFallback = 'true';
  target.src = fallbackUrl;
}
