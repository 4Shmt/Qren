# Qren Discord Bots - Multi-Bot System

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-14.x-blue.svg)](https://discord.js.org/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

نظام بوتات Discord متعدد ومتطور مع مراقبة تلقائية ونظام استعادة ذكي، مصمم للعمل المستمر والموثوقية العالية.

## المميزات الأساسية

- 🤖 **5 بوتات متخصصة** تعمل بشكل متزامن
- 🔄 **نظام إعادة التشغيل التلقائي** 
- 🛡️ **مراقبة الصحة في الوقت الفعلي**
- 🌐 **خادم Keep-Alive** للحفاظ على النشاط
- 📊 **تتبع الإحصائيات** وحفظ البيانات
- ⚡ **استجابة سريعة** للأخطاء والمشاكل

## البوتات المتاحة

1. **Avatar Bot** (`bot.js`) - مشاركة الصور الرمزية مع أزرار تفاعلية
2. **Control Bot** (`control_bot.js`) - لوحة تحكم للمراقبة والإعدادات
3. **Console Bot** (`console_bot.js`) - إجراءات إدارية ومراقبة المستخدمين  
4. **Publishing Bot** (`publishing_bot.js`) - ترويج الخوادم وتصنيفها
5. **Tag Search Bot** (`tag_search_bot.js`) - البحث عن الخوادم بالعلامات

## التثبيت والتشغيل

### المتطلبات
- Node.js 20.x أو أحدث
- npm أو yarn
- رموز Discord Bot (Tokens)

### التثبيت
```bash
npm install
```

### متغيرات البيئة المطلوبة
```env
DISCORD_BOT_TOKEN=your_avatar_bot_token
CONTROL_BOT_TOKEN=your_control_bot_token
CONSOLE_BOT_TOKEN=your_console_bot_token
PUBLISHING_BOT_TOKEN=your_publishing_bot_token
TAG_SEARCH_BOT_TOKEN=your_tag_search_bot_token
PORT=5000
```

### التشغيل
```bash
# التشغيل العادي
npm start

# أو
node index.js

# أو تشغيل نظام النشر مباشرة
node deploy_bots.js
```

## البنية المعمارية

```
qren-discord-bots/
├── index.js              # نقطة الدخول الرئيسية
├── deploy_bots.js        # نظام النشر والمراقبة
├── config.js             # إعدادات المشروع
├── keep_alive.js         # خادم HTTP للحفاظ على النشاط
├── bot.js               # Avatar Bot
├── control_bot.js       # Control Bot  
├── console_bot.js       # Console Bot
├── publishing_bot.js    # Publishing Bot
├── tag_search_bot.js    # Tag Search Bot
└── package.json         # معلومات المشروع والتبعيات
```

## الإعدادات

جميع الإعدادات متاحة في ملف `config.js`:
- إعدادات البوت الأساسية
- حدود Discord API
- إعدادات التسجيل
- مسارات الملفات
- علامات الميزات

## نظام المراقبة

النظام يتضمن مراقبة تلقائية شاملة:
- فحص دوري لحالة البوتات كل 30 ثانية
- إعادة تشغيل تلقائية عند حدوث مشاكل
- حفظ الإحصائيات كل 10 دقائق
- تسجيل مفصل لجميع العمليات

## إدارة الأخطاء

- **إعادة المحاولة المتدرجة** مع تأخير متزايد
- **تنظيف الموارد** عند الإيقاف
- **معالجة إشارات النظام** للإيقاف الآمن
- **تسجيل مفصل** للأخطاء والتحذيرات

## الحالة والصحة

### فحص الحالة
- زيارة: `http://localhost:5000/status`
- يعرض حالة جميع البوتات ومعلومات النظام

### إحصائيات النشر
- ملف `deployment_stats.json` يحتوي على إحصائيات مفصلة
- تتبع وقت التشغيل وعدد إعادات التشغيل

## الأمان

- الرموز محمية في متغيرات البيئة
- عدم تسجيل المعلومات الحساسة
- التحقق من صحة الرموز قبل الاستخدام
- تنظيف الرموز من الأحرف غير المرغوبة

## المساهمة

نرحب بالمساهمات! يرجى:
1. إنشاء fork للمشروع
2. إنشاء branch للميزة الجديدة
3. إرسال Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة ISC.

## الدعم

للدعم والاستفسارات، يرجى إنشاء issue في GitHub أو التواصل مع فريق التطوير.

---

**تم التطوير بواسطة فريق Qren** 🚀