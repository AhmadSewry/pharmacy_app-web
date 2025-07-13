// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// كل الترجمات ستكون هنا مباشرة (Frontend فقط)
const resources = {
  en: {
    translation: {
      Medicines: "Medicines",
      PharmaCore: "PharmaCore",
      "Our Products": "Our Products",
      "A smart platform for effortless drug and inventory management, built specifically for pharmacy owners and managers — full control, greater efficiency.":
        "A smart platform for effortless drug and inventory management, built specifically for pharmacy owners and managers — full control, greater efficiency.",
      "Add to Cart": "Add to Cart",
      " “The tools, the meds, the control — — all in one place.”":
        " “The tools, the meds, the control — — all in one place.”",
      "Welcome to our Pharmacy App.": "Welcome to our Pharmacy App.",
      "Where pharmacy meets simplicity.": "Where pharmacy meets simplicity.",
      "First name": "First name",
      "Last name": "Last name",
      email: "email",
      phone: "phone",
      Phone: "Phone",
      access: "access",
      "Search…": "Search…",
      "Add New Category": "Add New Category",
      "Product Categories": "Product Categories",
      Categories: "Categories",
      Actions: "Actions",
      Role: "Role",
      "Hire Date": "Hire Date",
      Certificates: "Certificates",
      Email: "Email",
      Username: "Username",
      "Full Name": "Full Name",
      ID: "ID",
      "Enter FirstName with at least 3 characters.":
        "Enter FirstName with at least 3 characters.",
      "Last Name": "Last name",
      Password: "Password",
      Salary: "Salary",
      "Username must be at least 3 characters":
        "Username must be at least 3 characters",
      "Password must be at least 3 characters":
        "Password must be at least 3 characters",
      "Phone must start with +963 or 00963 followed by 9 digits":
        "Phone must start with +963 or 00963 followed by 9 digits",
      "Enter LastName with at least 3 characters.":
        "Enter LastName with at least 3 characters.",
      "Create New Employee": "Create New Employee",
      "Account created successfully": "Account created successfully",
      "First Name": "First Name",
      "Certificate Number": "Certificate Number",
      "Enter a valid email address": "Enter a valid email address",
      "Enter salary as a number": "Enter salary as a number",
      "Certificate number must be exactly 7 digits":
        "Certificate number must be exactly 7 digits",
      "PharmaCore is your trusted online pharmacy providing quality medications and healthcare products.":
        "PharmaCore is your trusted online pharmacy providing quality medications and healthcare products.",
      "About us": "About us",
      Information: "Information",
      "My Account": "My Account",
      Newsletter: "Newsletter",
      Subscribe: "Subscribe",
      "Order tracking": "Order tracking",
      "Privacy & Policy": "Privacy & Policy",
      "Terms & Conditions": "Terms & Conditions",
      Login: "Login",
      "My Cart": "My Cart",
      WishList: "WishList",
      "Thank you for subscribing!": "Thank you for subscribing!",
      "Subscription failed. Please try again.":
        "Subscription failed. Please try again.",
      "All rights reserved.": "All rights reserved.",
      Invoice: "Invoice",
      Date: "Date",
      "Invoice No": "Invoice No",
      "Invoiced To": "Invoiced To",
      Products: "Products",
      Description: "Description",
      Price: "Price",
      Quantity: "Quantity",
      Amount: "Amount",
      "Sub Total": "Sub Total",
      Tax: "Tax",
      Total: "Total",
      NOTE: "NOTE",
      "This is a computer-generated receipt and does not require a physical signature.":
        "This is a computer-generated receipt and does not require a physical signature.",
      Print: "Print",
      "Your Cart": "Your Cart",
      Item: "Item",

      Remove: "Remove",
      Checkout: "Checkout",
    },
  },
  ar: {
    translation: {
      PharmaCore: "نواة الصيدلية",
      "Our Products": "منتجاتنا",
      "A smart platform for effortless drug and inventory management, built specifically for pharmacy owners and managers — full control, greater efficiency.":
        ".منصة ذكية لإدارة الأدوية والمخزون بسهولة، مصممة خصيصًا لأصحاب ومديري الصيدليات – تحكم كامل، كفاءة أعلى",
      "Add to Cart": "اضافة الى السلة",
      " “The tools, the meds, the control — — all in one place.”":
        "الأدوات والأدوية والتحكم كلها في مكان واحد",
      "Welcome to our Pharmacy App.": "مرحبا بك في تطبيقنا لادارة الصيدلية",
      "Where pharmacy meets simplicity.": "هنا حيث تلتقي الصيدلية بالبساطة",
      "First name": "الاسم",
      "Last name": "الكنية",
      email: "البريد الالكتروني",
      phone: "رقم الهاتف",
      access: "نوع المستخدم",
      "Search…": "البحث",
      "Add New Category": "اضافة تصنيف جديد",
      "Product Categories": "تصنيف المنتجات",
      Categories: "التصنيفات",
      Actions: "الاضافة و الحذف",
      Role: "الدور",
      "Hire Date": "تاريخ التوظيف",
      Salary: "الراتب",
      Certificates: "رقم الشهادة",
      Phone: "رقم الهاتف",
      Email: "البريد الالكتروني",
      Username: "اسم المستخدم",
      "Full Name": "الاسم الكامل",
      ID: "الرقم",
      "Enter FirstName with at least 3 characters.":
        "ادخل الاسم الذي يحتوي 3 احرف علأقل",
      "Last Name": "الكنية",
      Password: "كلمة المرور",
      "Username must be at least 3 characters":
        "يجب أن يحتوي اسم المستخدم على 3 أحرف على الأقل",

      "Phone must start with +963 or 00963 followed by 9 digits":
        "يجب أن يبدأ الرقم بـ +963 أو 00963 متبوعًا بـ 9 أرقام",
      "Enter LastName with at least 3 characters.":
        "ادخل الكنية التي تحتوي على 3 أحرف على الأقل",
      "Create New Employee": "إنشاء موظف جديد",
      "Account created successfully": "تم إنشاء الحساب بنجاح",
      "First Name": "الاسم",
      "Certificate Number": "رقم الشهادة",

      "Enter a valid email address": "ادخل بريد الكتروني صحيح",
      "Password must be at least 3 characters":
        "كلمة المرور يجب ان تحتوي على الأقل 3 محارف",
      "Enter salary as a number": "ادخل الراتب كرقم",
      "Certificate number must be exactly 7 digits":
        "رقم الشهادة يجب أن يكون مؤلفًا من 7 أرقام",
      "PharmaCore is your trusted online pharmacy providing quality medications and healthcare products.":
        "نواة الصيدلية هي صيدليتك الإلكترونية الموثوقة التي توفر أدوية ومنتجات رعاية صحية عالية الجودة.",
      "About us": "معلومات عنا",
      Information: "معلومات",
      "My Account": "حسابي",
      Newsletter: "النشرة البريدية",
      Subscribe: "اشتراك",
      "Order tracking": "تتبع الطلب",
      "Privacy & Policy": "الخصوصية والسياسة",
      "Terms & Conditions": "الشروط والأحكام",
      Login: "تسجيل الدخول",
      "My Cart": "سلة التسوق",
      WishList: "قائمة الرغبات",
      "Thank you for subscribing!": "شكراً لاشتراكك!",
      "Subscription failed. Please try again.":
        "فشل الاشتراك. يرجى المحاولة مرة أخرى.",
      "All rights reserved.": "جميع الحقوق محفوظة.",
      Invoice: "الفاتورة",
      Date: "التاريخ",
      "Invoice No": "رقم الفاتورة",
      "Invoiced To": "المستلم",
      Products: "المنتجات",
      Description: "الوصف",
      Price: "السعر",
      Quantity: "الكمية",
      Amount: "المبلغ",
      "Sub Total": "المجموع الفرعي",
      Tax: "الضريبة",
      Total: "المجموع الكلي",
      NOTE: "ملاحظة",
      "This is a computer-generated receipt and does not require a physical signature.":
        "هذه إيصال تم إنشاؤه بواسطة الكمبيوتر ولا يتطلب توقيعًا فعليًا.",
      Print: "طباعة",
      "Your Cart": "سلة المشتريات",
      Item: "المنتج",

      Remove: "حذف",
      Checkout: "الدفع",
    },
  },
};

i18n.use(initReactI18next).init({
  resources, // نستخدم الموارد المضمنة
  lng: "en", // اللغة الافتراضية
  fallbackLng: "en", // اللغة الاحتياطية
  interpolation: {
    escapeValue: false,
  },
  // لحفظ إعدادات اللغة
  detection: {
    order: ["localStorage"],
    caches: ["localStorage"],
  },
});

export default i18n;
