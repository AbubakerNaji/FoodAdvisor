// feedbackStorage.js - ملف التعامل مع LocalStorage
// ملف بسيط بيحفظ ويجيب التقييمات من ذاكرة المتصفح
// التقييمات بتتحفظ تحت اسم 'foodadvisor_feedbacks'

const STORAGE_KEY = 'foodadvisor_feedbacks';

// Functions for reading, saving, and managing feedback data in localStorage

// دالة بتجيب كل التقييمات من localStorage
// التقييمات محفوظة بصيغة: { restaurantId: [review1, review2, ...] }
export const getAllFeedbacks = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('مشكلة في قراءة التقييمات من localStorage:', error);
        return {};
    }
};

// دالة بتجيب تقييمات مطعم معين بس
// بناخد رقم المطعم ونرجع كل التقييمات بتاعته
export const getRestaurantFeedbacks = (restaurantId) => {
    try {
        const allFeedbacks = getAllFeedbacks();
        return allFeedbacks[restaurantId] || []; // لو المطعم مافيهوش تقييمات، نرجع array فاضي
    } catch (error) {
        console.error('مشكلة في قراءة تقييمات المطعم:', error);
        return [];
    }
};

// دالة بتحفظ تقييم جديد لمطعم معين
// بتاخد رقم المطعم وبيانات التقييم (الاسم، النجوم، التعليق)
export const saveRestaurantFeedback = (restaurantId, feedback) => {
    try {
        // نجيب كل التقييمات الموجودة
        const allFeedbacks = getAllFeedbacks();

        // نجيب تقييمات هذا المطعم بالذات
        const restaurantFeedbacks = allFeedbacks[restaurantId] || [];

        // نعمل object جديد للتقييم ونحط فيه كل المعلومات
        const newFeedback = {
            id: Date.now(), // بنستخدم الوقت الحالي كـ ID فريد
            userName: feedback.userName,
            rating: feedback.rating,
            comment: feedback.comment,
            date: new Date().toISOString().split('T')[0], // التاريخ بصيغة: YYYY-MM-DD
            isUserReview: true // علامة إن تقييم من المستخدم (مش من الداتا الأصلية)
        };

        // نحط التقييم الجديد في أول القائمة (عشان يظهر أول حاجة)
        restaurantFeedbacks.unshift(newFeedback);

        // نحدّث القائمة الكبيرة
        allFeedbacks[restaurantId] = restaurantFeedbacks;

        // نحفظ كل حاجة في localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allFeedbacks));

        return true;
    } catch (error) {
        console.error('مشكلة في حفظ التقييم:', error);
        return false;
    }
};


;
