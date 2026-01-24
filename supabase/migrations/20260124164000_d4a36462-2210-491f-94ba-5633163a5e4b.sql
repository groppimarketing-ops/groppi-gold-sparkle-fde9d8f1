-- Add subscription type and price range to services table
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS pricing_type TEXT CHECK (pricing_type IN ('one_time', 'monthly', 'custom')) DEFAULT 'custom',
ADD COLUMN IF NOT EXISTS price_min DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS price_max DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS title_nl TEXT,
ADD COLUMN IF NOT EXISTS description_nl TEXT,
ADD COLUMN IF NOT EXISTS title_it TEXT,
ADD COLUMN IF NOT EXISTS description_it TEXT,
ADD COLUMN IF NOT EXISTS title_pt TEXT,
ADD COLUMN IF NOT EXISTS description_pt TEXT,
ADD COLUMN IF NOT EXISTS title_pl TEXT,
ADD COLUMN IF NOT EXISTS description_pl TEXT,
ADD COLUMN IF NOT EXISTS title_ru TEXT,
ADD COLUMN IF NOT EXISTS description_ru TEXT,
ADD COLUMN IF NOT EXISTS title_tr TEXT,
ADD COLUMN IF NOT EXISTS description_tr TEXT,
ADD COLUMN IF NOT EXISTS title_bn TEXT,
ADD COLUMN IF NOT EXISTS description_bn TEXT,
ADD COLUMN IF NOT EXISTS title_hi TEXT,
ADD COLUMN IF NOT EXISTS description_hi TEXT,
ADD COLUMN IF NOT EXISTS title_ur TEXT,
ADD COLUMN IF NOT EXISTS description_ur TEXT,
ADD COLUMN IF NOT EXISTS title_zh TEXT,
ADD COLUMN IF NOT EXISTS description_zh TEXT;

-- Add comment to explain pricing_type values
COMMENT ON COLUMN public.services.pricing_type IS 'one_time = single payment, monthly = subscription, custom = quote required';