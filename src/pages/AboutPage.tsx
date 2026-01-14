import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase, SiteSettings } from '../lib/supabase';

export function AboutPage() {
  const [bio, setBio] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    loadBio();
  }, []);

  async function loadBio() {
    try {
      const { data, error } = await supabase
        .from('roberthut_site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setBio(data);
    } catch (error) {
      console.error('Error loading bio:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-stone-400">{t('common.loading')}</div>
      </div>
    );
  }

  if (!bio) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-light text-stone-400">{t('about.noBio')}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-stone-200">
        <div className="flex flex-col items-center text-center mb-8">
          {bio.avatar_url && (
            <img
              src={bio.avatar_url}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg mb-6"
            />
          )}
          <h1 className="text-4xl font-light mb-2">{bio.bio_title}</h1>
        </div>

        <div className="prose prose-stone prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {bio.bio_content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
