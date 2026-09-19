import os
import math
from PIL import Image, ImageDraw

os.makedirs('public', exist_ok=True)

# 1. 写入高清矢量 SVG
SVG_CONTENT = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- 背景陶土质感渐变 -->
    <linearGradient id="sc-terracotta" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C2634B" />
      <stop offset="45%" stop-color="#9E4E37" />
      <stop offset="100%" stop-color="#732E1E" />
    </linearGradient>

    <!-- 顶层高光柔晕 -->
    <radialGradient id="sc-glow" cx="30%" cy="25%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.32" />
      <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.18" />
    </radialGradient>

    <!-- 巧遇金光星芒渐变 -->
    <linearGradient id="sc-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5D6" />
      <stop offset="35%" stop-color="#FBBF24" />
      <stop offset="70%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>

    <!-- 象牙白手作缎带渐变 -->
    <linearGradient id="sc-ivory" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F4ECE1" />
    </linearGradient>

    <!-- 榫卯互换阴影 -->
    <filter id="sc-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#3D130A" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- 超椭圆 Squircle 徽章底板 -->
  <rect x="32" y="32" width="448" height="448" rx="112" ry="112" fill="url(#sc-terracotta)" />
  <rect x="32" y="32" width="448" height="448" rx="112" ry="112" fill="url(#sc-glow)" />
  <!-- 细致微倒角边框 -->
  <rect x="32" y="32" width="448" height="448" rx="112" ry="112" fill="none" stroke="rgba(255,255,255,0.24)" stroke-width="4" />

  <!-- 核心互换图案群组 (以技换技 · 榫卯交织互换曲线) -->
  <g filter="url(#sc-shadow)">
    <!-- 双向流畅互换弧线 (象牙白，圆润笔触) -->
    <path d="M 152 204 C 152 148, 196 116, 256 116 C 310 116, 348 142, 348 178 C 348 208, 320 232, 276 246 L 236 260 C 188 276, 160 300, 160 338 C 160 376, 198 404, 256 404 C 316 404, 360 372, 360 316" 
          fill="none" stroke="url(#sc-ivory)" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" />

    <!-- 互换双翼切磋羽刃 (双箭头象征 1对1 彼此交流) -->
    <path d="M 326 136 L 366 176 L 326 216" fill="none" stroke="url(#sc-ivory)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 186 296 L 146 336 L 186 376" fill="none" stroke="url(#sc-ivory)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- 中心核心：巧遇之星 (Serendipity 4-Point Gold Star) -->
  <g filter="url(#sc-shadow)">
    <!-- 8 角外散星芒 -->
    <path d="M 256 156 Q 256 256 156 256 Q 256 256 256 356 Q 256 256 356 256 Q 256 256 256 156 Z" 
          fill="url(#sc-gold)" />
    
    <!-- 45度光芒 -->
    <path d="M 256 192 Q 256 256 192 256 Q 256 256 256 320 Q 256 256 320 256 Q 256 256 256 192 Z" 
          transform="rotate(45 256 256)" fill="url(#sc-gold)" opacity="0.88" />

    <!-- 璀璨核心宝石 -->
    <circle cx="256" cy="256" r="22" fill="#FFFBEB" />
    <circle cx="256" cy="256" r="11" fill="#D97706" />
    <circle cx="252" cy="252" r="4" fill="#FFFFFF" />

    <!-- 四方匠人星辰 (代表四大门类：器物、声律、代码、手作) -->
    <circle cx="178" cy="178" r="7.5" fill="#FDE68A" />
    <circle cx="334" cy="178" r="7.5" fill="#FDE68A" />
    <circle cx="178" cy="334" r="7.5" fill="#FDE68A" />
    <circle cx="334" cy="334" r="7.5" fill="#FDE68A" />
  </g>
