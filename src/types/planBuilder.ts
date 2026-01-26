/**
 * Types for the Social Media Plan Builder pricing calculator
 */

export interface ChannelOption {
  id: string;
  labelKey: string;
  icon?: string;
}

export interface FrequencyOption {
  id: string;
  labelKey: string;
  monthlyFee: number;
}

export interface AdsBudgetOption {
  id: string;
  labelKey: string;
  budgetAmount: number;
}

export interface AddOnOption {
  id: string;
  labelKey: string;
  pricing: AddOnPricing;
  defaultUnits?: number;
  minUnits?: number;
  maxUnits?: number;
}

export type AddOnPricing = 
  | { type: 'monthly_fixed'; price: number }
  | { type: 'per_unit'; unitPrice: number; unitLabelKey: string };

export interface SelectedAddOn {
  id: string;
  units?: number;
}

export interface PlanBuilderState {
  selectedChannels: string[];
  selectedFrequency: string;
  selectedAdsBudget: string;
  selectedAddOns: SelectedAddOn[];
}

export interface PricingCalculation {
  baseFee: number;
  channelFee: number;
  frequencyFee: number;
  addOnsTotal: number;
  managementTotal: number;
  adsBudget: number;
}

// Constants
export const PLAN_BUILDER_CONFIG = {
  managementFeeMinimum: 400,
  includedChannelsCount: 1,
  additionalChannelFee: 60,
  defaultFrequency: 'freq_2_month',
  defaultAdsBudget: 'ads_none',
} as const;

export const CHANNELS: ChannelOption[] = [
  { id: 'facebook', labelKey: 'planBuilder.channels.facebook' },
  { id: 'instagram', labelKey: 'planBuilder.channels.instagram' },
  { id: 'linkedin', labelKey: 'planBuilder.channels.linkedin' },
  { id: 'tiktok', labelKey: 'planBuilder.channels.tiktok' },
  { id: 'youtube', labelKey: 'planBuilder.channels.youtube' },
  { id: 'google_business', labelKey: 'planBuilder.channels.googleBusiness' },
  { id: 'pinterest', labelKey: 'planBuilder.channels.pinterest' },
  { id: 'x_twitter', labelKey: 'planBuilder.channels.xTwitter' },
];

export const FREQUENCIES: FrequencyOption[] = [
  { id: 'freq_2_month', labelKey: 'planBuilder.frequency.2month', monthlyFee: 0 },
  { id: 'freq_1_week', labelKey: 'planBuilder.frequency.1week', monthlyFee: 120 },
  { id: 'freq_2_week', labelKey: 'planBuilder.frequency.2week', monthlyFee: 250 },
  { id: 'freq_3_week', labelKey: 'planBuilder.frequency.3week', monthlyFee: 380 },
  { id: 'freq_4_week', labelKey: 'planBuilder.frequency.4week', monthlyFee: 520 },
  { id: 'freq_5_week', labelKey: 'planBuilder.frequency.5week', monthlyFee: 650 },
];

export const ADS_BUDGETS: AdsBudgetOption[] = [
  { id: 'ads_none', labelKey: 'planBuilder.adsBudget.none', budgetAmount: 0 },
  { id: 'ads_100', labelKey: 'planBuilder.adsBudget.100', budgetAmount: 100 },
  { id: 'ads_250', labelKey: 'planBuilder.adsBudget.250', budgetAmount: 250 },
  { id: 'ads_500', labelKey: 'planBuilder.adsBudget.500', budgetAmount: 500 },
  { id: 'ads_1000', labelKey: 'planBuilder.adsBudget.1000', budgetAmount: 1000 },
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: 'addon_product_photos',
    labelKey: 'planBuilder.addons.productPhotos.label',
    pricing: { type: 'per_unit', unitPrice: 25, unitLabelKey: 'planBuilder.addons.productPhotos.unit' },
    defaultUnits: 0,
    minUnits: 0,
    maxUnits: 200,
  },
  {
    id: 'addon_google_reviews',
    labelKey: 'planBuilder.addons.googleReviews.label',
    pricing: { type: 'monthly_fixed', price: 89 },
  },
  {
    id: 'addon_content_writing',
    labelKey: 'planBuilder.addons.contentWriting.label',
    pricing: { type: 'per_unit', unitPrice: 50, unitLabelKey: 'planBuilder.addons.contentWriting.unit' },
    defaultUnits: 0,
    minUnits: 0,
    maxUnits: 200,
  },
  {
    id: 'addon_email_marketing',
    labelKey: 'planBuilder.addons.emailMarketing.label',
    pricing: { type: 'monthly_fixed', price: 199 },
  },
  {
    id: 'addon_posts_pack',
    labelKey: 'planBuilder.addons.postsPack.label',
    pricing: { type: 'monthly_fixed', price: 150 },
  },
  {
    id: 'addon_analytics_dashboard',
    labelKey: 'planBuilder.addons.analyticsDashboard.label',
    pricing: { type: 'monthly_fixed', price: 149 },
  },
];
