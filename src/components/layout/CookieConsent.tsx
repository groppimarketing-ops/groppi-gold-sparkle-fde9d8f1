import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LangLink from '@/components/LangLink';

const CONSENT_KEY = 'groppi_cookie_consent';

export type ConsentValue = 'accepted' | 'rejected' | null;

export const getConsentValue = (): ConsentValue => {
  try {
    return localStorage.getItem(CONSENT_KEY) as ConsentValue;
  } catch {
    return null;
  }
};

const CookieConsent = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!getConsentValue()) {
        setVisible(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsLeaving(true);
    setTimeout(() => setVisible(false), 350);
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    dismiss();
    if (typeof window !== 'undefined') {
      const w = window as any;
      if (typeof w.gtag === 'function') {
        w.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        });
      }
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'cookie_consent_accepted' });
    }
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    dismiss();
    if (typeof window !== 'undefined') {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'cookie_consent_rejected' });
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t('cookies.title', 'Wij gebruiken cookies')}
      className={`fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 transition-transform duration-350 ease-in-out ${
        isLeaving ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-4xl mx-auto glass-card border border-primary/20 rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-foreground font-medium mb-1">
                {t('cookies.title', 'Wij gebruiken cookies')}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('cookies.description', 'Deze website gebruikt cookies om je ervaring te verbeteren en om onze prestaties te meten. Door op "Accepteren" te klikken, ga je akkoord met ons cookiebeleid.')}{' '}
                <LangLink to="/privacy" className="text-primary hover:underline">
                  {t('cookies.learnMore', 'Meer info')}
                </LangLink>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="flex-1 sm:flex-none glass-button text-xs"
            >
              {t('cookies.reject', 'Weigeren')}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 sm:flex-none luxury-button text-xs"
            >
              {t('cookies.accept', 'Accepteren')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