</svg>
"""

with open('public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(SVG_CONTENT)
with open('public/logo.svg', 'w', encoding='utf-8') as f:
    f.write(SVG_CONTENT)

print("SVG files generated in public/ successfully.")

# 2. 生成高分辨率与多尺寸点阵图标 (PNG & ICO)
# 采用 4 倍超采样渲染高质量抗锯齿图
def render_master_icon(size=1024):
    scale = 2  # 2048x2048 采样
    w = size * scale
    img = Image.new("RGBA", (w, w), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 绘制超椭圆底板
    pad = int(w * 0.0625)
    bw = w - pad * 2
    radius = int(bw * 0.25)
    
    # 模拟渐变底色
    # 采用同心圆叠加渐变
    for i in range(radius, 0, -1):
        ratio = i / radius
        r = int(194 * ratio + 115 * (1 - ratio))
        g = int(99 * ratio + 46 * (1 - ratio))
        b = int(75 * ratio + 30 * (1 - ratio))
        draw.rounded_rectangle(
            [(pad, pad), (pad + bw, pad + bw)],
            radius=radius,
            fill=(r, g, b, 255)
        )
        break
    
    # 实心陶土底色
    draw.rounded_rectangle(
        [(pad, pad), (pad + bw, pad + bw)],
        radius=radius,
        fill=(158, 78, 55, 255),
        outline=(255, 255, 255, 60),
        width=int(w * 0.008)
    )

    # 绘制核心图案：S型互换曲线 + 箭头
    cx, cy = w // 2, w // 2
    stroke_w = int(w * 0.086)

    # 象牙白颜色
    ivory = (255, 253, 248, 255)
    gold = (251, 191, 36, 255)
    gold_dark = (217, 119, 6, 255)
    white = (255, 255, 255, 255)

    # 绘制互换曲线核心骨架
    arc_rad = int(w * 0.22)
    # 上圆弧 (顺时针)
    draw.arc(
        [cx - arc_rad, cy - arc_rad * 1.6, cx + arc_rad, cy - arc_rad * 0.2],
        start=180, end=360, fill=ivory, width=stroke_w
    )
    # 下圆弧
    draw.arc(
        [cx - arc_rad, cy + arc_rad * 0.2, cx + arc_rad, cy + arc_rad * 1.6],
        start=0, end=180, fill=ivory, width=stroke_w
    )
    # 斜向连接段
    draw.line(
        [(cx + int(arc_rad * 0.85), cy - int(arc_rad * 0.85)),
         (cx - int(arc_rad * 0.85), cy + int(arc_rad * 0.85))],
        fill=ivory, width=stroke_w
    )

    # 绘制中心巧遇之星 (4-Point Diamond Sparkle)
    star_r = int(w * 0.19)
    star_in = int(w * 0.04)
    poly_star = [
        (cx, cy - star_r),
        (cx + star_in, cy - star_in),
        (cx + star_r, cy),
        (cx + star_in, cy + star_in),
        (cx, cy + star_r),
        (cx - star_in, cy + star_in),
        (cx - star_r, cy),
        (cx - star_in, cy - star_in),
    ]
    draw.polygon(poly_star, fill=gold)

    # 45度旋转小星
    star_r2 = int(star_r * 0.65)
    star_in2 = int(star_in * 0.7)
    d = int(star_r2 * 0.707)
    di = int(star_in2 * 0.707)
    poly_star45 = [
        (cx + d, cy - d),
        (cx + di, cy),
        (cx + d, cy + d),
        (cx, cy + di),
        (cx - d, cy + d),
        (cx - di, cy),
        (cx - d, cy - d),
        (cx, cy - di)
    ]
    draw.polygon(poly_star45, fill=gold_dark)

    # 中心高光珍珠/宝石
    gem_r = int(w * 0.038)
    draw.ellipse([cx - gem_r, cy - gem_r, cx + gem_r, cy + gem_r], fill=white)
    draw.ellipse([cx - gem_r//2, cy - gem_r//2, cx + gem_r//2, cy + gem_r//2], fill=gold_dark)
    draw.ellipse([cx - gem_r//4, cy - gem_r//4, cx, cy], fill=white)

    # 4 个象限点缀星
    dot_r = int(w * 0.015)
    dist = int(w * 0.16)
    for dx, dy in [(-dist, -dist), (dist, -dist), (-dist, dist), (dist, dist)]:
        draw.ellipse([cx + dx - dot_r, cy + dy - dot_r, cx + dx + dot_r, cy + dy + dot_r], fill=gold)

    # 超采样缩放回目标尺寸
    return img.resize((size, size), Image.Resampling.LANCZOS)

# 专为 16px / 24px / 32px 绘制的 Pixel-Fitted 高对比度微图标 (去燥、加粗、抗糊)
def render_micro_icon(size):
    scale = 4
    w = size * scale
    img = Image.new("RGBA", (w, w), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = max(1, int(w * 0.04))
    bw = w - pad * 2
    radius = int(bw * 0.26)

    # 底板：高饱和度陶土红
    draw.rounded_rectangle(
        [(pad, pad), (pad + bw, pad + bw)],
        radius=radius,
        fill=(158, 78, 55, 255)
    )

    cx, cy = w // 2, w // 2
    # 小尺寸下强化十字星芒和高反差
    star_r = int(w * 0.32)
    star_in = int(w * 0.08)
    poly = [
        (cx, cy - star_r),
        (cx + star_in, cy - star_in),
        (cx + star_r, cy),
        (cx + star_in, cy + star_in),
        (cx, cy + star_r),
        (cx - star_in, cy + star_in),
        (cx - star_r, cy),
        (cx - star_in, cy - star_in),
    ]
    # 外层象牙白加粗描边
    draw.polygon(poly, fill=(255, 255, 255, 255))
    # 内层金色闪耀
    star_r_in = int(star_r * 0.75)
    star_in_in = max(1, int(star_in * 0.75))
    poly_in = [
        (cx, cy - star_r_in),
        (cx + star_in_in, cy - star_in_in),
        (cx + star_r_in, cy),
        (cx + star_in_in, cy + star_in_in),
        (cx, cy + star_r_in),
        (cx - star_in_in, cy + star_in_in),
        (cx - star_r_in, cy),
        (cx - star_in_in, cy - star_in_in),
    ]
    draw.polygon(poly_in, fill=(251, 191, 36, 255))
    
    # 核心亮白高光点
    core_r = max(1, int(w * 0.07))
    draw.ellipse([cx - core_r, cy - core_r, cx + core_r, cy + core_r], fill=(255, 255, 255, 255))

    return img.resize((size, size), Image.Resampling.LANCZOS)

# 生成各阶尺寸
master_1024 = render_master_icon(1024)
master_512 = master_1024.resize((512, 512), Image.Resampling.LANCZOS)
master_192 = master_1024.resize((192, 192), Image.Resampling.LANCZOS)
master_180 = master_1024.resize((180, 180), Image.Resampling.LANCZOS)
master_128 = master_1024.resize((128, 128), Image.Resampling.LANCZOS)
master_64  = master_1024.resize((64, 64), Image.Resampling.LANCZOS)
master_48  = master_1024.resize((48, 48), Image.Resampling.LANCZOS)
master_32  = render_micro_icon(32)
master_24  = render_micro_icon(24)
master_16  = render_micro_icon(16)

master_512.save('public/icon-512.png', 'PNG')
master_192.save('public/icon-192.png', 'PNG')
master_180.save('public/apple-touch-icon.png', 'PNG')
master_64.save('public/icon-64.png', 'PNG')
master_32.save('public/icon-32.png', 'PNG')
master_16.save('public/icon-16.png', 'PNG')

# 组装 7 阶标准 multi-frame favicon.ico
ico_frames = [
    master_1024.resize((256, 256), Image.Resampling.LANCZOS),
    master_128,
    master_64,
    master_48,
    master_32,
    master_24,
    master_16
]

ico_frames[0].save(
    'public/favicon.ico',
    format='ICO',
    sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (24, 24), (16, 16)],
    append_images=ico_frames[1:]
)

print("All icons successfully generated:")
print(" - public/favicon.svg")
print(" - public/logo.svg")
print(" - public/favicon.ico (7-tier multi-frame: 16-256px)")
print(" - public/apple-touch-icon.png (180x180)")
print(" - public/icon-192.png")
print(" - public/icon-512.png")
