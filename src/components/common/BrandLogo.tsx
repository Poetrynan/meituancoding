import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

/**
 * 巧遇 · 匠心 (SkillCraft) 极简品牌矢量徽标
 * 设计语言：包豪斯/瑞士极简主义风格 · 陶土红超椭圆底板 + 象牙白双弧互换回路 (S) + 巧遇金色菱形星芒
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
      {/* 极简纯色紫砂陶土底板 */}
      <rect x="24" y="24" width="464" height="464" rx="116" ry="116" fill="#A14E36" />

      {/* 极简双弧互换回路 (象牙白，形成 1对1 技能交换流线与 S 首字母) */}
      <g fill="none" stroke="#FFFFFF" strokeWidth="44" strokeLinecap="round">
        {/* 上半环 */}
        <path d="M 148 244 C 148 160, 204 116, 280 116 C 352 116, 400 160, 400 236 C 400 274, 380 304, 344 324 L 292 236" />
        {/* 下半环 (镜像互换) */}
        <path d="M 364 268 C 364 352, 308 396, 232 396 C 160 396, 112 352, 112 276 C 112 238, 132 208, 168 188 L 220 276" />
      </g>

      {/* 中心核心：巧遇黄金星芒 (Serendipity Gold Spark) */}
      <path
        d="M 256 216 Q 256 256 216 256 Q 256 256 256 296 Q 256 256 296 256 Q 256 256 256 216 Z"
        fill="#FBBF24"
      />
    </svg>
  );
};
