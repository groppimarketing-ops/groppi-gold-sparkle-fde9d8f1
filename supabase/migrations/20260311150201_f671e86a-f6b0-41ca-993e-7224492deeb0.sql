INSERT INTO public.articles (
  slug, title_en, title_ar, title_nl, title_fr,
  content_en, content_ar, content_nl,
  excerpt_en, excerpt_ar,
  featured_image, published, published_at
) VALUES (
  'digital-marketing-groppi-test',
  'How GROPPI Transforms Your Digital Marketing',
  'كيف تحوّل GROPPI استراتيجيتك في التسويق الرقمي',
  'Hoe GROPPI uw digitale marketing transformeert',
  'Comment GROPPI transforme votre marketing digital',
  '<h2>Introduction</h2><p>In today''s fast-paced digital landscape, having a strong online presence is no longer optional — it is essential. GROPPI helps businesses of all sizes build, grow, and dominate their digital footprint.</p><h2>Our Approach</h2><p>We combine data-driven insights with creative excellence to deliver measurable results. From SEO to social media management, every strategy is tailored to your unique business goals.</p><h2>Key Services</h2><ul><li><strong>SEO Optimization</strong> — Rank higher and attract organic traffic</li><li><strong>Social Media Management</strong> — Build a loyal community</li><li><strong>Content Marketing</strong> — Tell your brand story</li><li><strong>Paid Advertising</strong> — Maximize ROI on every euro spent</li></ul><h2>Results That Speak</h2><p>Our clients see an average of 3x increase in organic traffic within the first 6 months. We measure success by your success.</p>',
  '<h2>مقدمة</h2><p>في عالم رقمي سريع التطور، لم يعد الحضور الإلكتروني القوي خياراً بل ضرورة. تساعد GROPPI الشركات من جميع الأحجام على بناء حضورها الرقمي وتنميته.</p><h2>نهجنا</h2><p>نجمع بين التحليلات المبنية على البيانات والإبداع البصري لتحقيق نتائج قابلة للقياس. من تحسين محركات البحث إلى إدارة وسائل التواصل الاجتماعي، كل استراتيجية مصممة خصيصاً لأهداف عملك.</p><h2>خدماتنا الرئيسية</h2><ul><li><strong>تحسين محركات البحث (SEO)</strong> — احتل مرتبة أعلى واجذب زوارًا عضويين</li><li><strong>إدارة وسائل التواصل</strong> — ابنِ مجتمعًا مخلصًا لعلامتك</li><li><strong>تسويق المحتوى</strong> — احكِ قصة علامتك التجارية</li><li><strong>الإعلانات المدفوعة</strong> — عظّم عائد الاستثمار على كل يورو</li></ul>',
  '<h2>Introductie</h2><p>In het snel veranderende digitale landschap is een sterke online aanwezigheid geen optie meer, maar een noodzaak. GROPPI helpt bedrijven van elke omvang hun digitale voetafdruk op te bouwen en te laten groeien.</p><h2>Onze Aanpak</h2><p>Wij combineren data-gedreven inzichten met creatieve excellentie om meetbare resultaten te leveren. Van SEO tot social media management, elke strategie is afgestemd op uw unieke zakelijke doelen.</p>',
  'Discover how GROPPI transforms digital marketing strategies with data-driven insights and creative excellence to deliver measurable results for businesses.',
  'اكتشف كيف تحوّل GROPPI استراتيجيات التسويق الرقمي بمزج التحليلات والإبداع لتحقيق نتائج ملموسة للشركات.',
  'https://dffmjqjokfccdnfutdmx.supabase.co/storage/v1/object/public/media/blog-test-cover.jpg',
  true,
  now()
) ON CONFLICT (slug) DO NOTHING;