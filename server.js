const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// تشغيل ملفات الواجهة الأمامية من المجلد الرئيسي للمشروع
app.use(express.static(__dirname)); 

// ربط مكتبة الذكاء الاصطناعي بمفتاح الـ API بأمان
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * ⚡ الـ Endpoint الخاص بتوليد صفحات الهبوط
 */
app.post('/api/generate-lp', async (req, res) => {
    const { userPrompt } = req.body;

    if (!userPrompt) {
        return res.status(400).json({ success: false, error: "الوصف مطلوب" });
    }

    const systemInstruction = `
    أنت مبرمج ويب محترف (Full-Stack Developer) وخبير في كتابة النصوص التسويقية الجذابة (Copywriter).
    مهمتك هي بناء صفحة هبوط (Landing Page) احترافية ومتجاوبة بالكامل مع الهواتف الذكية (Mobile-First) بناءً على طلب المستخدم.

    يجب أن تلتزم بالقواعد الصارمة التالية لمنع أي أخطاء برمجية بنسبة 100%:
    1. المخرجات يجب أن تكون بصيغة JSON نظيفة فقط وصالحة للقراءة عبر (JSON.parse).
    2. لا تضع أي نصوص تفسيرية، ولا تضع علامات الاقتباس البرمجية الثلاثية (\`\`\`json) في البداية أو النهاية. ابدأ بقوس { وانتهِ بقوس } مباشرة.
    3. استخدم مكتبة Tailwind CSS عبر الـ CDN للتصميم، ومكتبة FontAwesome للأيقونات لضمان مظهر نيون عصري واحترافي متناسق مع هوية ServerNet.
    4. اهتم بالتقسيم التسويقي: (العنوان المثير، المشكلة، الحل الذكي، آراء العملاء، نموذج الطلب أو زر الاتصال بالواتساب، الأسئلة الشائعة).

    هيكل الـ JSON المطلوب منك إرجاعه هو:
    {
      "title": "عنوان الصفحة التسويقي",
      "html_code": "كود الـ HTML المتكامل والكامل الموجود داخل وسم الـ body فقط مع كلاسات Tailwind وبدون استخدام علامات الهروب أو كسر النصوص بشكل خاطئ"
    }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `طلب المستخدم الحالي: "${userPrompt}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json" 
            }
        });

        res.status(200).json({ success: true, code: response.text });

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ success: false, error: "حدث خطأ أثناء توليد الصفحة بالذكاء الاصطناعي" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل بنجاح على المنفذ: ${PORT}`);
});
