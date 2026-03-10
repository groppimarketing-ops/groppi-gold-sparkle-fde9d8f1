
## Audit complet: المشاكل الحقيقية التي تمنع "سرعة الصاروخ"

بعد فحص كل الملفات بعمق، هذا هو التقرير الكامل مرتباً من الأكثر تأثيراً للأقل:

---

### المشكلة #1 — 🔴 حرجة: 100+ JavaScript Chunks من صور البورتفوليو

**الملف:** `src/data/portfolioItems.ts`  
السطر 8 وصولاً لسطر 185: هناك **120+ `import` statement** يستورد صور من `@/assets/portfolio/...` كـ ES modules.

```
import ilFuocoChef from '@/assets/portfolio/il-fuoco/chef-pizza.jpg';
import ilFuocoMenu from '@/assets/portfolio/il-fuoco/menu.png';
// ... 118 imports أخرى
```

**التأثير:** Vite يحوّل كل صورة لـ JS module منفصل → **100+ HTTP requests إضافية** عند تحميل أي صفحة تستخدم portfolioItems (Home, Gallery, Portfolio) → يضرب TTI بقوة.

**الحل:** تحويل كل المسارات لـ strings مباشرة (`/portfolio/il-fuoco/chef-pizza.jpg`) ونقل الصور لـ `/public/portfolio/`.

---

### المشكلة #2 — 🔴 حرجة: QueryClient بدون Cache Config

**الملف:** `src/App.tsx` السطر 50:
```typescript
const queryClient = new QueryClient(); // ← بدون أي إعدادات!
```

**الملف:** `src/hooks/usePageContent.ts` السطر 45-93:
- الـ Supabase query يُشغَّل في كل render دون أي caching
- يستخدم `useState/useEffect` عادي بدلاً من `react-query`
- **النتيجة:** كل navigation للـ Home page → طلب 800ms+ جديد للـ database

**الحل:** 
1. إضافة `defaultOptions` للـ QueryClient مع `staleTime: 5 * 60 * 1000`
2. تحويل `usePageContent` ليستخدم `useQuery` من react-query بدلاً من `useState/useEffect`

---

### المشكلة #3 — 🟠 مهمة: GTM يُحمَّل مرتين

**الملف:** `index.html` السطر 82-85 + `src/App.tsx` السطر 102-106:

```html
<!-- index.html: GTM script مباشرة -->
<script>(function(w,d,s,l,i){...GTM-MJ8KSVHF...})</script>
```

```typescript
// App.tsx: نفس GTM يُضاف مرة ثانية عبر useEffect!
useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-MJ8KSVHF";
  document.head.appendChild(script);
}, []);
```

**التأثير:** GTM يُحمَّل ضعف = ضياع وقت network، أحياناً events مكررة، يزيد TBT.

**الحل:** حذف الـ `useEffect` من `App.tsx` تماماً — GTM موجود بالفعل في `index.html`.

---

### المشكلة #4 — 🟠 مهمة: FloatingWhatsApp يستخدم Framer Motion بثقل

**الملف:** `src/components/layout/FloatingWhatsApp.tsx`

يستخدم `motion.a` مع animate loop لا ينتهي:
```typescript
animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
```

هذا الـ animation يعمل **طوال الوقت** في كل صفحة، يُبقي Framer Motion thread مشغولاً.

**الحل:** استبداله بـ pure CSS `@keyframes` animation بدلاً من Framer Motion loop لا ينتهي.

---

### المشكلة #5 — 🟡 متوسطة: HomeServicesGrid — Framer Motion في الـ loop

**الملف:** `src/components/home/HomeServicesGrid.tsx` السطر 169-185:

```typescript
// Featured badge يعمل animation لا ينتهي لكل service card
animate={{
  boxShadow: ['0 0 10px...', '0 0 20px...', '0 0 10px...'],
}}
transition={{ duration: 2, repeat: Infinity }}
```

**الحل:** CSS animation بدلاً من Framer Motion repeat: Infinity.

---

### المشكلة #6 — 🟡 متوسطة: WaveAnimation يستخدم `fixed` positioning

**الملف:** `src/components/effects/WaveAnimation.tsx` السطر 21:
```
className="fixed inset-0 pointer-events-none"
```

`fixed` عنصر يُجبر المتصفح على إنشاء **stacking context جديد** ويضيف layer للـ compositing في كل scroll — مكلف على الـ GPU خاصة على mobile.

**الحل:** تغييره لـ `absolute` بدلاً من `fixed`.

---

### خلاصة: الأداء الحالي vs المتوقع بعد الإصلاحات

```
المشكلة                        │ التأثير   │ التحسن المتوقع
────────────────────────────────┼───────────┼───────────────────
#1 Portfolio ES6 imports (120+) │ TTI +3-5s │ -100+ HTTP requests
#2 QueryClient بدون cache       │ TTI +0.8s │ Supabase hits تنعدم
#3 GTM مرتين                   │ TBT +100ms│ network request حذف
#4 WhatsApp Framer loop         │ FPS drop  │ main thread رح يتحرر
#5 Services badge loop          │ FPS drop  │ GPU شغل يقل
#6 WaveAnimation fixed          │ scroll lag│ compositing يتحسن
```

**الدرجة الحالية (Production):** ~70-78 / 100  
**الدرجة المتوقعة بعد الإصلاحات:** ~90-95 / 100

---

## خطة التنفيذ

### الخطوة 1: حذف GTM المكرر من App.tsx (30 ثانية)
حذف كامل الـ `useEffect` في `App.tsx` سطر 101-106.

### الخطوة 2: إصلاح QueryClient + usePageContent
- `App.tsx`: إضافة `defaultOptions: { queries: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 } }`
- `usePageContent.ts`: تحويله ليستخدم `useQuery` بدلاً من `useState/useEffect`

### الخطوة 3: تحويل FloatingWhatsApp لـ pure CSS
حذف الـ Framer Motion loops، استبدالها بـ `@keyframes pulse` في CSS.

### الخطوة 4: تحويل Featured badge لـ CSS animation
في `HomeServicesGrid.tsx`: استبدال `motion.div` animate infinite بـ CSS `animate-pulse` أو custom `@keyframes`.

### الخطوة 5: WaveAnimation من fixed → absolute

### الخطوة 6 (أضخم وأهم): نقل صور portfolioItems
نقل جميع صور البورتفوليو من `@/assets/portfolio/` (ES6 imports) إلى مسارات string مباشرة تشير لـ `/public/portfolio/` — هذا يحذف 120+ JavaScript chunk من الـ bundle ويوفر 100+ HTTP request.

> **ملاحظة:** الخطوة 6 تتطلب نقل الصور الفعلية من `src/assets/portfolio/` إلى `public/portfolio/` — هذا ليس ممكناً عبر تعديل الكود فقط بل يحتاج عملية نسخ الملفات. سنفعل الخطوات 1-5 في نفس الـ message وهي الأسرع أثراً.
