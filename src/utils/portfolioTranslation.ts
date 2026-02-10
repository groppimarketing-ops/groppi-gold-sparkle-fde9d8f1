import type { TFunction } from 'i18next';
import type { PortfolioItem } from '@/types/portfolio';

/**
 * Returns translated portfolio text fields.
 * Falls back to the raw data value if no translation key exists.
 */
export function getTranslatedPortfolio(t: TFunction, item: PortfolioItem) {
  const k = item.slug;
  return {
    shortResultLine: t(`portfolio.items.${k}.shortResult`, { defaultValue: item.shortResultLine }),
    challenge: t(`portfolio.items.${k}.challenge`, { defaultValue: item.popupContent.challenge }),
    approachPoints: item.popupContent.approachPoints.map((point, i) =>
      t(`portfolio.items.${k}.approach.${i}`, { defaultValue: point })
    ),
    resultPoints: item.popupContent.resultPoints.map((point, i) =>
      t(`portfolio.items.${k}.results.${i}`, { defaultValue: point })
    ),
    resultDisclaimer: item.popupContent.resultDisclaimer
      ? t(`portfolio.items.${k}.disclaimer`, { defaultValue: item.popupContent.resultDisclaimer })
      : undefined,
  };
}
