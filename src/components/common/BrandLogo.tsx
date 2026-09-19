import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

/**
 * 巧遇 · 匠心 (SkillCraft) 官方定制品牌矢量 Logo
 * 核心设计语言：榫卯交织互换曲线 + 巧遇金光星芒 + 陶土釉色超椭圆底板
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* 背景陶土质感渐变 */}
        <linearGradient id="sc-react-terracotta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C2634B" />
          <stop offset="45%" stopColor="#9E4E37" />
          <stop offset="100%" stopColor="#732E1E" />
        </linearGradient>

        {/* 顶层柔光渐变 */}
        <radialGradient id="sc-react-glow" cx="30%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </radialGradient>

        {/* 巧遇金光星芒渐变 */}
        <linearGradient id="sc-react-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5D6" />
          <stop offset="35%" stopColor="#FBBF24" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* 象牙白手作缎带渐变 */}
        <linearGradient id="sc-react-ivory" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F4ECE1" />
        </linearGradient>

        {/* 榫卯互换立体阴影 */}
        <filter id="sc-react-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#3D130A" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* 超椭圆 Squircle 徽章底板 */}
      <rect x="32" y="32" width="448" height="448" rx="112" ry="112" fill="url(#sc-react-terracotta)" />
      <rect x="32" y="32" width="448" height="448" rx="112" ry="112" fill="url(#sc-react-glow)" />
      {/* 细致微倒角边框 */}
      <rect x="32" y="32" width="448" height="448" rx="112" ry="112" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="4" />

      {/* 核心互换图案群组 (以技换技 · 榫卯交织互换曲线) */}
      <g filter="url(#sc-react-shadow)">
        <path
          d="M 152 204 C 152 148, 196 116, 256 116 C 310 116, 348 142, 348 178 C 348 208, 320 232, 276 246 L 236 260 C 188 276, 160 300, 160 338 C 160 376, 198 404, 256 404 C 316 404, 360 372, 360 316"
          fill="none"
          stroke="url(#sc-react-ivory)"
          strokeWidth="44"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 326 136 L 366 176 L 326 216"
          fill="none"
          stroke="url(#sc-react-ivory)"
          strokeWidth="36"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 186 296 L 146 336 L 186 376"
          fill="none"
          stroke="url(#sc-react-ivory)"
          strokeWidth="36"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* 中心核心：巧遇之星 (Serendipity 4-Point Gold Star) */}
      <g filter="url(#sc-react-shadow)">
        <path
          d="M 256 156 Q 256 256 156 256 Q 256 256 256 356 Q 256 256 356 256 Q 256 256 256 156 Z"
          fill="url(#sc-react-gold)"
        />
        <path
          d="M 256 192 Q 256 256 192 256 Q 256 256 256 320 Q 256 256 320 256 Q 256 256 256 192 Z"
          transform="rotate(45 256 256)"
          fill="url(#sc-react-gold)"
          opacity="0.88"
        />
        {/* 璀璨核心宝石 */}
        <circle cx="256" cy="256" r="22" fill="#FFFBEB" />
        <circle cx="256" cy="256" r="11" fill="#D97706" />
        <circle cx="252" cy="252" r="4" fill="#FFFFFF" />

        {/* 四方匠人星辰 */}
        <circle cx="178" cy="178" r="7.5" fill="#FDE68A" />
        <circle cx="334" cy="178" r="7.5" fill="#FDE68A" />
        <circle cx="178" cy="334" r="7.5" fill="#FDE68A" />
        <circle cx="334" cy="334" r="7.5" fill="#FDE68A" />
      </g>
    </svg>
  );
};
