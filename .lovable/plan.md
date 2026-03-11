
## الفكرة الكاملة

عند الضغط على "Generate with AI"، بعد توليد نص المقالة، **تتولّد صورة Featured Image تلقائياً بالذكاء الاصطناعي** وترفع على Media Library وتُضاف للمقالة مباشرة — وكل صورة تحتوي على **لوجو GROPPI الذهبي** مدمج فيها.

## المشكلة الرئيسية: Logo في صورة AI

نموذج توليد الصور (Gemini image) لا يمكنه إدراج لوجو PNG موجود مسبقاً بدقة عالية عند التوليد. الحل: **توليد الصورة أولاً** ثم إضافة **watermark نصي "GROPPI"** ذهبي عليها داخل Edge Function (بدون مكتبات خارجية — باستخدام Canvas API في Deno أو عبر تضمين اللوجو كـ overlay في prompt صريح للـ AI).

**الحل الأفضل والأبسط**: في الـ prompt للصورة، نطلب صراحةً من الـ AI **رسم نص GROPPI بخط ذهبي فاخر** في أسفل/أعلى الصورة كجزء من التصميم نفسه — بدون مكتبات image processing إضافية.

## الخطوات

### 1. Edge Function جديدة: `generate-article-image`
ملف: `supabase/functions/generate-article-image/index.ts`

- تستقبل `{ topic, title }` — عنوان المقالة من الـ AI
- تستدعي Lovable AI بـ `google/gemini-3.1-flash-image-preview` (صور عالية الجودة + سريعة)
- الـ prompt يطلب:
  - خلفية داكنة فاخرة (أسود/داكن) مع ألوان ذهبية
  - صورة احترافية تعبّر عن موضوع المقالة
  - **نص "GROPPI" بخط ذهبي ذو جودة عالية** في أسفل اليسار أو الزاوية
  - أبعاد landscape (1200x630 — مثالية للـ blog cover)
- ترفع الصورة على Supabase Storage bucket `media`
- تُدخل record في جدول `media`
- ترجع الـ `file_url`

### 2. تحديث `generate-article` Edge Function
بعد توليد النص، يُضاف **في نفس العملية** استدعاء لـ `generate-article-image` ويُرجع `imageUrl` مع الـ `article` JSON.

**ملاحظة**: بدلاً من استدعاء function من داخل function (أكثر تعقيداً)، نضيف منطق توليد الصورة **مباشرة في `generate-article`** كخطوة ثانية بعد توليد النص.

### 3. تحديث `ArticleEditor.tsx`
في `handleGenerateWithAI`:
```typescript
// بعد نجاح الـ AI text generation:
setArticle(prev => ({
  ...prev,
  ...fieldsFromAI,
  featured_image: data.imageUrl || prev.featured_image  // ← جديد
}));
```
وإضافة رسالة toast تُعلم المستخدم أن الصورة جُهّزت.

### 4. تحديث `supabase/config.toml`
إضافة `[functions.generate-article-image]` مع `verify_jwt = false`.

## التفاصيل التقنية

**Prompt الصورة** (مُحكم للحصول على نتيجة احترافية):
```
Create a professional blog cover image (1200x630) for a GROPPI digital marketing agency article about: "[topic]".
Style: Dark luxury background (#050505 or deep charcoal), elegant gold (#D4AF37) geometric accents, abstract network or digital growth visual elements.
IMPORTANT: Include the text "GROPPI" in bold golden typography at the bottom-left corner of the image — it must be clearly visible.
Make it look like a premium marketing agency content piece.
```

**Flow النهائي عند الضغط على "Generate with AI":**
```
User clicks Generate with AI
         ↓
Edge Function: generate-article
  Step 1: Gemini Flash → JSON text (EN/AR/FR/NL) ~10s
  Step 2: Gemini Image → cover image with GROPPI ~15s
  Step 3: Upload image to Storage → get URL
         ↓
Return { article, imageUrl }
         ↓
ArticleEditor: fills all fields + featured_image automatically ✓
```

## الملفات المتأثرة

1. `supabase/functions/generate-article/index.ts` — إضافة توليد الصورة
2. `supabase/config.toml` — لا تغيير مطلوب (generate-article موجود)
3. `src/pages/admin/ArticleEditor.tsx` — تطبيق `imageUrl` على `featured_image`

**ملاحظة**: لا نحتاج function منفصلة — كل شيء في `generate-article` مباشرة.
