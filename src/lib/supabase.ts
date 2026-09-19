import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 从 Vite 环境变量中读取公网 Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder')
  );
};

// 单例 Supabase 客户端实例
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * 获取图片公网访问 URL
 * @param bucket 存储桶名称 ('avatars' | 'skill-portfolios' | 'dispute-evidence')
 * @param path 相对路径
 */
export const getStoragePublicUrl = (
  bucket: 'avatars' | 'skill-portfolios' | 'dispute-evidence',
  path: string
): string => {
  if (!supabase) return path;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
