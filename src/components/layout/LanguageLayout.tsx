import { useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { applyDocumentDirection } from '@/i18n/config';
import { getCurrentLangFromPath } from '@/utils/languageRouting';

/**
 * Layout wrapper that syncs the i18n language to the URL path.
 * - Unprefixed routes (/) → nl
 * - Prefixed routes (/en, /fr, etc.) → that language
 * Uses useLayoutEffect to avoid flash of wrong language.
 * Shows a minimal loading overlay while dynamic language chunks load (<300ms).
 */
const LanguageLayout = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const targetLang = getCurrentLangFromPath(location.pathname);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (i18n.language === targetLang) {
      applyDocumentDirection(targetLang);
      return;
    }

    // nl and en are pre-bundled — no spinner needed
    const isBundled = targetLang === 'nl' || targetLang === 'en';
    if (!isBundled) setLoading(true);

    i18n.changeLanguage(targetLang).then(() => {
      applyDocumentDirection(targetLang);
      setLoading(false);
    });
  }, [targetLang, i18n]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <Outlet />;
};

export default LanguageLayout;
