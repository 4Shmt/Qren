# Discord Bot - Arabic Broadcasting System 🤖

بوت Discord مصمم للرسائل الإذاعية باللغة العربية مع إدارة المستخدمين ونظام مراقبة 24/7.

## المميزات ✨

- **أوامر عربية كاملة**: جميع الأوامر باللغة العربية مع Slash Commands
- **نظام البث**: إرسال رسائل لجميع المستخدمين المسجلين
- **إدارة المستخدمين**: إضافة وحذف المستخدمين من قائمة البث
- **نظام الأمان**: تحكم في صلاحيات المشرفين
- **مراقبة 24/7**: نظام Keep-Alive مع Flask
- **تسجيل متقدم**: نظام لوغات شامل بالعربية

## الأوامر المتاحة 📋

| الأمر | الوصف | المطلوب |
|-------|--------|----------|
| `/السلام` | ترحيب وحالة البوت | الجميع |
| `/اضافة` | إضافة مستخدم للبث | المشرفين |
| `/ازالة` | حذف مستخدم من البث | المشرفين |
| `/القائمة` | عرض قائمة المستخدمين | المشرفين |
| `/بث` | إرسال رسالة للجميع | المشرفين |
| `/الحالة` | إحصائيات البوت | المشرفين |

## التثبيت والتشغيل 🚀

### المتطلبات
- Python 3.11+
- Discord Bot Token

### التثبيت المحلي
```bash
# استنساخ المشروع
git clone https://github.com/username/discord-bot-arabic.git
cd discord-bot-arabic

# تثبيت المكتبات
pip install -r requirements.txt

# إعداد متغير البيئة
export DISCORD_TOKEN="your_bot_token_here"

# تشغيل البوت
python index.py
```

### النشر على Railway
```bash
# 1. رفع المشروع على GitHub
git add .
git commit -m "Discord Bot Ready"
git push origin main

# 2. ربط مع Railway
# - اذهب إلى railway.app
# - "New Project" → "Deploy from GitHub"
# - اختر المستودع

# 3. إعداد متغير البيئة في Railway
DISCORD_TOKEN = your_bot_token_here
```

## البنية التقنية 🏗️

### الملفات الرئيسية
- `index.py` - الملف الرئيسي للبوت
- `token_manager.py` - أداة إدارة التوكن
- `keep_alive.py` - نظام Keep-Alive
- `requirements.txt` - المكتبات المطلوبة
- `railway.json` - إعدادات النشر

### المجلدات
- `utils_py/` - أدوات مساعدة (Logger, Rate Limiter)
- `config_py/` - ملفات الإعدادات
- `data_py/` - بيانات المستخدمين والإعدادات

## الإعداد والتكوين ⚙️

### 1. إنشاء البوت في Discord
1. اذهب إلى [Discord Developer Portal](https://discord.com/developers/applications)
2. أنشئ تطبيق جديد
3. اذهب إلى قسم "Bot"
4. انسخ التوكن

### 2. إعداد الصلاحيات
الصلاحيات المطلوبة:
- Send Messages
- Use Slash Commands
- Read Message History
- Embed Links

### 3. إضافة البوت للسيرفر
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=2147483648&scope=bot%20applications.commands
```

## الاستخدام 📖

### إعداد المشرفين
استخدم أمر `/اضافة_مشرف @user` لإضافة مشرفين جدد.

### إضافة مستخدمين للبث
```
/اضافة @user1 @user2 @user3
```

### إرسال رسالة بث
```
/بث مرحباً بكم جميعاً! هذه رسالة تجريبية.
```

## المراقبة والصيانة 🔧

### اللوغات
- يتم حفظ اللوغات في مجلد `logs_py/`
- ملف جديد كل يوم
- مستويات مختلفة: INFO, WARNING, ERROR

### نظام Keep-Alive
- خادم Flask على البورت 3000
- مراقبة حالة البوت
- إحصائيات مفصلة

## الأمان 🔒

- التوكن محفوظ في متغيرات البيئة
- تحكم في صلاحيات المشرفين
- نظام Rate Limiting
- تشفير الاتصالات

## المساهمة 🤝

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء فرع جديد للميزة
3. Commit التغييرات
4. Push للفرع
5. إنشاء Pull Request

## الدعم 💬

- **المشاكل**: أنشئ Issue في GitHub
- **الاقتراحات**: استخدم Discussions
- **الوثائق**: راجع ملفات المساعدة

## الترخيص 📄

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

**تم تطويره بـ ❤️ للمجتمع العربي**
