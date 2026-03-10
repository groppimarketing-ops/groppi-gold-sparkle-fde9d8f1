

# تحسين أداء الموقع — خطة تخفيف الثقل

## المشكلة

الموقع ثقيل جدًا بسبب عدة أسباب رئيسية:

1. **4 Vimeo iframes في الـ Hero** — كل واحد بيحمّل ~1MB سكريبتات من Vimeo
2. **5 فيديوهات .webm بتشتغل أوتوماتيك** في الـ Hero + فيديو خلفية MP4
3. **WaveAnimation مستمرة** (SVG waves + 6 particles + diagonal light ray) — شغالة على كل صفحة
4. **Hero بيكرر الكروت مرتين** (18 عنصر فيديو بدل 9) للـ infinite scroll effect
5. **framer-motion animations كتير** في 20+ component على الصفحة الرئيسية
6. **Google Fonts محملة blocking** في أول سطر CSS

## الخطة

### 1. إزالة Vimeo iframes — تحميلها فقط عند الضغط
- الـ 4 Vimeo embeds هم أكبر سبب للثقل
- استبدالهم بـ placeholder صورة/gradient، ولما المستخدم يضغط يحمّل الـ iframe
- أو الأفضل: حذفهم تمامًا واستخدام فيديوهات محلية فقط

### 2. تحميل فيديوهات Hero بشكل كسول (lazy)
- إضافة `loading="lazy"` و `preload="none"` للفيديوهات
- تشغيل الفيديوهات فقط لما تكون visible باستخدام IntersectionObserver
- تقليل عدد الفيديوهات المعروضة (مثلاً 5 بدل 9)

### 3. تخفيف WaveAnimation
- تقليل الـ particles من 6 إلى 2
- إزالة الـ diagonal light ray sweep
- استبدال الـ SVG wave animations بـ CSS gradients ثابتة مع opacity transition بسيط
- أو إزالتها تمامًا واستخدام gradient ثابت

### 4. تحميل أقسام الصفحة الرئيسية بالكسل (lazy sections)
- لف الأقسام أسفل الـ Hero في `lazy()` أو IntersectionObserver
- المستخدم مش هيحتاج كل الأقسام فورًا

### 5. Google Fonts — تحميل غير معطّل
- تغيير `@import` إلى `<link rel="preload">` في `index.html`
- إضافة `font-display: swap`

### 6. تقليل framer-motion animations
- استبدال `motion.div` البسيطة (fade in فقط) بـ CSS animations
- إزالة الـ `filter: blur()` من whileInView — ثقيل جدًا على الـ GPU

## الملفات المتأثرة

```text
src/components/home/HeroSection.tsx        — إزالة/تأخير Vimeo + تقليل فيديوهات
src/components/effects/WaveAnimation.tsx   — تبسيط كبير
src/components/home/HomeAfterHeroWrapper.tsx — تبسيط
src/index.css                              — نقل fonts + تبسيط animations
index.html                                 — إضافة font preload
src/pages/Index.tsx                         — lazy load sections
src/components/home/HomeTrustedBelgium.tsx  — إزالة blur filter animations
```

## النتيجة المتوقعة
- تقليل وقت التحميل الأولي بنسبة ~60-70%
- تحسين كبير على الموبايل
- نفس الشكل تقريبًا لكن بدون الثقل

