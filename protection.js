/**
 * 🔒 نظام ServerNet للأمن وحماية المحتوى والأكواد
 * المطور: فهد بن محمد | خبير أتمتة وبوتات
 * الوظيفة: منع نسخ الأكواد، حظر أدوات المطورين، وحماية التصاميم من السرقة.
 */

(function () {
    'use strict';

    // 1. منع فتح القائمة المنسدلة للزر الأيمن (Right-Click) في الصفحة كاملة
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    // 2. حظر اختصارات لوحة المفاتيح المتقدمة الخاصة بالفحص والنسخ
    document.addEventListener('keydown', function (e) {
        
        // أ. حظر مفتاح F12 (أداة الفحص الشهيرة)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // ب. حظر اختصار Ctrl+U أو Cmd+U (عرض سورس كود الصفحة المباشر)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
            e.preventDefault();
            return false;
        }

        // ج. حظر اختصارات فتح أدوات المطورين (Ctrl+Shift+I / J / C)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
            e.preventDefault();
            return false;
        }

        // د. حظر اختصار حفظ الصفحة كاملة على جهاز السارق (Ctrl+S / Cmd+S)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            return false;
        }

        // هـ. حظر اختصار النسخ وتحديد الكل (Ctrl+C / Ctrl+A) لحماية النصوص
        if ((e.ctrlKey || e.metaKey) && ['c', 'a'].includes(e.key.toLowerCase())) {
            const activeTag = document.activeElement.tagName.toLowerCase();
            // السماح بالنسخ والتحديد فقط إذا كان العميل داخل حقول إدخال البيانات المخصصة له
            if (activeTag !== 'input' && activeTag !== 'textarea' && !document.activeElement.isContentEditable) {
                e.preventDefault();
                return false;
            }
        }
    });

    // 3. منع سحب وإفلات الصور (Drag & Drop) لمنع حفظ شعارات وأيقونات الموقع يدوياً
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
        }
    });

    // 4. نظام فخ الـ Debugger المتكرر لتجميد صفحة الفحص (Anti-DevTools Loop)
    // في حال نجح مخترق محترف في فتح لوحة المطورين بأي طريقة ملتوية، هذا السكريبت سيقوم بتجميد المتصفح لديه فوراً
    function startAntiDebug() {
        function enforce() {
            try {
                (function enforceLoop(index) {
                    if ((this + '').length !== 20 || index % 20 === 0) {
                        (function () {}.constructor('debugger')());
                    } else {
                        (function () {}.constructor('debugger')());
                    }
                    enforceLoop(++index);
                })(0);
            } catch (err) {
                setTimeout(enforce, 100);
            }
        }
        enforce();
    }
    
    // تشغيل نظام الحماية البرمجي في الخلفية بشكل صامت
    setInterval(function() {
        startAntiDebug();
    }, 200);

})();
